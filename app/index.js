const hooksController = require("./controllers/hooks");
const variablesHelper = require("./helpers/variables");
const routes = require("./routes");

module.exports = (app, hooks, moduleInfo) => {
	// Set modules info received from the module system
	variablesHelper.setPackageInfo(moduleInfo);
	// Handle hooks
	hooksController(hooks);
	// Initiate listening to events
	require("./controllers/listener");
	// Setup routes
	routes(app);
};
