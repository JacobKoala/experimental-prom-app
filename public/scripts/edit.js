function doSomethingWithFiles() {
  console.log(fileInput);
}

window.onload = function() {
  document.getElementById('ticketInput').onkeydown = function(event) {
      if (event.keyCode == 13) {
          submit();
      }
  }
}
