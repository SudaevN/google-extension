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

function comprareHost(host, arrayItem) {
  return host.includes(arrayItem);
}


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script: " + sender.tab.url :
      "from the extension - " + request.message);
    if (request.message == "Show_message?") {
      let value = true;
      sendResponse({message: value});
    } else if (request.message == "give_me_sites") {
      sendResponse({data: sitesDATA});
    }
    return true;
  });