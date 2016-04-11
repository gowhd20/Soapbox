var _MSG_USER_JOINED_VENUE		= "MSG_user_joined";
var _MSG_USER_LEFT_VENUE		= "MSG_user_left";
var _MSG_SELECT_COORDINATOR		= "MSG_select_coordinator";

var INDEX_OF_COORDINATOR = 0;

if (Soapbox == undefined)
	var Soapbox = {};

Soapbox.Users = function(){
	var isServer = server.IsRunning();
	var userCount = 0;
	var userInfoList = [];
	var countUserInVenue = 0;
	var audienceId = [];
	var coordinatorInfo = {"name" : "", "id" : ""};
	
	this.coordinatorInfo = coordinatorInfo;
	this.countUserInVenue = countUserInVenue;
	this.userCount = userCount;
	this.userInfoList = userInfoList;
	this.audienceId = audienceId;

	
	if(isServer){
		server.UserConnected.connect(this, this.storeUserData);
		server.UserDisconnected.connect(this, this.onClientDisconnected);
	}
	// find user request from client
	me.Action(_MSG_USER_JOINED_VENUE).Triggered.connect(this, this.userJoinedTheVenue);
	me.Action(_MSG_USER_LEFT_VENUE).Triggered.connect(this, this.userLeftTheVenue);
	//me.Action(_MSG_SELECT_COORDINATOR).Triggered.connect(this, this.selectCoordinator);
	
	console.LogInfo("Users loaded");
};

Soapbox.Users.prototype = {
	
	//*********************** Documentation *********************************************//
	// if any class uses this method at any early stages, I recommend passing id as well //
	// because of data sync issue 														 //
	//***********************************************************************************// 

	checkNameExist : function(name, id){
		var searchingName = name;
		var cntOnlineUsers = this.userCount;
		var usrList = this.userInfoList;
		var myId = id;

		if(typeof id === 'undefined'){
			for(var i=0;i<cntOnlineUsers;i++){
				if(usrList[i].name === searchingName){
					return true;
				}
			}
		}else{
			// search by sorting out myself from the list
			for(var i=0;i<cntOnlineUsers;i++){
				if(usrList[i].id !== myId && usrList[i].name === searchingName){
					return true;
				}
			}
		}
		return false;
	},
	
	storeUserData : function(userID, userConnection){
		var name = userConnection.Property("username");
		// use name+id when showing on comment dashboard to avoid confusion between virtual users with the same nick name
		if(this.checkNameExist(name))
			var userInfo = {"name":name+userID.toString(),
							"id":userID};
		else
			var userInfo = {"name":name,
							"id":userID};
		this.userInfoList.push(userInfo);
		console.LogInfo("user name: "+this.userInfoList[this.userCount].name);
		console.LogInfo("user id: "+this.userInfoList[this.userCount].id);

		// count user in
		this.countUser(1);
	},
	
	countUser : function(f){
		if(f){
			this.userCount = this.userCount+1;
		}else{
			if(this.userCount>0)
				this.userCount = this.userCount-1;
			//this.userCount;
		}
	},
	
	onClientDisconnected : function(connId, connection){
		console.LogInfo("removing user id: "+connId);
		
		// user who logged out without leaving the venue, need to be removed from the active users
		if(this.isUserAudience(connId)){
			LogInfo("user was in the venue until leaving");
			this.audienceId.splice(this.audienceId.indexOf(connId), 1);
			this.countUserInVenue = this.countUserInVenue-1;
			me.Exec(4, _MSG_USER_LEFT_VENUE, this.countUserInVenue);
		}else{
			LogInfo("remaining users in the venue:");
			for(var i=0; i<this.audienceId.length; i++){
				LogInfo(this.audienceId[i]);
			}
		}
		// if disconnected user was coordinator, select another user
		// and broadcast to all users
		if(this.isUserCoordinator(connId)){
			LogInfo("coordinator logged out, need a new selection");
			this.removeUserById(connId);  // remove logout user from the cache
			// count user out
			// user disconnect
			this.countUser(0);
			this.selectCoordinator();
		}else{
			this.removeUserById(connId);  // remove logout user from the cache
			// count user out
			// user disconnect
			this.countUser(0);
		}
		LogInfo(connId + " disconnected");
		
    },

	searchUserById : function(id){
		var id = id;
		var cntOnlineUsers = this.userCount;
		var usrList = this.userInfoList;

		for(var i=0;i<cntOnlineUsers;i++){
			if(usrList[i].id == id){
				return usrList[i].name;
			}
		}
		return false;
	},
	
	selectCoordinator : function(){
		LogInfo("select coordinator request has been received");
		if(this.userInfoList.length != 0){
			// remember who's coordinator
			this.coordinatorInfo = this.userInfoList[INDEX_OF_COORDINATOR];
			me.Exec(4, _MSG_SELECT_COORDINATOR, JSON.stringify(this.userInfoList[INDEX_OF_COORDINATOR]));
			LogInfo("name: "+this.coordinatorInfo.name+" id: "+this.coordinatorInfo.id+" has been selected as coordinator");
		}else{
			this.coordinatorInfo.id = "";
			this.coordinatorInfo.name = "";
			LogInfo("There are no one in the virtual world to be the coordinator");
		}
	},
	
	//speakerName[6] = identical with id ==> example: Avatar1 
	getUserIdByEntityName : function(entName){
		var id;
		id = entName.slice(6, entName.length);
		return id;
	},
	
	getUserNameById : function(id){
		var searchingId = id;
		return this.searchUserById(id);
		
	},

	getUserIdByName : function(name){
		var searchingName = name;
		var cntOnlineUsers = this.userCount;
		var usrList = this.userInfoList;

		for(var i=0;i<cntOnlineUsers;i++){
			if(usrList[i].name == searchingName){
				return usrList[i].id;
			}
		}
		return false;
	},
	
	isUserAudience : function(userId){
		for(var i=0; i<this.audienceId.length; i++){
			if(userId == this.audienceId[i]){
				LogInfo("userId: "+userId+" audience: "+this.audienceId[i]);
				return true;
			}
		}
		
		for(var i=0; i<this.audienceId.length; i++){
			LogInfo(this.audienceId[i]+" is not audience");
		}
		return false;
	},
	
	isUserCoordinator : function(userId){
		if(this.coordinatorInfo.id === undefined)
			return false;
		if(this.coordinatorInfo.id === userId){
			return true;
		}else{
			return false;
		}
	},

	removeUserById : function(id){
		var id = id;
		for(var i=0; i<this.userCount; i++){
			if(this.userInfoList[i].id == id){
				this.userInfoList.splice(i, 1);

				return;
			}
		}
	},
	
	userJoinedTheVenue : function(userId){

		
		// add user to active user group
		if(typeof this.audienceId == 'undefined'){
			this.audienceId[0] = userId;
		}else
			this.audienceId.push(userId);
		
		this.countUserInVenue = this.countUserInVenue+1;		
		LogInfo("id: "+userId + " joined the venue");

		me.Exec(4, _MSG_USER_JOINED_VENUE, this.countUserInVenue);
		
	},
	
	userLeftTheVenue : function(userId){
		
		if(this.countUserInVenue >= 0){

			// removing user from the active user group
			this.audienceId.splice(this.audienceId.indexOf(userId), 1);
			LogInfo("id: "+userId + " left the venue");
			this.countUserInVenue = this.countUserInVenue-1;
			me.Exec(4, _MSG_USER_LEFT_VENUE, this.countUserInVenue);
		}			
		
	}
	
	
};

