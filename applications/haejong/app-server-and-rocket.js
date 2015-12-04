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
var _appInstance            = null;
var _applicationName        = "soapbox_virtual";
var _MSG_INITIATION       	= "MSG_client_initiation";
var _MSG_COMMENTS			= "MSG_recieved";
var _MSG_BROADCAST			= "MSG_broadcast";
var _MSG_SPEECH_BEGIN		= "speech_started";
var _MSG_SPEECH_END 		= "speech_ended";
var _MSG_VOTE				= "MSG_user_vote";


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
			var users = server.AuthenticatedUsers();	
			if (users.length > 0)
				LogInfo(users[0] + "haha");
		}
		var users = new Soapbox.Users();
		
		var speakerInfo;
		var isSpeechOn = 0;
		
		this.speakerInfo = speakerInfo;
		this.users = users;
		this.isSpeechOn = isSpeechOn;
		
		//set soapbox volumetrigger
		this.setSoapboxSystemTrigger();
        LogInfo("Server startedfff");

				
        // Client sent entity actions
        me.Action(_MSG_INITIATION).Triggered.connect(this, this.onClientIntroduction);
		me.Action(_MSG_COMMENTS).Triggered.connect(this, CommentControl);

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
	
	dumpInJson : function()
	{
		
	},
	
	// new client login
    onClientIntroduction : function()
    {
        var connection = server.ActionSender();
        if (connection != null)
        {
            Log("Client '" + connection.Property("username") + "' with id #" + connection.id + " is ready");
			connection.Exec(me, _MSG_INITIATION, this.isSpeechOn, connection.id);
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

		this.speechControl(ent.name, ent.id, speakerName, speakerId, 1);
		console.LogInfo(this.isSpeechOn);
	},

	// speech terminated
	offSpeechTerminated : function(ent)
	{
		/* singal to peers that speech ends */		
		var speakerId = this.users.getUserIdByEntityName(ent.name);
		var speakerName = this.users.getUserInfoById(speakerId);
		
		this.speechControl(ent.name, ent.id, speakerName, speakerId, 0);
		console.LogInfo(this.isSpeechOn);
	},
	
	// set components of volumetrigger and rigitbody for soap_foot entity
	setSoapboxSystemTrigger : function()
	{
		var soapFootbold = me.parentScene;
		var soapFootbold = scene.GetEntityByName("soapbox_footbold");
		var vol = soapFootbold.GetOrCreateComponent("VolumeTrigger");
		vol.entityEnter.connect(this, this.onSpeechTriggered);
		vol.entityLeave.connect(this, this.offSpeechTerminated);
		var rigid = soapFootbold.GetOrCreateComponent("RigidBody");
		rigid.phantom = true;
	},
	
	// controls speech begin and end
	speechControl : function(eName, eId, name, id, action){
		
		var speakerId = id;
		var speakerName = name;
		var entName = eName;
		var entId = eId;
		
		if(action == 1){
			
			if(this.isSpeechOn == 1)
				// when speech is on, tried to start speech
				console.LogInfo("Speech is already on by user name: ", this.speakerInfo.speakerInfo[0].generalInfo.name);
			else{
				this.isSpeechOn = 1; 
				console.LogInfo("speech begins by name: " + speakerName);
				this.speakerInfo = {"speakerInfo":[{"generalInfo":{"name" : speakerName, "id" : speakerId}},{"entityInfo":{"entityName" : entName, "entityId" : entId}}]};
				me.Exec(4, _MSG_SPEECH_BEGIN, JSON.stringify(this.speakerInfo));

			}
		}else if(action == 0){
			
			if(speakerId == this.speakerInfo.speakerInfo[0].generalInfo.id){
				// when speech is off, tried to start speech
				this.isSpeechOn = 0;			
				console.LogInfo("speech ends by name: " + speakerName);
				
				this.speakerInfo.speakerInfo[0].generalInfo.name = "";
				this.speakerInfo.speakerInfo[0].generalInfo.id = "";
				this.speakerInfo.speakerInfo[1].entityInfo.name = "";
				this.speakerInfo.speakerInfo[1].entityInfo.id = "";
				
				me.Exec(4, _MSG_SPEECH_END, JSON.stringify(this.speakerInfo));
				

			}else{}
		}
		
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

function VoteControl()
{
	var connection = server.ActionSender();
}


function VideoControl()
{

}



// Initialize client or server instances,
// dependeing where the script is being ran.

if (IsServer())
    _appInstance = new Server();

