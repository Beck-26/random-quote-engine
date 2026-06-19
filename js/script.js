/**
 * Random Quote Engine
 * By Beckham Kunda
 */

// --- GLOBAL DEVELOPMENT SETTINGS ---
// Modes available: "console" or "screen"
const ERROR_MODE = "screen";

// --- QUOTE API SETTINGS ---

// Use this for final GitHub Pages submission:
const QUOTE_URL = "https://newmanix.com/classes/it102/random_quotes.php";

// Use this only while testing inside Codespace with PHP running:
// const QUOTE_URL = "server.php";


// --- TYPOGRAPHY CONFIGURATION ---
const fonts = ["Qwitcher Grypen", "Tulpen One", "Shadows Into Light"];
let rotating = 0;


// Button click loads a new quote manually
document.getElementById("fetchData").addEventListener("click", getRandomQuote);


// Main function that fetches and displays a quote
function getRandomQuote() {

  clearDisplayErrors();

  fetch(QUOTE_URL)
    .then((res) => {

      if (!res.ok) {
        throw new Error(`HTTP Error Status: ${res.status} (${res.statusText || "Unknown State"})`);
      }

      return res.text();
    })

    .then((data) => {
      const quoteContainer = document.getElementById("result");

      quoteContainer.innerHTML = data;

      // Rotate fonts each time a new quote appears
      quoteContainer.style.fontFamily = fonts[rotating];
      rotating = (rotating + 1) % fonts.length;

      // Restart fade animation every time
      quoteContainer.classList.remove("fade-in");
      void quoteContainer.offsetWidth;
      quoteContainer.classList.add("fade-in");
    })

    .catch((err) => {
      handleRoutingError(err);
    });
}


/**
 * Dispatches errors to the chosen target based on configuration
 */
function handleRoutingError(error) {
  const errorMessage = `⚠️ FETCH FAILURE DETAILS:
-------------------------
Message: ${error.message}
Type: ${error.name}`;

  if (ERROR_MODE === "screen") {
    const errorBox = document.getElementById("error-display");
    errorBox.textContent = errorMessage;
    errorBox.style.display = "block";
  } else {
    console.error("AJAX Routing Error:", error);
  }
}


/**
 * Resets the visual layout state before firing a clean request
 */
function clearDisplayErrors() {
  const errorBox = document.getElementById("error-display");

  if (errorBox) {
    errorBox.textContent = "";
    errorBox.style.display = "none";
  }
}


// --- AUTOMATION ENGINE ---
// Load one quote immediately, then refresh every 5 seconds
document.addEventListener("DOMContentLoaded", () => {
  getRandomQuote();
  setInterval(getRandomQuote, 5000);
});