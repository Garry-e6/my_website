"use strict";

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeSymbol = document.getElementById("theme-symbol");
const themeMeta = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  const chosen = theme === "light" ? "light" : "dark";
  root.dataset.theme = chosen;
  themeSymbol.textContent = chosen === "dark" ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    chosen === "dark" ? "Switch to day mode" : "Switch to night mode"
  );
  themeMeta.setAttribute("content", chosen === "dark" ? "#111111" : "#f7f6f3");
  try { localStorage.setItem("gb-portfolio-theme", chosen); } catch (_) {}
}

let savedTheme = "dark";
try { savedTheme = localStorage.getItem("gb-portfolio-theme") || "dark"; } catch (_) {}
setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

document.getElementById("footer-year").textContent = new Date().getFullYear();

const CONTACT_EMAIL = "bakatgarry.e6@gmail.com";
const CONTACT_PHONE = "+675 8382 4711";

async function copyText(value, statusElement, successMessage) {
  try {
    await navigator.clipboard.writeText(value);
    statusElement.textContent = successMessage;
  } catch (_) {
    statusElement.textContent = "Clipboard unavailable. Copy manually: " + value;
  }
}

document.getElementById("copy-email").addEventListener("click", () => {
  copyText(CONTACT_EMAIL, document.getElementById("contact-status"), "Email copied.");
});

document.getElementById("copy-phone").addEventListener("click", () => {
  copyText(CONTACT_PHONE, document.getElementById("contact-status"), "Phone number copied.");
});
