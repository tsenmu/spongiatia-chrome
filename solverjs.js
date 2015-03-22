window.onload = function() {
var body = document.getElementsByTagName('div')[0];
body.innerHTML = 'lololo';

var port = chrome.runtime.connect({
    name: "panel"
});

port.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
});

port.onMessage.addListener(function(msg) {
  var body = document.getElementsByTagName('body')[0];
  var result = msg;
  var suggestions = result.suggestions;
  for (i = 0; i < suggestions.length; i++) { 
    var suggestion = suggestions[i];
    var div = document.createElement('div');
    var qdiv = document.createElement('div');
    qdiv.style.width = "40%";
    qdiv.style.float = "left";
    var adiv = document.createElement('div');
    adiv.style.width = "40%";
    adiv.style.float = "left";
    var question = suggestion.question.title;
    var qbody = suggestion.question.body_markdown;
    qbody = qbody.replace(/\t/g, '&nbsp;&nbsp;');
    qbody = qbody.replace(/\r\n/g, '<br>');

    var answer;
    if (suggestion.accepted_answer) {
      answer = markdown.toHTML(suggestion.accepted_answer.body_markdown);
    } else {
      answer = markdown.toHTML(suggestion.answers[0].body_markdown);
    }
    answer = answer.replace(/\t/g, '&nbsp;&nbsp;');
    answer = answer.replace(/\r\n/g, '<br>');
    qdiv.innerHTML = 'question: <a href="' + suggestion.question.url +
     '">'+ question + "</a><br>" +  qbody + "<br>";
    adiv.innerHTML = "answer: " + answer + "<hr>";
    adiv.style.backgroundColor = "lightblue";
    div.appendChild(qdiv);
    div.appendChild(adiv);
    body.appendChild(div);
  }
});

};