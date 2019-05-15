function generateTable() {
  firebase.firestore().collection("students").orderBy("ticketNumber")
  .get()
  .then(function(querySnapshot) {
    var content = '';
    querySnapshot.forEach(function(doc) {
      console.log(doc.id, "=>", doc.data());
      var data = doc.data();
      content += '<tr>';
      content += '<td>' + leadingZeros(data.ticketNumber) + '</td>';
      content += '<td>' + data.firstName + ' ' + data.lasttName + '</td>';
      content += '<td>' + data.shirtSize + '</td>';
      content += '<td>' + data.checkedIn + '</td>';
      content += '<td>' + data.shirtCollected + '</td>';
      content += '</tr>';
    });
    document.getElementById("mastertable").append(content);
  })
}
