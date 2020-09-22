let sitesDATA = [];
let refreshInterval = 3600000;

checkSitesList();

function checkSitesList() {
  let sitesList = localStorage.getItem('sites');
  let refresingTime = localStorage.getItem('refrTime');
  let refrDelta = new Date().getTime() - refresingTime - 1;
  if (sitesList !== null && refrDelta < refreshInterval) {
    console.log('sitesData is in LS');
    sitesDATA = getSitesFromLS();
    buildLinksList(sitesDATA);
    checkDomain();
    setTimeout(checkSitesList, refrDelta)
  } else {
    console.log('sitesData is too old or not found');
    getSitesFromServer();
    setTimeout(checkSitesList, refreshInterval);
  }
}

function getSitesFromLS() {
  return JSON.parse(localStorage.getItem('sites'));
}

function getSitesFromServer() {
  fetch(
    'http://www.softomate.net/ext/employees/list.json')
    .then(response => response.json())
    .then(data => {
      sitesDATA = data;
      setTimeLS();
      setSitesLS(sitesDATA);
      buildLinksList(sitesDATA);
      checkDomain();
    });
}

function setTimeLS() {
  let now = new Date().getTime();
  localStorage.setItem('refrTime', now);
}

function setSitesLS(sites) {
  localStorage.setItem('sites', JSON.stringify(sites));
}

function checkDomain() {
  let hostname = window.location.hostname;
  console.log("current domain - " + hostname);
  sitesDATA.forEach(function (item) {
    hostname.includes(item.domain) ? console.log(item.message) : console.log(item.domain + ' - No match')
  })
}

function buildLinksList(data) {
  let linksList = document.getElementById('sitesList');

  data.forEach(function (item) {
    let listItem = document.createElement('li');
    listItem.className = "sites-list__item";
    listItem.innerHTML = '<a href="https://' + item.domain + '/" class="sites-list__link" target="_blank">' + item.domain + '</a>'
    linksList.append(listItem);
  })
}

