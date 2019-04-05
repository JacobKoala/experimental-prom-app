// This adds a new student to the database.
function createStudent(studentID, studentName, idPhoto, typedShirtSize, ticketNumber) {
	return firebase.firestore().collection('students').add({
		name: studentName,
		ticketNumber: ticketNumber,
		photoID: idPhoto,
		shirtSize: typedShirtSize,
		timestamp: Date.now()
	}).catch(function(error) {
		console.error('Error when adding student', error)
	});
}

function submit() {
	var nameInput = document.getElementById("nameInput").value;
	var shirtInput = document.getElementById("shirtInput").value;
	var ticketInput = document.getElementById("ticketInput").value;
	createStudent(000000, nameInput, 0, shirtInput, parseInt(ticketInput, 10));
	document.getElementById("nameInput").value = "";
	document.getElementById("shirtInput").value = "";
	document.getElementById("ticketInput").value = "";
}
