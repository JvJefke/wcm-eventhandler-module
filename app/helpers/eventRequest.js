const Q = require("q");
const _ = require("lodash");
const request = require("request");

const variablesHelper = require("../helpers/variables");

module.exports = (method, path, body) => {
	const d = Q.defer();

	variablesHelper.get().then((variables) => {
		const apiDomain = _.get(variables, "eventHandler.variables.apiDomain", "");
		const namespace = _.get(variables, "eventHandler.variables.namespace", "");

		const reqOptions = {
			url: apiDomain + (apiDomain.endsWith("/") ? "" : "/") + namespace + "/" + path,
			method: method,
			headers: {
				"owner-key": _.get(variables, "eventHandler.variables.ownerKey"),
				"apikey": _.get(variables, "eventHandler.variables.apikey"),
			},
		};

		if (body) {
			Object.assign(reqOptions, {
				body: body,
				json: true,
			});
		}

		request(reqOptions, (error, response, b) => {
			if (error || !response || response.statusCode >= 400) {
				return d.reject(error || b);
			}

			return d.resolve(b);
		});
	})
        .catch(d.reject);

	return d.promise;
};
