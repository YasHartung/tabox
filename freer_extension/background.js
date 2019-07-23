console.log("background console log")
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.extension.getBackgroundPage().console.log('background console log query')
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
  });