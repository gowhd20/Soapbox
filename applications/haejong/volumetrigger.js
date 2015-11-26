//var ACTIVE_MATERIAL = "local://green.material";
//var UNACTIVE_MATERIAL = "local://red.material";

var _MSG_SPEECH_BEGIN			= "speech_started";
var _MSG_SPEECH_END 			= "speech_ended";

if (Soapbox == undefined)
	var Soapbox = {};

Soapbox.volumeTrigger = function(){
	/* get or create VolumeTrigger component */
	var vol = me.GetOrCreateComponent("VolumeTrigger");
	var isServer = server.IsRunning();
	
	if(isServer){
		server.UserConnected.connect(this.ServerHandleUserConnected);
	}
	/* connect callback function for entering and leaving objects */
	vol.entityEnter.connect(this.entityEntered);
	vol.entityLeave.connect(this.entityLeft);
	console.LogInfo("i am here haha");
	console.LogInfo(me);
	//me.Action(test).Triggered.connect(this, this.tf);
	/* get component of RigidBody of the entity */
	var rigid = me.GetOrCreateComponent("RigidBody");
	rigid.phantom = true;
};

Soapbox.volumeTrigger.prototype = {
	 ServerHandleUserConnected : function(userID, userConnection) { //(11d)
		console.LogInfo("username: " + userConnection.Property("username"));
		console.LogInfo(userConnection)
		console.LogInfo("test id: "+userID);

	/*
		// Set player's name(id) to player area's PlayerArea component
		var pa = playerAreas[playerAreas.length - 1];
		var areaComp = pa.Component("PlayerArea");
		pa.player = userConnection.Property("name");
		areaComp.playerID = userConnection.Property("name");
		*/
	},
	
	entityEntered : function(ent) {

		console.LogInfo("speech begins by "+ ent.name);
		/* singal to peers that speech begins*/
		me.Exec(4, _MSG_SPEECH_BEGIN);
	    /*
		var mats = me.mesh.meshMaterial;
		mats[0] = ACTIVE_MATERIAL;
		me.mesh.meshMaterial = mats;
		*/
	},
	
	entityLeft : function(ent) {
		console.LogInfo("speech ends by " + ent.name);
		/* singal to peers that speech ends */
		me.Exec(4, _MSG_SPEECH_END);
	/*
    var mats = me.mesh.meshMaterial;
    mats[0] = UNACTIVE_MATERIAL;
    me.mesh.meshMaterial = mats;
    */
	},
	
	print : function(s) {
		console.LogInfo(s);
	},
	
	returnName : function(ent) {
		return ent.name;
	},
	tf : function() {
		console.LogInfo("received");
	}
	
};

var volumeTrigger = new Soapbox.volumeTrigger();

function logScriptLoaded() {
	volumeTrigger.print("volumetrigger.js loaded");
}
	
function logScriptLoading() {
	volumeTrigger.print("[Volume Trigger test] Loading script...");
}
logScriptLoading();

logScriptLoaded();



//print(vol.entityEnter.connect(entityEntered));
//print(vol.entityLeave.connect(entityLeft));

 
      
//mats = me.mesh.meshMaterial;
//mats[0] = UNACTIVE_MATERIAL;    
//me.mesh.meshMaterial = mats;
