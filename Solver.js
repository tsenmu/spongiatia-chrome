console.log("Hello Wooooooorld!");

//--------------------------------------
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.onreadystatechange = function() {
    // if (this.readyState == 'complete') { callFunctionFromScript(); }
}
script.innerHTML = 'window.onerror = function (message, filename, lineno) {window.postMessage({ type: "FROM_PAGE", text: message }, "*");return true;};';
head.appendChild(script);

//-----------------------------
//var port = chrome.runtime.connect({name: "init"});

//port.postMessage({joke: "Knock knock"});
//port.onMessage.addListener(function(msg) {
//  if (msg.question == "Who's there?")
//    port.postMessage({answer: "Madame"});
//  else if (msg.question == "Madame who?")
//    port.postMessage({answer: "Madame... Bovary"});
//});

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    //port.postMessage({msg: event.data.text});
//var port = chrome.runtime.connect({name: "knockknock"});
    //chrome.runtime.sendMessage({err: event.data.text});
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        chrome.runtime.sendMessage({err: xmlhttp.responseText});
    }
    }
    xmlhttp.open("GET",'http://www.tsenmu.com:3000/api/search?error_message=' + event.data.text,true);
    xmlhttp.send();
    console.log('sent to the server!')

  }
}, false);


