const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quote from API
async function getQuote() {
  showLoadingSpinner();
  // can set up own proxyUrl in case this public one doesn't work
  //   const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl = "https://api.quotable.io/random";
  try {
    // const response = await fetch(proxyUrl + apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();
    // innerText is more secure than innerHTML
    if (data.author === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.author;
    }
    // reduce fs for long quotes
    if (data.content.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.content;

    removeLoadingSpinner();
  } catch (error) {
    getQuote(); //if error, will try to get another quote
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuote();
