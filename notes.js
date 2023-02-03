
	// In our application we will be using this package to demonstrate how to encrypt data when a user register to our website.

	// The "bcrypt" package is one of the many packages that we can use to encrypt information but is not commonly recommended because of how simple the algo is.

	// There are other more advance encryption packages that can be used.

	// Syntax for hashing password
		// Syntax:
			// bcrypt.hashSync(password, saltRounds)
		// saltRounds is the value provide as the number of "salt" round that the bcrypt algorithm will run in order to encrypt the password

// [JWT - jsonwebtoken package]

	//  JSON web token is an industry standard for sending information between our application in secure manner
	// the jsonwebtoken package will allow us to gain access to methods that will help us create JSON web token
