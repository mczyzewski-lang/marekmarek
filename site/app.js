// Zapis na Sprint: 7x e-mail z wideo.
//
// SIGNUP_ENDPOINT: adres, na który formularz wysyła zapis (POST, JSON: { name, email, source }).
// Dopóki jest pusty, formularz NIE zapisuje nikogo - tylko przenosi na stronę po zapisie (tryb podglądu).
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
      console.warn("SIGNUP_ENDPOINT jest pusty - tryb podglądu, adres nie został zapisany.");
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
    updateBar();
  });
  // Pasek pojawia się dopiero od sekcji „Problem” (gdy taka jest na stronie) i tylko wtedy, gdy nie widać formularza.
  const gate = document.querySelector("#problem");
  const updateBar = () => {
    const reached = !gate || gate.getBoundingClientRect().top < window.innerHeight * 0.45;
    bar.classList.toggle("show", reached && visible.size === 0);
  };
  window.addEventListener("scroll", updateBar, { passive: true });
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
      el.style.setProperty("--px", (clamp(progress) * 100).toFixed(1) + "%"); // telefon: zdjęcie jedzie w poziomie
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

// Oś na stronie głównej: podpisy na telefonie mają stały rozmiar niezależnie od szerokości rysunku.
const pulse = document.querySelector(".pulse");
if (pulse) {
  const setScale = () => {
    const width = pulse.getBoundingClientRect().width;
    if (width) pulse.style.setProperty("--k", (1040 / width).toFixed(3));
  };
  setScale();
  window.addEventListener("resize", setScale);
}

// Boks z firmami: gdy 5 kolumn nie mieści się na ekranie, przewijanie w dół najpierw przesuwa rząd w bok
// (boks jest „przypięty”), a dopiero potem strona jedzie dalej.
document.querySelectorAll("[data-hscroll]").forEach((section) => {
  const wrap = section.querySelector(".wrap");
  const row = section.querySelector(".firms");
  if (!wrap || !row || reduceMotion) return;
  let overflow = 0;
  let pinTop = 12;
  const lead = 170; // najpierw boks staje na środku, dopiero po chwili rząd zaczyna jechać w bok (i tak samo na końcu)
  const measure = () => {
    overflow = Math.max(0, row.scrollWidth - row.clientWidth);
    if (overflow < 8) { overflow = 0; section.style.height = ""; section.classList.remove("pinned"); return; }
    section.classList.add("pinned");
    const height = wrap.getBoundingClientRect().height;
    pinTop = Math.max(12, (window.innerHeight - height) / 2);
    section.style.setProperty("--pin-top", pinTop + "px");
    section.style.height = height + overflow + lead * 2 + 12 + "px";
  };
  const sync = () => {
    if (!overflow) return;
    const progress = Math.max(0, Math.min(1, (pinTop - section.getBoundingClientRect().top - lead) / overflow));
    row.scrollLeft = progress * overflow;
  };
  measure();
  sync();
  window.addEventListener("scroll", sync, { passive: true });
  // Na telefonie chowanie paska adresu wywołuje „resize” bez zmiany szerokości. Przeliczanie wtedy wysokości
  // sekcji przesuwało całą stronę (skok przy przewijaniu na dole), więc reagujemy tylko na zmianę szerokości.
  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    measure();
    sync();
  });
  window.addEventListener("load", () => { measure(); sync(); });
});

// Liczby nad boksem z firmami: odliczają od zera jedna po drugiej; kolejna odblurowuje się, gdy poprzednia skończy.
document.querySelectorAll("[data-count-seq]").forEach((block) => {
  const items = [...block.querySelectorAll("li")];
  const show = (b, value) => { b.textContent = (b.dataset.prefix || "") + value + (b.dataset.suffix || ""); };
  if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach((li) => li.classList.add("on")); return; }
  items.forEach((li) => show(li.querySelector("b"), 0));
  const run = (index) => {
    if (index >= items.length) return;
    const li = items[index];
    const b = li.querySelector("b");
    const target = Number(b.dataset.count);
    const duration = 700 + Math.min(700, target * 8);
    li.classList.add("on");
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      show(b, Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) requestAnimationFrame(tick);
      else setTimeout(() => run(index + 1), 250);
    };
    setTimeout(() => requestAnimationFrame(tick), 300);
  };
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) { observer.disconnect(); run(0); }
  }, { threshold: 0.6 });
  observer.observe(block);
});

// Liczby klientów w kartach firm: liczą od zera, gdy karta pojawi się na ekranie.
const formatCount = (value) => (value >= 10000 ? String(value).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0") : String(value));
if (!reduceMotion && "IntersectionObserver" in window) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countObserver.unobserve(entry.target);
      const el = entry.target;
      const target = Number(el.dataset.countup);
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const duration = 1100;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        el.textContent = formatCount(Math.round(target * (1 - Math.pow(1 - t, 3)))) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.9 });
  document.querySelectorAll("[data-countup]").forEach((el) => countObserver.observe(el));
}

// Kalendarz przy dniach programu: kartki poprzednich dni są zrywane po kolei (dzień 2 - jedna, dzień 7 - sześć),
// na końcu zostaje właściwa. W dniu 1 kartka po prostu wjeżdża.
if (!reduceMotion && "IntersectionObserver" in window) {
  const step = 0.17;
  const cals = document.querySelectorAll(".cal[data-day]");
  cals.forEach((cal) => {
    const day = Number(cal.dataset.day);
    const pages = cal.querySelector(".pages");
    if (day === 1) cal.classList.add("first");
    for (let k = day - 1; k >= 1; k -= 1) {
      const sheet = document.createElement("span");
      sheet.className = "sheet";
      sheet.setAttribute("aria-hidden", "true");
      sheet.textContent = k;
      sheet.style.setProperty("--d", ((k - 1) * step).toFixed(2) + "s");
      pages.appendChild(sheet); // kartka 1 dodana jako ostatnia, więc leży na wierzchu
    }
    cal.style.setProperty("--end", (Math.max(0, day - 1) * step + 0.1).toFixed(2) + "s");
  });
  const calObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      calObserver.unobserve(entry.target);
      entry.target.classList.add("go");
    });
  }, { threshold: 1, rootMargin: "0px 0px -12% 0px" });
  cals.forEach((cal) => calObserver.observe(cal));
}
