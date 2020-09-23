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
      if (response.message) {
        showPopup();
      } else {
        console.log('no matches found');
      }
    });
  }
}

function showPopup() {
  console.log("Show message");
}