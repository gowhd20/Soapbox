/*
 * UBI Hotspot Statistics API: http://stats.ubioulu.fi/hotspots/index.php
 */

// encode a given url
// compatible suffix: .json
function encodeURLForMeshmoonProject(url, suffix)
{
    var newUrl = encodeURIComponent(url);
    //newUrl = "http://proxy.meshmoon.com/assets?ref=" + newUrl + "&suffix=.json";
    newUrl = "http://proxy.meshmoon.com/assets?ref=" + newUrl + "&suffix=" + suffix;
    return newUrl;
}


// method to perform the http request
function performHttpRequest(url)
{
    // request via jQuery
    $.getJSON(url, function(data)
    {
        console.log("GET JSON RETURN ", data);
    });
         
    /* API CALLS TO UBI HOTSPOTS APIT ARE NOT WORKING WITH THE MESHMOON PROXY 
    var myContext = { name : "MyContextObject", meshAsset : null, textAsset : null };

    // Forcing an asset type for a request.
    transfer = Tundra.asset.requestAsset(urlEncoded, ".json");
    if (transfer != null)
    {
        transfer.onCompleted(myContext, function(asset) {
            this.textAsset = asset;              // this === the given context, in this case 'myContext'
            console.log(JSON.parse(asset.data)); // "Text" forced TextAsset type
            debugger;
        });
        transfer.onFailed(myContext, function(transfer, reason, metadata) {
            console.log("Failed to fetch my json from", transfer.ref, "into", this.name); // this.name === "MyContextObject"
            console.log("Reason:", + reason);
            console.log("Metadata id:", metadata); // metadata === 12345
            debugger;
        }, 12345);
    }
    */

    /*
    var clickRequestURL = "https://jsonp.afeld.me/?url=http%3A%2F%2Fstats.ubioulu.fi%2Fhotspots%2Fclicks.php%3Ffrom%3D2015-06-01%26to%3D2015-06-09%26instance_id%3Dtoripolliisi-1";

    // no CORS
    // create HTTP Request
    var xmlHttp = new XMLHttpRequest();
    //xmlHttp.addHeader("Access-Control-Allow-Origin", "*");
    xmlHttp.open( "GET", clickRequestURL, false );
    xmlHttp.send( null );

    var httpResponse = xmlHttp.responseText;
    //httpResponse.addHeader("Access-Control-Allow-Origin", "*");

    console.log("getUbiStatsClicks - response: ", httpResponse);
    debugger;
    //return httpResponse;
    */
}

// returns prior day in date formatted as yyyy-mm-dd
function getLastDay()
{
    // get current date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    // decrease current date by 1 day including
    // monthly back tracking
    dd = dd - 1;
    if(dd <= 0)
    {
        mm = mm - 1;
        if(mm <= 0)
        {
            mm = 12;    // December
            yyyy = yyyy - 1;  // decrease year by one
        }
        // get last day of month
        var d = new Date(yyyy, mm, 0);
    }

    // CURRENT DATE (need to check for last day-1)
    var dateString = "" + yyyy + "-" + mm + "-" + dd;
    console.log("Last Day = " + dateString);
    return dateString;
}

// returns current day in date formatted as yyyy-mm-dd
function getToday()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    var dateString = "" + yyyy + "-" + mm + "-" + dd;
    console.log("Today = " + dateString);
    return dateString;
}


function getUbiStatsClicks(from, to, instanceId)
{
    // build request url
    //var clickRequestURL = "http://stats.ubioulu.fi/hotspots/clicks.php?from=2015-06-01&to=2015-06-09&instance_id=toripolliisi-1";
    
    //var clickRequestURL = "https://jsonp.afeld.me/?url=http%3A%2F%2Fstats.ubioulu.fi%2Fhotspots%2Fclicks.php%3Ffrom%3D2015-06-01%26to%3D2015-06-09%26instance_id%3Dtoripolliisi-1";
    //var clickRequestURL = "http://stats.ubioulu.fi/hotspots/clicks.php"; //?from=2015-06-01&to=2015-06-09&instance_id=toripolliisi-1";
    //var clickRequestURL = "http://stats.ubioulu.fi/hotspots/clicks.php?from=2015-06-01&to=2015-06-09&instance_id=toripolliisi-1";
    var clickRequestURL = "http://stats.ubioulu.fi/hotspots/clicks.php?from=" + from +"&to=" + to + "&instance_id=" + instanceId;

    // encode url
    clickRequestURL = encodeURLForMeshmoonProject(clickRequestURL, ".json");

    // perform http request
    performHttpRequest(clickRequestURL);
}

function getUbiStatsClicksLastDay(instanceId)
{
    // get dates
    var lastDay    = getLastDay();
    var currentDay = getToday();

    // perform call
    getUbiStatsClicks(lastDay, currentDay, instanceId);
}


function getUbiStatsServices(from, to, instanceId)
{
    // build request url
    //var servicesRequestURL = "http://stats.ubioulu.fi/hotspots/services.php?from=2015-06-01&to=2015-06-09&instance_id=toripolliisi-1";
    var servicesRequestURL = "http://stats.ubioulu.fi/hotspots/services.php?from=" + from +"&to=" + to + "&instance_id=" + instanceId;

    // encode url
    servicesRequestURL = encodeURLForMeshmoonProject(servicesRequestURL, ".json");

    // perform http request
    performHttpRequest(servicesRequestURL);
}

function getUbiStatsServicesLastDay(instanceId)
{
    // get dates
    var lastDay    = getLastDay();
    var currentDay = getToday();

    // perform call
    getUbiStatsServices(lastDay, currentDay, instanceId);
}


function getUbiStatsFaces(from, to, instanceId)
{
    // build request url
    //var facesRequestURL = "http://stats.ubioulu.fi/hotspots/faces.php?from=2015-06-01&to=2015-06-09&instance_id=toripolliisi-1";
    var facesRequestURL = "http://stats.ubioulu.fi/hotspots/faces.php?from=" + from +"&to=" + to + "&instance_id=" + instanceId;

    // encode url
    facesRequestURL = encodeURLForMeshmoonProject(facesRequestURL, ".json");

    // perform http request
    performHttpRequest(facesRequestURL);
}

function getUbiStatsFacesLastDay(instanceId)
{
    // get dates
    var lastDay    = getLastDay();
    var currentDay = getToday();

    // perform call
    getUbiStatsFaces(lastDay, currentDay, instanceId);
}


function getUbiStatsFacesRealtime(instanceId)
{
    // build request url
    var facesRealtimeRequestURL = "http://stats.ubioulu.fi/hotspots/faces_realtime.php?instance_id=toripolliisi-1";
    //var facesRealtimeRequestURL = "http://stats.ubioulu.fi/hotspots/faces_realtime.php?instance_id=" + instanceId;

    // encode url
    facesRealtimeRequestURL = encodeURLForMeshmoonProject(facesRealtimeRequestURL, ".json");

    // perform http request
    performHttpRequest(clickRequestURL);
}

function getStatsByInstanceId(instanceId, obj)
{
	var lastDay    = getLastDay();
    var currentDay = getToday();
	
	//ws url for real time faces.
	var facesRealtimeRequestURL = "http://stats.ubioulu.fi/hotspots/faces_realtime.php?instance_id="+instanceId;
	facesRealtimeRequestURL = encodeURLForMeshmoonProject(facesRealtimeRequestURL, ".json");
	
	//ws url for faces.
	var facesRequestURL = "http://stats.ubioulu.fi/hotspots/faces.php?from=" + lastDay +"&to=" + currentDay + "&instance_id=" + instanceId;
    facesRequestURL = encodeURLForMeshmoonProject(facesRequestURL, ".json");
	
	//ws url for services.
	var servicesRequestURL = "http://stats.ubioulu.fi/hotspots/services.php?from=" + lastDay +"&to=" + currentDay + "&instance_id=" + instanceId;
    servicesRequestURL = encodeURLForMeshmoonProject(servicesRequestURL, ".json");
	
	//ws url for clicks.
	var clickRequestURL = "http://stats.ubioulu.fi/hotspots/clicks.php?from=" + lastDay +"&to=" + currentDay + "&instance_id=" + instanceId;
    clickRequestURL = encodeURLForMeshmoonProject(clickRequestURL, ".json");
	
	var realTimeFaces = "";
	
	$.getJSON(servicesRequestURL, function(data)
    {
		var html = "Hotspot : "+instanceId;
		
		var servicesFaces = " <br/> Services counts : ";
		if(data.result == "")
			servicesFaces+="0";
		else
			servicesFaces+=data.result;
		
		html+=servicesFaces;
		
		
		$.getJSON(clickRequestURL, function(data)
		{
			var clicks = " <br/> Click counts : ";
			if(data.result == "")
				clicks+="0";
			else
				clicks+=data.result;
			
			html+=clicks;
			
			$.getJSON(facesRealtimeRequestURL, function(data)
			{
				var facesRealTime = " <br/> Real Time Faces counts : ";
				if(data.result == "")
					facesRealTime+="0";
				else
					facesRealTime+=data.result;
				
				html+=facesRealTime;
				
				$.getJSON(facesRequestURL, function(data)
				{
					var faces = " <br/> Faces counts : ";
					if(data.result == "")
						faces+="0";
					else
						faces+=data.result;
					
					html+=faces;
					
					obj.divElement.html(html);
					obj.divElement.show();
				});
			});
		});
    });
}