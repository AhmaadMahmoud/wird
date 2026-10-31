/* ============================================================
   وِرد — منطق التطبيق
   كل البيانات تُحفظ محليًا على الجهاز (localStorage).
   ============================================================ */
(function () {
  'use strict';

  // ---------------------------------------------------------------- المدن
  const CITIES = [
    { id: 'cairo', name: 'القاهرة', lat: 30.0444, lng: 31.2357, tz: 'Africa/Cairo', method: 'Egyptian' },
    { id: 'alexandria', name: 'الإسكندرية', lat: 31.2001, lng: 29.9187, tz: 'Africa/Cairo', method: 'Egyptian' },
    { id: 'riyadh', name: 'الرياض', lat: 24.7136, lng: 46.6753, tz: 'Asia/Riyadh', method: 'UmmAlQura' },
    { id: 'jeddah', name: 'جدة', lat: 21.4858, lng: 39.1925, tz: 'Asia/Riyadh', method: 'UmmAlQura' },
    { id: 'makkah', name: 'مكة المكرمة', lat: 21.3891, lng: 39.8579, tz: 'Asia/Riyadh', method: 'UmmAlQura' },
    { id: 'madinah', name: 'المدينة المنورة', lat: 24.5247, lng: 39.5692, tz: 'Asia/Riyadh', method: 'UmmAlQura' },
    { id: 'dammam', name: 'الدمام', lat: 26.4207, lng: 50.0888, tz: 'Asia/Riyadh', method: 'UmmAlQura' },
    { id: 'dubai', name: 'دبي', lat: 25.2048, lng: 55.2708, tz: 'Asia/Dubai', method: 'Dubai' },
    { id: 'abudhabi', name: 'أبوظبي', lat: 24.4539, lng: 54.3773, tz: 'Asia/Dubai', method: 'Dubai' },
    { id: 'kuwait', name: 'الكويت', lat: 29.3759, lng: 47.9774, tz: 'Asia/Kuwait', method: 'Kuwait' },
    { id: 'doha', name: 'الدوحة', lat: 25.2854, lng: 51.531, tz: 'Asia/Qatar', method: 'Qatar' },
    { id: 'manama', name: 'المنامة', lat: 26.2285, lng: 50.586, tz: 'Asia/Bahrain', method: 'UmmAlQura' },
    { id: 'muscat', name: 'مسقط', lat: 23.588, lng: 58.3829, tz: 'Asia/Muscat', method: 'MuslimWorldLeague' },
    { id: 'amman', name: 'عمّان', lat: 31.9539, lng: 35.9106, tz: 'Asia/Amman', method: 'MuslimWorldLeague' },
    { id: 'khartoum', name: 'الخرطوم', lat: 15.5007, lng: 32.5599, tz: 'Africa/Khartoum', method: 'Egyptian' },
    { id: 'tunis', name: 'تونس', lat: 36.8065, lng: 10.1815, tz: 'Africa/Tunis', method: 'MuslimWorldLeague' },
    { id: 'algiers', name: 'الجزائر', lat: 36.7538, lng: 3.0588, tz: 'Africa/Algiers', method: 'MuslimWorldLeague' },
    { id: 'casablanca', name: 'الدار البيضاء', lat: 33.5731, lng: -7.5898, tz: 'Africa/Casablanca', method: 'MuslimWorldLeague' },
    { id: 'istanbul', name: 'إسطنبول', lat: 41.0082, lng: 28.9784, tz: 'Europe/Istanbul', method: 'Turkey' },
    { id: 'london', name: 'لندن', lat: 51.5074, lng: -0.1278, tz: 'Europe/London', method: 'MuslimWorldLeague' },
  ];

  const METHOD_NAMES = {
    UmmAlQura: 'أم القرى',
    Egyptian: 'الهيئة المصرية العامة للمساحة',
    MuslimWorldLeague: 'رابطة العالم الإسلامي',
    Dubai: 'دبي',
    Kuwait: 'الكويت',
    Qatar: 'قطر',
    Karachi: 'جامعة كراتشي',
    Turkey: 'الشؤون الدينية التركية',
    NorthAmerica: 'أمريكا الشمالية',
  };

  const PRAYERS = [
    { key: 'fajr', name: 'الفجر', icon: 'fajr' },
    { key: 'sunrise', name: 'الشروق', icon: 'sunrise' },
    { key: 'dhuhr', name: 'الظهر', icon: 'dhuhr' },
    { key: 'asr', name: 'العصر', icon: 'asr' },
    { key: 'maghrib', name: 'المغرب', icon: 'maghrib' },
    { key: 'isha', name: 'العشاء', icon: 'isha' },
  ];

  const ICONS = {
    fajr: '<svg viewBox="0 0 24 24"><path d="M3 17h18M6.5 17a5.5 5.5 0 0 1 11 0"/><path d="M12 5v3M5.6 9.6l1.6 1.6M18.4 9.6l-1.6 1.6"/><path d="M8 21h8"/></svg>',
    sunrise: '<svg viewBox="0 0 24 24"><path d="M3 18h18M7 18a5 5 0 0 1 10 0"/><path d="M12 9V3M9.5 5.5 12 3l2.5 2.5"/></svg>',
    dhuhr: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>',
    asr: '<svg viewBox="0 0 24 24"><circle cx="10" cy="11" r="4"/><path d="M10 3v1.8M3 11h1.8M5 6l1.3 1.3M15 6l-1.3 1.3"/><path d="M14 19h7M11 15.5h10"/></svg>',
    maghrib: '<svg viewBox="0 0 24 24"><path d="M3 16h18M7 16a5 5 0 0 1 10 0"/><path d="M12 4v5M9.5 6.5 12 9l2.5-2.5"/><path d="M6 20h12"/></svg>',
    isha: '<svg viewBox="0 0 24 24"><path d="M19 14.5A7.5 7.5 0 1 1 9.5 5a6 6 0 0 0 9.5 9.5Z"/><path d="M17 3.5v3M15.5 5h3"/></svg>',
  };

  const CHECK_SVG = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  // ---------------------------------------------------------------- التخزين
  const store = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem('wird:' + key);
        return v ? JSON.parse(v) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem('wird:' + key, JSON.stringify(value));
      } catch (e) {
        /* التخزين غير متاح */
      }
    },
  };

  const deviceTz = (() => {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Cairo'; } catch (e) { return 'Africa/Cairo'; }
  })();

  function defaultSettings() {
    const city = CITIES.find((c) => c.tz === deviceTz) || CITIES[0];
    return {
      source: 'city',
      cityId: city.id,
      label: city.name,
      lat: city.lat,
      lng: city.lng,
      tz: city.tz,
      method: city.method,
      madhab: 'Shafi',
      hour12: true,
    };
  }

  let settings = Object.assign(defaultSettings(), store.get('settings', {}));
  let log = store.get('log', {}); // { 'YYYY-MM-DD': { fajr, morning, evening } }
  let progress = store.get('progress', {}); // { date, prayerSlot, counts: { kind: { id: n } } }

  function saveSettings() { store.set('settings', settings); }
  function saveLog() { store.set('log', log); }
  function saveProgress() { store.set('progress', progress); }

  // ---------------------------------------------------------------- التنسيق
  const nf = new Intl.NumberFormat('ar-EG');
  const nf2 = new Intl.NumberFormat('ar-EG', { minimumIntegerDigits: 2, useGrouping: false });

  function fmtTime(date) {
    return new Intl.DateTimeFormat('ar-EG', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: settings.hour12,
      timeZone: settings.tz,
    }).format(date);
  }

  function partsInTz(date, tz) {
    const out = {};
    new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(date).forEach((p) => { if (p.type !== 'literal') out[p.type] = +p.value; });
    return out;
  }

  function dayKey(date) {
    const p = partsInTz(date, settings.tz);
    return p.year + '-' + String(p.month).padStart(2, '0') + '-' + String(p.day).padStart(2, '0');
  }

  function shiftKey(key, days) {
    const [y, m, d] = key.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d + days));
    return dt.toISOString().slice(0, 10);
  }

  function keyToDate(key) {
    const [y, m, d] = key.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d, 12));
  }

  function daysWord(n) {
    if (n === 2) return 'يومان';
    if (n >= 3 && n <= 10) return 'أيام';
    if (n >= 11) return 'يومًا';
    return 'يوم';
  }

  // ---------------------------------------------------------------- المواقيت
  const timesCache = new Map();

  function timesForKey(key) {
    const cacheKey = key + '|' + settings.lat + '|' + settings.lng + '|' + settings.method + '|' + settings.madhab;
    if (timesCache.has(cacheKey)) return timesCache.get(cacheKey);
    const [y, m, d] = key.split('-').map(Number);
    const coords = new adhan.Coordinates(settings.lat, settings.lng);
    const params = (adhan.CalculationMethod[settings.method] || adhan.CalculationMethod.MuslimWorldLeague)();
    params.madhab = settings.madhab === 'Hanafi' ? adhan.Madhab.Hanafi : adhan.Madhab.Shafi;
    const pt = new adhan.PrayerTimes(coords, new Date(y, m - 1, d), params);
    const t = {
      fajr: pt.fajr, sunrise: pt.sunrise, dhuhr: pt.dhuhr,
      asr: pt.asr, maghrib: pt.maghrib, isha: pt.isha,
    };
    timesCache.set(cacheKey, t);
    return t;
  }

  function snapshot(now) {
    const today = dayKey(now);
    const t = timesForKey(today);
    const yesterday = timesForKey(shiftKey(today, -1));
    const tomorrow = timesForKey(shiftKey(today, 1));

    let next = null;
    for (const p of PRAYERS) {
      if (p.key === 'sunrise') continue;
      if (t[p.key] > now) { next = { key: p.key, time: t[p.key], tomorrow: false }; break; }
    }
    if (!next) next = { key: 'fajr', time: tomorrow.fajr, tomorrow: true };

    let phase;
    if (now < t.fajr) phase = 'night';
    else if (now < t.sunrise) phase = 'dawn';
    else if (now < t.dhuhr) phase = 'morning';
    else if (now < t.asr) phase = 'noon';
    else if (now < t.maghrib) phase = 'afternoon';
    else if (now < t.isha) phase = 'dusk';
    else phase = 'night';

    // آخر صلاة دخل وقتها (لأذكار بعد الصلاة)
    let current = null;
    for (const p of PRAYERS) {
      if (p.key === 'sunrise') continue;
      if (t[p.key] <= now) current = p.key;
    }
    const prayerSlot = current ? today + ':' + current : shiftKey(today, -1) + ':isha';

    return { now, today, t, yesterday, tomorrow, next, phase, prayerSlot };
  }

  // ---------------------------------------------------------------- السماء
  const SKY = {
    night:     { a: '#0B1026', b: '#171F4A', c: '#29356F', glow: 'rgba(96,116,210,.28)', stars: 1 },
    dawn:      { a: '#1E2457', b: '#5A4D8B', c: '#D78E8B', glow: 'rgba(255,172,132,.6)', stars: .35 },
    morning:   { a: '#2C67AE', b: '#5794D2', c: '#A3CDEE', glow: 'rgba(255,240,205,.4)', stars: 0 },
    noon:      { a: '#285DA6', b: '#4A89CE', c: '#94C5EB', glow: 'rgba(255,255,255,.22)', stars: 0 },
    afternoon: { a: '#34589C', b: '#7783BA', c: '#E1A374', glow: 'rgba(255,190,120,.55)', stars: 0 },
    dusk:      { a: '#191C48', b: '#4F3E7C', c: '#C06A7D', glow: 'rgba(240,120,110,.5)', stars: .5 },
  };

  const $ = (id) => document.getElementById(id);
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function paintSky(phase) {
    const s = SKY[phase];
    const sky = $('sky');
    sky.style.setProperty('--sky-a', s.a);
    sky.style.setProperty('--sky-b', s.b);
    sky.style.setProperty('--sky-c', s.c);
    sky.style.setProperty('--glow', s.glow);
    sky.style.setProperty('--stars', s.stars);
    if (themeMeta) themeMeta.setAttribute('content', s.a);
  }

  const ARC = { cx: 160, cy: 98, rx: 140, ry: 82 };
  function arcPoint(f) {
    const a = Math.PI * Math.min(Math.max(f, 0), 1);
    return { x: ARC.cx + ARC.rx * Math.cos(a), y: ARC.cy - ARC.ry * Math.sin(a) };
  }

  function drawArc(s) {
    const { now, t } = s;
    const isDay = now >= t.sunrise && now < t.maghrib;
    let start, end;
    if (isDay) { start = t.sunrise; end = t.maghrib; }
    else if (now < t.sunrise) { start = s.yesterday.maghrib; end = t.sunrise; }
    else { start = t.maghrib; end = s.tomorrow.sunrise; }
    const f = (now - start) / (end - start);
    const p = arcPoint(f);

    $('arc-done').setAttribute('d', `M ${ARC.cx + ARC.rx} ${ARC.cy} A ${ARC.rx} ${ARC.ry} 0 0 0 ${p.x.toFixed(2)} ${p.y.toFixed(2)}`);
    $('arc-done').style.opacity = isDay ? 1 : .45;

    // علامات الصلوات على قوس النهار
    const span = t.maghrib - t.sunrise;
    const marks = [
      { k: 'sunrise', f: 0, label: 'الشروق', below: true },
      { k: 'dhuhr', f: (t.dhuhr - t.sunrise) / span, label: 'الظهر' },
      { k: 'asr', f: (t.asr - t.sunrise) / span, label: 'العصر' },
      { k: 'maghrib', f: 1, label: 'المغرب', below: true },
    ];
    $('arc-marks').innerHTML = isDay
      ? marks.map((m) => {
          const q = arcPoint(m.f);
          const passed = now >= t[m.k];
          const ly = m.below ? ARC.cy + 12 : q.y - 9;
          return `<circle class="mark ${passed ? 'passed' : ''}" cx="${q.x.toFixed(1)}" cy="${q.y.toFixed(1)}" r="2.6"/>` +
            `<text class="mark-label" x="${q.x.toFixed(1)}" y="${ly.toFixed(1)}">${m.label}</text>`;
        }).join('')
      : `<text class="mark-label" x="${ARC.cx + ARC.rx}" y="${ARC.cy + 12}">المغرب</text>` +
        `<text class="mark-label" x="${ARC.cx - ARC.rx}" y="${ARC.cy + 12}">الشروق</text>`;

    const x = p.x.toFixed(2), y = p.y.toFixed(2);
    $('arc-body').innerHTML = isDay
      ? `<circle class="sun-halo" cx="${x}" cy="${y}" r="13"/><circle class="sun" cx="${x}" cy="${y}" r="6.5"/>`
      : `<g transform="translate(${x} ${y})">
           <mask id="moon-mask"><circle r="8" fill="#fff"/><circle cx="-3.6" cy="-2.6" r="6.6" fill="#000"/></mask>
           <circle r="12" fill="rgba(243,240,226,.12)"/>
           <circle class="moon" r="7" mask="url(#moon-mask)"/>
         </g>`;
  }

  // ---------------------------------------------------------------- واجهة الصلاة
  let lastListSig = '';

  function renderPrayer(s) {
    const { now, t, next } = s;
    paintSky(s.phase);

    // التاريخ
    $('place-name').textContent = settings.label;
    try {
      $('hijri-date').textContent = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-arab', {
        day: 'numeric', month: 'long', year: 'numeric', timeZone: settings.tz,
      }).format(now).replace(/\s?هـ$/, '') + ' هـ';
    } catch (e) { $('hijri-date').textContent = ''; }
    $('greg-date').textContent = new Intl.DateTimeFormat('ar-EG', {
      weekday: 'long', day: 'numeric', month: 'long', timeZone: settings.tz,
    }).format(now);

    // الصلاة القادمة أو وقت الفجر الحالي
    const isFriday = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: settings.tz }).format(now) === 'Fri';
    let label, name, prefix, target;
    if (s.phase === 'dawn') {
      label = 'حان وقت صلاة الفجر';
      name = 'الفجر';
      prefix = 'يخرج وقتها بعد';
      target = t.sunrise;
    } else {
      const p = PRAYERS.find((x) => x.key === next.key);
      label = next.tomorrow ? 'الصلاة القادمة غدًا' : 'الصلاة القادمة';
      name = next.key === 'dhuhr' && isFriday && !next.tomorrow ? 'الجمعة' : p.name;
      prefix = 'بعد';
      target = next.time;
    }
    $('next-label').textContent = label;
    $('next-name').textContent = name;
    $('next-prefix').textContent = prefix;
    const diff = Math.max(0, Math.floor((target - now) / 1000));
    const h = Math.floor(diff / 3600), m = Math.floor((diff % 3600) / 60), sec = diff % 60;
    $('countdown').textContent = h > 0
      ? nf.format(h) + ':' + nf2.format(m) + ':' + nf2.format(sec)
      : nf2.format(m) + ':' + nf2.format(sec);

    drawArc(s);

    // قائمة المواقيت — تُعاد عند تغيّر الحالة فقط
    const passedSig = PRAYERS.map((p) => (now >= t[p.key] ? 1 : 0)).join('');
    const sig = s.today + passedSig + next.key + settings.hour12 + settings.method + settings.madhab + settings.lat + isFriday;
    if (sig !== lastListSig) {
      lastListSig = sig;
      $('times').innerHTML = PRAYERS.map((p) => {
        const cls = [];
        if (p.key === 'sunrise') cls.push('is-sunrise');
        if (!next.tomorrow && p.key === next.key) cls.push('is-next');
        else if (now >= t[p.key]) cls.push('is-passed');
        const nm = p.key === 'dhuhr' && isFriday ? 'الجمعة' : p.name;
        return `<li class="${cls.join(' ')}">
            <span class="t-name"><span class="t-icon" aria-hidden="true">${ICONS[p.icon]}</span>${nm}</span>
            <span class="t-time">${fmtTime(t[p.key])}</span>
          </li>`;
      }).join('');
      $('method-note').textContent = 'طريقة الحساب: ' + METHOD_NAMES[settings.method] +
        (settings.madhab === 'Hanafi' ? '، والعصر على المذهب الحنفي' : '');
    }

    renderFajrCheck(s);
  }

  function renderFajrCheck(s) {
    const box = $('fajr-check');
    if (s.now < s.t.fajr) { box.hidden = true; return; }
    box.hidden = false;
    const done = !!(log[s.today] && log[s.today].fajr);
    box.classList.toggle('is-done', done);
    const btn = $('fajr-check-btn');
    if (done) {
      const st = streak();
      $('fajr-check-title').textContent = 'سُجّلت صلاة الفجر اليوم';
      $('fajr-check-sub').textContent = 'سلسلتك الآن ' + nf.format(st) + ' ' + daysWord(st) + '.';
      btn.textContent = 'تراجع';
      btn.className = 'btn btn-quiet';
    } else {
      $('fajr-check-title').textContent = 'هل صلّيت الفجر اليوم؟';
      $('fajr-check-sub').textContent = 'سجّلها لتحافظ على سلسلتك.';
      btn.textContent = 'نعم، صلّيتها';
      btn.className = 'btn btn-gold';
    }
  }

  function setDay(key, field, value) {
    log[key] = Object.assign({}, log[key], { [field]: value });
    if (!log[key].fajr && !log[key].morning && !log[key].evening) delete log[key];
    saveLog();
  }

  // ---------------------------------------------------------------- الالتزام
  function streak() {
    let key = dayKey(new Date());
    if (!(log[key] && log[key].fajr)) key = shiftKey(key, -1);
    let n = 0;
    while (log[key] && log[key].fajr) { n++; key = shiftKey(key, -1); }
    return n;
  }

  function bestStreak() {
    const keys = Object.keys(log).filter((k) => log[k].fajr).sort();
    let best = 0, run = 0, prev = null;
    for (const k of keys) {
      run = prev && shiftKey(prev, 1) === k ? run + 1 : 1;
      best = Math.max(best, run);
      prev = k;
    }
    return best;
  }

  function renderProgress() {
    const today = dayKey(new Date());
    const st = streak();
    $('streak-num').textContent = nf.format(st);
    $('streak-unit').textContent = st === 0 ? 'ابدأ سلسلتك غدًا' : daysWord(st) + ' متتالية';

    // السبحة: ٣٣ حبة
    const N = 33, cx = 150, cy = 150, R = 126, gap = 26;
    let beads = '';
    for (let i = 0; i < N; i++) {
      const key = shiftKey(today, i - (N - 1));
      const ang = ((90 + gap / 2 + (i * (360 - gap)) / (N - 1)) * Math.PI) / 180;
      const x = cx + R * Math.cos(ang), y = cy + R * Math.sin(ang);
      const on = log[key] && log[key].fajr;
      beads += `<circle class="bead ${on ? 'on' : ''} ${key === today ? 'today' : ''}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7.4"><title>${key}</title></circle>`;
    }
    const by = cy + R;
    $('rosary').setAttribute('viewBox', '0 0 300 330');
    $('rosary').innerHTML =
      `<circle class="string" cx="${cx}" cy="${cy}" r="${R}"/>` +
      `<path class="tassel" d="M ${cx} ${by + 8} V ${by + 26}"/>` +
      `<rect class="imam" x="${cx - 4.5}" y="${by + 2}" width="9" height="16" rx="4.5"/>` +
      `<path class="tassel" d="M ${cx} ${by + 26} l -7 22 M ${cx} ${by + 26} l -2.5 24 M ${cx} ${by + 26} l 2.5 24 M ${cx} ${by + 26} l 7 22"/>` +
      beads;

    // إحصاءات
    const month = today.slice(0, 7);
    const keys = Object.keys(log);
    $('stat-fajr').textContent = nf.format(keys.filter((k) => k.startsWith(month) && log[k].fajr).length);
    $('stat-best').textContent = nf.format(bestStreak());
    $('stat-adhkar').textContent = nf.format(keys.filter((k) => log[k].morning && log[k].evening).length);

    // آخر سبعة أيام
    const days = [];
    for (let i = 6; i >= 0; i--) days.push(shiftKey(today, -i));
    const wdFmt = new Intl.DateTimeFormat('ar-EG', { weekday: 'long', timeZone: 'UTC' });
    const dFmt = new Intl.DateTimeFormat('ar-EG', { day: 'numeric', timeZone: 'UTC' });
    let html = '<span></span>' + days.map((k) => {
      const d = keyToDate(k);
      const wd = wdFmt.format(d).replace(/^ال/, '');
      return `<span class="wk-day ${k === today ? 'is-today' : ''}">${wd}<br>${dFmt.format(d)}</span>`;
    }).join('');
    const rows = [
      { field: 'fajr', label: 'الفجر', editable: true },
      { field: 'morning', label: 'الصباح' },
      { field: 'evening', label: 'المساء' },
    ];
    for (const r of rows) {
      html += `<span class="wk-label">${r.label}</span>`;
      html += days.map((k) => {
        const on = log[k] && log[k][r.field];
        const cls = `cell ${on ? 'on' : ''} ${r.field !== 'fajr' && on ? 'soft' : ''}`;
        if (r.editable) {
          return `<button type="button" class="${cls}" data-day="${k}" aria-pressed="${on ? 'true' : 'false'}" aria-label="الفجر يوم ${k}"></button>`;
        }
        return `<span class="${cls}" aria-label="${r.label} ${on ? 'مكتملة' : 'غير مكتملة'}"></span>`;
      }).join('');
    }
    $('week-grid').innerHTML = html;
  }

  $('week-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-day]');
    if (!btn) return;
    const k = btn.dataset.day;
    setDay(k, 'fajr', !(log[k] && log[k].fajr));
    renderProgress();
    tick(true);
  });

  // ---------------------------------------------------------------- الأذكار
  let adhkarKind = null;

  function ensureProgress(s) {
    if (progress.date !== s.today) {
      // يوم جديد: نُبقي على عدّاد المساء إن كنا قبل الفجر (ليلة الأمس)
      progress = { date: s.today, prayerSlot: s.prayerSlot, counts: { morning: {}, evening: {}, prayer: {} } };
      saveProgress();
    }
    if (progress.prayerSlot !== s.prayerSlot) {
      progress.prayerSlot = s.prayerSlot;
      progress.counts.prayer = {};
      saveProgress();
    }
  }

  function defaultKind(s) {
    return s.now >= s.t.fajr && s.now < s.t.asr ? 'morning' : 'evening';
  }

  function renderAdhkar() {
    const s = snapshot(new Date());
    ensureProgress(s);
    if (!adhkarKind) adhkarKind = defaultKind(s);

    document.querySelectorAll('#adhkar-tabs button').forEach((b) => {
      b.setAttribute('aria-selected', b.dataset.kind === adhkarKind ? 'true' : 'false');
    });

    const set = window.ADHKAR[adhkarKind];
    const counts = progress.counts[adhkarKind];
    const list = $('dhikr-list');
    const firstOpen = set.items.findIndex((d) => (counts[d.id] || 0) < d.count);

    list.innerHTML = set.items.map((d, i) => {
      const n = counts[d.id] || 0;
      return `<li>${cardHTML(d, n, i === firstOpen)}</li>`;
    }).join('');

    fitQuran(list);
    updateAdhkarHeader();
  }

  // عرض الآيات بخط المصحف، مع رقم الآية في آخرها
  function quranHTML(q) {
    let html = '<div class="dhikr-text quran">';
    if (q.preface) html += `<span class="preface">${q.preface}</span>`;
    for (const p of q.passages) {
      if (p.showName) html += `<span class="surah-name">سورة ${p.surah.name}</span>`;
      if (p.basmala) html += `<span class="basmala">${window.QURAN.basmala}</span>`;
      const num = (n) => `<span class="ayah-num" aria-label="الآية ${nf.format(n)}">\uFD3F${nf.format(n)}\uFD3E</span>`;
      if (p.surah.ayat.length > 1) {
        // السور القصيرة: كل آية في سطر مستقل كما في المصحف
        html += '<span class="ayat lines">' + p.surah.ayat
          .map(([n, t]) => `<span class="ayah-line">${t}${num(n)}</span>`)
          .join(' ') + '</span>';
      } else {
        html += '<span class="ayat">' + p.surah.ayat.map(([n, t]) => t + num(n)).join(' ') + '</span>';
      }
    }
    return html + '</div>';
  }

  // تصغير خط السورة بالقدر اللازم فقط حتى تتسع كل آية لسطر واحد
  const QURAN_MIN_SIZE = 17;
  function fitQuran(root) {
    // القياس يجب أن يتم بخط المصحف نفسه، فننتظر تحميله إن لم يكن جاهزًا
    if (document.fonts && !document.fonts.check('23px "Amiri Quran"', 'بِسۡمِ')) {
      document.fonts.load('23px "Amiri Quran"', 'بِسۡمِ').then(() => fitQuran(root)).catch(() => {});
    }
    (root || document).querySelectorAll('.ayat.lines').forEach((box) => {
      box.style.fontSize = '';
      box.classList.remove('wrap');
      if (!box.clientWidth) return;
      const lines = Array.from(box.querySelectorAll('.ayah-line'));
      const overflows = () => lines.some((l) => l.scrollWidth > box.clientWidth + 1);
      let size = parseFloat(getComputedStyle(box).fontSize);
      while (overflows() && size > QURAN_MIN_SIZE) {
        size -= 0.5;
        box.style.fontSize = size + 'px';
      }
      if (overflows()) box.classList.add('wrap');
    });
  }

  let fitTimer;
  window.addEventListener('resize', () => {
    clearTimeout(fitTimer);
    fitTimer = setTimeout(() => fitQuran($('dhikr-list')), 120);
  });
  if (document.fonts) {
    document.fonts.addEventListener('loadingdone', () => fitQuran($('dhikr-list')));
  }

  const C = 2 * Math.PI * 22;
  function cardHTML(d, n, current) {
    const done = n >= d.count;
    const left = d.count - n;
    const off = C * (1 - n / d.count);
    const times = d.count === 1 ? 'مرة واحدة' : d.count === 2 ? 'مرتان' : nf.format(d.count) + (d.count <= 10 ? ' مرات' : ' مرة');
    return `<button type="button" class="dhikr ${done ? 'is-done' : ''} ${current ? 'is-current' : ''}" data-id="${d.id}"
              aria-label="${done ? 'مكتمل' : 'متبقٍ ' + left}">
        ${d.note ? `<span class="dhikr-note">${d.note}</span>` : ''}
        ${d.quran ? quranHTML(d.quran) : `<p class="dhikr-text">${d.text}</p>`}
        <span class="dhikr-foot">
          <span class="dhikr-times">${times}</span>
          <span class="counter">
            <svg viewBox="0 0 52 52" aria-hidden="true">
              <circle class="track" cx="26" cy="26" r="22"/>
              <circle class="fill" cx="26" cy="26" r="22" stroke-dasharray="${C.toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}"/>
            </svg>
            <span class="counter-num">${done ? CHECK_SVG : nf.format(left)}</span>
          </span>
        </span>
      </button>`;
  }

  function updateAdhkarHeader() {
    const set = window.ADHKAR[adhkarKind];
    const counts = progress.counts[adhkarKind];
    const total = set.items.length;
    const done = set.items.filter((d) => (counts[d.id] || 0) >= d.count).length;
    $('adhkar-bar').style.width = (done / total) * 100 + '%';
    $('adhkar-count').textContent = nf.format(done) + ' من ' + nf.format(total);

    const complete = done === total;
    $('done-banner').hidden = !complete;
    if (complete) {
      $('done-sub').textContent =
        adhkarKind === 'morning' ? 'أتممت أذكار الصباح.' :
        adhkarKind === 'evening' ? 'أتممت أذكار المساء.' : 'أتممت أذكار الصلاة.';
    }
  }

  $('dhikr-list').addEventListener('click', (e) => {
    const card = e.target.closest('.dhikr');
    if (!card) return;
    const set = window.ADHKAR[adhkarKind];
    const idx = set.items.findIndex((d) => d.id === card.dataset.id);
    const d = set.items[idx];
    const counts = progress.counts[adhkarKind];
    const n = counts[d.id] || 0;
    if (n >= d.count) return;

    counts[d.id] = n + 1;
    saveProgress();
    const finished = n + 1 >= d.count;
    if (navigator.vibrate) navigator.vibrate(finished ? [12, 40, 12] : 8);

    // تحديث البطاقة الحالية فقط
    const li = card.parentElement;
    li.innerHTML = cardHTML(d, n + 1, !finished);
    fitQuran(li);
    if (!finished) {
      const c = li.querySelector('.counter');
      c.classList.add('pulse');
    } else {
      const nextIdx = set.items.findIndex((x) => (counts[x.id] || 0) < x.count);
      if (nextIdx !== -1) {
        const nextLi = $('dhikr-list').children[nextIdx];
        nextLi.innerHTML = cardHTML(set.items[nextIdx], counts[set.items[nextIdx].id] || 0, true);
        fitQuran(nextLi);
        setTimeout(() => nextLi.scrollIntoView({ behavior: 'smooth', block: 'center' }), 180);
      }
    }

    // تسجيل اكتمال الأذكار
    const allDone = set.items.every((x) => (counts[x.id] || 0) >= x.count);
    if (allDone && (adhkarKind === 'morning' || adhkarKind === 'evening')) {
      setDay(progress.date, adhkarKind, true);
    }
    updateAdhkarHeader();
    if (allDone) $('done-banner').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  $('adhkar-tabs').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-kind]');
    if (!b) return;
    adhkarKind = b.dataset.kind;
    renderAdhkar();
    window.scrollTo({ top: 0 });
  });

  $('adhkar-reset').addEventListener('click', () => {
    progress.counts[adhkarKind] = {};
    saveProgress();
    renderAdhkar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------------------------------------------------------------- الموقع
  // الإعدادات الافتراضية: طريقة الحساب حسب المدينة، والعصر على الجمهور، وصيغة ١٢ ساعة
  function renderLocation() {
    const sel = $('city-select');
    if (!sel.options.length) {
      sel.innerHTML = '<option value="" disabled>اختر مدينة</option>' +
        CITIES.map((c) => `<option value="${c.id}">${c.name}</option>`).join('');
    }
    sel.value = settings.source === 'city' ? settings.cityId : '';
    $('location-status').textContent = settings.source === 'gps'
      ? 'تُحسب المواقيت حسب موقعك الحالي.'
      : 'لحساب المواقيت بدقة لمكانك.';
  }

  function settingsChanged() {
    saveSettings();
    timesCache.clear();
    lastListSig = '';
    tick(true);
    renderLocation();
  }

  function openLocation() {
    renderLocation();
    $('loc-sheet').hidden = false;
    requestAnimationFrame(() => $('loc-sheet').classList.add('open'));
    $('loc-close').focus();
  }

  function closeLocation() {
    const s = $('loc-sheet');
    s.classList.remove('open');
    setTimeout(() => { s.hidden = true; }, 220);
    $('place-chip').focus();
  }

  $('place-chip').addEventListener('click', openLocation);
  $('loc-close').addEventListener('click', closeLocation);
  $('loc-sheet').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeLocation(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('loc-sheet').hidden) closeLocation(); });

  $('city-select').addEventListener('change', (e) => {
    const c = CITIES.find((x) => x.id === e.target.value);
    if (!c) return;
    Object.assign(settings, { source: 'city', cityId: c.id, label: c.name, lat: c.lat, lng: c.lng, tz: c.tz, method: c.method });
    settingsChanged();
    closeLocation();
    toast('تم اختيار ' + c.name);
  });

  $('use-location').addEventListener('click', () => {
    if (!navigator.geolocation) { toast('المتصفح لا يدعم تحديد الموقع'); return; }
    $('location-status').textContent = 'جارٍ تحديد موقعك…';
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const near = CITIES.find((c) => c.tz === deviceTz);
        Object.assign(settings, {
          source: 'gps',
          cityId: null,
          label: 'موقعي الحالي',
          lat: +pos.coords.latitude.toFixed(4),
          lng: +pos.coords.longitude.toFixed(4),
          tz: deviceTz,
          method: near ? near.method : settings.method,
        });
        settingsChanged();
        closeLocation();
        toast('تم تحديد موقعك');
      },
      () => {
        renderLocation();
        toast('تعذّر تحديد الموقع، اختر مدينتك من القائمة');
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 3600000 }
    );
  });

  // ---------------------------------------------------------------- السبحة
  const PHRASES = [
    { id: 'subhan', label: 'سبحان الله', text: 'سُبْحَانَ اللَّهِ' },
    { id: 'hamd', label: 'الحمد لله', text: 'الْحَمْدُ لِلَّهِ' },
    { id: 'akbar', label: 'الله أكبر', text: 'اللَّهُ أَكْبَرُ' },
    { id: 'tahleel', label: 'لا إله إلا الله', text: 'لَا إِلَهَ إِلَّا اللَّهُ' },
    { id: 'istighfar', label: 'أستغفر الله', text: 'أَسْتَغْفِرُ اللَّهَ' },
    { id: 'bihamdih', label: 'سبحان الله وبحمده', text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ' },
    { id: 'hawqala', label: 'لا حول ولا قوة إلا بالله', text: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ' },
    { id: 'salah', label: 'الصلاة على النبي', text: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ' },
  ];
  const BEADS = 33;

  let tasbih = store.get('tasbih', null);
  function ensureTasbih() {
    const today = dayKey(new Date());
    if (!tasbih || tasbih.date !== today) {
      tasbih = {
        date: today,
        phrase: (tasbih && tasbih.phrase) || 'subhan',
        target: tasbih && tasbih.target !== undefined ? tasbih.target : 33,
        counts: {},
        total: 0,
        last: [],
      };
      store.set('tasbih', tasbih);
    }
    return tasbih;
  }
  function cur() {
    const t = ensureTasbih();
    if (!t.counts[t.phrase]) t.counts[t.phrase] = { count: 0, rounds: 0 };
    return t.counts[t.phrase];
  }
  function saveTasbih() { store.set('tasbih', tasbih); }

  function litFor(count, target) {
    if (count <= 0) return 0;
    if (target === 33) return count;
    if (target > 0) return Math.floor((count * BEADS) / target);
    return ((count - 1) % BEADS) + 1;
  }

  function buildBeads() {
    const svg = $('tasbih-beads');
    if (svg.childElementCount) return;
    const cx = 150, cy = 150, R = 128, gap = 22;
    let html = `<circle class="t-string" cx="${cx}" cy="${cy}" r="${R}"/>`;
    for (let i = 0; i < BEADS; i++) {
      // الحبّة الأولى أسفل يمين الشرّابة، والعدّ عكس عقارب الساعة كما تُمرَّر السبحة
      const ang = ((90 - gap / 2 - (i * (360 - gap)) / (BEADS - 1)) * Math.PI) / 180;
      const x = cx + R * Math.cos(ang), y = cy + R * Math.sin(ang);
      html += `<circle class="t-bead" data-i="${i}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7.6"/>`;
    }
    html += `<rect class="t-imam" x="${cx - 5}" y="${cy + R - 4}" width="10" height="18" rx="5"/>`;
    svg.innerHTML = html;
  }

  function renderTasbih(popIndex) {
    ensureTasbih();
    buildBeads();
    const c = cur();
    const t = tasbih;
    const p = PHRASES.find((x) => x.id === t.phrase) || PHRASES[0];

    const chips = $('phrase-chips');
    if (!chips.childElementCount) {
      chips.innerHTML = PHRASES.map((x) => `<button type="button" role="radio" data-phrase="${x.id}">${x.label}</button>`).join('');
    }
    chips.querySelectorAll('button').forEach((b) => b.setAttribute('aria-checked', b.dataset.phrase === t.phrase ? 'true' : 'false'));
    document.querySelectorAll('#target-tabs button').forEach((b) => b.setAttribute('aria-selected', +b.dataset.target === t.target ? 'true' : 'false'));

    $('tasbih-count').textContent = nf.format(c.count);
    $('tasbih-of').textContent = t.target ? 'من ' + nf.format(t.target) : '';
    $('tasbih-phrase').textContent = p.text;
    const meta = [];
    if (c.rounds) meta.push((c.rounds === 1 ? 'دورة واحدة' : c.rounds === 2 ? 'دورتان' : nf.format(c.rounds) + (c.rounds <= 10 ? ' دورات' : ' دورة')) + ' مكتملة');
    meta.push('مجموع اليوم ' + nf.format(t.total));
    $('tasbih-meta').textContent = meta.join('، ');
    $('tasbih-hint').classList.toggle('faded', t.total > 0);

    const lit = litFor(c.count, t.target);
    document.querySelectorAll('#tasbih-beads .t-bead').forEach((b, i) => {
      b.classList.toggle('on', i < lit);
      b.classList.remove('pop');
    });
    if (popIndex !== undefined && popIndex >= 0) {
      const b = document.querySelector(`#tasbih-beads .t-bead[data-i="${popIndex}"]`);
      if (b) { void b.getBoundingClientRect(); b.classList.add('pop'); }
    }
  }

  let flashTimer = null;

  function tasbihTap() {
    const c = cur();
    const t = tasbih;
    // أي ضغطة أثناء وميض اكتمال الدورة تُنهي الوميض فورًا وتُحتسب
    if (flashTimer) { clearTimeout(flashTimer); flashTimer = null; }
    const before = litFor(c.count, t.target);
    c.count += 1;
    t.total += 1;
    let completed = false;
    if (t.target && c.count >= t.target) {
      completed = true;
      c.rounds += 1;
      c.count = 0; // التصفير فوري حتى لا تضيع أي ضغطة تالية
    }
    saveTasbih();

    const pulse = $('tasbih-count');
    pulse.classList.remove('bump'); void pulse.offsetWidth; pulse.classList.add('bump');

    if (completed) {
      if (navigator.vibrate) navigator.vibrate([30, 70, 30]);
      // وميض عرض فقط: الحلقة كاملة والرقم المكتمل، ثم العودة للعدّ
      renderTasbih();
      document.querySelectorAll('#tasbih-beads .t-bead').forEach((b) => b.classList.add('on'));
      $('tasbih-count').textContent = nf.format(t.target);
      const wrap = document.querySelector('.beads-wrap');
      wrap.classList.remove('complete'); void wrap.offsetWidth; wrap.classList.add('complete');
      $('tasbih-live').textContent = 'اكتملت الدورة';
      flashTimer = setTimeout(() => { flashTimer = null; renderTasbih(); }, 650);
    } else {
      if (navigator.vibrate) navigator.vibrate(7);
      const after = litFor(c.count, t.target);
      renderTasbih(after > before || !t.target ? after - 1 : undefined);
    }
  }

  // الضغط في أي مكان من الشاشة يُحتسب، عدا الأزرار وشريط التنقل
  // كل لمسة تُحتسب، حتى عند التسبيح بإصبعين بالتناوب السريع
  const isControl = (el) => el.closest('button, select, a, .phrase-chips, .tasbih-controls');
  $('view-tasbih').addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button > 0) return;
    if (isControl(e.target)) return;
    e.preventDefault();
    tasbihTap();
  });
  // منع التكبير والنقرة المتأخرة على شاشة السبحة (يلزم مستمع غير سلبي لـ iOS)
  const blockTouch = (e) => { if (!isControl(e.target)) e.preventDefault(); };
  $('view-tasbih').addEventListener('touchstart', blockTouch, { passive: false });
  $('view-tasbih').addEventListener('touchend', blockTouch, { passive: false });
  $('view-tasbih').addEventListener('dblclick', (e) => e.preventDefault());
  document.addEventListener('keydown', (e) => {
    if (!$('view-tasbih').classList.contains('is-active')) return;
    if ((e.key === ' ' || e.key === 'Enter') && !e.target.closest('button, select, input')) {
      e.preventDefault();
      tasbihTap();
    }
  });

  $('phrase-chips').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-phrase]');
    if (!b) return;
    ensureTasbih().phrase = b.dataset.phrase;
    saveTasbih();
    renderTasbih();
  });

  $('target-tabs').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-target]');
    if (!b) return;
    const t = ensureTasbih();
    t.target = +b.dataset.target;
    const c = cur();
    if (t.target && c.count >= t.target) c.count = c.count % t.target;
    saveTasbih();
    renderTasbih();
  });

  $('tasbih-undo').addEventListener('click', () => {
    const c = cur();
    if (c.count > 0) {
      c.count -= 1;
      tasbih.total = Math.max(0, tasbih.total - 1);
    } else if (c.rounds > 0 && tasbih.target) {
      c.rounds -= 1;
      c.count = tasbih.target - 1;
      tasbih.total = Math.max(0, tasbih.total - 1);
    }
    saveTasbih();
    renderTasbih();
  });

  $('tasbih-reset').addEventListener('click', () => {
    const c = cur();
    if (!c.count && !c.rounds) return;
    c.count = 0;
    c.rounds = 0;
    saveTasbih();
    renderTasbih();
    toast('تم تصفير العداد');
  });

  $('fajr-check-btn').addEventListener('click', () => {
    const k = dayKey(new Date());
    const now = !(log[k] && log[k].fajr);
    setDay(k, 'fajr', now);
    if (now) {
      if (navigator.vibrate) navigator.vibrate([12, 40, 12]);
      toast('تقبّل الله منك');
    }
    tick(true);
  });

  // ---------------------------------------------------------------- التنقل
  function showView(name) {
    document.querySelectorAll('.view').forEach((v) => v.classList.toggle('is-active', v.id === 'view-' + name));
    document.querySelectorAll('.tabbar button').forEach((b) => b.setAttribute('aria-selected', b.dataset.view === name ? 'true' : 'false'));
    if (name === 'adhkar') renderAdhkar();
    if (name === 'progress') renderProgress();
    if (name === 'tasbih') renderTasbih();
    if (name === 'prayer') tick(true);
    window.scrollTo({ top: 0 });
  }

  document.querySelector('.tabbar').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-view]');
    if (b) showView(b.dataset.view);
  });

  // ---------------------------------------------------------------- تنبيه مؤقت
  let toastTimer;
  function toast(msg) {
    const el = $('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  // ---------------------------------------------------------------- منع التكبير
  ['gesturestart', 'gesturechange', 'gestureend'].forEach((t) =>
    document.addEventListener(t, (e) => e.preventDefault(), { passive: false })
  );
  document.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 1) e.preventDefault();
  }, { passive: false });

  // ---------------------------------------------------------------- الدورة
  function tick(force) {
    const view = document.querySelector('.view.is-active');
    if (!force && document.hidden) return;
    if (view && view.id === 'view-prayer') renderPrayer(snapshot(new Date()));
  }

  setInterval(tick, 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { lastListSig = ''; tick(true); } });

  tick(true);

  // عامل الخدمة: التحقق من التحديثات عند كل فتح، وإعادة التحميل مرة واحدة عند وصول نسخة جديدة
  if ('serviceWorker' in navigator) {
    const hadController = !!navigator.serviceWorker.controller;
    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController || reloaded) return;
      reloaded = true;
      window.location.reload();
    });
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then((reg) => {
        document.addEventListener('visibilitychange', () => {
          if (!document.hidden) reg.update().catch(() => {});
        });
      }).catch(() => {});
    });
  }
})();
