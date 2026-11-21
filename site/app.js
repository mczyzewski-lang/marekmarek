// Zapis na Sprint: 7x Impuls.
//
// SIGNUP_ENDPOINT: adres, na który formularz wysyła e-mail (POST, JSON: { email, source }).
// Dopóki jest pusty, formularz NIE zapisuje nikogo — tylko przenosi na stronę po zapisie (tryb podglądu).
const SIGNUP_ENDPOINT = "";
const THANK_YOU_URL = "/dziekuje/";

document.querySelectorAll("form.signup").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const error = form.parentElement.querySelector(".form-error");
    const email = form.querySelector('input[type="email"]').value.trim();
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
        body: JSON.stringify({ email, source: form.dataset.source || "landing" }),
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
