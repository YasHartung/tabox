document.addEventListener('DOMContentLoaded', function() {
   
    let saveSessionButton = document.getElementById('saveSession');
   
    
    saveSessionButton.addEventListener('click', function() {
        chrome.extension.getBackgroundPage().console.log("clicked clicked save")
        chrome.extension.getBackgroundPage().chrome.tabs.query({}, function(tabs){
            //filter out Tabox tabs that are open
            let filteredTabs = tabs.filter( tab => !tab.url.includes("http://localhost:3001"))
            //get only URL out of the tab objects
            let urlArr = filteredTabs.map(tab => {
                return tab.url
            })
            //change the Array to string to allow for more efficient storing of the session
            urlString = urlArr.join(',')
            
            
          

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {saveSession: urlString}, function(response) {
                  console.log(response);
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



  window.setInterval(checkRestoreSesssion, 500);

  function checkRestoreSesssion(){
    chrome.extension.getBackgroundPage().console.log("set Interval`");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {restoreSession: "Please Restore Session"}, function(response) {
            chrome.extension.getBackgroundPage().console.log(response);
            if(response.sessionToRestore.length>10){

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