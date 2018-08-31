"use strict";

angular.module("dig-events_1.0.3.controllers")
    .controller("digEventsDetailController", [
	"$scope",
	"$controller",
	"constants",

	// Services
	"LabelService",

	// Factories
	"digEventsFactory",

	// Resolves
	"InstanceData",
	"EventsList",
	"ContentTypes",

	function($scope, $controller, constants, LabelService, digEventsFactory, InstanceData, EventsList, ContentTypes) {

				// Referencing the required factory
		$scope._factory = digEventsFactory;
		$scope.ngSortableOptions = constants.ngSortableOptions;

		$scope.data = {
			eventList: EventsList,
			contentTypes: ContentTypes,
			sources: Object.keys(EventsList.toJSON()),
		};

		// Extend the default resource controller
		angular.extend(this, $controller("ResourceController", { $scope: $scope, InstanceData: InstanceData, Languages: [] }));

		// ResourceView configuration
		$scope.context.type = LabelService.getString("Events"); // Set the current type to "Member"


		$scope.newEvent = function newEvent() {
			if (!$scope._instance.data) {
				$scope._instance.data = {};
			}

			if (!$scope._instance.data.events) {
				$scope._instance.data.events = [];
			}

			$scope._instance.data.events.push({ name: "", topic: "" });
		};

		$scope.removeEvent = function(index) {
			$scope._instance.data.events.splice(index, 1);
		};

		// $scope events
		$scope.$on("$destroy", function() {
			$scope._newInstance = undefined;
			$scope._instance = undefined;
		});
	},
]);
