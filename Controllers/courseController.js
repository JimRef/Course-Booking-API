const Course = require("../Models/coursesSchema.js");
const auth = require("../auth.js");
// Create a new course
/*
	Steps:
	1. Create a new Course object using the mongoose model and the information from the request body and the id from the header
	2. Save the new User to the database
*/

module.exports.addCourse = (request, response) =>{
	const userData = auth.decode(request.headers.authorization);
		
	if (userData.isAdmin === true) {

	let input = request.body

	let newCourse = new Course({
		name: input.name,
		description: input.description,
		price: input.price
	})

	return newCourse.save()
	.then(course =>{
		console.log(course)
		response.send(course)
	})

	.catch(error =>{
		console.log(error)
		response.send(false)
	})

	} else {
		return response.send("You Are not Authorize to add a course!")
	}
	
}

// Create a controller wherein it will retrieved all the courses (active/inactive courses)

module.exports.allCourses = (request, response) => {
	const userData = auth.decode(request.headers.authorization);
	console.log(userData)

	if (!userData.isAdmin) {
		return response.send("You don't have access to this route!")
	} else {
		Course.find({})
		.then(result => {
			return response.send(result);
		})
		.catch(error => {
			return response.send(error)
		})
	}
}

// Create a crontroller wherein it will retrieve courses that are active.

module.exports.allActiveCourses = (request, response) =>{

	Course.find({isActive: true})
	.then(result => response.send(result))
	.catch(error => response.send(error))
}

/*
	
*/

module.exports.allInactiveCourses = (request, response) =>{
	const userData = auth.decode(request.headers.authorization);

	if (!userData.isAdmin) {
		return response.send("You don't have access to this route!")
	} else {
		Course.find({isActive: false})
		.then(result => response.send(result))
		.catch(error => response.send(error))
	}
}

// This controller will get details of specific course

module.exports.courseDetails = (request, response) =>{
	const courseId = request.params.courseId;

	Course.findById(courseId)
	.then(result => response.send(result))
	.catch(error => response.send(error));
}

// This controller is for updating specific course
/*
	Business logic:
		1. We are going to edit/update the course
		that is in the params.
*/

module.exports.updateCourse = async (request,response) => {

	const userData = auth.decode(request.headers.authorization);

	const courseId = request.params.courseId;

	const input = request.body;

	if (!userData.isAdmin) {
		return response.send("You don't have access to this page!")
	} else {
		await Course.findOne({_id: courseId})
		.then(result => {
			if (result === null) {
				return response.send("Course Id not found!");
			} else {
				let updatedCourse = {
							name: input.name,
							description: input.description,
							price: input.price
						}

						Course.findByIdAndUpdate(courseId, updatedCourse, {new: true})
						.then(result => {
							console.log(result)
							return response.send(result)
						}) 
						.catch(error => response.send(error))
			}
		})
		.catch(error => response.send(error))
	}
}

// Controller for archiving

module.exports.archiveCourse = (request, response) => {
	const userData = auth.decode(request.headers.authorization);
	const courseId = request.params.courseId;
	const input = request.body

	if (!userData.isAdmin) {
		return response.send("You don't have accessto this page!")
	} else {
		Course.findById(courseId)
		.then(result => {
			if (result === null) {
				return response.send("Course Id not found!")
			} else {
				let archive = {
					isActive: input.isActive
				}
				Course.findByIdAndUpdate(courseId, archive, {new:true})
				.then(result => response.send(result))
				.catch(error => response.send(error))
			}
		})
		.catch(error => response.send(error))
	}
}