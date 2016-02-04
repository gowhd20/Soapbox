window.setInterval(function() {
  var elem = document.getElementById('listofcomments');
  elem.scrollTop = elem.scrollHeight;
}, 1000);