// This adds a new student to the database.
function createStudent(studentID, firstName, lastName, idPhoto, typedShirtSize, ticketNumber) {
	return firebase.firestore().collection('students').add({
		name: firstName + " " + lastName,
		firstName: firstName,
		lastName: lastName,
		ticketNumber: ticketNumber,
		photoID: idPhoto,
		shirtSize: typedShirtSize,
		shirtCollected: false,
		timestamp: Date.now()
	}).then(function() {
		document.getElementById("firstInput").value = "";
		document.getElementById("lastInput").value = "";
		document.getElementById("shirtInput").value = "";
		document.getElementById("ticketInput").value = "";
	}).catch(function(error) {
		console.error('Error when adding student', error)
	});
}

function submit() {
	var firstInput = document.getElementById("firstInput").value;
	var lastInput = document.getElementById("lastInput").value;
	var shirtInput = document.getElementById("shirtInput").value;
	var ticketInput = document.getElementById("ticketInput").value;
	createStudent(000000, firstInput, lastInput, 0, shirtInput, parseInt(ticketInput, 10));
}

function doSomethingWithFiles(file) {
  console.log(file);
}

window.onload = function() {
  document.getElementById('ticketInput').onkeydown = function(event) {
      if (event.keyCode == 13) {
          submit();
      }
  }
  // Grab elements, create settings, etc.
	var video = document.getElementById('video');

	// Get access to the camera!
	if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	    // Not adding `{ audio: true }` since we only want video now
	    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
	        //video.src = window.URL.createObjectURL(stream);
	        video.srcObject = stream;
	        video.play();
	    });
	}

	/* Legacy code below: getUserMedia
	else if(navigator.getUserMedia) { // Standard
	    navigator.getUserMedia({ video: true }, function(stream) {
	        video.src = stream;
	        video.play();
	    }, errBack);
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
	    navigator.webkitGetUserMedia({ video: true }, function(stream){
	        video.src = window.webkitURL.createObjectURL(stream);
	        video.play();
	    }, errBack);
	} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
	    navigator.mozGetUserMedia({ video: true }, function(stream){
	        video.srcObject = stream;
	        video.play();
	    }, errBack);
	}
	*/
}
