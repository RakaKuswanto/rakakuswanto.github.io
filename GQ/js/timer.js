/* GymQuest — Timer & Audio Engine.
 * Features:
 * - Rest interval countdown based on timestamp delta (works even when tab/phone screen throttles).
 * - Isometric Hold Timer with 3s beep countdown, active ticker, and completion bell.
 * - Web Audio API procedural synthesis with mute toggle.
 * - Navigator Vibration API for sensory feedback on mobile devices.
 * - Screen Wake Lock API to prevent phone display sleep during workout.
 */
(function (GQ) {
  'use strict';

  let audioCtx = null;
  let wakeLock = null;

  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  const Timer = {
    // Rest Timer State
    restDurationSec: 90,
    restTargetTimestamp: null,
    restIntervalId: null,
    isRestRunning: false,
    onRestTick: null,
    onRestComplete: null,

    // Hold Timer (Isometric) State
    holdTargetSec: 30,
    holdRemainingSec: 30,
    holdIntervalId: null,
    isHoldRunning: false,
    onHoldTick: null,
    onHoldComplete: null,

    // EMOM Timer State
    emomTotalRounds: 12,
    emomCurrentRound: 1,
    emomRoundSec: 60,
    emomRemainingSec: 60,
    emomIntervalId: null,
    isEmomRunning: false,
    onEmomTick: null,
    onEmomRoundChange: null,
    onEmomComplete: null,

    // AMRAP Timer State
    amrapTotalSec: 15 * 60,
    amrapRemainingSec: 15 * 60,
    amrapIntervalId: null,
    isAmrapRunning: false,
    onAmrapTick: null,
    onAmrapComplete: null,

    /* ── Audio Synthesis ────────────────────────────────────────── */
    beep(freq = 660, type = 'sine', duration = 0.12, gain = 0.2, delay = 0) {
      const state = GQ.Store && GQ.Store.state;
      if (state && !state.settings.sound) return;

      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

        g.gain.setValueAtTime(gain, ctx.currentTime + delay);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

        osc.connect(g);
        g.connect(ctx.destination);

        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + duration);
      } catch (err) {
        // Audio error silent fallback
      }
    },

    playSuccessChime() {
      this.beep(523.25, 'triangle', 0.1, 0.2, 0);     // C5
      this.beep(659.25, 'triangle', 0.1, 0.2, 0.08);  // E5
      this.beep(783.99, 'triangle', 0.12, 0.2, 0.16); // G5
      this.beep(1046.50, 'triangle', 0.25, 0.25, 0.24); // C6
    },

    playRestFinishedAlarm() {
      this.beep(880, 'sine', 0.15, 0.25, 0);
      this.beep(1100, 'sine', 0.25, 0.3, 0.15);
      this.vibrate([100, 80, 100, 80, 200]);
    },

    vibrate(pattern = 50) {
      const state = GQ.Store && GQ.Store.state;
      if (state && !state.settings.haptics) return;
      if ('vibrate' in navigator) {
        try {
          navigator.vibrate(pattern);
        } catch (e) {}
      }
    },

    /* ── Wake Lock Management ───────────────────────────────────── */
    async requestWakeLock() {
      if ('wakeLock' in navigator) {
        try {
          wakeLock = await navigator.wakeLock.request('screen');
          wakeLock.addEventListener('release', () => {
            wakeLock = null;
          });
        } catch (err) {
          // Wake lock not granted or unsupported
        }
      }
    },

    releaseWakeLock() {
      if (wakeLock) {
        wakeLock.release().catch(() => {});
        wakeLock = null;
      }
    },

    /* ── Robust Rest Timer (Timestamp-based) ─────────────────────── */
    setRestDuration(sec) {
      this.stopRest();
      this.restDurationSec = sec;
      if (GQ.Store && GQ.Store.state && GQ.Store.state.settings) {
        GQ.Store.state.settings.restSec = sec;
        GQ.Store.save();
      }
      if (GQ.UI && GQ.UI.updateRestDurationButtons) {
        GQ.UI.updateRestDurationButtons(sec);
      }
      if (this.onRestTick) this.onRestTick(sec, sec);
    },

    addRestTime(sec = 30) {
      if (this.isRestRunning && this.restTargetTimestamp) {
        this.restTargetTimestamp += (sec * 1000);
        this.restDurationSec += sec;
        this.beep(880, 'sine', 0.08, 0.2);
        if (GQ.UI && GQ.UI.toast) GQ.UI.toast(`+${sec}s Rest Added`);
      } else {
        this.setRestDuration(this.restDurationSec + sec);
      }
    },

    skipRest() {
      if (this.isRestRunning) {
        this.stopRest();
        this.beep(440, 'sine', 0.08, 0.2);
        if (GQ.UI && GQ.UI.toast) GQ.UI.toast('Rest interval skipped. Next set ready!');
        if (this.onRestTick) this.onRestTick(this.restDurationSec, this.restDurationSec);
        if (GQ.UI && GQ.UI.updateRestButtonIcon) GQ.UI.updateRestButtonIcon();
      }
    },

    startRest(sec = null) {
      const defaultSec = (GQ.Store && GQ.Store.state && GQ.Store.state.settings && GQ.Store.state.settings.restSec) || 90;
      this.restDurationSec = sec || this.restDurationSec || defaultSec;
      const now = Date.now();
      this.restTargetTimestamp = now + (this.restDurationSec * 1000);
      this.isRestRunning = true;
      this.requestWakeLock();

      clearInterval(this.restIntervalId);
      this.restIntervalId = setInterval(() => {
        const remainingMs = this.restTargetTimestamp - Date.now();
        const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));

        if (this.onRestTick) {
          this.onRestTick(remainingSec, this.restDurationSec);
        }

        // Countdown cues at 3, 2, 1
        if (remainingSec === 3 || remainingSec === 2 || remainingSec === 1) {
          this.beep(700, 'sine', 0.08, 0.15);
        }

        if (remainingMs <= 0) {
          this.stopRest();
          this.playRestFinishedAlarm();
          if (this.onRestComplete) this.onRestComplete();
        }
      }, 250);
    },

    stopRest() {
      clearInterval(this.restIntervalId);
      this.restIntervalId = null;
      this.isRestRunning = false;
      this.restTargetTimestamp = null;
      this.releaseWakeLock();
      if (GQ.UI && GQ.UI.hideFloatingRestBar) GQ.UI.hideFloatingRestBar();
    },

    toggleRest() {
      if (this.isRestRunning) {
        this.stopRest();
        if (this.onRestTick) this.onRestTick(this.restDurationSec, this.restDurationSec);
      } else {
        this.startRest();
      }
    },

    /* ── Hold / Isometric Timer Modal Engine ────────────────────── */
    startHoldCountdown(targetSec, onTick, onComplete) {
      this.holdTargetSec = targetSec;
      this.holdRemainingSec = targetSec;
      this.onHoldTick = onTick;
      this.onHoldComplete = onComplete;
      this.isHoldRunning = true;
      this.requestWakeLock();

      const startTime = Date.now();
      const endTime = startTime + (targetSec * 1000);

      this.beep(520, 'sine', 0.15, 0.2); // Start beep

      clearInterval(this.holdIntervalId);
      this.holdIntervalId = setInterval(() => {
        const diffMs = endTime - Date.now();
        const rem = Math.max(0, Math.ceil(diffMs / 1000));
        this.holdRemainingSec = rem;

        if (this.onHoldTick) this.onHoldTick(rem, targetSec);

        if (rem === 3 || rem === 2 || rem === 1) {
          this.beep(800, 'sine', 0.08, 0.2);
        }

        if (diffMs <= 0) {
          this.stopHold();
          this.playSuccessChime();
          this.vibrate([150, 100, 200]);
          if (this.onHoldComplete) this.onHoldComplete(targetSec);
        }
      }, 250);
    },

    stopHold() {
      clearInterval(this.holdIntervalId);
      this.holdIntervalId = null;
      this.isHoldRunning = false;
    },

    /* ── EMOM Engine ────────────────────────────────────────────── */
    startEMOM(totalRounds = 12, roundSec = 60, onTick, onRoundChange, onComplete) {
      this.stopEMOM();
      this.emomTotalRounds = totalRounds;
      this.emomCurrentRound = 1;
      this.emomRoundSec = roundSec;
      this.emomRemainingSec = roundSec;
      this.onEmomTick = onTick;
      this.onEmomRoundChange = onRoundChange;
      this.onEmomComplete = onComplete;
      this.isEmomRunning = true;
      this.requestWakeLock();

      let roundStart = Date.now();
      let roundTarget = roundStart + (this.emomRoundSec * 1000);

      this.beep(880, 'triangle', 0.2, 0.25);
      if (this.onEmomTick) this.onEmomTick(this.emomRemainingSec, this.emomRoundSec, this.emomCurrentRound, this.emomTotalRounds);
      if (this.onEmomRoundChange) this.onEmomRoundChange(this.emomCurrentRound, this.emomTotalRounds);

      clearInterval(this.emomIntervalId);
      this.emomIntervalId = setInterval(() => {
        const diffMs = roundTarget - Date.now();
        const rem = Math.max(0, Math.ceil(diffMs / 1000));
        this.emomRemainingSec = rem;

        if (this.onEmomTick) {
          this.onEmomTick(rem, this.emomRoundSec, this.emomCurrentRound, this.emomTotalRounds);
        }

        if (rem === 3 || rem === 2 || rem === 1) {
          this.beep(740, 'sine', 0.08, 0.15);
        }

        if (diffMs <= 0) {
          if (this.emomCurrentRound < this.emomTotalRounds) {
            this.emomCurrentRound++;
            roundStart = Date.now();
            roundTarget = roundStart + (this.emomRoundSec * 1000);
            this.emomRemainingSec = this.emomRoundSec;
            this.beep(1046.5, 'triangle', 0.25, 0.3);
            this.vibrate([100, 50, 100]);
            if (this.onEmomRoundChange) this.onEmomRoundChange(this.emomCurrentRound, this.emomTotalRounds);
            if (this.onEmomTick) this.onEmomTick(this.emomRemainingSec, this.emomRoundSec, this.emomCurrentRound, this.emomTotalRounds);
          } else {
            this.stopEMOM();
            this.playSuccessChime();
            this.vibrate([200, 100, 300]);
            if (this.onEmomComplete) this.onEmomComplete();
          }
        }
      }, 250);
    },

    stopEMOM() {
      clearInterval(this.emomIntervalId);
      this.emomIntervalId = null;
      this.isEmomRunning = false;
    },

    /* ── AMRAP Engine ───────────────────────────────────────────── */
    startAMRAP(totalMins = 15, onTick, onComplete) {
      this.stopAMRAP();
      this.amrapTotalSec = totalMins * 60;
      this.amrapRemainingSec = this.amrapTotalSec;
      this.onAmrapTick = onTick;
      this.onAmrapComplete = onComplete;
      this.isAmrapRunning = true;
      this.requestWakeLock();

      const startTime = Date.now();
      const endTime = startTime + (this.amrapTotalSec * 1000);

      this.beep(784, 'triangle', 0.18, 0.25);
      if (this.onAmrapTick) this.onAmrapTick(this.amrapRemainingSec, this.amrapTotalSec);

      clearInterval(this.amrapIntervalId);
      this.amrapIntervalId = setInterval(() => {
        const diffMs = endTime - Date.now();
        const rem = Math.max(0, Math.ceil(diffMs / 1000));
        this.amrapRemainingSec = rem;

        if (this.onAmrapTick) {
          this.onAmrapTick(rem, this.amrapTotalSec);
        }

        if (rem === 3 || rem === 2 || rem === 1) {
          this.beep(880, 'sine', 0.08, 0.2);
        }

        if (diffMs <= 0) {
          this.stopAMRAP();
          this.playSuccessChime();
          this.vibrate([200, 100, 300]);
          if (this.onAmrapComplete) this.onAmrapComplete();
        }
      }, 250);
    },

    stopAMRAP() {
      clearInterval(this.amrapIntervalId);
      this.amrapIntervalId = null;
      this.isAmrapRunning = false;
    }
  };

  GQ.Timer = Timer;
})(window.GQ);
