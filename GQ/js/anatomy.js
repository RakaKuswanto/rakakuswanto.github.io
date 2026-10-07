/* GymQuest — Interactive Biometric Muscle Anatomy Heatmap Engine.
 * Features:
 * - Dynamic volume calculation per muscle group across configurable time windows (7D vs 30D).
 * - High-precision athletic SVG anatomical silhouettes (Anterior / Front and Posterior / Back).
 * - Color scale mapping from rested/dark obsidian to hyper-stimulated neon lime.
 * - Interactive click/hover inspection with real-time biometric diagnostic telemetry HUD.
 */
(function (GQ) {
  'use strict';

  // Muscle group definitions with anatomical taxonomy and scientific recovery guidance
  const MUSCLE_DEFS = {
    // ── ANTERIOR (FRONT) ──────────────────────────────────────
    chest: {
      id: 'chest',
      name: 'Pectoralis Major & Minor',
      common: 'Chest & Pectorals',
      view: 'front',
      desc: 'Horizontal press, scapular protraction & chest adduction',
      optMin: 8,
      optMax: 16
    },
    shoulders_front: {
      id: 'shoulders_front',
      name: 'Anterior & Lateral Deltoids',
      common: 'Front & Side Shoulders',
      view: 'front',
      desc: 'Vertical push, overhead lockout & arm abduction',
      optMin: 8,
      optMax: 14
    },
    biceps: {
      id: 'biceps',
      name: 'Biceps Brachii & Brachialis',
      common: 'Biceps & Arm Flexors',
      view: 'front',
      desc: 'Elbow flexion, forearm supination & pulling support',
      optMin: 6,
      optMax: 14
    },
    abs: {
      id: 'abs',
      name: 'Rectus Abdominis & Deep Core',
      common: 'Abs & Anterior Core',
      view: 'front',
      desc: 'Spinal flexion, anti-extension & hollow body bracing',
      optMin: 6,
      optMax: 15
    },
    obliques: {
      id: 'obliques',
      name: 'External & Internal Obliques',
      common: 'Obliques & Lateral Core',
      view: 'front',
      desc: 'Anti-rotation, lateral core stability & torsional power',
      optMin: 4,
      optMax: 10
    },
    quads: {
      id: 'quads',
      name: 'Quadriceps Femoris',
      common: 'Quads & Anterior Thighs',
      view: 'front',
      desc: 'Knee extension, squat drive & unilateral deceleration',
      optMin: 8,
      optMax: 18
    },
    forearms: {
      id: 'forearms',
      name: 'Brachioradialis & Forearm Flexors',
      common: 'Forearms & Grip Strength',
      view: 'front',
      desc: 'Wrist stabilization, crush grip & hanging endurance',
      optMin: 4,
      optMax: 12
    },

    // ── POSTERIOR (BACK) ──────────────────────────────────────
    lats: {
      id: 'lats',
      name: 'Latissimus Dorsi & Teres Major',
      common: 'Lats & Mid-Back Wings',
      view: 'back',
      desc: 'Vertical pulling, shoulder adduction & humeral depression',
      optMin: 8,
      optMax: 16
    },
    traps: {
      id: 'traps',
      name: 'Trapezius & Rhomboids',
      common: 'Traps & Upper Back',
      view: 'back',
      desc: 'Scapular retraction, elevation & upper spinal posture',
      optMin: 6,
      optMax: 14
    },
    shoulders_rear: {
      id: 'shoulders_rear',
      name: 'Posterior Deltoids & Infraspinatus',
      common: 'Rear Delts & Rotator Cuff',
      view: 'back',
      desc: 'Horizontal abduction, external rotation & posture armor',
      optMin: 6,
      optMax: 12
    },
    triceps: {
      id: 'triceps',
      name: 'Triceps Brachii (All 3 Heads)',
      common: 'Triceps & Arm Extensors',
      view: 'back',
      desc: 'Elbow extension, push-up lockout & dipping drive',
      optMin: 8,
      optMax: 16
    },
    lower_back: {
      id: 'lower_back',
      name: 'Erector Spinae & Quadratus Lumborum',
      common: 'Lower Back & Spinal Erectors',
      view: 'back',
      desc: 'Spinal extension, hip hinge stability & posture alignment',
      optMin: 4,
      optMax: 10
    },
    glutes: {
      id: 'glutes',
      name: 'Gluteus Maximus & Medius',
      common: 'Glutes & Hip Drive',
      view: 'back',
      desc: 'Hip extension, pelvic stabilization & sprinting power',
      optMin: 8,
      optMax: 16
    },
    hamstrings: {
      id: 'hamstrings',
      name: 'Biceps Femoris & Semitendinosus',
      common: 'Hamstrings & Posterior Thigh',
      view: 'back',
      desc: 'Knee flexion, hip hinge deceleration & knee protection',
      optMin: 6,
      optMax: 14
    },
    calves: {
      id: 'calves',
      name: 'Gastrocnemius & Soleus',
      common: 'Calves & Achilles Chain',
      view: 'back',
      desc: 'Ankle plantarflexion, jumping elasticity & running stamina',
      optMin: 6,
      optMax: 16
    }
  };

  // Comprehensive exercise to muscle group mappings
  const EXERCISE_TARGETS = {
    // Push Horizontal
    ph_wall:     { primary: ['chest'], secondary: ['shoulders_front', 'triceps'] },
    ph_incline:  { primary: ['chest'], secondary: ['shoulders_front', 'triceps'] },
    ph_knee:     { primary: ['chest'], secondary: ['shoulders_front', 'triceps'] },
    ph_std:      { primary: ['chest'], secondary: ['shoulders_front', 'triceps', 'abs'] },
    ph_wide:     { primary: ['chest'], secondary: ['shoulders_front'] },
    ph_diamond:  { primary: ['triceps'], secondary: ['chest', 'shoulders_front'] },
    ph_handrel:  { primary: ['chest'], secondary: ['shoulders_front', 'triceps', 'traps'] },
    ph_decline:  { primary: ['chest', 'shoulders_front'], secondary: ['triceps'] },
    ph_hindu:    { primary: ['shoulders_front', 'chest'], secondary: ['triceps', 'lower_back'] },
    ph_archer:   { primary: ['chest'], secondary: ['triceps', 'shoulders_front', 'abs'] },
    ph_clap:     { primary: ['chest'], secondary: ['triceps', 'shoulders_front'] },
    ph_pppu:     { primary: ['shoulders_front', 'chest'], secondary: ['triceps', 'abs'] },
    ph_oap:      { primary: ['chest'], secondary: ['triceps', 'obliques', 'abs'] },

    // Push Vertical
    pv_pike:     { primary: ['shoulders_front'], secondary: ['triceps', 'traps'] },
    pv_epike:    { primary: ['shoulders_front'], secondary: ['triceps', 'traps'] },
    pv_wallneg:  { primary: ['shoulders_front'], secondary: ['triceps', 'traps', 'abs'] },
    pv_wallhspu: { primary: ['shoulders_front'], secondary: ['triceps', 'traps', 'abs'] },
    pv_fhspu:    { primary: ['shoulders_front'], secondary: ['triceps', 'traps', 'abs'] },

    // Dips
    dp_chair:     { primary: ['triceps'], secondary: ['chest', 'shoulders_front'] },
    dp_chair_str: { primary: ['triceps'], secondary: ['chest', 'shoulders_front'] },
    dp_bar:       { primary: ['chest', 'triceps'], secondary: ['shoulders_front'] },
    dp_rings:     { primary: ['chest', 'triceps'], secondary: ['shoulders_front', 'abs'] },
    dp_weighted:  { primary: ['chest', 'triceps'], secondary: ['shoulders_front'] },

    // Dumbbell Push & Triceps
    dbp_floor:        { primary: ['chest'], secondary: ['triceps', 'shoulders_front'] },
    dbp_ohp:          { primary: ['shoulders_front'], secondary: ['triceps', 'traps'] },
    dbp_lat:          { primary: ['shoulders_front'], secondary: ['traps'] },
    dbp_front:        { primary: ['shoulders_front'], secondary: ['chest'] },
    db_kickback:      { primary: ['triceps'], secondary: [] },
    db_tri_overhead:  { primary: ['triceps'], secondary: [] },
    db_skull:         { primary: ['triceps'], secondary: [] },
    dbp_bench:        { primary: ['chest'], secondary: ['triceps', 'shoulders_front'] },

    // Pull Rows
    pr_ytw:     { primary: ['traps', 'shoulders_rear'], secondary: ['lower_back'] },
    pr_table:   { primary: ['lats', 'traps'], secondary: ['biceps', 'forearms'] },
    pr_ring:    { primary: ['lats', 'traps'], secondary: ['biceps', 'forearms', 'abs'] },
    pr_archer:  { primary: ['lats'], secondary: ['traps', 'biceps', 'forearms'] },

    // Dumbbell Pull & Biceps
    db_row:       { primary: ['lats', 'traps'], secondary: ['biceps', 'shoulders_rear', 'forearms'] },
    db_rdfly:     { primary: ['shoulders_rear', 'traps'], secondary: [] },
    db_shrug:     { primary: ['traps'], secondary: ['forearms'] },
    db_curl:      { primary: ['biceps'], secondary: ['forearms'] },
    db_hammer:    { primary: ['biceps', 'forearms'], secondary: [] },
    db_conc:      { primary: ['biceps'], secondary: [] },
    db_pullover:  { primary: ['lats', 'chest'], secondary: ['triceps'] },
    db_renegade:  { primary: ['lats', 'abs'], secondary: ['obliques', 'biceps', 'shoulders_front'] },

    // Pull-Up Bar
    pu_hang:    { primary: ['forearms'], secondary: ['lats', 'traps'] },
    pu_scap:    { primary: ['traps', 'lats'], secondary: ['forearms'] },
    pu_band:    { primary: ['lats'], secondary: ['biceps', 'traps', 'forearms'] },
    pu_neg:     { primary: ['lats'], secondary: ['biceps', 'traps', 'forearms'] },
    pu_pullup:  { primary: ['lats'], secondary: ['biceps', 'traps', 'forearms'] },
    pu_chin:    { primary: ['biceps', 'lats'], secondary: ['traps', 'forearms'] },
    pu_lsit:    { primary: ['lats', 'abs'], secondary: ['biceps', 'forearms'] },
    pu_archer:  { primary: ['lats'], secondary: ['biceps', 'traps', 'forearms'] },
    pu_mu:      { primary: ['lats', 'chest', 'triceps'], secondary: ['shoulders_front', 'forearms', 'abs'] },

    // Legs
    lg_squat:       { primary: ['quads'], secondary: ['glutes'] },
    lg_lunge:       { primary: ['quads', 'glutes'], secondary: ['hamstrings', 'calves'] },
    lg_split:       { primary: ['quads'], secondary: ['glutes'] },
    lg_bss:         { primary: ['quads', 'glutes'], secondary: ['hamstrings'] },
    lg_shrimp_a:    { primary: ['quads'], secondary: ['glutes'] },
    lg_pistol_box:  { primary: ['quads'], secondary: ['glutes', 'calves'] },
    lg_shrimp:      { primary: ['quads', 'glutes'], secondary: ['calves'] },
    lg_pistol:      { primary: ['quads', 'glutes'], secondary: ['calves', 'abs'] },
    lg_bridge:      { primary: ['glutes'], secondary: ['hamstrings', 'lower_back'] },
    lg_sl_bridge:   { primary: ['glutes'], secondary: ['hamstrings', 'lower_back'] },
    lg_hamwalk:     { primary: ['hamstrings'], secondary: ['glutes'] },
    lg_nordic_neg:  { primary: ['hamstrings'], secondary: ['glutes', 'calves'] },
    lg_nordic:      { primary: ['hamstrings'], secondary: ['glutes', 'calves'] },
    lg_calf:        { primary: ['calves'], secondary: [] },
    lg_sl_calf:     { primary: ['calves'], secondary: [] },
    lg_wallsit:     { primary: ['quads'], secondary: ['calves'] },

    // Dumbbell Legs
    db_goblet:      { primary: ['quads', 'glutes'], secondary: ['abs'] },
    db_rdl:         { primary: ['hamstrings', 'glutes'], secondary: ['lower_back', 'forearms'] },
    db_hipthrust:   { primary: ['glutes'], secondary: ['hamstrings'] },
    db_lunge:       { primary: ['quads', 'glutes'], secondary: ['hamstrings', 'calves'] },
    db_bss:         { primary: ['quads', 'glutes'], secondary: ['hamstrings'] },
    db_calf:        { primary: ['calves'], secondary: ['forearms'] },

    // Core
    co_deadbug:     { primary: ['abs'], secondary: ['obliques'] },
    co_plank:       { primary: ['abs'], secondary: ['obliques', 'shoulders_front', 'glutes'] },
    co_hollow_tuck: { primary: ['abs'], secondary: ['obliques'] },
    co_hollow:      { primary: ['abs'], secondary: ['obliques', 'quads'] },
    co_hollow_rock: { primary: ['abs'], secondary: ['obliques'] },
    co_vup:         { primary: ['abs'], secondary: ['obliques'] },
    co_dragon_neg:  { primary: ['abs'], secondary: ['lats', 'obliques'] },
    co_legraise:    { primary: ['abs'], secondary: ['obliques'] },
    co_hkr:         { primary: ['abs'], secondary: ['forearms', 'lats'] },
    co_ttb:         { primary: ['abs'], secondary: ['lats', 'forearms'] },
    co_sideplank:   { primary: ['obliques'], secondary: ['abs', 'shoulders_front'] },
    db_russian:     { primary: ['obliques', 'abs'], secondary: [] },

    // Skills
    ls_footsup:   { primary: ['abs'], secondary: ['triceps', 'quads'] },
    ls_tuck:      { primary: ['abs'], secondary: ['triceps', 'shoulders_front'] },
    ls_one:       { primary: ['abs'], secondary: ['triceps', 'quads'] },
    ls_full:      { primary: ['abs'], secondary: ['triceps', 'quads'] },
    ls_v:         { primary: ['abs'], secondary: ['triceps', 'quads'] },
    hs_wallplank: { primary: ['shoulders_front', 'traps'], secondary: ['abs'] },
    hs_crow:      { primary: ['shoulders_front', 'triceps'], secondary: ['abs', 'forearms'] },
    hs_chest:     { primary: ['shoulders_front', 'traps'], secondary: ['abs', 'glutes'] },
    hs_kick:      { primary: ['shoulders_front'], secondary: ['traps', 'abs'] },
    hs_free:      { primary: ['shoulders_front', 'traps'], secondary: ['abs', 'forearms'] },
    pl_lean:      { primary: ['shoulders_front'], secondary: ['abs', 'forearms'] },
    pl_frog:      { primary: ['shoulders_front', 'triceps'], secondary: ['abs', 'forearms'] },
    pl_tuck:      { primary: ['shoulders_front'], secondary: ['triceps', 'abs'] },
    pl_adv:       { primary: ['shoulders_front'], secondary: ['triceps', 'abs', 'lower_back'] },
    pl_straddle:  { primary: ['shoulders_front'], secondary: ['triceps', 'abs', 'glutes'] },
    fl_tuck:      { primary: ['lats'], secondary: ['traps', 'abs', 'biceps'] },
    fl_adv:       { primary: ['lats'], secondary: ['traps', 'abs', 'lower_back'] },
    fl_oneleg:    { primary: ['lats'], secondary: ['traps', 'abs', 'glutes'] },
    fl_straddle:  { primary: ['lats'], secondary: ['traps', 'abs', 'glutes'] },
    fl_full:      { primary: ['lats'], secondary: ['traps', 'abs', 'lower_back', 'glutes'] }
  };

  const Anatomy = {
    currentView: 'front', // 'front' | 'back'
    currentWindowDays: 7, // 7 | 30
    selectedMuscleId: 'chest',

    init() {
      this.selectedMuscleId = 'chest';
    },

    /**
     * Compute aggregated sets and reps for each muscle group across sessions within N days.
     */
    calculateMuscleLoads(sessions, days = 7) {
      const now = Date.now();
      const cutoff = now - (days * 24 * 3600 * 1000);

      const loads = {};
      Object.keys(MUSCLE_DEFS).forEach(mId => {
        loads[mId] = {
          muscleId: mId,
          sets: 0,
          reps: 0,
          exercises: {} // { exName: setsCount }
        };
      });

      (sessions || []).forEach(sess => {
        const sessTime = new Date(sess.startedAt).getTime();
        if (sessTime < cutoff) return;

        (sess.exercises || []).forEach(exSlot => {
          const ex = GQ.EX[exSlot.exerciseId];
          const exName = ex ? ex.name : exSlot.exerciseId;
          const targets = EXERCISE_TARGETS[exSlot.exerciseId] || { primary: [], secondary: [] };

          let doneSets = 0;
          let doneReps = 0;
          (exSlot.sets || []).forEach(st => {
            if (st.done) {
              doneSets++;
              doneReps += Number(st.actual || st.target || 0);
            }
          });

          if (doneSets === 0) return;

          // Primary targets get full sets, secondary get 0.5 set credit
          targets.primary.forEach(m => {
            if (loads[m]) {
              loads[m].sets += doneSets;
              loads[m].reps += doneReps;
              loads[m].exercises[exName] = (loads[m].exercises[exName] || 0) + doneSets;
            }
          });

          targets.secondary.forEach(m => {
            if (loads[m]) {
              loads[m].sets += Math.round(doneSets * 0.5 * 10) / 10;
              loads[m].reps += Math.round(doneReps * 0.5);
              loads[m].exercises[exName] = (loads[m].exercises[exName] || 0) + Math.round(doneSets * 0.5 * 10) / 10;
            }
          });
        });
      });

      return loads;
    },

    /**
     * Determine stimulus tier and hex fill/stroke colors based on set load.
     */
    getStimulusMetrics(muscleId, sets) {
      const def = MUSCLE_DEFS[muscleId] || { optMin: 8, optMax: 16 };
      const min = def.optMin;
      const max = def.optMax;

      if (sets <= 0) {
        return {
          level: 0,
          fill: '#15191d',
          stroke: 'rgba(255,255,255,0.08)',
          glow: 'none',
          status: 'Rested // Ready for Training',
          statusBadgeClass: 'bg-obsidian-800 text-slate-400 border-white/10',
          advice: 'Zero direct volume logged in this timeframe. Prime candidate for your next session.'
        };
      }
      if (sets < min * 0.5) {
        return {
          level: 1,
          fill: '#1e2f0a',
          stroke: '#2b4412',
          glow: 'none',
          status: 'Maintenance Stimulus',
          statusBadgeClass: 'bg-[#1e2f0a] text-lime-dim border-[#2b4412]',
          advice: 'Low volume preserving baseline neuromuscular tone. Add 2–3 sets to induce hypertrophy.'
        };
      }
      if (sets < min) {
        return {
          level: 2,
          fill: '#4d750d',
          stroke: '#639915',
          glow: 'none',
          status: 'Moderate Hypertrophy',
          statusBadgeClass: 'bg-[#4d750d]/20 text-lime-neon border-[#639915]',
          advice: 'Productive volume range. Approaching optimal growth threshold.'
        };
      }
      if (sets <= max) {
        return {
          level: 3,
          fill: '#8cb90e',
          stroke: '#9fd611',
          glow: 'drop-shadow(0 0 6px rgba(212,255,0,0.4))',
          status: 'Optimal Volume 🔥',
          statusBadgeClass: 'bg-lime-neon/15 text-lime-neon border-lime-neon/40 shadow-neon-soft',
          advice: 'Peak hypertrophy sweet-spot! Maximum muscle protein synthesis stimulus achieved.'
        };
      }
      return {
        level: 4,
        fill: '#D4FF00',
        stroke: '#FFFFFF',
        glow: 'drop-shadow(0 0 10px rgba(212,255,0,0.8))',
        status: 'High Fatigue / Overreaching ⚡',
        statusBadgeClass: 'bg-amber-400/15 text-amber-300 border-amber-400/40 shadow-neon-glow',
        advice: 'Maximum recovery volume reached. Ensure adequate protein, hydration, and sleep before next session.'
      };
    },

    setView(view) {
      this.currentView = view;
      GQ.Timer.beep(540, 'sine', 0.03);
      this.render();
    },

    setDays(days) {
      this.currentWindowDays = days;
      GQ.Timer.beep(580, 'sine', 0.03);
      this.render();
    },

    selectMuscle(muscleId) {
      this.selectedMuscleId = muscleId;
      GQ.Timer.beep(640, 'sine', 0.04);
      this.render();
    },

    /**
     * Primary render method called by app.js when viewing consistency/activity tab.
     */
    render() {
      const container = document.getElementById('anatomyHeatmapContainer');
      if (!container) return;

      const sessions = (GQ.Store && GQ.Store.state.sessions) || [];
      const loads = this.calculateMuscleLoads(sessions, this.currentWindowDays);

      // Ensure active selected muscle exists in current view, else fallback
      const activeDef = MUSCLE_DEFS[this.selectedMuscleId];
      if (!activeDef || activeDef.view !== this.currentView) {
        const fallback = Object.values(MUSCLE_DEFS).find(m => m.view === this.currentView);
        if (fallback) this.selectedMuscleId = fallback.id;
      }

      const activeMuscle = MUSCLE_DEFS[this.selectedMuscleId] || MUSCLE_DEFS['chest'];
      const activeLoad = loads[this.selectedMuscleId] || { sets: 0, reps: 0, exercises: {} };
      const activeMetrics = this.getStimulusMetrics(this.selectedMuscleId, activeLoad.sets);

      // Render View Toggle Buttons state
      const btnFront = document.getElementById('anatomyBtnFront');
      const btnBack = document.getElementById('anatomyBtnBack');
      if (btnFront && btnBack) {
        btnFront.className = `px-3 py-1 text-[10px] font-mono font-bold rounded-lg transition-all ${
          this.currentView === 'front'
            ? 'bg-lime-neon text-black shadow-neon-soft'
            : 'bg-obsidian-850 text-slate-400 hover:text-white'
        }`;
        btnBack.className = `px-3 py-1 text-[10px] font-mono font-bold rounded-lg transition-all ${
          this.currentView === 'back'
            ? 'bg-lime-neon text-black shadow-neon-soft'
            : 'bg-obsidian-850 text-slate-400 hover:text-white'
        }`;
      }

      // Render Time Window Buttons state
      const btn7d = document.getElementById('anatomyBtn7D');
      const btn30d = document.getElementById('anatomyBtn30D');
      if (btn7d && btn30d) {
        btn7d.className = `px-2 py-0.5 text-[9px] font-mono rounded transition-all ${
          this.currentWindowDays === 7 ? 'text-lime-neon font-bold border border-lime-neon/40' : 'text-slate-500'
        }`;
        btn30d.className = `px-2 py-0.5 text-[9px] font-mono rounded transition-all ${
          this.currentWindowDays === 30 ? 'text-lime-neon font-bold border border-lime-neon/40' : 'text-slate-500'
        }`;
      }

      // Generate SVG Anatomical Graphic
      const svgGraphic = this.currentView === 'front'
        ? this.generateFrontSVG(loads)
        : this.generateBackSVG(loads);

      // Top contributing exercises pills
      const exEntries = Object.entries(activeLoad.exercises).sort((a, b) => b[1] - a[1]);
      const exListHtml = exEntries.length > 0
        ? exEntries.map(([name, s]) => `
            <span class="text-[9px] font-mono bg-obsidian-850 border border-white/10 px-2 py-0.5 rounded-md text-slate-300">
              ${name} <span class="text-lime-neon">(${s} sets)</span>
            </span>
          `).join('')
        : `<span class="text-[9px] font-mono text-slate-500 italic">No exercises logged in this period</span>`;

      // Render Cockpit DOM
      container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <!-- Anatomical Silhouette Center Stage -->
          <div class="md:col-span-5 flex flex-col items-center justify-center p-2 relative bg-obsidian-950/60 rounded-2xl border border-white/5">
            <div class="w-full max-w-[210px] aspect-[200/320]">
              ${svgGraphic}
            </div>
            <div class="flex items-center space-x-2 text-[9px] font-mono text-slate-500 mt-2">
              <span class="w-2 h-2 rounded-full bg-lime-neon shadow-neon-soft"></span>
              <span>Tap muscle group to inspect</span>
            </div>
          </div>

          <!-- Diagnostic Telemetry HUD -->
          <div class="md:col-span-7 space-y-3">
            <div class="p-3.5 rounded-2xl bg-obsidian-850/80 border border-white/10 shadow-card-luxury space-y-2.5">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-[9px] font-mono text-slate-500 tracking-wider uppercase">TARGET MUSCLE GROUP</span>
                  <h4 class="text-sm font-bold text-white flex items-center space-x-1.5">
                    <span>${activeMuscle.common}</span>
                  </h4>
                  <p class="text-[10px] font-mono text-slate-400 mt-0.5">${activeMuscle.name}</p>
                </div>
                <span class="text-[9px] font-mono px-2 py-0.5 rounded border font-bold uppercase ${activeMetrics.statusBadgeClass}">
                  ${activeMetrics.status}
                </span>
              </div>

              <!-- Metrics Meter -->
              <div class="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
                <div class="bg-obsidian-900/90 p-2 rounded-xl border border-white/5">
                  <p class="text-[9px] font-mono text-slate-400">COMPLETED VOLUME</p>
                  <p class="text-base font-mono font-bold text-white mt-0.5">
                    ${activeLoad.sets} <span class="text-[10px] font-normal text-lime-neon">SETS</span>
                  </p>
                </div>
                <div class="bg-obsidian-900/90 p-2 rounded-xl border border-white/5">
                  <p class="text-[9px] font-mono text-slate-400">TOTAL REPETITIONS</p>
                  <p class="text-base font-mono font-bold text-white mt-0.5">
                    ${activeLoad.reps} <span class="text-[10px] font-normal text-slate-400">REPS</span>
                  </p>
                </div>
              </div>

              <!-- Optimal Target Progress Bar -->
              <div>
                <div class="flex items-center justify-between text-[9px] font-mono text-slate-400 mb-1">
                  <span>Weekly Hypertrophy Target (${activeMuscle.optMin}–${activeMuscle.optMax} Sets)</span>
                  <span class="text-lime-neon font-bold">${Math.round(Math.min(100, (activeLoad.sets / activeMuscle.optMin) * 100))}%</span>
                </div>
                <div class="w-full bg-obsidian-900 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-500 ${
                    activeLoad.sets >= activeMuscle.optMin ? 'bg-lime-neon shadow-neon-soft' : 'bg-gradient-to-r from-lime-dim to-lime-neon'
                  }" style="width: ${Math.min(100, Math.round((activeLoad.sets / activeMuscle.optMin) * 100))}%"></div>
                </div>
              </div>

              <!-- Contributing Exercises -->
              <div class="space-y-1">
                <p class="text-[9px] font-mono text-slate-400 uppercase">Logged Protocol Contributors:</p>
                <div class="flex flex-wrap gap-1">
                  ${exListHtml}
                </div>
              </div>

              <!-- Biometric Recovery Advice -->
              <p class="text-[10px] text-slate-300 font-sans leading-relaxed bg-obsidian-900/80 p-2 rounded-xl border border-white/5">
                💡 <span class="text-slate-200">${activeMetrics.advice}</span>
              </p>
            </div>
          </div>
        </div>
      `;
    },

    /**
     * Build interactive SVG for Anterior (Front) Body
     */
    generateFrontSVG(loads) {
      const getFill = id => this.getStimulusMetrics(id, (loads[id] && loads[id].sets) || 0).fill;
      const getStroke = id => (id === this.selectedMuscleId ? '#FFFFFF' : 'rgba(255,255,255,0.18)');
      const getStrokeW = id => (id === this.selectedMuscleId ? '2' : '0.8');
      const getFilter = id => (id === this.selectedMuscleId ? 'filter: drop-shadow(0 0 6px rgba(212,255,0,0.8));' : '');

      return `
        <svg viewBox="0 0 200 320" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <!-- Background Atmospheric Glow -->
          <radialGradient id="gqAnatGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stop-color="#D4FF00" stop-opacity="0.04"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </radialGradient>
          <rect width="200" height="320" fill="url(#gqAnatGlow)"/>

          <!-- Body Silhouette Outer Frame & Head (Athletic Contours) -->
          <g stroke="rgba(255,255,255,0.12)" stroke-width="0.8" fill="none">
            <!-- Head & Neck -->
            <ellipse cx="100" cy="32" rx="14" ry="18" fill="#13161a"/>
            <path d="M 94 48 L 94 62 M 106 48 L 106 62"/>
            <!-- Clavicle Frame Lines -->
            <path d="M 68 66 Q 100 70 132 66"/>
            <!-- Body Torso Outline -->
            <path d="M 62 76 Q 52 100 48 126 Q 44 148 40 170 M 138 76 Q 148 100 152 126 Q 156 148 160 170"/>
            <!-- Pelvis & Legs Baseline Frame -->
            <path d="M 70 170 Q 100 174 130 170"/>
          </g>

          <!-- CHEST (Pectorals) -->
          <g onclick="GQ.Anatomy.selectMuscle('chest')" class="cursor-pointer transition-all hover:opacity-80">
            <!-- Left Pec -->
            <path d="M 68 76 Q 84 75 98 78 L 98 102 Q 80 108 66 96 Z"
              fill="${getFill('chest')}" stroke="${getStroke('chest')}" stroke-width="${getStrokeW('chest')}" style="${getFilter('chest')}"/>
            <!-- Right Pec -->
            <path d="M 132 76 Q 116 75 102 78 L 102 102 Q 120 108 134 96 Z"
              fill="${getFill('chest')}" stroke="${getStroke('chest')}" stroke-width="${getStrokeW('chest')}" style="${getFilter('chest')}"/>
          </g>

          <!-- SHOULDERS FRONT (Anterior Deltoids) -->
          <g onclick="GQ.Anatomy.selectMuscle('shoulders_front')" class="cursor-pointer transition-all hover:opacity-80">
            <!-- Left Deltoid -->
            <path d="M 52 74 Q 66 75 66 90 Q 54 102 48 88 Z"
              fill="${getFill('shoulders_front')}" stroke="${getStroke('shoulders_front')}" stroke-width="${getStrokeW('shoulders_front')}" style="${getFilter('shoulders_front')}"/>
            <!-- Right Deltoid -->
            <path d="M 148 74 Q 134 75 134 90 Q 146 102 152 88 Z"
              fill="${getFill('shoulders_front')}" stroke="${getStroke('shoulders_front')}" stroke-width="${getStrokeW('shoulders_front')}" style="${getFilter('shoulders_front')}"/>
          </g>

          <!-- BICEPS -->
          <g onclick="GQ.Anatomy.selectMuscle('biceps')" class="cursor-pointer transition-all hover:opacity-80">
            <!-- Left Bicep -->
            <path d="M 46 94 Q 56 98 54 120 Q 44 122 40 106 Z"
              fill="${getFill('biceps')}" stroke="${getStroke('biceps')}" stroke-width="${getStrokeW('biceps')}" style="${getFilter('biceps')}"/>
            <!-- Right Bicep -->
            <path d="M 154 94 Q 144 98 146 120 Q 156 122 160 106 Z"
              fill="${getFill('biceps')}" stroke="${getStroke('biceps')}" stroke-width="${getStrokeW('biceps')}" style="${getFilter('biceps')}"/>
          </g>

          <!-- FOREARMS -->
          <g onclick="GQ.Anatomy.selectMuscle('forearms')" class="cursor-pointer transition-all hover:opacity-80">
            <!-- Left Forearm -->
            <path d="M 38 126 Q 50 130 46 160 Q 34 158 30 138 Z"
              fill="${getFill('forearms')}" stroke="${getStroke('forearms')}" stroke-width="${getStrokeW('forearms')}" style="${getFilter('forearms')}"/>
            <!-- Right Forearm -->
            <path d="M 162 126 Q 150 130 154 160 Q 166 158 170 138 Z"
              fill="${getFill('forearms')}" stroke="${getStroke('forearms')}" stroke-width="${getStrokeW('forearms')}" style="${getFilter('forearms')}"/>
          </g>

          <!-- ABS (Rectus Abdominis) -->
          <g onclick="GQ.Anatomy.selectMuscle('abs')" class="cursor-pointer transition-all hover:opacity-80">
            <!-- Upper Abs -->
            <path d="M 86 106 Q 100 105 114 106 L 114 120 Q 100 121 86 120 Z"
              fill="${getFill('abs')}" stroke="${getStroke('abs')}" stroke-width="${getStrokeW('abs')}" style="${getFilter('abs')}"/>
            <!-- Mid Abs -->
            <path d="M 87 123 Q 100 122 113 123 L 113 138 Q 100 139 87 138 Z"
              fill="${getFill('abs')}" stroke="${getStroke('abs')}" stroke-width="${getStrokeW('abs')}" style="${getFilter('abs')}"/>
            <!-- Lower Abs -->
            <path d="M 88 141 Q 100 140 112 141 L 111 158 Q 100 162 89 158 Z"
              fill="${getFill('abs')}" stroke="${getStroke('abs')}" stroke-width="${getStrokeW('abs')}" style="${getFilter('abs')}"/>
          </g>

          <!-- OBLIQUES -->
          <g onclick="GQ.Anatomy.selectMuscle('obliques')" class="cursor-pointer transition-all hover:opacity-80">
            <!-- Left Oblique -->
            <path d="M 68 108 Q 82 112 84 152 Q 72 154 68 132 Z"
              fill="${getFill('obliques')}" stroke="${getStroke('obliques')}" stroke-width="${getStrokeW('obliques')}" style="${getFilter('obliques')}"/>
            <!-- Right Oblique -->
            <path d="M 132 108 Q 118 112 116 152 Q 128 154 132 132 Z"
              fill="${getFill('obliques')}" stroke="${getStroke('obliques')}" stroke-width="${getStrokeW('obliques')}" style="${getFilter('obliques')}"/>
          </g>

          <!-- QUADS (Quadriceps) -->
          <g onclick="GQ.Anatomy.selectMuscle('quads')" class="cursor-pointer transition-all hover:opacity-80">
            <!-- Left Quad -->
            <path d="M 72 168 Q 96 166 96 194 L 94 234 Q 72 232 68 202 Z"
              fill="${getFill('quads')}" stroke="${getStroke('quads')}" stroke-width="${getStrokeW('quads')}" style="${getFilter('quads')}"/>
            <!-- Right Quad -->
            <path d="M 128 168 Q 104 166 104 194 L 106 234 Q 128 232 132 202 Z"
              fill="${getFill('quads')}" stroke="${getStroke('quads')}" stroke-width="${getStrokeW('quads')}" style="${getFilter('quads')}"/>
          </g>

          <!-- CALVES / SHINS -->
          <g onclick="GQ.Anatomy.selectMuscle('calves')" class="cursor-pointer transition-all hover:opacity-80">
            <!-- Left Shin/Calf -->
            <path d="M 70 248 Q 88 250 86 292 L 74 292 Q 66 270 70 248 Z"
              fill="${getFill('calves')}" stroke="${getStroke('calves')}" stroke-width="${getStrokeW('calves')}" style="${getFilter('calves')}"/>
            <!-- Right Shin/Calf -->
            <path d="M 130 248 Q 112 250 114 292 L 126 292 Q 134 270 130 248 Z"
              fill="${getFill('calves')}" stroke="${getStroke('calves')}" stroke-width="${getStrokeW('calves')}" style="${getFilter('calves')}"/>
          </g>
        </svg>
      `;
    },

    /**
     * Build interactive SVG for Posterior (Back) Body
     */
    generateBackSVG(loads) {
      const getFill = id => this.getStimulusMetrics(id, (loads[id] && loads[id].sets) || 0).fill;
      const getStroke = id => (id === this.selectedMuscleId ? '#FFFFFF' : 'rgba(255,255,255,0.18)');
      const getStrokeW = id => (id === this.selectedMuscleId ? '2' : '0.8');
      const getFilter = id => (id === this.selectedMuscleId ? 'filter: drop-shadow(0 0 6px rgba(212,255,0,0.8));' : '');

      return `
        <svg viewBox="0 0 200 320" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <!-- Background Atmospheric Glow -->
          <radialGradient id="gqAnatBackGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stop-color="#D4FF00" stop-opacity="0.04"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </radialGradient>
          <rect width="200" height="320" fill="url(#gqAnatBackGlow)"/>

          <!-- Body Silhouette Outer Frame & Head (Posterior View) -->
          <g stroke="rgba(255,255,255,0.12)" stroke-width="0.8" fill="none">
            <ellipse cx="100" cy="32" rx="14" ry="18" fill="#13161a"/>
            <!-- Spine centerline -->
            <path d="M 100 62 L 100 166" stroke-dasharray="2,3"/>
          </g>

          <!-- TRAPS & UPPER BACK -->
          <g onclick="GQ.Anatomy.selectMuscle('traps')" class="cursor-pointer transition-all hover:opacity-80">
            <path d="M 88 58 L 112 58 L 124 82 L 100 108 L 76 82 Z"
              fill="${getFill('traps')}" stroke="${getStroke('traps')}" stroke-width="${getStrokeW('traps')}" style="${getFilter('traps')}"/>
          </g>

          <!-- REAR DELTOIDS -->
          <g onclick="GQ.Anatomy.selectMuscle('shoulders_rear')" class="cursor-pointer transition-all hover:opacity-80">
            <!-- Left Rear Delt -->
            <path d="M 52 74 Q 66 75 68 90 Q 56 102 48 88 Z"
              fill="${getFill('shoulders_rear')}" stroke="${getStroke('shoulders_rear')}" stroke-width="${getStrokeW('shoulders_rear')}" style="${getFilter('shoulders_rear')}"/>
            <!-- Right Rear Delt -->
            <path d="M 148 74 Q 134 75 132 90 Q 144 102 152 88 Z"
              fill="${getFill('shoulders_rear')}" stroke="${getStroke('shoulders_rear')}" stroke-width="${getStrokeW('shoulders_rear')}" style="${getFilter('shoulders_rear')}"/>
          </g>

          <!-- TRICEPS -->
          <g onclick="GQ.Anatomy.selectMuscle('triceps')" class="cursor-pointer transition-all hover:opacity-80">
            <!-- Left Tricep -->
            <path d="M 46 94 Q 56 98 54 122 Q 44 122 40 106 Z"
              fill="${getFill('triceps')}" stroke="${getStroke('triceps')}" stroke-width="${getStrokeW('triceps')}" style="${getFilter('triceps')}"/>
            <!-- Right Tricep -->
            <path d="M 154 94 Q 144 98 146 122 Q 156 122 160 106 Z"
              fill="${getFill('triceps')}" stroke="${getStroke('triceps')}" stroke-width="${getStrokeW('triceps')}" style="${getFilter('triceps')}"/>
          </g>

          <!-- LATS -->
          <g onclick="GQ.Anatomy.selectMuscle('lats')" class="cursor-pointer transition-all hover:opacity-80">
            <!-- Left Lat -->
            <path d="M 68 96 Q 80 98 96 112 L 94 142 Q 72 138 66 114 Z"
              fill="${getFill('lats')}" stroke="${getStroke('lats')}" stroke-width="${getStrokeW('lats')}" style="${getFilter('lats')}"/>
            <!-- Right Lat -->
            <path d="M 132 96 Q 120 98 104 112 L 106 142 Q 128 138 134 114 Z"
              fill="${getFill('lats')}" stroke="${getStroke('lats')}" stroke-width="${getStrokeW('lats')}" style="${getFilter('lats')}"/>
          </g>

          <!-- LOWER BACK (Erector Spinae) -->
          <g onclick="GQ.Anatomy.selectMuscle('lower_back')" class="cursor-pointer transition-all hover:opacity-80">
            <path d="M 94 144 L 106 144 L 105 166 L 95 166 Z"
              fill="${getFill('lower_back')}" stroke="${getStroke('lower_back')}" stroke-width="${getStrokeW('lower_back')}" style="${getFilter('lower_back')}"/>
          </g>

          <!-- GLUTES (Gluteus Maximus) -->
          <g onclick="GQ.Anatomy.selectMuscle('glutes')" class="cursor-pointer transition-all hover:opacity-80">
            <!-- Left Glute -->
            <path d="M 72 168 Q 98 166 98 194 Q 96 208 74 204 Q 68 188 72 168 Z"
              fill="${getFill('glutes')}" stroke="${getStroke('glutes')}" stroke-width="${getStrokeW('glutes')}" style="${getFilter('glutes')}"/>
            <!-- Right Glute -->
            <path d="M 128 168 Q 102 166 102 194 Q 104 208 126 204 Q 132 188 128 168 Z"
              fill="${getFill('glutes')}" stroke="${getStroke('glutes')}" stroke-width="${getStrokeW('glutes')}" style="${getFilter('glutes')}"/>
          </g>

          <!-- HAMSTRINGS -->
          <g onclick="GQ.Anatomy.selectMuscle('hamstrings')" class="cursor-pointer transition-all hover:opacity-80">
            <!-- Left Hamstring -->
            <path d="M 72 208 Q 96 210 94 242 L 72 242 Q 68 224 72 208 Z"
              fill="${getFill('hamstrings')}" stroke="${getStroke('hamstrings')}" stroke-width="${getStrokeW('hamstrings')}" style="${getFilter('hamstrings')}"/>
            <!-- Right Hamstring -->
            <path d="M 128 208 Q 104 210 106 242 L 128 242 Q 132 224 128 208 Z"
              fill="${getFill('hamstrings')}" stroke="${getStroke('hamstrings')}" stroke-width="${getStrokeW('hamstrings')}" style="${getFilter('hamstrings')}"/>
          </g>

          <!-- CALVES (Gastrocnemius & Soleus) -->
          <g onclick="GQ.Anatomy.selectMuscle('calves')" class="cursor-pointer transition-all hover:opacity-80">
            <!-- Left Calf -->
            <path d="M 70 248 Q 90 248 86 292 L 74 292 Q 66 270 70 248 Z"
              fill="${getFill('calves')}" stroke="${getStroke('calves')}" stroke-width="${getStrokeW('calves')}" style="${getFilter('calves')}"/>
            <!-- Right Calf -->
            <path d="M 130 248 Q 110 248 114 292 L 126 292 Q 134 270 130 248 Z"
              fill="${getFill('calves')}" stroke="${getStroke('calves')}" stroke-width="${getStrokeW('calves')}" style="${getFilter('calves')}"/>
          </g>
        </svg>
      `;
    }
  };

  GQ.Anatomy = Anatomy;
})(window.GQ);
