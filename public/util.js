Object.compare = function (obj1, obj2) {
	if (!obj1 && !obj2) return true;
	if (!obj1 && obj2) return false;
	if (obj1 && !obj2) return false;

	for (var p in obj1) {
		if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
 
		switch (typeof (obj1[p])) {
			case 'object':
				if (!Object.compare(obj1[p], obj2[p])) return false;
				break;
			case 'function':
				if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
				break;
			default:
				if (obj1[p] != obj2[p]) return false;
		}
	}
	for (var p in obj2) {
		if (typeof (obj1[p]) == 'undefined') return false;
	}
	return true;
};

// Initialize Firebase
var config = {
	apiKey: "AIzaSyC4MO74tlpIdOrqlDtg_JdQbQdmq3Ky2Os",
	authDomain: "calendar-3ffea.firebaseapp.com",
	databaseURL: "https://calendar-3ffea.firebaseio.com",
	storageBucket: "calendar-3ffea.appspot.com",
	messagingSenderId: "751157862033"
};

var NUM_INTERVAL = 11;//672

var calendar = null;

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
		  displayName = user.displayName;
		  email = user.email;
		  emailVerified = user.emailVerified;
		  photoURL = user.photoURL;
		  isAnonymous = user.isAnonymous;
		  uid = user.uid;
		  providerData = user.providerData;
		  console.log(uid);
		}
	});	
}


window.onload = function() {
	toggleSignIn();
	initApp();
}

function getCalendar(f) {
	db.ref('users/' + 'uid' + '/calendar').on('value', function(snapshot) {
		f(snapshot.val());
	});
}

function generateCalendar(lst) {
	lst = mergesort(lst);

	var cal = [];

	for (var i=0; i<NUM_INTERVAL; i++) {
		cal.push(null);
	}

	for (var i=0; i<lst.length; i++) {
		var a = largestSubarrayIndex(cal);
		var max = a[0], ind = a[1];
		if (lst[i]['start']) {
			ind = lst[i]['start'];
			if(canBePlaced(cal, lst[i]['duration']), ind, 0) {
				place(cal, lst[i]['duration'], ind, lst[i], 0);
			} else {
				place(cal, lst[i]['duration'], a[1], lst[i], 0);
			}
		}
		if (lst[i]['duration'] <= max) {
			place(cal, lst[i]['duration'], ind, lst[i], 0);
		} else if (max == 0) {
			break;
		}
	}

	return cal;
}

function generateSmartCalendar(lst) {
	if (!lst || lst.length == 0) return;
	lst = mergesort(lst);

	var cal = [];

	for (var i=0; i<NUM_INTERVAL; i++) {
		cal.push(null);
	}

	var avgSpace = numSpaces(NUM_INTERVAL, totalDuration(generateCalendar(lst)));

	var obj = {};
	for (var i=0; i<lst.length; i++) {
		obj[i] = null;
	}

	var counter = 0;
	while (lst[counter]['start']) {
		for (var i = 0; i<lst[counter]['duration']+avgSpace; i++) {
			delete obj[lst[counter]['start']+i];
		}
		place(cal, lst[counter]['duration'], lst[counter]['start'], lst[counter], avgSpace);
		counter++;
	}


	for (var i=counter; i<lst.length; i++) {
		var broken = false;
		for (var j=avgSpace; j>=0; j--) {
			for (var k=0; k<lst.length; k++) {
				if (canBePlaced(obj, lst[i]['duration'], k, j)) {
					console.log('nope');
					placeObj(obj, lst[i]['duration'], k, j);
					place(cal, lst[i]['duration'], k, lst[i], j);
					broken = true;
					break;
				}
			}
			if (broken) break;
		}
	}

		console.log(obj);
	//}

	for (var i=0; i<cal.length; i++) {
		if (cal[i] === " ") cal[i] = null;
	}

	calendar = cal;
	db.ref('users/' + 'uid' + '/calendar').set(null);
	db.ref('users/' + 'uid' + '/calendar').set(cal);
}

function setTags(obj) {
	db.ref('users/'+'uid'+'/tags').set(obj);
}

function numSpaces(total, n) {
	return Math.floor(total/n);
}

function totalDuration(arr) {
	var total=0;
	for (var i=0; i<arr.length;i++) {
		if (arr[i] && !Object.compare(arr[i], arr[i-1])) total+=arr[i]['duration'];
	}
	return total;
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

function place(lst, n, ind, elem, space) {
	for (var i=0; i<n+space; i++) {
		if (i < n) lst[ind+i] = elem;
		else lst[ind+i] = ' ';
	}
}

function placeObj(obj, n, ind, space) {
	for (var i=0; i<n+space; i++) {
		delete obj[ind+i];
	}
}

function canBePlaced(obj, n, ind, space) {
	for (var i=0; i<n+space; i++) {
		if (! ((ind+i) in obj))	x {
			return false;
		}
	}
	return true;
}

function mergesort(lst) {
	if (lst.length <= 1) {
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

//Can take event or id, need to decide.
function moveDown(calendar, event) {
	var aFound=false, bFound = false;
	var aStart=0, bStart=0;
	var bEnd=0, b=-1;

	for (var i=0; i<calendar.length; i++) {
		if (! aFound && Object.compare(calendar[i], event)) {
			aFound = true;
			aStart = i;
		} else if (aFound && ! bFound && ! Object.compare(calendar[i], event)) {
			bFound = true;
			bStart = i;
			b = calendar[i];
		} else if (aFound && bFound && ! Object.compare(calendar[i], b)) {
			bEnd = i;
			break;
		} else if (i == calendar.length-1 && aFound && bFound){
			bEnd = i+1;
			break;
		}

		if (aFound && i==calendar.length-1 && calendar[i] == null) {
			bEnd = i+1;
			break;
		}

		if (! b) {
			bEnd = i+1;
			break;
		}
	}

	if (! bFound) {
		db.ref('users/'+'uid'+'/calendar').set(null);
		db.ref('users/'+'uid'+'/calendar').set(calendar);	}

	for (var i=bEnd-aStart-1; i>=0; i--) {
		if (bEnd-i-1 < bStart) {
			calendar[aStart+i] = event;
		} else {
			calendar[aStart+i] = b;
		}
	}

	db.ref('users/'+'uid'+'/calendar').set(null);
	db.ref('users/'+'uid'+'/calendar').set(calendar);

}

db.ref('users').child('uid').child('events').on('value', function(snapshot) {
	var evArray = [];

	snapshot.forEach(function (child){
		evArray.push(child.val());
	});
	evArray.forEach(function(x) {
		console.log(x);
	});

	generateSmartCalendar(evArray);
});


function createEvent(title, description, tag, duration, start=null) {
	db.ref('users/'+'uid'+'/tags').once('value', function(snapshot) {
			db.ref('users/'+'uid'+'/events').push().set(
			{
				title: title,
				description: description,
				priority: snapshot.val()[tag],
				duration: duration,
				start: start

			}
		);
	});
}

Util = {
	toggleSignIn: toggleSignIn,
	initApp: initApp,
	getCalendar: getCalendar,
	generateSmartCalendar: generateSmartCalendar,
	setTags: setTags,
	moveDown: moveDown,
	createEvent: createEvent,
	uid: uid,
}