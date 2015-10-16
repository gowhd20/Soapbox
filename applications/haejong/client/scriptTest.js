

if (Tundra === undefined)
    var Tundra = {};

Tundra.Application = function() {
	this.client = new Tundra.WebSocketClient();
	
};
Tundra.Application.prototype = {
	constructor: Tundra.Application,

    init: function() {
		this.loginData = {};
		
		this.host = "localhost"; // Address of the Tundra server
		this.port = 2345; // and port of the server
		
		function getRandomInt(min, max){
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
		this.loginData = {"name": Date.now().toString() + getRandomInt(0, 2000000).toString()};
	},
};

Tundra.Application.prototype.getRandomInt = function(min, max){
};



//this.app = new Tundra.Application();
//this.app.init();
//console.log(this.app);


