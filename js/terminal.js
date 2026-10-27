"use strict";

const terminalForm = document.getElementById("terminal-form");
const terminalInput = document.getElementById("terminal-input");
const terminalOutput = document.getElementById("terminal-output");

const terminalCommands = {
  help: () => [
    "Available commands:",
    "  help       Show this command list",
    "  whoami     Show the portfolio owner",
    "  about      About this portfolio",
    "  skills     Current learning areas",
    "  projects   Show featured projects",
    "  contact    Show contact setup instructions",
    "  date       Show local date and time",
    "  ls         List demo directories",
    "  pwd        Print simulated path",
    "  echo TEXT  Print text",
    "  clear      Clear the terminal"
  ],
  whoami: () => ["visitor@gb", "Developer: Garry Bakat"],
  about: () => [
    "Software development portfolio and client-side technical demonstrations.",
    "Focus: programming, Linux environments, and software architecture."
  ],
  skills: () => [
    "Technical focus areas:",
    "- C++ and programming fundamentals",
    "- Linux and command-line environments",
    "- HTML, CSS, and JavaScript for web interfaces",
    "- Algorithms and system design"
  ],
  projects: () => [
    "Available demonstration:",
    "PNGID demo: https://png-id-demo-ex.onrender.com/",
    "Browser tools: JSON formatter, insertion sort, colour explorer"
  ],
  contact: () => [
    "Contact information:",
    "Email: bakatgarry.e6@gmail.com"
  ],
  date: () => [new Date().toString()],
  ls: () => ["about/  projects/  playground/  contact/"],
  pwd: () => ["/home/visitor/portfolio"],
  clear: () => {
    terminalOutput.replaceChildren();
    return [];
  }
};

function addTerminalLine(text, className = "") {
  const p = document.createElement("p");
  p.textContent = text;
  if (className) p.className = className;
  terminalOutput.appendChild(p);
}

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const raw = terminalInput.value.trim();
  if (!raw) return;

  addTerminalLine("visitor@gb ~ $ " + raw);
  const spaceIndex = raw.indexOf(" ");
  const command = (spaceIndex === -1 ? raw : raw.slice(0, spaceIndex)).toLowerCase();
  const argument = spaceIndex === -1 ? "" : raw.slice(spaceIndex + 1);

  if (command === "clear") {
    terminalCommands.clear();
  } else if (command === "echo") {
    addTerminalLine(argument);
  } else if (Object.prototype.hasOwnProperty.call(terminalCommands, command)) {
    terminalCommands[command]().forEach((line) => addTerminalLine(line));
  } else {
    addTerminalLine("Unrecognised command: " + command + ". Type help.", "error-line");
  }

  terminalInput.value = "";
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
});

const terminalStyle = document.createElement("style");
terminalStyle.textContent = ".error-line { color: #f08080; }";
document.head.appendChild(terminalStyle);
