document.addEventListener('DOMContentLoaded', function() {
    chrome.extension.getBackgroundPage().console.log('foo')
    let saveSessionButton = document.getElementById('saveSession');
    
    saveSessionButton.addEventListener('click', function() {
        chrome.extension.getBackgroundPage().chrome.tabs.query({}, function(tabs){
            chrome.extension.getBackgroundPage().console.log(tabs)
           let urlArr = tabs.map(tab => {
                return tab.url
            })

            urlString = urlArr.join(',')

            chrome.extension.getBackgroundPage().console.log("Array",urlArr)
            chrome.extension.getBackgroundPage().console.log("String", urlString)

            chrome.storage.sync.set({key: urlString})
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
  }, false);