var _MSG_USER_JOINED_VENUE		= "MSG_user_joined";
var _MSG_USER_LEFT_VENUE		= "MSG_user_left";


if (Soapbox == undefined)
	var Soapbox = {};

Soapbox.Users = function(){
	var isServer = server.IsRunning();
	var userCount = 0;
	var userInfoList = [];
	var countUserInVenue = 0;

	var audienceId = [];

	
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
	
	console.LogInfo("users loaded");
};

Soapbox.Users.prototype = {
	
	storeUserData : function(userID, userConnection){

		var userInfo = {"name":userConnection.Property("username"),"id":userID};
		this.userInfoList.push(userInfo);
		console.LogInfo(this.userInfoList[this.userCount].name);
		console.LogInfo(this.userInfoList[this.userCount].id);

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
		console.LogInfo(connId);
		this.removeUserById(connId);  // remove logout user from the cache
		
		this.countUser(0);
		// user count out
        //user disconnect
		
		// user who logged out without leaving the speech area, need to be removed from the active users
		if(this.isUserAudience(connId)){
			
			this.audienceId.splice(this.audienceId.indexOf(connId), 1);
			this.countUserInVenue = this.countUserInVenue-1;
			me.Exec(4, _MSG_USER_LEFT_VENUE, this.countUserInVenue);
		}
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
	
	//speakerName[6] = identical with id ==> example: Avatar1 
	getUserIdByEntityName : function(entName){
		var id;
		console.LogInfo(entName);
		id = entName.slice(6, entName.length);
		return id;
	},
	
	getUserInfoById : function(id){
		var searchingId = id;
		return this.searchUserById(id);
		
	},
	
	isUserAudience : function(userId){
		for(var i=0; i<this.audienceId.length; i++){
			if(userId == this.audienceId[i]){
				return true;
				break;
			}else
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
		

		me.Exec(4, _MSG_USER_JOINED_VENUE, this.countUserInVenue);
		
	},
	
	userLeftTheVenue : function(userId){
		
		if(this.countUserInVenue >= 0){

			// removing user from the active user group
			this.audienceId.splice(this.audienceId.indexOf(userId), 1);

			this.countUserInVenue = this.countUserInVenue-1;
			me.Exec(4, _MSG_USER_LEFT_VENUE, this.countUserInVenue);
		}			
		
	}
	
	
};

