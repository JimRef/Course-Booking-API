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