const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
	name:{
		type: String,
		required: [true, "Name of the course is required!"]
	},
	description:{
		type: String,
		required: [true, "Description of the course is required!"]
	},
	price:{
		type: Number,
		required: [true, "Price of the course is required!"]
	},
	isActive:{
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		// The "new Date()" expression instantiates a new "date" that stores the current date and time whenever a course is created in our database.
		default: new Date();
	},
	enrolles: [
			{
				userId: {
					type: String,
					required: [true, "UserId is required!"]
				},
				enrolledOn:{
					type: Date,
					default: new Date();
				}
			}
		]
})


module.exports = mongoose.models("Course", coursesSchema);