// Reference needed dependencies.
// !ref: http://meshmoon.data.s3.amazonaws.com/app/lib/class.js, Script
// !ref: http://meshmoon.data.s3.amazonaws.com/app/lib/admino-utils-common-deploy.js, Script

// Include dependency scripts.
engine.IncludeFile("http://meshmoon.data.s3.amazonaws.com/app/lib/class.js");
engine.IncludeFile("http://meshmoon.data.s3.amazonaws.com/app/lib/admino-utils-common-deploy.js");
engine.IncludeFile("users.js");

// Import QtCore for both server and client. Import QtGui only on client.
engine.ImportExtension("qt.core"); 
if (IsClient())
    engine.ImportExtension("qt.gui"); 

// Global variables
var _appInstance           		= null;
var _applicationName        	= "soapbox_virtual";
var _MSG_INITIATION       		= "MSG_client_initiation";
var _MSG_COMMENTS				= "MSG_recieved";
var _MSG_BROADCAST				= "MSG_broadcast";
var _MSG_SPEECH_BEGIN			= "speech_started";
var _MSG_SPEECH_BEGIN_REQUEST	= "speech_begin_request";
var _MSG_SPEECH_END 			= "speech_ended";
var _MSG_SPEECH_END_REQUEST		= "speech_end_request";
var _MSG_VOTE					= "MSG_user_vote";
var _MSG_USER_TELEPORT_REQ 	 	= "MSG_teleport";


var SET_LOCATION_TO_SPEECH  = {"x":66.12, "y":10, "z":-40.09};

// the location for attempt of on/off speech
var SET_STAY_ON_SPEECH = {"x":66.20, "y":10, "z":-44.36};
var SET_STAY_OUT_SPEECH  = {"x":66.12, "y":10, "z":-40.09};


// Name the logging channel.
// used in the server side
SetLogChannelName(_applicationName);
LogInfo("app-server-and-rocket.js loaded");

var Server = Class.extend(
{
    init : function()
    {
		if (server.IsRunning()){
			LogInfo("running");
			var users = server.AuthenticatedUsers();	// test
			if (users.length > 0)
				LogInfo(users[0] + "haha");
		}
		var users = new Soapbox.Users();
		
		var speakerInfo;
		var isSpeechOn = 0;
		var speechInfo;
		var speechCnt;
		var tempUserInfoIn;		// user who attempted to begin the speech
		var tempUserInfoOut;	// user who attempted to end the speech
		var isSpeechInfoGiven = 0;	// flag for checking if speech info is given before trigger the speech
		
		this.speakerInfo = speakerInfo;
		this.users = users;
		this.isSpeechOn = isSpeechOn;
		this.speechCnt = speechCnt;
		this.speechInfo = speechInfo;
		this.isSpeechInfoGiven = isSpeechInfoGiven;
		this.tempUserInfoIn = tempUserInfoIn;
		this.tempUserInfoOut = tempUserInfoOut;
		
		var TEST = 1;
		var TEST2 = 2;
		//set soapbox volumetrigger
		var soapBoxVolumeTrigger = this.setSoapboxSystemTrigger();
		soapBoxVolumeTrigger.entityEnter.connect(this, this.onSpeechRequested);
		soapBoxVolumeTrigger.entityLeave.connect(this, this.offSpeechEndRequested);
		
        LogInfo("Server startedfff");

				
        // Client sent entity actions
        me.Action(_MSG_INITIATION).Triggered.connect(this, this.onClientIntroduction);
		me.Action(_MSG_COMMENTS).Triggered.connect(this, CommentControl);
		me.Action(_MSG_VOTE).Triggered.connect(this, VoteControl);
		me.Action(_MSG_USER_TELEPORT_REQ).Triggered.connect(this, TeleportReq);
		
		// Speech confirmed to begin by speaker
		me.Action(_MSG_SPEECH_BEGIN_REQUEST).Triggered.connect(this, this.onSpeechTriggered);
		// Speech confirmed to be ended by speaker
		me.Action(_MSG_SPEECH_END_REQUEST).Triggered.connect(this, this.offSpeechTerminated);

		

        // Frame updates
        frame.Updated.connect(this, this.onUpdate);

        // Connect to new clients logging in/out
        server.UserConnected.connect(this, this.onClientConnected);
        server.UserDisconnected.connect(this, this.onClientDisconnected);
		
    },

    shutDown : function()
    {
        Log("Shutting down");
    },

    onUpdate: function(frametime)
    {
    },

    onClientConnected : function(connId, connection)
    {
		Log(connId);
        Log("Client #" + connection.id + " connected");
    },

    onClientDisconnected : function(connId, connection)
    {
		// This will secure a speaker log off without completing the speech
		// Handled by server to terminate the speech automatically 
		if(typeof this.speakerInfo == 'undefiend'){}
		else if(this.isSpeechOn == 1){
			if(this.speakerInfo.speakerInfo[0].generalInfo.id == connection.id){
				this.offSpeechTerminated(1);
			}
		}
        Log("Client #" + connection.id + " disconnected");
    },
	
	// new client login
    onClientIntroduction : function()
    {
        var connection = server.ActionSender();

        if (connection != null)
        {
            Log("Client '" + connection.Property("username") + "' with id #" + connection.id + " is ready");

			if(typeof this.speechInfo == 'undefined'){ // if there is no speech going right now

				var initParams = {"speechState":this.isSpeechOn, "userId":connection.id, "like":0, "dislike":0, "actUserCnt" : this.users.countUserInVenue};
			}else{ // if there is a speech going right now
				var initParams = {"speechState":this.isSpeechOn, "userId":connection.id, "like":this.speechInfo[this.speechCnt-1].like, "dislike":this.speechInfo[this.speechCnt-1].dislike, "actUserCnt" : this.users.countUserInVenue};
			}
			// message send back to client with speech info
			connection.Exec(me, _MSG_INITIATION, JSON.stringify(initParams));
        }
        else
            LogError("onClientIntroduction() null entity action sender!");
    },

	// speech triggered
	// params = speech info
	onSpeechTriggered : function(params)
	{
		// speech info is given
		/* server prepare the speech */
		LogInfo("Speaker provided speech info and the system now triggers the speech");
		this.isSpeechInfoGiven = 1;
		TeleportReq(this.tempUserInfoIn.speakerInfo[1].entityInfo.entityName, SET_STAY_ON_SPEECH);
		LogInfo("speech title: "+params);
		SpeechControl(this, this.tempUserInfoIn, 1);
	},
	
	onSpeechRequested : function(ent)
	{
		if(this.isSpeechInfoGiven == 0){
			// if speech info is not given
			// ask user to enter speech info
			LogInfo("Speech info is not given, server will send msg to ask that");
			var speakerId = this.users.getUserIdByEntityName(ent.name);
			var speakerName = this.users.getUserInfoById(speakerId);
			
			this.tempUserInfoIn = {"speakerInfo":[{"generalInfo":{"name" : speakerName, "id" : speakerId}},{"entityInfo":{"entityName" : ent.name, "entityId" : ent.id}}]};
			
			// send confirmation to the requstor whether to begin the speech
			ent.Exec(4, _MSG_SPEECH_BEGIN_REQUEST);

		}else {}
	},

	// speech terminated
	offSpeechTerminated : function(reply)
	{
		if(this.isSpeechInfoGiven == 1 && reply == 1){
			/* singal to peers that speech ended */
			LogInfo("Speech end request has been approved by speech. System terminates the speech ");
			this.isSpeechInfoGiven = 0;
			try{
				TeleportReq(this.tempUserInfoOut.speakerInfo[1].entityInfo.entityName, SET_STAY_OUT_SPEECH);
			}catch(e){
				LogInfo("Speaker appeared to has terminated speech irregular fashion");
			}
			if(typeof this.tempUserInfoOut == 'undefined'){
				SpeechControl(this, this.tempUserInfoIn, 0);
			}else{
				// either the speaker tried to leave the speech once or more, or it takes regular steps to finish the speech
				SpeechControl(this, this.tempUserInfoOut, 0);
			}
		}else if(reply == 0){
			// end attempt was by mistake
			// keep the speech running and return the speaker to the right position
			TeleportReq(this.tempUserInfoOut.speakerInfo[1].entityInfo.entityName, SET_STAY_ON_SPEECH);
		}
	},
	
	// attempt to terminate the speech
	offSpeechEndRequested : function(ent)
	{
		// if speech info was given and the speaker attempt to end the speech
		// ask speaker for a confirmation
		LogInfo("Speaker attempted to end the speech");
		if(this.isSpeechInfoGiven == 1){
			var speakerId = this.users.getUserIdByEntityName(ent.name);
			var speakerName = this.users.getUserInfoById(speakerId);
			
			// save user info who try to leave the speech in the middle way
			this.tempUserInfoOut = {"speakerInfo":[{"generalInfo":{"name" : speakerName, "id" : speakerId}},{"entityInfo":{"entityName" : ent.name, "entityId" : ent.id}}]};
			
			// send confirmation to the requestor whether it should end the speech
			ent.Exec(4, _MSG_SPEECH_END_REQUEST);
		}
	},
	
		
	// set components of volumetrigger and rigitbody for soap_foot entity
	setSoapboxSystemTrigger : function()
	{
		var soapFootbold = scene.GetEntityByName("soapbox_footbold");
		var vol = soapFootbold.GetOrCreateComponent("VolumeTrigger");
		var rigid = soapFootbold.GetOrCreateComponent("RigidBody");
		rigid.phantom = true;
		return vol;
	}
	
});

// Script destroy/unload handler. Called automatically 
// by the framework when the application is closed.

function OnScriptDestroyed()
{
    if (_appInstance != null)
    {
        if (typeof _appInstance.shutDown === "function")
            _appInstance.shutDown();
        _appInstance = null;
    }
}

function CommentControl(cmt)
{
	var connection = server.ActionSender();
	if (connection != null)
	{
		Log("Client '" + connection.Property("username") + "' with id #" + connection.id +" said-> "+cmt);
		me.Exec(4, _MSG_BROADCAST, cmt, connection.Property("username"), connection.id);
	}	
}
// generate speech id
function GenerateSpeechId(id)
{
	var id = id;
	if(typeof id == "undefined"){
		id = 0;
	}
	id = id+1;
	return id;
}

function SpeechAddInfo(context, speechId, name, id, like, dislike)
{
	var self = context;

	if(typeof self.speechInfo == "undefined"){
		self.speechInfo = [];
		var info = {"speechId":speechId, "userName":name, "userId":id, "like":like, "dislike":dislike}; // name id undefiend
		self.speechInfo.push(info);

	}else{
		var info = {"speechId":speechId, "userName":name, "userId":id, "like":like, "dislike":dislike};
		self.speechInfo.push(info);

	}
}

	// controls speech begin and end
	// action =1 > attempt to start speech
	// action =2 > attempt to end speech
function SpeechControl(context, tempInfo, action){//(context, ent, name, id, action){
	var speakerId = tempInfo.speakerInfo[0].generalInfo.id;
	var speakerName = tempInfo.speakerInfo[0].generalInfo.name;
	var entName = tempInfo.speakerInfo[1].entityInfo.entityName;
	var entId = tempInfo.speakerInfo[1].entityInfo.entityId;
	var self = context;

/*	var speakerId = id;
	var speakerName = name;
	var entName = ent.name;
	var entId = ent.id;
	var self = context;*/
	
	if(action == 1){
		
		if(self.isSpeechOn == 1){
			// when speech is on, tried to start speech
			console.LogInfo("Speech is already on by user name: ", + self.speakerInfo.speakerInfo[0].generalInfo.name);
		}
		else{
			self.speechCnt = GenerateSpeechId(self.speechCnt);
			LogInfo("speech begins by " + speakerName + " id: "+ speakerId);
			SpeechAddInfo(self, self.speechCnt, speakerName, speakerId, 0, 0);   // speechId, name, id, like, dislike // add speech info
			self.isSpeechOn = 1; 
			self.speakerInfo = {"speakerInfo":[{"generalInfo":{"name" : speakerName, "id" : speakerId}},{"entityInfo":{"entityName" : entName, "entityId" : entId}}]};
			me.Exec(4, _MSG_SPEECH_BEGIN, JSON.stringify(self.speakerInfo));
			console.LogInfo(self.speakerInfo.speakerInfo[0].generalInfo.name);
		}
	}else if(action == 0){
		try{
			if(speakerId == self.speakerInfo.speakerInfo[0].generalInfo.id){
				// when speech is off, tried to start speech
				self.isSpeechOn = 0;			
				console.LogInfo("speech ends by name: " + self.speakerInfo.speakerInfo[0].generalInfo.name);

				//self.speakerInfo.speakerInfo[0].generalInfo.name = "";
				//self.speakerInfo.speakerInfo[0].generalInfo.id = "";
				//self.speakerInfo.speakerInfo[1].entityInfo.name = "";
				//self.speakerInfo.speakerInfo[1].entityInfo.id = "";
				
				me.Exec(4, _MSG_SPEECH_END, JSON.stringify(self.speakerInfo));
				

			}else{}
		}catch(e){
			console.LogInfo("exception, undefined speaker attempted to end speech");
		}
	}
	
}

function TeleportReq(entName, setLocation)
{
	if(typeof entName == 'undefined'){
		LogInfo("Entity name user sent is not valid, can't teleport the user");
	}else if(typeof setLocation.x == 'undefined'){
		try{
			LogInfo("location set as default ");
			var ent = scene.GetEntityByName(entName);
			var placeable = ent.placeable;
			var transform = placeable.transform;
			transform.pos.x = SET_LOCATION_TO_SPEECH.x;
			transform.pos.y = SET_LOCATION_TO_SPEECH.y;
			transform.pos.z = SET_LOCATION_TO_SPEECH.z;
			placeable.transform = transform;
		}catch(e){
			LogInfo("Entity not exist");
		}
	}else{
		try{
			var ent = scene.GetEntityByName(entName);
			var placeable = ent.placeable;
			var transform = placeable.transform;
			transform.pos.x = setLocation.x;
			transform.pos.y = setLocation.y;
			transform.pos.z = setLocation.z;
			placeable.transform = transform;
		}catch(e){
			LogInfo("Entity not exist");
		}
	}
}

function VoteControl(vote)
{
	var vote = vote;
	var id = this.speechCnt-1;
	var conn = server.ActionSender();
	
	if(vote == 1){

		this.speechInfo[id].like = this.speechInfo[id].like+1;
		me.Exec(4, _MSG_VOTE, this.speechInfo[id].like, this.speechInfo[id].dislike);
	}else{
		this.speechInfo[id].dislike = this.speechInfo[id].dislike+1;
		me.Exec(4, _MSG_VOTE, this.speechInfo[id].like, this.speechInfo[id].dislike);
	}

	Log(conn.Property("username") + "voted, vote status: " + this.speechInfo[id].like + " " + this.speechInfo[id].dislike);
}




// Initialize client or server instances,
// dependeing where the script is being ran.

if (IsServer())
    _appInstance = new Server();

