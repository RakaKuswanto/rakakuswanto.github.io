/* GymQuest — Main UI & Controller.
 * Handles workout session lifecycle, interactive set toggles, Hold timer modal,
 * exercise swap drawer, settings & equipment selection, heatmap and skill matrix.
 */
(function (GQ) {
  'use strict';

  let currentTab = 'workout';
  let activeSessionTimerInterval = null;
  let swappingExerciseIndex = null;
  let editingSetInfo = null; // { exIndex, setIndex }

  const UI = {
    init() {
      GQ.Store.load();
      this.bindGlobalEvents();
      this.initRestTimerBridge();

      // Check onboarding
      if (!GQ.Store.state.onboarded) {
        this.openOnboardingModal();
      }

      this.renderAll();

      // Check if session was active before reload
      if (GQ.Store.state.activeSession) {
        this.resumeActiveSessionTimer();
      }
    },

    toast(msg) {
      const toastEl = document.getElementById('toastNotification');
      const msgEl = document.getElementById('toastMessage');
      if (!toastEl || !msgEl) return;
      msgEl.innerText = msg;
      toastEl.classList.remove('-translate-y-20', 'opacity-0');
      toastEl.classList.add('translate-y-0', 'opacity-100');

      clearTimeout(this._toastTimeout);
      this._toastTimeout = setTimeout(() => {
        toastEl.classList.add('-translate-y-20', 'opacity-0');
        toastEl.classList.remove('translate-y-0', 'opacity-100');
      }, 2800);
    },

    bindGlobalEvents() {
      // Sound toggle
      const soundBtn = document.getElementById('soundToggleBtn');
      if (soundBtn) {
        soundBtn.addEventListener('click', () => {
          const s = GQ.Store.state.settings;
          s.sound = !s.sound;
          GQ.Store.save();
          this.updateSoundIcon();
          this.toast(s.sound ? 'Audio Cue aktif' : 'Audio Cue nonaktif');
          if (s.sound) GQ.Timer.beep(750, 'sine', 0.1);
        });
      }

      // Rest timer toggle button
      const restBtn = document.getElementById('restTimerToggleBtn');
      if (restBtn) {
        restBtn.addEventListener('click', () => {
          GQ.Timer.toggleRest();
          this.updateRestButtonIcon();
        });
      }
    },

    initRestTimerBridge() {
      GQ.Timer.onRestTick = (remaining, total) => {
        const text = document.getElementById('restTimerCounterText');
        const ring = document.getElementById('restTimerCircle');
        const status = document.getElementById('restTimerStatusText');

        if (text) text.innerText = `${remaining}s`;
        if (ring) {
          const circ = 100.5;
          const fraction = remaining / total;
          ring.style.strokeDashoffset = circ - (fraction * circ);
        }
        if (status) {
          status.innerText = GQ.Timer.isRestRunning ? 'Rest interval in progress...' : `Set to ${total}s`;
        }
        this.updateRestButtonIcon();
      };

      GQ.Timer.onRestComplete = () => {
        this.toast('Rest interval complete! Proceed to the next set.');
        this.updateRestButtonIcon();
      };
    },

    updateSoundIcon() {
      const btn = document.getElementById('soundToggleBtn');
      if (!btn) return;
      const soundOn = GQ.Store.state.settings.sound;
      btn.className = `w-8 h-8 rounded-xl bg-obsidian-900 border border-white/5 flex items-center justify-center transition-colors ${soundOn ? 'text-lime-neon' : 'text-slate-600'}`;
    },

    updateRestButtonIcon() {
      const btn = document.getElementById('restTimerToggleBtn');
      if (!btn) return;
      const isRunning = GQ.Timer.isRestRunning;
      btn.innerHTML = isRunning
        ? `<svg class="w-4 h-4 fill-current text-black" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`
        : `<svg class="w-4 h-4 fill-current text-black" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/></svg>`;
    },

    renderAll() {
      this.updateSoundIcon();
      this.renderHeaderStreaks();
      this.renderWorkoutTab();
      this.renderHeatmapTab();
      this.renderSkillsTab();
      if (GQ.Anatomy) GQ.Anatomy.render();
    },

    renderHeaderStreaks() {
      const stats = GQ.Stats.calculateStreaks(GQ.Store.state.sessions);
      const streakEl = document.getElementById('headerStreakValue');
      if (streakEl) streakEl.innerText = stats.currentStreak;
    },

    /* ── TAB 1: WORKOUT ─────────────────────────────────────────── */
    renderWorkoutTab() {
      const root = document.getElementById('tab-workout');
      if (!root) return;

      const state = GQ.Store.state;
      const activeSession = state.activeSession;

      // Header Banner Section
      const levelBadge = document.getElementById('levelBadgeDisplay');
      const sessionTitle = document.getElementById('sessionLevelTitle');
      const sessionSub = document.getElementById('sessionLevelSubtitle');

      if (!activeSession) {
        if (levelBadge) levelBadge.innerText = 'SELECT ROUTINE';
        if (sessionTitle) sessionTitle.innerText = 'Ready to Train Today?';
        if (sessionSub) sessionSub.innerText = 'Select a structured routine below to begin.';
        this.renderRoutineSelector(root);
        return;
      }

      if (levelBadge) levelBadge.innerText = 'ACTIVE SESSION';
      if (sessionTitle) sessionTitle.innerText = activeSession.routineName;
      if (sessionSub) sessionSub.innerText = `Started at ${GQ.U.fmtTime(new Date(activeSession.startedAt))} • Log actual sets`;

      this.renderActiveSessionExercises(root, activeSession);
    },

    selectedProtocolMode: 'standard', // 'standard' | 'superset' | 'emom' | 'amrap'

    setProtocolMode(mode) {
      this.selectedProtocolMode = mode;
      GQ.Timer.beep(600, 'sine', 0.05);
      this.renderWorkoutTab();
    },

    renderRoutineSelector(root) {
      const listRoot = document.getElementById('exerciseListRoot');
      if (!listRoot) return;

      const userEq = GQ.Store.state.profile.equipment;
      const userTier = GQ.Store.state.profile.tier || 1;
      const templates = GQ.ROUTINE_TEMPLATES;
      const mode = this.selectedProtocolMode || 'standard';

      const modeDescriptions = {
        standard: 'Classic Progressive Overload: Complete all sets per exercise with standard rest interval.',
        superset: 'High-Density Superset: Antagonistic exercise pairs (A1 + A2) back-to-back with zero rest, rest after pair.',
        emom: 'Every Minute on the Minute: Automated timer beeps every 60s. Complete reps, rest the remaining seconds.',
        amrap: 'Circuit AMRAP: 15-Minute countdown. Complete as many circuit loops as possible.'
      };

      let html = `
        <div class="rounded-3xl bg-gradient-to-b from-obsidian-900 to-obsidian-950 border border-white/5 p-4 space-y-3 shadow-card-luxury">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold text-lime-neon uppercase tracking-wider">ROUTINE CATALOG</span>
            <span class="text-[10px] font-mono text-slate-400">Equipment: ${userEq.map(q => GQ.EQ_NAME[q] || q).join(', ') || 'Bodyweight Only'}</span>
          </div>

          <!-- Protocol Mode Selector -->
          <div class="p-2.5 rounded-2xl bg-obsidian-850/80 border border-white/5 space-y-2">
            <div class="flex items-center justify-between text-[10px] font-mono">
              <span class="text-slate-400 uppercase tracking-wider">PROTOCOL MODE</span>
              <span class="text-lime-neon font-bold uppercase">${mode.toUpperCase()}</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button onclick="GQ.UI.setProtocolMode('standard')" class="py-1 px-2 rounded-xl text-[9px] font-mono font-bold uppercase border transition-all ${mode === 'standard' ? 'bg-lime-neon text-black border-lime-neon shadow-neon-soft' : 'bg-obsidian-900 border-white/5 text-slate-400 hover:text-white'}">
                Standard
              </button>
              <button onclick="GQ.UI.setProtocolMode('superset')" class="py-1 px-2 rounded-xl text-[9px] font-mono font-bold uppercase border transition-all ${mode === 'superset' ? 'bg-lime-neon text-black border-lime-neon shadow-neon-soft' : 'bg-obsidian-900 border-white/5 text-slate-400 hover:text-white'}">
                ⚡ Superset
              </button>
              <button onclick="GQ.UI.setProtocolMode('emom')" class="py-1 px-2 rounded-xl text-[9px] font-mono font-bold uppercase border transition-all ${mode === 'emom' ? 'bg-lime-neon text-black border-lime-neon shadow-neon-soft' : 'bg-obsidian-900 border-white/5 text-slate-400 hover:text-white'}">
                ⏱️ EMOM
              </button>
              <button onclick="GQ.UI.setProtocolMode('amrap')" class="py-1 px-2 rounded-xl text-[9px] font-mono font-bold uppercase border transition-all ${mode === 'amrap' ? 'bg-lime-neon text-black border-lime-neon shadow-neon-soft' : 'bg-obsidian-900 border-white/5 text-slate-400 hover:text-white'}">
                🔥 AMRAP
              </button>
            </div>
            <p class="text-[9px] font-mono text-slate-400 leading-relaxed">${modeDescriptions[mode]}</p>
          </div>

          <p class="text-xs text-slate-300">Select a training protocol aligned with your goals:</p>
          <div class="space-y-2 pt-1">
      `;

      templates.forEach(t => {
        const needs = t.requires || [];
        const isSupported = needs.every(q => userEq.includes(q));

        // Resolve preview exercises for this routine based on user equipment & tier
        const previewExercises = [];
        t.slots.forEach(slot => {
          let picked = null;
          for (const candidate of slot.pick) {
            if (candidate.id && GQ.isAvailable(GQ.EX[candidate.id], userEq)) {
              picked = GQ.EX[candidate.id];
              break;
            }
            if (candidate.ladder) {
              const ladderSteps = GQ.LADDER_STEPS[candidate.ladder] || [];
              picked = ladderSteps.find(st => st.tier === userTier && GQ.isAvailable(st, userEq))
                    || ladderSteps.find(st => GQ.isAvailable(st, userEq));
              if (picked) break;
            }
          }
          if (picked) {
            previewExercises.push({ ex: picked, sets: slot.sets });
          }
        });

        const warmupExercises = (t.warmup || []).map(wId => GQ.EX[wId]).filter(Boolean);

        html += `
          <div class="rounded-2xl bg-obsidian-850 border ${isSupported ? 'border-white/5 hover:border-lime-neon/40' : 'border-white/5 opacity-60'} transition-all overflow-hidden">
            <div class="p-3.5 flex items-start justify-between">
              <div class="pr-2 flex-1">
                <div class="flex items-center space-x-2">
                  <h4 class="text-xs font-bold text-white">${t.name}</h4>
                  ${!isSupported ? `<span class="text-[9px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">Requires ${needs.map(n => GQ.EQ_NAME[n]).join(', ')}</span>` : ''}
                </div>
                <p class="text-[10px] text-slate-400 mt-0.5">${t.desc}</p>
                <div class="flex items-center space-x-2 mt-1.5 text-[9px] font-mono text-slate-500">
                  <span>${t.slots.length} Main Exercises</span>
                  <span>•</span>
                  <span>${warmupExercises.length} Warm-up</span>
                </div>
              </div>
              <button onclick="GQ.UI.startRoutine('${t.key}')" class="px-3.5 py-2 rounded-xl bg-lime-neon text-black font-mono font-bold text-xs uppercase shadow-neon-soft hover:bg-lime-glow active:scale-95 transition-transform flex-shrink-0">
                START
              </button>
            </div>

            <!-- Preview Exercise List -->
            <div class="px-3.5 pb-3 pt-1 border-t border-white/5 bg-obsidian-900/60">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Exercises in this Session:</span>
                <span class="text-[9px] font-mono text-lime-neon">${previewExercises.length} Movements</span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${previewExercises.map(p => `
                  <span class="text-[9px] font-mono px-2 py-0.5 rounded-lg bg-obsidian-800 border border-white/5 text-slate-200 flex items-center space-x-1">
                    <span class="text-lime-neon font-bold">${p.sets}×</span>
                    <span>${p.ex.name}</span>
                    <span class="text-slate-500 text-[8px]">(${p.ex.target} ${GQ.unit(p.ex)})</span>
                  </span>
                `).join('')}
              </div>

              ${warmupExercises.length > 0 ? `
                <div class="flex items-center space-x-1.5 mt-2 text-[9px] font-mono text-slate-500">
                  <span class="text-amber-400/80 font-bold">Warm-up:</span>
                  <span>${warmupExercises.map(w => w.name).join(', ')}</span>
                </div>
              ` : ''}
            </div>
          </div>
        `;
      });

      // Render Custom User Routines (if any)
      const customRoutines = GQ.Store.state.routines || [];
      if (customRoutines.length > 0) {
        html += `
          <div class="pt-2">
            <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">MY CUSTOM ROUTINES:</span>
          </div>
        `;

        customRoutines.forEach((cr, crIdx) => {
          const exList = cr.slots.map(s => GQ.EX[s.exerciseId]).filter(Boolean);

          html += `
            <div class="rounded-2xl bg-obsidian-850 border border-lime-neon/20 transition-all overflow-hidden">
              <div class="p-3.5 flex items-start justify-between">
                <div class="pr-2 flex-1">
                  <div class="flex items-center space-x-2">
                    <h4 class="text-xs font-bold text-white">${cr.name}</h4>
                    <span class="text-[9px] font-mono text-lime-neon bg-lime-neon/10 px-1.5 py-0.5 rounded border border-lime-neon/30">CUSTOM</span>
                  </div>
                  <p class="text-[10px] text-slate-400 mt-0.5">${cr.desc || 'Custom training protocol'}</p>
                </div>
                <div class="flex items-center space-x-1.5 flex-shrink-0">
                  <button onclick="GQ.UI.deleteCustomRoutine(${crIdx})" class="w-7 h-7 rounded-lg bg-obsidian-800 text-slate-500 hover:text-rose-400 text-xs flex items-center justify-center transition-colors" title="Delete routine">✕</button>
                  <button onclick="GQ.UI.startCustomRoutine(${crIdx})" class="px-3.5 py-2 rounded-xl bg-lime-neon text-black font-mono font-bold text-xs uppercase shadow-neon-soft hover:bg-lime-glow active:scale-95 transition-transform">
                    START
                  </button>
                </div>
              </div>

              <div class="px-3.5 pb-3 pt-1 border-t border-white/5 bg-obsidian-900/60">
                <div class="flex flex-wrap gap-1.5">
                  ${cr.slots.map(s => {
                    const ex = GQ.EX[s.exerciseId];
                    if (!ex) return '';
                    return `
                      <span class="text-[9px] font-mono px-2 py-0.5 rounded-lg bg-obsidian-800 border border-white/5 text-slate-200 flex items-center space-x-1">
                        <span class="text-lime-neon font-bold">${s.sets}×</span>
                        <span>${ex.name}</span>
                        <span class="text-slate-500 text-[8px]">(${s.target} ${GQ.unit(ex)})</span>
                      </span>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>
          `;
        });
      }

      // Add "Create Custom Routine" Button
      html += `
            <button onclick="GQ.UI.openCustomRoutineModal()" class="w-full py-3 rounded-2xl border-2 border-dashed border-white/10 hover:border-lime-neon/40 bg-obsidian-850/50 hover:bg-obsidian-850 text-slate-300 hover:text-lime-neon font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all mt-2 active:scale-[0.99]">
              <span class="text-sm">+</span>
              <span>CREATE CUSTOM ROUTINE</span>
            </button>
          </div>
        </div>
      `;

      listRoot.innerHTML = html;

      // Update metrics row
      const progEl = document.getElementById('progressSetsDisplay');
      const volEl = document.getElementById('totalRepsDisplay');
      if (progEl) progEl.innerText = '0 / 0 Sets';
      if (volEl) volEl.innerText = '0 Vol';
    },

    startRoutine(templateKey) {
      const template = GQ.ROUTINE_TEMPLATES.find(t => t.key === templateKey);
      if (!template) return;

      const userEq = GQ.Store.state.profile.equipment;
      const userTier = GQ.Store.state.profile.tier || 1;
      const defaultDbKg = GQ.Store.state.profile.dbKg || 5;

      // Build session exercises from slots
      const exercises = [];
      template.slots.forEach(slot => {
        let picked = null;
        for (const candidate of slot.pick) {
          if (candidate.id && GQ.isAvailable(GQ.EX[candidate.id], userEq)) {
            picked = GQ.EX[candidate.id];
            break;
          }
          if (candidate.ladder) {
            const ladderSteps = GQ.LADDER_STEPS[candidate.ladder] || [];
            // Find step matching user's tier and available eq
            picked = ladderSteps.find(st => st.tier === userTier && GQ.isAvailable(st, userEq))
                  || ladderSteps.find(st => GQ.isAvailable(st, userEq));
            if (picked) break;
          }
        }

        if (picked) {
          const setsArr = [];
          for (let i = 1; i <= slot.sets; i++) {
            setsArr.push({
              num: i,
              target: picked.target,
              actual: picked.target,
              weightKg: picked.weighted ? defaultDbKg : 0,
              done: false,
              pr: false
            });
          }
          exercises.push({
            exerciseId: picked.id,
            sets: setsArr
          });
        }
      });

      const newSession = {
        id: GQ.U.uid(),
        routineKey: template.key,
        routineName: template.name,
        mode: this.selectedProtocolMode || 'standard',
        emomRounds: 12,
        emomRoundSec: 60,
        amrapRounds: 0,
        amrapMinutes: 15,
        startedAt: new Date().toISOString(),
        durationSec: 0,
        exercises: exercises
      };

      GQ.Store.state.activeSession = newSession;
      GQ.Store.save();

      GQ.Timer.playSuccessChime();
      this.toast(`Session started: ${template.name}`);
      this.resumeActiveSessionTimer();
      this.renderWorkoutTab();
    },

    resumeActiveSessionTimer() {
      clearInterval(activeSessionTimerInterval);
      const active = GQ.Store.state.activeSession;
      if (!active) return;

      const startTime = new Date(active.startedAt).getTime();
      const clockEl = document.getElementById('sessionTimerDisplay');

      activeSessionTimerInterval = setInterval(() => {
        const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
        active.durationSec = elapsedSec;
        if (clockEl) clockEl.innerText = GQ.U.clock(elapsedSec);
      }, 1000);
    },

    toggleEmomTimer() {
      const active = GQ.Store.state.activeSession;
      if (!active) return;

      if (GQ.Timer.isEmomRunning) {
        GQ.Timer.stopEMOM();
        this.toast('EMOM timer paused.');
        this.renderWorkoutTab();
      } else {
        const totalRounds = active.emomRounds || 12;
        GQ.Timer.startEMOM(
          totalRounds,
          60,
          (rem, total, curRound, totRounds) => {
            const clock = document.getElementById('emomCockpitClock');
            if (clock) clock.innerText = `${rem}s`;
          },
          (curRound, totRounds) => {
            this.toast(`🔔 ROUND ${curRound} / ${totRounds} — WORKOUT INTERVAL START!`);
            this.renderWorkoutTab();
          },
          () => {
            this.toast('🏆 EMOM Completed! All rounds logged.');
            this.renderWorkoutTab();
          }
        );
        this.toast('EMOM interval started! Work at the beep.');
        this.renderWorkoutTab();
      }
    },

    advanceEmomRound() {
      const active = GQ.Store.state.activeSession;
      if (!active) return;
      if (GQ.Timer.emomCurrentRound < (active.emomRounds || 12)) {
        GQ.Timer.emomCurrentRound++;
        GQ.Timer.emomRemainingSec = 60;
        GQ.Timer.beep(1046.5, 'triangle', 0.2, 0.25);
        this.toast(`Advanced to Round ${GQ.Timer.emomCurrentRound}`);
        this.renderWorkoutTab();
      }
    },

    toggleAmrapTimer() {
      const active = GQ.Store.state.activeSession;
      if (!active) return;

      if (GQ.Timer.isAmrapRunning) {
        GQ.Timer.stopAMRAP();
        this.toast('AMRAP paused.');
        this.renderWorkoutTab();
      } else {
        const totalMins = active.amrapMinutes || 15;
        GQ.Timer.startAMRAP(
          totalMins,
          (rem, total) => {
            const clock = document.getElementById('amrapCockpitClock');
            if (clock) clock.innerText = GQ.U.clock(rem);
          },
          () => {
            this.toast('🏆 AMRAP Time Limit Expired! Great job!');
            this.renderWorkoutTab();
          }
        );
        this.toast(`AMRAP ${totalMins}-minute clock started!`);
        this.renderWorkoutTab();
      }
    },

    recordAmrapRound() {
      const active = GQ.Store.state.activeSession;
      if (!active) return;
      active.amrapRounds = (active.amrapRounds || 0) + 1;
      GQ.Store.save();
      GQ.Timer.playSuccessChime();
      GQ.Timer.vibrate([150, 80, 200]);
      this.toast(`🔥 Circuit Round ${active.amrapRounds} Completed!`);
      this.renderWorkoutTab();
    },

    renderActiveSessionExercises(root, session) {
      const container = document.getElementById('exerciseListRoot');
      if (!container) return;
      container.innerHTML = '';

      let totalSets = 0;
      let completedSets = 0;
      let totalVolume = 0;

      const pastSessions = GQ.Store.state.sessions;
      const allPRs = GQ.Stats.calculatePRs(pastSessions);

      // Render Protocol Cockpit Banner
      const mode = session.mode || 'standard';
      const cockpitCard = document.createElement('div');
      cockpitCard.className = 'rounded-2xl bg-gradient-to-r from-obsidian-900 to-obsidian-850 border border-white/5 p-3.5 shadow-card-luxury space-y-2.5 mb-2';

      if (mode === 'emom') {
        const emomRound = GQ.Timer.emomCurrentRound;
        const totalRounds = session.emomRounds || 12;
        const targetExIdx = (emomRound - 1) % session.exercises.length;
        const targetEx = GQ.EX[session.exercises[targetExIdx].exerciseId];

        cockpitCard.innerHTML = `
          <div class="flex items-center justify-between pb-2 border-b border-white/5">
            <div class="flex items-center space-x-1.5">
              <span class="w-2 h-2 rounded-full ${GQ.Timer.isEmomRunning ? 'bg-lime-neon animate-pulse' : 'bg-amber-400'} shadow-neon-soft"></span>
              <span class="text-xs font-mono font-bold text-white uppercase tracking-wider">EMOM INTERVAL COCKPIT</span>
            </div>
            <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-lime-neon/15 text-lime-neon border border-lime-neon/30 font-bold">
              ROUND ${emomRound} / ${totalRounds}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[9px] font-mono text-slate-400">ACTIVE MINUTE TARGET</p>
              <p class="text-xs font-bold text-white mt-0.5">${targetEx ? targetEx.name : 'Movement'} <span class="text-lime-neon">(${targetEx ? targetEx.target : 10} reps)</span></p>
            </div>
            <div class="text-right">
              <span id="emomCockpitClock" class="text-2xl font-mono font-extrabold text-lime-neon">${GQ.Timer.emomRemainingSec}s</span>
            </div>
          </div>
          <div class="flex items-center space-x-2 pt-1 border-t border-white/5">
            <button onclick="GQ.UI.toggleEmomTimer()" class="flex-1 py-2 rounded-xl ${GQ.Timer.isEmomRunning ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-lime-neon text-black font-bold shadow-neon-soft'} text-xs font-mono transition-all">
              ${GQ.Timer.isEmomRunning ? '⏸ Pause EMOM' : '▶ Start EMOM Interval'}
            </button>
            <button onclick="GQ.UI.advanceEmomRound()" class="px-3 py-2 rounded-xl bg-obsidian-800 text-slate-300 hover:text-white border border-white/5 text-xs font-mono">
              Next Round ⏭
            </button>
          </div>
        `;
        container.appendChild(cockpitCard);
      } else if (mode === 'amrap') {
        const completedRounds = session.amrapRounds || 0;
        cockpitCard.innerHTML = `
          <div class="flex items-center justify-between pb-2 border-b border-white/5">
            <div class="flex items-center space-x-1.5">
              <span class="w-2 h-2 rounded-full ${GQ.Timer.isAmrapRunning ? 'bg-lime-neon animate-pulse' : 'bg-amber-400'} shadow-neon-soft"></span>
              <span class="text-xs font-mono font-bold text-white uppercase tracking-wider">AMRAP CIRCUIT COCKPIT</span>
            </div>
            <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-lime-neon/15 text-lime-neon border border-lime-neon/30 font-bold">
              ${session.amrapMinutes || 15} MIN TIME-CAP
            </span>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[9px] font-mono text-slate-400">COMPLETED CIRCUIT ROUNDS</p>
              <p class="text-xl font-mono font-extrabold text-white mt-0.5">${completedRounds} <span class="text-xs font-normal text-lime-neon">ROUNDS</span></p>
            </div>
            <div class="text-right">
              <span id="amrapCockpitClock" class="text-2xl font-mono font-extrabold text-lime-neon">${GQ.U.clock(GQ.Timer.amrapRemainingSec)}</span>
            </div>
          </div>
          <div class="flex items-center space-x-2 pt-1 border-t border-white/5">
            <button onclick="GQ.UI.recordAmrapRound()" class="flex-1 py-2 rounded-xl bg-lime-neon text-black font-bold font-mono text-xs shadow-neon-soft active:scale-95 transition-all">
              + COMPLETE 1 ROUND
            </button>
            <button onclick="GQ.UI.toggleAmrapTimer()" class="px-3 py-2 rounded-xl ${GQ.Timer.isAmrapRunning ? 'bg-obsidian-800 text-amber-300' : 'bg-obsidian-800 text-slate-300'} border border-white/5 text-xs font-mono">
              ${GQ.Timer.isAmrapRunning ? '⏸ Pause' : '▶ Start Timer'}
            </button>
          </div>
        `;
        container.appendChild(cockpitCard);
      } else if (mode === 'superset') {
        cockpitCard.innerHTML = `
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-1.5">
              <span class="text-lime-neon">⚡</span>
              <span class="text-xs font-mono font-bold text-white uppercase tracking-wider">SUPERSET PAIRING PROTOCOL</span>
            </div>
            <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-lime-neon/15 text-lime-neon border border-lime-neon/30 font-bold">
              HIGH DENSITY
            </span>
          </div>
          <p class="text-[10px] font-mono text-slate-400">Perform Movement A immediately followed by Movement B without resting. Rest interval triggers only after Movement B is completed.</p>
        `;
        container.appendChild(cockpitCard);
      }

      session.exercises.forEach((exItem, exIdx) => {
        const ex = GQ.EX[exItem.exerciseId];
        if (!ex) return;

        if (mode === 'superset' && exIdx % 2 === 0) {
          const pairNum = Math.floor(exIdx / 2) + 1;
          const pairHeader = document.createElement('div');
          pairHeader.className = 'flex items-center justify-between pt-2 pb-0.5 border-t border-dashed border-lime-neon/25';
          pairHeader.innerHTML = `
            <div class="flex items-center space-x-1.5">
              <span class="text-xs">⚡</span>
              <span class="text-[10px] font-mono font-bold text-lime-neon uppercase tracking-wider">SUPERSET PAIR ${pairNum}</span>
            </div>
            <span class="text-[9px] font-mono text-slate-400">Movement A ➔ B (Zero Rest Between)</span>
          `;
          container.appendChild(pairHeader);
        }

        const card = document.createElement('div');
        card.className = 'rounded-2xl bg-obsidian-900 border border-white/5 p-3.5 shadow-card-luxury';

        const unitLabel = GQ.unit(ex);
        const lastPerf = GQ.Stats.getLastPerformance(ex.id, pastSessions);

        // Sets markup
        let setsMarkup = '';
        exItem.sets.forEach((set, setIdx) => {
          totalSets++;
          if (set.done) {
            completedSets++;
            totalVolume += Number(set.actual || 0);
          }

          const isIso = ex.type === 'sec';

          setsMarkup += `
            <div class="flex items-center justify-between p-2 rounded-xl ${set.done ? 'bg-lime-neon/10 border border-lime-neon/30' : 'bg-obsidian-850 border border-white/5'} transition-all mt-1.5">
              <div class="flex items-center space-x-2.5">
                <span class="w-6 h-6 rounded-lg ${set.done ? 'bg-lime-neon text-black font-bold' : 'bg-obsidian-800 text-slate-400'} font-mono text-xs flex items-center justify-center">
                  ${set.num}
                </span>

                <!-- Quick Adjust Controls -->
                <div class="flex items-center space-x-1.5 font-mono text-xs">
                  <button onclick="GQ.UI.adjustSetActual(${exIdx}, ${setIdx}, -${GQ.stepFor(ex)})" class="w-5 h-5 rounded bg-obsidian-750 hover:bg-obsidian-700 text-slate-400 hover:text-white flex items-center justify-center font-bold">−</button>
                  <span onclick="GQ.UI.promptEditSet(${exIdx}, ${setIdx})" class="px-1.5 py-0.5 rounded cursor-pointer ${set.done ? 'text-lime-neon font-bold' : 'text-slate-200'} hover:bg-white/5">
                    ${set.actual} <span class="text-[10px] text-slate-400">${unitLabel}</span>
                    ${ex.weighted ? `<span class="text-[10px] text-amber-400 ml-0.5">(+${set.weightKg}kg)</span>` : ''}
                  </span>
                  <button onclick="GQ.UI.adjustSetActual(${exIdx}, ${setIdx}, ${GQ.stepFor(ex)})" class="w-5 h-5 rounded bg-obsidian-750 hover:bg-obsidian-700 text-slate-400 hover:text-white flex items-center justify-center font-bold">+</button>
                </div>

                ${set.pr ? `<span class="text-[9px] font-mono font-bold bg-amber-400/20 text-amber-400 border border-amber-400/30 px-1.5 py-0.2 rounded">PR!</span>` : ''}
              </div>

              <div class="flex items-center space-x-2">
                ${isIso && !set.done ? `
                  <button onclick="GQ.UI.openHoldTimerForSet(${exIdx}, ${setIdx})" class="px-2 py-1 rounded-lg bg-obsidian-750 border border-white/10 text-lime-neon font-mono text-[10px] flex items-center space-x-1 active:scale-95 transition-transform" title="Hold countdown">
                    <span>⏱</span>
                    <span>Hold</span>
                  </button>
                ` : ''}

                ${exItem.sets.length > 1 ? `
                  <button onclick="GQ.UI.removeSet(${exIdx}, ${setIdx})" class="text-slate-600 hover:text-rose-400 text-xs px-1" title="Remove set">✕</button>
                ` : ''}

                <button onclick="GQ.UI.toggleSet(${exIdx}, ${setIdx})" class="w-7 h-7 rounded-xl flex items-center justify-center transition-all ${set.done ? 'bg-lime-neon text-black shadow-neon-soft' : 'bg-obsidian-750 text-slate-500 hover:text-white'}">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                </button>
              </div>
            </div>
          `;
        });

        // Progression Advice
        const suggestion = GQ.Stats.checkProgressionSuggestion(ex.id, exItem.sets, GQ.Store.state.profile.equipment);
        let suggestionMarkup = '';
        if (suggestion) {
          suggestionMarkup = `
            <div class="mt-2 p-2.5 rounded-xl bg-lime-neon/10 border border-lime-neon/20 flex items-start space-x-2 text-[10px] font-mono text-lime-neon">
              <span class="text-sm">💡</span>
              <div>
                <p class="font-bold">${suggestion.title}</p>
                <p class="text-slate-300 mt-0.5">${suggestion.message}</p>
              </div>
            </div>
          `;
        }

        const supersetBadge = mode === 'superset'
          ? `<span class="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${exIdx % 2 === 0 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-lime-neon/20 text-lime-neon border border-lime-neon/30'}">${exIdx % 2 === 0 ? 'PART A' : 'PART B'}</span>`
          : '';

        card.innerHTML = `
          <div class="flex items-start justify-between mb-1.5">
            <div>
              <div class="flex items-center space-x-1.5 flex-wrap gap-y-1">
                <span class="text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${this.getTierBadgeClass(ex.tier)}">
                  ${GQ.TIERS[ex.tier].name}
                </span>
                ${supersetBadge}
                <span class="text-xs font-bold text-white">${ex.name}</span>
              </div>
              <p class="text-[10px] text-slate-400 mt-0.5">${ex.cue}</p>
              ${lastPerf ? `<p class="text-[9px] font-mono text-slate-500 mt-0.5">Last session: <span class="text-slate-300">${lastPerf.summary}</span></p>` : ''}
            </div>

            <button onclick="GQ.UI.openSwapDrawer(${exIdx})" class="text-[10px] font-mono font-bold text-lime-neon bg-lime-neon/10 hover:bg-lime-neon/20 border border-lime-neon/30 px-2 py-1 rounded-lg flex items-center space-x-1 active:scale-95 transition-all">
              <span>⇄</span>
              <span>SWAP</span>
            </button>
          </div>

          <div class="space-y-1">
            ${setsMarkup}
          </div>

          ${suggestionMarkup}

          <div class="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between">
            <span class="text-[9px] font-mono text-slate-500">
              ${exItem.sets.filter(s => s.done).length}/${exItem.sets.length} Sets Completed
            </span>
            <button onclick="GQ.UI.addSet(${exIdx})" class="text-[10px] font-mono text-slate-400 hover:text-lime-neon flex items-center space-x-1 py-0.5 px-2 rounded bg-obsidian-850 border border-white/5">
              <span>+ Add Set</span>
            </button>
          </div>
        `;

        container.appendChild(card);
      });

      // Update telemetry
      const progEl = document.getElementById('progressSetsDisplay');
      const volEl = document.getElementById('totalRepsDisplay');
      if (progEl) progEl.innerText = `${completedSets} / ${totalSets} Set`;
      if (volEl) volEl.innerText = `${totalVolume} Vol`;
    },

    getTierBadgeClass(tier) {
      if (tier === 1) return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      if (tier === 2) return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
      return 'bg-rose-500/10 text-rose-400 border border-rose-500/30';
    },

    toggleSet(exIdx, setIdx) {
      const active = GQ.Store.state.activeSession;
      if (!active) return;
      const st = active.exercises[exIdx].sets[setIdx];
      st.done = !st.done;

      if (st.done) {
        // Check PR
        const exId = active.exercises[exIdx].exerciseId;
        const pastPRs = GQ.Stats.calculatePRs(GQ.Store.state.sessions);
        if (GQ.Stats.isNewPR(exId, st.actual, st.weightKg, pastPRs)) {
          st.pr = true;
          this.toast('⚡ New Personal Record (PR) Achieved!');
          GQ.Timer.playSuccessChime();
        } else {
          GQ.Timer.beep(880, 'sine', 0.12, 0.25);
          GQ.Timer.vibrate(40);
        }

        // Rest trigger logic based on protocol mode
        if (active.mode === 'superset') {
          // If first exercise in a pair (even index), prompt to proceed immediately without rest
          if (exIdx % 2 === 0 && exIdx + 1 < active.exercises.length) {
            const nextEx = GQ.EX[active.exercises[exIdx + 1].exerciseId];
            this.toast(`⚡ Superset: Proceed immediately to ${nextEx ? nextEx.name : 'Next Movement'} with zero rest!`);
            GQ.Timer.beep(980, 'triangle', 0.15, 0.25);
          } else {
            // Second exercise in pair: trigger rest interval!
            GQ.Timer.startRest(GQ.Store.state.settings.restSec);
          }
        } else if (active.mode === 'emom') {
          this.toast('✓ Round set completed! Rest until next minute chime.');
        } else if (active.mode === 'amrap') {
          this.toast('✓ Set completed in circuit!');
        } else {
          // Standard mode: trigger rest interval
          GQ.Timer.startRest(GQ.Store.state.settings.restSec);
        }
      } else {
        st.pr = false;
        GQ.Timer.beep(440, 'sine', 0.08, 0.1);
      }

      GQ.Store.save();
      this.renderWorkoutTab();
    },

    adjustSetActual(exIdx, setIdx, delta) {
      const active = GQ.Store.state.activeSession;
      if (!active) return;
      const st = active.exercises[exIdx].sets[setIdx];
      st.actual = Math.max(1, Number(st.actual) + delta);
      GQ.Store.save();
      this.renderWorkoutTab();
    },

    addSet(exIdx) {
      const active = GQ.Store.state.activeSession;
      if (!active) return;
      const sets = active.exercises[exIdx].sets;
      const last = sets[sets.length - 1];
      const newNum = sets.length + 1;

      sets.push({
        num: newNum,
        target: last ? last.target : 10,
        actual: last ? last.actual : 10,
        weightKg: last ? last.weightKg : 0,
        done: false,
        pr: false
      });

      GQ.Store.save();
      GQ.Timer.beep(600, 'sine', 0.06);
      this.renderWorkoutTab();
    },

    removeSet(exIdx, setIdx) {
      const active = GQ.Store.state.activeSession;
      if (!active) return;
      const sets = active.exercises[exIdx].sets;
      if (sets.length <= 1) return;
      sets.splice(setIdx, 1);
      sets.forEach((s, i) => s.num = i + 1);
      GQ.Store.save();
      this.renderWorkoutTab();
    },

    openHoldTimerForSet(exIdx, setIdx) {
      const active = GQ.Store.state.activeSession;
      if (!active) return;
      const st = active.exercises[exIdx].sets[setIdx];
      const ex = GQ.EX[active.exercises[exIdx].exerciseId];

      const modal = document.getElementById('holdTimerModal');
      const counterText = document.getElementById('holdModalCounter');
      const exNameText = document.getElementById('holdModalExName');

      if (exNameText) exNameText.innerText = `${ex.name} — Set ${st.num}`;
      if (counterText) counterText.innerText = `${st.actual}s`;
      if (modal) modal.classList.remove('hidden'), modal.classList.add('flex');

      GQ.Timer.startHoldCountdown(
        Number(st.actual),
        (rem, total) => {
          if (counterText) counterText.innerText = `${rem}s`;
        },
        (totalDone) => {
          st.done = true;
          GQ.Store.save();
          this.closeHoldModal();
          this.renderWorkoutTab();
          GQ.Timer.startRest(GQ.Store.state.settings.restSec);
        }
      );
    },

    closeHoldModal() {
      GQ.Timer.stopHold();
      const modal = document.getElementById('holdTimerModal');
      if (modal) modal.classList.add('hidden'), modal.classList.remove('flex');
    },

    finishSession() {
      const active = GQ.Store.state.activeSession;
      if (!active) {
        this.toast('No workout session is currently active.');
        return;
      }

      // Check if at least 1 set done
      let completedCount = 0;
      active.exercises.forEach(e => {
        completedCount += e.sets.filter(s => s.done).length;
      });

      if (completedCount === 0) {
        this.toast('Complete at least 1 set before finishing the session!');
        GQ.Timer.beep(300, 'sine', 0.15);
        return;
      }

      // Finalize session
      clearInterval(activeSessionTimerInterval);
      GQ.Timer.stopEMOM();
      GQ.Timer.stopAMRAP();
      active.endedAt = new Date().toISOString();

      // Push to history
      GQ.Store.state.sessions.unshift(active);
      GQ.Store.state.activeSession = null;
      GQ.Store.save();

      // Show story card preview
      const streakInfo = GQ.Stats.calculateStreaks(GQ.Store.state.sessions);
      this.openRecapModal(active, streakInfo.currentStreak);

      this.renderAll();
      GQ.Timer.playSuccessChime();
    },

    promptResetSession() {
      this.showConfirmDialog(
        'Cancel Current Session?',
        'All set progress in the active workout session will be discarded.',
        () => {
          clearInterval(activeSessionTimerInterval);
          GQ.Timer.stopEMOM();
          GQ.Timer.stopAMRAP();
          GQ.Store.state.activeSession = null;
          GQ.Store.save();
          this.renderWorkoutTab();
          this.toast('Session has been cancelled.');
        }
      );
    },

    /* ── EXERCISE SWAP DRAWER ────────────────────────────────────── */
    openSwapDrawer(exIdx) {
      swappingExerciseIndex = exIdx;
      const active = GQ.Store.state.activeSession;
      if (!active) return;

      const currentEx = GQ.EX[active.exercises[exIdx].exerciseId];
      const userEq = GQ.Store.state.profile.equipment;

      const drawer = document.getElementById('exerciseSwapDrawer');
      const tag = document.getElementById('drawerCategoryTag');
      const listRoot = document.getElementById('drawerVariationsList');

      if (tag) tag.innerText = `CATEGORY: ${GQ.CATEGORIES[currentEx.cat].toUpperCase()}`;
      if (listRoot) {
        listRoot.innerHTML = '';
        // Same category exercises
        const candidates = GQ.EXERCISES.filter(x => x.cat === currentEx.cat);

        candidates.forEach(cand => {
          const isCurrent = cand.id === currentEx.id;
          const isAvail = GQ.isAvailable(cand, userEq);
          const missing = GQ.missingEq(cand, userEq);

          const card = document.createElement('div');
          card.className = `p-3 rounded-2xl border transition-all cursor-pointer ${
            isCurrent
              ? 'bg-lime-neon/15 border-lime-neon/40 shadow-neon-soft'
              : (isAvail ? 'bg-obsidian-850 border-white/5 hover:border-lime-neon/30 hover:bg-obsidian-800' : 'bg-obsidian-900 border-white/5 opacity-50')
          }`;

          if (isAvail && !isCurrent) {
            card.onclick = () => this.selectExerciseSwap(cand);
          }

          card.innerHTML = `
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold ${this.getTierBadgeClass(cand.tier)}">
                  ${GQ.TIERS[cand.tier].name}
                </span>
                <span class="text-xs font-bold text-white">${cand.name}</span>
              </div>
              ${isCurrent ? '<span class="text-[10px] font-mono font-bold text-lime-neon">ACTIVE</span>' : ''}
              ${!isAvail ? `<span class="text-[9px] font-mono text-amber-400">Requires ${missing.join(', ')}</span>` : ''}
            </div>
            <p class="text-[10px] text-slate-400 mt-1">${cand.cue}</p>
            <div class="flex items-center justify-between text-[9px] font-mono text-slate-500 mt-1.5">
              <span>Standard: ${cand.target} ${GQ.unit(cand)}</span>
              ${isAvail && !isCurrent ? '<span class="text-lime-neon">Select this movement →</span>' : ''}
            </div>
          `;
          listRoot.appendChild(card);
        });
      }

      if (drawer) drawer.classList.remove('hidden'), drawer.classList.add('flex');
    },

    closeSwapDrawer() {
      const drawer = document.getElementById('exerciseSwapDrawer');
      if (drawer) drawer.classList.add('hidden'), drawer.classList.remove('flex');
      swappingExerciseIndex = null;
    },

    selectExerciseSwap(newEx) {
      const active = GQ.Store.state.activeSession;
      if (!active || swappingExerciseIndex === null) return;

      const targetSlot = active.exercises[swappingExerciseIndex];
      targetSlot.exerciseId = newEx.id;
      targetSlot.sets.forEach(st => {
        st.target = newEx.target;
        st.actual = newEx.target;
        st.done = false;
        st.pr = false;
      });

      GQ.Store.save();
      this.closeSwapDrawer();
      this.renderWorkoutTab();
      this.toast(`Movement swapped to: ${newEx.name}`);
      GQ.Timer.beep(750, 'sine', 0.1);
    },

    /* ── TAB 2: HEATMAP & HISTORY ──────────────────────────────── */
    renderHeatmapTab() {
      const stats = GQ.Stats.calculateStreaks(GQ.Store.state.sessions);

      // Numbers
      const curStreakEl = document.getElementById('statCurrentStreak');
      const totSessionEl = document.getElementById('statTotalSessions');
      if (curStreakEl) curStreakEl.innerText = stats.currentStreak;
      if (totSessionEl) totSessionEl.innerText = stats.totalWorkouts;

      // Heatmap Grid (16 weeks Monday to Sunday)
      const grid = document.getElementById('heatmapGridCells');
      if (grid) {
        grid.innerHTML = '';
        const cells = GQ.Stats.buildHeatmap(GQ.Store.state.sessions, 16);

        const levelClasses = {
          0: 'bg-obsidian-800/80 border border-white/5',
          1: 'bg-[#1e2f0a] border border-[#2b4412]',
          2: 'bg-[#4d750d] border border-[#639915]',
          3: 'bg-[#8cb90e] border border-[#9fd611]',
          4: 'bg-lime-neon shadow-neon-glow'
        };

        cells.forEach(c => {
          const div = document.createElement('div');
          div.className = `w-[11px] h-[11px] rounded-[2.5px] cursor-pointer transition-transform hover:scale-125 ${levelClasses[c.level]} ${c.isToday ? 'ring-1 ring-white' : ''}`;
          div.title = `${c.dateKey}: Volume ${c.volume}`;
          div.onclick = () => {
            GQ.Timer.beep(550, 'sine', 0.05);
            this.toast(`${GQ.U.fmtDate(c.date)}: ${c.volume > 0 ? `Total volume ${c.volume}` : 'Rest day'}`);
          };
          grid.appendChild(div);
        });
      }

      // Recent sessions list
      const listContainer = document.getElementById('recentSessionsContainer');
      if (listContainer) {
        listContainer.innerHTML = '';
        const sessions = GQ.Store.state.sessions;

        if (sessions.length === 0) {
          listContainer.innerHTML = `<div class="p-4 rounded-2xl bg-obsidian-900 border border-white/5 text-center text-xs font-mono text-slate-500">No workout history logged yet. Start your first session!</div>`;
        } else {
          sessions.slice(0, 10).forEach(s => {
            const row = document.createElement('div');
            row.className = 'rounded-xl bg-obsidian-900 border border-white/5 p-3 flex items-center justify-between hover:border-lime-neon/40 hover:bg-obsidian-850 cursor-pointer transition-all group';
            row.title = 'Click to view Official Recap Story Card';
            row.onclick = () => this.openRecapModal(s, stats.currentStreak);

            let vol = 0;
            if (s.legacyVolume) vol = s.legacyVolume;
            else if (s.exercises) {
              s.exercises.forEach(e => e.sets.forEach(st => { if (st.done) vol += Number(st.actual || 0); }));
            }

            const durMin = Math.round((s.durationSec || 0) / 60);

            row.innerHTML = `
              <div>
                <p class="text-xs font-bold text-white group-hover:text-lime-neon transition-colors">${s.routineName || 'Solo Workout'}</p>
                <p class="text-[10px] font-mono text-slate-400">${GQ.U.fmtDate(new Date(s.startedAt))} • ${durMin} Min</p>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-xs font-mono font-bold text-lime-neon">${vol} Vol</span>
                <span class="text-[9px] font-mono text-slate-400 border border-white/10 px-1.5 py-0.5 rounded group-hover:border-lime-neon/40 group-hover:text-lime-neon">RECAP →</span>
              </div>
            `;
            listContainer.appendChild(row);
          });
        }
      }

      // Render Interactive Muscle Anatomy Heatmap
      if (GQ.Anatomy) GQ.Anatomy.render();
    },

    /* ── TAB 3: SKILL TREE ──────────────────────────────────────── */
    renderSkillsTab() {
      const container = document.getElementById('skillsContainer');
      if (!container) return;
      container.innerHTML = '';

      const skills = GQ.SKILLS;
      const manual = GQ.Store.state.skillManual;
      const pastSessions = GQ.Store.state.sessions;
      const prs = GQ.Stats.calculatePRs(pastSessions);

      skills.forEach(skill => {
        const ladderSteps = GQ.LADDER_STEPS[skill.ladder] || [];
        if (ladderSteps.length === 0) return;

        // Highest unlocked step
        let unlockedIndex = -1;
        ladderSteps.forEach((st, idx) => {
          const pr = prs[st.id];
          const hasManual = !!manual[st.id];
          const hasDone = pr && (pr.maxReps > 0 || pr.maxSec > 0);
          if (hasManual || hasDone) {
            unlockedIndex = idx;
          }
        });

        const percent = Math.round(((unlockedIndex + 1) / ladderSteps.length) * 100);
        const currentStepName = unlockedIndex >= 0 ? ladderSteps[unlockedIndex].name : 'Not started';

        const card = document.createElement('div');
        card.className = 'rounded-2xl bg-obsidian-900 border border-white/5 p-4 shadow-card-luxury';

        card.innerHTML = `
          <div class="flex items-center justify-between mb-2">
            <div>
              <h4 class="text-xs font-bold text-white">${skill.name}</h4>
              <p class="text-[10px] font-mono text-slate-400">Milestone: <span class="text-lime-neon">${currentStepName}</span></p>
            </div>
            <span class="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-lime-neon/10 text-lime-neon border border-lime-neon/20 uppercase">
              ${percent}% MASTERY
            </span>
          </div>

          <div class="w-full bg-obsidian-800 rounded-full h-1.5 overflow-hidden my-2">
            <div class="bg-gradient-to-r from-lime-dim to-lime-neon h-full rounded-full transition-all duration-500" style="width: ${percent}%"></div>
          </div>

          <!-- Milestones Ladder Pills -->
          <div class="flex flex-wrap gap-1.5 mt-2.5">
            ${ladderSteps.map((step, idx) => {
              const isPassed = idx <= unlockedIndex;
              return `
                <button onclick="GQ.UI.toggleManualMilestone('${step.id}')" class="text-[9px] font-mono px-2 py-0.5 rounded border transition-all ${
                  isPassed
                    ? 'bg-lime-neon/20 border-lime-neon/40 text-lime-neon font-bold'
                    : 'bg-obsidian-850 border-white/5 text-slate-500 hover:text-slate-300'
                }" title="Click to toggle mastery for this milestone">
                  ${isPassed ? '✓ ' : ''}${step.name}
                </button>
              `;
            }).join('')}
          </div>
        `;

        container.appendChild(card);
      });
    },

    toggleManualMilestone(exId) {
      const manual = GQ.Store.state.skillManual;
      if (manual[exId]) {
        delete manual[exId];
        this.toast('Milestone removed.');
      } else {
        manual[exId] = GQ.U.dateKey();
        this.toast('Milestone unlocked! Outstanding!');
        GQ.Timer.playSuccessChime();
      }
      GQ.Store.save();
      this.renderSkillsTab();
    },

    /* ── RECAP STORY CARD MODAL ─────────────────────────────────── */
    _shaderBg: null,

    openRecapModal(session, streak) {
      const modal = document.getElementById('gymQuestRecapModal');

      this._currentRecapSession = session;
      this._currentRecapStreak = streak;

      // Populate DOM elements inside the 9:16 card preview
      const sessionDate = new Date(session.startedAt);
      const dateText = GQ.U.fmtDate(sessionDate, { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
      const timeText = GQ.U.fmtTime(sessionDate);

      const durMins = Math.max(1, Math.round((session.durationSec || 0) / 60));

      let totalVol = 0;
      let conqueredNames = [];
      (session.exercises || []).forEach(e => {
        let hasDone = false;
        e.sets.forEach(st => {
          if (st.done) {
            totalVol += Number(st.actual || 0);
            hasDone = true;
          }
        });
        if (hasDone) {
          const ex = GQ.EX[e.exerciseId];
          conqueredNames.push(ex ? ex.name : e.exerciseId);
        }
      });

      const protocolEl = document.getElementById('cardProtocolLevelSub');
      const dateEl = document.getElementById('cardDateText');
      const timeEl = document.getElementById('cardTimeText');
      const headlineEl = document.getElementById('cardSessionHeadline');
      const athleteEl = document.getElementById('cardAthleteLevelDesc');
      const durEl = document.getElementById('cardDurationVal');
      const repsEl = document.getElementById('cardRepsVal');
      const streakEl = document.getElementById('cardStreakVal');
      const pillsContainer = document.getElementById('cardExercisesListPills');

      let protocolSub = 'CALISTHENICS PROTOCOL // OFFICIAL';
      if (session.mode === 'superset') {
        protocolSub = 'SUPERSET PAIRING // HIGH DENSITY';
      } else if (session.mode === 'emom') {
        protocolSub = `EMOM PROTOCOL // ${session.emomRounds || 12} ROUNDS LOGGED`;
      } else if (session.mode === 'amrap') {
        protocolSub = `AMRAP PROTOCOL // ${session.amrapRounds || 0} ROUNDS COMPLETED`;
      }
      if (protocolEl) protocolEl.innerText = protocolSub;
      if (dateEl) dateEl.innerText = dateText;
      if (timeEl) timeEl.innerText = `${timeText} • VERIFIED`;
      if (headlineEl) headlineEl.innerText = session.routineName || 'Workout Session';
      if (athleteEl) {
        const athleteName = (GQ.Store && GQ.Store.state.profile.name) || 'Athlete';
        athleteEl.innerText = `${athleteName} • GymQuest Division`;
      }
      if (durEl) durEl.innerHTML = `${durMins}<span class="text-[10px] font-normal text-slate-400 ml-0.5">MIN</span>`;
      if (repsEl) repsEl.innerHTML = `${totalVol}<span class="text-[10px] font-normal text-lime-neon ml-0.5">VOL</span>`;
      if (streakEl) streakEl.innerHTML = `${streak}<span class="text-[10px] font-normal text-lime-neon ml-0.5">D</span>`;

      if (pillsContainer) {
        pillsContainer.innerHTML = conqueredNames.map(name => `
          <span class="text-[9px] font-mono bg-obsidian-850/80 border border-white/10 px-2 py-0.5 rounded-lg text-slate-200">
            ${name}
          </span>
        `).join('');
      }

      // Render Dynamic Biometric Workload & Intensity Telemetry Chart
      this.renderTelemetrySVG(session);

      // Show modal
      if (modal) modal.classList.remove('hidden'), modal.classList.add('flex');

      // Initialize & Run WebGL Cyber Shader Background
      const shaderCanvas = document.getElementById('recapShaderCanvas');
      if (shaderCanvas && GQ.ShaderBackground) {
        if (!this._shaderBg) {
          this._shaderBg = new GQ.ShaderBackground(shaderCanvas);
        }
        // Defer 1 frame so layout reflow has computed exact canvas client dimensions
        requestAnimationFrame(() => {
          if (this._shaderBg) {
            this._shaderBg.start();
          }
        });
      }
    },

    closeRecapModal() {
      if (this._shaderBg) {
        this._shaderBg.stop();
      }
      const modal = document.getElementById('gymQuestRecapModal');
      if (modal) modal.classList.add('hidden'), modal.classList.remove('flex');
    },

    downloadRecapPNG() {
      if (!this._currentRecapSession) return;
      GQ.Card.downloadPNG(this._currentRecapSession, this._currentRecapStreak);
      this.toast('GymQuest HD Card downloaded successfully!');
    },

    shareRecapCard() {
      if (!this._currentRecapSession) return;
      GQ.Card.shareStory(this._currentRecapSession, this._currentRecapStreak);
    },

    previewLatestRecap() {
      const sessions = GQ.Store.state.sessions;
      const streakInfo = GQ.Stats.calculateStreaks(sessions);
      if (sessions && sessions.length > 0) {
        this.openRecapModal(sessions[0], streakInfo.currentStreak);
      } else {
        // Sample demonstration session with rich data
        const sampleSession = {
          routineId: 'golden_hybrid_upper',
          routineName: 'Upper Body Armor (Hybrid)',
          startedAt: new Date(Date.now() - 38 * 60000).toISOString(),
          endedAt: new Date().toISOString(),
          durationSec: 2280,
          exercises: [
            { exerciseId: 'pushup_reg', sets: [{ num: 1, actual: 15, done: true }, { num: 2, actual: 12, done: true }] },
            { exerciseId: 'db_kickback', sets: [{ num: 1, actual: 12, done: true }, { num: 2, actual: 12, done: true }] },
            { exerciseId: 'dip_parallel', sets: [{ num: 1, actual: 10, done: true }, { num: 2, actual: 8, done: true }] }
          ]
        };
        this.openRecapModal(sampleSession, Math.max(1, streakInfo.currentStreak || 1));
      }
    },

    renderTelemetrySVG(session) {
      const container = document.getElementById('cardWorkloadTelemetryContainer');
      if (!container) return;

      const sets = [];
      (session.exercises || []).forEach(e => {
        const ex = GQ.EX[e.exerciseId];
        (e.sets || []).forEach((st, idx) => {
          if (st.done) {
            sets.push({
              exName: ex ? ex.name : e.exerciseId,
              reps: Number(st.actual || st.target || 10),
              weightKg: Number(st.weightKg || 0),
              isPR: Boolean(st.pr),
              setNum: idx + 1
            });
          }
        });
      });

      const displaySets = sets.length > 0 ? sets : [
        { exName: 'Push-Up', reps: 15, weightKg: 0, setNum: 1 },
        { exName: 'Push-Up', reps: 12, weightKg: 0, setNum: 2 },
        { exName: 'Kickback', reps: 12, weightKg: 8, setNum: 1 },
        { exName: 'Kickback', reps: 10, weightKg: 8, setNum: 2 },
        { exName: 'Dip', reps: 10, weightKg: 0, setNum: 1 },
        { exName: 'Dip', reps: 8, weightKg: 0, setNum: 2 }
      ];

      const count = displaySets.length;
      const maxReps = Math.max(...displaySets.map(s => s.reps), 1);

      const W = 320;
      const H = 64;
      const padL = 12;
      const padR = 12;
      const padT = 10;
      const padB = 14;
      const chartW = W - padL - padR;
      const chartH = H - padT - padB;

      // Dashed grid lines (25%, 50%, 75%, 100%)
      const gridLines = [0.25, 0.5, 0.75, 1.0].map(p => {
        const y = (padT + chartH * (1 - p)).toFixed(1);
        return `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="2,3" stroke-width="0.8"/>`;
      }).join('');

      const step = count > 1 ? chartW / (count - 1) : chartW / 2;
      const points = displaySets.map((s, i) => {
        const x = count > 1 ? padL + i * step : padL + chartW * 0.5;
        const ratio = Math.min(1, Math.max(0.18, s.reps / maxReps));
        const y = padT + chartH * (1 - ratio);
        return { x, y, reps: s.reps, isPR: s.isPR, name: s.exName };
      });

      // Load bars
      const barW = Math.max(4, Math.min(10, chartW / (count * 2.2)));
      const bars = points.map(pt => {
        const barH = (padT + chartH) - pt.y;
        return `
          <rect x="${(pt.x - barW / 2).toFixed(1)}" y="${pt.y.toFixed(1)}" width="${barW}" height="${barH.toFixed(1)}" rx="2" fill="rgba(255,255,255,0.07)"/>
          <rect x="${(pt.x - barW / 2).toFixed(1)}" y="${pt.y.toFixed(1)}" width="${barW}" height="2" rx="1" fill="#D4FF00" opacity="0.9"/>
        `;
      }).join('');

      // Continuous bezier spline
      let pathD = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const mx = (p0.x + p1.x) / 2;
        pathD += ` C ${mx.toFixed(1)} ${p0.y.toFixed(1)}, ${mx.toFixed(1)} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
      }

      const dots = points.map(pt => `
        <circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="2.5" fill="#D4FF00"/>
        ${pt.isPR ? `<circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="5" fill="none" stroke="#D4FF00" stroke-width="1" stroke-dasharray="2,2"/>` : ''}
      `).join('');

      container.innerHTML = `
        <div class="flex items-center justify-between text-[8px] font-mono text-slate-400 mb-1.5">
          <span class="flex items-center space-x-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-lime-neon/90 shadow-neon-soft"></span>
            <span class="tracking-wider">WORKLOAD SPECTRUM // TELEMETRY (${count} SETS)</span>
          </span>
          <span class="text-lime-neon font-bold tracking-widest">PEAK ${maxReps} REPS</span>
        </div>
        <svg class="w-full h-14" viewBox="0 0 ${W} ${H}" fill="none">
          <defs>
            <linearGradient id="gqTeleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#D4FF00" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#D4FF00" stop-opacity="0.0"/>
            </linearGradient>
          </defs>
          ${gridLines}
          ${bars}
          <path d="${pathD} L ${points[points.length - 1].x.toFixed(1)} ${padT + chartH} L ${points[0].x.toFixed(1)} ${padT + chartH} Z" fill="url(#gqTeleGrad)"/>
          <path d="${pathD}" stroke="#D4FF00" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          ${dots}
        </svg>
      `;
    },

    /* ── ONBOARDING & EQUIPMENT PROFILE ─────────────────────────── */
    openOnboardingModal() {
      const modal = document.getElementById('onboardingModal');
      if (modal) modal.classList.remove('hidden'), modal.classList.add('flex');
      this.renderEquipmentCheckboxes('onboardingEqList');
    },

    closeOnboardingModal() {
      const modal = document.getElementById('onboardingModal');
      if (modal) modal.classList.add('hidden'), modal.classList.remove('flex');
    },

    saveOnboarding() {
      const nameInput = document.getElementById('onboardingNameInput');
      const tierSelect = document.getElementById('onboardingTierSelect');
      const dbKgInput = document.getElementById('onboardingDbKgInput');

      if (nameInput && nameInput.value.trim()) {
        GQ.Store.state.profile.name = nameInput.value.trim();
      }
      if (tierSelect) {
        GQ.Store.state.profile.tier = Number(tierSelect.value) || 1;
      }
      if (dbKgInput) {
        GQ.Store.state.profile.dbKg = Number(dbKgInput.value) || 5;
      }

      GQ.Store.state.onboarded = true;
      GQ.Store.save();
      this.closeOnboardingModal();
      this.renderAll();
      this.toast('Profile saved successfully!');
    },

    renderEquipmentCheckboxes(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;
      const userEq = GQ.Store.state.profile.equipment;

      container.innerHTML = GQ.EQUIPMENT.map(eq => {
        const checked = userEq.includes(eq.id);
        return `
          <label class="flex items-center space-x-2.5 p-2 rounded-xl bg-obsidian-850 border border-white/5 cursor-pointer hover:bg-obsidian-800 transition-colors">
            <input type="checkbox" onchange="GQ.UI.toggleEquipment('${eq.id}', this.checked)" ${checked ? 'checked' : ''} class="w-4 h-4 rounded accent-lime-neon">
            <span class="text-xs font-mono text-slate-200">${eq.name}</span>
          </label>
        `;
      }).join('');
    },

    toggleEquipment(eqId, isChecked) {
      const userEq = GQ.Store.state.profile.equipment;
      if (isChecked && !userEq.includes(eqId)) {
        userEq.push(eqId);
      } else if (!isChecked) {
        const idx = userEq.indexOf(eqId);
        if (idx >= 0) userEq.splice(idx, 1);
      }
      GQ.Store.save();
    },

    /* ── SETTINGS & DATA MANAGEMENT ─────────────────────────────── */
    openSettingsModal() {
      const modal = document.getElementById('dataManagementModal');
      this.renderEquipmentCheckboxes('settingsEqList');
      if (modal) modal.classList.remove('hidden'), modal.classList.add('flex');
    },

    closeSettingsModal() {
      const modal = document.getElementById('dataManagementModal');
      if (modal) modal.classList.add('hidden'), modal.classList.remove('flex');
      this.renderAll();
    },

    showConfirmDialog(title, desc, callback) {
      const modal = document.getElementById('confirmActionModal');
      const titleEl = document.getElementById('confirmDialogTitle');
      const descEl = document.getElementById('confirmDialogDescription');
      const execBtn = document.getElementById('confirmExecuteBtn');

      if (titleEl) titleEl.innerText = title;
      if (descEl) descEl.innerText = desc;
      if (execBtn) {
        execBtn.onclick = () => {
          this.closeConfirmModal();
          if (callback) callback();
        };
      }
      if (modal) modal.classList.remove('hidden'), modal.classList.add('flex');
    },

    closeConfirmModal() {
      const modal = document.getElementById('confirmActionModal');
      if (modal) modal.classList.add('hidden'), modal.classList.remove('flex');
    },

    changeTab(tabKey) {
      currentTab = tabKey;
      GQ.Timer.beep(600, 'sine', 0.04);

      document.querySelectorAll('.view-panel').forEach(v => v.classList.add('hidden'));
      const active = document.getElementById(`tab-${tabKey}`);
      if (active) active.classList.remove('hidden');

      document.querySelectorAll('.nav-dock-btn').forEach(b => {
        b.classList.remove('text-lime-neon');
        b.classList.add('text-slate-400');
      });

      const activeBtn = document.getElementById(`nav-btn-${tabKey}`);
      if (activeBtn) {
        activeBtn.classList.add('text-lime-neon');
        activeBtn.classList.remove('text-slate-400');
      }

      if (tabKey === 'skills') this.renderSkillsTab();
      else if (tabKey === 'consistency') this.renderHeatmapTab();
      else if (tabKey === 'workout') this.renderWorkoutTab();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    /* ── CUSTOM ROUTINE CREATOR LOGIC ───────────────────────────── */
    _customSelectedExercises: [],

    openCustomRoutineModal() {
      this._customSelectedExercises = [];
      const modal = document.getElementById('customRoutineModal');
      const nameIn = document.getElementById('customRoutineNameInput');
      const descIn = document.getElementById('customRoutineDescInput');
      const searchIn = document.getElementById('customExerciseSearchInput');

      if (nameIn) nameIn.value = '';
      if (descIn) descIn.value = '';
      if (searchIn) searchIn.value = '';

      this.updateCustomSelectedCount();
      this.filterCustomExercises('');

      if (modal) modal.classList.remove('hidden'), modal.classList.add('flex');
    },

    closeCustomRoutineModal() {
      const modal = document.getElementById('customRoutineModal');
      if (modal) modal.classList.add('hidden'), modal.classList.remove('flex');
    },

    updateCustomSelectedCount() {
      const el = document.getElementById('customSelectedCount');
      if (el) el.innerText = this._customSelectedExercises.length;
    },

    filterCustomExercises(query = '') {
      const container = document.getElementById('customExercisesPickerList');
      if (!container) return;

      const q = query.toLowerCase().trim();
      const userEq = GQ.Store.state.profile.equipment;

      const filtered = GQ.EXERCISES.filter(ex => {
        const matchesQuery = !q || ex.name.toLowerCase().includes(q) || ex.cat.toLowerCase().includes(q);
        const matchesEq = GQ.isAvailable(ex, userEq);
        return matchesQuery && matchesEq;
      });

      if (filtered.length === 0) {
        container.innerHTML = `<p class="text-[10px] font-mono text-slate-500 text-center py-4">No movements match your query or required equipment.</p>`;
        return;
      }

      container.innerHTML = filtered.map(ex => {
        const isSelected = this._customSelectedExercises.some(item => item.id === ex.id);
        return `
          <div onclick="GQ.UI.togglePickExercise('${ex.id}')" class="p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
            isSelected
              ? 'bg-lime-neon/15 border-lime-neon/50 text-white'
              : 'bg-obsidian-850 border-white/5 text-slate-300 hover:border-white/20'
          }">
            <div>
              <div class="flex items-center space-x-1.5">
                <span class="text-[8px] font-mono px-1.5 py-0.2 rounded uppercase ${GQ.UI.getTierBadgeClass(ex.tier)}">${GQ.TIERS[ex.tier].name}</span>
                <p class="text-xs font-bold text-white">${ex.name}</p>
              </div>
              <p class="text-[9px] font-mono text-slate-400 mt-0.5">${ex.cue}</p>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-[10px] font-mono ${isSelected ? 'text-lime-neon font-bold' : 'text-slate-500'}">
                ${isSelected ? '✓ SELECTED' : '+ SELECT'}
              </span>
            </div>
          </div>
        `;
      }).join('');
    },

    togglePickExercise(exId) {
      const idx = this._customSelectedExercises.findIndex(x => x.id === exId);
      if (idx >= 0) {
        this._customSelectedExercises.splice(idx, 1);
      } else {
        const ex = GQ.EX[exId];
        if (ex) {
          this._customSelectedExercises.push({
            id: ex.id,
            sets: 3,
            target: ex.target
          });
        }
      }

      this.updateCustomSelectedCount();
      const searchIn = document.getElementById('customExerciseSearchInput');
      this.filterCustomExercises(searchIn ? searchIn.value : '');
    },

    saveCustomRoutine() {
      const nameIn = document.getElementById('customRoutineNameInput');
      const descIn = document.getElementById('customRoutineDescInput');

      const name = nameIn && nameIn.value.trim();
      if (!name) {
        this.toast('Please enter a routine name!');
        return;
      }

      if (this._customSelectedExercises.length === 0) {
        this.toast('Select at least 1 exercise for this routine!');
        return;
      }

      const newRoutine = {
        id: GQ.U.uid(),
        name: name,
        desc: (descIn && descIn.value.trim()) || 'Custom training protocol',
        slots: this._customSelectedExercises.map(item => ({
          exerciseId: item.id,
          sets: 3,
          target: item.target
        }))
      };

      GQ.Store.state.routines = GQ.Store.state.routines || [];
      GQ.Store.state.routines.push(newRoutine);
      GQ.Store.save();

      this.closeCustomRoutineModal();
      this.renderWorkoutTab();
      this.toast(`Routine "${name}" created successfully!`);
      GQ.Timer.playSuccessChime();
    },

    startCustomRoutine(crIndex) {
      const cr = GQ.Store.state.routines[crIndex];
      if (!cr) return;

      const defaultDbKg = GQ.Store.state.profile.dbKg || 5;
      const exercises = cr.slots.map(slot => {
        const ex = GQ.EX[slot.exerciseId];
        const setsArr = [];
        for (let i = 1; i <= slot.sets; i++) {
          setsArr.push({
            num: i,
            target: slot.target || (ex ? ex.target : 10),
            actual: slot.target || (ex ? ex.target : 10),
            weightKg: (ex && ex.weighted) ? defaultDbKg : 0,
            done: false,
            pr: false
          });
        }
        return {
          exerciseId: slot.exerciseId,
          sets: setsArr
        };
      });

      const newSession = {
        id: GQ.U.uid(),
        routineKey: 'custom_' + cr.id,
        routineName: cr.name,
        mode: this.selectedProtocolMode || 'standard',
        emomRounds: 12,
        emomRoundSec: 60,
        amrapRounds: 0,
        amrapMinutes: 15,
        startedAt: new Date().toISOString(),
        durationSec: 0,
        exercises: exercises
      };

      GQ.Store.state.activeSession = newSession;
      GQ.Store.save();

      GQ.Timer.playSuccessChime();
      this.toast(`Session started: ${cr.name}`);
      this.resumeActiveSessionTimer();
      this.renderWorkoutTab();
    },

    deleteCustomRoutine(crIndex) {
      this.showConfirmDialog(
        'Delete Routine?',
        'This custom routine will be deleted from your menu.',
        () => {
          GQ.Store.state.routines.splice(crIndex, 1);
          GQ.Store.save();
          this.renderWorkoutTab();
          this.toast('Custom routine has been deleted.');
        }
      );
    }
  };

  GQ.UI = UI;
})(window.GQ);
