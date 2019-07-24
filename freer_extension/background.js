console.log("console log from background page")
chrome.tabs.query({}, function(tabs){
         console.log(tabs)
})

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    
    if (request.openUrlInEditor)
      openUrl(request.openUrlInEditor);
  });