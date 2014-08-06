(function(){
    var calculatorApp = angular.module('calculatorApp', ['ng-rails-csrf']);
    calculatorApp.controller("CalculatorCtrl", function ($http) {
        this.commandHistory = [];
        this.saveCommand = function(command){
            this.commandHistory.push(command);
        };
        this.processCommand = function(commandToProcess){
          $http.put("http://localhost:3000" + "/api/calculator_update", {command : commandToProcess});
        };
    });
})();