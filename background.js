let sitesDATA = [];
const refreshInterval = 3600000;
checkRelevanceData();

function checkRelevanceData() {
  let sitesList = localStorage.getItem('sites');
  let refresingTime = localStorage.getItem('refrTime');
  let refrDelta = new Date().getTime() - refresingTime;
  if (sitesList !== null && refrDelta < refreshInterval - 1) {
    sitesDATA = getSitesFromLS();
  } else {
    refreshData();
  }
}

async function refreshData() {
  sitesDATA = await getSitesFromServer();
  setTimeLS();
  setTimeout(refreshData, refreshInterval)
}

function getSitesFromServer() {
  fetch(
    'http://www.softomate.net/ext/employees/list.json')
    .then(response => response.json())
    .then(data => {
      setSitesLS(data);
      return data;
    });
}

function getSitesFromLS() {
  return JSON.parse(localStorage.getItem('sites'));
}

function setSitesLS(sites) {
  localStorage.setItem('sites', JSON.stringify(sites));
}

function setTimeLS() {
  let now = new Date().getTime();
  localStorage.setItem('refrTime', now);
}

async function checkHost(host, array) {
  let text = await isCoincidence();
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      "message": "Show_message",
      "message_text": text
    });
  });
}

function isCoincidence(host, array) {
  array.forEach(function(item){
    if (host.includes(item.domain)) {return item.message}
  })
}


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script: " + sender.tab.url :
      "from the extension - " + request.message);
    if (request.message == "Show_message?") {
      sendResponse({message: "I'll say later"})
      checkHost(request.host, sitesDATA);
    } else if (request.message == "give_me_sites") {
      sendResponse({data: sitesDATA})
    }
    return true;
  });