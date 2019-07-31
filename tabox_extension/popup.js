document.addEventListener('DOMContentLoaded', function() {
   
    let saveSessionButton = document.getElementById('saveSession');
    let restoreSessionButton = document.getElementById('restoreSession')
    
    saveSessionButton.addEventListener('click', function() {
        chrome.extension.getBackgroundPage().console.log("clicked clicked save")
        chrome.extension.getBackgroundPage().chrome.tabs.query({}, function(tabs){
            
            let urlArr = tabs.map(tab => {
                return tab.url
            })
            
            urlString = urlArr.join(',')
            
            
          

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {saveSession: urlString}, function(response) {
                  console.log(response.farewell);
                });
              });
   })
        
        // chrome.extension.getBackgroundPage().console.log('clicked save session')
        //     chrome.tabs.query({}, function(tabs){
        //         chrome.extension.getBackgroundPage().console.log('chrome tabs query')
        //         chrome.extension.getBackgroundPage().console.log(tabs)
        //     })
    //   chrome.tabs.getSelected(null, function(tab) {
    //     d = document;
  
    //     var f = d.createElement('form');
    //     f.action = 'http://gtmetrix.com/analyze.html?bm';
    //     f.method = 'post';
    //     var i = d.createElement('input');
    //     i.type = 'hidden';
    //     i.name = 'url';
    //     i.value = tab.url;
    //     f.appendChild(i);
    //     d.body.appendChild(f);
    //     f.submit();
    //   });
    }, false);

    restoreSessionButton.addEventListener('click', function(){
        chrome.extension.getBackgroundPage().console.log("clicked restore")

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {restoreSession: "Please Restore Session"}, function(response) {
                chrome.extension.getBackgroundPage().console.log(response);
                
                let restoreArr = response.sessionToRestore.split(',')
                chrome.extension.getBackgroundPage().console.log(restoreArr);

                restoreArr.forEach(url => {
                    chrome.tabs.create({url: url })
                })
            });
        })
    })
  

  window.setInterval(checkRestoreSesssion, 500);

  function checkRestoreSesssion(){
    chrome.extension.getBackgroundPage().console.log("set Interval`");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {restoreSession: "Please Restore Session"}, function(response) {
            chrome.extension.getBackgroundPage().console.log(response);
            if(response.sessionToRestore){

                let restoreArr = response.sessionToRestore.split(',')
                chrome.extension.getBackgroundPage().console.log(restoreArr);
                
                restoreArr.forEach(url => {
                    chrome.tabs.create({url: url })
                })

            }
            
        });

  })
}
}, false);