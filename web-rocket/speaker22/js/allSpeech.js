var soapbox = new Soapbox();

window.connection = false;

soapbox.connect(function(){
	window.connection = true;
	var list_speech = document.getElementById("one_speech");
	soapbox.onreceiveallspeeches = function (speeches) {
		if(speeches!=null){
			var len = speeches.length;
			console.log(len);
			window.all_time=[];
			for(i=0;i<len;i++){
				var entry_speech = document.createElement('li');
				var topic ="Topic:"+speeches[i].submit_info.topic;
				console.log(topic);
				var speaker = "Speaker:" + speeches[i].submit_info.speaker;
				console.log(speaker);
				var time = "Time:"+speeches[i].submit_info.lefttime;
				console.log(time);
				entry_speech.appendChild(document.createTextNode(topic+";   "+speaker+";   "+time));
				list_speech.appendChild(entry_speech);
				window.all_time.push(speeches[i].submit_info.lefttime);
				console.log(speeches);
			}	
		}
	
	}    
	//Initial the action to send me all reservations
	soapbox.all_speeches();
	
});

