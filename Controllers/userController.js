const mongoose = require("mongoose");
const User = require("../Models/usersSchema.js");
const bcrypt = require("bcrypt");
const auth = require("../auth.js");

// Controller

// This controller will create or register a user on our db/database

module.exports.userRegistration = (request, response) => {
	const input = request.body

	User.findOne({email: input.email})
	.then(result =>{
		if(result !== null){
			return response.send("The Email is already taken!")
		} else {
			let newUser = new User({
				firstName: input.firstName,
				lastName: input.lastName,
				email: input.email,
				password: bcrypt.hashSync(input.password, 10),
				mobileNo: input.mobileNo
			})
			// save to database
			newUser.save()
			.then(save => {
				return response.send("You are now registered to our website!")
			})
			.catch(error => {
				return response.send(error)
			})
		}
	})
	.catch(error => {
		return response.send(error)
	})
}


// User Authenthication
module.exports.userAuthentication = (request, response) => {
	let input = request.body;

	// Possible scenarios in logging in
		// email is not yet registered
		// email is registered but the password is wrong

	User.findOne({email: input.email})
	.then(result => {
		if (result === null) {
			return response.send("Email is not yet registered. Register first before logging in!");
		} else {
			// we have to verify if the password is correct
			// the "compareSync" method is used to compare a non encrypted password to the encrypte password
			// it returns boolean value, if match true value will return otherwise false
			const isPasswordCorrect = bcrypt.compareSync(input.password, result.password)

			if (isPasswordCorrect) {
				return response.send({auth: auth.createAccessToken(result)});
			} else {
				return response.send("Password is incorrect!");
			}
		}
	})
	.catch(error => {
		return response.send(error);
	})
}

// Retrive the user details
module.exports.getProfile = (request, response) => {
	// let id = request.body;
	const userData = auth.decode(request.headers.authorization);

	console.log(userData);

	User.findById(userData._id)
	.then(result =>{
		result.password = "";
		return response.send(result);
	})
	.catch(error => {
		return response.send(error);
	})
}