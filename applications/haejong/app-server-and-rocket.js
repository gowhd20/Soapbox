// Reference needed dependencies.
// !ref: http://meshmoon.data.s3.amazonaws.com/app/lib/class.js, Script
// !ref: http://meshmoon.data.s3.amazonaws.com/app/lib/admino-utils-common-deploy.js, Script

// Include dependency scripts.
engine.IncludeFile("http://meshmoon.data.s3.amazonaws.com/app/lib/class.js");
engine.IncludeFile("http://meshmoon.data.s3.amazonaws.com/app/lib/admino-utils-common-deploy.js");
engine.IncludeFile("Users.js");

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
var _MSG_ABORT_SPEECH			= "MSG_abort_speech";
var _MSG_RELEASE_PENDING 		= "MSG_release_pending";

var SET_LOCATION_TO_SPEECH  = {"x":66.12, "y":10, "z":-40.09};

// the location for attempt of on/off speech
var SET_STAY_ON_SPEECH = {"x":66.20, "y":10, "z":-44.36};
var SET_STAY_OUT_SPEECH  = {"x":66.12, "y":10, "z":-40.09};


// Name the logging channel.
// used in the server side
SetLogChannelName(_applicationName);
LogInfo("app-server-and-rocket.js loaded");

var Server = Class.extend({
    init : function(){
		if (server.IsRunning()){
			LogInfo("running");
			var Users = server.AuthenticatedUsers();
			if (Users.length == 0){}			
		}
		var Users = new Soapbox.Users();
		
		var speakerInfo;
		var isSpeechOn = 0;
		var speechInfo;
		var speechCnt;
		var tempUserInfoIn;		// user who attempted to begin the speech
		var tempUserInfoOut;	// user who attempted to end the speech
		var isSpeechInfoGiven = 0;	// flag for checking if speech info is given before trigger the speech
		var speechSystemPending = {
			"signal":0, "userId":"", "entityId":""
		};
		
		this.speakerInfo = speakerInfo;
		this.Users = Users;
		this.isSpeechOn = isSpeechOn;
		this.speechCnt = speechCnt;
		this.speechInfo = speechInfo;
		this.isSpeechInfoGiven = isSpeechInfoGiven;
		this.tempUserInfoIn = tempUserInfoIn;
		this.tempUserInfoOut = tempUserInfoOut;
		this.speechSystemPending = speechSystemPending;
		
		//set soapbox volumetrigger
		var soapBoxVolumeTrigger = this.setSoapboxSystemTrigger();
		soapBoxVolumeTrigger.entityEnter.connect(this, this.onSpeechRequested);
		soapBoxVolumeTrigger.entityLeave.connect(this, this.offSpeechEndRequested);
        LogInfo("Server started");		
		
        // Client sent entity actions
        me.Action(_MSG_INITIATION).Triggered.connect(this, this.onClientIntroduction);
		me.Action(_MSG_COMMENTS).Triggered.connect(this, CommentControl);
		me.Action(_MSG_VOTE).Triggered.connect(this, VoteControl);
		me.Action(_MSG_USER_TELEPORT_REQ).Triggered.connect(this, TeleportReq);
		me.Action(_MSG_RELEASE_PENDING).Triggered.connect(this, this.releasePending);
		
		// Speech confirmed to begin by speaker
		me.Action(_MSG_SPEECH_BEGIN_REQUEST).Triggered.connect(this, this.onSpeechBegun);
		
		// Speech confirmed to be ended by speaker
		me.Action(_MSG_SPEECH_END_REQUEST).Triggered.connect(this, this.offSpeechTerminated);	
		// Speech is forcibly aborted by some incidence  
		me.Action(_MSG_ABORT_SPEECH).Triggered.connect(this, this.offSpeechTerminated);
        // Frame updates
        frame.Updated.connect(this, this.onUpdate);
		
        // Connect to new clients logging in/out
        server.UserConnected.connect(this, this.onClientConnected);
        server.UserDisconnected.connect(this, this.onClientDisconnected);
		
    },
	
	callSystemStatus : function(){
		LogInfo("_______ system status ______");
		LogInfo("Speech? "+this.isSpeechOn);
		LogInfo("Pending? "+this.speechSystemPending.signal+" by "+this.speechSystemPending.userId);
		LogInfo("Speech Info? "+this.isSpeechInfoGiven);
		try{
			var userId;
			var userName;
			if(typeof this.tempUserInfoIn === 'undefined'){
				LogInfo("user in info is not set");

			}else{
				userName = this.tempUserInfoIn.speakerInfo[0].generalInfo.name?this.tempUserInfoIn.speakerInfo[0].generalInfo.name:"null";
				userId = this.tempUserInfoIn.speakerInfo[0].generalInfo.id?this.tempUserInfoIn.speakerInfo[0].generalInfo.id:"null";
				LogInfo("System triggered by? "+userName+" id? "+userId);
			}

			if(typeof this.tempUserInfoOut === 'undefined'){
				LogInfo("user out info is not set");

			}else{
				userName = this.tempUserInfoOut.speakerInfo[0].generalInfo.name?this.tempUserInfoOut.speakerInfo[0].generalInfo.name:"null";
				userId = this.tempUserInfoOut.speakerInfo[0].generalInfo.id?this.tempUserInfoOut.speakerInfo[0].generalInfo.id:"null";
				LogInfo("System ended by? "+userName+" id? "+userId);
			}

			if(typeof this.speakerInfo === 'undefined'){
				LogInfo("speaker is not defined");

			}else{
				userName = this.speakerInfo.speakerInfo[0].generalInfo.name?this.speakerInfo.speakerInfo[0].generalInfo.name:"null";
				userId = this.speakerInfo.speakerInfo[0].generalInfo.id?this.speakerInfo.speakerInfo[0].generalInfo.id:"null";
				LogInfo("Speaker is? "+userName+" id? "+userId);
			}

		}catch(e){
			Log("Error, one or more system info not exist");
		}
	},

    shutDown : function(){
        Log("Shutting down");
    },

    onUpdate: function(frametime){
		//LogInfo("server frame updated");
    },

    onClientConnected : function(connId, connection){
		Log(connId);
        Log("Client #" + connection.id + " connected");
    },

    onClientDisconnected : function(connId, connection){
		if(this.speechSystemPending.userId == connId){
			LogInfo("User logged out while system is pending, release the system");
			this.releasePending();
		}
		// This will secure a speaker log off without completing the speech
		// Handled by server to terminate the speech automatically 
		if(typeof this.speakerInfo == 'undefiend'){
			Log("Client #" + connection.id + " disconnected");return;
		}

		else if(this.isSpeechOn == 1){

			if(typeof this.speakerInfo.speakerInfo == 'undefined'){
				LogInfo("speaker was not defined");
			}

			if(this.speakerInfo.speakerInfo[0].generalInfo.id == connection.id){
				LogInfo("speaker logged out during the speech, speaker id: "+
					this.speakerInfo.speakerInfo[0].generalInfo.id+
				" "+connection.id+" logged out");

				this.offSpeechTerminated(
					{
						"origin":"virtual", 
						"signal":1
					});
			}
		}
        Log("Client #" + connection.id + " disconnected");
    },
	
	// new client login
    onClientIntroduction : function(){
        var connection = server.ActionSender();
		var coordinatorInfo;
		var name = connection.Property("username");

        if (connection != null){
        	LogInfo(this.Users.checkNameExist(name, connection.id));

        	if(this.Users.checkNameExist(name, connection.id))
        		name = connection.Property("username")+connection.id.toString();

        	else
        		name = connection.Property("username")
            Log("Client id #" + connection.id + ", "+name+ " is ready");
			LogInfo("if speech is?: "+this.isSpeechOn);
			
			// assign coordinator if not exist
			if(this.Users.coordinatorInfo.id == ""){
				this.Users.selectCoordinator();

				if(typeof this.speechInfo == 'undefined'){ 
					// if there is no speech going on right now
					var initParams = {
						"speechState":this.isSpeechOn, 
						"userName":name, "userId":connection.id, 
						"like":0, "dislike":0, 
						"actUserCnt" : this.Users.countUserInVenue
					};

				}else{ 
					// if there is a speech going on right now
					var initParams = {
						"speechState":this.isSpeechOn, 
						"userId":connection.id, 
						"userName":name,
						"like":this.speechInfo[this.speechCnt-1].like, 
						"dislike":this.speechInfo[this.speechCnt-1].dislike,
						"actUserCnt":this.Users.countUserInVenue, 
						"speakerId":this.speakerInfo.speakerInfo[0].generalInfo.id,
						"speakerName":this.speakerInfo.speakerInfo[0].generalInfo.name,
						"speakerEntityId":this.speakerInfo.speakerInfo[1].entityInfo.entityId,
						"speakerEntityName":this.speakerInfo.speakerInfo[1].entityInfo.entityName
					};
				}
			}else{
				if(typeof this.speechInfo == 'undefined'){ 
					// if there is no speech going on right now
					var initParams = {
						"speechState":this.isSpeechOn, 
						"userId":connection.id, 
						"userName":name,
						"like":0, "dislike":0,
						"actUserCnt" : this.Users.countUserInVenue,
						"coordinatorId":this.Users.coordinatorInfo.id,
						"coordinatorName":this.Users.coordinatorInfo.name
					};
				}else{ 
					// if there is a speech going on right now
					var initParams = {
						"speechState":this.isSpeechOn, 
						"userId":connection.id, 
						"userName":name,
						"like":this.speechInfo[this.speechCnt-1].like, 
						"dislike":this.speechInfo[this.speechCnt-1].dislike,
						"actUserCnt":this.Users.countUserInVenue, 
						"speakerId":this.speakerInfo.speakerInfo[0].generalInfo.id,
						"speakerName":this.speakerInfo.speakerInfo[0].generalInfo.name,
						"speakerEntityId":this.speakerInfo.speakerInfo[1].entityInfo.entityId,
						"speakerEntityName":this.speakerInfo.speakerInfo[1].entityInfo.entityName,
						"coordinatorId":this.Users.coordinatorInfo.id,
						"coordinatorName":this.Users.coordinatorInfo.name
					};
				}
			}
			// message send back to client with speech info
			connection.Exec(me, _MSG_INITIATION, JSON.stringify(initParams));
        }
        else
            LogError("onClientIntroduction() null entity action sender!");
    },

	// speech triggered
	// params = speech info

	onSpeechBegun : function(params){
		// speech info is given
		/* server prepare the speech */
		var speechData = JSON.parse(params);

		if(speechData.origin === 'virtual'){	// virtual user 
			this.releasePending();				// pending removed

			LogInfo("Server pending signal= "+this.speechSystemPending.signal+" for "+this.speechSystemPending.userId);
			LogInfo("Speaker provides speech info and the system now triggers the speech");

			this.isSpeechInfoGiven = 1;
			TeleportReq(this.tempUserInfoIn.speakerInfo[1].entityInfo.entityName, SET_STAY_ON_SPEECH);
			LogInfo("speech title: "+speechData.title);
			//LogInfo(this.tempUserInfoIn);
			SpeechControl(this, this.tempUserInfoIn, speechData, 1);
			this.callSystemStatus();

		}else{		// physical user
			LogInfo("speaker in physical world provides speech info and the system now triggers the speech");
			this.isSpeechInfoGiven = 1;
			LogInfo("speech title: "+speechData.title);
			SpeechControl(this, "", speechData, 1);
			this.callSystemStatus();
		}
	},
	
	onSpeechRequested : function(ent){
		// collect temporal information of user who stepped on the soapbox
		this.tempUserInfoIn = {"speakerInfo":[{"generalInfo":{"name" : "", "id" : ""}}
		,{"entityInfo":{"entityName" : ent.name, "entityId" : ent.id}}]};
		
		// if already a speech is ongoing, keep everybody else away from soapbox except speaker
		// this will protect system from small bugs caused by unexpected situations
		if(this.isSpeechOn === 1 & typeof this.speakerInfo !== 'undefined'){

			if(this.speakerInfo.speakerInfo[1].entityInfo.entityId != this.tempUserInfoIn.speakerInfo[1].entityInfo.entityId){
				TeleportReq(this.tempUserInfoIn.speakerInfo[1].entityInfo.entityName, SET_STAY_OUT_SPEECH);
				return false;
			}

		}else{

			if(this.isSpeechInfoGiven == 0 & this.isSpeechOn == 0){
				// if user who prompted pending tries it over again, this will sort out  
				if(this.speechSystemPending.entityId === ent.id){
					return;
				}
				// if speech info is not given
				// ask user to enter speech info
				LogInfo("Received a request to begin the speech, server will ask speech info");
				this.tempUserInfoIn.speakerInfo[0].generalInfo.id = 
				this.Users.getUserIdByEntityName(ent.name);
				this.tempUserInfoIn.speakerInfo[0].generalInfo.name = 
				this.Users.getUserNameById(this.tempUserInfoIn.speakerInfo[0].generalInfo.id);
				// system is waiting for speech information to be filled
				this.speechSystemPending.signal = 1;
				this.speechSystemPending.userId = this.tempUserInfoIn.speakerInfo[0].generalInfo.id;
				this.speechSystemPending.entityId = this.tempUserInfoIn.speakerInfo[1].entityInfo.entityId;
				LogInfo("Server pending signal= "+this.speechSystemPending.signal+" for "+this.speechSystemPending.userId);				
				// send confirmation to the requester whether to begin the speech
				ent.Exec(4, _MSG_SPEECH_BEGIN_REQUEST);

			}
		}
		this.callSystemStatus();
	},

	// speech terminated
	offSpeechTerminated : function(reply){
		var action;

		if(typeof reply === 'string')
			action = JSON.parse(reply);

		else
			action = reply;

		LogInfo(action)

		if(action.origin === 'virtual'){

			if(this.isSpeechInfoGiven == 1 & action.signal == 1){
				/* singal to peers that speech ended */
				LogInfo("Speech end request has been approved by speech. System terminates the speech ");
				this.isSpeechInfoGiven = 0;
				SpeechControl(this, this.speakerInfo, "", 0);
				/*if(typeof this.tempUserInfoOut === 'undefined'){
					LogInfo("sending tempUserInfoIn");
					SpeechControl(this, this.tempUserInfoIn, "", 0);
				}else{
					LogInfo("sending tempUserInfoOut");
					// either the speaker tried to leave the speech once or more, or it takes regular steps to finish the speech
					SpeechControl(this, this.tempUserInfoOut, "", 0);
				}*/
				// warning, this try sometimes succeed without speaker in the virtual world
				try{
					//if(typeof this.tempUserInfoOut === 'undefiend'){
					//	TeleportReq(this.tempUserInfoIn.speakerInfo[1].entityInfo.entityName, SET_STAY_OUT_SPEECH);
					//}else{
					//	TeleportReq(this.tempUserInfoOut.speakerInfo[1].entityInfo.entityName, SET_STAY_OUT_SPEECH);
					//}
					TeleportReq(this.speakerInfo.speakerInfo[1].entityInfo.entityName, SET_STAY_OUT_SPEECH);

				}catch(e){
					LogInfo("Speaker appears terminated speech irregular fashion");
				}

			}else if(action == 0){
				// end attempt was by mistake
				// keep the speech running and return the speaker to the right position
				TeleportReq(this.tempUserInfoOut.speakerInfo[1].entityInfo.entityName, SET_STAY_ON_SPEECH);
			}

		}else{

			if(this.isSpeechInfoGiven === 1 & action.signal === 1){
				/* singal to peers that speech ended */
				LogInfo("Speech end request has been issued by physical world, System terminates the speech");
				this.isSpeechInfoGiven = 0;
				SpeechControl(this, "", {"name":this.speakerInfo.speakerInfo[0].generalInfo.name
					,"signal":action.signal
					,"origin":action.origin}, 0);

			}else if(action === 0){
				// end attempt was by mistake
				// keep the speech running and return the speaker to the right position
				// TODO: handle mis-signaled speech end request from physical world
			}
		}
		this.callSystemStatus();
	},
	
	// attempt to terminate the speech
	offSpeechEndRequested : function(ent){
		// undefined -- if(this.speechSystemPending == 1 & ent.id == this.speakerInfo.speakerInfo[1].entityInfo.entityId)
		//	this.speechSystemPending = 0;
		// if user attempted leaving the soapbox was the speaker, otherwise do not act anything
		if(typeof this.speakerInfo === 'undefined'){
			return;
		}

		if(ent.id == this.speakerInfo.speakerInfo[1].entityInfo.entityId){
			// if speech info was given and the speaker attempt to end the speech
			// ask speaker for a confirmation
			LogInfo("Speaker attempted to end the speech, speech state: "+this.isSpeechOn);

			if(this.isSpeechInfoGiven == 1){
				var speakerId = this.Users.getUserIdByEntityName(ent.name);
				//var speakerName = this.Users.getUserInfoById(speakerId);
				var speakerName = this.Users.getUserNameById(speakerId);
				// save user info who try to leave the speech in the middle way
				this.tempUserInfoOut = {
					"speakerInfo":[
					{
						"generalInfo":
						{
							"name" : speakerName, 
							"id" : speakerId
						}
					},
					{
						"entityInfo":
						{
							"entityName" : ent.name, 
							"entityId" : ent.id
						}
					}]};
				
				// send confirmation to the requestor whether it should end the speech
				ent.Exec(4, _MSG_SPEECH_END_REQUEST);
			}
		}
		this.callSystemStatus();
	},
	
	releasePending : function(){
		if(this.speechSystemPending.signal == 1){
			this.speechSystemPending.signal = 0;
			this.speechSystemPending.userId = null;
			this.speechSystemPending.entityId = null;
		}
	},
		
	// set components of volumetrigger and rigitbody for soap_foot entity
	setSoapboxSystemTrigger : function(){
		var soapFootbold = scene.GetEntityByName("soapbox_footbold");
		var vol = soapFootbold.GetOrCreateComponent("VolumeTrigger");
		var rigid = soapFootbold.GetOrCreateComponent("RigidBody");
		rigid.phantom = true;
		return vol;
	}
	
});

// Script destroy/unload handler. Called automatically 
// by the framework when the application is closed.

function OnScriptDestroyed(){
    if (_appInstance != null){
        if (typeof _appInstance.shutDown === "function")
            _appInstance.shutDown();
        _appInstance = null;
    }
}

function CommentControl(cmt){
	var connection = server.ActionSender();
	var cmt = JSON.parse(cmt);

	if (connection != null){
		if(cmt.origin == 'virtual'){
			var name = this.Users.getUserNameById(connection.id);
			Log("Client '" + name + "' with id #" + connection.id +" said-> "+cmt.comment);
			me.Exec(4, _MSG_BROADCAST, cmt.comment, name, connection.id);
		}else{
			Log("Person In physical world '" + cmt.userName+ " said-> "+cmt.comment);
			me.Exec(4, _MSG_BROADCAST, cmt.comment, cmt.userName);
		}
	}	
}
// generate speech id
function GenerateSpeechId(id){
	var id = id;
	if(typeof id == "undefined"){
		id = 0;
	}
	id = id+1;
	return id;
}

function SpeechAddInfo(context, speechId, speechData, name, id, like, dislike, report){
	var self = context;
	if(speechData.origin === 'virtual'){
		if(typeof self.speechInfo == "undefined"){
			self.speechInfo = [];
			var info = {
				"speechId":speechId, 
				"speechTitle":speechData.title, 
				"description":speechData.description,
				"userName":name, 
				"userId":id, 
				"like":like, 
				"dislike":dislike, 
				"report":report
			}; // name id undefiend
			self.speechInfo.push(info);

		}else{
			var info = {
				"speechId":speechId, 
				"speechTitle":speechData.title, 
				"description":speechData.description,
				"userName":name, 
				"userId":id, 
				"like":like, 
				"dislike":dislike, 
				"report":report
			};
				self.speechInfo.push(info);
		}
	}else{
		if(typeof self.speechInfo == "undefined"){
			self.speechInfo = [];
			var info = {
				"speechId":speechId, 
				"speechTitle":speechData.title, 
				"description":speechData.description,
				"userName":speechData.name, 
				"userId":"", 
				"like":like, 
				"dislike":dislike, 
				"report":report
				}; // name id undefiend
			self.speechInfo.push(info);
		}else{
			var info = {
				"speechId":speechId, 
				"speechTitle":speechData.title, 
				"description":speechData.description,
				"userName":speechData.name, 
				"userId":id, 
				"like":like, 
				"dislike":dislike, 
				"report":report
			};
			self.speechInfo.push(info);
		}
	}
	// check list of speeches
	for(var i=0; i<self.speechInfo.length; i++){
		LogInfo("speech Id:"+self.speechInfo[i].speechId+" speech Title:"+
		self.speechInfo[i].speechTitle+" speaker:"+self.speechInfo[i].userName);
	}
}
	// controls speech begin and end
	// action =1 > attempt to start speech
	// action =2 > attempt to end speech
function SpeechControl(context, tempInfo, speechGivenInfo, action){
	if(speechGivenInfo.origin === "physical"){	// physical soapbox username   // this wasnn't called
		var speakerName = speechGivenInfo.name;
		var self = context;
		LogInfo("speaker name: "+speakerName);

		if(action == 1 && self.isSpeechOn == 0){	
			self.speechCnt = GenerateSpeechId(self.speechCnt);
			LogInfo("speech begins by " + speakerName);
			SpeechAddInfo(self, self.speechCnt, speechGivenInfo, "", "", 0, 0, 0);   // speechId, name, id, like, dislike, report // add speech info
			self.isSpeechOn = 1; 		// set speech is now on by physical soapbox
			self.speakerInfo = {"speakerInfo":[{"generalInfo":{"name":speakerName, "id":""}}		// set speaker info
			,{"entityInfo":{"entityName":"", "entityId":""}}]};
			me.Exec(4, _MSG_SPEECH_BEGIN, JSON.stringify(self.speakerInfo));
		}
		else if(action == 0 && self.isSpeechOn == 1){
			try{
				// when speech ended by physical soapbox
				self.isSpeechOn = 0;			
				console.LogInfo("speech ends by name: " + self.speakerInfo.speakerInfo[0].generalInfo.name);
				me.Exec(4, _MSG_SPEECH_END, JSON.stringify(self.speakerInfo));

				self.speakerInfo.speakerInfo[0].generalInfo.name = "";
				self.speakerInfo.speakerInfo[0].generalInfo.id = "";
				self.speakerInfo.speakerInfo[1].entityInfo.name = "";
				self.speakerInfo.speakerInfo[1].entityInfo.id = "";				

			}catch(e){
				console.LogInfo("exception, undefined speaker attempted to end speech");
			}
		}else{
			LogInfo("speech end has been requested, but there is no speech to end!");
		}
		
	}else{		// virtual soapbox user
		var speakerId = tempInfo.speakerInfo[0].generalInfo.id;
		var speakerName = tempInfo.speakerInfo[0].generalInfo.name;
		var entName = tempInfo.speakerInfo[1].entityInfo.entityName;
		var entId = tempInfo.speakerInfo[1].entityInfo.entityId;
		var self = context;

		LogInfo("speaker ID: "+speakerId+" speaker name: "+speakerName);	
		// action to begin the speech
		if(action == 1){	
			if(self.isSpeechOn == 1){
				// when speech is on, tried to start speech
				console.LogInfo("Speech is already on by user name: ", + self.speakerInfo.speakerInfo[0].generalInfo.name);
			}
			else{
				self.speechCnt = GenerateSpeechId(self.speechCnt);
				LogInfo("speech begins by " + speakerName + " id: "+ speakerId);
				SpeechAddInfo(self, self.speechCnt, speechGivenInfo, speakerName, speakerId, 0, 0, 0);   // speechId, name, id, like, dislike, report // add speech info
				self.isSpeechOn = 1; 	// set speech is now on

				// set speaker info
				self.speakerInfo = {
				"speakerInfo":[
				{
					"generalInfo":
					{
						"name" : speakerName, "id" : speakerId
					}
				},		
				{
					"entityInfo":
					{
						"entityName" : entName, 
						"entityId" : entId
					}
				}
				]};
				me.Exec(4, _MSG_SPEECH_BEGIN, JSON.stringify(self.speakerInfo));
			}
		// action to end the speech
		}else if(action == 0){
			
			try{
				if(speakerId == self.speakerInfo.speakerInfo[0].generalInfo.id){
					// when speech is off, tried to start speech
					self.isSpeechOn = 0;			
					console.LogInfo("speech ends by name: " + 
						self.speakerInfo.speakerInfo[0].generalInfo.name);
					me.Exec(4, _MSG_SPEECH_END, JSON.stringify(self.speakerInfo));

					self.speakerInfo.speakerInfo[0].generalInfo.name = "";
					self.speakerInfo.speakerInfo[0].generalInfo.id = "";
					self.speakerInfo.speakerInfo[1].entityInfo.name = "";
					self.speakerInfo.speakerInfo[1].entityInfo.id = "";
					
				}else{
					LogInfo("speaker name doesn't match with end attempt entity");
				}

			}catch(e){
				console.LogInfo("exception, undefined speaker attempted to end speech");
			}
		}
	}
}

function SpeechInfoUpdate(){
	// TODO:
}

function TeleportReq(entName, setLocation){
	if(typeof entName == 'undefined'){
		LogInfo("Entity name user sent is not valid, can't teleport the user");
		return false;

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

function VoteControl(vote){
	var voteInfo = JSON.parse(vote);
	if(voteInfo.origin === "virtual"){
		var id = this.speechCnt-1;
		var conn = server.ActionSender();
		
		if(voteInfo.vote == 1){
			this.speechInfo[id].like = this.speechInfo[id].like+1;
			me.Exec(4, _MSG_VOTE, this.speechInfo[id].like, this.speechInfo[id].dislike);

		}else if(voteInfo.vote == 0){
			this.speechInfo[id].dislike = this.speechInfo[id].dislike+1;
			me.Exec(4, _MSG_VOTE, this.speechInfo[id].like, this.speechInfo[id].dislike);

		}else if(voteInfo.vote < 0){
			this.speechInfo[id].report = this.speechInfo[id].report+1;
		}

		Log(conn.Property("username") + " voted, vote status: " + 
		this.speechInfo[id].like + " " + 
		this.speechInfo[id].dislike + " "+
		this.speechInfo[id].report);
	}else{
		// later this might useful to collect into different category
		LogInfo("this vote is from physical world");
		
		var id = this.speechCnt-1;
		var conn = server.ActionSender();
		
		if(voteInfo.vote == 1){
			this.speechInfo[id].like = this.speechInfo[id].like+1;
			me.Exec(4, _MSG_VOTE, this.speechInfo[id].like, this.speechInfo[id].dislike);

		}else if(voteInfo.vote == 0){
			this.speechInfo[id].dislike = this.speechInfo[id].dislike+1;
			me.Exec(4, _MSG_VOTE, this.speechInfo[id].like, this.speechInfo[id].dislike);

		}else if(voteInfo.vote < 0){
			this.speechInfo[id].report = this.speechInfo[id].report+1;
		}

		Log(conn.Property("username") + " voted, vote status: " + 
		this.speechInfo[id].like + " " + 
		this.speechInfo[id].dislike + " "+
		this.speechInfo[id].report);
	}
}
// Initialize client or server instances,
// dependeing where the script is being ran.

if (IsServer())
    _appInstance = new Server();

