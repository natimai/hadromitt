/* al-haesh page code. The engine stays untouched; everything bespoke lives here. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  ScrollCraft.mount(document.body);

  // ---------------------------------------------------------------- tracking
  // Google Ads lead conversion: paste the "AW-ID/label" from Google Ads here. Empty = not sent.
  var ADS_LEAD_SEND_TO = '';

  function track(action, label) {
    try { if (window.gtag) gtag('event', action, { event_category: 'conversion', event_label: label }); } catch (e) {}
    try { if (ADS_LEAD_SEND_TO && window.gtag) gtag('event', 'conversion', { send_to: ADS_LEAD_SEND_TO }); } catch (e) {}
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-track]');
    if (!a) return;
    if (a.href && a.href.indexOf('wa.me') > -1) track('contact_click', 'al_haesh_' + a.getAttribute('data-track'));
    else if (a.href && a.href.indexOf('tel:') === 0) track('contact_click', 'al_haesh_' + a.getAttribute('data-track'));
  });

  // ------------------------------------------------- signature: coal bed --
  // Coals light right to left (reading direction) as page progress grows.
  // Passing the peak flares the whole bed. Heat also warms every photo.
  var coalsEl = document.querySelector('.coals');
  var bed = document.querySelector('.coals__bed');
  var embersEl = document.querySelector('.coals__embers');
  var peak = document.querySelector('[data-peak]');
  var dock = document.querySelector('.dock');
  var hero = document.querySelector('.hero');

  var N = 46;
  var coals = [];
  // Deterministic irregular layout so the bed looks the same on every load.
  for (var i = 0; i < N; i++) {
    var c = document.createElement('i');
    c.className = 'coal';
    var size = 18 + ((i * 37) % 17);
    var pos = (i + 0.5) / N; // 0 = rightmost
    var row = i % 2;
    c.style.width = size + 'px';
    c.style.height = Math.round(size * 0.72) + 'px';
    c.style.right = 'calc(' + (pos * 100).toFixed(2) + '% - ' + (size / 2) + 'px)';
    c.style.bottom = (row ? 10 + ((i * 13) % 6) : -4 + ((i * 7) % 5)) + 'px';
    c.style.zIndex = row ? 1 : 2;
    c.style.setProperty('--fd', (1.6 + ((i * 7) % 10) / 10).toFixed(2) + 's');
    c.style.setProperty('--fdl', (-((i * 5) % 17) / 10).toFixed(2) + 's');
    bed.appendChild(c);
    coals.push({ el: c, at: pos, lit: -1 });
  }

  if (!reduce) {
    for (var k = 0; k < 18; k++) {
      var em = document.createElement('i');
      em.style.right = ((k * 53) % 100) + '%';
      em.style.animationDuration = (3.2 + ((k * 7) % 25) / 10) + 's';
      em.style.animationDelay = (-((k * 11) % 40) / 10) + 's';
      em.style.setProperty('--dx', (((k % 2) ? 1 : -1) * (6 + (k * 5) % 22)) + 'px');
      em.style.setProperty('--h', (14 + (k * 9) % 26) + 'svh');
      embersEl.appendChild(em);
    }
  }

  function smooth(t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }

  var last = { heat: -1, lit: -1, flare: -1, dock: null };
  function frame() {
    var vh = innerHeight;
    var max = Math.max(1, document.documentElement.scrollHeight - vh);
    var y = scrollY;
    // The first coal catches on load; the bed is fully lit on arrival at the close.
    var prog = Math.min(1, y / max);
    var litFrac = 0.06 + prog * 0.94;

    for (var i = 0; i < coals.length; i++) {
      var c = coals[i];
      // Each coal takes a short ramp to catch, so lighting reads as spreading, not switching.
      var v = smooth((litFrac - c.at) / 0.05 + 0.5);
      v = Math.round(v * 20) / 20;
      if (v !== c.lit) { c.el.style.setProperty('--lit', v); c.lit = v; }
    }

    var lf = Math.round(litFrac * 100) / 100;
    if (lf !== last.lit) { coalsEl.style.setProperty('--litfrac', lf); last.lit = lf; }

    // Flare: a bell around the moment the steaks fill the screen.
    var flare = 0;
    if (peak) {
      var r = peak.getBoundingClientRect();
      var centre = r.top + r.height * 0.36;
      var d = Math.abs(centre - vh * 0.5) / vh;
      flare = smooth(1 - d / 0.6);
    }
    flare = Math.round(flare * 40) / 40;
    if (flare !== last.flare) { coalsEl.style.setProperty('--flare', flare); last.flare = flare; }

    var heat = Math.round(Math.max(prog, flare) * 20) / 20;
    if (heat !== last.heat) { root.style.setProperty('--heat', heat); last.heat = heat; }

    // The dock arrives once the hero CTAs are leaving.
    var showDock = hero ? hero.getBoundingClientRect().bottom < vh * 0.55 : y > vh * 0.5;
    if (showDock !== last.dock) { dock.classList.toggle('is-in', showDock); last.dock = showDock; }

    // Harness signature of what actually paints on the fixed layer.
    coalsEl.setAttribute('data-sc-verify-state', lf + '|' + flare);
  }

  var queued = false;
  function onScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; frame(); });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  frame();

  // ------------------------------------------------------------- the form --
  var form = document.querySelector('.form');
  var done = document.querySelector('.form-done');
  var error = form.querySelector('.form__error');

  function leadSource() {
    var q = new URLSearchParams(location.search);
    var parts = ['דף נחיתה גוגל, על האש'];
    if (q.get('utm_campaign')) parts.push('קמפיין: ' + q.get('utm_campaign'));
    var term = q.get('utm_term') || q.get('keyword');
    if (term) parts.push('מילת חיפוש: ' + term);
    return parts.join(' | ');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = {};
    Array.prototype.forEach.call(form.elements, function (el) { if (el.name) data[el.name] = (el.value || '').trim(); });
    var name = form.elements.name, phone = form.elements.phone;
    name.setAttribute('aria-invalid', data.name ? 'false' : 'true');
    phone.setAttribute('aria-invalid', data.phone ? 'false' : 'true');
    if (!data.name || !data.phone) {
      error.hidden = false;
      (data.name ? phone : name).focus();
      return;
    }
    error.hidden = true;
    var source = leadSource();

    var lines = [
      'שלום, אשמח לקבל הצעת מחיר לקייטרינג בשרים לאירוע חוץ',
      'שם: ' + data.name,
      'טלפון: ' + data.phone,
      data.date ? 'תאריך מבוקש: ' + data.date : '',
      data.guests ? 'מספר אורחים: ' + data.guests : '',
      data.location ? 'מיקום האירוע: ' + data.location : '',
      data.note ? 'הערות: ' + data.note : ''
    ].filter(Boolean);

    track('event_lead', 'al_haesh_form');
    try { if (window.fbq) fbq('track', 'Lead', { content_name: source, content_category: 'events' }); } catch (err) {}

    // Background copy of the lead, so it is not lost if the visitor never presses send in WhatsApp.
    try {
      fetch('https://formsubmit.co/ajax/info@hadromit.co.il', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'פנייה מהאתר, ' + source + ', ' + data.name,
          _template: 'table', _captcha: false,
          name: data.name, phone: data.phone, date: data.date, guests: data.guests,
          location: data.location, note: data.note, source: source
        })
      }).catch(function () {});
    } catch (err) {}

    window.open('https://wa.me/972503133001?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    form.hidden = true;
    done.hidden = false;
    done.setAttribute('tabindex', '-1');
    done.focus();
  });
})();
