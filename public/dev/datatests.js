function checkTicketNumber(ticketNumber) {
  firebase.firestore().collection("students").where("ticketNumber", "==", ticketNumber)
  .get()
  .then(function(querySnapshot) {
    var count = 0;
    querySnapshot.forEach(function(doc) {
      console.log(doc.id, " => ", doc.data());
      count += 1;
    })
    return count;
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

function checkAllTickets() {
  for (i = 0; i < 10000; i++) {
    if (checkTicketNumber(i) == 1) {
      console.log("Ticket #" + i + " exists only once.")
    }
  }
}
