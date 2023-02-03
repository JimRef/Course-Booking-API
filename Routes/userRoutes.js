const express = require("express");

const router = express.Router();

const auth = require("../auth.js");

const userController = require("../Controllers/userController.js")


// [Routes]

// this is responsible for the registration of the user

router.post("/register", userController.userRegistration);

// this route is for the user authentication
router.post("/login", userController.userAuthentication);

// route to get a user document by id
router.get("/details", auth.verify, userController.getProfile);






module.exports = router;