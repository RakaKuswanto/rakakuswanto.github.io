/* GymQuest — persistent state (localStorage), schema migration, backup/restore.
 *
 * `sessions` is the single source of truth. Streaks, heatmap, PRs and charts are
 * DERIVED from it (see stats.js), never stored as separate counters. */
(function (GQ) {
  'use strict';
  const KEY = 'gymquest_v3';
  const LEGACY_KEY = 'gymquest_calisthenics_db_v2';
  const SCHEMA = 3;

  function defaults() {
    return {
      schemaVersion: SCHEMA,
      onboarded: false,
      profile: { name: '', tier: 1, equipment: ['dumbbell'], weeklyTarget: 3, dbKg: 5 },
      settings: { sound: true, haptics: true, restSec: 90 },
      routines: [],
      activeSession: null,
      sessions: [],
      skillManual: {}, // { exerciseId: 'YYYY-MM-DD' }: milestones ticked by hand
      lastBackupAt: null,
      createdAt: new Date().toISOString(),
    };
  }

  function migrate(s) {
    const d = defaults();
    const out = Object.assign(d, s || {});
    out.profile = Object.assign(defaults().profile, out.profile || {});
    out.settings = Object.assign(defaults().settings, out.settings || {});
    if (!Array.isArray(out.sessions)) out.sessions = [];
    if (!Array.isArray(out.routines)) out.routines = [];
    out.skillManual = out.skillManual || {};
    // Future migrations go here, e.g. if (out.schemaVersion < 4) { ... }
    out.schemaVersion = SCHEMA;
    return out;
  }

  // History entries that were hard-coded demo data in v2: never import them.
  const LEGACY_SEEDS = new Set([
    '2026-03-24|72|35', '2026-03-23|88|45', '2026-03-21|94|52', '2026-03-19|68|32',
    '2026-03-24|86|45', '2026-03-23|94|50', '2026-03-22|68|35', '2026-03-20|102|48',
  ]);

  function readLegacy() {
    try {
      const raw = localStorage.getItem(LEGACY_KEY);
      if (!raw) return [];
      const old = JSON.parse(raw);
      return (old.history || [])
        .filter(h => h && h.date && !LEGACY_SEEDS.has(`${h.date}|${h.reps}|${h.duration}`))
        .map(h => {
          const start = new Date(GQ.U.keyToDate(h.date).getTime() + 12 * 3600e3);
          const dur = (Number(h.duration) || 0) * 60;
          return {
            id: GQ.U.uid(),
            legacy: true,
            routineName: h.title || 'Legacy Session',
            startedAt: start.toISOString(),
            endedAt: new Date(start.getTime() + dur * 1000).toISOString(),
            durationSec: dur,
            exercises: [],
            legacyVolume: Number(h.reps) || 0,
            note: 'Imported from legacy GymQuest',
          };
        });
    } catch (e) {
      return [];
    }
  }

  const Store = {
    state: null,
    pendingLegacy: [],

    load() {
      let s = null;
      try {
        s = JSON.parse(localStorage.getItem(KEY));
      } catch (e) { /* corrupted → start fresh */ }
      if (!s) this.pendingLegacy = readLegacy();
      this.state = migrate(s);
      // Ask the browser not to evict our data under storage pressure.
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
      return this.state;
    },

    save() {
      try {
        localStorage.setItem(KEY, JSON.stringify(this.state));
      } catch (e) {
        GQ.UI && GQ.UI.toast('Save failed. Device storage full?');
      }
    },

    exportJSON() {
      const data = Object.assign({}, this.state, { exportedAt: new Date().toISOString(), app: 'GymQuest' });
      GQ.U.download(`gymquest-backup-${GQ.U.dateKey()}.json`, JSON.stringify(data, null, 2), 'application/json');
      this.state.lastBackupAt = new Date().toISOString();
      this.save();
    },

    /** Validates and loads a backup. Throws on invalid input. */
    importJSON(text) {
      const data = JSON.parse(text);
      if (!data || typeof data !== 'object' || !Array.isArray(data.sessions)) {
        throw new Error('File is not a valid GymQuest backup.');
      }
      delete data.exportedAt;
      delete data.app;
      this.state = migrate(data);
      this.state.onboarded = true;
      this.save();
    },

    exportCSV() {
      const rows = [['date', 'time', 'routine', 'exercise', 'set', 'target', 'actual', 'unit', 'weight_kg', 'completed', 'pr', 'duration_min']];
      const sorted = [...this.state.sessions].sort((a, b) => a.startedAt.localeCompare(b.startedAt));
      sorted.forEach(s => {
        const d = new Date(s.startedAt);
        const base = [GQ.U.dateKey(d), GQ.U.fmtTime(d), s.routineName];
        const mins = Math.round((s.durationSec || 0) / 60);
        if (!s.exercises.length) rows.push([...base, '', '', '', s.legacyVolume || '', '', '', '', '', mins]);
        s.exercises.forEach(e => {
          const ex = GQ.EX[e.exerciseId];
          e.sets.forEach((st, i) => rows.push([
            ...base, ex ? ex.name : e.exerciseId, i + 1, st.target, st.actual, GQ.unit(ex),
            st.weightKg || 0, st.done ? 1 : 0, st.pr ? 1 : 0, mins,
          ]));
        });
      });
      const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
      GQ.U.download(`gymquest-workouts-${GQ.U.dateKey()}.csv`, '\uFEFF' + csv, 'text/csv');
    },

    resetAll() {
      localStorage.removeItem(KEY);
      this.state = migrate(null);
      this.pendingLegacy = [];
    },
  };

  GQ.Store = Store;
})(window.GQ);
