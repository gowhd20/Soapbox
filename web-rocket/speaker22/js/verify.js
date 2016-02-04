var soapbox = new Soapbox();

window.connection = false;

soapbox.connect(function(){
	window.connection = true;
	soapbox.onvalidationresult = function(result) {
			console.log(result);
        //result is true or false
			if (result == 2) {
				location.href = "welcome.html";
			}
			else if (result == 1){
				alert("Sorry, this is not your speech time! You can only log in 10 minutes before your speech.");
			}
			else{
				alert("Your password is wrong!");
			}
		}
});

function verify(){
	console.log(window.connection);
	var verifypw = document.getElementById("verify").value;
	if(verifypw == ""){
		alert("Please fill in your password!");
	}
	else if (window.connection == true){
		soapbox.validate(verifypw);
	}		
}

function startRightNow(){
	hour=d.getHours();
	f_hour=formatHour(hour);
	minutes=d.getMinutes();
	f_minutes=formatMin(minutes);
	var f_int_min = parseInt(f_minutes);
	var f_int_hour = parseInt(f_hour);
	
	if(f_hour.localeCompare(window.today_hour)==0){
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
			alert("You have to finish your" + left + "mins");
		}
	}
}

function unlockScreen(){
	var unlock_pass = document.getElementById("lock_password").value;
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

function checkSchedule(){
	location.href="allSpeech.html";
}

