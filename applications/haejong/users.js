var _MSG_SEARCH_USER	= "MSG_search_request";
var _MSG_FOUND_USER		= "MSG_found_response";
var _MSG_NOT_FOUND_USER = "MSG_not_found_response";

if (Soapbox == undefined)
	var Soapbox = {};

Soapbox.Users = function(){
	var isServer = server.IsRunning();
	var userCount = 0;
	var userInfoList = [];
	
	this.userCount = userCount;
	this.userInfoList = userInfoList;
	
	if(isServer){
		server.UserConnected.connect(this, this.storeUserData);
		server.UserDisconnected.connect(this, this.onClientDisconnected);
	}
	// find user request from client
	//me.Action(_MSG_search_user).Triggered.connect(this, this.searchUserById);
	
	console.LogInfo("users loaded");
};

Soapbox.Users.prototype = {
	
	storeUserData : function(userID, userConnection){

		var userInfo = {"name":userConnection.Property("username"),"id":userID};
		this.userInfoList.push(userInfo);
		console.LogInfo(this.userInfoList[this.userCount].name);
		console.LogInfo(this.userInfoList[this.userCount].id);

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
        //user disconnect
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
	
	removeUserById : function(id){
		var id = id;
		for(var i=0; i<this.userCount; i++){
			if(this.userInfoList[i].id == id){
				this.userInfoList.splice(i, 1);

				return;
			}
		}
	}
	
};

