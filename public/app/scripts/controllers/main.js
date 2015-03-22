'use strict';


angular.module('spongiatiaApp')
  .controller('MainCtrl', function ($scope, $sanitize, SpongiatiaService, marked) {
    $scope.suggestions = [];
    SpongiatiaService.onMessage.addListener(function(msg) {
      $scope.$apply(function() {
          $scope.suggestions = msg.suggestions;
          alert($scope.suggestions[0].question.body_markdown);
           $scope.suggestions = _.map($scope.suggestions, function(suggestion) {
             suggestion.question.body = marked($sanitize(suggestion.question.body_markdown));
             suggestion.answer.body = marked($sanitize(suggestion.accepted_answer.body_markdown));
             return suggestion;
           });
      });
    });
  });
