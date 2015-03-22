'use strict';

angular
  .module('spongiatiaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'hc.marked'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../app/views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('SpongiatiaService', function() {
    var port = chrome.runtime.connect({
      name: "panel"
    });
    port.postMessage({
      name: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId
    });
    return port;
  });
