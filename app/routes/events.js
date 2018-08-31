const path = require("path");
const eventsController = require("../controllers/events");

// Get the configuration of the WCM
const config = require("@wcm/module-helper").getConfig();
// This is a helper middleware function to check if the user is logged in
const ProfileSecurity = require("@wcm/module-helper").profileSecurity;
// This is a helper middleware function to specify which method is used. This will be used in the PermissionsSecurity function.
// There are four methods available: read, create, update and delete.
const MethodSecurity = require("@wcm/module-helper").methodSecurity;
// This is a helper middleware function generator that returns a middleware function that can be injected into route as seen below.
// The function will check if the user has the right permissions to execute this action.
// You need to specify the operation type that needs to be checked against (in this case it is the operation type specified in our package.json file).
const PermissionsSecurity = require("@wcm/module-helper").permissionsSecurity("dig-events");
// Modifies meta object of the body
const Meta = require(path.join(process.cwd(), "app/helpers/meta"));

// Building the baseUrl based on the configuration. Every API call needs to be located after the api/ route
const baseUrl = "/" + config.api.prefix + config.api.version + "dig-events";

module.exports = (app) => {
	app.route(baseUrl).get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, eventsController.read);
	app.route(baseUrl + "/list").get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, eventsController.list);
	app.route(baseUrl + "/:uuid").get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, eventsController.readOne);

	app.route(baseUrl).post(ProfileSecurity, MethodSecurity.create, PermissionsSecurity, Meta, eventsController.create);

	app.route(baseUrl + "/:uuid").put(ProfileSecurity, MethodSecurity.update, PermissionsSecurity, Meta, eventsController.update);

	app.route(baseUrl + "/:uuid").delete(ProfileSecurity, MethodSecurity.delete, PermissionsSecurity, eventsController.remove);

};
