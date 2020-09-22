// let sitesDATA = [];
// const refreshInterval = 3600000;
//
// function checkSitesList() {
//   let sitesList = localStorage.getItem('sites');
//   let refresingTime = localStorage.getItem('refrTime');
//   let refrDelta = new Date().getTime() - refresingTime - 1;
//   if (sitesList !== null && refrDelta < refreshInterval) {
//     console.log('sitesData is in LS');
//     sitesDATA = getSitesFromLS();
//     chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//       var activeTab = tabs[0];
//       chrome.tabs.sendMessage(activeTab.id, {"message": "readySitesList"});
//     });
//
//     buildLinksList(sitesDATA);
//     // setTimeout(checkSitesList, refrDelta)
//   } else {
//     console.log('sitesData is too old or not found');
//     getSitesFromServer();
//     setTimeout(checkSitesList, refreshInterval);
//   }
// }
//
// function getSitesFromLS() {
//   return JSON.parse(localStorage.getItem('sites'));
// }
//
// function getSitesFromServer() {
//   fetch(
//     'http://www.softomate.net/ext/employees/list.json')
//     .then(response => response.json())
//     .then(data => {
//       sitesDATA = data;
//       setTimeLS();
//       setSitesLS(sitesDATA);
//       buildLinksList(sitesDATA);
//     });
// }
//
// function setTimeLS() {
//   let now = new Date().getTime();
//   localStorage.setItem('refrTime', now);
// }
//
// function setSitesLS(sites) {
//   localStorage.setItem('sites', JSON.stringify(sites));
// }
//
// function buildLinksList(data) {
//   let linksList = document.getElementById('sitesList');
//
//   data.forEach(function (item) {
//     let listItem = document.createElement('li');
//     listItem.className = "sites-list__item";
//     listItem.innerHTML = '<a href="https://' + item.domain + '/" class="sites-list__link" target="_blank">' + item.domain + '</a>'
//     linksList.append(listItem);
//   })
// }
//
// checkSitesList();
//
// // Отправить сообщение на активную вкладку
// // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// //   var activeTab = tabs[0];
// //   chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
// // });