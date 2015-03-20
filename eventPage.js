var connections = {};

var UIport = undefined;

chrome.runtime.onConnect.addListener(function (port) {
    UIport = port;
    console.log('connected' + port.name);
    var extensionListener = function (message, sender, sendResponse) {

        // The original connection event doesn't include the tab ID of the
        // DevTools page, so we need to send it explicitly.
        if (message.name == "init") {
          connections[message.tabId] = port;
          return;
        }
      }
});

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function(msg) {
    // Messages from content scripts should have sender.tab set
    console.log(msg.err);
    UIport.postMessage(({err: msg.err}))
    return true;
});