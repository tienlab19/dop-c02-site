(() => {
  const supported = ["en", "vi"];
  let preferred = "en";
  try { preferred = localStorage.getItem("dop-language") || "en"; } catch {}
  const requested = new URLSearchParams(location.search).get("lang");
  const setLanguage = (language) => {
    const locale = supported.includes(language) ? language : "en";
    document.documentElement.lang = locale;
    document.querySelectorAll("[data-en][data-vi]").forEach((element) => {
      element.textContent = element.dataset[locale];
    });
    document.querySelectorAll("[data-image]").forEach((image) => {
      image.src = `assets/${image.dataset.image}-${locale}.webp`;
      image.alt = image.dataset[`alt${locale === "en" ? "En" : "Vi"}`];
    });
    document.querySelectorAll("[data-language]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.language === locale));
    });
    document.querySelectorAll("a[data-page]").forEach((link) => {
      link.href = `${link.dataset.page}?lang=${locale}`;
    });
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = description.dataset[locale];
    try { localStorage.setItem("dop-language", locale); } catch {}
  };
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.language);
      const address = new URL(location.href);
      address.searchParams.set("lang", button.dataset.language);
      history.replaceState(null, "", address);
    });
  });
  setLanguage(requested || preferred);
})();
