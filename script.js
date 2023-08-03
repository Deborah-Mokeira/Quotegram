const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const instagramBtn = document.getElementById('instagram');
const whatsappBtn = document.getElementById('whatsapp');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

function showLoadingSpinner(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
  quoteContainer.hidden =false;
  loader.hidden = true;
}

// Show New Quote
function newQuote(){
  showLoadingSpinner;
    // Pick a Random Quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace with 'Unknown'
    if (!quote.author) {
      authorText.textContent = 'Unknown';
    } else {
    authorText.textContent = quote.author;
    }

    // Check Quote length to determine styling
    if (quote.text.length > 100) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote') ;
    }
    // Set Quote, Hide Loader
 quoteText.textContent = quote.text;
 removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes(){
  showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const response = await fetch (apiUrl);
      apiQuotes = await response.json();
      newQuote();
    }catch(error){
      //Handle any errors that occur during the fetch
      console.log('Error fetching quote:', error);
      quoteText.innerText = 'Failed to fetch a quote.';
      authorText.innerText = '';
    }
}
// Tweet a Quote
function tweetQuote(){
  const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
 getQuotes();


