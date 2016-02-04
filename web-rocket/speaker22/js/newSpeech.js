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
});

function newSpeech(){
	
	if (window.connection == true){

		var formValues = $('input[type=text]');
		var speech_info= {};
		$.map(formValues, function(n, i) {
			speech_info[n.name] = $(n).val();
		});
		soapbox.submit(speech_info);
		location.href="speech.html";
	}
}

