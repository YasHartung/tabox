console.log("from content.js")

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
     
         if(request.saveSession){

          localStorage.setItem("chromeSaveSession", request.saveSession)
         }
        if(request.restoreSession){
     

          let session = localStorage.getItem("chromeRestoreSession")
          
          if(session){
          
            sendResponse({sessionToRestore: session})
            localStorage.clear()
          }else{
            sendResponse({sessionToRestore: 'just fill'})
          }
          
        }
    });