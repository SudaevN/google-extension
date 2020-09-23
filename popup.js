chrome.runtime.sendMessage({message: "give_me_sites"}, function(response) {
  buildLinksList(response.data)
});

function buildLinksList(data) {
  let linksList = document.getElementById('sitesList');
  data.forEach(function (item) {
    let listItem = document.createElement('li');
    listItem.className = "sites-list__item";
    listItem.innerHTML = '<a href="https://' + item.domain + '/" class="sites-list__link" target="_blank">' + item.domain + '</a>'
    linksList.append(listItem);
  })
}