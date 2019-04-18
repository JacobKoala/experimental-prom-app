window.onload = function() {
  document.getElementById('ticketInput').onkeydown = function(event) {
      if (event.keyCode == 13) {
          retrieveStudent();
      }
  }
}
