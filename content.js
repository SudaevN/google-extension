// Listen messages
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "readySitesList" ) {
      console.log('Kuku');
    }
  }
);


let closeCount = null;

function getCloseCounter() {
  closeCount = sessionStorage.getItem('closeCounterNum') !== null ? sessionStorage.getItem('closeCounterNum') : 0;
}

function setCounter(number) {
  sessionStorage.setItem('closeCounterNum', number)
}

function showCounter() {
  console.log(closeCount);
}

getCloseCounter();
showCounter();

function buildPopup() {
  let popup = document.createElement('div');
  popup.className = "sitesCheckerPopup";
  popup.innerHTML = ""
}

function checkDomain() {
  let hostname = window.location.hostname;
  console.log("current domain - " + hostname);
  sitesDATA.forEach(function (item) {
    hostname.includes(item.domain) ? console.log(item.message) : console.log(item.domain + ' - No match')
  })
}