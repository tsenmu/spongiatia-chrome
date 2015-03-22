window.onerror = function (message, filename, lineno) {
    // Do some centralized error reporting here, for example, by POSTing
    // the error message, filename, and line number to a collection
    // server for later processing.
    alert(message);
    window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
    return true;
};

 //chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    //console.log(response.farewell);
//});