var count=60;

function countdown(){
	var counter=setInterval(timer, 1000);
}

function timer(){
		
	count=count-1;
	if(count<0)
	{
		window.close();
		clearInterval(counter);	
	}
	document.getElementById("timer").innerHTML="The page will jump out in " + count + " secs";
}

function backToReserve(){
	location.href="reserve.html";
}