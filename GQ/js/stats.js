/* GymQuest — calculation engine.
 * Computes streaks, heatmaps, personal records (PR), progress charts, and suggestions
 * purely derived from `sessions`. No hardcoded illusions.
 */
(function (GQ) {
  'use strict';

  const Stats = {
    /**
     * Compute current streak and longest streak in weeks or days.
     * In calisthenics, consistency can be measured by weekly target and daily continuity.
     * We calculate real daily streak (with grace period if planned) and weekly adherence.
     */
    calculateStreaks(sessions) {
      if (!sessions || sessions.length === 0) {
        return { currentStreak: 0, longestStreak: 0, totalWorkouts: 0, totalVolume: 0, totalDurationMin: 0 };
      }

      // Unique local dates sorted ascending
      const datesSet = new Set();
      let totalVol = 0;
      let totalSec = 0;

      sessions.forEach(s => {
        const d = new Date(s.startedAt);
        datesSet.add(GQ.U.dateKey(d));
        totalSec += (s.durationSec || 0);

        if (s.legacyVolume) {
          totalVol += s.legacyVolume;
        } else if (s.exercises) {
          s.exercises.forEach(ex => {
            ex.sets.forEach(st => {
              if (st.done) totalVol += (Number(st.actual) || 0);
            });
          });
        }
      });

      const sortedDates = Array.from(datesSet).sort();
      const totalWorkouts = sessions.length;

      // Calculate streak ending today or yesterday
      const today = GQ.U.dateKey(new Date());
      const yesterday = GQ.U.dateKey(GQ.U.addDays(new Date(), -1));

      let currentStreak = 0;
      let checkDate = datesSet.has(today) ? today : (datesSet.has(yesterday) ? yesterday : null);

      if (checkDate) {
        let cur = GQ.U.keyToDate(checkDate);
        while (true) {
          const key = GQ.U.dateKey(cur);
          if (datesSet.has(key)) {
            currentStreak++;
            cur = GQ.U.addDays(cur, -1);
          } else {
            break;
          }
        }
      }

      // Longest streak
      let longestStreak = 0;
      let tempStreak = 0;
      let lastDate = null;

      sortedDates.forEach(dateStr => {
        const curDate = GQ.U.keyToDate(dateStr);
        if (!lastDate) {
          tempStreak = 1;
        } else {
          const diff = GQ.U.daysBetween(lastDate, curDate);
          if (diff === 1) {
            tempStreak++;
          } else if (diff > 1) {
            tempStreak = 1;
          }
        }
        if (tempStreak > longestStreak) longestStreak = tempStreak;
        lastDate = curDate;
      });

      return {
        currentStreak,
        longestStreak: Math.max(longestStreak, currentStreak),
        totalWorkouts,
        totalVolume: totalVol,
        totalDurationMin: Math.round(totalSec / 60)
      };
    },

    /**
     * Build heatmap data for the last N weeks (default 16 weeks / ~112 days).
     * Level 0 to 4 based on actual volume/intensity.
     */
    buildHeatmap(sessions, weeks = 16) {
      const dayMap = {};
      sessions.forEach(s => {
        const key = GQ.U.dateKey(new Date(s.startedAt));
        let vol = 0;
        if (s.legacyVolume) vol += s.legacyVolume;
        if (s.exercises) {
          s.exercises.forEach(ex => {
            ex.sets.forEach(st => {
              if (st.done) vol += (Number(st.actual) || 0);
            });
          });
        }
        dayMap[key] = (dayMap[key] || 0) + vol;
      });

      const totalDays = weeks * 7;
      const today = new Date();
      // Start from (weeks ago) Monday to align nicely with Sen-Min grid
      const mondayOffset = (today.getDay() + 6) % 7;
      const startDate = GQ.U.addDays(GQ.U.startOfDay(today), -((weeks - 1) * 7 + mondayOffset));

      const cells = [];
      for (let i = 0; i < totalDays; i++) {
        const d = GQ.U.addDays(startDate, i);
        const key = GQ.U.dateKey(d);
        const vol = dayMap[key] || 0;

        let level = 0;
        if (vol > 0) {
          if (vol < 30) level = 1;
          else if (vol < 60) level = 2;
          else if (vol < 100) level = 3;
          else level = 4;
        }

        cells.push({
          date: d,
          dateKey: key,
          volume: vol,
          level: level,
          isToday: key === GQ.U.dateKey(today)
        });
      }

      return cells;
    },

    /**
     * Compute Personal Records (PR) for every exercise across all logged sessions.
     * PR can be: max reps, max weight, or max hold time.
     */
    calculatePRs(sessions) {
      const prs = {}; // { exerciseId: { maxReps, maxSec, maxWeight, bestDate } }

      sessions.forEach(s => {
        if (!s.exercises) return;
        s.exercises.forEach(e => {
          const ex = GQ.EX[e.exerciseId];
          if (!ex) return;
          if (!prs[e.exerciseId]) {
            prs[e.exerciseId] = { maxReps: 0, maxSec: 0, maxWeight: 0, bestDate: s.startedAt };
          }
          const rec = prs[e.exerciseId];

          e.sets.forEach(st => {
            if (!st.done) return;
            const val = Number(st.actual) || 0;
            const wt = Number(st.weightKg) || 0;

            if (ex.type === 'sec') {
              if (val > rec.maxSec) {
                rec.maxSec = val;
                rec.bestDate = s.startedAt;
              }
            } else {
              if (val > rec.maxReps) {
                rec.maxReps = val;
                rec.bestDate = s.startedAt;
              }
            }
            if (wt > rec.maxWeight) {
              rec.maxWeight = wt;
            }
          });
        });
      });

      return prs;
    },

    /**
     * Detect if a set achieves a new PR compared to past history.
     */
    isNewPR(exerciseId, actualVal, weightKg, existingPRs) {
      const ex = GQ.EX[exerciseId];
      if (!ex) return false;
      const pr = existingPRs[exerciseId];
      if (!pr) return actualVal > 0; // First time performing = baseline PR

      if (ex.type === 'sec') {
        return actualVal > pr.maxSec;
      }
      if (ex.weighted && weightKg > pr.maxWeight) {
        return true;
      }
      return actualVal > pr.maxReps;
    },

    /**
     * Find the last performance for an exercise from previous sessions.
     * Returns string summary like "3 set: 10, 10, 8 reps" or null.
     */
    getLastPerformance(exerciseId, sessions) {
      for (let i = sessions.length - 1; i >= 0; i--) {
        const s = sessions[i];
        if (!s.exercises) continue;
        const found = s.exercises.find(e => e.exerciseId === exerciseId);
        if (found && found.sets.some(st => st.done)) {
          const completed = found.sets.filter(st => st.done);
          const ex = GQ.EX[exerciseId];
          const unit = GQ.unit(ex);
          const repsStr = completed.map(st => st.actual).join(' · ');
          return {
            date: s.startedAt,
            summary: `${completed.length} sets: ${repsStr} ${unit}`,
            sets: completed
          };
        }
      }
      return null;
    },

    /**
     * Progression Advisor: Double Progression & Ladder Promotion check.
     */
    checkProgressionSuggestion(exerciseId, sets, equipment) {
      const ex = GQ.EX[exerciseId];
      if (!ex) return null;

      const completed = sets.filter(st => st.done);
      if (completed.length === 0) return null;

      const allMetTarget = completed.every(st => Number(st.actual) >= Number(st.target));
      const target = Number(completed[0].target);

      // Check if candidate for next ladder step
      const ladderNext = GQ.nextInLadder(ex, equipment);
      const masteryGoal = GQ.goalFor(ex);

      if (allMetTarget && target >= masteryGoal && ladderNext) {
        return {
          type: 'ladder_up',
          title: 'Ready for Next Progression! 🔥',
          message: `Mastery goal of ${masteryGoal} ${GQ.unit(ex)} achieved on ${ex.name}. Time to unlock the next tier: ${ladderNext.name}!`,
          nextEx: ladderNext
        };
      }

      if (allMetTarget) {
        const increment = ex.type === 'sec' ? 5 : (ex.type === 'weighted' ? 1 : 2);
        return {
          type: 'rep_up',
          title: 'Overload Target Hit! ⚡',
          message: `All sets completed clean (${target} ${GQ.unit(ex)}). Try increasing target to ${target + increment} ${GQ.unit(ex)} next session.`,
          nextTarget: target + increment
        };
      }

      return null;
    }
  };

  GQ.Stats = Stats;
})(window.GQ);
