/**
 * Loads a Wavefront .mtl file specifying materials
 *
 * @author angelxuanchang
 */
THREE.MTLLoader=function(a,b,c){this.baseUrl=a,this.options=b,this.crossOrigin=c},THREE.MTLLoader.prototype={constructor:THREE.MTLLoader,load:function(a,b,c,d){var e=this,f=new THREE.XHRLoader;f.setCrossOrigin(this.crossOrigin),f.load(a,function(a){b(e.parse(a))},c,d)},/**
	 * Parses loaded MTL file
	 * @param text - Content of MTL file
	 * @return {THREE.MTLLoader.MaterialCreator}
	 */
parse:function(a){for(var b=a.split("\n"),c={},d=/\s+/,e={},f=0;f<b.length;f++){var g=b[f];if(g=g.trim(),0!==g.length&&"#"!==g.charAt(0)){var h=g.indexOf(" "),i=h>=0?g.substring(0,h):g;i=i.toLowerCase();var j=h>=0?g.substring(h+1):"";if(j=j.trim(),"newmtl"===i)
// New material
c={name:j},e[j]=c;else if(c)if("ka"===i||"kd"===i||"ks"===i){var k=j.split(d,3);c[i]=[parseFloat(k[0]),parseFloat(k[1]),parseFloat(k[2])]}else c[i]=j}}var l=new THREE.MTLLoader.MaterialCreator(this.baseUrl,this.options);return l.crossOrigin=this.crossOrigin,l.setMaterials(e),l}},/**
 * Create a new THREE-MTLLoader.MaterialCreator
 * @param baseUrl - Url relative to which textures are loaded
 * @param options - Set of options on how to construct the materials
 *                  side: Which side to apply the material
 *                        THREE.FrontSide (default), THREE.BackSide, THREE.DoubleSide
 *                  wrap: What type of wrapping to apply for textures
 *                        THREE.RepeatWrapping (default), THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping
 *                  normalizeRGB: RGBs need to be normalized to 0-1 from 0-255
 *                                Default: false, assumed to be already normalized
 *                  ignoreZeroRGBs: Ignore values of RGBs (Ka,Kd,Ks) that are all 0's
 *                                  Default: false
 *                  invertTransparency: If transparency need to be inverted (inversion is needed if d = 0 is fully opaque)
 *                                      Default: false (d = 1 is fully opaque)
 * @constructor
 */
THREE.MTLLoader.MaterialCreator=function(a,b){this.baseUrl=a,this.options=b,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.side=this.options&&this.options.side?this.options.side:THREE.FrontSide,this.wrap=this.options&&this.options.wrap?this.options.wrap:THREE.RepeatWrapping},THREE.MTLLoader.MaterialCreator.prototype={constructor:THREE.MTLLoader.MaterialCreator,setMaterials:function(a){this.materialsInfo=this.convert(a),this.materials={},this.materialsArray=[],this.nameLookup={}},convert:function(a){if(!this.options)return a;var b={};for(var c in a){
// Convert materials info into normalized form based on options
var d=a[c],e={};b[c]=e;for(var f in d){var g=!0,h=d[f],i=f.toLowerCase();switch(i){case"kd":case"ka":case"ks":
// Diffuse color (color under white light) using RGB values
this.options&&this.options.normalizeRGB&&(h=[h[0]/255,h[1]/255,h[2]/255]),this.options&&this.options.ignoreZeroRGBs&&0===h[0]&&0===h[1]&&0===h[1]&&(
// ignore
g=!1);break;case"d":
// According to MTL format (http://paulbourke.net/dataformats/mtl/):
//   d is dissolve for current material
//   factor of 1.0 is fully opaque, a factor of 0 is fully dissolved (completely transparent)
this.options&&this.options.invertTransparency&&(h=1-h)}g&&(e[i]=h)}}return b},preload:function(){for(var a in this.materialsInfo)this.create(a)},getIndex:function(a){return this.nameLookup[a]},getAsArray:function(){var a=0;for(var b in this.materialsInfo)this.materialsArray[a]=this.create(b),this.nameLookup[b]=a,a++;return this.materialsArray},create:function(a){return void 0===this.materials[a]&&this.createMaterial_(a),this.materials[a]},createMaterial_:function(a){
// Create material
var b=this.materialsInfo[a],c={name:a,side:this.side};for(var d in b){var e=b[d];switch(d.toLowerCase()){
// Ns is material specular exponent
case"kd":
// Diffuse color (color under white light) using RGB values
c.diffuse=(new THREE.Color).fromArray(e);break;case"ka":
// Ambient color (color under shadow) using RGB values
break;case"ks":
// Specular color (color when light is reflected from shiny surface) using RGB values
c.specular=(new THREE.Color).fromArray(e);break;case"map_kd":
// Diffuse texture map
c.map=this.loadTexture(this.baseUrl+e),c.map.wrapS=this.wrap,c.map.wrapT=this.wrap;break;case"ns":
// The specular exponent (defines the focus of the specular highlight)
// A high exponent results in a tight, concentrated highlight. Ns values normally range from 0 to 1000.
c.shininess=e;break;case"d":
// According to MTL format (http://paulbourke.net/dataformats/mtl/):
//   d is dissolve for current material
//   factor of 1.0 is fully opaque, a factor of 0 is fully dissolved (completely transparent)
1>e&&(c.transparent=!0,c.opacity=e);break;case"map_bump":case"bump":
// Bump texture map
if(c.bumpMap)break;// Avoid loading twice.
c.bumpMap=this.loadTexture(this.baseUrl+e),c.bumpMap.wrapS=this.wrap,c.bumpMap.wrapT=this.wrap}}return c.diffuse&&(c.color=c.diffuse),this.materials[a]=new THREE.MeshPhongMaterial(c),this.materials[a]},loadTexture:function(a,b,c,d){var e,f=THREE.Loader.Handlers.get(a);return null!==f?e=f.load(a,c):(e=new THREE.Texture,f=new THREE.ImageLoader,f.crossOrigin=this.crossOrigin,f.load(a,function(a){e.image=THREE.MTLLoader.ensurePowerOfTwo_(a),e.needsUpdate=!0,c&&c(e)})),void 0!==b&&(e.mapping=b),e}},THREE.MTLLoader.ensurePowerOfTwo_=function(a){if(!THREE.Math.isPowerOfTwo(a.width)||!THREE.Math.isPowerOfTwo(a.height)){var b=document.createElement("canvas");b.width=THREE.MTLLoader.nextHighestPowerOfTwo_(a.width),b.height=THREE.MTLLoader.nextHighestPowerOfTwo_(a.height);var c=b.getContext("2d");return c.drawImage(a,0,0,a.width,a.height,0,0,b.width,b.height),b}return a},THREE.MTLLoader.nextHighestPowerOfTwo_=function(a){--a;for(var b=1;32>b;b<<=1)a|=a>>b;return a+1},THREE.EventDispatcher.prototype.apply(THREE.MTLLoader.prototype);