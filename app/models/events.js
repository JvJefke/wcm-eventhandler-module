const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("node-uuid");

delete mongoose.models.DigEvents;
delete mongoose.modelSchemas.DigEvents;

const DigEventsSchema = new Schema({
	uuid: {
		type: String,
		default: uuid,
		required: true,
	},
	data: {
		contentType: {
			type: String,
			ref: "ContentType",
		},
		events: [{
			name: {
				type: String,
				required: true,
			},
			topic: {
				type: String,
				required: true,
			},
		}],
	},
	meta: {
		label: {
			type: String,
			required: true,
		},
		safeLabel: {
			type: String,
			required: true,
		},
		source: {
			type: String,
			required: true,
			default: "other",
		},
		created: {
			type: Date,
			required: true,
			default: Date.now,
		},
		lastModified: {
			type: Date,
			required: true,
			default: Date.now,
		},
	},
});

// Set the name of the collection
DigEventsSchema.set("collection", "digevents");
module.exports = mongoose.model("DigEvents", DigEventsSchema);
