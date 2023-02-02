const express = require("express");
const mongoose = require("mongoose");
// by default our backend's CORS setting will prevent any application outside our Express JS app to process the request. Using the cors package, it will allow us to manipulate this and control what application may use our app

// Allows our backend application to be available to our frontend application
// Allows us to control the app's Cross Origin Resource Sharing
const cors = require("cors");


const port = 3001;

const app = express();

	// [MongoDB Connection]

	mongoose.connect("mongodb+srv://admin:admin@batch245-refugio.uoibewa.mongodb.net/batch_Course_API_Refugio?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	let db = mongoose.connection;

	// for error handling
	db.on("error", console.error.bind(console, "Connection Error!"));

	// for validation of the connection
	db.once("open", () => {console.log("We are connected to the cloud!")});



// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());





app.listen(port, () => console.log(`Server is running at port ${port}`));