//var ACTIVE_MATERIAL = "local://green.material";
//var UNACTIVE_MATERIAL = "local://red.material";

engine.IncludeFile("users.js");

var _MSG_SPEECH_BEGIN			= "speech_started";
var _MSG_SPEECH_END 			= "speech_ended";

if (Soapbox == undefined)
	var Soapbox = {};

Soapbox.SpeechTrigger = function(){

	/* get or create VolumeTrigger component */
	this.server = server;
	console.LogInfo("next comes me of vol");
	console.LogInfo(me);

	var isServer = server.IsRunning();
	var users = new Soapbox.Users();
	this.users = users;
	var speakerInfo = {};
	this.speakerInfo = speakerInfo;
	
	var isSpeechOn = 0;
	this.isSpeechOn = isSpeechOn;
	//var t = me.Component(3, "Web");
	
	if(isServer){
		server.UserConnected.connect(this.ServerHandleUserConnected);
	}
	/* connect callback function for entering and leaving objects */
	//var vol = me.GetOrCreateComponent("VolumeTrigger");
	//vol.entityEnter.connect(this, this.userEnteredOntoSoapbox);
	//vol.entityLeave.connect(this, this.userLeftFromSoapbox);
	
	
	/* get component of RigidBody of the entity */
	//var rigid = me.GetOrCreateComponent("RigidBody");
	//rigid.phantom = true;
};

Soapbox.SpeechTrigger.prototype = {
	ServerHandleUserConnected : function(userID, userConnection) { 
	 //
		console.LogInfo(this.isSpeechOn);
	},
	
	userEnteredOntoSoapbox : function(ent) {

		/* singal to peers that speech begins*/
		var speakerId = this.users.getUserIdByEntityName(ent.name);
		var speakerName = this.users.getUserInfoById(speakerId);

		this.speechControl(ent, speakerName, speakerId, 1);
		console.LogInfo(this.isSpeechOn);
	},
	
	userLeftFromSoapbox : function(ent) {
		
		/* singal to peers that speech ends */
		
		var speakerId = this.users.getUserIdByEntityName(ent.name);
		var speakerName = this.users.getUserInfoById(speakerId);
		
		this.speechControl(ent, speakerName, speakerId, 0);
		console.LogInfo(this.isSpeechOn);

	},
	
	print : function(s) {
		console.LogInfo(s);
	},
	
	returnName : function(ent) {
		return ent.name;
	},
	
	
	
	// action 1 : attempt to begin speech, 2: attempt to end speech
	speechControl : function(ent, name, id, action){
		var speakerId = id;
		var speakerName = name;
		
		if(action == 1){
			if(this.isSpeechOn == 1)
				// when speech is on, tried to start speech
				console.LogInfo("Speech is already on by someone else");
			else{
				this.isSpeechOn = 1; 
				console.LogInfo("speech begins by name: " + speakerName);
				me.Exec(4, _MSG_SPEECH_BEGIN, speakerName, speakerId, ent);
/* 				var connection = this.server.ActionSender();
				connection.Exec(me, _MSG_SPEECH_BEGIN); */
				this.speakerInfo = {"name" : speakerName, "id" : speakerId};
			}
		}else if(action == 0){

			if(speakerId == this.speakerInfo.id){
				// when speech is off, tried to start speech
				this.isSpeechOn = 0;
				console.LogInfo("speech ends by name: " + speakerName);
				me.Exec(4, _MSG_SPEECH_END, speakerName, speakerId, ent);
				me.Exec(2, _MSG_SPEECH_END);
				//this.server.Exec(1, _MSG_SPEECH_END); //local
				this.speakerInfo.name = "";
				this.speakerInfo.id = "";
				

			}else{}
		}
		
	}	
	
};
 
      
//mats = me.mesh.meshMaterial;
//mats[0] = UNACTIVE_MATERIAL;    
//me.mesh.meshMaterial = mats;
