/* =========================================================
   PENGATURAN: isi nomor WhatsApp Anda di bawah ini.
   Format: 62 + nomor tanpa angka 0 di depan.
   Contoh: 0812-3456-7890  ->  '6281234567890'
   ========================================================= */
var WA_NUMBER = "6289654998567";

(function () {
  document.documentElement.classList.add("js");

  // Tautan WhatsApp dengan pesan otomatis
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href =
      "https://wa.me/" +
      WA_NUMBER +
      "?text=Halo%20Satu%20Poin,%20saya%20ingin%20konsultasi%20mengenai%20layanan%20pengelolaan%20media%20sosial%20dan%20iklan%20untuk%20brand%20saya.%20Boleh%20bantu%20infokan%20detailnya?";
  });

  // Menu mobile
  var btn = document.querySelector(".menubtn");
  var menu = document.getElementById("mobmenu");
  function setMenu(open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    menu.hidden = !open;
  }
  btn.addEventListener("click", function () {
    setMenu(menu.hidden);
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      setMenu(false);
    });
  });

  // Reveal saat scroll
  var targets = document.querySelectorAll(".reveal, .steps");
  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("in");
    });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -12% 0px" }
  );
  targets.forEach(function (el) {
    io.observe(el);
  });
})();
