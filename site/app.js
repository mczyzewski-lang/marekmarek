// Zapis na Sprint: 7x Impuls.
//
// SIGNUP_ENDPOINT: adres, na który formularz wysyła zapis (POST, JSON: { name, email, source }).
// Dopóki jest pusty, formularz NIE zapisuje nikogo — tylko przenosi na stronę po zapisie (tryb podglądu).
const SIGNUP_ENDPOINT = "";
const THANK_YOU_URL = "/dziekuje/";

document.querySelectorAll("form.signup").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const error = form.parentElement.querySelector(".form-error");
    const email = form.querySelector('input[type="email"]').value.trim();
    const name = form.querySelector('input[name="name"]').value.trim();
    if (error) error.hidden = true;

    if (!SIGNUP_ENDPOINT) {
      console.warn("SIGNUP_ENDPOINT jest pusty — tryb podglądu, adres nie został zapisany.");
      window.location.href = THANK_YOU_URL;
      return;
    }

    button.disabled = true;
    try {
      const response = await fetch(SIGNUP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: form.dataset.source || "landing" }),
      });
      if (!response.ok) throw new Error("HTTP " + response.status);
      window.location.href = THANK_YOU_URL;
    } catch (err) {
      console.error(err);
      if (error) error.hidden = false;
      button.disabled = false;
    }
  });
});

// Animacje wejścia: elementy z [data-reveal] pojawiają się, gdy wjadą w ekran.
const revealables = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
  );
  revealables.forEach((el) => revealObserver.observe(el));
} else {
  revealables.forEach((el) => el.classList.add("in"));
}

// Dolny pasek: widoczny, gdy na ekranie nie ma żadnego formularza zapisu.
const bar = document.querySelector(".stickybar");
const forms = document.querySelectorAll("form.signup");
if (bar && forms.length && "IntersectionObserver" in window) {
  const visible = new Set();
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    });
    bar.classList.toggle("show", visible.size === 0);
  });
  forms.forEach((form) => barObserver.observe(form));
}

// Efekty zależne od przewijania: paralaksa zdjęcia zespołu i „wyskakujący” kontener zapisu.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const parallaxEls = document.querySelectorAll("[data-parallax]");
const popEls = document.querySelectorAll("[data-pop]");
if (!reduceMotion && (parallaxEls.length || popEls.length)) {
  const clamp = (v) => Math.max(0, Math.min(1, v));
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    parallaxEls.forEach((el) => {
      const rect = el.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = (vh - rect.top) / (vh + rect.height); // 0 → 1 w trakcie przejazdu przez ekran
      el.style.transform = `translate3d(0, ${((progress - 0.5) * 2 * 9).toFixed(2)}%, 0)`;
    });
    popEls.forEach((el) => {
      const section = el.closest("section");
      const rect = section.getBoundingClientRect();
      const raw = clamp((vh - rect.top) / (Math.min(rect.height, vh) * 0.95));
      const p = 1 - Math.pow(1 - raw, 2); // wyhamowanie pod koniec
      el.style.transform = `translate3d(0, ${((1 - p) * 340).toFixed(1)}px, 0) scale(${(0.58 + 0.42 * p).toFixed(3)})`;
    });
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}
