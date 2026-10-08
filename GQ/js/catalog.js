/* GymQuest — exercise catalog, equipment, progression ladders, skills & routine templates.
 *
 * Every exercise belongs (optionally) to a LADDER: an ordered easiest → hardest
 * progression. Ladders power the "ready to level up?" suggestions and the skill tree.
 * Household items (chair, table, wall, sofa, towel) are assumed to be available. */
(function (GQ) {
  'use strict';

  GQ.EQUIPMENT = [
    { id: 'dumbbell', name: 'Dumbbell' },
    { id: 'pullup_bar', name: 'Pull-up Bar' },
    { id: 'dip_station', name: 'Dip / Parallel Bar' },
    { id: 'parallettes', name: 'Parallettes' },
    { id: 'rings', name: 'Gymnastic Rings' },
    { id: 'band', name: 'Resistance Band' },
    { id: 'bench', name: 'Bench / Sturdy Box' },
  ];
  GQ.EQ_NAME = Object.fromEntries(GQ.EQUIPMENT.map(e => [e.id, e.name]));

  GQ.CATEGORIES = {
    push: 'Push',
    pull: 'Pull',
    legs: 'Legs',
    core: 'Core',
    skill: 'Skill',
    warmup: 'Warm-up',
  };

  GQ.TIERS = {
    1: { key: 'foundation', name: 'Foundation', hint: 'Beginner / Under 10 push-ups' },
    2: { key: 'momentum', name: 'Momentum', hint: '10+ push-ups & 20+ squats' },
    3: { key: 'apex', name: 'Apex', hint: 'Mastering advanced skills (handstand, pistol, etc.)' },
  };

  GQ.LADDERS = {
    push_h: 'Push-Up',
    push_v: 'Handstand Push-Up',
    dip: 'Dips',
    row: 'Row',
    pullup: 'Pull-Up',
    squat: 'Single-Leg Squat',
    hinge: 'Hamstrings & Glutes',
    calf: 'Calves',
    core: 'Core',
    legraise: 'Leg Raise',
    lsit: 'L-Sit',
    handstand: 'Handstand',
    planche: 'Planche',
    frontlever: 'Front Lever',
  };

  const L = [];
  /** e(id, name, category, ladder|null, tier 1-3, 'reps'|'sec', default target, cue, extra) */
  function e(id, name, cat, ladder, tier, type, target, cue, extra = {}) {
    L.push(Object.assign({ id, name, cat, ladder, tier, type, target, cue, eq: [], weighted: false }, extra));
  }
  const DB = { eq: ['dumbbell'], weighted: true };

  // ── Warm-up ────────────────────────────────────────────────
  e('wu_jj', 'Jumping Jacks', 'warmup', null, 1, 'sec', 60, 'Elevate heart rate & blood flow');
  e('wu_wrist', 'Wrist Prep', 'warmup', null, 1, 'sec', 60, 'Circle & stretch wrists, crucial for push/handstand');
  e('wu_arm', 'Arm Circles + Shoulder Dislocate', 'warmup', null, 1, 'reps', 15, 'Use towel/band for smooth shoulder pass-throughs');
  e('wu_catcow', 'Cat-Cow', 'warmup', null, 1, 'reps', 10, 'Full spinal flexion & extension');
  e('wu_scap', 'Scapular Push-Up', 'warmup', null, 1, 'reps', 10, 'Arms straight, isolate scapular protraction & retraction');
  e('wu_wgs', "World's Greatest Stretch", 'warmup', null, 1, 'reps', 5, 'Per side, open hips & thoracic spine');
  e('wu_squat', 'Deep Squat Hold', 'warmup', null, 1, 'sec', 45, 'Heels flat, chest upright, pry knees open');

  // ── Push: Horizontal ──────────────────────────────────────
  e('ph_wall', 'Wall Push-Up', 'push', 'push_h', 1, 'reps', 15, 'Hands on wall, straight body line', { goal: 20 });
  e('ph_incline', 'Incline Push-Up', 'push', 'push_h', 1, 'reps', 12, 'Hands on sturdy elevated box or surface');
  e('ph_knee', 'Knee Push-Up', 'push', 'push_h', 1, 'reps', 12, 'Knees grounded, hips aligned');
  e('ph_std', 'Push-Up (Regular)', 'push', 'push_h', 2, 'reps', 10, 'Chest to deck, 2-1-1 tempo', { goal: 20 });
  e('ph_wide', 'Wide-Grip Push-Up', 'push', 'push_h', 2, 'reps', 10, 'Hands wider than shoulder width, outer chest focus');
  e('ph_diamond', 'Diamond Push-Up', 'push', 'push_h', 2, 'reps', 10, 'Thumbs & index fingers touching, tricep dominance', { goal: 15 });
  e('ph_handrel', 'Hand-Release Push-Up', 'push', 'push_h', 2, 'reps', 8, 'At the bottom, brief hand release for full dead-stop ROM');
  e('ph_decline', 'Decline Push-Up', 'push', 'push_h', 2, 'reps', 10, 'Feet elevated on chair/bench, upper chest emphasis', { goal: 15 });
  e('ph_hindu', 'Hindu / Dive-Bomber Push-Up', 'push', 'push_h', 2, 'reps', 8, 'Dynamic swooping arc, shoulder & spinal mobility');
  e('ph_archer', 'Archer Push-Up', 'push', 'push_h', 3, 'reps', 6, 'Shift weight to working arm, straight assisting arm');
  e('ph_clap', 'Explosive / Clapping Push-Up', 'push', 'push_h', 3, 'reps', 6, 'Explosive press until palms leave the floor');
  e('ph_pppu', 'Pseudo Planche Push-Up', 'push', 'push_h', 3, 'reps', 8, 'Shoulders leaned far ahead of wrists', { goal: 10 });
  e('ph_oap', 'One-Arm Push-Up', 'push', 'push_h', 3, 'reps', 3, 'Wide foot stance, press without hip rotation', { goal: 5 });

  // ── Push: Vertical ────────────────────────────────────────
  e('pv_pike', 'Pike Push-Up', 'push', 'push_v', 1, 'reps', 8, 'Hips high, head traces forward in front of hands', { goal: 12 });
  e('pv_epike', 'Elevated Pike Push-Up', 'push', 'push_v', 2, 'reps', 8, 'Feet elevated on box/chair, increasing vertical load');
  e('pv_wallneg', 'Wall HSPU Negative', 'push', 'push_v', 2, 'reps', 4, 'Controlled 5-second descent from wall handstand', { goal: 6 });
  e('pv_wallhspu', 'Wall Handstand Push-Up', 'push', 'push_v', 3, 'reps', 4, 'Full ROM, light head tap to ground');
  e('pv_fhspu', 'Freestanding HSPU', 'push', 'push_v', 3, 'reps', 2, 'Freestanding balance with vertical press', { goal: 5 });

  // ── Dips ────────────────────────────────────────────────────
  e('dp_chair', 'Chair Dips (Bent Knees)', 'push', 'dip', 1, 'reps', 10, 'Hands on sturdy chair, elbows track backwards');
  e('dp_chair_str', 'Chair Dips (Straight Legs)', 'push', 'dip', 1, 'reps', 12, 'Heels on floor, legs fully extended', { goal: 20 });
  e('dp_bar', 'Parallel Bar Dips', 'push', 'dip', 2, 'reps', 8, 'Lower until shoulders reach elbow crease', { eq: ['dip_station'], goal: 15 });
  e('dp_rings', 'Ring Dips', 'push', 'dip', 3, 'reps', 5, 'Turn rings out at top support lockout', { eq: ['rings'] });
  e('dp_weighted', 'Weighted Dips', 'push', 'dip', 3, 'reps', 6, 'Dumbbell pinned between legs or dip belt', { eq: ['dip_station', 'dumbbell'], weighted: true });

  // ── Push: Dumbbells & Triceps ───────────────────────────────
  e('dbp_floor', 'Dumbbell Floor Press', 'push', null, 1, 'reps', 10, 'Elbows touch floor gently, press upwards over chest', DB);
  e('dbp_ohp', 'Dumbbell Overhead Press', 'push', null, 1, 'reps', 10, 'Standing, core braced, press dumbbells overhead', DB);
  e('dbp_lat', 'Dumbbell Lateral Raise', 'push', null, 1, 'reps', 12, 'Raise to shoulder height with slight elbow bend', DB);
  e('dbp_front', 'Dumbbell Front Raise', 'push', null, 1, 'reps', 12, 'Raise to eye level, isolate anterior deltoid', DB);
  e('db_kickback', 'Dumbbell Tricep Kickback', 'push', null, 1, 'reps', 12, 'Hinged torso, elbow pinned high, extend arm back', DB);
  e('db_tri_overhead', 'Overhead Dumbbell Tricep Extension', 'push', null, 1, 'reps', 12, 'Hold dumbbell overhead behind neck, extend elbows', DB);
  e('db_skull', 'Lying Dumbbell Skull Crusher', 'push', null, 2, 'reps', 10, 'Lying supine, hinge elbows near temples and lock out', DB);
  e('dbp_bench', 'Dumbbell Bench Press', 'push', null, 2, 'reps', 10, 'On bench/box, full stretch and press', { eq: ['dumbbell', 'bench'], weighted: true });

  // ── Pull: Rows ──────────────────────────────────────────────
  e('pr_ytw', 'Prone Y-T-W Raise', 'pull', 'row', 1, 'reps', 10, 'Prone position, lift arms in Y, T, W shapes');
  e('pr_table', 'Table Inverted Row', 'pull', 'row', 1, 'reps', 8, 'Under sturdy table, pull chest to tabletop');
  e('pr_ring', 'Ring Row', 'pull', 'row', 2, 'reps', 10, 'Rigid plank body line, pull rings to chest', { eq: ['rings'], goal: 15 });
  e('pr_archer', 'Archer Ring Row', 'pull', 'row', 3, 'reps', 6, 'One arm pulls, assisting arm extended sideways', { eq: ['rings'] });

  // ── Pull: Dumbbells & Biceps ─────────────────────────────────
  e('db_row', 'One-Arm Dumbbell Row', 'pull', null, 1, 'reps', 10, 'Supported on bench, row dumbbell towards hip', DB);
  e('db_rdfly', 'Dumbbell Reverse Fly', 'pull', null, 1, 'reps', 12, 'Hinged at hips, open arms wide for rear delts', DB);
  e('db_shrug', 'Dumbbell Shrug', 'pull', null, 1, 'reps', 15, 'Elevate shoulders towards ears, hold peak squeeze', DB);
  e('db_curl', 'Dumbbell Bicep Curl', 'pull', null, 1, 'reps', 12, 'Elbows pinned to sides, supinate at top', DB);
  e('db_hammer', 'Dumbbell Hammer Curl', 'pull', null, 1, 'reps', 12, 'Neutral palms facing each other, brachialis focus', DB);
  e('db_conc', 'Concentration Curl', 'pull', null, 1, 'reps', 10, 'Elbow against inner thigh, pure bicep isolation', DB);
  e('db_pullover', 'Dumbbell Pullover', 'pull', null, 1, 'reps', 10, 'Supine, reach dumbbell back over head, stretch lats & chest', DB);
  e('db_renegade', 'Renegade Row', 'pull', null, 2, 'reps', 8, 'In plank on dumbbells, row alternating sides', DB);

  // ── Pull: Pull-Up Bar ──────────────────────────────────────
  const BAR = { eq: ['pullup_bar'] };
  e('pu_hang', 'Dead Hang', 'pull', 'pullup', 1, 'sec', 30, 'Relaxed passive to active hang, grip strength', Object.assign({ goal: 60 }, BAR));
  e('pu_scap', 'Scapular Pull-Up', 'pull', 'pullup', 1, 'reps', 8, 'Arms straight, depress scapulae downwards', BAR);
  e('pu_band', 'Band-Assisted Pull-Up', 'pull', 'pullup', 1, 'reps', 8, 'Band looped under feet or knees', { eq: ['pullup_bar', 'band'] });
  e('pu_neg', 'Negative Pull-Up', 'pull', 'pullup', 1, 'reps', 4, 'Jump up, controlled 5-second eccentric descent', Object.assign({ goal: 8 }, BAR));
  e('pu_pullup', 'Pull-Up', 'pull', 'pullup', 2, 'reps', 5, 'Chin clears bar, full dead hang at bottom', BAR);
  e('pu_chin', 'Chin-Up', 'pull', 'pullup', 2, 'reps', 6, 'Palms facing you, strong bicep involvement', BAR);
  e('pu_lsit', 'L-Sit Pull-Up', 'pull', 'pullup', 3, 'reps', 4, 'Legs locked straight at 90° during pull', BAR);
  e('pu_archer', 'Archer Pull-Up', 'pull', 'pullup', 3, 'reps', 3, 'One arm pulls to bar, opposite arm straight', Object.assign({ goal: 6 }, BAR));
  e('pu_mu', 'Bar Muscle-Up', 'pull', 'pullup', 3, 'reps', 2, 'Explosive high pull into clean dip transition', Object.assign({ goal: 5 }, BAR));

  // ── Legs ────────────────────────────────────────────────────
  e('lg_squat', 'Bodyweight Squat', 'legs', 'squat', 1, 'reps', 15, 'Hips below knee crease, heels flat', { goal: 25 });
  e('lg_lunge', 'Reverse Lunge', 'legs', 'squat', 1, 'reps', 10, 'Per leg, back knee hovers above ground');
  e('lg_split', 'Split Squat', 'legs', 'squat', 1, 'reps', 10, 'Per leg, upright torso, controlled descent');
  e('lg_bss', 'Bulgarian Split Squat', 'legs', 'squat', 2, 'reps', 8, 'Rear foot elevated on box/chair, per leg', { goal: 15 });
  e('lg_shrimp_a', 'Assisted Shrimp Squat', 'legs', 'squat', 2, 'reps', 6, 'Light balance assist on wall or post', { goal: 10 });
  e('lg_pistol_box', 'Box Pistol Squat', 'legs', 'squat', 2, 'reps', 6, 'Sit back to chair with single leg', { goal: 10 });
  e('lg_shrimp', 'Shrimp Squat', 'legs', 'squat', 3, 'reps', 5, 'Rear knee touches floor, unassisted', { goal: 8 });
  e('lg_pistol', 'Pistol Squat', 'legs', 'squat', 3, 'reps', 4, 'Full depth, single-leg control', { goal: 8 });
  e('lg_bridge', 'Glute Bridge', 'legs', 'hinge', 1, 'reps', 15, 'Hold 1 second at top contraction, squeeze glutes', { goal: 25 });
  e('lg_sl_bridge', 'Single-Leg Glute Bridge', 'legs', 'hinge', 1, 'reps', 10, 'Per leg, hips square');
  e('lg_hamwalk', 'Hamstring Walkout', 'legs', 'hinge', 2, 'reps', 8, 'From bridge, step heels out and return');
  e('lg_nordic_neg', 'Nordic Curl Negative', 'legs', 'hinge', 2, 'reps', 4, 'Feet anchored, descend as slowly as possible', { goal: 8 });
  e('lg_nordic', 'Nordic Curl', 'legs', 'hinge', 3, 'reps', 3, 'Full descent & concentric pull', { goal: 6 });
  e('lg_calf', 'Calf Raise', 'legs', 'calf', 1, 'reps', 20, 'On stair edge for full deep stretch & peak squeeze', { goal: 30 });
  e('lg_sl_calf', 'Single-Leg Calf Raise', 'legs', 'calf', 2, 'reps', 12, 'Per leg, full stretch to peak contraction', { goal: 20 });
  e('lg_wallsit', 'Wall Sit', 'legs', null, 1, 'sec', 45, 'Thighs parallel to floor, back flat against wall');
  e('db_goblet', 'Goblet Squat', 'legs', null, 1, 'reps', 12, 'Dumbbell held vertically at chest', DB);
  e('db_rdl', 'Dumbbell Romanian Deadlift', 'legs', null, 1, 'reps', 10, 'Neutral spine, hinge hips back, load hamstrings', DB);
  e('db_hipthrust', 'Dumbbell Hip Thrust', 'legs', null, 1, 'reps', 12, 'Upper back on bench, dumbbell over hips', DB);
  e('db_lunge', 'Dumbbell Walking Lunge', 'legs', null, 2, 'reps', 10, 'Per leg, long stride, upright posture', DB);
  e('db_bss', 'Dumbbell Bulgarian Split Squat', 'legs', null, 2, 'reps', 8, 'Per leg, dumbbells held at sides', DB);
  e('db_calf', 'Dumbbell Standing Calf Raise', 'legs', null, 1, 'reps', 15, 'Hold dumbbells, full ankle extension', DB);

  // ── Core ────────────────────────────────────────────────────
  e('co_deadbug', 'Dead Bug', 'core', 'core', 1, 'reps', 10, 'Lower back pinned to floor, alternate sides');
  e('co_plank', 'Plank', 'core', 'core', 1, 'sec', 45, 'Glutes & core locked, neutral neck', { goal: 60 });
  e('co_hollow_tuck', 'Tuck Hollow Hold', 'core', 'core', 1, 'sec', 30, 'Knees tucked, lower back pressed flat');
  e('co_hollow', 'Hollow Body Hold', 'core', 'core', 2, 'sec', 30, 'Arms & legs extended, lower back pressed flat', { goal: 45 });
  e('co_hollow_rock', 'Hollow Body Rock', 'core', 'core', 2, 'reps', 15, 'Rocking back & forth in hollow banana shape', { goal: 20 });
  e('co_vup', 'V-Up', 'core', 'core', 2, 'reps', 12, 'Simultaneous leg & torso lift, touch toes', { goal: 15 });
  e('co_dragon_neg', 'Dragon Flag Negative', 'core', 'core', 3, 'reps', 3, 'Grip bench behind head, slow straight body descent', { goal: 6 });
  e('co_legraise', 'Lying Leg Raise', 'core', 'legraise', 1, 'reps', 12, 'Legs straight, lower back stays grounded', { goal: 20 });
  e('co_hkr', 'Hanging Knee Raise', 'core', 'legraise', 2, 'reps', 10, 'Controlled knee lift without swinging', { eq: ['pullup_bar'], goal: 15 });
  e('co_ttb', 'Toes-to-Bar', 'core', 'legraise', 3, 'reps', 6, 'Toes touch bar at peak', { eq: ['pullup_bar'], goal: 10 });
  e('co_sideplank', 'Side Plank', 'core', null, 1, 'sec', 30, 'Per side, hips elevated in straight line');
  e('db_russian', 'Russian Twist (Dumbbell)', 'core', null, 1, 'reps', 20, 'Total reps across both sides, feet elevated', DB);

  // ── Skill ───────────────────────────────────────────────────
  e('ls_footsup', 'Foot-Supported L-Sit', 'skill', 'lsit', 1, 'sec', 20, 'Hands on surface, heels lightly supporting', { goal: 30 });
  e('ls_tuck', 'Tuck L-Sit', 'skill', 'lsit', 2, 'sec', 10, 'Knees to chest, hips elevated off floor');
  e('ls_one', 'One-Leg L-Sit', 'skill', 'lsit', 2, 'sec', 10, 'Alternate single leg extended', { goal: 20 });
  e('ls_full', 'L-Sit', 'skill', 'lsit', 3, 'sec', 10, 'Legs locked straight parallel to floor', { goal: 20 });
  e('ls_v', 'V-Sit', 'skill', 'lsit', 3, 'sec', 5, 'Legs elevated above horizontal in V angle', { eq: ['parallettes'], goal: 10 });
  e('hs_wallplank', 'Wall Plank (Stomach to Wall)', 'skill', 'handstand', 1, 'sec', 30, 'Walk feet up wall, push through shoulders', { goal: 45 });
  e('hs_crow', 'Crow Pose', 'skill', 'handstand', 1, 'sec', 15, 'Knees resting on triceps, balance forward', { goal: 30 });
  e('hs_chest', 'Chest-to-Wall Handstand', 'skill', 'handstand', 2, 'sec', 30, 'Straight body line, shrug shoulders up to ears', { goal: 60 });
  e('hs_kick', 'Handstand Kick-Up', 'skill', 'handstand', 2, 'sec', 5, 'Kick-up practice & balance hold', { goal: 10 });
  e('hs_free', 'Freestanding Handstand', 'skill', 'handstand', 3, 'sec', 10, 'Freestanding balance without wall support', { goal: 30 });
  e('pl_lean', 'Planche Lean', 'skill', 'planche', 1, 'sec', 20, 'Straight arms, protract scaps, lean far forward', { goal: 30 });
  e('pl_frog', 'Frog Stand', 'skill', 'planche', 1, 'sec', 15, 'Knees outside elbows, bent arm balance', { goal: 30 });
  e('pl_tuck', 'Tuck Planche', 'skill', 'planche', 2, 'sec', 8, 'Straight arms, knees tucked into chest', { goal: 15 });
  e('pl_adv', 'Advanced Tuck Planche', 'skill', 'planche', 3, 'sec', 6, 'Flat back, open 90° hip angle', { goal: 12 });
  e('pl_straddle', 'Straddle Planche', 'skill', 'planche', 3, 'sec', 3, 'Legs wide and fully extended', { goal: 8 });
  const FL = { eq: ['pullup_bar'] };
  e('fl_tuck', 'Tuck Front Lever', 'skill', 'frontlever', 2, 'sec', 8, 'Knees to chest, back horizontal', Object.assign({ goal: 15 }, FL));
  e('fl_adv', 'Advanced Tuck Front Lever', 'skill', 'frontlever', 2, 'sec', 6, 'Flat back, knees away from chest', Object.assign({ goal: 12 }, FL));
  e('fl_oneleg', 'One-Leg Front Lever', 'skill', 'frontlever', 3, 'sec', 5, 'One leg extended straight', Object.assign({ goal: 10 }, FL));
  e('fl_straddle', 'Straddle Front Lever', 'skill', 'frontlever', 3, 'sec', 4, 'Legs spread wide and straight', Object.assign({ goal: 8 }, FL));
  e('fl_full', 'Full Front Lever', 'skill', 'frontlever', 3, 'sec', 3, 'Body fully straight & parallel to ground', Object.assign({ goal: 8 }, FL));

  // ── Index & helpers ─────────────────────────────────────────
  GQ.EXERCISES = L;
  GQ.EX = Object.fromEntries(L.map(x => [x.id, x]));
  GQ.LADDER_STEPS = {};
  L.forEach(x => {
    if (!x.ladder) return;
    const arr = (GQ.LADDER_STEPS[x.ladder] = GQ.LADDER_STEPS[x.ladder] || []);
    arr.push(x);
    x.step = arr.length;
  });

  GQ.isAvailable = (ex, equipment) => !!ex && ex.eq.every(q => equipment.includes(q));
  GQ.unit = ex => (ex && ex.type === 'sec' ? 'sec' : 'reps');
  GQ.stepFor = ex => (ex && ex.type === 'sec' ? 5 : 1);
  /** Mastery goal for a single set — reaching it unlocks the next ladder step. */
  GQ.goalFor = ex => {
    if (!ex) return 0;
    if (ex.goal) return ex.goal;
    if (ex.weighted) return 15;
    return ex.type === 'sec' ? { 1: 45, 2: 30, 3: 15 }[ex.tier] : { 1: 15, 2: 12, 3: 8 }[ex.tier];
  };
  GQ.nextInLadder = (ex, equipment) => {
    if (!ex || !ex.ladder) return null;
    return GQ.LADDER_STEPS[ex.ladder].find(x => x.step > ex.step && GQ.isAvailable(x, equipment)) || null;
  };
  GQ.missingEq = (ex, equipment) => ex.eq.filter(q => !equipment.includes(q)).map(q => GQ.EQ_NAME[q] || q);

  // ── Skill tree (each skill = one ladder) ────────────────────
  GQ.SKILLS = [
    { id: 'pushup', name: 'Push-Up → One-Arm', ladder: 'push_h' },
    { id: 'pistol', name: 'Pistol Squat', ladder: 'squat' },
    { id: 'handstand', name: 'Handstand', ladder: 'handstand' },
    { id: 'lsit', name: 'L-Sit → V-Sit', ladder: 'lsit' },
    { id: 'hspu', name: 'Handstand Push-Up', ladder: 'push_v' },
    { id: 'planche', name: 'Planche', ladder: 'planche' },
    { id: 'nordic', name: 'Nordic Curl', ladder: 'hinge' },
    { id: 'core', name: 'Core → Dragon Flag', ladder: 'core' },
    { id: 'dips', name: 'Dips', ladder: 'dip' },
    { id: 'pullup', name: 'Pull-Up → Muscle-Up', ladder: 'pullup' },
    { id: 'frontlever', name: 'Front Lever', ladder: 'frontlever' },
  ];

  // ── Routine templates ───────────────────────────────────────
  // `pick` lists candidates in priority order; the first one available for the
  // user's equipment wins. {ladder} picks the step matching the user's tier.
  GQ.ROUTINE_TEMPLATES = [
    {
      key: 'proto_hybrid_upper',
      name: 'Upper Body Hybrid: Push-Pull Synergy',
      desc: 'Calisthenics push trio (Push-Up, Diamond, PPPU) paired with antagonist Dumbbell Rows, Bicep Curls & Reverse Flyes',
      warmup: ['wu_wrist', 'wu_scap', 'wu_arm'],
      slots: [
        { pick: [{ id: 'ph_std' }, { ladder: 'push_h' }], sets: 3 },
        { pick: [{ id: 'db_row' }, { ladder: 'row' }], sets: 3 },
        { pick: [{ id: 'ph_diamond' }], sets: 3 },
        { pick: [{ id: 'db_curl' }, { id: 'db_hammer' }], sets: 3 },
        { pick: [{ id: 'ph_pppu' }], sets: 3 },
        { pick: [{ id: 'db_rdfly' }, { id: 'db_shrug' }], sets: 3 },
      ],
    },
    {
      key: 'proto_upper',
      name: 'Day 1: Upper Body Armor & Posture',
      desc: 'Push-ups, dumbbell rows, overhead presses, kickbacks, hammer curls & core',
      warmup: ['wu_wrist', 'wu_scap', 'wu_arm'],
      slots: [
        { pick: [{ ladder: 'push_h' }], sets: 3 },
        { pick: [{ id: 'db_row' }, { ladder: 'row' }], sets: 3 },
        { pick: [{ id: 'dbp_ohp' }, { ladder: 'push_v' }], sets: 3 },
        { pick: [{ id: 'db_kickback' }, { ladder: 'dip' }], sets: 3 },
        { pick: [{ id: 'db_hammer' }, { id: 'db_curl' }], sets: 3 },
        { pick: [{ id: 'co_deadbug' }, { id: 'co_plank' }], sets: 3 },
      ],
    },
    {
      key: 'proto_lower',
      name: 'Day 2: Lower Body & Posterior Chain',
      desc: 'Goblet squats, Romanian deadlifts, reverse lunges, glute bridges & hollow body',
      warmup: ['wu_squat', 'wu_catcow', 'wu_jj'],
      slots: [
        { pick: [{ id: 'db_goblet' }, { ladder: 'squat' }], sets: 3 },
        { pick: [{ id: 'db_rdl' }, { ladder: 'hinge' }], sets: 3 },
        { pick: [{ id: 'lg_lunge' }, { id: 'lg_bss' }], sets: 3 },
        { pick: [{ id: 'lg_bridge' }, { id: 'db_hipthrust' }], sets: 3 },
        { pick: [{ id: 'db_calf' }, { ladder: 'calf' }], sets: 3 },
        { pick: [{ id: 'co_hollow' }, { id: 'co_hollow_tuck' }], sets: 3 },
      ],
    },
    {
      key: 'proto_athletic',
      name: 'Day 3: Full Body Athletic & Arms',
      desc: 'Diamond push-ups, reverse flyes, floor presses, overhead triceps, concentration curls & core',
      warmup: ['wu_jj', 'wu_wrist', 'wu_wgs'],
      slots: [
        { pick: [{ id: 'ph_diamond' }, { ladder: 'push_h' }], sets: 3 },
        { pick: [{ id: 'db_rdfly' }, { ladder: 'row' }], sets: 3 },
        { pick: [{ id: 'dbp_floor' }, { ladder: 'dip' }], sets: 3 },
        { pick: [{ id: 'db_tri_overhead' }, { id: 'db_skull' }], sets: 3 },
        { pick: [{ id: 'db_conc' }, { id: 'db_curl' }], sets: 3 },
        { pick: [{ id: 'db_russian' }, { id: 'co_sideplank' }], sets: 3 },
      ],
    },
    {
      key: 'fbA', name: 'Full Body Baseline (Classic)', desc: 'Push-ups, squats, pull-up/rows, hamstrings & core',
      warmup: ['wu_jj', 'wu_wrist', 'wu_scap', 'wu_squat'],
      slots: [
        { pick: [{ ladder: 'push_h' }], sets: 3 },
        { pick: [{ ladder: 'squat' }], sets: 3 },
        { pick: [{ ladder: 'pullup' }, { id: 'db_row' }, { ladder: 'row' }], sets: 3 },
        { pick: [{ ladder: 'hinge' }], sets: 3 },
        { pick: [{ ladder: 'core' }], sets: 3 },
      ],
    },
    {
      key: 'skill', name: 'Skill & Calisthenics Mastery', desc: 'Handstand, planche, L-sit: pure isometric technique & balance',
      warmup: ['wu_wrist', 'wu_catcow', 'wu_scap'],
      slots: [
        { pick: [{ ladder: 'handstand' }], sets: 4 },
        { pick: [{ ladder: 'planche' }], sets: 3 },
        { pick: [{ ladder: 'lsit' }], sets: 3 },
        { pick: [{ id: 'co_sideplank' }], sets: 2 },
        { pick: [{ id: 'db_russian' }, { id: 'co_hollow_rock' }], sets: 3 },
      ],
    },
  ];
})(window.GQ);
