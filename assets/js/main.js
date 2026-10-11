/* =========================================================
   PENGATURAN: isi nomor WhatsApp Anda di bawah ini.
   Format: 62 + nomor tanpa angka 0 di depan.
   Contoh: 0812-3456-7890  ->  '6281234567890'
   ========================================================= */
var WA_NUMBER = '6289654998567';

/* =========================================================
   PENGATURAN GOOGLE FORM (untuk form di section Contact)
   1. Buka Google Form Anda > titik tiga > "Dapatkan link yang sudah
      diisi otomatis" (Get pre-filled link).
   2. Isi semua pertanyaan dengan contoh, klik "Dapatkan link", salin.
   3. Di link itu ada bagian seperti entry.123456789=... ; angka itu
      adalah ID tiap pertanyaan. Tempel ke "fields" di bawah.
   4. "action": alamat form Anda dengan akhiran /viewform diganti
      menjadi /formResponse.
   Pilihan layanan di Google Form (pertanyaan kotak centang) harus
   sama persis dengan teks tombol layanan di halaman.
   ========================================================= */
var GOOGLE_FORM = {
  action: 'https://docs.google.com/forms/d/e/XXXXXXXXXXXX/formResponse',
  fields: {
    nama:     'entry.1111111111',
    brand:    'entry.2222222222',
    whatsapp: 'entry.3333333333',
    email:    'entry.4444444444',
    akun:     'entry.5555555555',
    layanan:  'entry.6666666666',
    pesan:    'entry.7777777777'
  }
};


(function(){
  document.documentElement.classList.add('js');

  // Tautan WhatsApp dengan pesan otomatis
  document.querySelectorAll('[data-wa]').forEach(function(a){
    a.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(a.getAttribute('data-wa'));
  });

  // Menu mobile
  var btn = document.querySelector('.menubtn');
  var menu = document.getElementById('mobmenu');
  function setMenu(open){
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    menu.hidden = !open;
  }
  btn.addEventListener('click', function(){ setMenu(menu.hidden); });
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ setMenu(false); }); });

  // Reveal saat scroll
  var targets = document.querySelectorAll('.reveal, .steps, .ab-grid');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
  targets.forEach(function(el){ io.observe(el); });
})();

/* Form kontak -> dikirim ke Google Form */
(function(){
  var form = document.getElementById('contact-form');
  if (!form) return;
  var err = document.getElementById('f-error');
  var ok = document.getElementById('f-success');
  var btn = form.querySelector('button[type="submit"]');
  var label = btn.querySelector('.btn-label');
  function clearErr(){
    Array.prototype.forEach.call(form.querySelectorAll('[aria-invalid]'), function(el){ el.removeAttribute('aria-invalid'); });
    err.textContent = '';
  }
  form.addEventListener('input', clearErr);
  form.addEventListener('change', clearErr);
  function invalid(el, msg){ el.setAttribute('aria-invalid', 'true'); el.focus(); err.textContent = msg; }
  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    ok.textContent = '';
    clearErr();
    var v = function(n){ return (form.elements[n].value || '').trim(); };
    var layanan = Array.prototype.slice.call(form.querySelectorAll('input[name="layanan"]:checked')).map(function(c){ return c.value; });
    if (!v('nama')) return invalid(form.elements['nama'], 'Isi nama Anda terlebih dahulu.');
    if (!/^[+0-9][0-9\s-]{7,}$/.test(v('whatsapp'))) return invalid(form.elements['whatsapp'], 'Isi nomor WhatsApp yang valid, contoh 081234567890.');
    if (v('email') && !form.elements['email'].checkValidity()) return invalid(form.elements['email'], 'Format email belum benar.');
    if (!layanan.length && !v('pesan')) { err.textContent = 'Pilih minimal satu layanan atau tulis pesan singkat.'; return; }
    if (GOOGLE_FORM.action.indexOf('XXXX') > -1) { err.textContent = 'Form belum tersambung ke Google Form. Isi pengaturan GOOGLE_FORM terlebih dahulu.'; return; }
    var f = GOOGLE_FORM.fields, data = new URLSearchParams();
    ['nama', 'brand', 'whatsapp', 'email', 'akun', 'pesan'].forEach(function(k){ if (f[k] && v(k)) data.append(f[k], v(k)); });
    layanan.forEach(function(x){ data.append(f.layanan, x); });
    btn.disabled = true; label.textContent = 'Mengirim…';
    fetch(GOOGLE_FORM.action, { method: 'POST', mode: 'no-cors', body: data })
      .then(function(){
        form.reset();
        ok.textContent = 'Terima kasih, pesan Anda sudah terkirim. Tim kami akan segera menghubungi Anda.';
      })
      .catch(function(){ err.textContent = 'Pesan gagal terkirim. Periksa koneksi internet Anda, lalu coba lagi.'; })
      .then(function(){ btn.disabled = false; label.textContent = 'Submit'; });
  });
})();

/* Tagline Contact: efek mengetik (berulang) */
(function(){
  var el = document.querySelector('.tagline[data-type]');
  if (!el) return;
  var old = el.querySelector('.tg-text');
  var box = document.createElement('span');
  box.className = 'tg-text'; box.setAttribute('aria-hidden', 'true');
  var chars = [];
  el.getAttribute('data-type').split('').forEach(function(ch){
    var n = ch === '|' ? document.createElement('br') : document.createElement('span');
    if (ch !== '|') n.textContent = ch;
    box.appendChild(n); chars.push(n);
  });
  var cursor = document.createElement('span');
  cursor.className = 'tg-cursor';
  el.replaceChild(box, old);
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { box.appendChild(cursor); return; }
  var TYPE = function(){ return 55 + Math.random() * 75; }, ERASE = 32, HOLD = 2600, GAP = 650, LINE = 320;
  function hideAll(){ chars.forEach(function(c){ if (c.tagName === 'SPAN') c.classList.add('tg-hide'); }); box.insertBefore(cursor, box.firstChild); }
  var i = 0;
  function type(){
    if (i >= chars.length) { cursor.classList.remove('typing'); setTimeout(erase, HOLD); return; }
    cursor.classList.add('typing');
    var c = chars[i++];
    if (c.tagName === 'SPAN') c.classList.remove('tg-hide');
    box.insertBefore(cursor, c.nextSibling);
    setTimeout(type, c.tagName === 'BR' ? LINE : TYPE());
  }
  function erase(){
    cursor.classList.add('typing');
    if (i <= 0) { cursor.classList.remove('typing'); setTimeout(type, GAP); return; }
    var c = chars[--i];
    if (c.tagName === 'SPAN') c.classList.add('tg-hide');
    box.insertBefore(cursor, c);
    setTimeout(erase, ERASE);
  }
  hideAll();
  function start(){ setTimeout(type, 450); }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      if (entries[0].isIntersecting) { io.disconnect(); start(); }
    }, { threshold: 0.6 });
    io.observe(el);
  } else { start(); }
})();
