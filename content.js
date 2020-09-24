let hostName = window.location.hostname;

popupShowCounter = getDataFromSS('popupShowCounter');
popupCloseCounter = getDataFromSS('popupCloseCounter');

sendQuery();

function getDataFromSS(key) {
  return sessionStorage.getItem(key) !== null ? sessionStorage.getItem(key) : 0;
}

function sendQuery() {
  if (popupShowCounter < 3 && popupCloseCounter < 1) {
    chrome.runtime.sendMessage({
      message: "Show_message?",
      host: hostName
    }, function (response) {
      console.log(response.message)
    })
  }
}

function showPopup() {
  console.log("Show message");
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "Show_popup" ) {
      console.log(request.message_text);
    }
  }
);