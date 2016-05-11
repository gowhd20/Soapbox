console.log("webTest.js loaded");

exampleSocket.onmessage = function (event) {
  console.log(event.data);
}