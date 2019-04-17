// This adds a new student to the database.
function createStudent(studentID, firstName, lastName, idPhoto, typedShirtSize, ticketNumber) {
	return firebase.firestore().collection('students').add({
		name: firstName + " " + lastName,
		firstName: firstName,
		lastName: lastName,
		ticketNumber: ticketNumber,
		photoID: idPhoto,
		shirtSize: typedShirtSize,
		timestamp: Date.now()
	}).catch(function(error) {
		console.error('Error when adding student', error)
	});
}

function getStudentByTicket(ticketNumber) {
	firebase.firestore().collection("students").where("ticketNumber", "==", ticketNumber)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
						document.getElementById("ticketNumber").innerHTML = doc.data().ticketNumber;
						document.getElementById("firstName").innerHTML = doc.data().firstName;
						document.getElementById("lastName").innerHTML = doc.data().lastName;
						document.getElementById("shirtSize").innerHTML = doc.data().shirtSize;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function submit() {
	var firstInput = document.getElementById("firstInput").value;
	var lastInput = document.getElementById("lastInput").value;
	var shirtInput = document.getElementById("shirtInput").value;
	var ticketInput = document.getElementById("ticketInput").value;
	createStudent(000000, firstInput, lastInput, 0, shirtInput, parseInt(ticketInput, 10));
	document.getElementById("firstInput").value = "";
	document.getElementById("lastInput").value = "";
	document.getElementById("shirtInput").value = "";
	document.getElementById("ticketInput").value = "";
}

function retrieveStudent() {
	var input = document.getElementById("ticketInput").value;
	getStudentByTicket(parseInt(input));
}
