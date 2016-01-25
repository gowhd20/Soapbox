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
var _MSG_SPEECH_END 			= "speech_ended";
var _MSG_VOTE					= "MSG_user_vote";
var _MSG_USER_TELEPORT_REQ 	 	= "MSG_teleport";


var SET_LOCATION_TO_SPEECH  = {"x":66.12, "y":10, "z":-40.09};


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
		//var set
		
		this.speakerInfo = speakerInfo;
		this.users = users;
		this.isSpeechOn = isSpeechOn;
		this.speechCnt = speechCnt;
		this.speechInfo = speechInfo;
		
		//set soapbox volumetrigger
		var soapboxEnt = this.setSoapboxSystemTrigger();
		soapboxEnt.entityEnter.connect(this, this.onSpeechTriggered);
		soapboxEnt.entityLeave.connect(this, this.offSpeechTerminated);
		
        LogInfo("Server startedfff");

				
        // Client sent entity actions
        me.Action(_MSG_INITIATION).Triggered.connect(this, this.onClientIntroduction);
		me.Action(_MSG_COMMENTS).Triggered.connect(this, CommentControl);
		me.Action(_MSG_VOTE).Triggered.connect(this, VoteControl);
		me.Action(_MSG_USER_TELEPORT_REQ).Triggered.connect(this, TeleportReq);
		

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
        Log("Client #" + connection.id + " connected");
    },

    onClientDisconnected : function(connId, connection)
    {
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
				var initParams = {"speechState":this.isSpeechOn, "userId":connection.id, "like":0, "dislike":0};
			}else{ // if there is a speech going right now
				var initParams = {"speechState":this.isSpeechOn, "userId":connection.id, "like":this.speechInfo[this.speechCnt-1].like, "dislike":this.speechInfo[this.speechCnt-1].dislike};
			}
			// message send back to client with speech info
			connection.Exec(me, _MSG_INITIATION, JSON.stringify(initParams));
        }
        else
            LogError("onClientIntroduction() null entity action sender!");
    },

	// speech triggered
	onSpeechTriggered : function(ent)
	{
		/* singal to peers that speech begins*/
		var speakerId = this.users.getUserIdByEntityName(ent.name);
		var speakerName = this.users.getUserInfoById(speakerId);

		SpeechControl(this, ent, speakerName, speakerId, 1);
	},

	// speech terminated
	offSpeechTerminated : function(ent)
	{
		/* singal to peers that speech ends */
		var speakerId = this.users.getUserIdByEntityName(ent.name);
		var speakerName = this.users.getUserInfoById(speakerId);
		SpeechControl(this, ent, speakerName, speakerId, 0);
	},
	
		
	// set components of volumetrigger and rigitbody for soap_foot entity
	setSoapboxSystemTrigger : function()
	{
		var soapFootbold = scene.GetEntityByName("soapbox_footbold");
		var vol = soapFootbold.GetOrCreateComponent("VolumeTrigger");
		var rigid = soapFootbold.GetOrCreateComponent("RigidBody");
		rigid.phantom = true;
		return vol;
	},
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
function SpeechControl(context, ent, name, id, action){
	
	var speakerId = id;
	var speakerName = name;
	var entName = ent.name;
	var entId = ent.id;
	var self = context;
	
	if(action == 1){
		
		if(self.isSpeechOn == 1){
			// when speech is on, tried to start speech
			console.LogInfo("Speech is already on by user name: ", + self.speakerInfo.speakerInfo[0].generalInfo.name);
		}
		else{
			self.speechCnt = GenerateSpeechId(self.speechCnt);
			Log("in speechcontrol " + speakerName + " "+ speakerId);
			SpeechAddInfo(self, self.speechCnt, speakerName, speakerId, 0, 0);   // speechId, name, id, like, dislike // add speech info
			self.isSpeechOn = 1; 
			self.speakerInfo = {"speakerInfo":[{"generalInfo":{"name" : speakerName, "id" : speakerId}},{"entityInfo":{"entityName" : entName, "entityId" : entId}}]};
			me.Exec(4, _MSG_SPEECH_BEGIN, JSON.stringify(self.speakerInfo));
			console.LogInfo(self.speakerInfo.speakerInfo[0].generalInfo.name);
		}
	}else if(action == 0){
		
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
	}
	
}

function TeleportReq(entName)
{
	if(typeof entName == 'undefined'){
		Log("ent user sent is not valid, can't teleport the user");
	}
	var ent = scene.GetEntityByName(entName);
	var placeable = ent.placeable;
    var transform = placeable.transform;
    transform.pos.x = SET_LOCATION_TO_SPEECH.x;
    transform.pos.y = SET_LOCATION_TO_SPEECH.y;
    transform.pos.z = SET_LOCATION_TO_SPEECH.z;
    placeable.transform = transform;
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


function VideoControl()
{

}



// Initialize client or server instances,
// dependeing where the script is being ran.

if (IsServer())
    _appInstance = new Server();

