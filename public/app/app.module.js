"use strict";

angular.module("dig-events_1.0.3.directives", []);
angular.module("dig-events_1.0.3.factories", []);
angular.module("dig-events_1.0.3.services", ["dig-events_1.0.3.factories"]);
angular.module("dig-events_1.0.3.controllers", ["dig-events_1.0.3.services"]);

angular.module("dig-events_1.0.3", [

	"pelorus.services",

	"dig-events_1.0.3.directives",
	"dig-events_1.0.3.factories",
	"dig-events_1.0.3.services",
	"dig-events_1.0.3.controllers",

])
.run([function() {
	console.log("Members module is available!"); // eslint-disable-line no-console
}]);
