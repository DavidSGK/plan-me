
// Initialize Firebase
var config = {
	apiKey: "AIzaSyC4MO74tlpIdOrqlDtg_JdQbQdmq3Ky2Os",
	authDomain: "calendar-3ffea.firebaseapp.com",
	databaseURL: "https://calendar-3ffea.firebaseio.com",
	storageBucket: "calendar-3ffea.appspot.com",
	messagingSenderId: "751157862033"
};

var NUM_INTERVAL = 10;//672

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

function layoutThings(lst) {
	lst = mergesort(lst);

	cal = [];

	for (var i=0; i<NUM_INTERVAL; i++) {
		cal.push(null);
	}

	for (var i=0; i<lst.length; i++) {
		var a = largestSubarrayIndex(cal);
		var max = a[0], ind = a[1];
		if (lst[i]['duration'] <= max) {
			place(cal, lst[i]['duration'], ind, lst[i]['id']);
			cal = cal;
		} else if (max == 0) {
			break;
		}
	}

	return cal;
}

function largestSubarrayIndex(arr) {
	var start=0;
	var max = 0, ind=0;

	for (var i=0; i<arr.length; i++) {
		if (arr[i] != null || arr[start] != null) {
			if (i - start > max) {
				max = i-start;
				ind = start;
			}
			start=i;
		}

		if (i == arr.length-1 && arr[i] == null) {
			if (i - start + 1 > max) {
				max = i-start+1;
				ind = start;
			}
		}
	}
	return [max, ind];
}

function place(lst, n, ind, elem) {
	for (var i=0; i<n; i++) {
		lst[ind+i] = elem;
	}
}

function canBePlaced(lst, n, ind) {
	if (ind + n-1 >= lst.length) {
		return false;
	}
	for (var i=0; i<n; i++) {
		if (lst[ind+i]) {
			return false;
		}
	}
	return true;
}

function mergesort(lst) {
	if (lst.length == 1) {
		return lst;
	}
	return merge(mergesort(lst.slice(0, lst.length/2)), mergesort(lst.slice(lst.length/2, lst.length)));
}

function lessThan(a,b) {
	if (!a) {
		return b;
	}
	if (!b) {
		return a;	
	}
	return (a['priority'] < b['priority'] || a['priority'] == b['priority'] && a['duration'] > b['duration'] );
}

function merge(l1, l2) {
	var lt = [], a1 = 0, a2 = 0;
	for (var i=0; i<(l1.length+l2.length); i++) {
		if (a1 < l1.length && lessThan(l1[a1], l2[a2])) {
			lt.push(l1[a1++]);
		} else if (a2 < l2.length && lessThan(l2[a2], l1[a1])) {
			lt.push(l2[a2++]);
		} else if (a2 == l2.length) {
			lt.push(l1[a1++]);
		} else {
			lt.push(l2[a2++]);
		}
	}
	return lt;
}

var a = {'duration': 2, 'priority': 1, 'id': 1};
var b = {'duration': 2, 'priority': 1, 'id': 2};
var c = {'duration': 2, 'priority': 1, 'id': 3};
var d = {'duration': 2, 'priority': 5, 'id': 4};
var e = {'duration': 3, 'priority': 2, 'id': 5};


console.log(layoutThings([a,b,c,d,e]));