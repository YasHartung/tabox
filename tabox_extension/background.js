console.log("console log from background page")
chrome.tabs.query({}, function(tabs){
         console.log(tabs)
})

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    
    if (request.openUrlInEditor)
      openUrl(request.openUrlInEditor);
  });

  window.setInterval(checkRestoreSesssion, 500);

  function checkRestoreSesssion(){
    
    chrome.tabs.query({url:"http://localhost:3001/*"}, function(tabs) {
      if(tabs[0]){
        chrome.tabs.sendMessage(tabs[0].id, {restoreSession: "Please Restore Session"}, function(response) {
           
            if(response.sessionToRestore.length > 10){

                let restoreArr = response.sessionToRestore.split(',')
              
                
                restoreArr.forEach(url => {
                    chrome.tabs.create({url: url })
                })

            }
        });

  }})
}