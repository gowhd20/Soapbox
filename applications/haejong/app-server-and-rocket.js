// Reference needed dependencies.
// !ref: http://meshmoon.data.s3.amazonaws.com/app/lib/class.js, Script
// !ref: http://meshmoon.data.s3.amazonaws.com/app/lib/admino-utils-common-deploy.js, Script

// Include dependency scripts.
engine.IncludeFile("http://meshmoon.data.s3.amazonaws.com/app/lib/class.js");
engine.IncludeFile("http://meshmoon.data.s3.amazonaws.com/app/lib/admino-utils-common-deploy.js");

// Import QtCore for both server and client. Import QtGui only on client.
engine.ImportExtension("qt.core"); 
if (IsClient())
    engine.ImportExtension("qt.gui"); 

// Global variables
var _appInstance            = null;
var _applicationName        = "soapbox_virtual";
var _MSG_INTRODUCTION       = "MSG_Action_Introduction";
var _SPEECH_BEGIN			= "speech_started";

// Name the logging channel.
// used in the server side
SetLogChannelName(_applicationName);
LogInfo("app-server-and-rocket.js loaded");

var Server = Class.extend(
{
    init : function()
    {
		if (server.IsRunning())
			LogInfo("running");
        LogInfo("Server startedfff");
		LogInfo(me);
        // Client sent entity actions
        me.Action(_MSG_INTRODUCTION).Triggered.connect(this, this.onClientIntroduction);

        // Frame updates
        frame.Updated.connect(this, this.onUpdate);

        // Connect to new clients logging in/out
        server.UserConnected.connect(this, this.onClientConnected);
        server.UserDisconnected.connect(this, this.onClientDisconnected);
		
		//var testEnt = me.scene.entityByName("")
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

    onClientIntroduction : function()
    {
        var connection = server.ActionSender();
        if (connection != null)
        {
            Log("Client '" + connection.Property("username") + "' with id #" + connection.id + " is ready");

            // Reply to client with the same Entity Action
            //me.Exec(me, _MSG_INTRODUCTION);
			connection.Exec(me, _MSG_INTRODUCTION);
        }
        else
            LogError("onClientIntroduction() null entity action sender!");
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

// Initialize client or server instances,
// dependeing where the script is being ran.

if (IsServer())
    _appInstance = new Server();

