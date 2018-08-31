"use strict";

angular.module("dig-events_1.0.3")
	.provider("digEventsConfig", [
		"MODULE_ENV_CONFIG",

		function membersConfig(MODULE_ENV_CONFIG) {

			this.API = {
				name: MODULE_ENV_CONFIG.angularModule,
				version: "1.0.3",
				feDirPath: MODULE_ENV_CONFIG.feDirPath,
				assetsDirPath: MODULE_ENV_CONFIG.assetsDirPath,
				cssDirPath: MODULE_ENV_CONFIG.cssDirPath,
			};

			this.API.modulePath = this.API.feDirPath;

			this.$get = function get() {
				return this.API;
			};
		},
	]);
