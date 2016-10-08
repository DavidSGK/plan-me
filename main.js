
// Initialize Firebase
var config = {
	apiKey: "AIzaSyC4MO74tlpIdOrqlDtg_JdQbQdmq3Ky2Os",
	authDomain: "calendar-3ffea.firebaseapp.com",
	databaseURL: "https://calendar-3ffea.firebaseio.com",
	storageBucket: "calendar-3ffea.appspot.com",
	messagingSenderId: "751157862033"
};

firebase.initializeApp(config);

var db = firebase.database();

var provider = new firebase.auth.GoogleAuthProvider();

window.onload = function() {
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
};

function collectSurveys() {

}

function layoutThings() {

}