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
		window.speeches = speeches;
		if(speeches!=null){
			console.log(speeches[0]);
			
			var date_time = extract_date_time(speeches[0].submit_info.lefttime, {"hour": true, "minute": true});
			window.today_hour = date_time.hour;
			window.today_int_hour = parseInt(window.today_hour);
			window.today_min = date_time.minute;
			window.today_int_min = parseInt(window.today_min);
			var f_int_hour = parseInt(f_hour);
			var f_int_min = parseInt(f_minutes);
			
		}
	
	}
	soapbox.upcoming_speeches_today();
	/*
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
	*/
});

function startVerify(){
	location.href = "verify.html";
}

function backToHome(){
	location.href = "index.html";
}

function nextToPassword(){
	window.input_topic = document.getElementById("reg_topic");
	window.reg_topic = window.input_topic.value;
	console.log(window.reg_topic);
	
	window.input_name = document.getElementById("reg_speakername");
	window.reg_name = window.input_name.value;
	console.log(window.reg_name);
	
	window.input_time = document.getElementById("reg_timeleft"); 
	window.reg_time = window.input_time.value;
	console.log(window.reg_time);
	
	if(window.reg_topic =="" || window.reg_name=="" || window.reg_time == ""){
		alert("Please fill in all the infornation!");
	}
	else if(window.connection == true){
		console.log(window.reg_time);
		
	//It would be an array like:  ["10/09/2015 12:00", "10/09/2014 12:00"]
		if(window.all_time!=null){
			var len = window.all_time.length;
			console.log(len);
			for(i=0;i<len;i++){
				if (window.reg_time.localeCompare(window.all_time[i])==0){
					alert("The time has been reserved! Please choose another time.");
				}
				else{
					location.href = "#five";
					document.getElementById("topic").value = window.reg_topic;
					document.getElementById("speakername").value = window.reg_name;
					document.getElementById("timeleft").value = window.reg_time;
					document.getElementById("password").value = randomString();
				}
			}
		}
		else{
			location.href = "#five";
			document.getElementById("topic").value = window.reg_topic;
			document.getElementById("speakername").value = window.reg_name;
			document.getElementById("timeleft").value = window.reg_time;
			document.getElementById("password").value = randomString();
		}
	}
}

function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 6;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}


function startSpeech(){
	if (confirm("Start the speech?") == true){
		location.href = "speech.html";
	}
	else{
		location.href = "index.html";
	}
}

function endSpeech(){
	if (confirm("End the speech?") == true){
		video.pause();
		video.src="";
		soapbox.stop();
		location.href = "instruction.html";
	}
	else{
		location.href = "speech.html";
	}
}

function mysubmit(){
	
	//document.getElementById("pwlabel").style.visibility = "visible";
	//document.getElementById("password").style.visibility = "visible";
	
	if (window.connection == true){
						
		countdown();

		var formValues = $('input[type=text]');
		var speech_info= {};
		$.map(formValues, function(n, i) {
			speech_info[n.name] = $(n).val();
		});
		soapbox.submit(speech_info);
		alert("Submited successfully!");	
		
	}
}

function startRightNow(){
	hour=d.getHours();
	f_hour=formatHour(hour);
	minutes=d.getMinutes();
	f_minutes=formatMin(minutes);
	var f_int_min = parseInt(f_minutes);
	var f_int_hour = parseInt(f_hour);
	if(window.speeches!=null){
		if(f_int_hour==window.today_int_hour){
			var differ = window.today_int_min - f_int_min;
			if(differ<=5){
				location.href="lock.html";
			}
			else{
				left = differ-5;
				alert("You have to finish your" + left + "mins");
				location.href = "speech.html";
			}
		}
		else{
			var hour_differ = window.today_int_hour - f_int_hour;
			var min_differ = window.today_int_min - f_int_min;
			if(hour_differ>0){
				left = differ-5;
				var differ = hour_differ*60+min_differ;
				window.lock_count = (differ-5)*60;
				lock_countdown();
				alert("You have to finish your" + left + "mins.");
			}
		}
	}
	else{
		location.href = "speech.html";
	}
	
}

function lock_countdown(){
	var counter=setInterval(lock_timer, 1000);
}

function lock_timer(){
		
	window.lock_count=window.lock_count-1;
	if(window.lock_count<0)
	{
		location.href = "lock.html";
		clearInterval(counter);	
	}
}




