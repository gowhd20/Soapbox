
if (Soapbox == undefined)
	var Soapbox = {};
Soapbox.Dashboard = function() {
	console.log("Ui init");
	
};
Soapbox.Dashboard.prototype = {
	initUi : function(self){
        self.ui = {};
        self.ui.baseCSS = {
            "position" : "absolute",
            "padding"  : 25,
            "top" : 25,
            "left" : 25,
            "font-family" : "RobotoDraft, Arial",
            "color" : "white",
            "background-color" : "rgba(8,149,195,0.8)"
        };

        self.ui.welcome = $("<div/>", { text : "Welcome to the 'virtual_test' application" });
        self.ui.welcome.css(self.ui.baseCSS);
        self.ui.welcome.hide();

        self.framework.ui.addWidgetToScene(self.ui.welcome);
        self.ui.welcome.fadeIn(2000);

		/*************dashboard UI********************************/	
		
		// speech info
	    var infoDash = document.createElement('infoDash');
		self.infoDash = infoDash;
		self.infoDash.className = "infoDash";
		self.infoDash.id = "infoDash";
		
        $(infoDash).css({
            position: "absolute",
            "background-color" : "black",
            width: "300px",
            height: "100%",
            right: "0px",
        });
		document.body.appendChild(self.infoDash);
		$("infoDash").hide();
		
		var counter = document.createElement("b");
		self.counter = counter;
		counter.id = "counter";
		counter.style.color = "#ff0000";

		$(counter).css({
		    position: "absolute",
            "background-color" : "black",
            width: "100%",
            height: "30px",
			top : "10px",
			left: "10%",
			fontSize: "25px"

		});
		infoDash.appendChild(counter);
		
		var infoDashHead = document.createElement("b");
		infoDashHead.id = "infoDashHead";			
		$(infoDashHead).css({
			position : "absolute",
			color : "white",
			top: "10%",
			left: "25%",
			fontSize: "20px"				
		});	
		
		infoDashHead.innerHTML = "Speech info";
		infoDash.appendChild(infoDashHead);
		
		var titleInput = document.createElement("input");
		titleInput.id = "titleInput";			
		$(titleInput).css({
		    position: "relative",
            "background-color" : "white",
            width: "100%",
            height: "30px",
			top: "14%"			
		});	
		infoDash.appendChild(titleInput);
		
		var descriptionInput = document.createElement("textArea");
		descriptionInput.id = "descriptionInput";
		descriptionInput.rows = "14";
		
		$(descriptionInput).css({
		    position: "relative",
            "background-color" : "white",
            width: "100%",
			top: "16%"			
		});	
		infoDash.appendChild(descriptionInput);
		
		// submit speech info button
		var submitSpeechInfoBtn = document.createElement("button");		
		submitSpeechInfoBtn.appendChild(document.createTextNode("Submit"));
		submitSpeechInfoBtn.setAttribute("type", "button");
		submitSpeechInfoBtn.id = "submitSpeechInfoBtn";
		
		$(submitSpeechInfoBtn).css({
			position : "absolute",
			"background-color" : "white",
			top : "60%",
			width: "100px",
			left : "30px"
			
		});
		infoDash.appendChild(submitSpeechInfoBtn);
		$(titleInput).change(function(e){$(descriptionInput).focus()});
		$(descriptionInput).change(function(e){$(submitSpeechInfoBtn).focus()});
	
		// submit speech info
		$(submitSpeechInfoBtn).click(function(){
			var speechInfoValues = {
					"name":"", 
					"title":document.getElementById("titleInput").value, 
					"description":document.getElementById("descriptionInput").value,
					"startTime":"", 
					"origin":"virtual"
				};
			// speech info to send to the middleware
			//self.speechInfo.description = speechInfoValues.description;

			self.entity.exec(EntityAction.Server, _MSG_SPEECH_BEGIN_REQUEST, speechInfoValues);
			//document.getElementById("titleInput").value = "";
			//document.getElementById("descriptionInput").value = "";
		});

		// empty edit box when user click on edit box
		$(titleInput).click(function(){
			document.getElementById("titleInput").value = "";
		})
		$(descriptionInput).click(function(){
			document.getElementById("descriptionInput").value = "";
		})
		
		// dashboard
	    var dashboard = document.createElement('dashboard');
		self.dashboard = dashboard;
		self.dashboard.className = "dashboard";
		self.dashboard.id = "dashboard";
		
        $(self.dashboard).css({
            position: "absolute",
            "background-color" : "black",
            width: "300px",
            height: "100%",
            right: "0px",
			//opacity: 0.5,
			//filter: "alpha(opacity=50)" /* For IE8 and earlier */
        });
		//self.dashboard.style.overflow = "scroll";
		document.body.appendChild(self.dashboard);

		var audioVisualizingBoard = document.createElement("canvas");
		audioVisualizingBoard.id = "audioVisualizingBoard";

		$(audioVisualizingBoard).css({
			position: "absolute",
			"background-color" : "black",
			width: "100%",
			height: "100px",
			top : "80px"
		})
		dashboard.appendChild(audioVisualizingBoard);
		audioVisualizingBoard.hidden = true;

		var micRangeBar = document.createElement("input");
		micRangeBar.setAttribute("type", "range");
		micRangeBar.setAttribute("min", 0);
		micRangeBar.setAttribute("max", 1);
		micRangeBar.setAttribute("step", 0.01);
		micRangeBar.id = "micRangeBar";

		$(micRangeBar).css({
			position: "absolute",
			"background-color": "black",
			width: "25%",
			height: "30px",
			top : "200px",
			left: "10px"
		})
		dashboard.appendChild(micRangeBar);
		micRangeBar.hidden = true;

		var speechTimeLimit = document.createElement("b");
		self.speechTimeLimit = speechTimeLimit;
		speechTimeLimit.id = "speechTimeLimit";
		speechTimeLimit.style.color = "#ffffff";

		$(speechTimeLimit).css({
		    position: "absolute",
            "background-color" : "black",
			width: "70%",
			height: "50px",
			top : "200px",
			right: "0px",
			fontSize: "25px"
		});
		dashboard.appendChild(speechTimeLimit);
		
		// vote status panel
		var votePanel = document.createElement("div");
		votePanel = votePanel;
		votePanel.id = "votePanel";
		
		$(votePanel).css({
		    position: "absolute",
            "background-color" : "white",
            width: "100%",
            height: "40px",
			top : "20px"

		});
		self.dashboard.appendChild(votePanel);
		
		// like and dislike
		var voteType = document.createElement("b");
		voteType.id = "voteType";			
		$(voteType).css({
			position : "relative",
			height : "50%",
			color : "black",
			left : "30px"
			//font-weight : "bold"				
		});	
		votePanel.appendChild(voteType);
			
		// comment text input
		var txtInput = document.createElement("input");
		txtInput.setAttribute("type", "text");
		txtInput.id = "commentInput"
		
		$(txtInput).css({
		    position: "absolute",
            "background-color" : "white",
            width: "100%",
            height: "30px",
			bottom : "100px"

		});
		self.dashboard.appendChild(txtInput); // put it into the DOM
		
		// send comment button
		var sendCommBtn = document.createElement("button");		
		sendCommBtn.appendChild(document.createTextNode("Send comment"));
		sendCommBtn.setAttribute("type", "submit-button");
		sendCommBtn.id = "commentBtn";
		
		$(sendCommBtn).css({
			position : "absolute",
			"background-color" : "white",
			bottom : "55px",
			width: "100px",
			left : "30px"
			
		});
		self.dashboard.appendChild(sendCommBtn);
		// this will automate comment sending button
		$(txtInput).change(function(e) {
			$(sendCommBtn).focus();
		});
			
		// teleport to the speech venue
		var teleportBtn = document.createElement("button");

		teleportBtn.appendChild(document.createTextNode("Teleport to the venue"));
		teleportBtn.setAttribute("type", "button");
		teleportBtn.id = "teleportBtn";
		
		$(teleportBtn).css({
			position : "absolute",
			"background-color" : "white",
			bottom : "55px",
			width: "100px",
			right : "20px"
			
		});
		self.dashboard.appendChild(teleportBtn);

		var endSpeechBtn = document.createElement("button");

		endSpeechBtn.appendChild(document.createTextNode("End speech"));
		endSpeechBtn.setAttribute("type", "button");
		endSpeechBtn.id = "endSpeechBtn";
		
		$(endSpeechBtn).css({
			position : "absolute",
			"background-color" : "white",
			bottom : "55px",
			width: "100px",
			right : "20px"
			
		});
		self.dashboard.appendChild(endSpeechBtn);
		endSpeechBtn.hidden = true;
		
		// div for comment area
		var commentDiv = document.createElement("div");
		commentDiv.id = "commentDiv";
		commentDiv.style.overflowY = "scroll";
		
		$(commentDiv).css({
			position : "absolute",
			bottom : "150px",
			width : "100%",
			height : "50%",
			background : "white",		
		});
		
		self.dashboard.appendChild(commentDiv);	
			
		// comment btn clicked
		$(sendCommBtn).click(function(){
			var v = document.getElementById("commentInput");
			
			self.virtual.comment(self.userInfo.name+self.userInfo.id, v.value);
			self.entity.exec(EntityAction.Server, 
				_MSG_COMMENTS, 
				{"userName":self.userInfo.name+self.userInfo.id, "comment":v.value, "origin":"virtual"});

			v.value = "";
		});
		
		// teleport btn clicked
		$(teleportBtn).click(function(){
			self.onClickTeleport();
		});

		// end speech button clicked
		$(endSpeechBtn).click(function(){
			self.promptSpeechMsg(2);	// confirm if the speaker wants to end the speech
		});

		$("dashboard").hide();
		/**********************************************************/
    }
};
