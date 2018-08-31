"use strict";

angular.module("dig-events_1.0.3.controllers")
    .controller("digEventsOverviewController", [

	"$scope",
	"$controller",
	"appModules",
	"configuration",
	"constants",

        // services
	"SessionService",
	"LabelService",

        // Resolves
	"ListData",

	function($scope, $controller, appModules, configuration, constants, SessionService, LabelService, ListData) {

		$scope.data = ListData;

		$scope.tableConfig = {
			pagination: constants.pagination,
			searchField: {
				enabled: true,
				placeholder: LabelService.getString("Search"),
				style: {
					override: true,
					className: "c-input-text c-input-text--sm u-width-4-6 fr",
				},
			},
			columns: [{
				columnName: LabelService.getString("Name"),
				key: "meta.label",
				sortable: true,
			}, {
				columnName: LabelService.getString("Last edit"),
				key: "meta.lastModified",
				mode: "timeAgo",
				defaultSort: true,
				sortable: true,
			}, {
				columnName: LabelService.getString("Actions"),
				template: '<a ui-sref="^.edit({uuid:i.uuid})">' + LabelService.getString("Edit") + "</a>",
			}],
		};
	},
]);
