/**
 * Created by vineethbs on 05/08/14.
 */
describe("Calculator", function () {
    var baseUrl = "http://localhost:3000";
    var CalculatorCtrl;
    beforeEach(module('calculatorApp'));
    beforeEach(inject(function ($controller, $httpBackend, $http) {
        httpBackend = $httpBackend;
        httpBackend.when("PUT", baseUrl + "/api/calculator_update").respond({"state": 5.0});
        CalculatorCtrl = $controller("CalculatorCtrl",{
            $http: $http
        });
    }));

    describe("CalculatorCtrl", function () {

        it("has 0 commands in history when page loads ", function () {
            expect(CalculatorCtrl.commandHistory.length).toBe(0)
        });

        it("adds command to command history when button is clicked", function () {
            var commandOne = "add 5";
            var commandTwo = "something";

            initialCommandHistoryLenght = CalculatorCtrl.commandHistory.length;

            CalculatorCtrl.saveCommand(commandOne);
            CalculatorCtrl.saveCommand(commandTwo);

            finalCommandHistoryLength = CalculatorCtrl.commandHistory.length;

            expect(finalCommandHistoryLength).toBe(initialCommandHistoryLenght + 2);
        });

        it("has to send a put request to the server when the button is clicked", function(){
            var command = {"command" : "add 5"};
            httpBackend.expectPUT(baseUrl + '/api/calculator_update');
            CalculatorCtrl.processCommand(command);
            httpBackend.flush();
        });

    });
});