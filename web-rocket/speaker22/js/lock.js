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
	
	soapbox.onreceiveupcomingtodayspeech = function(speeches) {
    //Similar as onreceiveallspeeches
		if(speeches!=null){
			console.log(speeches[0].submit_info);
			window.lock_password = speeches[0].submit_info.password;
			var lock_topic = speeches[0].submit_info.topic;
			document.getElementById("lock_topic").innerHTML = "Topic: "+lock_topic;
			var lock_speaker = speeches[0].submit_info.speaker;
			document.getElementById("lock_speaker").innerHTML = "Speaker: "+lock_speaker;
			var lock_time = speeches[0].submit_info.lefttime;
			document.getElementById("lock_time").innerHTML = "Start Time: "+lock_time;
		}
	
	}
	soapbox.upcoming_speeches_today();
	
});

function unlockScreen(){
	var unlock_pass = document.getElementById("lock_password").value;
	var nnn = unlock_pass.localeCompare(window.lock_password);
	console.log(nnn);
	if(unlock_pass.localeCompare(window.lock_password)==0){
		location.href="speech.html";
	}
	else{
		alert("Your password is wrong!");
	}
}

function lock_countdown(){
	var counter=setInterval(lock_timer, 1000);
}

function lock_timer(){
		
	window.lock_count=window.lock_count-1;
	if(window.lock_count<0)
	{
		location.href = "verify.html";
		clearInterval(counter);	
	}
}

