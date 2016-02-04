var soapbox = new Soapbox();

window.connection = false;

var d = new Date();

year = d.getFullYear();

month = d.getMonth();
f_month=formatMonth(month);

day = d.getDate();
f_day=formatDay(day);

hour=d.getHours();
f_hour=formatHour(hour);

minutes=d.getMinutes();
f_minutes=formatMin(minutes);

function formatMonth(month) {
  if (month < 10){
	month = "0"+month;
  }
  return month;
}

function formatDay(day) {
  if (day < 10){
	day = "0"+day;
  }
  return day;
}
function formatHour(hour) {
  if (hour < 10){
	hour = "0"+hour;
  }
  return hour;
}

function formatMin(minutes) {
  if (minutes < 10){
	minutes = "0"+minutes;
  }
  return minutes;
}

soapbox.connect(function(){
	window.connection = true;
	
	soapbox.onreceivenextspeechinfo = function(speech_info) {
		console.log(speech_info);
		if (speech_info.hasOwnProperty('topic')) {
			var topic = speech_info.topic;
			document.getElementById("show_topic").innerHTML = topic;
		}
		if (speech_info.hasOwnProperty('speaker')) {
			var speaker = speech_info.speaker;
			document.getElementById("show_speaker").innerHTML = speaker;
		}
		if (speech_info.hasOwnProperty('lefttime')) {
			var lefttime= speech_info.lefttime;
			document.getElementById("show_time").innerHTML = lefttime;
		}
	}
	//Initial the request
	soapbox.next_speech();
});


function startSpeech(){
	if (confirm("Start the speech?") == true){
		location.href = "speech.html";
	}
	else{
		location.href = "index.html";
	}
}

