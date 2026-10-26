import { useEffect, useState } from "react";

const languages = [
  { code: "es", label: "Español", locale: "es" },
  { code: "en", label: "English", locale: "en" },
  { code: "zh", label: "中文", locale: "zh-CN" },
] as const;

type Language = (typeof languages)[number]["code"];

export default function LanguageToggle() {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    const initialLanguage = languages.some(({ code }) => code === savedLanguage)
      ? (savedLanguage as Language)
      : "es";
    setLanguage(initialLanguage);
    applyLanguage(initialLanguage);
  }, []);

  function applyLanguage(nextLanguage: Language) {
    document.documentElement.lang = languages.find(({ code }) => code === nextLanguage)!.locale;
    document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((element) => {
      const value = element.dataset.i18n?.split(".").reduce<unknown>((value, key) => {
        return value && typeof value === "object" ? (value as Record<string, unknown>)[key] : undefined;
      }, translations[nextLanguage]);
      if (typeof value === "string") element.textContent = value;
    });
    document.querySelectorAll<HTMLElement>("[data-i18n-attr]").forEach((element) => {
      const [attribute, ...path] = (element.dataset.i18nAttr ?? "").split(":");
      const value = path.join(":").split(".").reduce<unknown>((current, key) => {
        return current && typeof current === "object" ? (current as Record<string, unknown>)[key] : undefined;
      }, translations[nextLanguage]);
      if (attribute && typeof value === "string") element.setAttribute(attribute, value);
    });
    window.localStorage.setItem("portfolio-language", nextLanguage);
  }

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    applyLanguage(nextLanguage);
  }

  return (
    <div aria-label="Choose language" className="fixed right-[7.5rem] top-4 z-50 flex gap-1 rounded-lg border border-neutral-300 bg-white/90 p-1 text-sm shadow-sm dark:border-neutral-700 dark:bg-neutral-900/90 no-print">
      {languages.map(({ code, label }) => (
        <button
          aria-pressed={language === code}
          className={`rounded px-2 py-1 transition-colors ${language === code ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"}`}
          key={code}
          onClick={() => changeLanguage(code)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

import es from "../translations/es.json";
import en from "../translations/en.json";
import zh from "../translations/zh.json";

const translations = { es, en, zh };
