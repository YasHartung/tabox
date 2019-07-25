console.log("from content.js")

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log("request got to content", request)
      if(request.saveSession){

        console.log("request", request)
        console.log("sender", sender)
        console.log("sendResponse", sendResponse)
        
        console.log(sender.tab ?
          "from a content script:" + sender.tab.url :
          request);
          localStorage.setItem("chromeSaveSession", request.saveSession)
        }
        if(request.restoreSession){
          
          let session = localStorage.getItem("chromeRestoreSession")
          console.log("session from restore session content", session)
          sendResponse({sessionToRestore: session})
        }
    });