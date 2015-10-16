//var ACTIVE_MATERIAL = "local://green.material";
//var UNACTIVE_MATERIAL = "local://red.material";

if (Soapbox == undefined)
	var Soapbox = {};

Soapbox.volumeTrigger = function(){
	/* get or create VolumeTrigger component */
	var vol = me.GetOrCreateComponent("VolumeTrigger");
	/* connect callback function for entering and leaving objects */
	vol.entityEnter.connect(this.entityEntered);
	vol.entityLeave.connect(this.entityLeft);
	console.LogInfo("i am here haha");
	
	/* get component of RigidBody of the entity */
	var rigid = me.GetOrCreateComponent("RigidBody");
	rigid.phantom = true;
};

Soapbox.volumeTrigger.prototype = {
	 ServerHandleUserConnected : function(userID, userConnection) { //(11d)
		console.LogInfo("username: " + userConnection.Property("name"));
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
	    /*
		var mats = me.mesh.meshMaterial;
		mats[0] = ACTIVE_MATERIAL;
		me.mesh.meshMaterial = mats;
		*/
	},
	
	print : function(s) {
		console.LogInfo(s);
	},
	entityLeft : function(ent) {
		console.LogInfo("speech ends by " + ent.name);
	/*
    var mats = me.mesh.meshMaterial;
    mats[0] = UNACTIVE_MATERIAL;
    me.mesh.meshMaterial = mats;
    */
	},
	
	returnName : function(ent) {
		return ent.name;
	}
	
};

/* var volumeTrigger = new Soapbox.volumeTrigger();

function logScriptLoaded() {
	volumeTrigger.print("volumetrigger.js loaded");
}
	
function logScriptLoading() {
	volumeTrigger.print("[Volume Trigger test] Loading script...");
}
logScriptLoading();

if(isServer){
	server.UserConnected.connect(volumeTrigger.ServerHandleUserConnected);
}
logScriptLoaded(); */

var isServer = server.IsRunning();

//print(vol.entityEnter.connect(entityEntered));
//print(vol.entityLeave.connect(entityLeft));

 
      
//mats = me.mesh.meshMaterial;
//mats[0] = UNACTIVE_MATERIAL;    
//me.mesh.meshMaterial = mats;
