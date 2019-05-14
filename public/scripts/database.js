var currentStudent;

function getStudentByTicket(ticketNumber) {
	firebase.firestore().collection("students").where("ticketNumber", "==", ticketNumber)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            currentStudent = doc;
						affectedStudent = firebase.firestore().collection("students").doc(currentStudent.id)
            console.log(doc.id, " => ", doc.data());
						document.getElementById("ticketNumber").innerHTML = leadingZeros(doc.data().ticketNumber);
						document.getElementById("firstName").innerHTML = doc.data().firstName;
						document.getElementById("lastName").innerHTML = doc.data().lastName;
						document.getElementById("shirtSize").innerHTML = doc.data().shirtSize;
						if (doc.data().shirtCollected == true) {
							document.getElementById("yesButton").style.backgroundColor = "blue";
							document.getElementById("noButton").style.backgroundColor = "white";
						} else {
							document.getElementById("noButton").style.backgroundColor = "blue";
							document.getElementById("yesButton").style.backgroundColor = "white";
						}
        });
				loadImage();
    })
    .catch(function(error) {
			if (error.code == "permission-denied") {
				alert("Permission denied!\nYou must have authorization to use this app. If you believe this is a mistake, please contact Mrs. Patel.");
			} else {
				alert("Error getting documents: " + error);
			}
        console.log("Error getting documents: ", error);
    });
}

function yesShirt() {
  return affectedStudent.update({
    shirtCollected: true
  })
  .then(function() {
    document.getElementById("yesButton").style.backgroundColor = "blue";
    document.getElementById("noButton").style.backgroundColor = "white";
    console.log("Document successfully updated!")
  })
  .catch(function(error) {
    console.error("Error updating document: ", error);
  });
}

function noShirt() {
  return affectedStudent.update({
    shirtCollected: false
  })
  .then(function() {
    document.getElementById("noButton").style.backgroundColor = "blue";
    document.getElementById("yesButton").style.backgroundColor = "white";
    console.log("Document successfully updated!")
  })
  .catch(function(error) {
    console.error("Error updating document: ", error);
  });
}

function retrieveStudent() {
	var input = document.getElementById("ticketInput").value;
	getStudentByTicket(parseInt(input));
}

function loadImage() {
	storageRef.child(leadingZeros(parseInt(document.getElementById("ticketInput").value, 10)) + ".jpg").getDownloadURL().then(function(url) {
	  // `url` is the download URL for 'images/stars.jpg'

	  // Or inserted into an <img> element:
		console.log(url);
	  var img = document.getElementById('imageSpace');
	  img.src = url;
		document.getElementById("ticketInput").value = "";
	}).catch(function(error) {
		photoWithoutZero();
	});
}

function photoWithoutZero() {
	// Handle any errors
	storageRef.child(parseInt(document.getElementById("ticketInput").value, 10) + ".jpg").getDownloadURL().then(function(url) {
		// `url` is the download URL for 'images/stars.jpg'

		// Or inserted into an <img> element:
		console.log(url);
		var img = document.getElementById('imageSpace');
		img.src = url;
		document.getElementById("ticketInput").value = "";
	}).catch(function(error) {
		// Handle any errors
		alert("Error getting photo: " + error);
	});
}

function leadingZeros(number) {
	if (number < 10) {
		return "000" + number;
	} else if (number < 100) {
		return "00" + number;
	} else if (number < 1000) {
		return "0" + number;
	} else {
		return number;
	}
}

window.onload = function() {
  document.getElementById('ticketInput').onkeydown = function(event) {
      var keyPressed = event.keyCode;
      //console.log(keyPressed);
      if (keyPressed == 13) {
          retrieveStudent();
      }
  }
}
