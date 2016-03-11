var _MSG_SPEECH_BEGIN			= "speech_started";
var _MSG_SPEECH_BEGIN_REQUEST	= "speech_begin_request";
var _MSG_SPEECH_END 			= "speech_ended";
var _MSG_SPEECH_END_REQUEST		= "speech_end_request";
var _MSG_RAYCAST 				= "MSG_intersected_objects";
var _MSG_MOUSE_PRESS			= "MSG_mouse_press";
var _MSG_MOUSE_RELEASE			= "MSG_mouse_release";
var _MSG_MOUSE_HOVER			= "MSG_mouse_hover_object";
var _MSG_COMMENTS				= "MSG_recieved";
var _MSG_BROADCAST				= "MSG_broadcast";
var _MSG_SEARCH_USER			= "MSG_search_request";
var _MSG_FOUND_USER				= "MSG_found_response";
var _MSG_NOT_FOUND_USER 		= "MSG_not_found_response";
var _MSG_VOTE					= "MSG_user_vote";
var _MSG_USER_TELEPORT_REQ 	 	= "MSG_teleport";
var _MSG_USER_JOINED_VENUE		= "MSG_user_joined";
var _MSG_USER_LEFT_VENUE		= "MSG_user_left";
var _MSG_SELECT_COORDINATOR		= "MSG_select_coordinator";
var _MSG_VIDEO_CONFIGURE_FAILED = "MSG_video_failed";
var _MSG_ABORT_SPEECH			= "MSG_abort_speech";
var _MSG_RELEASE_PENDING 		= "MSG_release_pending";

if (Soapbox == undefined)
	var Soapbox = {};
Soapbox.SignalReceiver = function(self) {
	console.log("Signal receiver init");
	var self = self;
};

Soapbox.SignalReceiver.prototype = {
	onEntityAction : function(entityAction){
		
        if(entityAction.name === _MSG_INITIATION)
		{
			// CLIENT INIT
            self.log.info("Server messaged it is ready");
			
			// user init with init params received from the server
			// speech state, user id determined by server
			self.initParams(JSON.parse(entityAction.parameters[0]));
        }
		else if(entityAction.name === _MSG_BROADCAST)
		{ 
		// entityAction.parameters[0] -> text
		// entityAction.parameters[1] -> user name
		// entityAction.parameters[2] -> user id
			self.addNewComment(entityAction.parameters[0], entityAction.parameters[1], entityAction.parameters[2]);
		}
		// entityAction.parameters[0] -> entity name
		// entityAction.parameters[1] -> entity id
		else if(entityAction.name === _MSG_SPEECH_BEGIN)
        {
			self.speakerInfo = JSON.parse(entityAction.parameters[0]);
			if(self.isSpeakerMe()){
				self.setVideoFeed(self, self.video)
			}
			self.setSpeechBegin(entityAction.parameters[0]);
        }
		else if(entityAction.name === _MSG_SPEECH_BEGIN_REQUEST)
		{
			// send request to the speaker to fill the speech info
			//var speechTitle = self.setSpeechInfo();
			$("infoDash").show();
			TIME_LIMIT = TIME_LIMIT_VALUE;
			//var myVar = setTimeout(self.setTimer, 3000);
			self.setTimer(self);
			//if(speechTitle != false){
				// param : speech title or in the future, self could be a json format of data set
			//	self.entity.exec(EntityAction.Server, _MSG_SPEECH_BEGIN_REQUEST, speechTitle);  
			//}			
		}
		else if(entityAction.name === _MSG_SPEECH_END)
        {
			// name, id, entity name, entity id
			self.setSpeechEnd(entityAction.parameters[0]);
        }
		else if(entityAction.name === _MSG_SPEECH_END_REQUEST)
		{
			self.prompSpeechMsg(2); // confirm if speaker wants to end the speech
		}
		// find user request
		else if(entityAction.name === _MSG_FOUND_USER)
        {
        }
		else if(entityAction.name === _MSG_NOT_FOUND_USER)
        {
			
        }
		// user enter/leave the speech area
		else if(entityAction.name === _MSG_USER_JOINED_VENUE)
		{
			self.numOfUsersInTheVenue = entityAction.parameters[0];
			self.changeScreenSize(entityAction.parameters[0]);
		}
		else if(entityAction.name === _MSG_USER_LEFT_VENUE)
		{
			self.numOfUsersInTheVenue = entityAction.parameters[0];
			self.changeScreenSize(entityAction.parameters[0]);
		}			
		// raycast tundra objects
		else if(entityAction.name === _MSG_RAYCAST)
		{
			//TODO

			Tundra.events.send(_MSG_MOUSE_HOVER);
			//console.log(self.raycastData[0].object.name);
			
		}
		else if(entityAction.name === _MSG_VOTE)
		{
			self.refreshVote(entityAction.parameters[0], entityAction.parameters[1]); // like, dislike
		}
		else if(entityAction.name === _MSG_SELECT_COORDINATOR)
		{
			console.log("coordinator info: "+entityAction.parameters[0]);
			self.coordinatorInfo = JSON.parse(entityAction.parameters[0]);
			// important!!
			// init callbacks of middleware to sync all the data
			if(self.isCoordinatorMe()){
				self.initMiddlewareCallbacks(self);
			}
		}
    }
};