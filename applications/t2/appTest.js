

var Client = Class.extend(
{
    init: function()
    {
        LogInfo("Client started");

        this.initUi();

        // Listen for client/server sent entity actions
        me.Action(_MSG_INTRODUCTION).Triggered.connect(this, this.onServerIntroduction);

        // Introduce client app to the server
        me.Exec(EntityAction.Server, _MSG_INTRODUCTION);
    },

    shutDown : function()
    {
        Log("Shutting down");

        // Clean up any UI created by this application.
        ui.RemoveWidgetFromScene(this.ui.proxy);
        this.ui = null;
    },

    initUi : function()
    {
        var baseCSS = "QLabel { color: white; font-size: 14px; background-color: rgba(8,149,195,210); border: 0px; padding: 25px; }";

        this.ui = {};
        this.ui.welcome = new QLabel("Welcome to the '" + _applicationName + "' application");
        this.ui.welcome.styleSheet = baseCSS;

        this.ui.proxy = ui.AddWidgetToScene(this.ui.welcome);
        this.ui.proxy.windowFlags = Qt.Widget;

        this.ui.welcome.move(25, 25);
        this.ui.welcome.visible = true;
    },

    onServerIntroduction : function()
    {
        Log("Server messaged it is ready");
    }
});

if (IsClient()){
    _appInstance = new Client();
	console.log("client starting");
}
else
    _appInstance = new Server();
