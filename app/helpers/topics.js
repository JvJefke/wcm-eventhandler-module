const _ = require("lodash");
const Q = require("q");

const config = require("config")();
const EventsModel = require("../models/events");
const eventRequestHelper = require("./eventRequest");
const listenerController = require("../controllers/listener");

const create = module.exports.create = (event) => {
    const events = _.get(event, "data.events", []);

    // check if topic already exists in eventhandler
    const promises = _.map(events, (e) => eventRequestHelper("GET", "topics/" + config.name + "_" + e.topic)
		.then((eventAlreadyExists) => eventAlreadyExists ? null : eventRequestHelper("POST", "topics", {
            name: config.name + "_" + e.topic,
        }))
        .catch((err) => {
            if (JSON.parse(err).code !== "NotFoundError") {
                throw err;
            }

            return eventRequestHelper("POST", "topics", {
                name: config.name + "_" + e.topic,
            })
        })
	);

	return Q.all(promises)
		.then(() => {
			listenerController.reloadConfig();
			return event;
		});
};

const remove = module.exports.remove = (event) => {
	const events = _.get(event, "data.events", []);
	const promises = _.map(events, (e) => EventsModel.findOne({ "data.events.topic": e.topic })
		.lean()
		.then((eventStillExists) => eventStillExists ? null : eventRequestHelper("DELETE", "topics/" + config.name + "_" + e.topic))
	);

	return Q.all(promises)
		.then(() => {
			listenerController.reloadConfig();
			return event;
		});
};

module.exports.update = (oldTopic, newTopic) => remove(oldTopic)
	.then(
		() => create(newTopic),
		() => create(newTopic)
	)
	.then(() => {
		listenerController.reloadConfig();
		return newTopic;
	});
