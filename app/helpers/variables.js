const Q = require("q");

const VariableHelper = require("@wcm/module-helper").variables;
const packageConfig = require("../../package.json");

let packageInfo = null;

const setPackageInfo = module.exports.setPackageInfo = (info) => {
	packageInfo = info || packageInfo;
};

module.exports.getPackageInfo = () => {
	return packageInfo;
};

module.exports.get = (info) => {
	setPackageInfo(info);

	if (packageInfo === null) {
		return Q.reject("No packageInfo available", packageConfig.name);
	}

	return VariableHelper.getAll(packageInfo.name, packageInfo.version);
};

