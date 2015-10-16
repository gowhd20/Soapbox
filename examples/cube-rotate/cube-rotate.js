
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
var _p                      = null;
var _clientId               = -1;
var _applicationName        = "RotateCubeApplication";
var _MSG_TOGGLE_ROTATING    = "ToggleRotating";
var _MSG_ROTATE_STATE_QUERY = "RotateStateQuery";
var _MSG_ROTATE_STATE       = "RotateState";

// Name the logging channel.
SetLogChannelName(_applicationName);

// Server side logic implementation.

var Server = Class.extend(   
{
    init : function()
    {
        if (me.name != _applicationName)
            me.name = _applicationName;

        this.data = {
            rotate : true
        };

        LogInfo("Server started");

        // Frame updates to rotate cube
        frame.Updated.connect(this, this.onUpdate);

        // Connect to client triggered entity action to toggle rotation state
        me.Action(_MSG_TOGGLE_ROTATING).Triggered.connect(this, this.onToggleRotating);
        me.Action(_MSG_ROTATE_STATE_QUERY).Triggered.connect(this, this.onRotateStateQuery);

        // Connect to new clients coming in
        server.UserConnected.connect(this, this.onClientConnected)

        this.createCube();
    },

    shutDown : function()
    {
        this.data = null;
    },

    onUpdate: function()
    {
        if (this.data !== null && this.data.rotate)
        {
            var cubeEnt = scene.EntityByName("cube");
            if (cubeEnt != null)
            {
                var t = cubeEnt.placeable.transform;
                t.rot.y += 1;
                t.rot.x += 1;
                t.rot.z += 1;
                cubeEnt.placeable.transform = t;
            }
        }
    },

    onClientConnected : function(connId, connection)
    {
        // Notify this client about the current state
        connection.Exec(me, _MSG_ROTATE_STATE, this.data.rotate.toString());
    },

    onRotateStateQuery : function()
    {
        var connection = server.ActionSender();
        if (connection != null)
            connection.Exec(me, _MSG_ROTATE_STATE, this.data.rotate.toString());
    },

    onToggleRotating: function(param)
    {        
        this.data.rotate = !this.data.rotate;
        Log("Rotating: " + this.data.rotate);

        // Nofigy all clients of the state change
        me.Exec(EntityAction.Peers, _MSG_ROTATE_STATE, this.data.rotate.toString());
    },

    createCube: function()
    {
        if (scene.EntityByName("cube") == null)
        {
            var cubeEnt = scene.CreateEntity(scene.NextFreeId(), ["EC_Mesh", "EC_Placeable", "EC_Name"]);
            cubeEnt.name = "cube";
            cubeEnt.temporary = true;

            cubeEnt.mesh.meshRef = "cube.mesh";
            cubeEnt.mesh.materialRefs = [ "cube.material" ];

            var t = cubeEnt.placeable.transform;
            t.scale = new float3(4,4,4);
            t.pos.y = 15;
            cubeEnt.placeable.transform = t;
        }
    }
});

// Client side logic implementation. You can rename 
// this class to reflect your application.

var Client = Class.extend(
{
    init: function()
    {
        LogInfo("Client started");

        // Move initial camera position to the cube
        var camera = scene.EntityByName("FreeLookCamera");
        if (camera != null)
        {
            var t = camera.placeable.transform;
            t.pos = new float3(-21, 22, 14);
            t.rot = new float3(-12, -56, 0);
            camera.placeable.transform = t;
        }        
        else
            LogError("Freelook camera not in scene!");

        this.initUi();

        // Monitor entity mouse clicks on hover
        sceneinteract.EntityClicked.connect(this, this.onEntityClicked);
        input.TopLevelInputContext().MouseMove.connect(this, this.onMouseMove);

        // Listen for server triggered entity action about state change.
        me.Action(_MSG_ROTATE_STATE).Triggered.connect(this, this.onRotateStateChanged);

        // Query server current rotate state
        me.Exec(EntityAction.Server, _MSG_ROTATE_STATE_QUERY);
    },

    initUi : function()
    {
        var baseCSS = "QLabel { color: white; font-size: 14px; background-color: rgba(8,149,195,210); border: 0px; padding: 25px; }";

        this.ui = {};
        this.ui.help = new QLabel("Click the cube to command the server to toggle rotation state");
        this.ui.help.styleSheet = baseCSS;

        var proxy = ui.AddWidgetToScene(this.ui.help);
        proxy.windowFlags = Qt.Widget;        
        this.ui.help.move(25, 25);
        this.ui.help.visible = true;

        this.ui.state = new QLabel("Rotating: false");
        this.ui.state.styleSheet = baseCSS;

        proxy = ui.AddWidgetToScene(this.ui.state);
        proxy.windowFlags = Qt.Widget;
        this.ui.state.move(25, 100);
        this.ui.state.visible = false;
    },

    onEntityClicked : function(ent, button, rayvastResult)
    {
        if (ent.name === "cube" && button === Qt.LeftButton)
            me.Exec(EntityAction.Server, _MSG_TOGGLE_ROTATING);
    },

    onMouseMove : function(mEvent)
    {
        if (mEvent.IsRightButtonDown())
            return;

        var result = renderer.Raycast(mEvent.x, mEvent.y);
        if (result.entity != null && result.entity.name == "cube")
            this.ui.help.text = "Click me";
        else
            this.ui.help.text = "Click the cube to command the server to toggle rotation state";
    },

    onRotateStateChanged : function(param1)
    {
        this.ui.state.text = "Rotating: " + param1;
        if (!this.ui.state.visible)
            this.ui.state.visible = true;
    }
});

// Script destroy/unload handler. Called from the Script component automatically.

function OnScriptDestroyed()
{
    /** Note: If you have client and server classes
        both should implement your shutdown function.
        This way you don't need any custom checking here. */
    if (_p != null)
    {
        if (typeof _p.shutDown === "function")
            _p.shutDown();
        _p = null;
    }
}

// Initialize client or server instances, 
// dependeing where the script is being ran.

if (IsClient())
    _p = new Client();
else
    _p = new Server();
