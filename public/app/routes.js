"use strict";

angular.module("dig-events_1.0.3")
    .config([

	"$stateProvider",
	"digEventsConfigProvider",

	function($stateProvider, digEventsConfigProvider) {

		var moduleFolder = digEventsConfigProvider.API.modulePath;

		$stateProvider

			.state("pelorus.dig-events.index", {
				url: "",
				access: {
					requiresLogin: true,
				},
				resolve: {
					ListData: ["digEventsFactory", function(digEventsFactory) {
						return digEventsFactory.query().$promise;
					}],
				},
				ncyBreadcrumb: {
					label: "{{breadcrumb}}",
				},
				views: {
					"": {
						templateUrl: moduleFolder + "views/overview.html",
						controller: "digEventsOverviewController",
					},
				},
			})

			.state("pelorus.dig-events.edit", {
				url: "/{uuid}",
				access: {
					requiresLogin: true,
				},
				resolve: {
					InstanceData: ["digEventsFactory", "$stateParams", function(digEventsFactory, $stateParams) {
						if ($stateParams.uuid && $stateParams.uuid !== "new") {
							return digEventsFactory.get({ id: $stateParams.uuid }).$promise;
						} else {
							return {};
						}
					}],
					EventsList: ["digEventsFactory", function(digEventsFactory) {
						return digEventsFactory.get({ listController: "list" }).$promise;
					}],
					ContentTypes: ["$stateParams", "contentTypeFactory", function($stateParams, contentTypeFactory) {
						return contentTypeFactory.get({ limit: -1 }).$promise;
					}],
				},
				ncyBreadcrumb: {
					label: "{{breadcrumb}}",
				},
				views: {
					"": {
						templateUrl: "/app/core/resource/views/resource.html",
						controller: "digEventsDetailController",
					},
					"form@pelorus.dig-events.edit": {
						templateUrl: moduleFolder + "views/detail.html",
					},
				},
			});
	},

]);
