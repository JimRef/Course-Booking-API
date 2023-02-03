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