

this.app = new Tundra.Application();
this.app.init();
console.log(this.app.host, this.app.port, this.app.loginData);
this.app.client.connect(this.app.host, this.app.port, this.app.loginData);


var soapboxApp = IApplication.$extend(
{ 
    __init__ : function()
    {
		//LogInfo("client connected");
        this.$super("DualRealityOulu");

        this.data = {};

        // Listen for client/server sent entity actions
        this.entity.onEntityAction(this, this.onEntityAction);

        // Introduce client app to the server
        this.entity.exec(EntityAction.Server, _MSG_INTRODUCTION);
		test = Tundra.scene.entityByName("hotspot");
		console.log(test);
    },
	
	clientTest : function ()
	{
		console.log("client has been launched");
	},



    onEntityAction : function (entityAction)
    {
        if (entityAction.name === _MSG_INTRODUCTION)
        {
            this.log.info("Server messaged it is ready");
        }
    },
    onAssetTransferCompleted : function (asset)
    {
		LogInfo(" asset aquired");
        var obj = asset.data;
        console.log( "hotspot length is "+obj.hotspots.length );    
        LogInfo("asset loaded");
        for (var i = 0; i < obj.hotspots.length; i++)
        {
        
            console.log( "latitude is "+obj.hotspots[i].lat+" longitude is "+obj.hotspots[i].lon ); 
            
            //getting the position from the hotspot json object.
            var pos = Tundra.plugins.meshmoonGeo.coordinates.latLonToWorldPosition( parseFloat( obj.hotspots[i].lat ), parseFloat( obj.hotspots[i].lon ) );
            //debugger;
            console.log( "pos is ", pos);

            var entity = Tundra.scene.createLocalEntity(["Name", "Mesh", "Placeable"]);
 
            entity.name = obj.hotspots[i].instance_id;
              
            // NOT NEEDED WHEN oulu_lowdetail.txml is loaded

            entity.mesh.meshRef = "http://tundra-blueshift.s3.amazonaws.com/koste/ubihotspot/Cube.001.mesh";
            entity.mesh.materialRefs = [
                "http://tundra-blueshift.s3-eu-west-1.amazonaws.com/koste/ubihotspot/sides.material",
                "http://tundra-blueshift.s3-eu-west-1.amazonaws.com/koste/ubihotspot/front.material",
                "http://tundra-blueshift.s3-eu-west-1.amazonaws.com/koste/ubihotspot/back.material"
            ];

            entity.placeable.setPosition(new THREE.Vector3(pos.x, 1, pos.z));
            entity.placeable.setScale(new THREE.Vector3(1, 1, 1));
            entity.placeable.setRotation(new THREE.Vector3(0, 0, 0));
            

            
        }
    }

  

});

var soapboxApp = new soapboxApp();