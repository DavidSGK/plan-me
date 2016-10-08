
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

function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    // [START createprovider]
    var provider = new firebase.auth.GoogleAuthProvider();
    // [END createprovider]
    // [START addscopes]
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    // [END addscopes]
    // [START signin]
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // [START_EXCLUDE]
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
        // If you are using multiple auth providers on your app you should handle linking
        // the user's accounts here.
      } else {
        console.error(error);
      }
      // [END_EXCLUDE]
    });
    // [END signin]
  } else {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  }
}
function initApp(){
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
		  // User is signed in.
		  var displayName = user.displayName;
		  var email = user.email;
		  var emailVerified = user.emailVerified;
		  var photoURL = user.photoURL;
		  var isAnonymous = user.isAnonymous;
		  var uid = user.uid;
		  var providerData = user.providerData;
		  console.log(uid);
		}
	});	
}

// [END buttoncallback]

window.onload = function() {
	toggleSignIn();
	initApp();
}





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
	});
}