console.log("Hello Wooooooorld!");

//--------------------------------------
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
var API_PREFIX = 'http://api.stackexchange.com/2.2';
script.type = 'text/javascript';
script.innerHTML = 'window.onerror = function (message, filename, lineno) {window.postMessage({ type: "FROM_PAGE", text: message }, "*");return true;};';
head.appendChild(script);

function searchID(query, callback) {
  var searchUri = API_PREFIX + '/search/advanced?' + 
  '&site=stackoverflow' + 
  '&order=desc' +
  '&sort=relevance' +
  '&accepted=True' +
  '&pagesize=10' +
  '&filter=!--KJA8bUDfsI' + 
  '&q=' + query;
  var xmlhttp = new XMLHttpRequest();
  var response = {};
  response.suggestions = [];
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //console.log(xmlhttp.responseText);
      // After successfuly got all the question ids.
      var obj = JSON.parse(xmlhttp.responseText);
      var qIds = "";
      for (i = 0; i < obj.items.length; ++i) {
        if (i != 0) {
          qIds = qIds + ";" + obj.items[i].question_id;
        } else {
          qIds = qIds + obj.items[i].question_id;
        }
      }
      var questionUri = API_PREFIX + '/questions/' + qIds +
      '?' +'&site=stackoverflow' + '&sort=votes' +'&filter=!4(Yr(zu(6cPEMGE59';
      var qxmlhttp = new XMLHttpRequest();
      qxmlhttp.onreadystatechange = function() {
        if (qxmlhttp.readyState == 4 && qxmlhttp.status == 200) {
          // After successfully got all the question contents.
          var aIds = "";
          //console.log(qxmlhttp.responseText);
          console.log("Questions got!");
          var qobj = JSON.parse(qxmlhttp.responseText);
          for (i = 0; i < qobj.items.length; ++i) {
            var suggestion = {};
            suggestion.question = {};
            suggestion.question.title = qobj.items[i].title;
            suggestion.question.body_markdown = qobj.items[i].body_markdown;
            suggestion.question.url = qobj.items[i].link;
            response.suggestions.push(suggestion);
            if (i == 0) {
              aIds = aIds + qobj.items[i].accepted_answer_id;
            } else {
              aIds = aIds + ";" + qobj.items[i].accepted_answer_id;
            }
          }
          var answerUri = API_PREFIX + '/answers/' + aIds + '?' +
          '&site=stackoverflow' + '&filter=!--pn9shfL_dA';
          var axmlhttp = new XMLHttpRequest();
          axmlhttp.onreadystatechange = function() {
            if (axmlhttp.readyState == 4 && axmlhttp.status == 200) {
              console.log("Answer got!");
              var aobj = JSON.parse(axmlhttp.responseText);
              for (i = 0; i < aobj.items.length; ++i) {
                var ans = {};
                ans.body_markdown = aobj.items[i].body_markdown;
                response.suggestions[i].accepted_answer = ans;
              }
              chrome.runtime.sendMessage(response);
              console.log("sent!");
            }
          };
          axmlhttp.open("GET", answerUri, true);
          axmlhttp.send();
        } 
      };
      qxmlhttp.open("GET", questionUri, true);
      qxmlhttp.send(); 
    }
  };
  xmlhttp.open("GET", searchUri, true);
  xmlhttp.send();
}

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    searchID(event.data.text);
//    var xmlhttp = new XMLHttpRequest();
//    xmlhttp.onreadystatechange=function() {
//      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
//        chrome.runtime.sendMessage({err: xmlhttp.responseText});
//      }
//    }
//    var searchUri = 
//    xmlhttp.open("GET",'http://www.tsenmu.com:3000/api/search?error_message=' + event.data.text,true);
//    xmlhttp.send();
//    console.log('sent to the server!')


  }
}, false);


