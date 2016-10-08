
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

createEventArray("wilson");


function collectSurveys() {

}

function layoutThings() {

}
function createEventArray(user){
	var evArray = [];

	db.ref('users').child(user).child('events').once('value').then(function(snapshot) {
		var len = snapshot.numChildren();
		for(var i = 0; i < len; i++){
			evArray.push(snapshot.child(i.toString()).val());
		}
		evArray.forEach(function(event){
			console.log(event);
		});
		return evArray;
	});
		

}