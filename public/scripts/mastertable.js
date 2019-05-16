function generateTable() {
  firebase.firestore().collection("students").orderBy("ticketNumber", "desc")
  .get()
  .then(function(querySnapshot) {
    var table = document.getElementById("mastertable");
    querySnapshot.forEach(function(doc) {
      console.log(doc.id, "=>", doc.data());
      var row = table.insertRow(1);
      var data = doc.data();

      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);

      cell1.innerHTML = leadingZeros(data.ticketNumber);
      cell2.innerHTML = data.firstName + ' ' + data.lastName;
      cell3.innerHTML = '<td>' + data.shirtSize;
      cell4.innerHTML = '<td>' + checkedIn(data);
      cell5.innerHTML = '<td>' + data.shirtCollected;
      cell6.innerHTML = getDateString(data.timestamp);
    });
  })
}

function checkedIn(data) {
  if (data.PhotoID == 1) {
    return true;
  } else if (data.photoID == 0) {
    return false;
  } else {
    return undefined;
  }
}

function getDateString(timestamp) {
  return timestamp;
}

generateTable();
