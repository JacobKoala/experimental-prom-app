ticketArray = [];

function logAllTickets(ticketNumber) {
  firebase.firestore().collection("students")
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      console.log(doc.id, " => ", doc.data());
      if (ticketArray[doc.data().ticketNumber]) {
        ticketArray[doc.data().ticketNumber] += 1;
      } else {
        ticketArray[doc.data().ticketNumber] = 1;
      }

    })
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
  for (i = 1; i < 10000; i++) {
    if (ticketArray[i] == 1) {
      console.log("Ticket #" + i + " exists only once.")
    } else if (ticketArray[i] > 1) {
      console.log("Duplicate Ticket: " + ticketArray[i] + " instances of ticket #" + i);
      alert("Duplicate Ticket: " + ticketArray[i] + " instances of ticket #" + i);
    } else {
      console.log("Missing Ticket: ticket #" + i);
      if (i < 100) {
        alert("Missing Ticket: ticket #" + i);
      }
    }
  }
}
