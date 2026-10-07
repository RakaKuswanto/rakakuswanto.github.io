/* GymQuest — shared utilities.
 * All date keys use LOCAL time (YYYY-MM-DD). The old version used toISOString(),
 * which is UTC and shifted workouts before 07:00 WIB to the previous day. */
window.GQ = window.GQ || {};
(function (GQ) {
  'use strict';
  const pad = n => String(n).padStart(2, '0');
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  const U = {
    uid() {
      return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    },
    esc(s) {
      return String(s ?? '').replace(/[&<>"']/g, c => ESC[c]);
    },
    /** Local-date key, e.g. "2026-10-06". */
    dateKey(d = new Date()) {
      const x = new Date(d);
      return `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())}`;
    },
    keyToDate(key) {
      const [y, m, d] = key.split('-').map(Number);
      return new Date(y, m - 1, d);
    },
    startOfDay(d) {
      const x = new Date(d);
      x.setHours(0, 0, 0, 0);
      return x;
    },
    /** Monday 00:00 of the week containing d. */
    weekStart(d) {
      const x = U.startOfDay(d);
      x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
      return x;
    },
    addDays(d, n) {
      const x = new Date(d);
      x.setDate(x.getDate() + n);
      return x;
    },
    daysBetween(a, b) {
      return Math.round((U.startOfDay(b) - U.startOfDay(a)) / 86400000);
    },
    clock(sec) {
      sec = Math.max(0, Math.floor(sec));
      const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
      return h ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
    },
    duration(sec) {
      const m = Math.max(0, Math.round(sec / 60));
      if (m < 60) return `${m} min`;
      return `${Math.floor(m / 60)}h ${m % 60}m`;
    },
    fmtDate(d, opts = { day: 'numeric', month: 'short', year: 'numeric' }) {
      return new Date(d).toLocaleDateString('en-US', opts);
    },
    fmtTime(d) {
      return new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    },
    relDay(d) {
      const n = U.daysBetween(d, new Date());
      if (n <= 0) return 'Today';
      if (n === 1) return 'Yesterday';
      if (n < 7) return `${n} days ago`;
      if (n < 30) return `${Math.floor(n / 7)} weeks ago`;
      return U.fmtDate(d);
    },
    num(n) {
      return Number(n || 0).toLocaleString('en-US');
    },
    clamp(n, a, b) {
      return Math.min(b, Math.max(a, n));
    },
    greeting() {
      const h = new Date().getHours();
      if (h < 12) return 'Good morning';
      if (h < 17) return 'Good afternoon';
      return 'Good evening';
    },
    download(filename, content, mime = 'application/octet-stream') {
      const blob = content instanceof Blob ? content : new Blob([content], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    },
    debounce(fn, ms = 300) {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), ms);
      };
    },
  };

  GQ.U = U;
})(window.GQ);
