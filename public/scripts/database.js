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
						document.getElementById("ticketNumber").innerHTML = doc.data().ticketNumber;
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
    })
    .catch(function(error) {
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
	document.getElementById("ticketInput").value = "";
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
