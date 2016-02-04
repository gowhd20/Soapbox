(function() {
  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  var streaming = false;
  var video = null;

  var streamObj = null;
  
  function startup() {
    video = document.getElementById('video');

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: true
      },
      function(stream) {
		streamObj = stream;
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
		var soapbox = new Soapbox();
		soapbox.connect(function(){
			soapbox.start(streamObj);
		}, null, null, {"server_url": "10.20.41.248:15674/stomp", "debug": true});		
      },
      function(error) {
        console.log("An error occured! " + error);
      }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
        if (isNaN(height)) {
          height = width / (4/3);
        }
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        streaming = true;
      }
    }, false);

  }
  window.addEventListener('load', startup, false);
})();