"use strict";

const jsonInput = document.getElementById("json-input");
const jsonOutput = document.getElementById("json-output");
const jsonStatus = document.getElementById("json-status");

function processJSON(minify) {
  try {
    const value = JSON.parse(jsonInput.value);
    jsonOutput.textContent = JSON.stringify(value, null, minify ? 0 : 2);
    jsonStatus.textContent = "Valid JSON.";
    jsonStatus.style.color = "var(--green)";
  } catch (error) {
    jsonOutput.textContent = "Unable to format invalid JSON.";
    jsonStatus.textContent = "Invalid JSON: " + error.message;
    jsonStatus.style.color = "var(--accent)";
  }
}

document.getElementById("format-json").addEventListener("click", () => processJSON(false));
document.getElementById("minify-json").addEventListener("click", () => processJSON(true));

const sortBars = document.getElementById("sort-bars");
const sortStatus = document.getElementById("sort-status");
let sortValues = [];
let sorting = false;

function createNumbers() {
  if (sorting) return;
  sortValues = Array.from({ length: 18 }, () => Math.floor(Math.random() * 90) + 10);
  renderBars();
  sortStatus.textContent = "Ready.";
}

function renderBars(activeIndex = -1, sortedThrough = -1) {
  sortBars.replaceChildren();
  sortValues.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.className = "sort-bar";
    bar.style.height = value + "%";
    bar.title = String(value);
    bar.setAttribute("aria-label", String(value));
    if (index <= sortedThrough) bar.classList.add("sorted");
    if (index === activeIndex) bar.style.background = "var(--purple)";
    sortBars.appendChild(bar);
  });
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

document.getElementById("shuffle-sort").addEventListener("click", createNumbers);

document.getElementById("run-sort").addEventListener("click", async () => {
  if (sorting) return;
  sorting = true;
  document.getElementById("run-sort").disabled = true;
  document.getElementById("shuffle-sort").disabled = true;
  sortStatus.textContent = "Sorting...";

  for (let i = 1; i < sortValues.length; i++) {
    const current = sortValues[i];
    let j = i - 1;

    while (j >= 0 && sortValues[j] > current) {
      sortValues[j + 1] = sortValues[j];
      j--;
      sortValues[j + 1] = current;
      renderBars(j + 1, i - 1);
      await wait(65);
    }

    sortValues[j + 1] = current;
    renderBars(i, i - 1);
    await wait(65);
  }

  renderBars(-1, sortValues.length - 1);
  sortStatus.textContent = "Sorted successfully.";
  sorting = false;
  document.getElementById("run-sort").disabled = false;
  document.getElementById("shuffle-sort").disabled = false;
});

const colourPicker = document.getElementById("colour-picker");
const colourPreview = document.getElementById("colour-preview");
const colourHex = document.getElementById("colour-hex");
const colourStatus = document.getElementById("colour-status");

function updateColour() {
  const value = colourPicker.value.toUpperCase();
  colourPreview.style.background = value;
  colourHex.textContent = value;
  colourStatus.textContent = "";
}

colourPicker.addEventListener("input", updateColour);
updateColour();

document.getElementById("copy-colour").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(colourHex.textContent);
    colourStatus.textContent = "Copied " + colourHex.textContent;
  } catch (_) {
    colourStatus.textContent = "Clipboard unavailable. Select the HEX value to copy it.";
  }
});

createNumbers();
processJSON(false);
