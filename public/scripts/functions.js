// This adds a new student to the database.
function createStudent(studentID, studentName, idPhoto, typedShirtSize) {
	return firebase.firestore().collection('students').add({
		name: studentName,
		photoID: idPhoto,
		shirtSize: typedShirtSize // todo: add timestamp on next line
	}).catch(function(error) {
		console.error('Error when adding student', error)
	});
}