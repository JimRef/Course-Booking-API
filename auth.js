const jwt = require("jsonwebtoken");
// User defined string data that will be used to create JSON web token
//  used in the algo for encrypting our data which makes it difficult to decode the information without defined secret keyword.

const secret = "CourseBookingAPI";

	// [Section] JSON web token
		// JSON web token or jwt is a way of securely passing the server to the frontend or the other parts of the server
		
		// Information is kept secure through the use of the secret code
		// only the system will know the secret code that can decode the encrypted information

// Token Creation
/*

	Analogy:
		Pack the gift/information andprovide the secret code for the key
*/

	// the argument that will be passed to our parameter(user) will be the document/information of our user

module.exports.createAccessToken = (user) => {
	
	// payload
		// will contain the data that will be passed to other parts of our API
	const data = {
		_id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	// .sign() from jwt package will generate a JSON web tokens
	// Syntax
		// jwt.sign(payload,secretCode,options)
	return jwt.sign(data, secret, {});
}
// Token verification
/*
	Analogy
		- Recieved the gift and open the lock to verify if the sender is legitimate andn the gift was not tampered
*/

// Middleware functions have access with request object and response object, and the next function indicates that we may proceed with the next step.
module.exports.verify = (request, response, next) =>{
	// The token is retrieved from the "request headers".
	// This can be provided in postman under
		// Authorization > Bearer Token
	let token = request.headers.authorization;

	// Token received and is not undefined.

	if (typeof token !== "undefined") {
		// Retrieves only token and removes the "Bearer" prefix
		token = token.slice(7, token.length);
		console.log(token);

		// Validate the token using the "verify" method decrypting the token using the secret code.
		// jwt.verify(token, secretOrPrivateKey, [options/callbackFunction]);

		return jwt.verify(token, secret, (err, data)=>{
			// if JWT is not valid
			if (err) {
				return response.send({auth: "Failed."});
			} else {
				// The verify method will be used as middleware in the route to verify the token before proceeding to the function that invokes the controller
				next();
			}
		})

	} else {
		return response.send({auth: "Failed."})
	}
}

// Token decryption
/*
	Analogy
		- Open the gift and get the content
*/

module.exports.decode = (token) =>{
	// Token received is not undifined
	if(typeof token !== "undefined"){
		token = token.slice(7,token.length);
		return jwt.verify(token, secret, (err, data)=>{
			if (err) {
				return null
			} else {
				//  the "decode" method is used to obtain information from the jWT
				// jwt.decode(token,[options])
				// Returns an object with access to the "payload" property
				return jwt.decode(token, {complete:true}).payload;
			}
		})
	}
	// Token does not exist (undifined)
	 else {
		return null;
	}
}