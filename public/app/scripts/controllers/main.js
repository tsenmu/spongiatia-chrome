'use strict';


angular.module('spongiatiaApp')
.controller('MainCtrl', function ($scope, $sanitize, SpongiatiaService, marked) {
  $scope.suggestions = [];
  SpongiatiaService.onMessage.addListener(function(msg) {
    $scope.$apply(function() {
      $scope.suggestions = msg.suggestions;
      $scope.suggestions = _.map($scope.suggestions, function(suggestion) {
        suggestion.question.title = suggestion.question.title;
        suggestion.question.body = _.unescape(marked(suggestion.question.body_markdown));
        suggestion.answer = {};
        suggestion.answer.body = _.unescape(marked(suggestion.accepted_answer.body_markdown));
        return suggestion;
      });
    });
  });
});
