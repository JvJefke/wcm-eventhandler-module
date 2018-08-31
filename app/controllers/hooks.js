const eventListener = require("./listener");

const beforeRemove = () => {
	eventListener.removeListeners();
};

const beforeDisable = () => {
	eventListener.removeListeners();
};

const onEnabled = () => {
	eventListener.reinitialize();
};

module.exports = (hooks) => Object.assign(hooks, {
	beforeRemove: beforeRemove,
	beforeDisable: beforeDisable,
	onEnabled: onEnabled,
});
