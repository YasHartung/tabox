console.log("from content.js")

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                   request);
                   localStorage.setItem("chrome_session_save", request.session)
    });