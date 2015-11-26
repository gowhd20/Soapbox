// File:src/Three.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
var THREE={REVISION:"68"};
// browserify support
"object"==typeof module&&(module.exports=THREE),
// GL STATE CONSTANTS
THREE.CullFaceNone=0,THREE.CullFaceBack=1,THREE.CullFaceFront=2,THREE.CullFaceFrontBack=3,THREE.FrontFaceDirectionCW=0,THREE.FrontFaceDirectionCCW=1,
// SHADOWING TYPES
THREE.BasicShadowMap=0,THREE.PCFShadowMap=1,THREE.PCFSoftShadowMap=2,
// MATERIAL CONSTANTS
// side
THREE.FrontSide=0,THREE.BackSide=1,THREE.DoubleSide=2,
// shading
THREE.NoShading=0,THREE.FlatShading=1,THREE.SmoothShading=2,
// colors
THREE.NoColors=0,THREE.FaceColors=1,THREE.VertexColors=2,
// blending modes
THREE.NoBlending=0,THREE.NormalBlending=1,THREE.AdditiveBlending=2,THREE.SubtractiveBlending=3,THREE.MultiplyBlending=4,THREE.CustomBlending=5,
// custom blending equations
// (numbers start from 100 not to clash with other
//  mappings to OpenGL constants defined in Texture.js)
THREE.AddEquation=100,THREE.SubtractEquation=101,THREE.ReverseSubtractEquation=102,
// custom blending destination factors
THREE.ZeroFactor=200,THREE.OneFactor=201,THREE.SrcColorFactor=202,THREE.OneMinusSrcColorFactor=203,THREE.SrcAlphaFactor=204,THREE.OneMinusSrcAlphaFactor=205,THREE.DstAlphaFactor=206,THREE.OneMinusDstAlphaFactor=207,
// custom blending source factors
//THREE.ZeroFactor = 200;
//THREE.OneFactor = 201;
//THREE.SrcAlphaFactor = 204;
//THREE.OneMinusSrcAlphaFactor = 205;
//THREE.DstAlphaFactor = 206;
//THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor=208,THREE.OneMinusDstColorFactor=209,THREE.SrcAlphaSaturateFactor=210,
// TEXTURE CONSTANTS
THREE.MultiplyOperation=0,THREE.MixOperation=1,THREE.AddOperation=2,
// Mapping modes
THREE.UVMapping=function(){},THREE.CubeReflectionMapping=function(){},THREE.CubeRefractionMapping=function(){},THREE.SphericalReflectionMapping=function(){},THREE.SphericalRefractionMapping=function(){},
// Wrapping modes
THREE.RepeatWrapping=1e3,THREE.ClampToEdgeWrapping=1001,THREE.MirroredRepeatWrapping=1002,
// Filters
THREE.NearestFilter=1003,THREE.NearestMipMapNearestFilter=1004,THREE.NearestMipMapLinearFilter=1005,THREE.LinearFilter=1006,THREE.LinearMipMapNearestFilter=1007,THREE.LinearMipMapLinearFilter=1008,
// Data types
THREE.UnsignedByteType=1009,THREE.ByteType=1010,THREE.ShortType=1011,THREE.UnsignedShortType=1012,THREE.IntType=1013,THREE.UnsignedIntType=1014,THREE.FloatType=1015,
// Pixel types
//THREE.UnsignedByteType = 1009;
THREE.UnsignedShort4444Type=1016,THREE.UnsignedShort5551Type=1017,THREE.UnsignedShort565Type=1018,
// Pixel formats
THREE.AlphaFormat=1019,THREE.RGBFormat=1020,THREE.RGBAFormat=1021,THREE.LuminanceFormat=1022,THREE.LuminanceAlphaFormat=1023,
// Compressed texture formats
THREE.RGB_S3TC_DXT1_Format=2001,THREE.RGBA_S3TC_DXT1_Format=2002,THREE.RGBA_S3TC_DXT3_Format=2003,THREE.RGBA_S3TC_DXT5_Format=2004,/*
// Potential future PVRTC compressed texture formats
THREE.RGB_PVRTC_4BPPV1_Format = 2100;
THREE.RGB_PVRTC_2BPPV1_Format = 2101;
THREE.RGBA_PVRTC_4BPPV1_Format = 2102;
THREE.RGBA_PVRTC_2BPPV1_Format = 2103;
*/
// File:src/math/Color.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.Color=function(a){return 3===arguments.length?this.setRGB(arguments[0],arguments[1],arguments[2]):this.set(a)},THREE.Color.prototype={constructor:THREE.Color,r:1,g:1,b:1,set:function(a){return a instanceof THREE.Color?this.copy(a):"number"==typeof a?this.setHex(a):"string"==typeof a&&this.setStyle(a),this},setHex:function(a){return a=Math.floor(a),this.r=(a>>16&255)/255,this.g=(a>>8&255)/255,this.b=(255&a)/255,this},setRGB:function(a,b,c){return this.r=a,this.g=b,this.b=c,this},setHSL:function(a,b,c){
// h,s,l ranges are in 0.0 - 1.0
if(0===b)this.r=this.g=this.b=c;else{var d=function(a,b,c){return 0>c&&(c+=1),c>1&&(c-=1),1/6>c?a+6*(b-a)*c:.5>c?b:2/3>c?a+6*(b-a)*(2/3-c):a},e=.5>=c?c*(1+b):c+b-c*b,f=2*c-e;this.r=d(f,e,a+1/3),this.g=d(f,e,a),this.b=d(f,e,a-1/3)}return this},setStyle:function(a){
// rgb(255,0,0)
if(/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(a)){var b=/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(a);return this.r=Math.min(255,parseInt(b[1],10))/255,this.g=Math.min(255,parseInt(b[2],10))/255,this.b=Math.min(255,parseInt(b[3],10))/255,this}
// rgb(100%,0%,0%)
if(/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(a)){var b=/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(a);return this.r=Math.min(100,parseInt(b[1],10))/100,this.g=Math.min(100,parseInt(b[2],10))/100,this.b=Math.min(100,parseInt(b[3],10))/100,this}
// #ff0000
if(/^\#([0-9a-f]{6})$/i.test(a)){var b=/^\#([0-9a-f]{6})$/i.exec(a);return this.setHex(parseInt(b[1],16)),this}
// #f00
if(/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(a)){var b=/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a);return this.setHex(parseInt(b[1]+b[1]+b[2]+b[2]+b[3]+b[3],16)),this}
// red
// red
return/^(\w+)$/i.test(a)?(this.setHex(THREE.ColorKeywords[a]),this):void 0},copy:function(a){return this.r=a.r,this.g=a.g,this.b=a.b,this},copyGammaToLinear:function(a){return this.r=a.r*a.r,this.g=a.g*a.g,this.b=a.b*a.b,this},copyLinearToGamma:function(a){return this.r=Math.sqrt(a.r),this.g=Math.sqrt(a.g),this.b=Math.sqrt(a.b),this},convertGammaToLinear:function(){var a=this.r,b=this.g,c=this.b;return this.r=a*a,this.g=b*b,this.b=c*c,this},convertLinearToGamma:function(){return this.r=Math.sqrt(this.r),this.g=Math.sqrt(this.g),this.b=Math.sqrt(this.b),this},getHex:function(){return 255*this.r<<16^255*this.g<<8^255*this.b<<0},getHexString:function(){return("000000"+this.getHex().toString(16)).slice(-6)},getHSL:function(a){
// h,s,l ranges are in 0.0 - 1.0
var b,c,d=a||{h:0,s:0,l:0},e=this.r,f=this.g,g=this.b,h=Math.max(e,f,g),i=Math.min(e,f,g),j=(i+h)/2;if(i===h)b=0,c=0;else{var k=h-i;switch(c=.5>=j?k/(h+i):k/(2-h-i),h){case e:b=(f-g)/k+(g>f?6:0);break;case f:b=(g-e)/k+2;break;case g:b=(e-f)/k+4}b/=6}return d.h=b,d.s=c,d.l=j,d},getStyle:function(){return"rgb("+(255*this.r|0)+","+(255*this.g|0)+","+(255*this.b|0)+")"},offsetHSL:function(a,b,c){var d=this.getHSL();return d.h+=a,d.s+=b,d.l+=c,this.setHSL(d.h,d.s,d.l),this},add:function(a){return this.r+=a.r,this.g+=a.g,this.b+=a.b,this},addColors:function(a,b){return this.r=a.r+b.r,this.g=a.g+b.g,this.b=a.b+b.b,this},addScalar:function(a){return this.r+=a,this.g+=a,this.b+=a,this},multiply:function(a){return this.r*=a.r,this.g*=a.g,this.b*=a.b,this},multiplyScalar:function(a){return this.r*=a,this.g*=a,this.b*=a,this},lerp:function(a,b){return this.r+=(a.r-this.r)*b,this.g+=(a.g-this.g)*b,this.b+=(a.b-this.b)*b,this},equals:function(a){return a.r===this.r&&a.g===this.g&&a.b===this.b},fromArray:function(a){return this.r=a[0],this.g=a[1],this.b=a[2],this},toArray:function(){return[this.r,this.g,this.b]},clone:function(){return(new THREE.Color).setRGB(this.r,this.g,this.b)}},THREE.ColorKeywords={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},
// File:src/math/Quaternion.js
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */
THREE.Quaternion=function(a,b,c,d){this._x=a||0,this._y=b||0,this._z=c||0,this._w=void 0!==d?d:1},THREE.Quaternion.prototype={constructor:THREE.Quaternion,_x:0,_y:0,_z:0,_w:0,get x(){return this._x},set x(a){this._x=a,this.onChangeCallback()},get y(){return this._y},set y(a){this._y=a,this.onChangeCallback()},get z(){return this._z},set z(a){this._z=a,this.onChangeCallback()},get w(){return this._w},set w(a){this._w=a,this.onChangeCallback()},set:function(a,b,c,d){return this._x=a,this._y=b,this._z=c,this._w=d,this.onChangeCallback(),this},copy:function(a){return this._x=a.x,this._y=a.y,this._z=a.z,this._w=a.w,this.onChangeCallback(),this},setFromEuler:function(a,b){if(a instanceof THREE.Euler==!1)throw new Error("THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
// http://www.mathworks.com/matlabcentral/fileexchange/
// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
//	content/SpinCalc.m
var c=Math.cos(a._x/2),d=Math.cos(a._y/2),e=Math.cos(a._z/2),f=Math.sin(a._x/2),g=Math.sin(a._y/2),h=Math.sin(a._z/2);return"XYZ"===a.order?(this._x=f*d*e+c*g*h,this._y=c*g*e-f*d*h,this._z=c*d*h+f*g*e,this._w=c*d*e-f*g*h):"YXZ"===a.order?(this._x=f*d*e+c*g*h,this._y=c*g*e-f*d*h,this._z=c*d*h-f*g*e,this._w=c*d*e+f*g*h):"ZXY"===a.order?(this._x=f*d*e-c*g*h,this._y=c*g*e+f*d*h,this._z=c*d*h+f*g*e,this._w=c*d*e-f*g*h):"ZYX"===a.order?(this._x=f*d*e-c*g*h,this._y=c*g*e+f*d*h,this._z=c*d*h-f*g*e,this._w=c*d*e+f*g*h):"YZX"===a.order?(this._x=f*d*e+c*g*h,this._y=c*g*e+f*d*h,this._z=c*d*h-f*g*e,this._w=c*d*e-f*g*h):"XZY"===a.order&&(this._x=f*d*e-c*g*h,this._y=c*g*e-f*d*h,this._z=c*d*h+f*g*e,this._w=c*d*e+f*g*h),b!==!1&&this.onChangeCallback(),this},setFromAxisAngle:function(a,b){
// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
// assumes axis is normalized
var c=b/2,d=Math.sin(c);return this._x=a.x*d,this._y=a.y*d,this._z=a.z*d,this._w=Math.cos(c),this.onChangeCallback(),this},setFromRotationMatrix:function(a){
// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
var b,c=a.elements,d=c[0],e=c[4],f=c[8],g=c[1],h=c[5],i=c[9],j=c[2],k=c[6],l=c[10],m=d+h+l;return m>0?(b=.5/Math.sqrt(m+1),this._w=.25/b,this._x=(k-i)*b,this._y=(f-j)*b,this._z=(g-e)*b):d>h&&d>l?(b=2*Math.sqrt(1+d-h-l),this._w=(k-i)/b,this._x=.25*b,this._y=(e+g)/b,this._z=(f+j)/b):h>l?(b=2*Math.sqrt(1+h-d-l),this._w=(f-j)/b,this._x=(e+g)/b,this._y=.25*b,this._z=(i+k)/b):(b=2*Math.sqrt(1+l-d-h),this._w=(g-e)/b,this._x=(f+j)/b,this._y=(i+k)/b,this._z=.25*b),this.onChangeCallback(),this},setFromUnitVectors:function(){
// http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final
// assumes direction vectors vFrom and vTo are normalized
var a,b,c=1e-6;return function(d,e){return void 0===a&&(a=new THREE.Vector3),b=d.dot(e)+1,c>b?(b=0,Math.abs(d.x)>Math.abs(d.z)?a.set(-d.y,d.x,0):a.set(0,-d.z,d.y)):a.crossVectors(d,e),this._x=a.x,this._y=a.y,this._z=a.z,this._w=b,this.normalize(),this}}(),inverse:function(){return this.conjugate().normalize(),this},conjugate:function(){return this._x*=-1,this._y*=-1,this._z*=-1,this.onChangeCallback(),this},dot:function(a){return this._x*a._x+this._y*a._y+this._z*a._z+this._w*a._w},lengthSq:function(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w},length:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)},normalize:function(){var a=this.length();return 0===a?(this._x=0,this._y=0,this._z=0,this._w=1):(a=1/a,this._x=this._x*a,this._y=this._y*a,this._z=this._z*a,this._w=this._w*a),this.onChangeCallback(),this},multiply:function(a,b){return void 0!==b?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(a,b)):this.multiplyQuaternions(this,a)},multiplyQuaternions:function(a,b){
// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
var c=a._x,d=a._y,e=a._z,f=a._w,g=b._x,h=b._y,i=b._z,j=b._w;return this._x=c*j+f*g+d*i-e*h,this._y=d*j+f*h+e*g-c*i,this._z=e*j+f*i+c*h-d*g,this._w=f*j-c*g-d*h-e*i,this.onChangeCallback(),this},multiplyVector3:function(a){return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."),a.applyQuaternion(this)},slerp:function(a,b){var c=this._x,d=this._y,e=this._z,f=this._w,g=f*a._w+c*a._x+d*a._y+e*a._z;if(0>g?(this._w=-a._w,this._x=-a._x,this._y=-a._y,this._z=-a._z,g=-g):this.copy(a),g>=1)return this._w=f,this._x=c,this._y=d,this._z=e,this;var h=Math.acos(g),i=Math.sqrt(1-g*g);if(Math.abs(i)<.001)return this._w=.5*(f+this._w),this._x=.5*(c+this._x),this._y=.5*(d+this._y),this._z=.5*(e+this._z),this;var j=Math.sin((1-b)*h)/i,k=Math.sin(b*h)/i;return this._w=f*j+this._w*k,this._x=c*j+this._x*k,this._y=d*j+this._y*k,this._z=e*j+this._z*k,this.onChangeCallback(),this},equals:function(a){return a._x===this._x&&a._y===this._y&&a._z===this._z&&a._w===this._w},fromArray:function(a){return this._x=a[0],this._y=a[1],this._z=a[2],this._w=a[3],this.onChangeCallback(),this},toArray:function(){return[this._x,this._y,this._z,this._w]},onChange:function(a){return this.onChangeCallback=a,this},onChangeCallback:function(){},clone:function(){return new THREE.Quaternion(this._x,this._y,this._z,this._w)}},THREE.Quaternion.slerp=function(a,b,c,d){return c.copy(a).slerp(b,d)},
// File:src/math/Vector2.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */
THREE.Vector2=function(a,b){this.x=a||0,this.y=b||0},THREE.Vector2.prototype={constructor:THREE.Vector2,set:function(a,b){return this.x=a,this.y=b,this},setX:function(a){return this.x=a,this},setY:function(a){return this.y=a,this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;default:throw new Error("index is out of range: "+a)}},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+a)}},copy:function(a){return this.x=a.x,this.y=a.y,this},add:function(a,b){return void 0!==b?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b)):(this.x+=a.x,this.y+=a.y,this)},addVectors:function(a,b){return this.x=a.x+b.x,this.y=a.y+b.y,this},addScalar:function(a){return this.x+=a,this.y+=a,this},sub:function(a,b){return void 0!==b?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(a,b)):(this.x-=a.x,this.y-=a.y,this)},subVectors:function(a,b){return this.x=a.x-b.x,this.y=a.y-b.y,this},multiply:function(a){return this.x*=a.x,this.y*=a.y,this},multiplyScalar:function(a){return this.x*=a,this.y*=a,this},divide:function(a){return this.x/=a.x,this.y/=a.y,this},divideScalar:function(a){if(0!==a){var b=1/a;this.x*=b,this.y*=b}else this.x=0,this.y=0;return this},min:function(a){return this.x>a.x&&(this.x=a.x),this.y>a.y&&(this.y=a.y),this},max:function(a){return this.x<a.x&&(this.x=a.x),this.y<a.y&&(this.y=a.y),this},clamp:function(a,b){
// This function assumes min < max, if this assumption isn't true it will not operate correctly
return this.x<a.x?this.x=a.x:this.x>b.x&&(this.x=b.x),this.y<a.y?this.y=a.y:this.y>b.y&&(this.y=b.y),this},clampScalar:function(){var a,b;return function(c,d){return void 0===a&&(a=new THREE.Vector2,b=new THREE.Vector2),a.set(c,c),b.set(d,d),this.clamp(a,b)}}(),floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},roundToZero:function(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this},negate:function(){return this.x=-this.x,this.y=-this.y,this},dot:function(a){return this.x*a.x+this.y*a.y},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},normalize:function(){return this.divideScalar(this.length())},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){var b=this.x-a.x,c=this.y-a.y;return b*b+c*c},setLength:function(a){var b=this.length();return 0!==b&&a!==b&&this.multiplyScalar(a/b),this},lerp:function(a,b){return this.x+=(a.x-this.x)*b,this.y+=(a.y-this.y)*b,this},equals:function(a){return a.x===this.x&&a.y===this.y},fromArray:function(a){return this.x=a[0],this.y=a[1],this},toArray:function(){return[this.x,this.y]},clone:function(){return new THREE.Vector2(this.x,this.y)}},
// File:src/math/Vector3.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author *kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */
THREE.Vector3=function(a,b,c){this.x=a||0,this.y=b||0,this.z=c||0},THREE.Vector3.prototype={constructor:THREE.Vector3,
// @note WebRocket hack for missing functioin, should be in latest versions once three.js is updated!
unproject:function(){var a;return function(b){return void 0===a&&(a=new THREE.Matrix4),a.multiplyMatrices(b.matrixWorld,a.getInverse(b.projectionMatrix)),this.applyProjection(a)}}(),
/////////////////////////////////////////////////////////////////////////////////////////////////////
set:function(a,b,c){return this.x=a,this.y=b,this.z=c,this},setX:function(a){return this.x=a,this},setY:function(a){return this.y=a,this},setZ:function(a){return this.z=a,this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;case 2:this.z=b;break;default:throw new Error("index is out of range: "+a)}},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+a)}},copy:function(a){return this.x=a.x,this.y=a.y,this.z=a.z,this},add:function(a,b){return void 0!==b?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b)):(this.x+=a.x,this.y+=a.y,this.z+=a.z,this)},addScalar:function(a){return this.x+=a,this.y+=a,this.z+=a,this},addVectors:function(a,b){return this.x=a.x+b.x,this.y=a.y+b.y,this.z=a.z+b.z,this},sub:function(a,b){return void 0!==b?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(a,b)):(this.x-=a.x,this.y-=a.y,this.z-=a.z,this)},subVectors:function(a,b){return this.x=a.x-b.x,this.y=a.y-b.y,this.z=a.z-b.z,this},multiply:function(a,b){return void 0!==b?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(a,b)):(this.x*=a.x,this.y*=a.y,this.z*=a.z,this)},multiplyScalar:function(a){return this.x*=a,this.y*=a,this.z*=a,this},multiplyVectors:function(a,b){return this.x=a.x*b.x,this.y=a.y*b.y,this.z=a.z*b.z,this},applyEuler:function(){var a;return function(b){return b instanceof THREE.Euler==!1&&console.error("THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order."),void 0===a&&(a=new THREE.Quaternion),this.applyQuaternion(a.setFromEuler(b)),this}}(),applyAxisAngle:function(){var a;return function(b,c){return void 0===a&&(a=new THREE.Quaternion),this.applyQuaternion(a.setFromAxisAngle(b,c)),this}}(),applyMatrix3:function(a){var b=this.x,c=this.y,d=this.z,e=a.elements;return this.x=e[0]*b+e[3]*c+e[6]*d,this.y=e[1]*b+e[4]*c+e[7]*d,this.z=e[2]*b+e[5]*c+e[8]*d,this},applyMatrix4:function(a){
// input: THREE.Matrix4 affine matrix
var b=this.x,c=this.y,d=this.z,e=a.elements;return this.x=e[0]*b+e[4]*c+e[8]*d+e[12],this.y=e[1]*b+e[5]*c+e[9]*d+e[13],this.z=e[2]*b+e[6]*c+e[10]*d+e[14],this},applyProjection:function(a){
// input: THREE.Matrix4 projection matrix
var b=this.x,c=this.y,d=this.z,e=a.elements,f=1/(e[3]*b+e[7]*c+e[11]*d+e[15]);// perspective divide
return this.x=(e[0]*b+e[4]*c+e[8]*d+e[12])*f,this.y=(e[1]*b+e[5]*c+e[9]*d+e[13])*f,this.z=(e[2]*b+e[6]*c+e[10]*d+e[14])*f,this},applyQuaternion:function(a){var b=this.x,c=this.y,d=this.z,e=a.x,f=a.y,g=a.z,h=a.w,i=h*b+f*d-g*c,j=h*c+g*b-e*d,k=h*d+e*c-f*b,l=-e*b-f*c-g*d;
// calculate result * inverse quat
return this.x=i*h+l*-e+j*-g-k*-f,this.y=j*h+l*-f+k*-e-i*-g,this.z=k*h+l*-g+i*-f-j*-e,this},transformDirection:function(a){
// input: THREE.Matrix4 affine matrix
// vector interpreted as a direction
var b=this.x,c=this.y,d=this.z,e=a.elements;return this.x=e[0]*b+e[4]*c+e[8]*d,this.y=e[1]*b+e[5]*c+e[9]*d,this.z=e[2]*b+e[6]*c+e[10]*d,this.normalize(),this},divide:function(a){return this.x/=a.x,this.y/=a.y,this.z/=a.z,this},divideScalar:function(a){if(0!==a){var b=1/a;this.x*=b,this.y*=b,this.z*=b}else this.x=0,this.y=0,this.z=0;return this},min:function(a){return this.x>a.x&&(this.x=a.x),this.y>a.y&&(this.y=a.y),this.z>a.z&&(this.z=a.z),this},max:function(a){return this.x<a.x&&(this.x=a.x),this.y<a.y&&(this.y=a.y),this.z<a.z&&(this.z=a.z),this},clamp:function(a,b){
// This function assumes min < max, if this assumption isn't true it will not operate correctly
return this.x<a.x?this.x=a.x:this.x>b.x&&(this.x=b.x),this.y<a.y?this.y=a.y:this.y>b.y&&(this.y=b.y),this.z<a.z?this.z=a.z:this.z>b.z&&(this.z=b.z),this},clampScalar:function(){var a,b;return function(c,d){return void 0===a&&(a=new THREE.Vector3,b=new THREE.Vector3),a.set(c,c,c),b.set(d,d,d),this.clamp(a,b)}}(),floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this},ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this},round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this},roundToZero:function(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this},negate:function(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},lengthManhattan:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)},normalize:function(){return this.divideScalar(this.length())},setLength:function(a){var b=this.length();return 0!==b&&a!==b&&this.multiplyScalar(a/b),this},lerp:function(a,b){return this.x+=(a.x-this.x)*b,this.y+=(a.y-this.y)*b,this.z+=(a.z-this.z)*b,this},cross:function(a,b){if(void 0!==b)return console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(a,b);var c=this.x,d=this.y,e=this.z;return this.x=d*a.z-e*a.y,this.y=e*a.x-c*a.z,this.z=c*a.y-d*a.x,this},crossVectors:function(a,b){var c=a.x,d=a.y,e=a.z,f=b.x,g=b.y,h=b.z;return this.x=d*h-e*g,this.y=e*f-c*h,this.z=c*g-d*f,this},projectOnVector:function(){var a,b;return function(c){return void 0===a&&(a=new THREE.Vector3),a.copy(c).normalize(),b=this.dot(a),this.copy(a).multiplyScalar(b)}}(),projectOnPlane:function(){var a;return function(b){return void 0===a&&(a=new THREE.Vector3),a.copy(this).projectOnVector(b),this.sub(a)}}(),reflect:function(){
// reflect incident vector off plane orthogonal to normal
// normal is assumed to have unit length
var a;return function(b){return void 0===a&&(a=new THREE.Vector3),this.sub(a.copy(b).multiplyScalar(2*this.dot(b)))}}(),angleTo:function(a){var b=this.dot(a)/(this.length()*a.length());
// clamp, to handle numerical problems
return Math.acos(THREE.Math.clamp(b,-1,1))},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){var b=this.x-a.x,c=this.y-a.y,d=this.z-a.z;return b*b+c*c+d*d},setEulerFromRotationMatrix:function(a,b){console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")},setEulerFromQuaternion:function(a,b){console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")},getPositionFromMatrix:function(a){return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."),this.setFromMatrixPosition(a)},getScaleFromMatrix:function(a){return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."),this.setFromMatrixScale(a)},getColumnFromMatrix:function(a,b){return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."),this.setFromMatrixColumn(a,b)},setFromMatrixPosition:function(a){return this.x=a.elements[12],this.y=a.elements[13],this.z=a.elements[14],this},setFromMatrixScale:function(a){var b=this.set(a.elements[0],a.elements[1],a.elements[2]).length(),c=this.set(a.elements[4],a.elements[5],a.elements[6]).length(),d=this.set(a.elements[8],a.elements[9],a.elements[10]).length();return this.x=b,this.y=c,this.z=d,this},setFromMatrixColumn:function(a,b){var c=4*a,d=b.elements;return this.x=d[c],this.y=d[c+1],this.z=d[c+2],this},equals:function(a){return a.x===this.x&&a.y===this.y&&a.z===this.z},fromArray:function(a){return this.x=a[0],this.y=a[1],this.z=a[2],this},toArray:function(){return[this.x,this.y,this.z]},clone:function(){return new THREE.Vector3(this.x,this.y,this.z)}},
// File:src/math/Vector4.js
/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */
THREE.Vector4=function(a,b,c,d){this.x=a||0,this.y=b||0,this.z=c||0,this.w=void 0!==d?d:1},THREE.Vector4.prototype={constructor:THREE.Vector4,set:function(a,b,c,d){return this.x=a,this.y=b,this.z=c,this.w=d,this},setX:function(a){return this.x=a,this},setY:function(a){return this.y=a,this},setZ:function(a){return this.z=a,this},setW:function(a){return this.w=a,this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;case 2:this.z=b;break;case 3:this.w=b;break;default:throw new Error("index is out of range: "+a)}},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+a)}},copy:function(a){return this.x=a.x,this.y=a.y,this.z=a.z,this.w=void 0!==a.w?a.w:1,this},add:function(a,b){return void 0!==b?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b)):(this.x+=a.x,this.y+=a.y,this.z+=a.z,this.w+=a.w,this)},addScalar:function(a){return this.x+=a,this.y+=a,this.z+=a,this.w+=a,this},addVectors:function(a,b){return this.x=a.x+b.x,this.y=a.y+b.y,this.z=a.z+b.z,this.w=a.w+b.w,this},sub:function(a,b){return void 0!==b?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(a,b)):(this.x-=a.x,this.y-=a.y,this.z-=a.z,this.w-=a.w,this)},subVectors:function(a,b){return this.x=a.x-b.x,this.y=a.y-b.y,this.z=a.z-b.z,this.w=a.w-b.w,this},multiplyScalar:function(a){return this.x*=a,this.y*=a,this.z*=a,this.w*=a,this},applyMatrix4:function(a){var b=this.x,c=this.y,d=this.z,e=this.w,f=a.elements;return this.x=f[0]*b+f[4]*c+f[8]*d+f[12]*e,this.y=f[1]*b+f[5]*c+f[9]*d+f[13]*e,this.z=f[2]*b+f[6]*c+f[10]*d+f[14]*e,this.w=f[3]*b+f[7]*c+f[11]*d+f[15]*e,this},divideScalar:function(a){if(0!==a){var b=1/a;this.x*=b,this.y*=b,this.z*=b,this.w*=b}else this.x=0,this.y=0,this.z=0,this.w=1;return this},setAxisAngleFromQuaternion:function(a){
// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
// q is assumed to be normalized
this.w=2*Math.acos(a.w);var b=Math.sqrt(1-a.w*a.w);return 1e-4>b?(this.x=1,this.y=0,this.z=0):(this.x=a.x/b,this.y=a.y/b,this.z=a.z/b),this},setAxisAngleFromRotationMatrix:function(a){
// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
var b,c,d,e,// variables for result
f=.01,// margin to allow for rounding errors
g=.1,// margin to distinguish between 0 and 180 degrees
h=a.elements,i=h[0],j=h[4],k=h[8],l=h[1],m=h[5],n=h[9],o=h[2],p=h[6],q=h[10];if(Math.abs(j-l)<f&&Math.abs(k-o)<f&&Math.abs(n-p)<f){
// singularity found
// first check for identity matrix which must have +1 for all terms
// in leading diagonal and zero in other terms
if(Math.abs(j+l)<g&&Math.abs(k+o)<g&&Math.abs(n+p)<g&&Math.abs(i+m+q-3)<g)
// this singularity is identity matrix so angle = 0
return this.set(1,0,0,0),this;
// otherwise this singularity is angle = 180
b=Math.PI;var r=(i+1)/2,s=(m+1)/2,t=(q+1)/2,u=(j+l)/4,v=(k+o)/4,w=(n+p)/4;// m11 is the largest diagonal term
// m22 is the largest diagonal term
// m33 is the largest diagonal term so base result on this
return r>s&&r>t?f>r?(c=0,d=.707106781,e=.707106781):(c=Math.sqrt(r),d=u/c,e=v/c):s>t?f>s?(c=.707106781,d=0,e=.707106781):(d=Math.sqrt(s),c=u/d,e=w/d):f>t?(c=.707106781,d=.707106781,e=0):(e=Math.sqrt(t),c=v/e,d=w/e),this.set(c,d,e,b),this}
// as we have reached here there are no singularities so we can handle normally
var x=Math.sqrt((p-n)*(p-n)+(k-o)*(k-o)+(l-j)*(l-j));// used to normalize
// prevent divide by zero, should not happen if matrix is orthogonal and should be
// caught by singularity test above, but I've left it in just in case
return Math.abs(x)<.001&&(x=1),this.x=(p-n)/x,this.y=(k-o)/x,this.z=(l-j)/x,this.w=Math.acos((i+m+q-1)/2),this},min:function(a){return this.x>a.x&&(this.x=a.x),this.y>a.y&&(this.y=a.y),this.z>a.z&&(this.z=a.z),this.w>a.w&&(this.w=a.w),this},max:function(a){return this.x<a.x&&(this.x=a.x),this.y<a.y&&(this.y=a.y),this.z<a.z&&(this.z=a.z),this.w<a.w&&(this.w=a.w),this},clamp:function(a,b){
// This function assumes min < max, if this assumption isn't true it will not operate correctly
return this.x<a.x?this.x=a.x:this.x>b.x&&(this.x=b.x),this.y<a.y?this.y=a.y:this.y>b.y&&(this.y=b.y),this.z<a.z?this.z=a.z:this.z>b.z&&(this.z=b.z),this.w<a.w?this.w=a.w:this.w>b.w&&(this.w=b.w),this},clampScalar:function(){var a,b;return function(c,d){return void 0===a&&(a=new THREE.Vector4,b=new THREE.Vector4),a.set(c,c,c,c),b.set(d,d,d,d),this.clamp(a,b)}}(),floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this},ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this},round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this},roundToZero:function(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this},negate:function(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z+this.w*a.w},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},lengthManhattan:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)},normalize:function(){return this.divideScalar(this.length())},setLength:function(a){var b=this.length();return 0!==b&&a!==b&&this.multiplyScalar(a/b),this},lerp:function(a,b){return this.x+=(a.x-this.x)*b,this.y+=(a.y-this.y)*b,this.z+=(a.z-this.z)*b,this.w+=(a.w-this.w)*b,this},equals:function(a){return a.x===this.x&&a.y===this.y&&a.z===this.z&&a.w===this.w},fromArray:function(a){return this.x=a[0],this.y=a[1],this.z=a[2],this.w=a[3],this},toArray:function(){return[this.x,this.y,this.z,this.w]},clone:function(){return new THREE.Vector4(this.x,this.y,this.z,this.w)}},
// File:src/math/Euler.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */
THREE.Euler=function(a,b,c,d){this._x=a||0,this._y=b||0,this._z=c||0,this._order=d||THREE.Euler.DefaultOrder},THREE.Euler.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"],THREE.Euler.DefaultOrder="XYZ",THREE.Euler.prototype={constructor:THREE.Euler,_x:0,_y:0,_z:0,_order:THREE.Euler.DefaultOrder,get x(){return this._x},set x(a){this._x=a,this.onChangeCallback()},get y(){return this._y},set y(a){this._y=a,this.onChangeCallback()},get z(){return this._z},set z(a){this._z=a,this.onChangeCallback()},get order(){return this._order},set order(a){this._order=a,this.onChangeCallback()},set:function(a,b,c,d){return this._x=a,this._y=b,this._z=c,this._order=d||this._order,this.onChangeCallback(),this},copy:function(a){return this._x=a._x,this._y=a._y,this._z=a._z,this._order=a._order,this.onChangeCallback(),this},setFromRotationMatrix:function(a,b){var c=THREE.Math.clamp,d=a.elements,e=d[0],f=d[4],g=d[8],h=d[1],i=d[5],j=d[9],k=d[2],l=d[6],m=d[10];return b=b||this._order,"XYZ"===b?(this._y=Math.asin(c(g,-1,1)),Math.abs(g)<.99999?(this._x=Math.atan2(-j,m),this._z=Math.atan2(-f,e)):(this._x=Math.atan2(l,i),this._z=0)):"YXZ"===b?(this._x=Math.asin(-c(j,-1,1)),Math.abs(j)<.99999?(this._y=Math.atan2(g,m),this._z=Math.atan2(h,i)):(this._y=Math.atan2(-k,e),this._z=0)):"ZXY"===b?(this._x=Math.asin(c(l,-1,1)),Math.abs(l)<.99999?(this._y=Math.atan2(-k,m),this._z=Math.atan2(-f,i)):(this._y=0,this._z=Math.atan2(h,e))):"ZYX"===b?(this._y=Math.asin(-c(k,-1,1)),Math.abs(k)<.99999?(this._x=Math.atan2(l,m),this._z=Math.atan2(h,e)):(this._x=0,this._z=Math.atan2(-f,i))):"YZX"===b?(this._z=Math.asin(c(h,-1,1)),Math.abs(h)<.99999?(this._x=Math.atan2(-j,i),this._y=Math.atan2(-k,e)):(this._x=0,this._y=Math.atan2(g,m))):"XZY"===b?(this._z=Math.asin(-c(f,-1,1)),Math.abs(f)<.99999?(this._x=Math.atan2(l,i),this._y=Math.atan2(g,e)):(this._x=Math.atan2(-j,m),this._y=0)):console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: "+b),this._order=b,this.onChangeCallback(),this},setFromQuaternion:function(a,b,c){var d=THREE.Math.clamp,e=a.x*a.x,f=a.y*a.y,g=a.z*a.z,h=a.w*a.w;return b=b||this._order,"XYZ"===b?(this._x=Math.atan2(2*(a.x*a.w-a.y*a.z),h-e-f+g),this._y=Math.asin(d(2*(a.x*a.z+a.y*a.w),-1,1)),this._z=Math.atan2(2*(a.z*a.w-a.x*a.y),h+e-f-g)):"YXZ"===b?(this._x=Math.asin(d(2*(a.x*a.w-a.y*a.z),-1,1)),this._y=Math.atan2(2*(a.x*a.z+a.y*a.w),h-e-f+g),this._z=Math.atan2(2*(a.x*a.y+a.z*a.w),h-e+f-g)):"ZXY"===b?(this._x=Math.asin(d(2*(a.x*a.w+a.y*a.z),-1,1)),this._y=Math.atan2(2*(a.y*a.w-a.z*a.x),h-e-f+g),this._z=Math.atan2(2*(a.z*a.w-a.x*a.y),h-e+f-g)):"ZYX"===b?(this._x=Math.atan2(2*(a.x*a.w+a.z*a.y),h-e-f+g),this._y=Math.asin(d(2*(a.y*a.w-a.x*a.z),-1,1)),this._z=Math.atan2(2*(a.x*a.y+a.z*a.w),h+e-f-g)):"YZX"===b?(this._x=Math.atan2(2*(a.x*a.w-a.z*a.y),h-e+f-g),this._y=Math.atan2(2*(a.y*a.w-a.x*a.z),h+e-f-g),this._z=Math.asin(d(2*(a.x*a.y+a.z*a.w),-1,1))):"XZY"===b?(this._x=Math.atan2(2*(a.x*a.w+a.y*a.z),h-e+f-g),this._y=Math.atan2(2*(a.x*a.z+a.y*a.w),h+e-f-g),this._z=Math.asin(d(2*(a.z*a.w-a.x*a.y),-1,1))):console.warn("THREE.Euler: .setFromQuaternion() given unsupported order: "+b),this._order=b,c!==!1&&this.onChangeCallback(),this},reorder:function(){
// WARNING: this discards revolution information -bhouston
var a=new THREE.Quaternion;return function(b){a.setFromEuler(this),this.setFromQuaternion(a,b)}}(),equals:function(a){return a._x===this._x&&a._y===this._y&&a._z===this._z&&a._order===this._order},fromArray:function(a){return this._x=a[0],this._y=a[1],this._z=a[2],void 0!==a[3]&&(this._order=a[3]),this.onChangeCallback(),this},toArray:function(){return[this._x,this._y,this._z,this._order]},onChange:function(a){return this.onChangeCallback=a,this},onChangeCallback:function(){},clone:function(){return new THREE.Euler(this._x,this._y,this._z,this._order)}},
// File:src/math/Line3.js
/**
 * @author bhouston / http://exocortex.com
 */
THREE.Line3=function(a,b){this.start=void 0!==a?a:new THREE.Vector3,this.end=void 0!==b?b:new THREE.Vector3},THREE.Line3.prototype={constructor:THREE.Line3,set:function(a,b){return this.start.copy(a),this.end.copy(b),this},copy:function(a){return this.start.copy(a.start),this.end.copy(a.end),this},center:function(a){var b=a||new THREE.Vector3;return b.addVectors(this.start,this.end).multiplyScalar(.5)},delta:function(a){var b=a||new THREE.Vector3;return b.subVectors(this.end,this.start)},distanceSq:function(){return this.start.distanceToSquared(this.end)},distance:function(){return this.start.distanceTo(this.end)},at:function(a,b){var c=b||new THREE.Vector3;return this.delta(c).multiplyScalar(a).add(this.start)},closestPointToPointParameter:function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(c,d){a.subVectors(c,this.start),b.subVectors(this.end,this.start);var e=b.dot(b),f=b.dot(a),g=f/e;return d&&(g=THREE.Math.clamp(g,0,1)),g}}(),closestPointToPoint:function(a,b,c){var d=this.closestPointToPointParameter(a,b),e=c||new THREE.Vector3;return this.delta(e).multiplyScalar(d).add(this.start)},applyMatrix4:function(a){return this.start.applyMatrix4(a),this.end.applyMatrix4(a),this},equals:function(a){return a.start.equals(this.start)&&a.end.equals(this.end)},clone:function(){return(new THREE.Line3).copy(this)}},
// File:src/math/Box2.js
/**
 * @author bhouston / http://exocortex.com
 */
THREE.Box2=function(a,b){this.min=void 0!==a?a:new THREE.Vector2(1/0,1/0),this.max=void 0!==b?b:new THREE.Vector2(-(1/0),-(1/0))},THREE.Box2.prototype={constructor:THREE.Box2,set:function(a,b){return this.min.copy(a),this.max.copy(b),this},setFromPoints:function(a){this.makeEmpty();for(var b=0,c=a.length;c>b;b++)this.expandByPoint(a[b]);return this},setFromCenterAndSize:function(){var a=new THREE.Vector2;return function(b,c){var d=a.copy(c).multiplyScalar(.5);return this.min.copy(b).sub(d),this.max.copy(b).add(d),this}}(),copy:function(a){return this.min.copy(a.min),this.max.copy(a.max),this},makeEmpty:function(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-(1/0),this},empty:function(){
// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
return this.max.x<this.min.x||this.max.y<this.min.y},center:function(a){var b=a||new THREE.Vector2;return b.addVectors(this.min,this.max).multiplyScalar(.5)},size:function(a){var b=a||new THREE.Vector2;return b.subVectors(this.max,this.min)},expandByPoint:function(a){return this.min.min(a),this.max.max(a),this},expandByVector:function(a){return this.min.sub(a),this.max.add(a),this},expandByScalar:function(a){return this.min.addScalar(-a),this.max.addScalar(a),this},containsPoint:function(a){return a.x<this.min.x||a.x>this.max.x||a.y<this.min.y||a.y>this.max.y?!1:!0},containsBox:function(a){return this.min.x<=a.min.x&&a.max.x<=this.max.x&&this.min.y<=a.min.y&&a.max.y<=this.max.y?!0:!1},getParameter:function(a,b){
// This can potentially have a divide by zero if the box
// has a size dimension of 0.
var c=b||new THREE.Vector2;return c.set((a.x-this.min.x)/(this.max.x-this.min.x),(a.y-this.min.y)/(this.max.y-this.min.y))},isIntersectionBox:function(a){
// using 6 splitting planes to rule out intersections.
// using 6 splitting planes to rule out intersections.
return a.max.x<this.min.x||a.min.x>this.max.x||a.max.y<this.min.y||a.min.y>this.max.y?!1:!0},clampPoint:function(a,b){var c=b||new THREE.Vector2;return c.copy(a).clamp(this.min,this.max)},distanceToPoint:function(){var a=new THREE.Vector2;return function(b){var c=a.copy(b).clamp(this.min,this.max);return c.sub(b).length()}}(),intersect:function(a){return this.min.max(a.min),this.max.min(a.max),this},union:function(a){return this.min.min(a.min),this.max.max(a.max),this},translate:function(a){return this.min.add(a),this.max.add(a),this},equals:function(a){return a.min.equals(this.min)&&a.max.equals(this.max)},clone:function(){return(new THREE.Box2).copy(this)}},
// File:src/math/Box3.js
/**
 * @author bhouston / http://exocortex.com
 * @author WestLangley / http://github.com/WestLangley
 */
THREE.Box3=function(a,b){this.min=void 0!==a?a:new THREE.Vector3(1/0,1/0,1/0),this.max=void 0!==b?b:new THREE.Vector3(-(1/0),-(1/0),-(1/0))},THREE.Box3.prototype={constructor:THREE.Box3,set:function(a,b){return this.min.copy(a),this.max.copy(b),this},setFromPoints:function(a){this.makeEmpty();for(var b=0,c=a.length;c>b;b++)this.expandByPoint(a[b]);return this},setFromCenterAndSize:function(){var a=new THREE.Vector3;return function(b,c){var d=a.copy(c).multiplyScalar(.5);return this.min.copy(b).sub(d),this.max.copy(b).add(d),this}}(),setFromObject:function(){
// Computes the world-axis-aligned bounding box of an object (including its children),
// accounting for both the object's, and childrens', world transforms
var a=new THREE.Vector3;return function(b){var c=this;return b.updateMatrixWorld(!0),this.makeEmpty(),b.traverse(function(b){if(void 0!==b.geometry&&void 0!==b.geometry.vertices)for(var d=b.geometry.vertices,e=0,f=d.length;f>e;e++)a.copy(d[e]),a.applyMatrix4(b.matrixWorld),c.expandByPoint(a)}),this}}(),copy:function(a){return this.min.copy(a.min),this.max.copy(a.max),this},makeEmpty:function(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-(1/0),this},empty:function(){
// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z},center:function(a){var b=a||new THREE.Vector3;return b.addVectors(this.min,this.max).multiplyScalar(.5)},size:function(a){var b=a||new THREE.Vector3;return b.subVectors(this.max,this.min)},expandByPoint:function(a){return this.min.min(a),this.max.max(a),this},expandByVector:function(a){return this.min.sub(a),this.max.add(a),this},expandByScalar:function(a){return this.min.addScalar(-a),this.max.addScalar(a),this},containsPoint:function(a){return a.x<this.min.x||a.x>this.max.x||a.y<this.min.y||a.y>this.max.y||a.z<this.min.z||a.z>this.max.z?!1:!0},containsBox:function(a){return this.min.x<=a.min.x&&a.max.x<=this.max.x&&this.min.y<=a.min.y&&a.max.y<=this.max.y&&this.min.z<=a.min.z&&a.max.z<=this.max.z?!0:!1},getParameter:function(a,b){
// This can potentially have a divide by zero if the box
// has a size dimension of 0.
var c=b||new THREE.Vector3;return c.set((a.x-this.min.x)/(this.max.x-this.min.x),(a.y-this.min.y)/(this.max.y-this.min.y),(a.z-this.min.z)/(this.max.z-this.min.z))},isIntersectionBox:function(a){
// using 6 splitting planes to rule out intersections.
// using 6 splitting planes to rule out intersections.
return a.max.x<this.min.x||a.min.x>this.max.x||a.max.y<this.min.y||a.min.y>this.max.y||a.max.z<this.min.z||a.min.z>this.max.z?!1:!0},clampPoint:function(a,b){var c=b||new THREE.Vector3;return c.copy(a).clamp(this.min,this.max)},distanceToPoint:function(){var a=new THREE.Vector3;return function(b){var c=a.copy(b).clamp(this.min,this.max);return c.sub(b).length()}}(),getBoundingSphere:function(){var a=new THREE.Vector3;return function(b){var c=b||new THREE.Sphere;return c.center=this.center(),c.radius=.5*this.size(a).length(),c}}(),intersect:function(a){return this.min.max(a.min),this.max.min(a.max),this},union:function(a){return this.min.min(a.min),this.max.max(a.max),this},applyMatrix4:function(){var a=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];return function(b){
// NOTE: I am using a binary pattern to specify all 2^3 combinations below
// 000
// 001
// 010
// 011
// 100
// 101
// 110
// 111
return a[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(b),a[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(b),a[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(b),a[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(b),a[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(b),a[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(b),a[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(b),a[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(b),this.makeEmpty(),this.setFromPoints(a),this}}(),translate:function(a){return this.min.add(a),this.max.add(a),this},equals:function(a){return a.min.equals(this.min)&&a.max.equals(this.max)},clone:function(){return(new THREE.Box3).copy(this)}},
// File:src/math/Matrix3.js
/**
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */
THREE.Matrix3=function(a,b,c,d,e,f,g,h,i){this.elements=new Float32Array(9);var j=this.elements;j[0]=void 0!==a?a:1,j[3]=b||0,j[6]=c||0,j[1]=d||0,j[4]=void 0!==e?e:1,j[7]=f||0,j[2]=g||0,j[5]=h||0,j[8]=void 0!==i?i:1},THREE.Matrix3.prototype={constructor:THREE.Matrix3,set:function(a,b,c,d,e,f,g,h,i){var j=this.elements;return j[0]=a,j[3]=b,j[6]=c,j[1]=d,j[4]=e,j[7]=f,j[2]=g,j[5]=h,j[8]=i,this},identity:function(){return this.set(1,0,0,0,1,0,0,0,1),this},copy:function(a){var b=a.elements;return this.set(b[0],b[3],b[6],b[1],b[4],b[7],b[2],b[5],b[8]),this},multiplyVector3:function(a){return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."),a.applyMatrix3(this)},multiplyVector3Array:function(a){return console.warn("THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."),this.applyToVector3Array(a)},applyToVector3Array:function(){var a=new THREE.Vector3;return function(b,c,d){void 0===c&&(c=0),void 0===d&&(d=b.length);for(var e=0,f=c;d>e;e+=3,f+=3)a.x=b[f],a.y=b[f+1],a.z=b[f+2],a.applyMatrix3(this),b[f]=a.x,b[f+1]=a.y,b[f+2]=a.z;return b}}(),multiplyScalar:function(a){var b=this.elements;return b[0]*=a,b[3]*=a,b[6]*=a,b[1]*=a,b[4]*=a,b[7]*=a,b[2]*=a,b[5]*=a,b[8]*=a,this},determinant:function(){var a=this.elements,b=a[0],c=a[1],d=a[2],e=a[3],f=a[4],g=a[5],h=a[6],i=a[7],j=a[8];return b*f*j-b*g*i-c*e*j+c*g*h+d*e*i-d*f*h},getInverse:function(a,b){
// input: THREE.Matrix4
// ( based on http://code.google.com/p/webgl-mjs/ )
var c=a.elements,d=this.elements;d[0]=c[10]*c[5]-c[6]*c[9],d[1]=-c[10]*c[1]+c[2]*c[9],d[2]=c[6]*c[1]-c[2]*c[5],d[3]=-c[10]*c[4]+c[6]*c[8],d[4]=c[10]*c[0]-c[2]*c[8],d[5]=-c[6]*c[0]+c[2]*c[4],d[6]=c[9]*c[4]-c[5]*c[8],d[7]=-c[9]*c[0]+c[1]*c[8],d[8]=c[5]*c[0]-c[1]*c[4];var e=c[0]*d[0]+c[1]*d[3]+c[2]*d[6];
// no inverse
if(0===e){var f="Matrix3.getInverse(): can't invert matrix, determinant is 0";if(b)throw new Error(f);return console.warn(f),this.identity(),this}return this.multiplyScalar(1/e),this},transpose:function(){var a,b=this.elements;return a=b[1],b[1]=b[3],b[3]=a,a=b[2],b[2]=b[6],b[6]=a,a=b[5],b[5]=b[7],b[7]=a,this},flattenToArrayOffset:function(a,b){var c=this.elements;return a[b]=c[0],a[b+1]=c[1],a[b+2]=c[2],a[b+3]=c[3],a[b+4]=c[4],a[b+5]=c[5],a[b+6]=c[6],a[b+7]=c[7],a[b+8]=c[8],a},getNormalMatrix:function(a){
// input: THREE.Matrix4
return this.getInverse(a).transpose(),this},transposeIntoArray:function(a){var b=this.elements;return a[0]=b[0],a[1]=b[3],a[2]=b[6],a[3]=b[1],a[4]=b[4],a[5]=b[7],a[6]=b[2],a[7]=b[5],a[8]=b[8],this},fromArray:function(a){return this.elements.set(a),this},toArray:function(){var a=this.elements;return[a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8]]},clone:function(){var a=this.elements;return new THREE.Matrix3(a[0],a[3],a[6],a[1],a[4],a[7],a[2],a[5],a[8])}},
// File:src/math/Matrix4.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 * @author bhouston / http://exocortex.com
 * @author WestLangley / http://github.com/WestLangley
 */
THREE.Matrix4=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){this.elements=new Float32Array(16);
// TODO: if n11 is undefined, then just set to identity, otherwise copy all other values into matrix
//   we should not support semi specification of Matrix4, it is just weird.
var q=this.elements;q[0]=void 0!==a?a:1,q[4]=b||0,q[8]=c||0,q[12]=d||0,q[1]=e||0,q[5]=void 0!==f?f:1,q[9]=g||0,q[13]=h||0,q[2]=i||0,q[6]=j||0,q[10]=void 0!==k?k:1,q[14]=l||0,q[3]=m||0,q[7]=n||0,q[11]=o||0,q[15]=void 0!==p?p:1},THREE.Matrix4.prototype={constructor:THREE.Matrix4,set:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q=this.elements;return q[0]=a,q[4]=b,q[8]=c,q[12]=d,q[1]=e,q[5]=f,q[9]=g,q[13]=h,q[2]=i,q[6]=j,q[10]=k,q[14]=l,q[3]=m,q[7]=n,q[11]=o,q[15]=p,this},identity:function(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this},copy:function(a){return this.elements.set(a.elements),this},extractPosition:function(a){return console.warn("THREEMatrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(a)},copyPosition:function(a){var b=this.elements,c=a.elements;return b[12]=c[12],b[13]=c[13],b[14]=c[14],this},extractRotation:function(){var a=new THREE.Vector3;return function(b){var c=this.elements,d=b.elements,e=1/a.set(d[0],d[1],d[2]).length(),f=1/a.set(d[4],d[5],d[6]).length(),g=1/a.set(d[8],d[9],d[10]).length();return c[0]=d[0]*e,c[1]=d[1]*e,c[2]=d[2]*e,c[4]=d[4]*f,c[5]=d[5]*f,c[6]=d[6]*f,c[8]=d[8]*g,c[9]=d[9]*g,c[10]=d[10]*g,this}}(),makeRotationFromEuler:function(a){a instanceof THREE.Euler==!1&&console.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");var b=this.elements,c=a.x,d=a.y,e=a.z,f=Math.cos(c),g=Math.sin(c),h=Math.cos(d),i=Math.sin(d),j=Math.cos(e),k=Math.sin(e);if("XYZ"===a.order){var l=f*j,m=f*k,n=g*j,o=g*k;b[0]=h*j,b[4]=-h*k,b[8]=i,b[1]=m+n*i,b[5]=l-o*i,b[9]=-g*h,b[2]=o-l*i,b[6]=n+m*i,b[10]=f*h}else if("YXZ"===a.order){var p=h*j,q=h*k,r=i*j,s=i*k;b[0]=p+s*g,b[4]=r*g-q,b[8]=f*i,b[1]=f*k,b[5]=f*j,b[9]=-g,b[2]=q*g-r,b[6]=s+p*g,b[10]=f*h}else if("ZXY"===a.order){var p=h*j,q=h*k,r=i*j,s=i*k;b[0]=p-s*g,b[4]=-f*k,b[8]=r+q*g,b[1]=q+r*g,b[5]=f*j,b[9]=s-p*g,b[2]=-f*i,b[6]=g,b[10]=f*h}else if("ZYX"===a.order){var l=f*j,m=f*k,n=g*j,o=g*k;b[0]=h*j,b[4]=n*i-m,b[8]=l*i+o,b[1]=h*k,b[5]=o*i+l,b[9]=m*i-n,b[2]=-i,b[6]=g*h,b[10]=f*h}else if("YZX"===a.order){var t=f*h,u=f*i,v=g*h,w=g*i;b[0]=h*j,b[4]=w-t*k,b[8]=v*k+u,b[1]=k,b[5]=f*j,b[9]=-g*j,b[2]=-i*j,b[6]=u*k+v,b[10]=t-w*k}else if("XZY"===a.order){var t=f*h,u=f*i,v=g*h,w=g*i;b[0]=h*j,b[4]=-k,b[8]=i*j,b[1]=t*k+w,b[5]=f*j,b[9]=u*k-v,b[2]=v*k-u,b[6]=g*j,b[10]=w*k+t}
// last column
// bottom row
return b[3]=0,b[7]=0,b[11]=0,b[12]=0,b[13]=0,b[14]=0,b[15]=1,this},setRotationFromQuaternion:function(a){return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."),this.makeRotationFromQuaternion(a)},makeRotationFromQuaternion:function(a){var b=this.elements,c=a.x,d=a.y,e=a.z,f=a.w,g=c+c,h=d+d,i=e+e,j=c*g,k=c*h,l=c*i,m=d*h,n=d*i,o=e*i,p=f*g,q=f*h,r=f*i;
// last column
// bottom row
return b[0]=1-(m+o),b[4]=k-r,b[8]=l+q,b[1]=k+r,b[5]=1-(j+o),b[9]=n-p,b[2]=l-q,b[6]=n+p,b[10]=1-(j+m),b[3]=0,b[7]=0,b[11]=0,b[12]=0,b[13]=0,b[14]=0,b[15]=1,this},lookAt:function(){var a=new THREE.Vector3,b=new THREE.Vector3,c=new THREE.Vector3;return function(d,e,f){var g=this.elements;return c.subVectors(d,e).normalize(),0===c.length()&&(c.z=1),a.crossVectors(f,c).normalize(),0===a.length()&&(c.x+=1e-4,a.crossVectors(f,c).normalize()),b.crossVectors(c,a),g[0]=a.x,g[4]=b.x,g[8]=c.x,g[1]=a.y,g[5]=b.y,g[9]=c.y,g[2]=a.z,g[6]=b.z,g[10]=c.z,this}}(),multiply:function(a,b){return void 0!==b?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(a,b)):this.multiplyMatrices(this,a)},multiplyMatrices:function(a,b){var c=a.elements,d=b.elements,e=this.elements,f=c[0],g=c[4],h=c[8],i=c[12],j=c[1],k=c[5],l=c[9],m=c[13],n=c[2],o=c[6],p=c[10],q=c[14],r=c[3],s=c[7],t=c[11],u=c[15],v=d[0],w=d[4],x=d[8],y=d[12],z=d[1],A=d[5],B=d[9],C=d[13],D=d[2],E=d[6],F=d[10],G=d[14],H=d[3],I=d[7],J=d[11],K=d[15];return e[0]=f*v+g*z+h*D+i*H,e[4]=f*w+g*A+h*E+i*I,e[8]=f*x+g*B+h*F+i*J,e[12]=f*y+g*C+h*G+i*K,e[1]=j*v+k*z+l*D+m*H,e[5]=j*w+k*A+l*E+m*I,e[9]=j*x+k*B+l*F+m*J,e[13]=j*y+k*C+l*G+m*K,e[2]=n*v+o*z+p*D+q*H,e[6]=n*w+o*A+p*E+q*I,e[10]=n*x+o*B+p*F+q*J,e[14]=n*y+o*C+p*G+q*K,e[3]=r*v+s*z+t*D+u*H,e[7]=r*w+s*A+t*E+u*I,e[11]=r*x+s*B+t*F+u*J,e[15]=r*y+s*C+t*G+u*K,this},multiplyToArray:function(a,b,c){var d=this.elements;return this.multiplyMatrices(a,b),c[0]=d[0],c[1]=d[1],c[2]=d[2],c[3]=d[3],c[4]=d[4],c[5]=d[5],c[6]=d[6],c[7]=d[7],c[8]=d[8],c[9]=d[9],c[10]=d[10],c[11]=d[11],c[12]=d[12],c[13]=d[13],c[14]=d[14],c[15]=d[15],this},multiplyScalar:function(a){var b=this.elements;return b[0]*=a,b[4]*=a,b[8]*=a,b[12]*=a,b[1]*=a,b[5]*=a,b[9]*=a,b[13]*=a,b[2]*=a,b[6]*=a,b[10]*=a,b[14]*=a,b[3]*=a,b[7]*=a,b[11]*=a,b[15]*=a,this},multiplyVector3:function(a){return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead."),a.applyProjection(this)},multiplyVector4:function(a){return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."),a.applyMatrix4(this)},multiplyVector3Array:function(a){return console.warn("THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."),this.applyToVector3Array(a)},applyToVector3Array:function(){var a=new THREE.Vector3;return function(b,c,d){void 0===c&&(c=0),void 0===d&&(d=b.length);for(var e=0,f=c;d>e;e+=3,f+=3)a.x=b[f],a.y=b[f+1],a.z=b[f+2],a.applyMatrix4(this),b[f]=a.x,b[f+1]=a.y,b[f+2]=a.z;return b}}(),rotateAxis:function(a){console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."),a.transformDirection(this)},crossVector:function(a){return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."),a.applyMatrix4(this)},determinant:function(){var a=this.elements,b=a[0],c=a[4],d=a[8],e=a[12],f=a[1],g=a[5],h=a[9],i=a[13],j=a[2],k=a[6],l=a[10],m=a[14],n=a[3],o=a[7],p=a[11],q=a[15];
//TODO: make this more efficient
//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )
return n*(+e*h*k-d*i*k-e*g*l+c*i*l+d*g*m-c*h*m)+o*(+b*h*m-b*i*l+e*f*l-d*f*m+d*i*j-e*h*j)+p*(+b*i*k-b*g*m-e*f*k+c*f*m+e*g*j-c*i*j)+q*(-d*g*j-b*h*k+b*g*l+d*f*k-c*f*l+c*h*j)},transpose:function(){var a,b=this.elements;return a=b[1],b[1]=b[4],b[4]=a,a=b[2],b[2]=b[8],b[8]=a,a=b[6],b[6]=b[9],b[9]=a,a=b[3],b[3]=b[12],b[12]=a,a=b[7],b[7]=b[13],b[13]=a,a=b[11],b[11]=b[14],b[14]=a,this},flattenToArrayOffset:function(a,b){var c=this.elements;return a[b]=c[0],a[b+1]=c[1],a[b+2]=c[2],a[b+3]=c[3],a[b+4]=c[4],a[b+5]=c[5],a[b+6]=c[6],a[b+7]=c[7],a[b+8]=c[8],a[b+9]=c[9],a[b+10]=c[10],a[b+11]=c[11],a[b+12]=c[12],a[b+13]=c[13],a[b+14]=c[14],a[b+15]=c[15],a},getPosition:function(){var a=new THREE.Vector3;return function(){console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");var b=this.elements;return a.set(b[12],b[13],b[14])}}(),setPosition:function(a){var b=this.elements;return b[12]=a.x,b[13]=a.y,b[14]=a.z,this},getInverse:function(a,b){
// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
var c=this.elements,d=a.elements,e=d[0],f=d[4],g=d[8],h=d[12],i=d[1],j=d[5],k=d[9],l=d[13],m=d[2],n=d[6],o=d[10],p=d[14],q=d[3],r=d[7],s=d[11],t=d[15];c[0]=k*p*r-l*o*r+l*n*s-j*p*s-k*n*t+j*o*t,c[4]=h*o*r-g*p*r-h*n*s+f*p*s+g*n*t-f*o*t,c[8]=g*l*r-h*k*r+h*j*s-f*l*s-g*j*t+f*k*t,c[12]=h*k*n-g*l*n-h*j*o+f*l*o+g*j*p-f*k*p,c[1]=l*o*q-k*p*q-l*m*s+i*p*s+k*m*t-i*o*t,c[5]=g*p*q-h*o*q+h*m*s-e*p*s-g*m*t+e*o*t,c[9]=h*k*q-g*l*q-h*i*s+e*l*s+g*i*t-e*k*t,c[13]=g*l*m-h*k*m+h*i*o-e*l*o-g*i*p+e*k*p,c[2]=j*p*q-l*n*q+l*m*r-i*p*r-j*m*t+i*n*t,c[6]=h*n*q-f*p*q-h*m*r+e*p*r+f*m*t-e*n*t,c[10]=f*l*q-h*j*q+h*i*r-e*l*r-f*i*t+e*j*t,c[14]=h*j*m-f*l*m-h*i*n+e*l*n+f*i*p-e*j*p,c[3]=k*n*q-j*o*q-k*m*r+i*o*r+j*m*s-i*n*s,c[7]=f*o*q-g*n*q+g*m*r-e*o*r-f*m*s+e*n*s,c[11]=g*j*q-f*k*q-g*i*r+e*k*r+f*i*s-e*j*s,c[15]=f*k*m-g*j*m+g*i*n-e*k*n-f*i*o+e*j*o;var u=e*c[0]+i*c[4]+m*c[8]+q*c[12];if(0==u){var v="Matrix4.getInverse(): can't invert matrix, determinant is 0";if(b)throw new Error(v);return console.warn(v),this.identity(),this}return this.multiplyScalar(1/u),this},translate:function(a){console.warn("THREE.Matrix4: .translate() has been removed.")},rotateX:function(a){console.warn("THREE.Matrix4: .rotateX() has been removed.")},rotateY:function(a){console.warn("THREE.Matrix4: .rotateY() has been removed.")},rotateZ:function(a){console.warn("THREE.Matrix4: .rotateZ() has been removed.")},rotateByAxis:function(a,b){console.warn("THREE.Matrix4: .rotateByAxis() has been removed.")},scale:function(a){var b=this.elements,c=a.x,d=a.y,e=a.z;return b[0]*=c,b[4]*=d,b[8]*=e,b[1]*=c,b[5]*=d,b[9]*=e,b[2]*=c,b[6]*=d,b[10]*=e,b[3]*=c,b[7]*=d,b[11]*=e,this},getMaxScaleOnAxis:function(){var a=this.elements,b=a[0]*a[0]+a[1]*a[1]+a[2]*a[2],c=a[4]*a[4]+a[5]*a[5]+a[6]*a[6],d=a[8]*a[8]+a[9]*a[9]+a[10]*a[10];return Math.sqrt(Math.max(b,Math.max(c,d)))},makeTranslation:function(a,b,c){return this.set(1,0,0,a,0,1,0,b,0,0,1,c,0,0,0,1),this},makeRotationX:function(a){var b=Math.cos(a),c=Math.sin(a);return this.set(1,0,0,0,0,b,-c,0,0,c,b,0,0,0,0,1),this},makeRotationY:function(a){var b=Math.cos(a),c=Math.sin(a);return this.set(b,0,c,0,0,1,0,0,-c,0,b,0,0,0,0,1),this},makeRotationZ:function(a){var b=Math.cos(a),c=Math.sin(a);return this.set(b,-c,0,0,c,b,0,0,0,0,1,0,0,0,0,1),this},makeRotationAxis:function(a,b){
// Based on http://www.gamedev.net/reference/articles/article1199.asp
var c=Math.cos(b),d=Math.sin(b),e=1-c,f=a.x,g=a.y,h=a.z,i=e*f,j=e*g;return this.set(i*f+c,i*g-d*h,i*h+d*g,0,i*g+d*h,j*g+c,j*h-d*f,0,i*h-d*g,j*h+d*f,e*h*h+c,0,0,0,0,1),this},makeScale:function(a,b,c){return this.set(a,0,0,0,0,b,0,0,0,0,c,0,0,0,0,1),this},compose:function(a,b,c){return this.makeRotationFromQuaternion(b),this.scale(c),this.setPosition(a),this},decompose:function(){var a=new THREE.Vector3,b=new THREE.Matrix4;return function(c,d,e){var f=this.elements,g=a.set(f[0],f[1],f[2]).length(),h=a.set(f[4],f[5],f[6]).length(),i=a.set(f[8],f[9],f[10]).length(),j=this.determinant();0>j&&(g=-g),c.x=f[12],c.y=f[13],c.z=f[14],
// scale the rotation part
b.elements.set(this.elements);// at this point matrix is incomplete so we can't use .copy()
var k=1/g,l=1/h,m=1/i;return b.elements[0]*=k,b.elements[1]*=k,b.elements[2]*=k,b.elements[4]*=l,b.elements[5]*=l,b.elements[6]*=l,b.elements[8]*=m,b.elements[9]*=m,b.elements[10]*=m,d.setFromRotationMatrix(b),e.x=g,e.y=h,e.z=i,this}}(),makeFrustum:function(a,b,c,d,e,f){var g=this.elements,h=2*e/(b-a),i=2*e/(d-c),j=(b+a)/(b-a),k=(d+c)/(d-c),l=-(f+e)/(f-e),m=-2*f*e/(f-e);return g[0]=h,g[4]=0,g[8]=j,g[12]=0,g[1]=0,g[5]=i,g[9]=k,g[13]=0,g[2]=0,g[6]=0,g[10]=l,g[14]=m,g[3]=0,g[7]=0,g[11]=-1,g[15]=0,this},makePerspective:function(a,b,c,d){var e=c*Math.tan(THREE.Math.degToRad(.5*a)),f=-e,g=f*b,h=e*b;return this.makeFrustum(g,h,f,e,c,d)},makeOrthographic:function(a,b,c,d,e,f){var g=this.elements,h=b-a,i=c-d,j=f-e,k=(b+a)/h,l=(c+d)/i,m=(f+e)/j;return g[0]=2/h,g[4]=0,g[8]=0,g[12]=-k,g[1]=0,g[5]=2/i,g[9]=0,g[13]=-l,g[2]=0,g[6]=0,g[10]=-2/j,g[14]=-m,g[3]=0,g[7]=0,g[11]=0,g[15]=1,this},fromArray:function(a){return this.elements.set(a),this},toArray:function(){var a=this.elements;return[a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15]]},clone:function(){var a=this.elements;return new THREE.Matrix4(a[0],a[4],a[8],a[12],a[1],a[5],a[9],a[13],a[2],a[6],a[10],a[14],a[3],a[7],a[11],a[15])}},
// File:src/math/Ray.js
/**
 * @author bhouston / http://exocortex.com
 */
THREE.Ray=function(a,b){this.origin=void 0!==a?a:new THREE.Vector3,this.direction=void 0!==b?b:new THREE.Vector3},THREE.Ray.prototype={constructor:THREE.Ray,set:function(a,b){return this.origin.copy(a),this.direction.copy(b),this},copy:function(a){return this.origin.copy(a.origin),this.direction.copy(a.direction),this},at:function(a,b){var c=b||new THREE.Vector3;return c.copy(this.direction).multiplyScalar(a).add(this.origin)},recast:function(){var a=new THREE.Vector3;return function(b){return this.origin.copy(this.at(b,a)),this}}(),closestPointToPoint:function(a,b){var c=b||new THREE.Vector3;c.subVectors(a,this.origin);var d=c.dot(this.direction);return 0>d?c.copy(this.origin):c.copy(this.direction).multiplyScalar(d).add(this.origin)},distanceToPoint:function(){var a=new THREE.Vector3;return function(b){var c=a.subVectors(b,this.origin).dot(this.direction);
// point behind the ray
// point behind the ray
return 0>c?this.origin.distanceTo(b):(a.copy(this.direction).multiplyScalar(c).add(this.origin),a.distanceTo(b))}}(),distanceSqToSegment:function(a,b,c,d){
// from http://www.geometrictools.com/LibMathematics/Distance/Wm5DistRay3Segment3.cpp
// It returns the min distance between the ray and the segment
// defined by v0 and v1
// It can also set two optional targets :
// - The closest point on the ray
// - The closest point on the segment
var e,f,g,h,i=a.clone().add(b).multiplyScalar(.5),j=b.clone().sub(a).normalize(),k=.5*a.distanceTo(b),l=this.origin.clone().sub(i),m=-this.direction.dot(j),n=l.dot(this.direction),o=-l.dot(j),p=l.lengthSq(),q=Math.abs(1-m*m);if(q>=0)if(
// The ray and segment are not parallel.
e=m*o-n,f=m*n-o,h=k*q,e>=0)if(f>=-h)if(h>=f){
// region 0
// Minimum at interior points of ray and segment.
var r=1/q;e*=r,f*=r,g=e*(e+m*f+2*n)+f*(m*e+f+2*o)+p}else
// region 1
f=k,e=Math.max(0,-(m*f+n)),g=-e*e+f*(f+2*o)+p;else
// region 5
f=-k,e=Math.max(0,-(m*f+n)),g=-e*e+f*(f+2*o)+p;else-h>=f?(
// region 4
e=Math.max(0,-(-m*k+n)),f=e>0?-k:Math.min(Math.max(-k,-o),k),g=-e*e+f*(f+2*o)+p):h>=f?(
// region 3
e=0,f=Math.min(Math.max(-k,-o),k),g=f*(f+2*o)+p):(
// region 2
e=Math.max(0,-(m*k+n)),f=e>0?k:Math.min(Math.max(-k,-o),k),g=-e*e+f*(f+2*o)+p);else
// Ray and segment are parallel.
f=m>0?-k:k,e=Math.max(0,-(m*f+n)),g=-e*e+f*(f+2*o)+p;return c&&c.copy(this.direction.clone().multiplyScalar(e).add(this.origin)),d&&d.copy(j.clone().multiplyScalar(f).add(i)),g},isIntersectionSphere:function(a){return this.distanceToPoint(a.center)<=a.radius},intersectSphere:function(){
// from http://www.scratchapixel.com/lessons/3d-basic-lessons/lesson-7-intersecting-simple-shapes/ray-sphere-intersection/
var a=new THREE.Vector3;return function(b,c){a.subVectors(b.center,this.origin);var d=a.dot(this.direction),e=a.dot(a)-d*d,f=b.radius*b.radius;if(e>f)return null;var g=Math.sqrt(f-e),h=d-g,i=d+g;
// test to see if both t0 and t1 are behind the ray - if so, return null
// test to see if both t0 and t1 are behind the ray - if so, return null
// test to see if t0 is behind the ray:
// if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
// in order to always return an intersect point that is in front of the ray.
return 0>h&&0>i?null:0>h?this.at(i,c):this.at(h,c)}}(),isIntersectionPlane:function(a){
// check if the ray lies on the plane first
var b=a.distanceToPoint(this.origin);if(0===b)return!0;var c=a.normal.dot(this.direction);return 0>c*b?!0:!1},distanceToPlane:function(a){var b=a.normal.dot(this.direction);if(0==b)
// line is coplanar, return origin
// line is coplanar, return origin
return 0==a.distanceToPoint(this.origin)?0:null;var c=-(this.origin.dot(a.normal)+a.constant)/b;
// Return if the ray never intersects the plane
return c>=0?c:null},intersectPlane:function(a,b){var c=this.distanceToPlane(a);return null===c?null:this.at(c,b)},isIntersectionBox:function(){var a=new THREE.Vector3;return function(b){return null!==this.intersectBox(b,a)}}(),intersectBox:function(a,b){
// http://www.scratchapixel.com/lessons/3d-basic-lessons/lesson-7-intersecting-simple-shapes/ray-box-intersection/
var c,d,e,f,g,h,i=1/this.direction.x,j=1/this.direction.y,k=1/this.direction.z,l=this.origin;
// These lines also handle the case where tmin or tmax is NaN
// (result of 0 * Infinity). x !== x returns true if x is NaN
//return point closest to the ray (positive side)
return i>=0?(c=(a.min.x-l.x)*i,d=(a.max.x-l.x)*i):(c=(a.max.x-l.x)*i,d=(a.min.x-l.x)*i),j>=0?(e=(a.min.y-l.y)*j,f=(a.max.y-l.y)*j):(e=(a.max.y-l.y)*j,f=(a.min.y-l.y)*j),c>f||e>d?null:((e>c||c!==c)&&(c=e),(d>f||d!==d)&&(d=f),k>=0?(g=(a.min.z-l.z)*k,h=(a.max.z-l.z)*k):(g=(a.max.z-l.z)*k,h=(a.min.z-l.z)*k),c>h||g>d?null:((g>c||c!==c)&&(c=g),(d>h||d!==d)&&(d=h),0>d?null:this.at(c>=0?c:d,b)))},intersectTriangle:function(){
// Compute the offset origin, edges, and normal.
var a=new THREE.Vector3,b=new THREE.Vector3,c=new THREE.Vector3,d=new THREE.Vector3;return function(e,f,g,h,i){
// from http://www.geometrictools.com/LibMathematics/Intersection/Wm5IntrRay3Triangle3.cpp
b.subVectors(f,e),c.subVectors(g,e),d.crossVectors(b,c);
// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
var j,k=this.direction.dot(d);if(k>0){if(h)return null;j=1}else{if(!(0>k))return null;j=-1,k=-k}a.subVectors(this.origin,e);var l=j*this.direction.dot(c.crossVectors(a,c));
// b1 < 0, no intersection
if(0>l)return null;var m=j*this.direction.dot(b.cross(a));
// b2 < 0, no intersection
if(0>m)return null;
// b1+b2 > 1, no intersection
if(l+m>k)return null;
// Line intersects triangle, check if ray does.
var n=-j*a.dot(d);
// t < 0, no intersection
// t < 0, no intersection
return 0>n?null:this.at(n/k,i)}}(),applyMatrix4:function(a){return this.direction.add(this.origin).applyMatrix4(a),this.origin.applyMatrix4(a),this.direction.sub(this.origin),this.direction.normalize(),this},equals:function(a){return a.origin.equals(this.origin)&&a.direction.equals(this.direction)},clone:function(){return(new THREE.Ray).copy(this)}},
// File:src/math/Sphere.js
/**
 * @author bhouston / http://exocortex.com
 * @author mrdoob / http://mrdoob.com/
 */
THREE.Sphere=function(a,b){this.center=void 0!==a?a:new THREE.Vector3,this.radius=void 0!==b?b:0},THREE.Sphere.prototype={constructor:THREE.Sphere,set:function(a,b){return this.center.copy(a),this.radius=b,this},setFromPoints:function(){var a=new THREE.Box3;return function(b,c){var d=this.center;void 0!==c?d.copy(c):a.setFromPoints(b).center(d);for(var e=0,f=0,g=b.length;g>f;f++)e=Math.max(e,d.distanceToSquared(b[f]));return this.radius=Math.sqrt(e),this}}(),copy:function(a){return this.center.copy(a.center),this.radius=a.radius,this},empty:function(){return this.radius<=0},containsPoint:function(a){return a.distanceToSquared(this.center)<=this.radius*this.radius},distanceToPoint:function(a){return a.distanceTo(this.center)-this.radius},intersectsSphere:function(a){var b=this.radius+a.radius;return a.center.distanceToSquared(this.center)<=b*b},clampPoint:function(a,b){var c=this.center.distanceToSquared(a),d=b||new THREE.Vector3;return d.copy(a),c>this.radius*this.radius&&(d.sub(this.center).normalize(),d.multiplyScalar(this.radius).add(this.center)),d},getBoundingBox:function(a){var b=a||new THREE.Box3;return b.set(this.center,this.center),b.expandByScalar(this.radius),b},applyMatrix4:function(a){return this.center.applyMatrix4(a),this.radius=this.radius*a.getMaxScaleOnAxis(),this},translate:function(a){return this.center.add(a),this},equals:function(a){return a.center.equals(this.center)&&a.radius===this.radius},clone:function(){return(new THREE.Sphere).copy(this)}},
// File:src/math/Frustum.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author bhouston / http://exocortex.com
 */
THREE.Frustum=function(a,b,c,d,e,f){this.planes=[void 0!==a?a:new THREE.Plane,void 0!==b?b:new THREE.Plane,void 0!==c?c:new THREE.Plane,void 0!==d?d:new THREE.Plane,void 0!==e?e:new THREE.Plane,void 0!==f?f:new THREE.Plane]},THREE.Frustum.prototype={constructor:THREE.Frustum,set:function(a,b,c,d,e,f){var g=this.planes;return g[0].copy(a),g[1].copy(b),g[2].copy(c),g[3].copy(d),g[4].copy(e),g[5].copy(f),this},copy:function(a){for(var b=this.planes,c=0;6>c;c++)b[c].copy(a.planes[c]);return this},setFromMatrix:function(a){var b=this.planes,c=a.elements,d=c[0],e=c[1],f=c[2],g=c[3],h=c[4],i=c[5],j=c[6],k=c[7],l=c[8],m=c[9],n=c[10],o=c[11],p=c[12],q=c[13],r=c[14],s=c[15];return b[0].setComponents(g-d,k-h,o-l,s-p).normalize(),b[1].setComponents(g+d,k+h,o+l,s+p).normalize(),b[2].setComponents(g+e,k+i,o+m,s+q).normalize(),b[3].setComponents(g-e,k-i,o-m,s-q).normalize(),b[4].setComponents(g-f,k-j,o-n,s-r).normalize(),b[5].setComponents(g+f,k+j,o+n,s+r).normalize(),this},intersectsObject:function(){var a=new THREE.Sphere;return function(b){var c=b.geometry;return null===c.boundingSphere&&c.computeBoundingSphere(),a.copy(c.boundingSphere),a.applyMatrix4(b.matrixWorld),this.intersectsSphere(a)}}(),intersectsSphere:function(a){for(var b=this.planes,c=a.center,d=-a.radius,e=0;6>e;e++){var f=b[e].distanceToPoint(c);if(d>f)return!1}return!0},intersectsBox:function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(c){for(var d=this.planes,e=0;6>e;e++){var f=d[e];a.x=f.normal.x>0?c.min.x:c.max.x,b.x=f.normal.x>0?c.max.x:c.min.x,a.y=f.normal.y>0?c.min.y:c.max.y,b.y=f.normal.y>0?c.max.y:c.min.y,a.z=f.normal.z>0?c.min.z:c.max.z,b.z=f.normal.z>0?c.max.z:c.min.z;var g=f.distanceToPoint(a),h=f.distanceToPoint(b);
// if both outside plane, no intersection
if(0>g&&0>h)return!1}return!0}}(),containsPoint:function(a){for(var b=this.planes,c=0;6>c;c++)if(b[c].distanceToPoint(a)<0)return!1;return!0},clone:function(){return(new THREE.Frustum).copy(this)}},
// File:src/math/Plane.js
/**
 * @author bhouston / http://exocortex.com
 */
THREE.Plane=function(a,b){this.normal=void 0!==a?a:new THREE.Vector3(1,0,0),this.constant=void 0!==b?b:0},THREE.Plane.prototype={constructor:THREE.Plane,set:function(a,b){return this.normal.copy(a),this.constant=b,this},setComponents:function(a,b,c,d){return this.normal.set(a,b,c),this.constant=d,this},setFromNormalAndCoplanarPoint:function(a,b){// must be this.normal, not normal, as this.normal is normalized
return this.normal.copy(a),this.constant=-b.dot(this.normal),this},setFromCoplanarPoints:function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(c,d,e){var f=a.subVectors(e,d).cross(b.subVectors(c,d)).normalize();
// Q: should an error be thrown if normal is zero (e.g. degenerate plane)?
return this.setFromNormalAndCoplanarPoint(f,c),this}}(),copy:function(a){return this.normal.copy(a.normal),this.constant=a.constant,this},normalize:function(){
// Note: will lead to a divide by zero if the plane is invalid.
var a=1/this.normal.length();return this.normal.multiplyScalar(a),this.constant*=a,this},negate:function(){return this.constant*=-1,this.normal.negate(),this},distanceToPoint:function(a){return this.normal.dot(a)+this.constant},distanceToSphere:function(a){return this.distanceToPoint(a.center)-a.radius},projectPoint:function(a,b){return this.orthoPoint(a,b).sub(a).negate()},orthoPoint:function(a,b){var c=this.distanceToPoint(a),d=b||new THREE.Vector3;return d.copy(this.normal).multiplyScalar(c)},isIntersectionLine:function(a){
// Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.
var b=this.distanceToPoint(a.start),c=this.distanceToPoint(a.end);return 0>b&&c>0||0>c&&b>0},intersectLine:function(){var a=new THREE.Vector3;return function(b,c){var d=c||new THREE.Vector3,e=b.delta(a),f=this.normal.dot(e);if(0==f)
// line is coplanar, return origin
// line is coplanar, return origin
return 0==this.distanceToPoint(b.start)?d.copy(b.start):void 0;var g=-(b.start.dot(this.normal)+this.constant)/f;return 0>g||g>1?void 0:d.copy(e).multiplyScalar(g).add(b.start)}}(),coplanarPoint:function(a){var b=a||new THREE.Vector3;return b.copy(this.normal).multiplyScalar(-this.constant)},applyMatrix4:function(){var a=new THREE.Vector3,b=new THREE.Vector3,c=new THREE.Matrix3;return function(d,e){
// compute new normal based on theory here:
// http://www.songho.ca/opengl/gl_normaltransform.html
var f=e||c.getNormalMatrix(d),g=a.copy(this.normal).applyMatrix3(f),h=this.coplanarPoint(b);return h.applyMatrix4(d),this.setFromNormalAndCoplanarPoint(g,h),this}}(),translate:function(a){return this.constant=this.constant-a.dot(this.normal),this},equals:function(a){return a.normal.equals(this.normal)&&a.constant==this.constant},clone:function(){return(new THREE.Plane).copy(this)}},
// File:src/math/Math.js
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */
THREE.Math={generateUUID:function(){
// http://www.broofa.com/Tools/Math.uuid.htm
var a,b="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),c=new Array(36),d=0;return function(){for(var e=0;36>e;e++)8==e||13==e||18==e||23==e?c[e]="-":14==e?c[e]="4":(2>=d&&(d=33554432+16777216*Math.random()|0),a=15&d,d>>=4,c[e]=b[19==e?3&a|8:a]);return c.join("")}}(),
// Clamp value to range <a, b>
clamp:function(a,b,c){return b>a?b:a>c?c:a},
// Clamp value to range <a, inf)
clampBottom:function(a,b){return b>a?b:a},
// Linear mapping from range <a1, a2> to range <b1, b2>
mapLinear:function(a,b,c,d,e){return d+(a-b)*(e-d)/(c-b)},
// http://en.wikipedia.org/wiki/Smoothstep
smoothstep:function(a,b,c){return b>=a?0:a>=c?1:(a=(a-b)/(c-b),a*a*(3-2*a))},smootherstep:function(a,b,c){return b>=a?0:a>=c?1:(a=(a-b)/(c-b),a*a*a*(a*(6*a-15)+10))},
// Random float from <0, 1> with 16 bits of randomness
// (standard Math.random() creates repetitive patterns when applied over larger space)
random16:function(){return(65280*Math.random()+255*Math.random())/65535},
// Random integer from <low, high> interval
randInt:function(a,b){return a+Math.floor(Math.random()*(b-a+1))},
// Random float from <low, high> interval
randFloat:function(a,b){return a+Math.random()*(b-a)},
// Random float from <-range/2, range/2> interval
randFloatSpread:function(a){return a*(.5-Math.random())},sign:function(a){return 0>a?-1:a>0?1:0},degToRad:function(){var a=Math.PI/180;return function(b){return b*a}}(),radToDeg:function(){var a=180/Math.PI;return function(b){return b*a}}(),isPowerOfTwo:function(a){return 0===(a&a-1)&&0!==a}},
// File:src/math/Spline.js
/**
 * Spline from Tween.js, slightly optimized (and trashed)
 * http://sole.github.com/tween.js/examples/05_spline.html
 *
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.Spline=function(a){
// Catmull-Rom
function b(a,b,c,d,e,f,g){var h=.5*(c-a),i=.5*(d-b);return(2*(b-c)+h+i)*g+(-3*(b-c)-2*h-i)*f+h*e+b}this.points=a;var c,d,e,f,g,h,i,j,k,l=[],m={x:0,y:0,z:0};this.initFromArray=function(a){this.points=[];for(var b=0;b<a.length;b++)this.points[b]={x:a[b][0],y:a[b][1],z:a[b][2]}},this.getPoint=function(a){return c=(this.points.length-1)*a,d=Math.floor(c),e=c-d,l[0]=0===d?d:d-1,l[1]=d,l[2]=d>this.points.length-2?this.points.length-1:d+1,l[3]=d>this.points.length-3?this.points.length-1:d+2,h=this.points[l[0]],i=this.points[l[1]],j=this.points[l[2]],k=this.points[l[3]],f=e*e,g=e*f,m.x=b(h.x,i.x,j.x,k.x,e,f,g),m.y=b(h.y,i.y,j.y,k.y,e,f,g),m.z=b(h.z,i.z,j.z,k.z,e,f,g),m},this.getControlPointsArray=function(){var a,b,c=this.points.length,d=[];for(a=0;c>a;a++)b=this.points[a],d[a]=[b.x,b.y,b.z];return d},
// approximate length by summing linear segments
this.getLength=function(a){var b,c,d,e,f=0,g=0,h=0,i=new THREE.Vector3,j=new THREE.Vector3,k=[],l=0;for(
// first point has 0 length
k[0]=0,a||(a=100),d=this.points.length*a,i.copy(this.points[0]),b=1;d>b;b++)c=b/d,e=this.getPoint(c),j.copy(e),l+=j.distanceTo(i),i.copy(e),f=(this.points.length-1)*c,g=Math.floor(f),g!=h&&(k[g]=l,h=g);
// last point ends with total length
return k[k.length]=l,{chunks:k,total:l}},this.reparametrizeByArcLength=function(a){var b,c,d,e,f,g,h,i,j=[],k=new THREE.Vector3,l=this.getLength();for(j.push(k.copy(this.points[0]).clone()),b=1;b<this.points.length;b++){for(
//tmpVec.copy( this.points[ i - 1 ] );
//linearDistance = tmpVec.distanceTo( this.points[ i ] );
g=l.chunks[b]-l.chunks[b-1],h=Math.ceil(a*g/l.total),e=(b-1)/(this.points.length-1),f=b/(this.points.length-1),c=1;h-1>c;c++)d=e+c*(1/h)*(f-e),i=this.getPoint(d),j.push(k.copy(i).clone());j.push(k.copy(this.points[b]).clone())}this.points=j}},
// File:src/math/Triangle.js
/**
 * @author bhouston / http://exocortex.com
 * @author mrdoob / http://mrdoob.com/
 */
THREE.Triangle=function(a,b,c){this.a=void 0!==a?a:new THREE.Vector3,this.b=void 0!==b?b:new THREE.Vector3,this.c=void 0!==c?c:new THREE.Vector3},THREE.Triangle.normal=function(){var a=new THREE.Vector3;return function(b,c,d,e){var f=e||new THREE.Vector3;f.subVectors(d,c),a.subVectors(b,c),f.cross(a);var g=f.lengthSq();return g>0?f.multiplyScalar(1/Math.sqrt(g)):f.set(0,0,0)}}(),
// static/instance method to calculate barycoordinates
// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
THREE.Triangle.barycoordFromPoint=function(){var a=new THREE.Vector3,b=new THREE.Vector3,c=new THREE.Vector3;return function(d,e,f,g,h){a.subVectors(g,e),b.subVectors(f,e),c.subVectors(d,e);var i=a.dot(a),j=a.dot(b),k=a.dot(c),l=b.dot(b),m=b.dot(c),n=i*l-j*j,o=h||new THREE.Vector3;
// colinear or singular triangle
if(0==n)
// arbitrary location outside of triangle?
// not sure if this is the best idea, maybe should be returning undefined
return o.set(-2,-1,-1);var p=1/n,q=(l*k-j*m)*p,r=(i*m-j*k)*p;
// barycoordinates must always sum to 1
return o.set(1-q-r,r,q)}}(),THREE.Triangle.containsPoint=function(){var a=new THREE.Vector3;return function(b,c,d,e){var f=THREE.Triangle.barycoordFromPoint(b,c,d,e,a);return f.x>=0&&f.y>=0&&f.x+f.y<=1}}(),THREE.Triangle.prototype={constructor:THREE.Triangle,set:function(a,b,c){return this.a.copy(a),this.b.copy(b),this.c.copy(c),this},setFromPointsAndIndices:function(a,b,c,d){return this.a.copy(a[b]),this.b.copy(a[c]),this.c.copy(a[d]),this},copy:function(a){return this.a.copy(a.a),this.b.copy(a.b),this.c.copy(a.c),this},area:function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(){return a.subVectors(this.c,this.b),b.subVectors(this.a,this.b),.5*a.cross(b).length()}}(),midpoint:function(a){var b=a||new THREE.Vector3;return b.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)},normal:function(a){return THREE.Triangle.normal(this.a,this.b,this.c,a)},plane:function(a){var b=a||new THREE.Plane;return b.setFromCoplanarPoints(this.a,this.b,this.c)},barycoordFromPoint:function(a,b){return THREE.Triangle.barycoordFromPoint(a,this.a,this.b,this.c,b)},containsPoint:function(a){return THREE.Triangle.containsPoint(a,this.a,this.b,this.c)},equals:function(a){return a.a.equals(this.a)&&a.b.equals(this.b)&&a.c.equals(this.c)},clone:function(){return(new THREE.Triangle).copy(this)}},
// File:src/core/Clock.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.Clock=function(a){this.autoStart=void 0!==a?a:!0,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1},THREE.Clock.prototype={constructor:THREE.Clock,start:function(){this.startTime=void 0!==self.performance&&void 0!==self.performance.now?self.performance.now():Date.now(),this.oldTime=this.startTime,this.running=!0},stop:function(){this.getElapsedTime(),this.running=!1},getElapsedTime:function(){return this.getDelta(),this.elapsedTime},getDelta:function(){var a=0;if(this.autoStart&&!this.running&&this.start(),this.running){var b=void 0!==self.performance&&void 0!==self.performance.now?self.performance.now():Date.now();a=.001*(b-this.oldTime),this.oldTime=b,this.elapsedTime+=a}return a}},
// File:src/core/EventDispatcher.js
/**
 * https://github.com/mrdoob/eventdispatcher.js/
 */
THREE.EventDispatcher=function(){},THREE.EventDispatcher.prototype={constructor:THREE.EventDispatcher,apply:function(a){a.addEventListener=THREE.EventDispatcher.prototype.addEventListener,a.hasEventListener=THREE.EventDispatcher.prototype.hasEventListener,a.removeEventListener=THREE.EventDispatcher.prototype.removeEventListener,a.dispatchEvent=THREE.EventDispatcher.prototype.dispatchEvent},addEventListener:function(a,b){void 0===this._listeners&&(this._listeners={});var c=this._listeners;void 0===c[a]&&(c[a]=[]),-1===c[a].indexOf(b)&&c[a].push(b)},hasEventListener:function(a,b){if(void 0===this._listeners)return!1;var c=this._listeners;return void 0!==c[a]&&-1!==c[a].indexOf(b)?!0:!1},removeEventListener:function(a,b){if(void 0!==this._listeners){var c=this._listeners,d=c[a];if(void 0!==d){var e=d.indexOf(b);-1!==e&&d.splice(e,1)}}},dispatchEvent:function(a){if(void 0!==this._listeners){var b=this._listeners,c=b[a.type];if(void 0!==c){a.target=this;for(var d=[],e=c.length,f=0;e>f;f++)d[f]=c[f];for(var f=0;e>f;f++)d[f].call(this,a)}}}},
// File:src/core/Raycaster.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author bhouston / http://exocortex.com/
 * @author stephomi / http://stephaneginier.com/
 */
function(a){a.Raycaster=function(b,c,d,e){this.ray=new a.Ray(b,c),
// direction is assumed to be normalized (for accurate distance calculations)
this.near=d||0,this.far=e||1/0,this.params={Sprite:{},Mesh:{},PointCloud:{threshold:1},LOD:{},Line:{}}};var b=function(a,b){return a.distance-b.distance},c=function(a,b,d,e){if(a.raycast(b,d),e===!0)for(var f=a.children,g=0,h=f.length;h>g;g++)c(f[g],b,d,!0)};
//
a.Raycaster.prototype={constructor:a.Raycaster,precision:1e-4,linePrecision:1,set:function(a,b){this.ray.set(a,b)},intersectObject:function(a,d){var e=[];return c(a,this,e,d),e.sort(b),e},intersectObjects:function(a,d){for(var e=[],f=0,g=a.length;g>f;f++)c(a[f],this,e,d);return e.sort(b),e}}}(THREE),
// File:src/core/Object3D.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 */
THREE.Object3D=function(){this.id=THREE.Object3DIdCount++,this.uuid=THREE.Math.generateUUID(),this.name="",this.parent=void 0,this.children=[],this.up=THREE.Object3D.DefaultUp.clone();var a=new THREE.Vector3,b=new THREE.Euler,c=new THREE.Quaternion,d=new THREE.Vector3(1,1,1);b.onChange(function(){c.setFromEuler(b,!1)}),c.onChange(function(){b.setFromQuaternion(c,void 0,!1)}),Object.defineProperties(this,{position:{enumerable:!0,value:a},rotation:{enumerable:!0,value:b},quaternion:{enumerable:!0,value:c},scale:{enumerable:!0,value:d}}),this.renderDepth=null,this.rotationAutoUpdate=!0,this.matrix=new THREE.Matrix4,this.matrixWorld=new THREE.Matrix4,this.matrixAutoUpdate=!0,this.matrixWorldNeedsUpdate=!1,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.userData={}},THREE.Object3D.DefaultUp=new THREE.Vector3(0,1,0),THREE.Object3D.prototype={constructor:THREE.Object3D,get eulerOrder(){return console.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order."),this.rotation.order},set eulerOrder(a){console.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order."),this.rotation.order=a},get useQuaternion(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")},set useQuaternion(a){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")},applyMatrix:function(a){this.matrix.multiplyMatrices(a,this.matrix),this.matrix.decompose(this.position,this.quaternion,this.scale)},setRotationFromAxisAngle:function(a,b){
// assumes axis is normalized
this.quaternion.setFromAxisAngle(a,b)},setRotationFromEuler:function(a){this.quaternion.setFromEuler(a,!0)},setRotationFromMatrix:function(a){
// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
this.quaternion.setFromRotationMatrix(a)},setRotationFromQuaternion:function(a){
// assumes q is normalized
this.quaternion.copy(a)},rotateOnAxis:function(){
// rotate object on axis in object space
// axis is assumed to be normalized
var a=new THREE.Quaternion;return function(b,c){return a.setFromAxisAngle(b,c),this.quaternion.multiply(a),this}}(),rotateX:function(){var a=new THREE.Vector3(1,0,0);return function(b){return this.rotateOnAxis(a,b)}}(),rotateY:function(){var a=new THREE.Vector3(0,1,0);return function(b){return this.rotateOnAxis(a,b)}}(),rotateZ:function(){var a=new THREE.Vector3(0,0,1);return function(b){return this.rotateOnAxis(a,b)}}(),translateOnAxis:function(){
// translate object by distance along axis in object space
// axis is assumed to be normalized
var a=new THREE.Vector3;return function(b,c){return a.copy(b).applyQuaternion(this.quaternion),this.position.add(a.multiplyScalar(c)),this}}(),translate:function(a,b){return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."),this.translateOnAxis(b,a)},translateX:function(){var a=new THREE.Vector3(1,0,0);return function(b){return this.translateOnAxis(a,b)}}(),translateY:function(){var a=new THREE.Vector3(0,1,0);return function(b){return this.translateOnAxis(a,b)}}(),translateZ:function(){var a=new THREE.Vector3(0,0,1);return function(b){return this.translateOnAxis(a,b)}}(),localToWorld:function(a){return a.applyMatrix4(this.matrixWorld)},worldToLocal:function(){var a=new THREE.Matrix4;return function(b){return b.applyMatrix4(a.getInverse(this.matrixWorld))}}(),lookAt:function(){
// This routine does not support objects with rotated and/or translated parent(s)
var a=new THREE.Matrix4;return function(b){a.lookAt(b,this.position,this.up),this.quaternion.setFromRotationMatrix(a)}}(),add:function(a){if(arguments.length>1){for(var b=0;b<arguments.length;b++)this.add(arguments[b]);return this}if(a===this)return console.error("THREE.Object3D.add:",a,"can't be added as a child of itself."),this;if(a instanceof THREE.Object3D){void 0!==a.parent&&a.parent.remove(a),a.parent=this,a.dispatchEvent({type:"added"}),this.children.push(a);for(
// add to scene
var c=this;void 0!==c.parent;)c=c.parent;void 0!==c&&c instanceof THREE.Scene&&c.__addObject(a)}else console.error("THREE.Object3D.add:",a,"is not an instance of THREE.Object3D.");return this},remove:function(a){if(arguments.length>1)for(var b=0;b<arguments.length;b++)this.remove(arguments[b]);var c=this.children.indexOf(a);if(-1!==c){a.parent=void 0,a.dispatchEvent({type:"removed"}),this.children.splice(c,1);for(
// remove from scene
var d=this;void 0!==d.parent;)d=d.parent;void 0!==d&&d instanceof THREE.Scene&&d.__removeObject(a)}},raycast:function(){},traverse:function(a){a(this);for(var b=0,c=this.children.length;c>b;b++)this.children[b].traverse(a)},traverseVisible:function(a){if(this.visible!==!1){a(this);for(var b=0,c=this.children.length;c>b;b++)this.children[b].traverseVisible(a)}},getObjectById:function(a,b){for(var c=0,d=this.children.length;d>c;c++){var e=this.children[c];if(e.id===a)return e;if(b===!0&&(e=e.getObjectById(a,b),void 0!==e))return e}return void 0},getObjectByName:function(a,b){for(var c=0,d=this.children.length;d>c;c++){var e=this.children[c];if(e.name===a)return e;if(b===!0&&(e=e.getObjectByName(a,b),void 0!==e))return e}return void 0},getChildByName:function(a,b){return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."),this.getObjectByName(a,b)},updateMatrix:function(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0},updateMatrixWorld:function(a){this.matrixAutoUpdate===!0&&this.updateMatrix(),(this.matrixWorldNeedsUpdate===!0||a===!0)&&(void 0===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,a=!0);
// update children
for(var b=0,c=this.children.length;c>b;b++)this.children[b].updateMatrixWorld(a)},clone:function(a,b){if(void 0===a&&(a=new THREE.Object3D),void 0===b&&(b=!0),a.name=this.name,a.up.copy(this.up),a.position.copy(this.position),a.quaternion.copy(this.quaternion),a.scale.copy(this.scale),a.renderDepth=this.renderDepth,a.rotationAutoUpdate=this.rotationAutoUpdate,a.matrix.copy(this.matrix),a.matrixWorld.copy(this.matrixWorld),a.matrixAutoUpdate=this.matrixAutoUpdate,a.matrixWorldNeedsUpdate=this.matrixWorldNeedsUpdate,a.visible=this.visible,a.castShadow=this.castShadow,a.receiveShadow=this.receiveShadow,a.frustumCulled=this.frustumCulled,a.userData=JSON.parse(JSON.stringify(this.userData)),b===!0)for(var c=0;c<this.children.length;c++){var d=this.children[c];a.add(d.clone())}return a}},THREE.EventDispatcher.prototype.apply(THREE.Object3D.prototype),THREE.Object3DIdCount=0,
// File:src/core/Projector.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author julianwa / https://github.com/julianwa
 */
THREE.Projector=function(){
// Pools
function a(){if(i===t){var a=new THREE.RenderableObject;return s.push(a),t++,i++,a}return s[i++]}function b(){if(k===v){var a=new THREE.RenderableVertex;return u.push(a),v++,k++,a}return u[k++]}function c(){if(m===x){var a=new THREE.RenderableFace;return w.push(a),x++,m++,a}return w[m++]}function d(){if(o===z){var a=new THREE.RenderableLine;return y.push(a),z++,o++,a}return y[o++]}function e(){if(q===B){var a=new THREE.RenderableSprite;return A.push(a),B++,q++,a}return A[q++]}
//
function f(a,b){return a.z!==b.z?b.z-a.z:a.id!==b.id?a.id-b.id:0}function g(a,b){var c=0,d=1,
// Calculate the boundary coordinate of each vertex for the near and far clip planes,
// Z = -1 and Z = +1, respectively.
e=a.z+a.w,f=b.z+b.w,g=-a.z+a.w,h=-b.z+b.w;
// The line segment spans at least one clip plane.
// v1 lies outside the near plane, v2 inside
// v2 lies outside the near plane, v1 inside
// v1 lies outside the far plane, v2 inside
// v2 lies outside the far plane, v2 inside
// Update the s1 and s2 vertices to match the clipped line segment.
return e>=0&&f>=0&&g>=0&&h>=0?!0:0>e&&0>f||0>g&&0>h?!1:(0>e?c=Math.max(c,e/(e-f)):0>f&&(d=Math.min(d,e/(e-f))),0>g?c=Math.max(c,g/(g-h)):0>h&&(d=Math.min(d,g/(g-h))),c>d?!1:(a.lerp(b,c),b.lerp(a,1-d),!0))}var h,i,j,k,l,m,n,o,p,q,r,s=[],t=0,u=[],v=0,w=[],x=0,y=[],z=0,A=[],B=0,C={objects:[],lights:[],elements:[]},D=new THREE.Vector3,E=new THREE.Vector3,F=new THREE.Vector3,G=new THREE.Vector3,H=new THREE.Vector4,I=new THREE.Box3(new THREE.Vector3(-1,-1,-1),new THREE.Vector3(1,1,1)),J=new THREE.Box3,K=new Array(3),L=(new Array(4),new THREE.Matrix4),M=new THREE.Matrix4,N=new THREE.Matrix4,O=new THREE.Matrix3,P=new THREE.Frustum,Q=new THREE.Vector4,R=new THREE.Vector4;this.projectVector=function(a,b){return b.matrixWorldInverse.getInverse(b.matrixWorld),M.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse),a.applyProjection(M)},this.unprojectVector=function(){var a=new THREE.Matrix4;return function(b,c){return a.getInverse(c.projectionMatrix),M.multiplyMatrices(c.matrixWorld,a),b.applyProjection(M)}}(),this.pickingRay=function(a,b){
// set two vectors with opposing z values
a.z=-1;var c=new THREE.Vector3(a.x,a.y,1);
// find direction from vector to end
return this.unprojectVector(a,b),this.unprojectVector(c,b),c.sub(a).normalize(),new THREE.Raycaster(a,c)};var S=function(){var a=[],e=[],f=null,g=null,h=new THREE.Matrix3,i=function(b){f=b,g=f.material,h.getNormalMatrix(f.matrixWorld),a.length=0,e.length=0},k=function(a){var b=a.position,c=a.positionWorld,d=a.positionScreen;c.copy(b).applyMatrix4(r),d.copy(c).applyMatrix4(M);var e=1/d.w;d.x*=e,d.y*=e,d.z*=e,a.visible=d.x>=-1&&d.x<=1&&d.y>=-1&&d.y<=1&&d.z>=-1&&d.z<=1},m=function(a,c,d){j=b(),j.position.set(a,c,d),k(j)},o=function(b,c,d){a.push(b,c,d)},p=function(a,b){e.push(a,b)},q=function(a,b,c){return a.visible===!0||b.visible===!0||c.visible===!0?!0:(K[0]=a.positionScreen,K[1]=b.positionScreen,K[2]=c.positionScreen,I.isIntersectionBox(J.setFromPoints(K)))},s=function(a,b,c){return(c.positionScreen.x-a.positionScreen.x)*(b.positionScreen.y-a.positionScreen.y)-(c.positionScreen.y-a.positionScreen.y)*(b.positionScreen.x-a.positionScreen.x)<0},t=function(a,b){var c=u[a],e=u[b];n=d(),n.id=f.id,n.v1.copy(c),n.v2.copy(e),n.z=(c.positionScreen.z+e.positionScreen.z)/2,n.material=f.material,C.elements.push(n)},v=function(b,d,i){var j=u[b],k=u[d],m=u[i];if(q(j,k,m)!==!1&&(g.side===THREE.DoubleSide||s(j,k,m)===!0)){l=c(),l.id=f.id,l.v1.copy(j),l.v2.copy(k),l.v3.copy(m),l.z=(j.positionScreen.z+k.positionScreen.z+m.positionScreen.z)/3;for(var n=0;3>n;n++){var o=3*arguments[n],p=l.vertexNormalsModel[n];p.set(a[o],a[o+1],a[o+2]),p.applyMatrix3(h).normalize();var r=2*arguments[n],t=l.uvs[n];t.set(e[r],e[r+1])}l.vertexNormalsLength=3,l.material=f.material,C.elements.push(l)}};return{setObject:i,projectVertex:k,checkTriangleVisibility:q,checkBackfaceCulling:s,pushVertex:m,pushNormal:o,pushUv:p,pushLine:t,pushTriangle:v}},T=new S;this.projectScene=function(j,s,t,v){m=0,o=0,q=0,C.elements.length=0,j.autoUpdate===!0&&j.updateMatrixWorld(),void 0===s.parent&&s.updateMatrixWorld(),L.copy(s.matrixWorldInverse.getInverse(s.matrixWorld)),M.multiplyMatrices(s.projectionMatrix,L),P.setFromMatrix(M),
//
i=0,C.objects.length=0,C.lights.length=0,j.traverseVisible(function(b){b instanceof THREE.Light?C.lights.push(b):(b instanceof THREE.Mesh||b instanceof THREE.Line||b instanceof THREE.Sprite)&&(b.frustumCulled===!1||P.intersectsObject(b)===!0)&&(h=a(),h.id=b.id,h.object=b,null!==b.renderDepth?h.z=b.renderDepth:(G.setFromMatrixPosition(b.matrixWorld),G.applyProjection(M),h.z=G.z),C.objects.push(h))}),t===!0&&C.objects.sort(f);
//
for(var w=0,x=C.objects.length;x>w;w++){var y=C.objects[w].object,z=y.geometry;if(T.setObject(y),r=y.matrixWorld,k=0,y instanceof THREE.Mesh){if(z instanceof THREE.BufferGeometry){var A=z.attributes,B=z.offsets;if(void 0===A.position)continue;for(var I=A.position.array,J=0,K=I.length;K>J;J+=3)T.pushVertex(I[J],I[J+1],I[J+2]);if(void 0!==A.normal)for(var S=A.normal.array,J=0,K=S.length;K>J;J+=3)T.pushNormal(S[J],S[J+1],S[J+2]);if(void 0!==A.uv)for(var U=A.uv.array,J=0,K=U.length;K>J;J+=2)T.pushUv(U[J],U[J+1]);if(void 0!==A.index){var V=A.index.array;if(B.length>0)for(var w=0;w<B.length;w++)for(var W=B[w],X=W.index,J=W.start,K=W.start+W.count;K>J;J+=3)T.pushTriangle(V[J]+X,V[J+1]+X,V[J+2]+X);else for(var J=0,K=V.length;K>J;J+=3)T.pushTriangle(V[J],V[J+1],V[J+2])}else for(var J=0,K=I.length/3;K>J;J+=3)T.pushTriangle(J,J+1,J+2)}else if(z instanceof THREE.Geometry){var Y=z.vertices,Z=z.faces,$=z.faceVertexUvs[0];O.getNormalMatrix(r);for(var _=y.material instanceof THREE.MeshFaceMaterial,aa=_===!0?y.material:null,ba=0,ca=Y.length;ca>ba;ba++){var da=Y[ba];T.pushVertex(da.x,da.y,da.z)}for(var ea=0,fa=Z.length;fa>ea;ea++){var ga=Z[ea],ha=_===!0?aa.materials[ga.materialIndex]:y.material;if(void 0!==ha){var ia=ha.side,ja=u[ga.a],ka=u[ga.b],la=u[ga.c];if(ha.morphTargets===!0){var ma=z.morphTargets,na=y.morphTargetInfluences,oa=ja.position,pa=ka.position,qa=la.position;D.set(0,0,0),E.set(0,0,0),F.set(0,0,0);for(var ra=0,sa=ma.length;sa>ra;ra++){var ta=na[ra];if(0!==ta){var ua=ma[ra].vertices;D.x+=(ua[ga.a].x-oa.x)*ta,D.y+=(ua[ga.a].y-oa.y)*ta,D.z+=(ua[ga.a].z-oa.z)*ta,E.x+=(ua[ga.b].x-pa.x)*ta,E.y+=(ua[ga.b].y-pa.y)*ta,E.z+=(ua[ga.b].z-pa.z)*ta,F.x+=(ua[ga.c].x-qa.x)*ta,F.y+=(ua[ga.c].y-qa.y)*ta,F.z+=(ua[ga.c].z-qa.z)*ta}}ja.position.add(D),ka.position.add(E),la.position.add(F),T.projectVertex(ja),T.projectVertex(ka),T.projectVertex(la)}if(T.checkTriangleVisibility(ja,ka,la)!==!1){var va=T.checkBackfaceCulling(ja,ka,la);if(ia!==THREE.DoubleSide){if(ia===THREE.FrontSide&&va===!1)continue;if(ia===THREE.BackSide&&va===!0)continue}l=c(),l.id=y.id,l.v1.copy(ja),l.v2.copy(ka),l.v3.copy(la),l.normalModel.copy(ga.normal),va!==!1||ia!==THREE.BackSide&&ia!==THREE.DoubleSide||l.normalModel.negate(),l.normalModel.applyMatrix3(O).normalize();for(var wa=ga.vertexNormals,xa=0,ya=Math.min(wa.length,3);ya>xa;xa++){var za=l.vertexNormalsModel[xa];za.copy(wa[xa]),va!==!1||ia!==THREE.BackSide&&ia!==THREE.DoubleSide||za.negate(),za.applyMatrix3(O).normalize()}l.vertexNormalsLength=wa.length;var Aa=$[ea];if(void 0!==Aa)for(var Ba=0;3>Ba;Ba++)l.uvs[Ba].copy(Aa[Ba]);l.color=ga.color,l.material=ha,l.z=(ja.positionScreen.z+ka.positionScreen.z+la.positionScreen.z)/3,C.elements.push(l)}}}}}else if(y instanceof THREE.Line){if(z instanceof THREE.BufferGeometry){var A=z.attributes;if(void 0!==A.position){for(var I=A.position.array,J=0,K=I.length;K>J;J+=3)T.pushVertex(I[J],I[J+1],I[J+2]);if(void 0!==A.index)for(var V=A.index.array,J=0,K=V.length;K>J;J+=2)T.pushLine(V[J],V[J+1]);else for(var Ca=y.type===THREE.LinePieces?2:1,J=0,K=I.length/3-1;K>J;J+=Ca)T.pushLine(J,J+1)}}else if(z instanceof THREE.Geometry){N.multiplyMatrices(M,r);var Y=y.geometry.vertices;if(0===Y.length)continue;ja=b(),ja.positionScreen.copy(Y[0]).applyMatrix4(N);for(var Ca=y.type===THREE.LinePieces?2:1,ba=1,ca=Y.length;ca>ba;ba++)ja=b(),ja.positionScreen.copy(Y[ba]).applyMatrix4(N),(ba+1)%Ca>0||(ka=u[k-2],Q.copy(ja.positionScreen),R.copy(ka.positionScreen),g(Q,R)===!0&&(
// Perform the perspective divide
Q.multiplyScalar(1/Q.w),R.multiplyScalar(1/R.w),n=d(),n.id=y.id,n.v1.positionScreen.copy(Q),n.v2.positionScreen.copy(R),n.z=Math.max(Q.z,R.z),n.material=y.material,y.material.vertexColors===THREE.VertexColors&&(n.vertexColors[0].copy(y.geometry.colors[ba]),n.vertexColors[1].copy(y.geometry.colors[ba-1])),C.elements.push(n)))}}else if(y instanceof THREE.Sprite){H.set(r.elements[12],r.elements[13],r.elements[14],1),H.applyMatrix4(M);var Da=1/H.w;H.z*=Da,H.z>=-1&&H.z<=1&&(p=e(),p.id=y.id,p.x=H.x*Da,p.y=H.y*Da,p.z=H.z,p.object=y,p.rotation=y.rotation,p.scale.x=y.scale.x*Math.abs(p.x-(H.x+s.projectionMatrix.elements[0])/(H.w+s.projectionMatrix.elements[12])),p.scale.y=y.scale.y*Math.abs(p.y-(H.y+s.projectionMatrix.elements[5])/(H.w+s.projectionMatrix.elements[13])),p.material=y.material,C.elements.push(p))}}return v===!0&&C.elements.sort(f),C}},
// File:src/core/Face3.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.Face3=function(a,b,c,d,e,f){this.a=a,this.b=b,this.c=c,this.normal=d instanceof THREE.Vector3?d:new THREE.Vector3,this.vertexNormals=d instanceof Array?d:[],this.color=e instanceof THREE.Color?e:new THREE.Color,this.vertexColors=e instanceof Array?e:[],this.vertexTangents=[],this.materialIndex=void 0!==f?f:0},THREE.Face3.prototype={constructor:THREE.Face3,clone:function(){var a=new THREE.Face3(this.a,this.b,this.c);a.normal.copy(this.normal),a.color.copy(this.color),a.materialIndex=this.materialIndex;for(var b=0,c=this.vertexNormals.length;c>b;b++)a.vertexNormals[b]=this.vertexNormals[b].clone();for(var b=0,c=this.vertexColors.length;c>b;b++)a.vertexColors[b]=this.vertexColors[b].clone();for(var b=0,c=this.vertexTangents.length;c>b;b++)a.vertexTangents[b]=this.vertexTangents[b].clone();return a}},
// File:src/core/Face4.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.Face4=function(a,b,c,d,e,f,g){return console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."),new THREE.Face3(a,b,c,e,f,g)},
// File:src/core/BufferAttribute.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.BufferAttribute=function(a,b){this.array=a,this.itemSize=b},THREE.BufferAttribute.prototype={constructor:THREE.BufferAttribute,get length(){return this.array.length},set:function(a){return this.array.set(a),this},setX:function(a,b){return this.array[a*this.itemSize]=b,this},setY:function(a,b){return this.array[a*this.itemSize+1]=b,this},setZ:function(a,b){return this.array[a*this.itemSize+2]=b,this},setXY:function(a,b,c){return a*=this.itemSize,this.array[a]=b,this.array[a+1]=c,this},setXYZ:function(a,b,c,d){return a*=this.itemSize,this.array[a]=b,this.array[a+1]=c,this.array[a+2]=d,this},setXYZW:function(a,b,c,d,e){return a*=this.itemSize,this.array[a]=b,this.array[a+1]=c,this.array[a+2]=d,this.array[a+3]=e,this}},
//
THREE.Int8Attribute=function(a,b){return console.warn("THREE.Int8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),new THREE.BufferAttribute(a,b)},THREE.Uint8Attribute=function(a,b){return console.warn("THREE.Uint8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),new THREE.BufferAttribute(a,b)},THREE.Uint8ClampedAttribute=function(a,b){return console.warn("THREE.Uint8ClampedAttribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),new THREE.BufferAttribute(a,b)},THREE.Int16Attribute=function(a,b){return console.warn("THREE.Int16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),new THREE.BufferAttribute(a,b)},THREE.Uint16Attribute=function(a,b){return console.warn("THREE.Uint16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),new THREE.BufferAttribute(a,b)},THREE.Int32Attribute=function(a,b){return console.warn("THREE.Int32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),new THREE.BufferAttribute(a,b)},THREE.Uint32Attribute=function(a,b){return console.warn("THREE.Uint32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),new THREE.BufferAttribute(a,b)},THREE.Float32Attribute=function(a,b){return console.warn("THREE.Float32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),new THREE.BufferAttribute(a,b)},THREE.Float64Attribute=function(a,b){return console.warn("THREE.Float64Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),new THREE.BufferAttribute(a,b)},
// File:src/core/BufferGeometry.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.BufferGeometry=function(){this.id=THREE.GeometryIdCount++,this.uuid=THREE.Math.generateUUID(),this.name="",this.attributes={},this.drawcalls=[],this.offsets=this.drawcalls,// backwards compatibility
this.boundingBox=null,this.boundingSphere=null},THREE.BufferGeometry.prototype={constructor:THREE.BufferGeometry,addAttribute:function(a,b){return b instanceof THREE.BufferAttribute==!1?(console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),void(this.attributes[a]={array:arguments[1],itemSize:arguments[2]})):void(this.attributes[a]=b)},getAttribute:function(a){return this.attributes[a]},addDrawCall:function(a,b,c){this.drawcalls.push({start:a,count:b,index:void 0!==c?c:0})},applyMatrix:function(a){var b=this.attributes.position;void 0!==b&&(a.applyToVector3Array(b.array),b.needsUpdate=!0);var c=this.attributes.normal;if(void 0!==c){var d=(new THREE.Matrix3).getNormalMatrix(a);d.applyToVector3Array(c.array),c.needsUpdate=!0}},fromGeometry:function(a,b){b=b||{vertexColors:THREE.NoColors};var c=a.vertices,d=a.faces,e=a.faceVertexUvs,f=b.vertexColors,g=e[0].length>0,h=3==d[0].vertexNormals.length,i=new Float32Array(3*d.length*3);this.addAttribute("position",new THREE.BufferAttribute(i,3));var j=new Float32Array(3*d.length*3);if(this.addAttribute("normal",new THREE.BufferAttribute(j,3)),f!==THREE.NoColors){var k=new Float32Array(3*d.length*3);this.addAttribute("color",new THREE.BufferAttribute(k,3))}if(g===!0){var l=new Float32Array(3*d.length*2);this.addAttribute("uvs",new THREE.BufferAttribute(l,2))}for(var m=0,n=0,o=0;m<d.length;m++,n+=6,o+=9){var p=d[m],q=c[p.a],r=c[p.b],s=c[p.c];if(i[o]=q.x,i[o+1]=q.y,i[o+2]=q.z,i[o+3]=r.x,i[o+4]=r.y,i[o+5]=r.z,i[o+6]=s.x,i[o+7]=s.y,i[o+8]=s.z,h===!0){var t=p.vertexNormals[0],u=p.vertexNormals[1],v=p.vertexNormals[2];j[o]=t.x,j[o+1]=t.y,j[o+2]=t.z,j[o+3]=u.x,j[o+4]=u.y,j[o+5]=u.z,j[o+6]=v.x,j[o+7]=v.y,j[o+8]=v.z}else{var w=p.normal;j[o]=w.x,j[o+1]=w.y,j[o+2]=w.z,j[o+3]=w.x,j[o+4]=w.y,j[o+5]=w.z,j[o+6]=w.x,j[o+7]=w.y,j[o+8]=w.z}if(f===THREE.FaceColors){var x=p.color;k[o]=x.r,k[o+1]=x.g,k[o+2]=x.b,k[o+3]=x.r,k[o+4]=x.g,k[o+5]=x.b,k[o+6]=x.r,k[o+7]=x.g,k[o+8]=x.b}else if(f===THREE.VertexColors){var y=p.vertexColors[0],z=p.vertexColors[1],A=p.vertexColors[2];k[o]=y.r,k[o+1]=y.g,k[o+2]=y.b,k[o+3]=z.r,k[o+4]=z.g,k[o+5]=z.b,k[o+6]=A.r,k[o+7]=A.g,k[o+8]=A.b}if(g===!0){var B=e[0][m][0],C=e[0][m][1],D=e[0][m][2];l[n]=B.x,l[n+1]=B.y,l[n+2]=C.x,l[n+3]=C.y,l[n+4]=D.x,l[n+5]=D.y}}return this.computeBoundingSphere(),this},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new THREE.Box3);var a=this.attributes.position.array;if(a){var b=this.boundingBox;a.length>=3&&(b.min.x=b.max.x=a[0],b.min.y=b.max.y=a[1],b.min.z=b.max.z=a[2]);for(var c=3,d=a.length;d>c;c+=3){var e=a[c],f=a[c+1],g=a[c+2];
// bounding box
e<b.min.x?b.min.x=e:e>b.max.x&&(b.max.x=e),f<b.min.y?b.min.y=f:f>b.max.y&&(b.max.y=f),g<b.min.z?b.min.z=g:g>b.max.z&&(b.max.z=g)}}(void 0===a||0===a.length)&&(this.boundingBox.min.set(0,0,0),this.boundingBox.max.set(0,0,0)),(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.')},computeBoundingSphere:function(){var a=new THREE.Box3,b=new THREE.Vector3;return function(){null===this.boundingSphere&&(this.boundingSphere=new THREE.Sphere);var c=this.attributes.position.array;if(c){a.makeEmpty();for(var d=this.boundingSphere.center,e=0,f=c.length;f>e;e+=3)b.set(c[e],c[e+1],c[e+2]),a.expandByPoint(b);a.center(d);for(var g=0,e=0,f=c.length;f>e;e+=3)b.set(c[e],c[e+1],c[e+2]),g=Math.max(g,d.distanceToSquared(b));this.boundingSphere.radius=Math.sqrt(g),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.')}}}(),computeFaceNormals:function(){},computeVertexNormals:function(){if(this.attributes.position){var a,b,c,d,e=this.attributes.position.array.length;if(void 0===this.attributes.normal)this.attributes.normal={itemSize:3,array:new Float32Array(e)};else
// reset existing normals to zero
for(a=0,b=this.attributes.normal.array.length;b>a;a++)this.attributes.normal.array[a]=0;var f,g,h,i,j,k,l=this.attributes.position.array,m=this.attributes.normal.array,n=new THREE.Vector3,o=new THREE.Vector3,p=new THREE.Vector3,q=new THREE.Vector3,r=new THREE.Vector3;
// indexed elements
if(this.attributes.index){var s=this.attributes.index.array,t=this.offsets.length>0?this.offsets:[{start:0,count:s.length,index:0}];for(c=0,d=t.length;d>c;++c){var u=t[c].start,v=t[c].count,w=t[c].index;for(a=u,b=u+v;b>a;a+=3)f=w+s[a],g=w+s[a+1],h=w+s[a+2],i=l[3*f],j=l[3*f+1],k=l[3*f+2],n.set(i,j,k),i=l[3*g],j=l[3*g+1],k=l[3*g+2],o.set(i,j,k),i=l[3*h],j=l[3*h+1],k=l[3*h+2],p.set(i,j,k),q.subVectors(p,o),r.subVectors(n,o),q.cross(r),m[3*f]+=q.x,m[3*f+1]+=q.y,m[3*f+2]+=q.z,m[3*g]+=q.x,m[3*g+1]+=q.y,m[3*g+2]+=q.z,m[3*h]+=q.x,m[3*h+1]+=q.y,m[3*h+2]+=q.z}}else for(a=0,b=l.length;b>a;a+=9)i=l[a],j=l[a+1],k=l[a+2],n.set(i,j,k),i=l[a+3],j=l[a+4],k=l[a+5],o.set(i,j,k),i=l[a+6],j=l[a+7],k=l[a+8],p.set(i,j,k),q.subVectors(p,o),r.subVectors(n,o),q.cross(r),m[a]=q.x,m[a+1]=q.y,m[a+2]=q.z,m[a+3]=q.x,m[a+4]=q.y,m[a+5]=q.z,m[a+6]=q.x,m[a+7]=q.y,m[a+8]=q.z;this.normalizeNormals(),this.normalsNeedUpdate=!0}},computeTangents:function(){function a(a,b,c){m=d[3*a],n=d[3*a+1],o=d[3*a+2],p=d[3*b],q=d[3*b+1],r=d[3*b+2],s=d[3*c],t=d[3*c+1],u=d[3*c+2],v=f[2*a],w=f[2*a+1],x=f[2*b],y=f[2*b+1],z=f[2*c],A=f[2*c+1],B=p-m,C=s-m,D=q-n,E=t-n,F=r-o,G=u-o,H=x-v,I=z-v,J=y-w,K=A-w,L=1/(H*K-I*J),T.set((K*B-J*C)*L,(K*D-J*E)*L,(K*F-J*G)*L),U.set((H*C-I*B)*L,(H*E-I*D)*L,(H*G-I*F)*L),j[a].add(T),j[b].add(T),j[c].add(T),k[a].add(U),k[b].add(U),k[c].add(U)}function b(a){ca.x=e[3*a],ca.y=e[3*a+1],ca.z=e[3*a+2],da.copy(ca),$=j[a],
// Gram-Schmidt orthogonalize
aa.copy($),aa.sub(ca.multiplyScalar(ca.dot($))).normalize(),
// Calculate handedness
ba.crossVectors(da,$),_=ba.dot(k[a]),Z=0>_?-1:1,i[4*a]=aa.x,i[4*a+1]=aa.y,i[4*a+2]=aa.z,i[4*a+3]=Z}
// based on http://www.terathon.com/code/tangent.html
// (per vertex tangents)
if(void 0===this.attributes.index||void 0===this.attributes.position||void 0===this.attributes.normal||void 0===this.attributes.uv)return void console.warn("Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");var c=this.attributes.index.array,d=this.attributes.position.array,e=this.attributes.normal.array,f=this.attributes.uv.array,g=d.length/3;if(void 0===this.attributes.tangent){var h=4*g;this.attributes.tangent={itemSize:4,array:new Float32Array(h)}}for(var i=this.attributes.tangent.array,j=[],k=[],l=0;g>l;l++)j[l]=new THREE.Vector3,k[l]=new THREE.Vector3;var m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T=new THREE.Vector3,U=new THREE.Vector3,V=this.offsets;for(O=0,P=V.length;P>O;++O){var W=V[O].start,X=V[O].count,Y=V[O].index;for(M=W,N=W+X;N>M;M+=3)Q=Y+c[M],R=Y+c[M+1],S=Y+c[M+2],a(Q,R,S)}var Z,$,_,aa=new THREE.Vector3,ba=new THREE.Vector3,ca=new THREE.Vector3,da=new THREE.Vector3;for(O=0,P=V.length;P>O;++O){var W=V[O].start,X=V[O].count,Y=V[O].index;for(M=W,N=W+X;N>M;M+=3)Q=Y+c[M],R=Y+c[M+1],S=Y+c[M+2],b(Q),b(R),b(S)}},/*
		computeOffsets
		Compute the draw offset for large models by chunking the index buffer into chunks of 65k addressable vertices.
		This method will effectively rewrite the index buffer and remap all attributes to match the new indices.
		WARNING: This method will also expand the vertex count to prevent sprawled triangles across draw offsets.
		indexBufferSize - Defaults to 65535, but allows for larger or smaller chunks.
	*/
computeOffsets:function(a){var b=a;void 0===a&&(b=65535);for(var c=(Date.now(),this.attributes.index.array),d=this.attributes.position.array,e=(d.length/3,c.length/3),f=new Uint16Array(c.length),g=0,h=0,i=[{start:0,count:0,index:0}],j=i[0],k=0,l=0,m=new Int32Array(6),n=new Int32Array(d.length),o=new Int32Array(d.length),p=0;p<d.length;p++)n[p]=-1,o[p]=-1;/*
			Traverse every face and reorder vertices in the proper offsets of 65k.
			We can have more than 65k entries in the index buffer per offset, but only reference 65k values.
		*/
for(var q=0;e>q;q++){l=0;for(var r=0;3>r;r++){var s=c[3*q+r];-1==n[s]?(
//Unmapped vertice
m[2*r]=s,m[2*r+1]=-1,l++):n[s]<j.index?(
//Reused vertices from previous block (duplicate)
m[2*r]=s,m[2*r+1]=-1,k++):(
//Reused vertice in the current block
m[2*r]=s,m[2*r+1]=n[s])}var t=h+l;if(t>j.index+b){var u={start:g,count:0,index:h};i.push(u),j=u;
//Re-evaluate reused vertices in light of new offset.
for(var v=0;6>v;v+=2){var w=m[v+1];w>-1&&w<j.index&&(m[v+1]=-1)}}
//Reindex the face.
for(var v=0;6>v;v+=2){var s=m[v],w=m[v+1];-1===w&&(w=h++),n[s]=w,o[w]=s,f[g++]=w-j.index,//XXX overflows at 16bit
j.count++}}/*
		var orderTime = Date.now();
		console.log("Reorder time: "+(orderTime-s)+"ms");
		console.log("Duplicated "+duplicatedVertices+" vertices.");
		console.log("Compute Buffers time: "+(Date.now()-s)+"ms");
		console.log("Draw offsets: "+offsets.length);
		*/
/* Move all attribute values to map to the new computed indices , also expand the vertice stack to match our new vertexPtr. */
return this.reorderBuffers(f,o,h),this.offsets=i,i},merge:function(){console.log("BufferGeometry.merge(): TODO")},normalizeNormals:function(){for(var a,b,c,d,e=this.attributes.normal.array,f=0,g=e.length;g>f;f+=3)a=e[f],b=e[f+1],c=e[f+2],d=1/Math.sqrt(a*a+b*b+c*c),e[f]*=d,e[f+1]*=d,e[f+2]*=d},/*
		reoderBuffers:
		Reorder attributes based on a new indexBuffer and indexMap.
		indexBuffer - Uint16Array of the new ordered indices.
		indexMap - Int32Array where the position is the new vertex ID and the value the old vertex ID for each vertex.
		vertexCount - Amount of total vertices considered in this reordering (in case you want to grow the vertice stack).
	*/
reorderBuffers:function(a,b,c){/* Create a copy of all attributes for reordering. */
var d={},e=[Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];for(var f in this.attributes)if("index"!=f)for(var g=this.attributes[f].array,h=0,i=e.length;i>h;h++){var j=e[h];if(g instanceof j){d[f]=new j(this.attributes[f].itemSize*c);break}}/* Move attribute positions based on the new index map */
for(var k=0;c>k;k++){var l=b[k];for(var f in this.attributes)if("index"!=f)for(var m=this.attributes[f].array,n=this.attributes[f].itemSize,o=d[f],p=0;n>p;p++)o[k*n+p]=m[l*n+p]}/* Carry the new sorted buffers locally */
this.attributes.index.array=a;for(var f in this.attributes)"index"!=f&&(this.attributes[f].array=d[f],this.attributes[f].numItems=this.attributes[f].itemSize*c)},clone:function(){var a=new THREE.BufferGeometry,b=[Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];for(var c in this.attributes){for(var d=this.attributes[c],e=d.array,f={itemSize:d.itemSize,array:null},g=0,h=b.length;h>g;g++){var i=b[g];if(e instanceof i){f.array=new i(e);break}}a.attributes[c]=f}for(var g=0,h=this.offsets.length;h>g;g++){var j=this.offsets[g];a.offsets.push({start:j.start,index:j.index,count:j.count})}return a},dispose:function(){this.dispatchEvent({type:"dispose"})}},THREE.EventDispatcher.prototype.apply(THREE.BufferGeometry.prototype),
// File:src/core/Geometry.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author bhouston / http://exocortex.com
 */
THREE.Geometry=function(){this.id=THREE.GeometryIdCount++,this.uuid=THREE.Math.generateUUID(),this.name="",this.vertices=[],this.colors=[],// one-to-one vertex colors, used in Points and Line
this.faces=[],this.faceVertexUvs=[[]],this.morphTargets=[],this.morphColors=[],this.morphNormals=[],this.skinWeights=[],this.skinIndices=[],this.lineDistances=[],this.boundingBox=null,this.boundingSphere=null,this.hasTangents=!1,this.dynamic=!0,// the intermediate typed arrays will be deleted when set to false
// update flags
this.verticesNeedUpdate=!1,this.elementsNeedUpdate=!1,this.uvsNeedUpdate=!1,this.normalsNeedUpdate=!1,this.tangentsNeedUpdate=!1,this.colorsNeedUpdate=!1,this.lineDistancesNeedUpdate=!1,this.buffersNeedUpdate=!1,this.groupsNeedUpdate=!1},THREE.Geometry.prototype={constructor:THREE.Geometry,applyMatrix:function(a){for(var b=(new THREE.Matrix3).getNormalMatrix(a),c=0,d=this.vertices.length;d>c;c++){var e=this.vertices[c];e.applyMatrix4(a)}for(var c=0,d=this.faces.length;d>c;c++){var f=this.faces[c];f.normal.applyMatrix3(b).normalize();for(var g=0,h=f.vertexNormals.length;h>g;g++)f.vertexNormals[g].applyMatrix3(b).normalize()}this.boundingBox instanceof THREE.Box3&&this.computeBoundingBox(),this.boundingSphere instanceof THREE.Sphere&&this.computeBoundingSphere()},center:function(){this.computeBoundingBox();var a=new THREE.Vector3;return a.addVectors(this.boundingBox.min,this.boundingBox.max),a.multiplyScalar(-.5),this.applyMatrix((new THREE.Matrix4).makeTranslation(a.x,a.y,a.z)),this.computeBoundingBox(),a},computeFaceNormals:function(){for(var a=new THREE.Vector3,b=new THREE.Vector3,c=0,d=this.faces.length;d>c;c++){var e=this.faces[c],f=this.vertices[e.a],g=this.vertices[e.b],h=this.vertices[e.c];a.subVectors(h,g),b.subVectors(f,g),a.cross(b),a.normalize(),e.normal.copy(a)}},computeVertexNormals:function(a){var b,c,d,e,f,g;for(g=new Array(this.vertices.length),b=0,c=this.vertices.length;c>b;b++)g[b]=new THREE.Vector3;if(a){
// vertex normals weighted by triangle areas
// http://www.iquilezles.org/www/articles/normals/normals.htm
var h,i,j,k=new THREE.Vector3,l=new THREE.Vector3;new THREE.Vector3,new THREE.Vector3,new THREE.Vector3;for(d=0,e=this.faces.length;e>d;d++)f=this.faces[d],h=this.vertices[f.a],i=this.vertices[f.b],j=this.vertices[f.c],k.subVectors(j,i),l.subVectors(h,i),k.cross(l),g[f.a].add(k),g[f.b].add(k),g[f.c].add(k)}else for(d=0,e=this.faces.length;e>d;d++)f=this.faces[d],g[f.a].add(f.normal),g[f.b].add(f.normal),g[f.c].add(f.normal);for(b=0,c=this.vertices.length;c>b;b++)g[b].normalize();for(d=0,e=this.faces.length;e>d;d++)f=this.faces[d],f.vertexNormals[0]=g[f.a].clone(),f.vertexNormals[1]=g[f.b].clone(),f.vertexNormals[2]=g[f.c].clone()},computeMorphNormals:function(){var a,b,c,d,e;
// save original normals
// - create temp variables on first access
//   otherwise just copy (for faster repeated calls)
for(c=0,d=this.faces.length;d>c;c++)for(e=this.faces[c],e.__originalFaceNormal?e.__originalFaceNormal.copy(e.normal):e.__originalFaceNormal=e.normal.clone(),e.__originalVertexNormals||(e.__originalVertexNormals=[]),a=0,b=e.vertexNormals.length;b>a;a++)e.__originalVertexNormals[a]?e.__originalVertexNormals[a].copy(e.vertexNormals[a]):e.__originalVertexNormals[a]=e.vertexNormals[a].clone();
// use temp geometry to compute face and vertex normals for each morph
var f=new THREE.Geometry;for(f.faces=this.faces,a=0,b=this.morphTargets.length;b>a;a++){
// create on first access
if(!this.morphNormals[a]){this.morphNormals[a]={},this.morphNormals[a].faceNormals=[],this.morphNormals[a].vertexNormals=[];var g,h,i=this.morphNormals[a].faceNormals,j=this.morphNormals[a].vertexNormals;for(c=0,d=this.faces.length;d>c;c++)g=new THREE.Vector3,h={a:new THREE.Vector3,b:new THREE.Vector3,c:new THREE.Vector3},i.push(g),j.push(h)}var k=this.morphNormals[a];
// set vertices to morph target
f.vertices=this.morphTargets[a].vertices,
// compute morph normals
f.computeFaceNormals(),f.computeVertexNormals();
// store morph normals
var g,h;for(c=0,d=this.faces.length;d>c;c++)e=this.faces[c],g=k.faceNormals[c],h=k.vertexNormals[c],g.copy(e.normal),h.a.copy(e.vertexNormals[0]),h.b.copy(e.vertexNormals[1]),h.c.copy(e.vertexNormals[2])}
// restore original normals
for(c=0,d=this.faces.length;d>c;c++)e=this.faces[c],e.normal=e.__originalFaceNormal,e.vertexNormals=e.__originalVertexNormals},computeTangents:function(){function a(a,b,c,d,e,f,g){j=a.vertices[b],k=a.vertices[c],l=a.vertices[d],m=i[e],n=i[f],o=i[g],p=k.x-j.x,q=l.x-j.x,r=k.y-j.y,s=l.y-j.y,t=k.z-j.z,u=l.z-j.z,v=n.x-m.x,w=o.x-m.x,x=n.y-m.y,y=o.y-m.y,z=1/(v*y-w*x),F.set((y*p-x*q)*z,(y*r-x*s)*z,(y*t-x*u)*z),G.set((v*q-w*p)*z,(v*s-w*r)*z,(v*u-w*t)*z),D[b].add(F),D[c].add(F),D[d].add(F),E[b].add(G),E[c].add(G),E[d].add(G)}
// based on http://www.terathon.com/code/tangent.html
// tangents go to vertices
var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D=[],E=[],F=new THREE.Vector3,G=new THREE.Vector3,H=new THREE.Vector3,I=new THREE.Vector3,J=new THREE.Vector3;for(d=0,e=this.vertices.length;e>d;d++)D[d]=new THREE.Vector3,E[d]=new THREE.Vector3;for(b=0,c=this.faces.length;c>b;b++)h=this.faces[b],i=this.faceVertexUvs[0][b],// use UV layer 0 for tangents
a(this,h.a,h.b,h.c,0,1,2);var K=["a","b","c","d"];for(b=0,c=this.faces.length;c>b;b++)for(h=this.faces[b],f=0;f<Math.min(h.vertexNormals.length,3);f++)J.copy(h.vertexNormals[f]),g=h[K[f]],A=D[g],
// Gram-Schmidt orthogonalize
H.copy(A),H.sub(J.multiplyScalar(J.dot(A))).normalize(),
// Calculate handedness
I.crossVectors(h.vertexNormals[f],A),B=I.dot(E[g]),C=0>B?-1:1,h.vertexTangents[f]=new THREE.Vector4(H.x,H.y,H.z,C);this.hasTangents=!0},computeLineDistances:function(){for(var a=0,b=this.vertices,c=0,d=b.length;d>c;c++)c>0&&(a+=b[c].distanceTo(b[c-1])),this.lineDistances[c]=a},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new THREE.Box3),this.boundingBox.setFromPoints(this.vertices)},computeBoundingSphere:function(){null===this.boundingSphere&&(this.boundingSphere=new THREE.Sphere),this.boundingSphere.setFromPoints(this.vertices)},merge:function(a,b,c){if(a instanceof THREE.Geometry==!1)return void console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.",a);var d,e=this.vertices.length,f=(this.faceVertexUvs[0].length,this.vertices),g=a.vertices,h=this.faces,i=a.faces,j=this.faceVertexUvs[0],k=a.faceVertexUvs[0];void 0===c&&(c=0),void 0!==b&&(d=(new THREE.Matrix3).getNormalMatrix(b));
// vertices
for(var l=0,m=g.length;m>l;l++){var n=g[l],o=n.clone();void 0!==b&&o.applyMatrix4(b),f.push(o)}
// faces
for(l=0,m=i.length;m>l;l++){var p,q,r,s=i[l],t=s.vertexNormals,u=s.vertexColors;p=new THREE.Face3(s.a+e,s.b+e,s.c+e),p.normal.copy(s.normal),void 0!==d&&p.normal.applyMatrix3(d).normalize();for(var v=0,w=t.length;w>v;v++)q=t[v].clone(),void 0!==d&&q.applyMatrix3(d).normalize(),p.vertexNormals.push(q);p.color.copy(s.color);for(var v=0,w=u.length;w>v;v++)r=u[v],p.vertexColors.push(r.clone());p.materialIndex=s.materialIndex+c,h.push(p)}
// uvs
for(l=0,m=k.length;m>l;l++){var x=k[l],y=[];if(void 0!==x){for(var v=0,w=x.length;w>v;v++)y.push(new THREE.Vector2(x[v].x,x[v].y));j.push(y)}}},/*
	 * Checks for duplicate vertices with hashmap.
	 * Duplicated vertices are removed
	 * and faces' vertices are updated.
	 */
mergeVertices:function(){var a,b,c,d,e,f,g,h,i={},j=[],k=[],l=4,m=Math.pow(10,l);for(c=0,d=this.vertices.length;d>c;c++)a=this.vertices[c],b=Math.round(a.x*m)+"_"+Math.round(a.y*m)+"_"+Math.round(a.z*m),void 0===i[b]?(i[b]=c,j.push(this.vertices[c]),k[c]=j.length-1):
//console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
k[c]=k[i[b]];
// if faces are completely degenerate after merging vertices, we
// have to remove them from the geometry.
var n=[];for(c=0,d=this.faces.length;d>c;c++){e=this.faces[c],e.a=k[e.a],e.b=k[e.b],e.c=k[e.c],f=[e.a,e.b,e.c];
// if any duplicate vertices are found in a Face3
// we have to remove the face as nothing can be saved
for(var o=-1,p=0;3>p;p++)if(f[p]==f[(p+1)%3]){o=p,n.push(c);break}}for(c=n.length-1;c>=0;c--){var q=n[c];for(this.faces.splice(q,1),g=0,h=this.faceVertexUvs.length;h>g;g++)this.faceVertexUvs[g].splice(q,1)}
// Use unique set of vertices
var r=this.vertices.length-j.length;return this.vertices=j,r},
// Geometry splitting
makeGroups:function(){var a=0;return function(b,c){var d,e,f,g,h,i,j={},k=this.morphTargets.length,l=this.morphNormals.length;for(this.geometryGroups={},this.geometryGroupsList=[],d=0,e=this.faces.length;e>d;d++)f=this.faces[d],g=b?f.materialIndex:0,g in j||(j[g]={hash:g,counter:0}),h=j[g].hash+"_"+j[g].counter,h in this.geometryGroups||(i={id:a++,faces3:[],materialIndex:g,vertices:0,numMorphTargets:k,numMorphNormals:l},this.geometryGroups[h]=i,this.geometryGroupsList.push(i)),this.geometryGroups[h].vertices+3>c&&(j[g].counter+=1,h=j[g].hash+"_"+j[g].counter,h in this.geometryGroups||(i={id:a++,faces3:[],materialIndex:g,vertices:0,numMorphTargets:k,numMorphNormals:l},this.geometryGroups[h]=i,this.geometryGroupsList.push(i))),this.geometryGroups[h].faces3.push(d),this.geometryGroups[h].vertices+=3}}(),clone:function(){for(var a=new THREE.Geometry,b=this.vertices,c=0,d=b.length;d>c;c++)a.vertices.push(b[c].clone());for(var e=this.faces,c=0,d=e.length;d>c;c++)a.faces.push(e[c].clone());for(var f=this.faceVertexUvs[0],c=0,d=f.length;d>c;c++){for(var g=f[c],h=[],i=0,j=g.length;j>i;i++)h.push(new THREE.Vector2(g[i].x,g[i].y));a.faceVertexUvs[0].push(h)}return a},dispose:function(){this.dispatchEvent({type:"dispose"})}},THREE.EventDispatcher.prototype.apply(THREE.Geometry.prototype),THREE.GeometryIdCount=0,
// File:src/cameras/Camera.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
*/
THREE.Camera=function(){THREE.Object3D.call(this),this.matrixWorldInverse=new THREE.Matrix4,this.projectionMatrix=new THREE.Matrix4},THREE.Camera.prototype=Object.create(THREE.Object3D.prototype),THREE.Camera.prototype.lookAt=function(){
// This routine does not support cameras with rotated and/or translated parent(s)
var a=new THREE.Matrix4;return function(b){a.lookAt(this.position,b,this.up),this.quaternion.setFromRotationMatrix(a)}}(),THREE.Camera.prototype.clone=function(a){return void 0===a&&(a=new THREE.Camera),THREE.Object3D.prototype.clone.call(this,a),a.matrixWorldInverse.copy(this.matrixWorldInverse),a.projectionMatrix.copy(this.projectionMatrix),a},
// File:src/cameras/CubeCamera.js
/**
 * Camera for rendering cube maps
 *	- renders scene into axis-aligned cube
 *
 * @author alteredq / http://alteredqualia.com/
 */
THREE.CubeCamera=function(a,b,c){THREE.Object3D.call(this);var d=90,e=1,f=new THREE.PerspectiveCamera(d,e,a,b);f.up.set(0,-1,0),f.lookAt(new THREE.Vector3(1,0,0)),this.add(f);var g=new THREE.PerspectiveCamera(d,e,a,b);g.up.set(0,-1,0),g.lookAt(new THREE.Vector3(-1,0,0)),this.add(g);var h=new THREE.PerspectiveCamera(d,e,a,b);h.up.set(0,0,1),h.lookAt(new THREE.Vector3(0,1,0)),this.add(h);var i=new THREE.PerspectiveCamera(d,e,a,b);i.up.set(0,0,-1),i.lookAt(new THREE.Vector3(0,-1,0)),this.add(i);var j=new THREE.PerspectiveCamera(d,e,a,b);j.up.set(0,-1,0),j.lookAt(new THREE.Vector3(0,0,1)),this.add(j);var k=new THREE.PerspectiveCamera(d,e,a,b);k.up.set(0,-1,0),k.lookAt(new THREE.Vector3(0,0,-1)),this.add(k),this.renderTarget=new THREE.WebGLRenderTargetCube(c,c,{format:THREE.RGBFormat,magFilter:THREE.LinearFilter,minFilter:THREE.LinearFilter}),this.updateCubeMap=function(a,b){var c=this.renderTarget,d=c.generateMipmaps;c.generateMipmaps=!1,c.activeCubeFace=0,a.render(b,f,c),c.activeCubeFace=1,a.render(b,g,c),c.activeCubeFace=2,a.render(b,h,c),c.activeCubeFace=3,a.render(b,i,c),c.activeCubeFace=4,a.render(b,j,c),c.generateMipmaps=d,c.activeCubeFace=5,a.render(b,k,c)}},THREE.CubeCamera.prototype=Object.create(THREE.Object3D.prototype),
// File:src/cameras/OrthographicCamera.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.OrthographicCamera=function(a,b,c,d,e,f){THREE.Camera.call(this),this.left=a,this.right=b,this.top=c,this.bottom=d,this.near=void 0!==e?e:.1,this.far=void 0!==f?f:2e3,this.updateProjectionMatrix()},THREE.OrthographicCamera.prototype=Object.create(THREE.Camera.prototype),THREE.OrthographicCamera.prototype.updateProjectionMatrix=function(){this.projectionMatrix.makeOrthographic(this.left,this.right,this.top,this.bottom,this.near,this.far)},THREE.OrthographicCamera.prototype.clone=function(){var a=new THREE.OrthographicCamera;return THREE.Camera.prototype.clone.call(this,a),a.left=this.left,a.right=this.right,a.top=this.top,a.bottom=this.bottom,a.near=this.near,a.far=this.far,a},
// File:src/cameras/PerspectiveCamera.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author greggman / http://games.greggman.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */
THREE.PerspectiveCamera=function(a,b,c,d){THREE.Camera.call(this),this.fov=void 0!==a?a:50,this.aspect=void 0!==b?b:1,this.near=void 0!==c?c:.1,this.far=void 0!==d?d:2e3,this.updateProjectionMatrix()},THREE.PerspectiveCamera.prototype=Object.create(THREE.Camera.prototype),/**
 * Uses Focal Length (in mm) to estimate and set FOV
 * 35mm (fullframe) camera is used if frame size is not specified;
 * Formula based on http://www.bobatkins.com/photography/technical/field_of_view.html
 */
THREE.PerspectiveCamera.prototype.setLens=function(a,b){void 0===b&&(b=24),this.fov=2*THREE.Math.radToDeg(Math.atan(b/(2*a))),this.updateProjectionMatrix()},/**
 * Sets an offset in a larger frustum. This is useful for multi-window or
 * multi-monitor/multi-machine setups.
 *
 * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
 * the monitors are in grid like this
 *
 *   +---+---+---+
 *   | A | B | C |
 *   +---+---+---+
 *   | D | E | F |
 *   +---+---+---+
 *
 * then for each monitor you would call it like this
 *
 *   var w = 1920;
 *   var h = 1080;
 *   var fullWidth = w * 3;
 *   var fullHeight = h * 2;
 *
 *   --A--
 *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
 *   --B--
 *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
 *   --C--
 *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
 *   --D--
 *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
 *   --E--
 *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
 *   --F--
 *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
 *
 *   Note there is no reason monitors have to be the same size or in a grid.
 */
THREE.PerspectiveCamera.prototype.setViewOffset=function(a,b,c,d,e,f){this.fullWidth=a,this.fullHeight=b,this.x=c,this.y=d,this.width=e,this.height=f,this.updateProjectionMatrix()},THREE.PerspectiveCamera.prototype.updateProjectionMatrix=function(){if(this.fullWidth){var a=this.fullWidth/this.fullHeight,b=Math.tan(THREE.Math.degToRad(.5*this.fov))*this.near,c=-b,d=a*c,e=a*b,f=Math.abs(e-d),g=Math.abs(b-c);this.projectionMatrix.makeFrustum(d+this.x*f/this.fullWidth,d+(this.x+this.width)*f/this.fullWidth,b-(this.y+this.height)*g/this.fullHeight,b-this.y*g/this.fullHeight,this.near,this.far)}else this.projectionMatrix.makePerspective(this.fov,this.aspect,this.near,this.far)},THREE.PerspectiveCamera.prototype.clone=function(){var a=new THREE.PerspectiveCamera;return THREE.Camera.prototype.clone.call(this,a),a.fov=this.fov,a.aspect=this.aspect,a.near=this.near,a.far=this.far,a},
// File:src/lights/Light.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.Light=function(a){THREE.Object3D.call(this),this.color=new THREE.Color(a)},THREE.Light.prototype=Object.create(THREE.Object3D.prototype),THREE.Light.prototype.clone=function(a){return void 0===a&&(a=new THREE.Light),THREE.Object3D.prototype.clone.call(this,a),a.color.copy(this.color),a},
// File:src/lights/AmbientLight.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.AmbientLight=function(a){THREE.Light.call(this,a)},THREE.AmbientLight.prototype=Object.create(THREE.Light.prototype),THREE.AmbientLight.prototype.clone=function(){var a=new THREE.AmbientLight;return THREE.Light.prototype.clone.call(this,a),a},
// File:src/lights/AreaLight.js
/**
 * @author MPanknin / http://www.redplant.de/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.AreaLight=function(a,b){THREE.Light.call(this,a),this.normal=new THREE.Vector3(0,-1,0),this.right=new THREE.Vector3(1,0,0),this.intensity=void 0!==b?b:1,this.width=1,this.height=1,this.constantAttenuation=1.5,this.linearAttenuation=.5,this.quadraticAttenuation=.1},THREE.AreaLight.prototype=Object.create(THREE.Light.prototype),
// File:src/lights/DirectionalLight.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.DirectionalLight=function(a,b){THREE.Light.call(this,a),this.position.set(0,1,0),this.target=new THREE.Object3D,this.intensity=void 0!==b?b:1,this.castShadow=!1,this.onlyShadow=!1,
//
this.shadowCameraNear=50,this.shadowCameraFar=5e3,this.shadowCameraLeft=-500,this.shadowCameraRight=500,this.shadowCameraTop=500,this.shadowCameraBottom=-500,this.shadowCameraVisible=!1,this.shadowBias=0,this.shadowDarkness=.5,this.shadowMapWidth=512,this.shadowMapHeight=512,
//
this.shadowCascade=!1,this.shadowCascadeOffset=new THREE.Vector3(0,0,-1e3),this.shadowCascadeCount=2,this.shadowCascadeBias=[0,0,0],this.shadowCascadeWidth=[512,512,512],this.shadowCascadeHeight=[512,512,512],this.shadowCascadeNearZ=[-1,.99,.998],this.shadowCascadeFarZ=[.99,.998,1],this.shadowCascadeArray=[],
//
this.shadowMap=null,this.shadowMapSize=null,this.shadowCamera=null,this.shadowMatrix=null},THREE.DirectionalLight.prototype=Object.create(THREE.Light.prototype),THREE.DirectionalLight.prototype.clone=function(){var a=new THREE.DirectionalLight;
//
//
return THREE.Light.prototype.clone.call(this,a),a.target=this.target.clone(),a.intensity=this.intensity,a.castShadow=this.castShadow,a.onlyShadow=this.onlyShadow,a.shadowCameraNear=this.shadowCameraNear,a.shadowCameraFar=this.shadowCameraFar,a.shadowCameraLeft=this.shadowCameraLeft,a.shadowCameraRight=this.shadowCameraRight,a.shadowCameraTop=this.shadowCameraTop,a.shadowCameraBottom=this.shadowCameraBottom,a.shadowCameraVisible=this.shadowCameraVisible,a.shadowBias=this.shadowBias,a.shadowDarkness=this.shadowDarkness,a.shadowMapWidth=this.shadowMapWidth,a.shadowMapHeight=this.shadowMapHeight,a.shadowCascade=this.shadowCascade,a.shadowCascadeOffset.copy(this.shadowCascadeOffset),a.shadowCascadeCount=this.shadowCascadeCount,a.shadowCascadeBias=this.shadowCascadeBias.slice(0),a.shadowCascadeWidth=this.shadowCascadeWidth.slice(0),a.shadowCascadeHeight=this.shadowCascadeHeight.slice(0),a.shadowCascadeNearZ=this.shadowCascadeNearZ.slice(0),a.shadowCascadeFarZ=this.shadowCascadeFarZ.slice(0),a},
// File:src/lights/HemisphereLight.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.HemisphereLight=function(a,b,c){THREE.Light.call(this,a),this.position.set(0,100,0),this.groundColor=new THREE.Color(b),this.intensity=void 0!==c?c:1},THREE.HemisphereLight.prototype=Object.create(THREE.Light.prototype),THREE.HemisphereLight.prototype.clone=function(){var a=new THREE.HemisphereLight;return THREE.Light.prototype.clone.call(this,a),a.groundColor.copy(this.groundColor),a.intensity=this.intensity,a},
// File:src/lights/PointLight.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.PointLight=function(a,b,c){THREE.Light.call(this,a),this.intensity=void 0!==b?b:1,this.distance=void 0!==c?c:0},THREE.PointLight.prototype=Object.create(THREE.Light.prototype),THREE.PointLight.prototype.clone=function(){var a=new THREE.PointLight;return THREE.Light.prototype.clone.call(this,a),a.intensity=this.intensity,a.distance=this.distance,a},
// File:src/lights/SpotLight.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.SpotLight=function(a,b,c,d,e){THREE.Light.call(this,a),this.position.set(0,1,0),this.target=new THREE.Object3D,this.intensity=void 0!==b?b:1,this.distance=void 0!==c?c:0,this.angle=void 0!==d?d:Math.PI/3,this.exponent=void 0!==e?e:10,this.castShadow=!1,this.onlyShadow=!1,
//
this.shadowCameraNear=50,this.shadowCameraFar=5e3,this.shadowCameraFov=50,this.shadowCameraVisible=!1,this.shadowBias=0,this.shadowDarkness=.5,this.shadowMapWidth=512,this.shadowMapHeight=512,
//
this.shadowMap=null,this.shadowMapSize=null,this.shadowCamera=null,this.shadowMatrix=null},THREE.SpotLight.prototype=Object.create(THREE.Light.prototype),THREE.SpotLight.prototype.clone=function(){var a=new THREE.SpotLight;
//
return THREE.Light.prototype.clone.call(this,a),a.target=this.target.clone(),a.intensity=this.intensity,a.distance=this.distance,a.angle=this.angle,a.exponent=this.exponent,a.castShadow=this.castShadow,a.onlyShadow=this.onlyShadow,a.shadowCameraNear=this.shadowCameraNear,a.shadowCameraFar=this.shadowCameraFar,a.shadowCameraFov=this.shadowCameraFov,a.shadowCameraVisible=this.shadowCameraVisible,a.shadowBias=this.shadowBias,a.shadowDarkness=this.shadowDarkness,a.shadowMapWidth=this.shadowMapWidth,a.shadowMapHeight=this.shadowMapHeight,a},
// File:src/loaders/Cache.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.Cache=function(){this.files={}},THREE.Cache.prototype={constructor:THREE.Cache,add:function(a,b){
// console.log( 'THREE.Cache', 'Adding key:', key );
this.files[a]=b},get:function(a){
// console.log( 'THREE.Cache', 'Checking key:', key );
return this.files[a]},remove:function(a){delete this.files[a]},clear:function(){this.files={}}},
// File:src/loaders/Loader.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.Loader=function(a){this.showStatus=a,this.statusDomElement=a?THREE.Loader.prototype.addStatusElement():null,this.imageLoader=new THREE.ImageLoader,this.onLoadStart=function(){},this.onLoadProgress=function(){},this.onLoadComplete=function(){}},THREE.Loader.prototype={constructor:THREE.Loader,crossOrigin:void 0,addStatusElement:function(){var a=document.createElement("div");return a.style.position="absolute",a.style.right="0px",a.style.top="0px",a.style.fontSize="0.8em",a.style.textAlign="left",a.style.background="rgba(0,0,0,0.25)",a.style.color="#fff",a.style.width="120px",a.style.padding="0.5em 0.5em 0.5em 0.5em",a.style.zIndex=1e3,a.innerHTML="Loading ...",a},updateProgress:function(a){var b="Loaded ";b+=a.total?(100*a.loaded/a.total).toFixed(0)+"%":(a.loaded/1024).toFixed(2)+" KB",this.statusDomElement.innerHTML=b},extractUrlBase:function(a){var b=a.split("/");return 1===b.length?"./":(b.pop(),b.join("/")+"/")},initMaterials:function(a,b){for(var c=[],d=0;d<a.length;++d)c[d]=this.createMaterial(a[d],b);return c},needsTangents:function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];if(d instanceof THREE.ShaderMaterial)return!0}return!1},createMaterial:function(a,b){function c(a){var b=Math.log(a)/Math.LN2;return Math.pow(2,Math.round(b))}function d(a,d,e,g,h,i,j){var k,l=b+e,m=THREE.Loader.Handlers.get(l);if(null!==m?k=m.load(l):(k=new THREE.Texture,m=f.imageLoader,m.crossOrigin=f.crossOrigin,m.load(l,function(a){if(THREE.Math.isPowerOfTwo(a.width)===!1||THREE.Math.isPowerOfTwo(a.height)===!1){var b=c(a.width),d=c(a.height),e=document.createElement("canvas");e.width=b,e.height=d;var f=e.getContext("2d");f.drawImage(a,0,0,b,d),k.image=e}else k.image=a;k.needsUpdate=!0})),k.sourceFile=e,g&&(k.repeat.set(g[0],g[1]),1!==g[0]&&(k.wrapS=THREE.RepeatWrapping),1!==g[1]&&(k.wrapT=THREE.RepeatWrapping)),h&&k.offset.set(h[0],h[1]),i){var n={repeat:THREE.RepeatWrapping,mirror:THREE.MirroredRepeatWrapping};void 0!==n[i[0]]&&(k.wrapS=n[i[0]]),void 0!==n[i[1]]&&(k.wrapT=n[i[1]])}j&&(k.anisotropy=j),a[d]=k}function e(a){return(255*a[0]<<16)+(255*a[1]<<8)+255*a[2]}var f=this,g="MeshLambertMaterial",h={color:15658734,opacity:1,map:null,lightMap:null,normalMap:null,bumpMap:null,wireframe:!1};
// parameters from model file
if(a.shading){var i=a.shading.toLowerCase();"phong"===i?g="MeshPhongMaterial":"basic"===i&&(g="MeshBasicMaterial")}
// special case for normal mapped material
if(void 0!==a.blending&&void 0!==THREE[a.blending]&&(h.blending=THREE[a.blending]),(void 0!==a.transparent||a.opacity<1)&&(h.transparent=a.transparent),void 0!==a.depthTest&&(h.depthTest=a.depthTest),void 0!==a.depthWrite&&(h.depthWrite=a.depthWrite),void 0!==a.visible&&(h.visible=a.visible),void 0!==a.flipSided&&(h.side=THREE.BackSide),void 0!==a.doubleSided&&(h.side=THREE.DoubleSide),void 0!==a.wireframe&&(h.wireframe=a.wireframe),void 0!==a.vertexColors&&("face"===a.vertexColors?h.vertexColors=THREE.FaceColors:a.vertexColors&&(h.vertexColors=THREE.VertexColors)),
// colors
a.colorDiffuse?h.color=e(a.colorDiffuse):a.DbgColor&&(h.color=a.DbgColor),a.colorSpecular&&(h.specular=e(a.colorSpecular)),a.colorAmbient&&(h.ambient=e(a.colorAmbient)),a.colorEmissive&&(h.emissive=e(a.colorEmissive)),
// modifiers
a.transparency&&(h.opacity=a.transparency),a.specularCoef&&(h.shininess=a.specularCoef),
// textures
a.mapDiffuse&&b&&d(h,"map",a.mapDiffuse,a.mapDiffuseRepeat,a.mapDiffuseOffset,a.mapDiffuseWrap,a.mapDiffuseAnisotropy),a.mapLight&&b&&d(h,"lightMap",a.mapLight,a.mapLightRepeat,a.mapLightOffset,a.mapLightWrap,a.mapLightAnisotropy),a.mapBump&&b&&d(h,"bumpMap",a.mapBump,a.mapBumpRepeat,a.mapBumpOffset,a.mapBumpWrap,a.mapBumpAnisotropy),a.mapNormal&&b&&d(h,"normalMap",a.mapNormal,a.mapNormalRepeat,a.mapNormalOffset,a.mapNormalWrap,a.mapNormalAnisotropy),a.mapSpecular&&b&&d(h,"specularMap",a.mapSpecular,a.mapSpecularRepeat,a.mapSpecularOffset,a.mapSpecularWrap,a.mapSpecularAnisotropy),a.mapAlpha&&b&&d(h,"alphaMap",a.mapAlpha,a.mapAlphaRepeat,a.mapAlphaOffset,a.mapAlphaWrap,a.mapAlphaAnisotropy),
//
a.mapBumpScale&&(h.bumpScale=a.mapBumpScale),a.mapNormal){var j=THREE.ShaderLib.normalmap,k=THREE.UniformsUtils.clone(j.uniforms);k.tNormal.value=h.normalMap,a.mapNormalFactor&&k.uNormalScale.value.set(a.mapNormalFactor,a.mapNormalFactor),h.map&&(k.tDiffuse.value=h.map,k.enableDiffuse.value=!0),h.specularMap&&(k.tSpecular.value=h.specularMap,k.enableSpecular.value=!0),h.lightMap&&(k.tAO.value=h.lightMap,k.enableAO.value=!0),
// for the moment don't handle displacement texture
k.diffuse.value.setHex(h.color),k.specular.value.setHex(h.specular),k.ambient.value.setHex(h.ambient),k.shininess.value=h.shininess,void 0!==h.opacity&&(k.opacity.value=h.opacity);var l={fragmentShader:j.fragmentShader,vertexShader:j.vertexShader,uniforms:k,lights:!0,fog:!0},m=new THREE.ShaderMaterial(l);h.transparent&&(m.transparent=!0)}else var m=new THREE[g](h);return void 0!==a.DbgName&&(m.name=a.DbgName),m}},THREE.Loader.Handlers={handlers:[],add:function(a,b){this.handlers.push(a,b)},get:function(a){for(var b=0,c=this.handlers.length;c>b;b+=2){var d=this.handlers[b],e=this.handlers[b+1];if(d.test(a))return e}return null}},
// File:src/loaders/XHRLoader.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.XHRLoader=function(a){this.cache=new THREE.Cache,this.manager=void 0!==a?a:THREE.DefaultLoadingManager},THREE.XHRLoader.prototype={constructor:THREE.XHRLoader,load:function(a,b,c,d){var e=this,f=e.cache.get(a);if(void 0!==f)return void(b&&b(f));var g=new XMLHttpRequest;g.open("GET",a,!0),g.addEventListener("load",function(c){e.cache.add(a,this.response),b&&b(this.response),e.manager.itemEnd(a)},!1),void 0!==c&&g.addEventListener("progress",function(a){c(a)},!1),void 0!==d&&g.addEventListener("error",function(a){d(a)},!1),void 0!==this.crossOrigin&&(g.crossOrigin=this.crossOrigin),void 0!==this.responseType&&(g.responseType=this.responseType),g.send(null),e.manager.itemStart(a)},setResponseType:function(a){this.responseType=a},setCrossOrigin:function(a){this.crossOrigin=a}},
// File:src/loaders/ImageLoader.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.ImageLoader=function(a){this.cache=new THREE.Cache,this.manager=void 0!==a?a:THREE.DefaultLoadingManager},THREE.ImageLoader.prototype={constructor:THREE.ImageLoader,load:function(a,b,c,d){var e=this,f=e.cache.get(a);if(void 0!==f)return void b(f);var g=document.createElement("img");return void 0!==b&&g.addEventListener("load",function(c){e.cache.add(a,this),b(this),e.manager.itemEnd(a)},!1),void 0!==c&&g.addEventListener("progress",function(a){c(a)},!1),void 0!==d&&g.addEventListener("error",function(a){d(a)},!1),void 0!==this.crossOrigin&&(g.crossOrigin=this.crossOrigin),g.src=a,e.manager.itemStart(a),g},setCrossOrigin:function(a){this.crossOrigin=a}},
// File:src/loaders/JSONLoader.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.JSONLoader=function(a){THREE.Loader.call(this,a),this.withCredentials=!1},THREE.JSONLoader.prototype=Object.create(THREE.Loader.prototype),THREE.JSONLoader.prototype.load=function(a,b,c){
// todo: unify load API to for easier SceneLoader use
c=c&&"string"==typeof c?c:this.extractUrlBase(a),this.onLoadStart(),this.loadAjaxJSON(this,a,b,c)},THREE.JSONLoader.prototype.loadAjaxJSON=function(a,b,c,d,e){var f=new XMLHttpRequest,g=0;f.onreadystatechange=function(){if(f.readyState===f.DONE)if(200===f.status||0===f.status){if(f.responseText){var h=JSON.parse(f.responseText);if(void 0!==h.metadata&&"scene"===h.metadata.type)return void console.error('THREE.JSONLoader: "'+b+'" seems to be a Scene. Use THREE.SceneLoader instead.');var i=a.parse(h,d);c(i.geometry,i.materials)}else console.error('THREE.JSONLoader: "'+b+'" seems to be unreachable or the file is empty.');
// in context of more complex asset initialization
// do not block on single failed file
// maybe should go even one more level up
a.onLoadComplete()}else console.error("THREE.JSONLoader: Couldn't load \""+b+'" ('+f.status+")");else f.readyState===f.LOADING?e&&(0===g&&(g=f.getResponseHeader("Content-Length")),e({total:g,loaded:f.responseText.length})):f.readyState===f.HEADERS_RECEIVED&&void 0!==e&&(g=f.getResponseHeader("Content-Length"))},f.open("GET",b,!0),f.withCredentials=this.withCredentials,f.send(null)},THREE.JSONLoader.prototype.parse=function(a,b){function c(b){function c(a,b){return a&1<<b}var d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F=a.faces,G=a.vertices,H=a.normals,I=a.colors,J=0;if(void 0!==a.uvs){
// disregard empty arrays
for(d=0;d<a.uvs.length;d++)a.uvs[d].length&&J++;for(d=0;J>d;d++)f.faceVertexUvs[d]=[]}for(h=0,i=G.length;i>h;)v=new THREE.Vector3,v.x=G[h++]*b,v.y=G[h++]*b,v.z=G[h++]*b,f.vertices.push(v);for(h=0,i=F.length;i>h;)
// console.log("type", type, "bits", isQuad, hasMaterial, hasFaceVertexUv, hasFaceNormal, hasFaceVertexNormal, hasFaceColor, hasFaceVertexColor);
if(n=F[h++],o=c(n,0),p=c(n,1),q=c(n,3),r=c(n,4),s=c(n,5),t=c(n,6),u=c(n,7),o){if(x=new THREE.Face3,x.a=F[h],x.b=F[h+1],x.c=F[h+3],y=new THREE.Face3,y.a=F[h+1],y.b=F[h+2],y.c=F[h+3],h+=4,p&&(m=F[h++],x.materialIndex=m,y.materialIndex=m),
// to get face <=> uv index correspondence
g=f.faces.length,q)for(d=0;J>d;d++)for(B=a.uvs[d],f.faceVertexUvs[d][g]=[],f.faceVertexUvs[d][g+1]=[],e=0;4>e;e++)l=F[h++],D=B[2*l],E=B[2*l+1],C=new THREE.Vector2(D,E),2!==e&&f.faceVertexUvs[d][g].push(C),0!==e&&f.faceVertexUvs[d][g+1].push(C);if(r&&(k=3*F[h++],x.normal.set(H[k++],H[k++],H[k]),y.normal.copy(x.normal)),s)for(d=0;4>d;d++)k=3*F[h++],A=new THREE.Vector3(H[k++],H[k++],H[k]),2!==d&&x.vertexNormals.push(A),0!==d&&y.vertexNormals.push(A);if(t&&(j=F[h++],z=I[j],x.color.setHex(z),y.color.setHex(z)),u)for(d=0;4>d;d++)j=F[h++],z=I[j],2!==d&&x.vertexColors.push(new THREE.Color(z)),0!==d&&y.vertexColors.push(new THREE.Color(z));f.faces.push(x),f.faces.push(y)}else{if(w=new THREE.Face3,w.a=F[h++],w.b=F[h++],w.c=F[h++],p&&(m=F[h++],w.materialIndex=m),
// to get face <=> uv index correspondence
g=f.faces.length,q)for(d=0;J>d;d++)for(B=a.uvs[d],f.faceVertexUvs[d][g]=[],e=0;3>e;e++)l=F[h++],D=B[2*l],E=B[2*l+1],C=new THREE.Vector2(D,E),f.faceVertexUvs[d][g].push(C);if(r&&(k=3*F[h++],w.normal.set(H[k++],H[k++],H[k])),s)for(d=0;3>d;d++)k=3*F[h++],A=new THREE.Vector3(H[k++],H[k++],H[k]),w.vertexNormals.push(A);if(t&&(j=F[h++],w.color.setHex(I[j])),u)for(d=0;3>d;d++)j=F[h++],w.vertexColors.push(new THREE.Color(I[j]));f.faces.push(w)}}function d(){var b=void 0!==a.influencesPerVertex?a.influencesPerVertex:2;if(a.skinWeights)for(var c=0,d=a.skinWeights.length;d>c;c+=b){var e=a.skinWeights[c],g=b>1?a.skinWeights[c+1]:0,h=b>2?a.skinWeights[c+2]:0,i=b>3?a.skinWeights[c+3]:0;f.skinWeights.push(new THREE.Vector4(e,g,h,i))}if(a.skinIndices)for(var c=0,d=a.skinIndices.length;d>c;c+=b){var j=a.skinIndices[c],k=b>1?a.skinIndices[c+1]:0,l=b>2?a.skinIndices[c+2]:0,m=b>3?a.skinIndices[c+3]:0;f.skinIndices.push(new THREE.Vector4(j,k,l,m))}f.bones=a.bones,f.bones&&f.bones.length>0&&(f.skinWeights.length!==f.skinIndices.length||f.skinIndices.length!==f.vertices.length)&&console.warn("When skinning, number of vertices ("+f.vertices.length+"), skinIndices ("+f.skinIndices.length+"), and skinWeights ("+f.skinWeights.length+") should match."),
// could change this to json.animations[0] or remove completely
f.animation=a.animation,f.animations=a.animations}function e(b){if(void 0!==a.morphTargets){var c,d,e,g,h,i;for(c=0,d=a.morphTargets.length;d>c;c++)for(f.morphTargets[c]={},f.morphTargets[c].name=a.morphTargets[c].name,f.morphTargets[c].vertices=[],h=f.morphTargets[c].vertices,i=a.morphTargets[c].vertices,e=0,g=i.length;g>e;e+=3){var j=new THREE.Vector3;j.x=i[e]*b,j.y=i[e+1]*b,j.z=i[e+2]*b,h.push(j)}}if(void 0!==a.morphColors){var c,d,k,l,m,n,o;for(c=0,d=a.morphColors.length;d>c;c++)for(f.morphColors[c]={},f.morphColors[c].name=a.morphColors[c].name,f.morphColors[c].colors=[],m=f.morphColors[c].colors,n=a.morphColors[c].colors,k=0,l=n.length;l>k;k+=3)o=new THREE.Color(16755200),o.setRGB(n[k],n[k+1],n[k+2]),m.push(o)}}var f=new THREE.Geometry,g=void 0!==a.scale?1/a.scale:1;if(c(g),d(),e(g),f.computeFaceNormals(),f.computeBoundingSphere(),void 0===a.materials||0===a.materials.length)return{geometry:f};var h=this.initMaterials(a.materials,b);return this.needsTangents(h)&&f.computeTangents(),{geometry:f,materials:h}},
// File:src/loaders/LoadingManager.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.LoadingManager=function(a,b,c){var d=this,e=0,f=0;this.onLoad=a,this.onProgress=b,this.onError=c,this.itemStart=function(a){f++},this.itemEnd=function(a){e++,void 0!==d.onProgress&&d.onProgress(a,e,f),e===f&&void 0!==d.onLoad&&d.onLoad()}},THREE.DefaultLoadingManager=new THREE.LoadingManager,
// File:src/loaders/BufferGeometryLoader.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.BufferGeometryLoader=function(a){this.manager=void 0!==a?a:THREE.DefaultLoadingManager},THREE.BufferGeometryLoader.prototype={constructor:THREE.BufferGeometryLoader,load:function(a,b,c,d){var e=this,f=new THREE.XHRLoader;f.setCrossOrigin(this.crossOrigin),f.load(a,function(a){b(e.parse(JSON.parse(a)))},c,d)},setCrossOrigin:function(a){this.crossOrigin=a},parse:function(a){var b=new THREE.BufferGeometry,c=a.attributes;for(var d in c){var e=c[d];b.attributes[d]={itemSize:e.itemSize,array:new self[e.type](e.array)}}var f=a.offsets;void 0!==f&&(b.offsets=JSON.parse(JSON.stringify(f)));var g=a.boundingSphere;return void 0!==g&&(b.boundingSphere=new THREE.Sphere((new THREE.Vector3).fromArray(void 0!==g.center?g.center:[0,0,0]),g.radius)),b}},
// File:src/loaders/MaterialLoader.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.MaterialLoader=function(a){this.manager=void 0!==a?a:THREE.DefaultLoadingManager},THREE.MaterialLoader.prototype={constructor:THREE.MaterialLoader,load:function(a,b,c,d){var e=this,f=new THREE.XHRLoader;f.setCrossOrigin(this.crossOrigin),f.load(a,function(a){b(e.parse(JSON.parse(a)))},c,d)},setCrossOrigin:function(a){this.crossOrigin=a},parse:function(a){var b=new THREE[a.type];if(void 0!==a.color&&b.color.setHex(a.color),void 0!==a.ambient&&b.ambient.setHex(a.ambient),void 0!==a.emissive&&b.emissive.setHex(a.emissive),void 0!==a.specular&&b.specular.setHex(a.specular),void 0!==a.shininess&&(b.shininess=a.shininess),void 0!==a.uniforms&&(b.uniforms=a.uniforms),void 0!==a.vertexShader&&(b.vertexShader=a.vertexShader),void 0!==a.fragmentShader&&(b.fragmentShader=a.fragmentShader),void 0!==a.vertexColors&&(b.vertexColors=a.vertexColors),void 0!==a.blending&&(b.blending=a.blending),void 0!==a.side&&(b.side=a.side),void 0!==a.opacity&&(b.opacity=a.opacity),void 0!==a.transparent&&(b.transparent=a.transparent),void 0!==a.wireframe&&(b.wireframe=a.wireframe),void 0!==a.materials)for(var c=0,d=a.materials.length;d>c;c++)b.materials.push(this.parse(a.materials[c]));return b}},
// File:src/loaders/ObjectLoader.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.ObjectLoader=function(a){this.manager=void 0!==a?a:THREE.DefaultLoadingManager},THREE.ObjectLoader.prototype={constructor:THREE.ObjectLoader,load:function(a,b,c,d){var e=this,f=new THREE.XHRLoader(e.manager);f.setCrossOrigin(this.crossOrigin),f.load(a,function(a){b(e.parse(JSON.parse(a)))},c,d)},setCrossOrigin:function(a){this.crossOrigin=a},parse:function(a){var b=this.parseGeometries(a.geometries),c=this.parseMaterials(a.materials),d=this.parseObject(a.object,b,c);return d},parseGeometries:function(a){var b={};if(void 0!==a)for(var c=new THREE.JSONLoader,d=new THREE.BufferGeometryLoader,e=0,f=a.length;f>e;e++){var g,h=a[e];switch(h.type){case"PlaneGeometry":g=new THREE.PlaneGeometry(h.width,h.height,h.widthSegments,h.heightSegments);break;case"BoxGeometry":case"CubeGeometry":// backwards compatible
g=new THREE.BoxGeometry(h.width,h.height,h.depth,h.widthSegments,h.heightSegments,h.depthSegments);break;case"CircleGeometry":g=new THREE.CircleGeometry(h.radius,h.segments);break;case"CylinderGeometry":g=new THREE.CylinderGeometry(h.radiusTop,h.radiusBottom,h.height,h.radialSegments,h.heightSegments,h.openEnded);break;case"SphereGeometry":g=new THREE.SphereGeometry(h.radius,h.widthSegments,h.heightSegments,h.phiStart,h.phiLength,h.thetaStart,h.thetaLength);break;case"IcosahedronGeometry":g=new THREE.IcosahedronGeometry(h.radius,h.detail);break;case"TorusGeometry":g=new THREE.TorusGeometry(h.radius,h.tube,h.radialSegments,h.tubularSegments,h.arc);break;case"TorusKnotGeometry":g=new THREE.TorusKnotGeometry(h.radius,h.tube,h.radialSegments,h.tubularSegments,h.p,h.q,h.heightScale);break;case"BufferGeometry":g=d.parse(h.data);break;case"Geometry":g=c.parse(h.data).geometry}g.uuid=h.uuid,void 0!==h.name&&(g.name=h.name),b[h.uuid]=g}return b},parseMaterials:function(a){var b={};if(void 0!==a)for(var c=new THREE.MaterialLoader,d=0,e=a.length;e>d;d++){var f=a[d],g=c.parse(f);g.uuid=f.uuid,void 0!==f.name&&(g.name=f.name),b[f.uuid]=g}return b},parseObject:function(){var a=new THREE.Matrix4;return function(b,c,d){var e;switch(b.type){case"Scene":e=new THREE.Scene;break;case"PerspectiveCamera":e=new THREE.PerspectiveCamera(b.fov,b.aspect,b.near,b.far);break;case"OrthographicCamera":e=new THREE.OrthographicCamera(b.left,b.right,b.top,b.bottom,b.near,b.far);break;case"AmbientLight":e=new THREE.AmbientLight(b.color);break;case"DirectionalLight":e=new THREE.DirectionalLight(b.color,b.intensity);break;case"PointLight":e=new THREE.PointLight(b.color,b.intensity,b.distance);break;case"SpotLight":e=new THREE.SpotLight(b.color,b.intensity,b.distance,b.angle,b.exponent);break;case"HemisphereLight":e=new THREE.HemisphereLight(b.color,b.groundColor,b.intensity);break;case"Mesh":var f=c[b.geometry],g=d[b.material];void 0===f&&console.error("THREE.ObjectLoader: Undefined geometry "+b.geometry),void 0===g&&console.error("THREE.ObjectLoader: Undefined material "+b.material),e=new THREE.Mesh(f,g);break;case"Sprite":var g=d[b.material];void 0===g&&console.error("THREE.ObjectLoader: Undefined material "+b.material),e=new THREE.Sprite(g);break;default:e=new THREE.Object3D}if(e.uuid=b.uuid,void 0!==b.name&&(e.name=b.name),void 0!==b.matrix?(a.fromArray(b.matrix),a.decompose(e.position,e.quaternion,e.scale)):(void 0!==b.position&&e.position.fromArray(b.position),void 0!==b.rotation&&e.rotation.fromArray(b.rotation),void 0!==b.scale&&e.scale.fromArray(b.scale)),void 0!==b.visible&&(e.visible=b.visible),void 0!==b.userData&&(e.userData=b.userData),void 0!==b.children)for(var h in b.children)e.add(this.parseObject(b.children[h],c,d));return e}}()},
// File:src/loaders/TextureLoader.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.TextureLoader=function(a){this.manager=void 0!==a?a:THREE.DefaultLoadingManager},THREE.TextureLoader.prototype={constructor:THREE.TextureLoader,load:function(a,b,c,d){var e=this,f=new THREE.ImageLoader(e.manager);f.setCrossOrigin(this.crossOrigin),f.load(a,function(a){var c=new THREE.Texture(a);c.needsUpdate=!0,void 0!==b&&b(c)},c,d)},setCrossOrigin:function(a){this.crossOrigin=a}},
// File:src/materials/Material.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.Material=function(){this.id=THREE.MaterialIdCount++,this.uuid=THREE.Math.generateUUID(),this.name="",this.side=THREE.FrontSide,this.opacity=1,this.transparent=!1,this.blending=THREE.NormalBlending,this.blendSrc=THREE.SrcAlphaFactor,this.blendDst=THREE.OneMinusSrcAlphaFactor,this.blendEquation=THREE.AddEquation,this.depthTest=!0,this.depthWrite=!0,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.alphaTest=0,this.overdraw=0,// Overdrawn pixels (typically between 0 and 1) for fixing antialiasing gaps in CanvasRenderer
this.visible=!0,this.needsUpdate=!0},THREE.Material.prototype={constructor:THREE.Material,setValues:function(a){if(void 0!==a)for(var b in a){var c=a[b];if(void 0!==c){if(b in this){var d=this[b];d instanceof THREE.Color?d.set(c):d instanceof THREE.Vector3&&c instanceof THREE.Vector3?d.copy(c):"overdraw"==b?
// ensure overdraw is backwards-compatable with legacy boolean type
this[b]=Number(c):this[b]=c}}else console.warn("THREE.Material: '"+b+"' parameter is undefined.")}},clone:function(a){return void 0===a&&(a=new THREE.Material),a.name=this.name,a.side=this.side,a.opacity=this.opacity,a.transparent=this.transparent,a.blending=this.blending,a.blendSrc=this.blendSrc,a.blendDst=this.blendDst,a.blendEquation=this.blendEquation,a.depthTest=this.depthTest,a.depthWrite=this.depthWrite,a.polygonOffset=this.polygonOffset,a.polygonOffsetFactor=this.polygonOffsetFactor,a.polygonOffsetUnits=this.polygonOffsetUnits,a.alphaTest=this.alphaTest,a.overdraw=this.overdraw,a.visible=this.visible,a},dispose:function(){this.dispatchEvent({type:"dispose"})}},THREE.EventDispatcher.prototype.apply(THREE.Material.prototype),THREE.MaterialIdCount=0,
// File:src/materials/LineBasicMaterial.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  linewidth: <float>,
 *  linecap: "round",
 *  linejoin: "round",
 *
 *  vertexColors: <bool>
 *
 *  fog: <bool>
 * }
 */
THREE.LineBasicMaterial=function(a){THREE.Material.call(this),this.color=new THREE.Color(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.vertexColors=THREE.NoColors,this.fog=!0,this.setValues(a)},THREE.LineBasicMaterial.prototype=Object.create(THREE.Material.prototype),THREE.LineBasicMaterial.prototype.clone=function(){var a=new THREE.LineBasicMaterial;return THREE.Material.prototype.clone.call(this,a),a.color.copy(this.color),a.linewidth=this.linewidth,a.linecap=this.linecap,a.linejoin=this.linejoin,a.vertexColors=this.vertexColors,a.fog=this.fog,a},
// File:src/materials/LineDashedMaterial.js
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  linewidth: <float>,
 *
 *  scale: <float>,
 *  dashSize: <float>,
 *  gapSize: <float>,
 *
 *  vertexColors: <bool>
 *
 *  fog: <bool>
 * }
 */
THREE.LineDashedMaterial=function(a){THREE.Material.call(this),this.color=new THREE.Color(16777215),this.linewidth=1,this.scale=1,this.dashSize=3,this.gapSize=1,this.vertexColors=!1,this.fog=!0,this.setValues(a)},THREE.LineDashedMaterial.prototype=Object.create(THREE.Material.prototype),THREE.LineDashedMaterial.prototype.clone=function(){var a=new THREE.LineDashedMaterial;return THREE.Material.prototype.clone.call(this,a),a.color.copy(this.color),a.linewidth=this.linewidth,a.scale=this.scale,a.dashSize=this.dashSize,a.gapSize=this.gapSize,a.vertexColors=this.vertexColors,a.fog=this.fog,a},
// File:src/materials/MeshBasicMaterial.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *
 *  fog: <bool>
 * }
 */
THREE.MeshBasicMaterial=function(a){THREE.Material.call(this),this.color=new THREE.Color(16777215),// emissive
this.map=null,this.lightMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=THREE.MultiplyOperation,this.reflectivity=1,this.refractionRatio=.98,this.fog=!0,this.shading=THREE.SmoothShading,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.vertexColors=THREE.NoColors,this.skinning=!1,this.morphTargets=!1,this.setValues(a)},THREE.MeshBasicMaterial.prototype=Object.create(THREE.Material.prototype),THREE.MeshBasicMaterial.prototype.clone=function(){var a=new THREE.MeshBasicMaterial;return THREE.Material.prototype.clone.call(this,a),a.color.copy(this.color),a.map=this.map,a.lightMap=this.lightMap,a.specularMap=this.specularMap,a.alphaMap=this.alphaMap,a.envMap=this.envMap,a.combine=this.combine,a.reflectivity=this.reflectivity,a.refractionRatio=this.refractionRatio,a.fog=this.fog,a.shading=this.shading,a.wireframe=this.wireframe,a.wireframeLinewidth=this.wireframeLinewidth,a.wireframeLinecap=this.wireframeLinecap,a.wireframeLinejoin=this.wireframeLinejoin,a.vertexColors=this.vertexColors,a.skinning=this.skinning,a.morphTargets=this.morphTargets,a},
// File:src/materials/MeshLambertMaterial.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  ambient: <hex>,
 *  emissive: <hex>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>,
 *
 *	fog: <bool>
 * }
 */
THREE.MeshLambertMaterial=function(a){THREE.Material.call(this),this.color=new THREE.Color(16777215),// diffuse
this.ambient=new THREE.Color(16777215),this.emissive=new THREE.Color(0),this.wrapAround=!1,this.wrapRGB=new THREE.Vector3(1,1,1),this.map=null,this.lightMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=THREE.MultiplyOperation,this.reflectivity=1,this.refractionRatio=.98,this.fog=!0,this.shading=THREE.SmoothShading,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.vertexColors=THREE.NoColors,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(a)},THREE.MeshLambertMaterial.prototype=Object.create(THREE.Material.prototype),THREE.MeshLambertMaterial.prototype.clone=function(){var a=new THREE.MeshLambertMaterial;return THREE.Material.prototype.clone.call(this,a),a.color.copy(this.color),a.ambient.copy(this.ambient),a.emissive.copy(this.emissive),a.wrapAround=this.wrapAround,a.wrapRGB.copy(this.wrapRGB),a.map=this.map,a.lightMap=this.lightMap,a.specularMap=this.specularMap,a.alphaMap=this.alphaMap,a.envMap=this.envMap,a.combine=this.combine,a.reflectivity=this.reflectivity,a.refractionRatio=this.refractionRatio,a.fog=this.fog,a.shading=this.shading,a.wireframe=this.wireframe,a.wireframeLinewidth=this.wireframeLinewidth,a.wireframeLinecap=this.wireframeLinecap,a.wireframeLinejoin=this.wireframeLinejoin,a.vertexColors=this.vertexColors,a.skinning=this.skinning,a.morphTargets=this.morphTargets,a.morphNormals=this.morphNormals,a},
// File:src/materials/MeshPhongMaterial.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  ambient: <hex>,
 *  emissive: <hex>,
 *  specular: <hex>,
 *  shininess: <float>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *
 *  bumpMap: new THREE.Texture( <Image> ),
 *  bumpScale: <float>,
 *
 *  normalMap: new THREE.Texture( <Image> ),
 *  normalScale: <Vector2>,
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>,
 *
 *	fog: <bool>
 * }
 */
THREE.MeshPhongMaterial=function(a){THREE.Material.call(this),this.color=new THREE.Color(16777215),// diffuse
this.ambient=new THREE.Color(16777215),this.emissive=new THREE.Color(0),this.specular=new THREE.Color(1118481),this.shininess=30,this.metal=!1,this.wrapAround=!1,this.wrapRGB=new THREE.Vector3(1,1,1),this.map=null,this.lightMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalScale=new THREE.Vector2(1,1),this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=THREE.MultiplyOperation,this.reflectivity=1,this.refractionRatio=.98,this.fog=!0,this.shading=THREE.SmoothShading,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.vertexColors=THREE.NoColors,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(a)},THREE.MeshPhongMaterial.prototype=Object.create(THREE.Material.prototype),THREE.MeshPhongMaterial.prototype.clone=function(){var a=new THREE.MeshPhongMaterial;return THREE.Material.prototype.clone.call(this,a),a.color.copy(this.color),a.ambient.copy(this.ambient),a.emissive.copy(this.emissive),a.specular.copy(this.specular),a.shininess=this.shininess,a.metal=this.metal,a.wrapAround=this.wrapAround,a.wrapRGB.copy(this.wrapRGB),a.map=this.map,a.lightMap=this.lightMap,a.bumpMap=this.bumpMap,a.bumpScale=this.bumpScale,a.normalMap=this.normalMap,a.normalScale.copy(this.normalScale),a.specularMap=this.specularMap,a.alphaMap=this.alphaMap,a.envMap=this.envMap,a.combine=this.combine,a.reflectivity=this.reflectivity,a.refractionRatio=this.refractionRatio,a.fog=this.fog,a.shading=this.shading,a.wireframe=this.wireframe,a.wireframeLinewidth=this.wireframeLinewidth,a.wireframeLinecap=this.wireframeLinecap,a.wireframeLinejoin=this.wireframeLinejoin,a.vertexColors=this.vertexColors,a.skinning=this.skinning,a.morphTargets=this.morphTargets,a.morphNormals=this.morphNormals,a},
// File:src/materials/MeshDepthMaterial.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  opacity: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>
 * }
 */
THREE.MeshDepthMaterial=function(a){THREE.Material.call(this),this.morphTargets=!1,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(a)},THREE.MeshDepthMaterial.prototype=Object.create(THREE.Material.prototype),THREE.MeshDepthMaterial.prototype.clone=function(){var a=new THREE.MeshDepthMaterial;return THREE.Material.prototype.clone.call(this,a),a.wireframe=this.wireframe,a.wireframeLinewidth=this.wireframeLinewidth,a},
// File:src/materials/MeshNormalMaterial.js
/**
 * @author mrdoob / http://mrdoob.com/
 *
 * parameters = {
 *  opacity: <float>,
 *
 *  shading: THREE.FlatShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>
 * }
 */
THREE.MeshNormalMaterial=function(a){THREE.Material.call(this,a),this.shading=THREE.FlatShading,this.wireframe=!1,this.wireframeLinewidth=1,this.morphTargets=!1,this.setValues(a)},THREE.MeshNormalMaterial.prototype=Object.create(THREE.Material.prototype),THREE.MeshNormalMaterial.prototype.clone=function(){var a=new THREE.MeshNormalMaterial;return THREE.Material.prototype.clone.call(this,a),a.shading=this.shading,a.wireframe=this.wireframe,a.wireframeLinewidth=this.wireframeLinewidth,a},
// File:src/materials/MeshFaceMaterial.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.MeshFaceMaterial=function(a){this.materials=a instanceof Array?a:[]},THREE.MeshFaceMaterial.prototype.clone=function(){for(var a=new THREE.MeshFaceMaterial,b=0;b<this.materials.length;b++)a.materials.push(this.materials[b].clone());return a},
// File:src/materials/PointCloudMaterial.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  size: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  vertexColors: <bool>,
 *
 *  fog: <bool>
 * }
 */
THREE.PointCloudMaterial=function(a){THREE.Material.call(this),this.color=new THREE.Color(16777215),this.map=null,this.size=1,this.sizeAttenuation=!0,this.vertexColors=THREE.NoColors,this.fog=!0,this.setValues(a)},THREE.PointCloudMaterial.prototype=Object.create(THREE.Material.prototype),THREE.PointCloudMaterial.prototype.clone=function(){var a=new THREE.PointCloudMaterial;return THREE.Material.prototype.clone.call(this,a),a.color.copy(this.color),a.map=this.map,a.size=this.size,a.sizeAttenuation=this.sizeAttenuation,a.vertexColors=this.vertexColors,a.fog=this.fog,a},
// backwards compatibility
THREE.ParticleBasicMaterial=function(a){return console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointCloudMaterial."),new THREE.PointCloudMaterial(a)},THREE.ParticleSystemMaterial=function(a){return console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointCloudMaterial."),new THREE.PointCloudMaterial(a)},
// File:src/materials/ShaderMaterial.js
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  defines: { "label" : "value" },
 *  uniforms: { "parameter1": { type: "f", value: 1.0 }, "parameter2": { type: "i" value2: 2 } },
 *
 *  fragmentShader: <string>,
 *  vertexShader: <string>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  lights: <bool>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>,
 *
 *	fog: <bool>
 * }
 */
THREE.ShaderMaterial=function(a){THREE.Material.call(this),this.defines={},this.uniforms={},this.attributes=null,this.vertexShader="void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",this.fragmentShader="void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}",this.shading=THREE.SmoothShading,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,// set to use scene fog
this.lights=!1,// set to use scene lights
this.vertexColors=THREE.NoColors,// set to use "color" attribute stream
this.skinning=!1,// set to use skinning attribute streams
this.morphTargets=!1,// set to use morph targets
this.morphNormals=!1,// set to use morph normals
// When rendered geometry doesn't include these attributes but the material does,
// use these default values in WebGL. This avoids errors when buffer data is missing.
this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.setValues(a)},THREE.ShaderMaterial.prototype=Object.create(THREE.Material.prototype),THREE.ShaderMaterial.prototype.clone=function(){var a=new THREE.ShaderMaterial;return THREE.Material.prototype.clone.call(this,a),a.fragmentShader=this.fragmentShader,a.vertexShader=this.vertexShader,a.uniforms=THREE.UniformsUtils.clone(this.uniforms),a.attributes=this.attributes,a.defines=this.defines,a.shading=this.shading,a.wireframe=this.wireframe,a.wireframeLinewidth=this.wireframeLinewidth,a.fog=this.fog,a.lights=this.lights,a.vertexColors=this.vertexColors,a.skinning=this.skinning,a.morphTargets=this.morphTargets,a.morphNormals=this.morphNormals,a},
// File:src/materials/RawShaderMaterial.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.RawShaderMaterial=function(a){THREE.ShaderMaterial.call(this,a)},THREE.RawShaderMaterial.prototype=Object.create(THREE.ShaderMaterial.prototype),THREE.RawShaderMaterial.prototype.clone=function(){var a=new THREE.RawShaderMaterial;return THREE.ShaderMaterial.prototype.clone.call(this,a),a},
// File:src/materials/SpriteMaterial.js
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *	uvOffset: new THREE.Vector2(),
 *	uvScale: new THREE.Vector2(),
 *
 *  fog: <bool>
 * }
 */
THREE.SpriteMaterial=function(a){THREE.Material.call(this),
// defaults
this.color=new THREE.Color(16777215),this.map=null,this.rotation=0,this.fog=!1,
// set parameters
this.setValues(a)},THREE.SpriteMaterial.prototype=Object.create(THREE.Material.prototype),THREE.SpriteMaterial.prototype.clone=function(){var a=new THREE.SpriteMaterial;return THREE.Material.prototype.clone.call(this,a),a.color.copy(this.color),a.map=this.map,a.rotation=this.rotation,a.fog=this.fog,a},
// File:src/materials/SpriteCanvasMaterial.js
/**
 * @author mrdoob / http://mrdoob.com/
 *
 * parameters = {
 *  color: <hex>,
 *  program: <function>,
 *  opacity: <float>,
 *  blending: THREE.NormalBlending
 * }
 */
THREE.SpriteCanvasMaterial=function(a){THREE.Material.call(this),this.color=new THREE.Color(16777215),this.program=function(a,b){},this.setValues(a)},THREE.SpriteCanvasMaterial.prototype=Object.create(THREE.Material.prototype),THREE.SpriteCanvasMaterial.prototype.clone=function(){var a=new THREE.SpriteCanvasMaterial;return THREE.Material.prototype.clone.call(this,a),a.color.copy(this.color),a.program=this.program,a},
// backwards compatibility
THREE.ParticleCanvasMaterial=THREE.SpriteCanvasMaterial,
// File:src/textures/Texture.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 */
THREE.Texture=function(a,b,c,d,e,f,g,h,i){this.id=THREE.TextureIdCount++,this.uuid=THREE.Math.generateUUID(),this.name="",this.image=void 0!==a?a:THREE.Texture.DEFAULT_IMAGE,this.mipmaps=[],this.mapping=void 0!==b?b:THREE.Texture.DEFAULT_MAPPING,this.wrapS=void 0!==c?c:THREE.ClampToEdgeWrapping,this.wrapT=void 0!==d?d:THREE.ClampToEdgeWrapping,this.magFilter=void 0!==e?e:THREE.LinearFilter,this.minFilter=void 0!==f?f:THREE.LinearMipMapLinearFilter,this.anisotropy=void 0!==i?i:1,this.format=void 0!==g?g:THREE.RGBAFormat,this.type=void 0!==h?h:THREE.UnsignedByteType,this.offset=new THREE.Vector2(0,0),this.repeat=new THREE.Vector2(1,1),this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,// valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)
this._needsUpdate=!1,this.onUpdate=null},THREE.Texture.DEFAULT_IMAGE=void 0,THREE.Texture.DEFAULT_MAPPING=new THREE.UVMapping,THREE.Texture.prototype={constructor:THREE.Texture,get needsUpdate(){return this._needsUpdate},set needsUpdate(a){a===!0&&this.update(),this._needsUpdate=a},clone:function(a){return void 0===a&&(a=new THREE.Texture),a.image=this.image,a.mipmaps=this.mipmaps.slice(0),a.mapping=this.mapping,a.wrapS=this.wrapS,a.wrapT=this.wrapT,a.magFilter=this.magFilter,a.minFilter=this.minFilter,a.anisotropy=this.anisotropy,a.format=this.format,a.type=this.type,a.offset.copy(this.offset),a.repeat.copy(this.repeat),a.generateMipmaps=this.generateMipmaps,a.premultiplyAlpha=this.premultiplyAlpha,a.flipY=this.flipY,a.unpackAlignment=this.unpackAlignment,a},update:function(){this.dispatchEvent({type:"update"})},dispose:function(){this.dispatchEvent({type:"dispose"})}},THREE.EventDispatcher.prototype.apply(THREE.Texture.prototype),THREE.TextureIdCount=0,
// File:src/textures/CubeTexture.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.CubeTexture=function(a,b,c,d,e,f,g,h,i){THREE.Texture.call(this,a,b,c,d,e,f,g,h,i),this.images=a},THREE.CubeTexture.prototype=Object.create(THREE.Texture.prototype),THREE.CubeTexture.clone=function(a){return void 0===a&&(a=new THREE.CubeTexture),THREE.Texture.prototype.clone.call(this,a),a.images=this.images,a},
// File:src/textures/CompressedTexture.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.CompressedTexture=function(a,b,c,d,e,f,g,h,i,j,k){THREE.Texture.call(this,null,f,g,h,i,j,d,e,k),this.image={width:b,height:c},this.mipmaps=a,this.generateMipmaps=!1},THREE.CompressedTexture.prototype=Object.create(THREE.Texture.prototype),THREE.CompressedTexture.prototype.clone=function(){var a=new THREE.CompressedTexture;return THREE.Texture.prototype.clone.call(this,a),a},
// File:src/textures/DataTexture.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.DataTexture=function(a,b,c,d,e,f,g,h,i,j,k){THREE.Texture.call(this,null,f,g,h,i,j,d,e,k),this.image={data:a,width:b,height:c}},THREE.DataTexture.prototype=Object.create(THREE.Texture.prototype),THREE.DataTexture.prototype.clone=function(){var a=new THREE.DataTexture;return THREE.Texture.prototype.clone.call(this,a),a},
// File:src/objects/PointCloud.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.PointCloud=function(a,b){THREE.Object3D.call(this),this.geometry=void 0!==a?a:new THREE.Geometry,this.material=void 0!==b?b:new THREE.PointCloudMaterial({color:16777215*Math.random()}),this.sortParticles=!1},THREE.PointCloud.prototype=Object.create(THREE.Object3D.prototype),THREE.PointCloud.prototype.raycast=function(){var a=new THREE.Matrix4,b=new THREE.Ray;return function(c,d){var e=this,f=e.geometry,g=c.params.PointCloud.threshold;if(a.getInverse(this.matrixWorld),b.copy(c.ray).applyMatrix4(a),null===f.boundingBox||b.isIntersectionBox(f.boundingBox)!==!1){var h=g/((this.scale.x+this.scale.y+this.scale.z)/3),i=new THREE.Vector3,j=function(a,f){var g=b.distanceToPoint(a);if(h>g){var i=b.closestPointToPoint(a);i.applyMatrix4(e.matrixWorld);var j=c.ray.origin.distanceTo(i);d.push({distance:j,distanceToRay:g,point:i.clone(),index:f,face:null,object:e})}};if(f instanceof THREE.BufferGeometry){var k=f.attributes,l=k.position.array;if(void 0!==k.index){var m=k.index.array,n=f.offsets;if(0===n.length){var o={start:0,count:m.length,index:0};n=[o]}for(var p=0,q=n.length;q>p;++p)for(var r=n[p].start,s=n[p].count,t=n[p].index,u=r,v=r+s;v>u;u++){var w=t+m[u];i.set(l[3*w],l[3*w+1],l[3*w+2]),j(i,w)}}else for(var x=l.length/3,u=0;x>u;u++)i.set(l[3*u],l[3*u+1],l[3*u+2]),j(i,u)}else for(var y=this.geometry.vertices,u=0;u<y.length;u++)j(y[u],u)}}}(),THREE.PointCloud.prototype.clone=function(a){return void 0===a&&(a=new THREE.PointCloud(this.geometry,this.material)),a.sortParticles=this.sortParticles,THREE.Object3D.prototype.clone.call(this,a),a},
// Backwards compatibility
THREE.ParticleSystem=function(a,b){return console.warn("THREE.ParticleSystem has been renamed to THREE.PointCloud."),new THREE.PointCloud(a,b)},
// File:src/objects/Line.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.Line=function(a,b,c){THREE.Object3D.call(this),this.geometry=void 0!==a?a:new THREE.Geometry,this.material=void 0!==b?b:new THREE.LineBasicMaterial({color:16777215*Math.random()}),this.type=void 0!==c?c:THREE.LineStrip},THREE.LineStrip=0,THREE.LinePieces=1,THREE.Line.prototype=Object.create(THREE.Object3D.prototype),THREE.Line.prototype.raycast=function(){var a=new THREE.Matrix4,b=new THREE.Ray,c=new THREE.Sphere;return function(d,e){var f=d.linePrecision,g=f*f,h=this.geometry;if(null===h.boundingSphere&&h.computeBoundingSphere(),
// Checking boundingSphere distance to ray
c.copy(h.boundingSphere),c.applyMatrix4(this.matrixWorld),d.ray.isIntersectionSphere(c)!==!1&&(a.getInverse(this.matrixWorld),b.copy(d.ray).applyMatrix4(a),h instanceof THREE.Geometry))for(var i=h.vertices,j=i.length,k=new THREE.Vector3,l=new THREE.Vector3,m=this.type===THREE.LineStrip?1:2,n=0;j-1>n;n+=m){var o=b.distanceSqToSegment(i[n],i[n+1],l,k);if(!(o>g)){var p=b.origin.distanceTo(l);p<d.near||p>d.far||e.push({distance:p,
// What do we want? intersection point on the ray or on the segment??
// point: raycaster.ray.at( distance ),
point:k.clone().applyMatrix4(this.matrixWorld),face:null,faceIndex:null,object:this})}}}}(),THREE.Line.prototype.clone=function(a){return void 0===a&&(a=new THREE.Line(this.geometry,this.material,this.type)),THREE.Object3D.prototype.clone.call(this,a),a},
// File:src/objects/Mesh.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author jonobr1 / http://jonobr1.com/
 */
THREE.Mesh=function(a,b){THREE.Object3D.call(this),this.geometry=void 0!==a?a:new THREE.Geometry,this.material=void 0!==b?b:new THREE.MeshBasicMaterial({color:16777215*Math.random()}),this.updateMorphTargets()},THREE.Mesh.prototype=Object.create(THREE.Object3D.prototype),THREE.Mesh.prototype.updateMorphTargets=function(){if(void 0!==this.geometry.morphTargets&&this.geometry.morphTargets.length>0){this.morphTargetBase=-1,this.morphTargetForcedOrder=[],this.morphTargetInfluences=[],this.morphTargetDictionary={};for(var a=0,b=this.geometry.morphTargets.length;b>a;a++)this.morphTargetInfluences.push(0),this.morphTargetDictionary[this.geometry.morphTargets[a].name]=a}},THREE.Mesh.prototype.getMorphTargetIndexByName=function(a){return void 0!==this.morphTargetDictionary[a]?this.morphTargetDictionary[a]:(console.log("THREE.Mesh.getMorphTargetIndexByName: morph target "+a+" does not exist. Returning 0."),0)},THREE.Mesh.prototype.raycast=function(){var a=new THREE.Matrix4,b=new THREE.Ray,c=new THREE.Sphere,d=new THREE.Vector3,e=new THREE.Vector3,f=new THREE.Vector3;return function(g,h){var i=this.geometry;if(
// Checking boundingSphere distance to ray
null===i.boundingSphere&&i.computeBoundingSphere(),c.copy(i.boundingSphere),c.applyMatrix4(this.matrixWorld),g.ray.isIntersectionSphere(c)!==!1&&(
// Check boundingBox before continuing
a.getInverse(this.matrixWorld),b.copy(g.ray).applyMatrix4(a),null===i.boundingBox||b.isIntersectionBox(i.boundingBox)!==!1))if(i instanceof THREE.BufferGeometry){var j=this.material;if(void 0===j)return;var k,l,m,n=i.attributes,o=g.precision;if(void 0!==n.index){var p=n.index.array,q=n.position.array,r=i.offsets;0===r.length&&(r=[{start:0,count:p.length,index:0}]);for(var s=0,t=r.length;t>s;++s)for(var u=r[s].start,v=r[s].count,w=r[s].index,x=u,y=u+v;y>x;x+=3){if(k=w+p[x],l=w+p[x+1],m=w+p[x+2],d.set(q[3*k],q[3*k+1],q[3*k+2]),e.set(q[3*l],q[3*l+1],q[3*l+2]),f.set(q[3*m],q[3*m+1],q[3*m+2]),j.side===THREE.BackSide)var z=b.intersectTriangle(f,e,d,!0);else var z=b.intersectTriangle(d,e,f,j.side!==THREE.DoubleSide);if(null!==z){z.applyMatrix4(this.matrixWorld);var A=g.ray.origin.distanceTo(z);o>A||A<g.near||A>g.far||h.push({distance:A,point:z,indices:[k,l,m],face:null,faceIndex:null,object:this})}}}else for(var q=n.position.array,x=0,B=0,y=q.length;y>x;x+=3,B+=9){if(k=x,l=x+1,m=x+2,d.set(q[B],q[B+1],q[B+2]),e.set(q[B+3],q[B+4],q[B+5]),f.set(q[B+6],q[B+7],q[B+8]),j.side===THREE.BackSide)var z=b.intersectTriangle(f,e,d,!0);else var z=b.intersectTriangle(d,e,f,j.side!==THREE.DoubleSide);if(null!==z){z.applyMatrix4(this.matrixWorld);var A=g.ray.origin.distanceTo(z);o>A||A<g.near||A>g.far||h.push({distance:A,point:z,indices:[k,l,m],face:null,faceIndex:null,object:this})}}}else if(i instanceof THREE.Geometry)for(var k,l,m,C=this.material instanceof THREE.MeshFaceMaterial,D=C===!0?this.material.materials:null,o=g.precision,E=i.vertices,F=0,G=i.faces.length;G>F;F++){var H=i.faces[F],j=C===!0?D[H.materialIndex]:this.material;if(void 0!==j){if(k=E[H.a],l=E[H.b],m=E[H.c],j.morphTargets===!0){var I=i.morphTargets,J=this.morphTargetInfluences;d.set(0,0,0),e.set(0,0,0),f.set(0,0,0);for(var K=0,L=I.length;L>K;K++){var M=J[K];if(0!==M){var N=I[K].vertices;d.x+=(N[H.a].x-k.x)*M,d.y+=(N[H.a].y-k.y)*M,d.z+=(N[H.a].z-k.z)*M,e.x+=(N[H.b].x-l.x)*M,e.y+=(N[H.b].y-l.y)*M,e.z+=(N[H.b].z-l.z)*M,f.x+=(N[H.c].x-m.x)*M,f.y+=(N[H.c].y-m.y)*M,f.z+=(N[H.c].z-m.z)*M}}d.add(k),e.add(l),f.add(m),k=d,l=e,m=f}if(j.side===THREE.BackSide)var z=b.intersectTriangle(m,l,k,!0);else var z=b.intersectTriangle(k,l,m,j.side!==THREE.DoubleSide);if(null!==z){z.applyMatrix4(this.matrixWorld);var A=g.ray.origin.distanceTo(z);o>A||A<g.near||A>g.far||h.push({distance:A,point:z,face:H,faceIndex:F,object:this})}}}}}(),THREE.Mesh.prototype.clone=function(a,b){return void 0===a&&(a=new THREE.Mesh(this.geometry,this.material)),THREE.Object3D.prototype.clone.call(this,a,b),a},
// File:src/objects/Bone.js
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author ikerr / http://verold.com
 */
THREE.Bone=function(a){THREE.Object3D.call(this),this.skin=a,this.accumulatedRotWeight=0,this.accumulatedPosWeight=0,this.accumulatedSclWeight=0},THREE.Bone.prototype=Object.create(THREE.Object3D.prototype),THREE.Bone.prototype.updateMatrixWorld=function(a){THREE.Object3D.prototype.updateMatrixWorld.call(this,a),
// Reset weights to be re-accumulated in the next frame
this.accumulatedRotWeight=0,this.accumulatedPosWeight=0,this.accumulatedSclWeight=0},
// File:src/objects/Skeleton.js
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author michael guerrero / http://realitymeltdown.com
 * @author ikerr / http://verold.com
 */
THREE.Skeleton=function(a,b,c){
// create a bone texture or an array of floats
if(this.useVertexTexture=void 0!==c?c:!0,this.identityMatrix=new THREE.Matrix4,
// copy the bone array
a=a||[],this.bones=a.slice(0),this.useVertexTexture){
// layout (1 matrix = 4 pixels)
//      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
//  with  8x8  pixel texture max   16 bones  (8 * 8  / 4)
//       16x16 pixel texture max   64 bones (16 * 16 / 4)
//       32x32 pixel texture max  256 bones (32 * 32 / 4)
//       64x64 pixel texture max 1024 bones (64 * 64 / 4)
var d;d=this.bones.length>256?64:this.bones.length>64?32:this.bones.length>16?16:8,this.boneTextureWidth=d,this.boneTextureHeight=d,this.boneMatrices=new Float32Array(this.boneTextureWidth*this.boneTextureHeight*4),// 4 floats per RGBA pixel
this.boneTexture=new THREE.DataTexture(this.boneMatrices,this.boneTextureWidth,this.boneTextureHeight,THREE.RGBAFormat,THREE.FloatType),this.boneTexture.minFilter=THREE.NearestFilter,this.boneTexture.magFilter=THREE.NearestFilter,this.boneTexture.generateMipmaps=!1,this.boneTexture.flipY=!1}else this.boneMatrices=new Float32Array(16*this.bones.length);
// use the supplied bone inverses or calculate the inverses
if(void 0===b)this.calculateInverses();else if(this.bones.length===b.length)this.boneInverses=b.slice(0);else{console.warn("THREE.Skeleton bonInverses is the wrong length."),this.boneInverses=[];for(var e=0,f=this.bones.length;f>e;e++)this.boneInverses.push(new THREE.Matrix4)}},THREE.Skeleton.prototype.calculateInverses=function(){this.boneInverses=[];for(var a=0,b=this.bones.length;b>a;a++){var c=new THREE.Matrix4;this.bones[a]&&c.getInverse(this.bones[a].matrixWorld),this.boneInverses.push(c)}},THREE.Skeleton.prototype.pose=function(){
// recover the bind-time world matrices
for(var a,b=0,c=this.bones.length;c>b;b++)a=this.bones[b],a&&a.matrixWorld.getInverse(this.boneInverses[b]);
// compute the local matrices, positions, rotations and scales
for(var b=0,c=this.bones.length;c>b;b++)a=this.bones[b],a&&(a.parent?(a.matrix.getInverse(a.parent.matrixWorld),a.matrix.multiply(a.matrixWorld)):a.matrix.copy(a.matrixWorld),a.matrix.decompose(a.position,a.quaternion,a.scale))},THREE.Skeleton.prototype.update=function(){
// flatten bone matrices to array
for(var a=new THREE.Matrix4,b=0,c=this.bones.length;c>b;b++){
// compute the offset between the current and the original transform
var d=this.bones[b]?this.bones[b].matrixWorld:this.identityMatrix;a.multiplyMatrices(d,this.boneInverses[b]),a.flattenToArrayOffset(this.boneMatrices,16*b)}this.useVertexTexture&&(this.boneTexture.needsUpdate=!0)},
// File:src/objects/SkinnedMesh.js
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author ikerr / http://verold.com
 */
THREE.SkinnedMesh=function(a,b,c){THREE.Mesh.call(this,a,b),this.bindMode="attached",this.bindMatrix=new THREE.Matrix4,this.bindMatrixInverse=new THREE.Matrix4;
// init bones
// TODO: remove bone creation as there is no reason (other than
// convenience) for THREE.SkinnedMesh to do this.
var d=[];if(this.geometry&&void 0!==this.geometry.bones){for(var e,f,g,h,i,j=0,k=this.geometry.bones.length;k>j;++j)f=this.geometry.bones[j],g=f.pos,h=f.rotq,i=f.scl,e=new THREE.Bone(this),d.push(e),e.name=f.name,e.position.set(g[0],g[1],g[2]),e.quaternion.set(h[0],h[1],h[2],h[3]),void 0!==i?e.scale.set(i[0],i[1],i[2]):e.scale.set(1,1,1);for(var j=0,k=this.geometry.bones.length;k>j;++j)f=this.geometry.bones[j],-1!==f.parent?d[f.parent].add(d[j]):this.add(d[j])}this.normalizeSkinWeights(),this.updateMatrixWorld(!0),this.bind(new THREE.Skeleton(d,void 0,c))},THREE.SkinnedMesh.prototype=Object.create(THREE.Mesh.prototype),THREE.SkinnedMesh.prototype.bind=function(a,b){this.skeleton=a,void 0===b&&(this.updateMatrixWorld(!0),b=this.matrixWorld),this.bindMatrix.copy(b),this.bindMatrixInverse.getInverse(b)},THREE.SkinnedMesh.prototype.pose=function(){this.skeleton.pose()},THREE.SkinnedMesh.prototype.normalizeSkinWeights=function(){if(this.geometry instanceof THREE.Geometry)for(var a=0;a<this.geometry.skinIndices.length;a++){var b=this.geometry.skinWeights[a],c=1/b.lengthManhattan();c!==1/0?b.multiplyScalar(c):b.set(1)}},THREE.SkinnedMesh.prototype.updateMatrixWorld=function(a){THREE.Mesh.prototype.updateMatrixWorld.call(this,!0),"attached"===this.bindMode?this.bindMatrixInverse.getInverse(this.matrixWorld):"detached"===this.bindMode?this.bindMatrixInverse.getInverse(this.bindMatrix):console.warn("THREE.SkinnedMesh unreckognized bindMode: "+this.bindMode)},THREE.SkinnedMesh.prototype.clone=function(a){return void 0===a&&(a=new THREE.SkinnedMesh(this.geometry,this.material,this.useVertexTexture)),THREE.Mesh.prototype.clone.call(this,a),a},
// File:src/objects/MorphAnimMesh.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.MorphAnimMesh=function(a,b){THREE.Mesh.call(this,a,b),
// API
this.duration=1e3,// milliseconds
this.mirroredLoop=!1,this.time=0,
// internals
this.lastKeyframe=0,this.currentKeyframe=0,this.direction=1,this.directionBackwards=!1,this.setFrameRange(0,this.geometry.morphTargets.length-1)},THREE.MorphAnimMesh.prototype=Object.create(THREE.Mesh.prototype),THREE.MorphAnimMesh.prototype.setFrameRange=function(a,b){this.startKeyframe=a,this.endKeyframe=b,this.length=this.endKeyframe-this.startKeyframe+1},THREE.MorphAnimMesh.prototype.setDirectionForward=function(){this.direction=1,this.directionBackwards=!1},THREE.MorphAnimMesh.prototype.setDirectionBackward=function(){this.direction=-1,this.directionBackwards=!0},THREE.MorphAnimMesh.prototype.parseAnimations=function(){var a=this.geometry;a.animations||(a.animations={});for(var b,c=a.animations,d=/([a-z]+)_?(\d+)/,e=0,f=a.morphTargets.length;f>e;e++){var g=a.morphTargets[e],h=g.name.match(d);if(h&&h.length>1){var i=h[1];h[2];c[i]||(c[i]={start:1/0,end:-(1/0)});var j=c[i];e<j.start&&(j.start=e),e>j.end&&(j.end=e),b||(b=i)}}a.firstAnimation=b},THREE.MorphAnimMesh.prototype.setAnimationLabel=function(a,b,c){this.geometry.animations||(this.geometry.animations={}),this.geometry.animations[a]={start:b,end:c}},THREE.MorphAnimMesh.prototype.playAnimation=function(a,b){var c=this.geometry.animations[a];c?(this.setFrameRange(c.start,c.end),this.duration=1e3*((c.end-c.start)/b),this.time=0):console.warn("animation["+a+"] undefined")},THREE.MorphAnimMesh.prototype.updateAnimation=function(a){var b=this.duration/this.length;this.time+=this.direction*a,this.mirroredLoop?(this.time>this.duration||this.time<0)&&(this.direction*=-1,this.time>this.duration&&(this.time=this.duration,this.directionBackwards=!0),this.time<0&&(this.time=0,this.directionBackwards=!1)):(this.time=this.time%this.duration,this.time<0&&(this.time+=this.duration));var c=this.startKeyframe+THREE.Math.clamp(Math.floor(this.time/b),0,this.length-1);c!==this.currentKeyframe&&(this.morphTargetInfluences[this.lastKeyframe]=0,this.morphTargetInfluences[this.currentKeyframe]=1,this.morphTargetInfluences[c]=0,this.lastKeyframe=this.currentKeyframe,this.currentKeyframe=c);var d=this.time%b/b;this.directionBackwards&&(d=1-d),this.morphTargetInfluences[this.currentKeyframe]=d,this.morphTargetInfluences[this.lastKeyframe]=1-d},THREE.MorphAnimMesh.prototype.interpolateTargets=function(a,b,c){for(var d=this.morphTargetInfluences,e=0,f=d.length;f>e;e++)d[e]=0;a>-1&&(d[a]=1-c),b>-1&&(d[b]=c)},THREE.MorphAnimMesh.prototype.clone=function(a){return void 0===a&&(a=new THREE.MorphAnimMesh(this.geometry,this.material)),a.duration=this.duration,a.mirroredLoop=this.mirroredLoop,a.time=this.time,a.lastKeyframe=this.lastKeyframe,a.currentKeyframe=this.currentKeyframe,a.direction=this.direction,a.directionBackwards=this.directionBackwards,THREE.Mesh.prototype.clone.call(this,a),a},
// File:src/objects/LOD.js
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */
THREE.LOD=function(){THREE.Object3D.call(this),this.objects=[]},THREE.LOD.prototype=Object.create(THREE.Object3D.prototype),THREE.LOD.prototype.addLevel=function(a,b){void 0===b&&(b=0),b=Math.abs(b);for(var c=0;c<this.objects.length&&!(b<this.objects[c].distance);c++);this.objects.splice(c,0,{distance:b,object:a}),this.add(a)},THREE.LOD.prototype.getObjectForDistance=function(a){for(var b=1,c=this.objects.length;c>b&&!(a<this.objects[b].distance);b++);return this.objects[b-1].object},THREE.LOD.prototype.raycast=function(){var a=new THREE.Vector3;return function(b,c){a.setFromMatrixPosition(this.matrixWorld);var d=b.ray.origin.distanceTo(a);this.getObjectForDistance(d).raycast(b,c)}}(),THREE.LOD.prototype.update=function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(c){if(this.objects.length>1){a.setFromMatrixPosition(c.matrixWorld),b.setFromMatrixPosition(this.matrixWorld);var d=a.distanceTo(b);this.objects[0].object.visible=!0;for(var e=1,f=this.objects.length;f>e&&d>=this.objects[e].distance;e++)this.objects[e-1].object.visible=!1,this.objects[e].object.visible=!0;for(;f>e;e++)this.objects[e].object.visible=!1}}}(),THREE.LOD.prototype.clone=function(a){void 0===a&&(a=new THREE.LOD),THREE.Object3D.prototype.clone.call(this,a);for(var b=0,c=this.objects.length;c>b;b++){var d=this.objects[b].object.clone();d.visible=0===b,a.addLevel(d,this.objects[b].distance)}return a},
// File:src/objects/Sprite.js
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.Sprite=function(){var a=new Float32Array([-.5,-.5,0,.5,-.5,0,.5,.5,0]),b=new THREE.BufferGeometry;return b.addAttribute("position",new THREE.BufferAttribute(a,3)),function(a){THREE.Object3D.call(this),this.geometry=b,this.material=void 0!==a?a:new THREE.SpriteMaterial}}(),THREE.Sprite.prototype=Object.create(THREE.Object3D.prototype),THREE.Sprite.prototype.raycast=function(){var a=new THREE.Vector3;return function(b,c){a.setFromMatrixPosition(this.matrixWorld);var d=b.ray.distanceToPoint(a);d>this.scale.x||c.push({distance:d,point:this.position,face:null,object:this})}}(),THREE.Sprite.prototype.updateMatrix=function(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0},THREE.Sprite.prototype.clone=function(a){return void 0===a&&(a=new THREE.Sprite(this.material)),THREE.Object3D.prototype.clone.call(this,a),a},
// Backwards compatibility
THREE.Particle=THREE.Sprite,
// File:src/scenes/Scene.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.Scene=function(){THREE.Object3D.call(this),this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,// checked by the renderer
this.matrixAutoUpdate=!1,this.__lights=[],this.__objectsAdded=[],this.__objectsRemoved=[]},THREE.Scene.prototype=Object.create(THREE.Object3D.prototype),THREE.Scene.prototype.__addObject=function(a){if(a instanceof THREE.Light)-1===this.__lights.indexOf(a)&&this.__lights.push(a),a.target&&void 0===a.target.parent&&this.add(a.target);else if(!(a instanceof THREE.Camera||a instanceof THREE.Bone)){this.__objectsAdded.push(a);
// check if previously removed
var b=this.__objectsRemoved.indexOf(a);-1!==b&&this.__objectsRemoved.splice(b,1)}this.dispatchEvent({type:"objectAdded",object:a}),a.dispatchEvent({type:"addedToScene",scene:this});for(var c=0;c<a.children.length;c++)this.__addObject(a.children[c])},THREE.Scene.prototype.__removeObject=function(a){if(a instanceof THREE.Light){var b=this.__lights.indexOf(a);if(-1!==b&&this.__lights.splice(b,1),a.shadowCascadeArray)for(var c=0;c<a.shadowCascadeArray.length;c++)this.__removeObject(a.shadowCascadeArray[c])}else if(!(a instanceof THREE.Camera)){this.__objectsRemoved.push(a);
// check if previously added
var b=this.__objectsAdded.indexOf(a);-1!==b&&this.__objectsAdded.splice(b,1)}this.dispatchEvent({type:"objectRemoved",object:a}),a.dispatchEvent({type:"removedFromScene",scene:this});for(var d=0;d<a.children.length;d++)this.__removeObject(a.children[d])},THREE.Scene.prototype.clone=function(a){return void 0===a&&(a=new THREE.Scene),THREE.Object3D.prototype.clone.call(this,a),null!==this.fog&&(a.fog=this.fog.clone()),null!==this.overrideMaterial&&(a.overrideMaterial=this.overrideMaterial.clone()),a.autoUpdate=this.autoUpdate,a.matrixAutoUpdate=this.matrixAutoUpdate,a},
// File:src/scenes/Fog.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.Fog=function(a,b,c){this.name="",this.color=new THREE.Color(a),this.near=void 0!==b?b:1,this.far=void 0!==c?c:1e3},THREE.Fog.prototype.clone=function(){return new THREE.Fog(this.color.getHex(),this.near,this.far)},
// File:src/scenes/FogExp2.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.FogExp2=function(a,b){this.name="",this.color=new THREE.Color(a),this.density=void 0!==b?b:25e-5},THREE.FogExp2.prototype.clone=function(){return new THREE.FogExp2(this.color.getHex(),this.density)},
// File:src/renderers/CanvasRenderer.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.CanvasRenderer=function(a){
//
function b(){sa.setRGB(0,0,0),ta.setRGB(0,0,0),ua.setRGB(0,0,0);for(var a=0,b=y.length;b>a;a++){var c=y[a],d=c.color;c instanceof THREE.AmbientLight?sa.add(d):c instanceof THREE.DirectionalLight?
// for sprites
ta.add(d):c instanceof THREE.PointLight&&
// for sprites
ua.add(d)}}function c(a,b,c){for(var d=0,e=y.length;e>d;d++){var f=y[d];if(na.copy(f.color),f instanceof THREE.DirectionalLight){var g=va.setFromMatrixPosition(f.matrixWorld).normalize(),h=b.dot(g);if(0>=h)continue;h*=f.intensity,c.add(na.multiplyScalar(h))}else if(f instanceof THREE.PointLight){var g=va.setFromMatrixPosition(f.matrixWorld),h=b.dot(va.subVectors(g,a).normalize());if(0>=h)continue;if(h*=0==f.distance?1:1-Math.min(a.distanceTo(g)/f.distance,1),0==h)continue;h*=f.intensity,c.add(na.multiplyScalar(h))}}}function d(a,b,c){n(c.opacity),o(c.blending);var d=b.scale.x*V,e=b.scale.y*W,f=.5*Math.sqrt(d*d+e*e);if(// allow for rotated sprite
ra.min.set(a.x-f,a.y-f),ra.max.set(a.x+f,a.y+f),c instanceof THREE.SpriteMaterial){var g=c.map;if(null!==g&&void 0!==g.image){g.hasEventListener("update",j)===!1&&(g.image.width>0&&k(g),g.addEventListener("update",j));var h=oa[g.id];t(void 0!==h?h:"rgba( 0, 0, 0, 1 )");
//
var i=g.image,l=i.width*g.offset.x,m=i.height*g.offset.y,p=i.width*g.repeat.x,q=i.height*g.repeat.y,r=d/p,u=e/q;_.save(),_.translate(a.x,a.y),0!==c.rotation&&_.rotate(c.rotation),_.translate(-d/2,-e/2),_.scale(r,u),_.translate(-l,-m),_.fillRect(l,m,p,q),_.restore()}else
// no texture
t(c.color.getStyle()),_.save(),_.translate(a.x,a.y),0!==c.rotation&&_.rotate(c.rotation),_.scale(d,-e),_.fillRect(-.5,-.5,1,1),_.restore()}else c instanceof THREE.SpriteCanvasMaterial&&(s(c.color.getStyle()),t(c.color.getStyle()),_.save(),_.translate(a.x,a.y),0!==c.rotation&&_.rotate(c.rotation),_.scale(d,e),c.program(_),_.restore())}function e(a,b,c,d){if(n(d.opacity),o(d.blending),_.beginPath(),_.moveTo(a.positionScreen.x,a.positionScreen.y),_.lineTo(b.positionScreen.x,b.positionScreen.y),d instanceof THREE.LineBasicMaterial){if(p(d.linewidth),q(d.linecap),r(d.linejoin),d.vertexColors!==THREE.VertexColors)s(d.color.getStyle());else{var e=c.vertexColors[0].getStyle(),f=c.vertexColors[1].getStyle();if(e===f)s(e);else{try{var g=_.createLinearGradient(a.positionScreen.x,a.positionScreen.y,b.positionScreen.x,b.positionScreen.y);g.addColorStop(0,e),g.addColorStop(1,f)}catch(h){g=e}s(g)}}_.stroke(),ra.expandByScalar(2*d.linewidth)}else d instanceof THREE.LineDashedMaterial&&(p(d.linewidth),q(d.linecap),r(d.linejoin),s(d.color.getStyle()),u([d.dashSize,d.gapSize]),_.stroke(),ra.expandByScalar(2*d.linewidth),u([]))}function f(a,b,d,e,f,j,k,m){Q.info.render.vertices+=3,Q.info.render.faces++,n(m.opacity),o(m.blending),D=a.positionScreen.x,E=a.positionScreen.y,F=b.positionScreen.x,G=b.positionScreen.y,H=d.positionScreen.x,I=d.positionScreen.y,g(D,E,F,G,H,I),(m instanceof THREE.MeshLambertMaterial||m instanceof THREE.MeshPhongMaterial)&&null===m.map?(la.copy(m.color),ma.copy(m.emissive),m.vertexColors===THREE.FaceColors&&la.multiply(k.color),ka.copy(sa),wa.copy(a.positionWorld).add(b.positionWorld).add(d.positionWorld).divideScalar(3),c(wa,k.normalModel,ka),ka.multiply(la).add(ma),m.wireframe===!0?h(ka,m.wireframeLinewidth,m.wireframeLinecap,m.wireframeLinejoin):i(ka)):m instanceof THREE.MeshBasicMaterial||m instanceof THREE.MeshLambertMaterial||m instanceof THREE.MeshPhongMaterial?null!==m.map?m.map.mapping instanceof THREE.UVMapping&&(J=k.uvs,l(D,E,F,G,H,I,J[e].x,J[e].y,J[f].x,J[f].y,J[j].x,J[j].y,m.map)):null!==m.envMap?m.envMap.mapping instanceof THREE.SphericalReflectionMapping?(xa.copy(k.vertexNormalsModel[e]).applyMatrix3(ya),K=.5*xa.x+.5,L=.5*xa.y+.5,xa.copy(k.vertexNormalsModel[f]).applyMatrix3(ya),M=.5*xa.x+.5,N=.5*xa.y+.5,xa.copy(k.vertexNormalsModel[j]).applyMatrix3(ya),O=.5*xa.x+.5,P=.5*xa.y+.5,l(D,E,F,G,H,I,K,L,M,N,O,P,m.envMap)):m.envMap.mapping instanceof THREE.SphericalRefractionMapping&&(xa.copy(k.vertexNormalsModel[e]).applyMatrix3(ya),K=-.5*xa.x+.5,L=-.5*xa.y+.5,xa.copy(k.vertexNormalsModel[f]).applyMatrix3(ya),M=-.5*xa.x+.5,N=-.5*xa.y+.5,xa.copy(k.vertexNormalsModel[j]).applyMatrix3(ya),O=-.5*xa.x+.5,P=-.5*xa.y+.5,l(D,E,F,G,H,I,K,L,M,N,O,P,m.envMap)):(ka.copy(m.color),m.vertexColors===THREE.FaceColors&&ka.multiply(k.color),m.wireframe===!0?h(ka,m.wireframeLinewidth,m.wireframeLinecap,m.wireframeLinejoin):i(ka)):m instanceof THREE.MeshDepthMaterial?(ka.r=ka.g=ka.b=1-v(a.positionScreen.z*a.positionScreen.w,z.near,z.far),m.wireframe===!0?h(ka,m.wireframeLinewidth,m.wireframeLinecap,m.wireframeLinejoin):i(ka)):m instanceof THREE.MeshNormalMaterial?(xa.copy(k.normalModel).applyMatrix3(ya),ka.setRGB(xa.x,xa.y,xa.z).multiplyScalar(.5).addScalar(.5),m.wireframe===!0?h(ka,m.wireframeLinewidth,m.wireframeLinecap,m.wireframeLinejoin):i(ka)):(ka.setRGB(1,1,1),m.wireframe===!0?h(ka,m.wireframeLinewidth,m.wireframeLinecap,m.wireframeLinejoin):i(ka))}
//
function g(a,b,c,d,e,f){_.beginPath(),_.moveTo(a,b),_.lineTo(c,d),_.lineTo(e,f),_.closePath()}function h(a,b,c,d){p(b),q(c),r(d),s(a.getStyle()),_.stroke(),ra.expandByScalar(2*b)}function i(a){t(a.getStyle()),_.fill()}function j(a){k(a.target)}function k(a){if(!(a instanceof THREE.CompressedTexture)){var b=a.wrapS===THREE.RepeatWrapping,c=a.wrapT===THREE.RepeatWrapping,d=a.image,e=document.createElement("canvas");e.width=d.width,e.height=d.height;var f=e.getContext("2d");f.setTransform(1,0,0,-1,0,d.height),f.drawImage(d,0,0),oa[a.id]=_.createPattern(e,b===!0&&c===!0?"repeat":b===!0&&c===!1?"repeat-x":b===!1&&c===!0?"repeat-y":"no-repeat")}}function l(a,b,c,d,e,f,g,h,i,l,m,n,o){if(!(o instanceof THREE.DataTexture)){o.hasEventListener("update",j)===!1&&(void 0!==o.image&&o.image.width>0&&k(o),o.addEventListener("update",j));var p=oa[o.id];if(void 0===p)return t("rgba(0,0,0,1)"),void _.fill();t(p);
// http://extremelysatisfactorytotalitarianism.com/blog/?p=2120
var q,r,s,u,v,w,x,y,z=o.offset.x/o.repeat.x,A=o.offset.y/o.repeat.y,B=o.image.width*o.repeat.x,C=o.image.height*o.repeat.y;g=(g+z)*B,h=(h+A)*C,i=(i+z)*B,l=(l+A)*C,m=(m+z)*B,n=(n+A)*C,c-=a,d-=b,e-=a,f-=b,i-=g,l-=h,m-=g,n-=h,x=i*n-m*l,0!==x&&(y=1/x,q=(n*c-l*e)*y,r=(n*d-l*f)*y,s=(i*e-m*c)*y,u=(i*f-m*d)*y,v=a-q*g-s*h,w=b-r*g-u*h,_.save(),_.transform(q,r,s,u,v,w),_.fill(),_.restore())}}
// Hide anti-alias gaps
function m(a,b,c){var d,e=b.x-a.x,f=b.y-a.y,g=e*e+f*f;0!==g&&(d=c/Math.sqrt(g),e*=d,f*=d,b.x+=e,b.y+=f,a.x-=e,a.y-=f)}
// Context cached methods.
function n(a){ca!==a&&(_.globalAlpha=a,ca=a)}function o(a){da!==a&&(a===THREE.NormalBlending?_.globalCompositeOperation="source-over":a===THREE.AdditiveBlending?_.globalCompositeOperation="lighter":a===THREE.SubtractiveBlending&&(_.globalCompositeOperation="darker"),da=a)}function p(a){ga!==a&&(_.lineWidth=a,ga=a)}function q(a){
// "butt", "round", "square"
ha!==a&&(_.lineCap=a,ha=a)}function r(a){
// "round", "bevel", "miter"
ia!==a&&(_.lineJoin=a,ia=a)}function s(a){ea!==a&&(_.strokeStyle=a,ea=a)}function t(a){fa!==a&&(_.fillStyle=a,fa=a)}function u(a){ja.length!==a.length&&(_.setLineDash(a),ja=a)}console.log("THREE.CanvasRenderer",THREE.REVISION);var v=THREE.Math.smoothstep;a=a||{};var w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q=this,R=new THREE.Projector,S=void 0!==a.canvas?a.canvas:document.createElement("canvas"),T=S.width,U=S.height,V=Math.floor(T/2),W=Math.floor(U/2),X=0,Y=0,Z=T,$=U,_=S.getContext("2d",{alpha:a.alpha===!0}),aa=new THREE.Color(0),ba=0,ca=1,da=0,ea=null,fa=null,ga=null,ha=null,ia=null,ja=[],ka=(new THREE.RenderableVertex,new THREE.RenderableVertex,new THREE.Color),la=(new THREE.Color,new THREE.Color,new THREE.Color,new THREE.Color,new THREE.Color),ma=new THREE.Color,na=new THREE.Color,oa={},pa=new THREE.Box2,qa=new THREE.Box2,ra=new THREE.Box2,sa=new THREE.Color,ta=new THREE.Color,ua=new THREE.Color,va=new THREE.Vector3,// Needed for PointLight
wa=new THREE.Vector3,xa=new THREE.Vector3,ya=new THREE.Matrix3;
// dash+gap fallbacks for Firefox and everything else
void 0===_.setLineDash&&(_.setLineDash=function(){}),this.domElement=S,this.devicePixelRatio=void 0!==a.devicePixelRatio?a.devicePixelRatio:void 0!==self.devicePixelRatio?self.devicePixelRatio:1,this.autoClear=!0,this.sortObjects=!0,this.sortElements=!0,this.info={render:{vertices:0,faces:0}},
// WebGLRenderer compatibility
this.supportsVertexTextures=function(){},this.setFaceCulling=function(){},this.setSize=function(a,b,c){T=a*this.devicePixelRatio,U=b*this.devicePixelRatio,S.width=T,S.height=U,V=Math.floor(T/2),W=Math.floor(U/2),c!==!1&&(S.style.width=a+"px",S.style.height=b+"px"),pa.min.set(-V,-W),pa.max.set(V,W),qa.min.set(-V,-W),qa.max.set(V,W),ca=1,da=0,ea=null,fa=null,ga=null,ha=null,ia=null,this.setViewport(0,0,a,b)},this.setViewport=function(a,b,c,d){X=a*this.devicePixelRatio,Y=b*this.devicePixelRatio,Z=c*this.devicePixelRatio,$=d*this.devicePixelRatio},this.setScissor=function(){},this.enableScissorTest=function(){},this.setClearColor=function(a,b){aa.set(a),ba=void 0!==b?b:1,qa.min.set(-V,-W),qa.max.set(V,W)},this.setClearColorHex=function(a,b){console.warn("THREE.CanvasRenderer: .setClearColorHex() is being removed. Use .setClearColor() instead."),this.setClearColor(a,b)},this.getClearColor=function(){return aa},this.getClearAlpha=function(){return ba},this.getMaxAnisotropy=function(){return 0},this.clear=function(){qa.empty()===!1&&(qa.intersect(pa),qa.expandByScalar(2),qa.min.x=qa.min.x+V,qa.min.y=-qa.min.y+W,qa.max.x=qa.max.x+V,qa.max.y=-qa.max.y+W,1>ba&&_.clearRect(0|qa.min.x,0|qa.min.y,qa.max.x-qa.min.x|0,qa.max.y-qa.min.y|0),ba>0&&(o(THREE.NormalBlending),n(1),t("rgba("+Math.floor(255*aa.r)+","+Math.floor(255*aa.g)+","+Math.floor(255*aa.b)+","+ba+")"),_.fillRect(0|qa.min.x,0|qa.min.y,qa.max.x-qa.min.x|0,qa.max.y-qa.min.y|0)),qa.makeEmpty())},
// compatibility
this.clearColor=function(){},this.clearDepth=function(){},this.clearStencil=function(){},this.render=function(a,c){if(c instanceof THREE.Camera==!1)return void console.error("THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.");this.autoClear===!0&&this.clear(),Q.info.render.vertices=0,Q.info.render.faces=0,_.setTransform(Z/T,0,0,-$/U,X,U-Y),_.translate(V,W),w=R.projectScene(a,c,this.sortObjects,this.sortElements),x=w.elements,y=w.lights,z=c,ya.getNormalMatrix(c.matrixWorldInverse),/* DEBUG
		setFillStyle( 'rgba( 0, 255, 255, 0.5 )' );
		_context.fillRect( _clipBox.min.x, _clipBox.min.y, _clipBox.max.x - _clipBox.min.x, _clipBox.max.y - _clipBox.min.y );
		*/
b();for(var g=0,h=x.length;h>g;g++){var i=x[g],j=i.material;if(void 0!==j&&0!==j.opacity){if(ra.makeEmpty(),i instanceof THREE.RenderableSprite)A=i,A.x*=V,A.y*=W,d(A,i,j);else if(i instanceof THREE.RenderableLine)A=i.v1,B=i.v2,A.positionScreen.x*=V,A.positionScreen.y*=W,B.positionScreen.x*=V,B.positionScreen.y*=W,ra.setFromPoints([A.positionScreen,B.positionScreen]),pa.isIntersectionBox(ra)===!0&&e(A,B,i,j);else if(i instanceof THREE.RenderableFace){if(A=i.v1,B=i.v2,C=i.v3,A.positionScreen.z<-1||A.positionScreen.z>1)continue;if(B.positionScreen.z<-1||B.positionScreen.z>1)continue;if(C.positionScreen.z<-1||C.positionScreen.z>1)continue;A.positionScreen.x*=V,A.positionScreen.y*=W,B.positionScreen.x*=V,B.positionScreen.y*=W,C.positionScreen.x*=V,C.positionScreen.y*=W,j.overdraw>0&&(m(A.positionScreen,B.positionScreen,j.overdraw),m(B.positionScreen,C.positionScreen,j.overdraw),m(C.positionScreen,A.positionScreen,j.overdraw)),ra.setFromPoints([A.positionScreen,B.positionScreen,C.positionScreen]),pa.isIntersectionBox(ra)===!0&&f(A,B,C,0,1,2,i,j)}/* DEBUG
			setLineWidth( 1 );
			setStrokeStyle( 'rgba( 0, 255, 0, 0.5 )' );
			_context.strokeRect( _elemBox.min.x, _elemBox.min.y, _elemBox.max.x - _elemBox.min.x, _elemBox.max.y - _elemBox.min.y );
			*/
qa.union(ra)}}/* DEBUG
		setLineWidth( 1 );
		setStrokeStyle( 'rgba( 255, 0, 0, 0.5 )' );
		_context.strokeRect( _clearBox.min.x, _clearBox.min.y, _clearBox.max.x - _clearBox.min.x, _clearBox.max.y - _clearBox.min.y );
		*/
_.setTransform(1,0,0,1,0,0)}},
// File:src/renderers/shaders/ShaderChunk.js
THREE.ShaderChunk={},
// File:src/renderers/shaders/ShaderChunk/alphatest_fragment.glsl
THREE.ShaderChunk.alphatest_fragment="#ifdef ALPHATEST\n\n	if ( gl_FragColor.a < ALPHATEST ) discard;\n\n#endif\n",
// File:src/renderers/shaders/ShaderChunk/lights_lambert_vertex.glsl
THREE.ShaderChunk.lights_lambert_vertex="vLightFront = vec3( 0.0 );\n\n#ifdef DOUBLE_SIDED\n\n	vLightBack = vec3( 0.0 );\n\n#endif\n\ntransformedNormal = normalize( transformedNormal );\n\n#if MAX_DIR_LIGHTS > 0\n\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n	vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n	vec3 dirVector = normalize( lDirection.xyz );\n\n	float dotProduct = dot( transformedNormal, dirVector );\n	vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n	#ifdef DOUBLE_SIDED\n\n		vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n		#ifdef WRAP_AROUND\n\n			vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n		#endif\n\n	#endif\n\n	#ifdef WRAP_AROUND\n\n		vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n		directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n\n		#ifdef DOUBLE_SIDED\n\n			directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n\n		#endif\n\n	#endif\n\n	vLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n\n	#ifdef DOUBLE_SIDED\n\n		vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n\n	#endif\n\n}\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n		float lDistance = 1.0;\n		if ( pointLightDistance[ i ] > 0.0 )\n			lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\n\n		lVector = normalize( lVector );\n		float dotProduct = dot( transformedNormal, lVector );\n\n		vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n		#ifdef DOUBLE_SIDED\n\n			vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n			#ifdef WRAP_AROUND\n\n				vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n			#endif\n\n		#endif\n\n		#ifdef WRAP_AROUND\n\n			vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n			pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n\n			#ifdef DOUBLE_SIDED\n\n				pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n\n			#endif\n\n		#endif\n\n		vLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n\n		#ifdef DOUBLE_SIDED\n\n			vLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n\n		#endif\n\n	}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n		float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\n\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n			spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n			float lDistance = 1.0;\n			if ( spotLightDistance[ i ] > 0.0 )\n				lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\n\n			lVector = normalize( lVector );\n\n			float dotProduct = dot( transformedNormal, lVector );\n			vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n			#ifdef DOUBLE_SIDED\n\n				vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n				#ifdef WRAP_AROUND\n\n					vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n				#endif\n\n			#endif\n\n			#ifdef WRAP_AROUND\n\n				vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n				spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n\n				#ifdef DOUBLE_SIDED\n\n					spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n\n				#endif\n\n			#endif\n\n			vLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n\n			#ifdef DOUBLE_SIDED\n\n				vLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n\n			#endif\n\n		}\n\n	}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n		vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\n		vec3 lVector = normalize( lDirection.xyz );\n\n		float dotProduct = dot( transformedNormal, lVector );\n\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n		float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\n\n		vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n		#ifdef DOUBLE_SIDED\n\n			vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n\n		#endif\n\n	}\n\n#endif\n\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n\n#ifdef DOUBLE_SIDED\n\n	vLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/map_particle_pars_fragment.glsl
THREE.ShaderChunk.map_particle_pars_fragment="#ifdef USE_MAP\n\n	uniform sampler2D map;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/default_vertex.glsl
THREE.ShaderChunk.default_vertex="vec4 mvPosition;\n\n#ifdef USE_SKINNING\n\n	mvPosition = modelViewMatrix * skinned;\n\n#endif\n\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\n\n	mvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n\n#endif\n\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\n\n	mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\n#endif\n\ngl_Position = projectionMatrix * mvPosition;",
// File:src/renderers/shaders/ShaderChunk/map_pars_fragment.glsl
THREE.ShaderChunk.map_pars_fragment="#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	varying vec2 vUv;\n\n#endif\n\n#ifdef USE_MAP\n\n	uniform sampler2D map;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/skinnormal_vertex.glsl
THREE.ShaderChunk.skinnormal_vertex="#ifdef USE_SKINNING\n\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\n	#ifdef USE_MORPHNORMALS\n\n	vec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n\n	#else\n\n	vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n\n	#endif\n\n#endif\n",
// File:src/renderers/shaders/ShaderChunk/logdepthbuf_pars_vertex.glsl
THREE.ShaderChunk.logdepthbuf_pars_vertex="#ifdef USE_LOGDEPTHBUF\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		varying float vFragDepth;\n\n	#endif\n\n	uniform float logDepthBufFC;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/lightmap_pars_vertex.glsl
THREE.ShaderChunk.lightmap_pars_vertex="#ifdef USE_LIGHTMAP\n\n	varying vec2 vUv2;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/lights_phong_fragment.glsl
THREE.ShaderChunk.lights_phong_fragment="vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n\n#ifdef DOUBLE_SIDED\n\n	normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\n#endif\n\n#ifdef USE_NORMALMAP\n\n	normal = perturbNormal2Arb( -vViewPosition, normal );\n\n#elif defined( USE_BUMPMAP )\n\n	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	vec3 pointDiffuse = vec3( 0.0 );\n	vec3 pointSpecular = vec3( 0.0 );\n\n	for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n		float lDistance = 1.0;\n		if ( pointLightDistance[ i ] > 0.0 )\n			lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\n\n		lVector = normalize( lVector );\n\n				// diffuse\n\n		float dotProduct = dot( normal, lVector );\n\n		#ifdef WRAP_AROUND\n\n			float pointDiffuseWeightFull = max( dotProduct, 0.0 );\n			float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n			vec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n\n		#else\n\n			float pointDiffuseWeight = max( dotProduct, 0.0 );\n\n		#endif\n\n		pointDiffuse += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\n\n				// specular\n\n		vec3 pointHalfVector = normalize( lVector + viewPosition );\n		float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n		float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, pointHalfVector ), 0.0 ), 5.0 );\n		pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n\n	}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	vec3 spotDiffuse = vec3( 0.0 );\n	vec3 spotSpecular = vec3( 0.0 );\n\n	for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n		float lDistance = 1.0;\n		if ( spotLightDistance[ i ] > 0.0 )\n			lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\n\n		lVector = normalize( lVector );\n\n		float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\n\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n			spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n					// diffuse\n\n			float dotProduct = dot( normal, lVector );\n\n			#ifdef WRAP_AROUND\n\n				float spotDiffuseWeightFull = max( dotProduct, 0.0 );\n				float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n				vec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n\n			#else\n\n				float spotDiffuseWeight = max( dotProduct, 0.0 );\n\n			#endif\n\n			spotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\n\n					// specular\n\n			vec3 spotHalfVector = normalize( lVector + viewPosition );\n			float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\n			float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n\n			float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n			vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, spotHalfVector ), 0.0 ), 5.0 );\n			spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n\n		}\n\n	}\n\n#endif\n\n#if MAX_DIR_LIGHTS > 0\n\n	vec3 dirDiffuse = vec3( 0.0 );\n	vec3 dirSpecular = vec3( 0.0 );\n\n	for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n		vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n		vec3 dirVector = normalize( lDirection.xyz );\n\n				// diffuse\n\n		float dotProduct = dot( normal, dirVector );\n\n		#ifdef WRAP_AROUND\n\n			float dirDiffuseWeightFull = max( dotProduct, 0.0 );\n			float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n			vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n\n		#else\n\n			float dirDiffuseWeight = max( dotProduct, 0.0 );\n\n		#endif\n\n		dirDiffuse += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\n\n		// specular\n\n		vec3 dirHalfVector = normalize( dirVector + viewPosition );\n		float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n		float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n\n		/*\n		// fresnel term from skin shader\n		const float F0 = 0.128;\n\n		float base = 1.0 - dot( viewPosition, dirHalfVector );\n		float exponential = pow( base, 5.0 );\n\n		float fresnel = exponential + F0 * ( 1.0 - exponential );\n		*/\n\n		/*\n		// fresnel term from fresnel shader\n		const float mFresnelBias = 0.08;\n		const float mFresnelScale = 0.3;\n		const float mFresnelPower = 5.0;\n\n		float fresnel = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( -viewPosition ), normal ), mFresnelPower );\n		*/\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		// 		dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;\n\n		vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n		dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\n\n	}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	vec3 hemiDiffuse = vec3( 0.0 );\n	vec3 hemiSpecular = vec3( 0.0 );\n\n	for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n		vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\n		vec3 lVector = normalize( lDirection.xyz );\n\n		// diffuse\n\n		float dotProduct = dot( normal, lVector );\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\n		vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n		hemiDiffuse += diffuse * hemiColor;\n\n		// specular (sky light)\n\n		vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\n		float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\n		float hemiSpecularWeightSky = specularStrength * max( pow( max( hemiDotNormalHalfSky, 0.0 ), shininess ), 0.0 );\n\n		// specular (ground light)\n\n		vec3 lVectorGround = -lVector;\n\n		vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\n		float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\n		float hemiSpecularWeightGround = specularStrength * max( pow( max( hemiDotNormalHalfGround, 0.0 ), shininess ), 0.0 );\n\n		float dotProductGround = dot( normal, lVectorGround );\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );\n		vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );\n		hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n\n	}\n\n#endif\n\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n\n#if MAX_DIR_LIGHTS > 0\n\n	totalDiffuse += dirDiffuse;\n	totalSpecular += dirSpecular;\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	totalDiffuse += hemiDiffuse;\n	totalSpecular += hemiSpecular;\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	totalDiffuse += pointDiffuse;\n	totalSpecular += pointSpecular;\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	totalDiffuse += spotDiffuse;\n	totalSpecular += spotSpecular;\n\n#endif\n\n#ifdef METAL\n\n	gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n\n#else\n\n	gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/fog_pars_fragment.glsl
THREE.ShaderChunk.fog_pars_fragment="#ifdef USE_FOG\n\n	uniform vec3 fogColor;\n\n	#ifdef FOG_EXP2\n\n		uniform float fogDensity;\n\n	#else\n\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/morphnormal_vertex.glsl
THREE.ShaderChunk.morphnormal_vertex="#ifdef USE_MORPHNORMALS\n\n	vec3 morphedNormal = vec3( 0.0 );\n\n	morphedNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n	morphedNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n	morphedNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n	morphedNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\n	morphedNormal += normal;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/envmap_pars_fragment.glsl
THREE.ShaderChunk.envmap_pars_fragment="#ifdef USE_ENVMAP\n\n	uniform float reflectivity;\n	uniform samplerCube envMap;\n	uniform float flipEnvMap;\n	uniform int combine;\n\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\n		uniform bool useRefract;\n		uniform float refractionRatio;\n\n	#else\n\n		varying vec3 vReflect;\n\n	#endif\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/logdepthbuf_fragment.glsl
THREE.ShaderChunk.logdepthbuf_fragment="#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\n	gl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/normalmap_pars_fragment.glsl
THREE.ShaderChunk.normalmap_pars_fragment="#ifdef USE_NORMALMAP\n\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n\n			// Per-Pixel Tangent Space Normal Mapping\n			// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( vUv.st );\n		vec2 st1 = dFdy( vUv.st );\n\n		vec3 S = normalize( q0 * st1.t - q1 * st0.t );\n		vec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n		vec3 N = normalize( surf_norm );\n\n		vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n		mapN.xy = normalScale * mapN.xy;\n		mat3 tsn = mat3( S, T, N );\n		return normalize( tsn * mapN );\n\n	}\n\n#endif\n",
// File:src/renderers/shaders/ShaderChunk/lights_phong_pars_vertex.glsl
THREE.ShaderChunk.lights_phong_pars_vertex="#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	varying vec3 vWorldPosition;\n\n#endif\n",
// File:src/renderers/shaders/ShaderChunk/lightmap_pars_fragment.glsl
THREE.ShaderChunk.lightmap_pars_fragment="#ifdef USE_LIGHTMAP\n\n	varying vec2 vUv2;\n	uniform sampler2D lightMap;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/shadowmap_vertex.glsl
THREE.ShaderChunk.shadowmap_vertex="#ifdef USE_SHADOWMAP\n\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n		vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n\n	}\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/lights_phong_vertex.glsl
THREE.ShaderChunk.lights_phong_vertex="#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	vWorldPosition = worldPosition.xyz;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/map_fragment.glsl
THREE.ShaderChunk.map_fragment="#ifdef USE_MAP\n\n	vec4 texelColor = texture2D( map, vUv );\n\n	#ifdef GAMMA_INPUT\n\n		texelColor.xyz *= texelColor.xyz;\n\n	#endif\n\n	gl_FragColor = gl_FragColor * texelColor;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/lightmap_vertex.glsl
THREE.ShaderChunk.lightmap_vertex="#ifdef USE_LIGHTMAP\n\n	vUv2 = uv2;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/map_particle_fragment.glsl
THREE.ShaderChunk.map_particle_fragment="#ifdef USE_MAP\n\n	gl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/color_pars_fragment.glsl
THREE.ShaderChunk.color_pars_fragment="#ifdef USE_COLOR\n\n	varying vec3 vColor;\n\n#endif\n",
// File:src/renderers/shaders/ShaderChunk/color_vertex.glsl
THREE.ShaderChunk.color_vertex="#ifdef USE_COLOR\n\n	#ifdef GAMMA_INPUT\n\n		vColor = color * color;\n\n	#else\n\n		vColor = color;\n\n	#endif\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/skinning_vertex.glsl
THREE.ShaderChunk.skinning_vertex="#ifdef USE_SKINNING\n\n	#ifdef USE_MORPHTARGETS\n\n	vec4 skinVertex = bindMatrix * vec4( morphed, 1.0 );\n\n	#else\n\n	vec4 skinVertex = bindMatrix * vec4( position, 1.0 );\n\n	#endif\n\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	skinned  = bindMatrixInverse * skinned;\n\n#endif\n",
// File:src/renderers/shaders/ShaderChunk/envmap_pars_vertex.glsl
THREE.ShaderChunk.envmap_pars_vertex="#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\n\n	varying vec3 vReflect;\n\n	uniform float refractionRatio;\n	uniform bool useRefract;\n\n#endif\n",
// File:src/renderers/shaders/ShaderChunk/linear_to_gamma_fragment.glsl
THREE.ShaderChunk.linear_to_gamma_fragment="#ifdef GAMMA_OUTPUT\n\n	gl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/color_pars_vertex.glsl
THREE.ShaderChunk.color_pars_vertex="#ifdef USE_COLOR\n\n	varying vec3 vColor;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/lights_lambert_pars_vertex.glsl
THREE.ShaderChunk.lights_lambert_pars_vertex="uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\n\nuniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#ifdef WRAP_AROUND\n\n	uniform vec3 wrapRGB;\n\n#endif\n",
// File:src/renderers/shaders/ShaderChunk/map_pars_vertex.glsl
THREE.ShaderChunk.map_pars_vertex="#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	varying vec2 vUv;\n	uniform vec4 offsetRepeat;\n\n#endif\n",
// File:src/renderers/shaders/ShaderChunk/envmap_fragment.glsl
THREE.ShaderChunk.envmap_fragment="#ifdef USE_ENVMAP\n\n	vec3 reflectVec;\n\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\n		vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\n		// http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations\n		// Transforming Normal Vectors with the Inverse Transformation\n\n		vec3 worldNormal = normalize( vec3( vec4( normal, 0.0 ) * viewMatrix ) );\n\n		if ( useRefract ) {\n\n			reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\n		} else { \n\n			reflectVec = reflect( cameraToVertex, worldNormal );\n\n		}\n\n	#else\n\n		reflectVec = vReflect;\n\n	#endif\n\n	#ifdef DOUBLE_SIDED\n\n		float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n		vec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n	#else\n\n		vec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n	#endif\n\n	#ifdef GAMMA_INPUT\n\n		cubeColor.xyz *= cubeColor.xyz;\n\n	#endif\n\n	if ( combine == 1 ) {\n\n		gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n\n	} else if ( combine == 2 ) {\n\n		gl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n\n	} else {\n\n		gl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n\n	}\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/specularmap_pars_fragment.glsl
THREE.ShaderChunk.specularmap_pars_fragment="#ifdef USE_SPECULARMAP\n\n	uniform sampler2D specularMap;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/logdepthbuf_vertex.glsl
THREE.ShaderChunk.logdepthbuf_vertex="#ifdef USE_LOGDEPTHBUF\n\n	gl_Position.z = log2(max(1e-6, gl_Position.w + 1.0)) * logDepthBufFC;\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		vFragDepth = 1.0 + gl_Position.w;\n\n#else\n\n		gl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\n	#endif\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/morphtarget_pars_vertex.glsl
THREE.ShaderChunk.morphtarget_pars_vertex="#ifdef USE_MORPHTARGETS\n\n	#ifndef USE_MORPHNORMALS\n\n	uniform float morphTargetInfluences[ 8 ];\n\n	#else\n\n	uniform float morphTargetInfluences[ 4 ];\n\n	#endif\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/specularmap_fragment.glsl
THREE.ShaderChunk.specularmap_fragment="float specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n	vec4 texelSpecular = texture2D( specularMap, vUv );\n	specularStrength = texelSpecular.r;\n\n#else\n\n	specularStrength = 1.0;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/fog_fragment.glsl
THREE.ShaderChunk.fog_fragment="#ifdef USE_FOG\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		float depth = gl_FragDepthEXT / gl_FragCoord.w;\n\n	#else\n\n		float depth = gl_FragCoord.z / gl_FragCoord.w;\n\n	#endif\n\n	#ifdef FOG_EXP2\n\n		const float LOG2 = 1.442695;\n		float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\n		fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n\n	#else\n\n		float fogFactor = smoothstep( fogNear, fogFar, depth );\n\n	#endif\n	\n	gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/bumpmap_pars_fragment.glsl
THREE.ShaderChunk.bumpmap_pars_fragment="#ifdef USE_BUMPMAP\n\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n\n			// Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen\n			//	http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html\n\n			// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n	vec2 dHdxy_fwd() {\n\n		vec2 dSTdx = dFdx( vUv );\n		vec2 dSTdy = dFdy( vUv );\n\n		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n		return vec2( dBx, dBy );\n\n	}\n\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\n		vec3 vSigmaX = dFdx( surf_pos );\n		vec3 vSigmaY = dFdy( surf_pos );\n		vec3 vN = surf_norm;		// normalized\n\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n\n		float fDet = dot( vSigmaX, R1 );\n\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n\n	}\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/defaultnormal_vertex.glsl
THREE.ShaderChunk.defaultnormal_vertex="vec3 objectNormal;\n\n#ifdef USE_SKINNING\n\n	objectNormal = skinnedNormal.xyz;\n\n#endif\n\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\n\n	objectNormal = morphedNormal;\n\n#endif\n\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\n\n	objectNormal = normal;\n\n#endif\n\n#ifdef FLIP_SIDED\n\n	objectNormal = -objectNormal;\n\n#endif\n\nvec3 transformedNormal = normalMatrix * objectNormal;",
// File:src/renderers/shaders/ShaderChunk/lights_phong_pars_fragment.glsl
THREE.ShaderChunk.lights_phong_pars_fragment="uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	varying vec3 vWorldPosition;\n\n#endif\n\n#ifdef WRAP_AROUND\n\n	uniform vec3 wrapRGB;\n\n#endif\n\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
// File:src/renderers/shaders/ShaderChunk/skinbase_vertex.glsl
THREE.ShaderChunk.skinbase_vertex="#ifdef USE_SKINNING\n\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/map_vertex.glsl
THREE.ShaderChunk.map_vertex="#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/lightmap_fragment.glsl
THREE.ShaderChunk.lightmap_fragment="#ifdef USE_LIGHTMAP\n\n	gl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/shadowmap_pars_vertex.glsl
THREE.ShaderChunk.shadowmap_pars_vertex="#ifdef USE_SHADOWMAP\n\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n	uniform mat4 shadowMatrix[ MAX_SHADOWS ];\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/color_fragment.glsl
THREE.ShaderChunk.color_fragment="#ifdef USE_COLOR\n\n	gl_FragColor = gl_FragColor * vec4( vColor, 1.0 );\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/morphtarget_vertex.glsl
THREE.ShaderChunk.morphtarget_vertex="#ifdef USE_MORPHTARGETS\n\n	vec3 morphed = vec3( 0.0 );\n	morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n	morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n	morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n	morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\n	#ifndef USE_MORPHNORMALS\n\n	morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n	morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n	morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n	morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\n	#endif\n\n	morphed += position;\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/envmap_vertex.glsl
THREE.ShaderChunk.envmap_vertex="#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\n\n	vec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\n	worldNormal = normalize( worldNormal );\n\n	vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n	if ( useRefract ) {\n\n		vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n	} else {\n\n		vReflect = reflect( cameraToVertex, worldNormal );\n\n	}\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/shadowmap_fragment.glsl
THREE.ShaderChunk.shadowmap_fragment="#ifdef USE_SHADOWMAP\n\n	#ifdef SHADOWMAP_DEBUG\n\n		vec3 frustumColors[3];\n		frustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n		frustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n		frustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n\n	#endif\n\n	#ifdef SHADOWMAP_CASCADE\n\n		int inFrustumCount = 0;\n\n	#endif\n\n	float fDepth;\n	vec3 shadowColor = vec3( 1.0 );\n\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n		vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\n\n				// if ( something && something ) breaks ATI OpenGL shader compiler\n				// if ( all( something, something ) ) using this instead\n\n		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n		bool inFrustum = all( inFrustumVec );\n\n				// don't shadow pixels outside of light frustum\n				// use just first frustum (for cascades)\n				// don't shadow pixels behind far plane of light frustum\n\n		#ifdef SHADOWMAP_CASCADE\n\n			inFrustumCount += int( inFrustum );\n			bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n\n		#else\n\n			bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n		#endif\n\n		bool frustumTest = all( frustumTestVec );\n\n		if ( frustumTest ) {\n\n			shadowCoord.z += shadowBias[ i ];\n\n			#if defined( SHADOWMAP_TYPE_PCF )\n\n						// Percentage-close filtering\n						// (9 pixel kernel)\n						// http://fabiensanglard.net/shadowmappingPCF/\n\n				float shadow = 0.0;\n\n		/*\n						// nested loops breaks shader compiler / validator on some ATI cards when using OpenGL\n						// must enroll loop manually\n\n				for ( float y = -1.25; y <= 1.25; y += 1.25 )\n					for ( float x = -1.25; x <= 1.25; x += 1.25 ) {\n\n						vec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\n\n								// doesn't seem to produce any noticeable visual difference compared to simple texture2D lookup\n								//vec4 rgbaDepth = texture2DProj( shadowMap[ i ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );\n\n						float fDepth = unpackDepth( rgbaDepth );\n\n						if ( fDepth < shadowCoord.z )\n							shadow += 1.0;\n\n				}\n\n				shadow /= 9.0;\n\n		*/\n\n				const float shadowDelta = 1.0 / 9.0;\n\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n				float dx0 = -1.25 * xPixelOffset;\n				float dy0 = -1.25 * yPixelOffset;\n				float dx1 = 1.25 * xPixelOffset;\n				float dy1 = 1.25 * yPixelOffset;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n			#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n						// Percentage-close filtering\n						// (9 pixel kernel)\n						// http://fabiensanglard.net/shadowmappingPCF/\n\n				float shadow = 0.0;\n\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n				float dx0 = -1.0 * xPixelOffset;\n				float dy0 = -1.0 * yPixelOffset;\n				float dx1 = 1.0 * xPixelOffset;\n				float dy1 = 1.0 * yPixelOffset;\n\n				mat3 shadowKernel;\n				mat3 depthKernel;\n\n				depthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				depthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				depthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				depthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				depthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n				depthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				depthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				depthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				depthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\n				vec3 shadowZ = vec3( shadowCoord.z );\n				shadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\n				shadowKernel[0] *= vec3(0.25);\n\n				shadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\n				shadowKernel[1] *= vec3(0.25);\n\n				shadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\n				shadowKernel[2] *= vec3(0.25);\n\n				vec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\n\n				shadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\n				shadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\n\n				vec4 shadowValues;\n				shadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\n				shadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\n				shadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\n				shadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\n\n				shadow = dot( shadowValues, vec4( 1.0 ) );\n\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n			#else\n\n				vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\n				float fDepth = unpackDepth( rgbaDepth );\n\n				if ( fDepth < shadowCoord.z )\n\n		// spot with multiple shadows is darker\n\n					shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n\n		// spot with multiple shadows has the same color as single shadow spot\n\n		// 					shadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );\n\n			#endif\n\n		}\n\n\n		#ifdef SHADOWMAP_DEBUG\n\n			#ifdef SHADOWMAP_CASCADE\n\n				if ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n\n			#else\n\n				if ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n\n			#endif\n\n		#endif\n\n	}\n\n	#ifdef GAMMA_OUTPUT\n\n		shadowColor *= shadowColor;\n\n	#endif\n\n	gl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n\n#endif\n",
// File:src/renderers/shaders/ShaderChunk/worldpos_vertex.glsl
THREE.ShaderChunk.worldpos_vertex="#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\n	#ifdef USE_SKINNING\n\n		vec4 worldPosition = modelMatrix * skinned;\n\n	#endif\n\n	#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\n\n		vec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n\n	#endif\n\n	#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\n\n		vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\n	#endif\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/shadowmap_pars_fragment.glsl
THREE.ShaderChunk.shadowmap_pars_fragment="#ifdef USE_SHADOWMAP\n\n	uniform sampler2D shadowMap[ MAX_SHADOWS ];\n	uniform vec2 shadowMapSize[ MAX_SHADOWS ];\n\n	uniform float shadowDarkness[ MAX_SHADOWS ];\n	uniform float shadowBias[ MAX_SHADOWS ];\n\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n\n	float unpackDepth( const in vec4 rgba_depth ) {\n\n		const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n		float depth = dot( rgba_depth, bit_shift );\n		return depth;\n\n	}\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/skinning_pars_vertex.glsl
THREE.ShaderChunk.skinning_pars_vertex="#ifdef USE_SKINNING\n\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n\n	#ifdef BONE_TEXTURE\n\n		uniform sampler2D boneTexture;\n		uniform int boneTextureWidth;\n		uniform int boneTextureHeight;\n\n		mat4 getBoneMatrix( const in float i ) {\n\n			float j = i * 4.0;\n			float x = mod( j, float( boneTextureWidth ) );\n			float y = floor( j / float( boneTextureWidth ) );\n\n			float dx = 1.0 / float( boneTextureWidth );\n			float dy = 1.0 / float( boneTextureHeight );\n\n			y = dy * ( y + 0.5 );\n\n			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n			mat4 bone = mat4( v1, v2, v3, v4 );\n\n			return bone;\n\n		}\n\n	#else\n\n		uniform mat4 boneGlobalMatrices[ MAX_BONES ];\n\n		mat4 getBoneMatrix( const in float i ) {\n\n			mat4 bone = boneGlobalMatrices[ int(i) ];\n			return bone;\n\n		}\n\n	#endif\n\n#endif\n",
// File:src/renderers/shaders/ShaderChunk/logdepthbuf_pars_fragment.glsl
THREE.ShaderChunk.logdepthbuf_pars_fragment="#ifdef USE_LOGDEPTHBUF\n\n	uniform float logDepthBufFC;\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		#extension GL_EXT_frag_depth : enable\n		varying float vFragDepth;\n\n	#endif\n\n#endif",
// File:src/renderers/shaders/ShaderChunk/alphamap_fragment.glsl
THREE.ShaderChunk.alphamap_fragment="#ifdef USE_ALPHAMAP\n\n	gl_FragColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n",
// File:src/renderers/shaders/ShaderChunk/alphamap_pars_fragment.glsl
THREE.ShaderChunk.alphamap_pars_fragment="#ifdef USE_ALPHAMAP\n\n	uniform sampler2D alphaMap;\n\n#endif\n",
// File:src/renderers/shaders/UniformsUtils.js
/**
 * Uniform Utilities
 */
THREE.UniformsUtils={merge:function(a){var b,c,d,e={};for(b=0;b<a.length;b++){d=this.clone(a[b]);for(c in d)e[c]=d[c]}return e},clone:function(a){var b,c,d,e={};for(b in a){e[b]={};for(c in a[b])d=a[b][c],d instanceof THREE.Color||d instanceof THREE.Vector2||d instanceof THREE.Vector3||d instanceof THREE.Vector4||d instanceof THREE.Matrix4||d instanceof THREE.Texture?e[b][c]=d.clone():d instanceof Array?e[b][c]=d.slice():e[b][c]=d}return e}},
// File:src/renderers/shaders/UniformsLib.js
/**
 * Uniforms library for shared webgl shaders
 */
THREE.UniformsLib={common:{diffuse:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},map:{type:"t",value:null},offsetRepeat:{type:"v4",value:new THREE.Vector4(0,0,1,1)},lightMap:{type:"t",value:null},specularMap:{type:"t",value:null},alphaMap:{type:"t",value:null},envMap:{type:"t",value:null},flipEnvMap:{type:"f",value:-1},useRefract:{type:"i",value:0},reflectivity:{type:"f",value:1},refractionRatio:{type:"f",value:.98},combine:{type:"i",value:0},morphTargetInfluences:{type:"f",value:0}},bump:{bumpMap:{type:"t",value:null},bumpScale:{type:"f",value:1}},normalmap:{normalMap:{type:"t",value:null},normalScale:{type:"v2",value:new THREE.Vector2(1,1)}},fog:{fogDensity:{type:"f",value:25e-5},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2e3},fogColor:{type:"c",value:new THREE.Color(16777215)}},lights:{ambientLightColor:{type:"fv",value:[]},directionalLightDirection:{type:"fv",value:[]},directionalLightColor:{type:"fv",value:[]},hemisphereLightDirection:{type:"fv",value:[]},hemisphereLightSkyColor:{type:"fv",value:[]},hemisphereLightGroundColor:{type:"fv",value:[]},pointLightColor:{type:"fv",value:[]},pointLightPosition:{type:"fv",value:[]},pointLightDistance:{type:"fv1",value:[]},spotLightColor:{type:"fv",value:[]},spotLightPosition:{type:"fv",value:[]},spotLightDirection:{type:"fv",value:[]},spotLightDistance:{type:"fv1",value:[]},spotLightAngleCos:{type:"fv1",value:[]},spotLightExponent:{type:"fv1",value:[]}},particle:{psColor:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},size:{type:"f",value:1},scale:{type:"f",value:1},map:{type:"t",value:null},fogDensity:{type:"f",value:25e-5},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2e3},fogColor:{type:"c",value:new THREE.Color(16777215)}},shadowmap:{shadowMap:{type:"tv",value:[]},shadowMapSize:{type:"v2v",value:[]},shadowBias:{type:"fv1",value:[]},shadowDarkness:{type:"fv1",value:[]},shadowMatrix:{type:"m4v",value:[]}}},
// File:src/renderers/shaders/ShaderLib.js
/**
 * Webgl Shader Library for three.js
 *
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 */
THREE.ShaderLib={basic:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,THREE.UniformsLib.shadowmap]),vertexShader:[THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.skinbase_vertex,"	#ifdef USE_ENVMAP",THREE.ShaderChunk.morphnormal_vertex,THREE.ShaderChunk.skinnormal_vertex,THREE.ShaderChunk.defaultnormal_vertex,"	#endif",THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;","uniform float opacity;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.alphamap_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.specularmap_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {","	gl_FragColor = vec4( diffuse, opacity );",THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.alphamap_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.specularmap_fragment,THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},lambert:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{ambient:{type:"c",value:new THREE.Color(16777215)},emissive:{type:"c",value:new THREE.Color(0)},wrapRGB:{type:"v3",value:new THREE.Vector3(1,1,1)}}]),vertexShader:["#define LAMBERT","varying vec3 vLightFront;","#ifdef DOUBLE_SIDED","	varying vec3 vLightBack;","#endif",THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_lambert_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.morphnormal_vertex,THREE.ShaderChunk.skinbase_vertex,THREE.ShaderChunk.skinnormal_vertex,THREE.ShaderChunk.defaultnormal_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.lights_lambert_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform float opacity;","varying vec3 vLightFront;","#ifdef DOUBLE_SIDED","	varying vec3 vLightBack;","#endif",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.alphamap_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.specularmap_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {","	gl_FragColor = vec4( vec3( 1.0 ), opacity );",THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.alphamap_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.specularmap_fragment,"	#ifdef DOUBLE_SIDED",
//"float isFront = float( gl_FrontFacing );",
//"gl_FragColor.xyz *= isFront * vLightFront + ( 1.0 - isFront ) * vLightBack;",
"		if ( gl_FrontFacing )","			gl_FragColor.xyz *= vLightFront;","		else","			gl_FragColor.xyz *= vLightBack;","	#else","		gl_FragColor.xyz *= vLightFront;","	#endif",THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},phong:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.bump,THREE.UniformsLib.normalmap,THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{ambient:{type:"c",value:new THREE.Color(16777215)},emissive:{type:"c",value:new THREE.Color(0)},specular:{type:"c",value:new THREE.Color(1118481)},shininess:{type:"f",value:30},wrapRGB:{type:"v3",value:new THREE.Vector3(1,1,1)}}]),vertexShader:["#define PHONG","varying vec3 vViewPosition;","varying vec3 vNormal;",THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_phong_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.morphnormal_vertex,THREE.ShaderChunk.skinbase_vertex,THREE.ShaderChunk.skinnormal_vertex,THREE.ShaderChunk.defaultnormal_vertex,"	vNormal = normalize( transformedNormal );",THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,"	vViewPosition = -mvPosition.xyz;",THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.lights_phong_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;","uniform float opacity;","uniform vec3 ambient;","uniform vec3 emissive;","uniform vec3 specular;","uniform float shininess;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.alphamap_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.lights_phong_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.bumpmap_pars_fragment,THREE.ShaderChunk.normalmap_pars_fragment,THREE.ShaderChunk.specularmap_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {","	gl_FragColor = vec4( vec3( 1.0 ), opacity );",THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.alphamap_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.specularmap_fragment,THREE.ShaderChunk.lights_phong_fragment,THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},particle_basic:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.particle,THREE.UniformsLib.shadowmap]),vertexShader:["uniform float size;","uniform float scale;",THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.color_vertex,"	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","	#ifdef USE_SIZEATTENUATION","		gl_PointSize = size * ( scale / length( mvPosition.xyz ) );","	#else","		gl_PointSize = size;","	#endif","	gl_Position = projectionMatrix * mvPosition;",THREE.ShaderChunk.logdepthbuf_vertex,THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 psColor;","uniform float opacity;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_particle_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {","	gl_FragColor = vec4( psColor, opacity );",THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.map_particle_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},dashed:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,{scale:{type:"f",value:1},dashSize:{type:"f",value:1},totalSize:{type:"f",value:2}}]),vertexShader:["uniform float scale;","attribute float lineDistance;","varying float vLineDistance;",THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.color_vertex,"	vLineDistance = scale * lineDistance;","	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","	gl_Position = projectionMatrix * mvPosition;",THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;","uniform float opacity;","uniform float dashSize;","uniform float totalSize;","varying float vLineDistance;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {","	if ( mod( vLineDistance, totalSize ) > dashSize ) {","		discard;","	}","	gl_FragColor = vec4( diffuse, opacity );",THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},depth:{uniforms:{mNear:{type:"f",value:1},mFar:{type:"f",value:2e3},opacity:{type:"f",value:1}},vertexShader:[THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:["uniform float mNear;","uniform float mFar;","uniform float opacity;",THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {",THREE.ShaderChunk.logdepthbuf_fragment,"	#ifdef USE_LOGDEPTHBUF_EXT","		float depth = gl_FragDepthEXT / gl_FragCoord.w;","	#else","		float depth = gl_FragCoord.z / gl_FragCoord.w;","	#endif","	float color = 1.0 - smoothstep( mNear, mFar, depth );","	gl_FragColor = vec4( vec3( color ), opacity );","}"].join("\n")},normal:{uniforms:{opacity:{type:"f",value:1}},vertexShader:["varying vec3 vNormal;",THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {","	vNormal = normalize( normalMatrix * normal );",THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:["uniform float opacity;","varying vec3 vNormal;",THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {","	gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );",THREE.ShaderChunk.logdepthbuf_fragment,"}"].join("\n")},/* -------------------------------------------------------------------------
	//	Normal map shader
	//		- Blinn-Phong
	//		- normal + diffuse + specular + AO + displacement + reflection + shadow maps
	//		- point and directional lights (use with "lights: true" material option)
	 ------------------------------------------------------------------------- */
normalmap:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{enableAO:{type:"i",value:0},enableDiffuse:{type:"i",value:0},enableSpecular:{type:"i",value:0},enableReflection:{type:"i",value:0},enableDisplacement:{type:"i",value:0},tDisplacement:{type:"t",value:null},// must go first as this is vertex texture
tDiffuse:{type:"t",value:null},tCube:{type:"t",value:null},tNormal:{type:"t",value:null},tSpecular:{type:"t",value:null},tAO:{type:"t",value:null},uNormalScale:{type:"v2",value:new THREE.Vector2(1,1)},uDisplacementBias:{type:"f",value:0},uDisplacementScale:{type:"f",value:1},diffuse:{type:"c",value:new THREE.Color(16777215)},specular:{type:"c",value:new THREE.Color(1118481)},ambient:{type:"c",value:new THREE.Color(16777215)},shininess:{type:"f",value:30},opacity:{type:"f",value:1},useRefract:{type:"i",value:0},refractionRatio:{type:"f",value:.98},reflectivity:{type:"f",value:.5},uOffset:{type:"v2",value:new THREE.Vector2(0,0)},uRepeat:{type:"v2",value:new THREE.Vector2(1,1)},wrapRGB:{type:"v3",value:new THREE.Vector3(1,1,1)}}]),fragmentShader:["uniform vec3 ambient;","uniform vec3 diffuse;","uniform vec3 specular;","uniform float shininess;","uniform float opacity;","uniform bool enableDiffuse;","uniform bool enableSpecular;","uniform bool enableAO;","uniform bool enableReflection;","uniform sampler2D tDiffuse;","uniform sampler2D tNormal;","uniform sampler2D tSpecular;","uniform sampler2D tAO;","uniform samplerCube tCube;","uniform vec2 uNormalScale;","uniform bool useRefract;","uniform float refractionRatio;","uniform float reflectivity;","varying vec3 vTangent;","varying vec3 vBinormal;","varying vec3 vNormal;","varying vec2 vUv;","uniform vec3 ambientLightColor;","#if MAX_DIR_LIGHTS > 0","	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];","	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];","#endif","#if MAX_HEMI_LIGHTS > 0","	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];","	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];","	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];","#endif","#if MAX_POINT_LIGHTS > 0","	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];","	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];","	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];","#endif","#if MAX_SPOT_LIGHTS > 0","	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];","	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];","	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];","	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];","	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];","	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];","#endif","#ifdef WRAP_AROUND","	uniform vec3 wrapRGB;","#endif","varying vec3 vWorldPosition;","varying vec3 vViewPosition;",THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {",THREE.ShaderChunk.logdepthbuf_fragment,"	gl_FragColor = vec4( vec3( 1.0 ), opacity );","	vec3 specularTex = vec3( 1.0 );","	vec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;","	normalTex.xy *= uNormalScale;","	normalTex = normalize( normalTex );","	if( enableDiffuse ) {","		#ifdef GAMMA_INPUT","			vec4 texelColor = texture2D( tDiffuse, vUv );","			texelColor.xyz *= texelColor.xyz;","			gl_FragColor = gl_FragColor * texelColor;","		#else","			gl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );","		#endif","	}","	if( enableAO ) {","		#ifdef GAMMA_INPUT","			vec4 aoColor = texture2D( tAO, vUv );","			aoColor.xyz *= aoColor.xyz;","			gl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;","		#else","			gl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;","		#endif","	}",THREE.ShaderChunk.alphatest_fragment,"	if( enableSpecular )","		specularTex = texture2D( tSpecular, vUv ).xyz;","	mat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );","	vec3 finalNormal = tsb * normalTex;","	#ifdef FLIP_SIDED","		finalNormal = -finalNormal;","	#endif","	vec3 normal = normalize( finalNormal );","	vec3 viewPosition = normalize( vViewPosition );",
// point lights
"	#if MAX_POINT_LIGHTS > 0","		vec3 pointDiffuse = vec3( 0.0 );","		vec3 pointSpecular = vec3( 0.0 );","		for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {","			vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );","			vec3 pointVector = lPosition.xyz + vViewPosition.xyz;","			float pointDistance = 1.0;","			if ( pointLightDistance[ i ] > 0.0 )","				pointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );","			pointVector = normalize( pointVector );",
// diffuse
"			#ifdef WRAP_AROUND","				float pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );","				float pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );","				vec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );","			#else","				float pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );","			#endif","			pointDiffuse += pointDistance * pointLightColor[ i ] * diffuse * pointDiffuseWeight;",
// specular
"			vec3 pointHalfVector = normalize( pointVector + viewPosition );","			float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );","			float pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, shininess ), 0.0 );","			float specularNormalization = ( shininess + 2.0 ) / 8.0;","			vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( pointVector, pointHalfVector ), 0.0 ), 5.0 );","			pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;","		}","	#endif",
// spot lights
"	#if MAX_SPOT_LIGHTS > 0","		vec3 spotDiffuse = vec3( 0.0 );","		vec3 spotSpecular = vec3( 0.0 );","		for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {","			vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );","			vec3 spotVector = lPosition.xyz + vViewPosition.xyz;","			float spotDistance = 1.0;","			if ( spotLightDistance[ i ] > 0.0 )","				spotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );","			spotVector = normalize( spotVector );","			float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );","			if ( spotEffect > spotLightAngleCos[ i ] ) {","				spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );",
// diffuse
"				#ifdef WRAP_AROUND","					float spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );","					float spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );","					vec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );","				#else","					float spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );","				#endif","				spotDiffuse += spotDistance * spotLightColor[ i ] * diffuse * spotDiffuseWeight * spotEffect;",
// specular
"				vec3 spotHalfVector = normalize( spotVector + viewPosition );","				float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );","				float spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, shininess ), 0.0 );","				float specularNormalization = ( shininess + 2.0 ) / 8.0;","				vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( spotVector, spotHalfVector ), 0.0 ), 5.0 );","				spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;","			}","		}","	#endif",
// directional lights
"	#if MAX_DIR_LIGHTS > 0","		vec3 dirDiffuse = vec3( 0.0 );","		vec3 dirSpecular = vec3( 0.0 );","		for( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {","			vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );","			vec3 dirVector = normalize( lDirection.xyz );",
// diffuse
"			#ifdef WRAP_AROUND","				float directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );","				float directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );","				vec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );","			#else","				float dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );","			#endif","			dirDiffuse += directionalLightColor[ i ] * diffuse * dirDiffuseWeight;",
// specular
"			vec3 dirHalfVector = normalize( dirVector + viewPosition );","			float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );","			float dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, shininess ), 0.0 );","			float specularNormalization = ( shininess + 2.0 ) / 8.0;","			vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );","			dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;","		}","	#endif",
// hemisphere lights
"	#if MAX_HEMI_LIGHTS > 0","		vec3 hemiDiffuse = vec3( 0.0 );","		vec3 hemiSpecular = vec3( 0.0 );","		for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {","			vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );","			vec3 lVector = normalize( lDirection.xyz );",
// diffuse
"			float dotProduct = dot( normal, lVector );","			float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;","			vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );","			hemiDiffuse += diffuse * hemiColor;",
// specular (sky light)
"			vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );","			float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;","			float hemiSpecularWeightSky = specularTex.r * max( pow( max( hemiDotNormalHalfSky, 0.0 ), shininess ), 0.0 );",
// specular (ground light)
"			vec3 lVectorGround = -lVector;","			vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );","			float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;","			float hemiSpecularWeightGround = specularTex.r * max( pow( max( hemiDotNormalHalfGround, 0.0 ), shininess ), 0.0 );","			float dotProductGround = dot( normal, lVectorGround );","			float specularNormalization = ( shininess + 2.0 ) / 8.0;","			vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );","			vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );","			hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );","		}","	#endif",
// all lights contribution summation
"	vec3 totalDiffuse = vec3( 0.0 );","	vec3 totalSpecular = vec3( 0.0 );","	#if MAX_DIR_LIGHTS > 0","		totalDiffuse += dirDiffuse;","		totalSpecular += dirSpecular;","	#endif","	#if MAX_HEMI_LIGHTS > 0","		totalDiffuse += hemiDiffuse;","		totalSpecular += hemiSpecular;","	#endif","	#if MAX_POINT_LIGHTS > 0","		totalDiffuse += pointDiffuse;","		totalSpecular += pointSpecular;","	#endif","	#if MAX_SPOT_LIGHTS > 0","		totalDiffuse += spotDiffuse;","		totalSpecular += spotSpecular;","	#endif","	#ifdef METAL","		gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient + totalSpecular );","	#else","		gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient ) + totalSpecular;","	#endif","	if ( enableReflection ) {","		vec3 vReflect;","		vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );","		if ( useRefract ) {","			vReflect = refract( cameraToVertex, normal, refractionRatio );","		} else {","			vReflect = reflect( cameraToVertex, normal );","		}","		vec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );","		#ifdef GAMMA_INPUT","			cubeColor.xyz *= cubeColor.xyz;","		#endif","		gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * reflectivity );","	}",THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:["attribute vec4 tangent;","uniform vec2 uOffset;","uniform vec2 uRepeat;","uniform bool enableDisplacement;","#ifdef VERTEX_TEXTURES","	uniform sampler2D tDisplacement;","	uniform float uDisplacementScale;","	uniform float uDisplacementBias;","#endif","varying vec3 vTangent;","varying vec3 vBinormal;","varying vec3 vNormal;","varying vec2 vUv;","varying vec3 vWorldPosition;","varying vec3 vViewPosition;",THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.skinbase_vertex,THREE.ShaderChunk.skinnormal_vertex,
// normal, tangent and binormal vectors
"	#ifdef USE_SKINNING","		vNormal = normalize( normalMatrix * skinnedNormal.xyz );","		vec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );","		vTangent = normalize( normalMatrix * skinnedTangent.xyz );","	#else","		vNormal = normalize( normalMatrix * normal );","		vTangent = normalize( normalMatrix * tangent.xyz );","	#endif","	vBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );","	vUv = uv * uRepeat + uOffset;",
// displacement mapping
"	vec3 displacedPosition;","	#ifdef VERTEX_TEXTURES","		if ( enableDisplacement ) {","			vec3 dv = texture2D( tDisplacement, uv ).xyz;","			float df = uDisplacementScale * dv.x + uDisplacementBias;","			displacedPosition = position + normalize( normal ) * df;","		} else {","			#ifdef USE_SKINNING","				vec4 skinVertex = bindMatrix * vec4( position, 1.0 );","				vec4 skinned = vec4( 0.0 );","				skinned += boneMatX * skinVertex * skinWeight.x;","				skinned += boneMatY * skinVertex * skinWeight.y;","				skinned += boneMatZ * skinVertex * skinWeight.z;","				skinned += boneMatW * skinVertex * skinWeight.w;","				skinned  = bindMatrixInverse * skinned;","				displacedPosition = skinned.xyz;","			#else","				displacedPosition = position;","			#endif","		}","	#else","		#ifdef USE_SKINNING","			vec4 skinVertex = bindMatrix * vec4( position, 1.0 );","			vec4 skinned = vec4( 0.0 );","			skinned += boneMatX * skinVertex * skinWeight.x;","			skinned += boneMatY * skinVertex * skinWeight.y;","			skinned += boneMatZ * skinVertex * skinWeight.z;","			skinned += boneMatW * skinVertex * skinWeight.w;","			skinned  = bindMatrixInverse * skinned;","			displacedPosition = skinned.xyz;","		#else","			displacedPosition = position;","		#endif","	#endif",
//
"	vec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );","	vec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );","	gl_Position = projectionMatrix * mvPosition;",THREE.ShaderChunk.logdepthbuf_vertex,
//
"	vWorldPosition = worldPosition.xyz;","	vViewPosition = -mvPosition.xyz;",
// shadows
"	#ifdef USE_SHADOWMAP","		for( int i = 0; i < MAX_SHADOWS; i ++ ) {","			vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;","		}","	#endif","}"].join("\n")},/* -------------------------------------------------------------------------
	//	Cube map shader
	 ------------------------------------------------------------------------- */
cube:{uniforms:{tCube:{type:"t",value:null},tFlip:{type:"f",value:-1}},vertexShader:["varying vec3 vWorldPosition;",THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {","	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );","	vWorldPosition = worldPosition.xyz;","	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:["uniform samplerCube tCube;","uniform float tFlip;","varying vec3 vWorldPosition;",THREE.ShaderChunk.logdepthbuf_pars_fragment,"void main() {","	gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );",THREE.ShaderChunk.logdepthbuf_fragment,"}"].join("\n")},/* Depth encoding into RGBA texture
	 *
	 * based on SpiderGL shadow map example
	 * http://spidergl.org/example.php?id=6
	 *
	 * originally from
	 * http://www.gamedev.net/topic/442138-packing-a-float-into-a-a8r8g8b8-texture-shader/page__whichpage__1%25EF%25BF%25BD
	 *
	 * see also
	 * http://aras-p.info/blog/2009/07/30/encoding-floats-to-rgba-the-final/
	 */
depthRGBA:{uniforms:{},vertexShader:[THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.logdepthbuf_pars_vertex,"void main() {",THREE.ShaderChunk.skinbase_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.logdepthbuf_vertex,"}"].join("\n"),fragmentShader:[THREE.ShaderChunk.logdepthbuf_pars_fragment,"vec4 pack_depth( const in float depth ) {","	const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );","	const vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );","	vec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );",// "	vec4 res = fract( depth * bit_shift );",
"	res -= res.xxyz * bit_mask;","	return res;","}","void main() {",THREE.ShaderChunk.logdepthbuf_fragment,"	#ifdef USE_LOGDEPTHBUF_EXT","		gl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );","	#else","		gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );","	#endif",
//"gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z / gl_FragCoord.w );",
//"float z = ( ( gl_FragCoord.z / gl_FragCoord.w ) - 3.0 ) / ( 4000.0 - 3.0 );",
//"gl_FragData[ 0 ] = pack_depth( z );",
//"gl_FragData[ 0 ] = vec4( z, z, z, 1.0 );",
"}"].join("\n")}},
// File:src/renderers/WebGLRenderer.js
/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 */
THREE.WebGLRenderer=function(a){
// Internal functions
// Buffer allocation
function b(a){a.__webglVertexBuffer=Ka.createBuffer(),a.__webglColorBuffer=Ka.createBuffer(),Sa.info.memory.geometries++}function c(a){a.__webglVertexBuffer=Ka.createBuffer(),a.__webglColorBuffer=Ka.createBuffer(),a.__webglLineDistanceBuffer=Ka.createBuffer(),Sa.info.memory.geometries++}function d(a){a.__webglVertexBuffer=Ka.createBuffer(),a.__webglNormalBuffer=Ka.createBuffer(),a.__webglTangentBuffer=Ka.createBuffer(),a.__webglColorBuffer=Ka.createBuffer(),a.__webglUVBuffer=Ka.createBuffer(),a.__webglUV2Buffer=Ka.createBuffer(),a.__webglSkinIndicesBuffer=Ka.createBuffer(),a.__webglSkinWeightsBuffer=Ka.createBuffer(),a.__webglFaceBuffer=Ka.createBuffer(),a.__webglLineBuffer=Ka.createBuffer();var b,c;if(a.numMorphTargets)for(a.__webglMorphTargetsBuffers=[],b=0,c=a.numMorphTargets;c>b;b++)a.__webglMorphTargetsBuffers.push(Ka.createBuffer());if(a.numMorphNormals)for(a.__webglMorphNormalsBuffers=[],b=0,c=a.numMorphNormals;c>b;b++)a.__webglMorphNormalsBuffers.push(Ka.createBuffer());Sa.info.memory.geometries++}
// Buffer initialization
function e(a,b){var c=a.vertices.length,d=b.material;if(d.attributes){void 0===a.__webglCustomAttributesList&&(a.__webglCustomAttributesList=[]);for(var e in d.attributes){var f=d.attributes[e];if(!f.__webglInitialized||f.createUniqueBuffers){f.__webglInitialized=!0;var g=1;// "f" and "i"
"v2"===f.type?g=2:"v3"===f.type?g=3:"v4"===f.type?g=4:"c"===f.type&&(g=3),f.size=g,f.array=new Float32Array(c*g),f.buffer=Ka.createBuffer(),f.buffer.belongsToAttribute=e,f.needsUpdate=!0}a.__webglCustomAttributesList.push(f)}}}function f(a,b){var c=a.vertices.length;a.__vertexArray=new Float32Array(3*c),a.__colorArray=new Float32Array(3*c),a.__sortArray=[],a.__webglParticleCount=c,e(a,b)}function g(a,b){var c=a.vertices.length;a.__vertexArray=new Float32Array(3*c),a.__colorArray=new Float32Array(3*c),a.__lineDistanceArray=new Float32Array(1*c),a.__webglLineCount=c,e(a,b)}function h(a,b){var c=b.geometry,d=a.faces3,e=3*d.length,f=1*d.length,g=3*d.length,h=i(b,a),j=m(h),n=k(h),o=l(h);
// console.log( "uvType", uvType, "normalType", normalType, "vertexColorType", vertexColorType, object, geometryGroup, material );
a.__vertexArray=new Float32Array(3*e),n&&(a.__normalArray=new Float32Array(3*e)),c.hasTangents&&(a.__tangentArray=new Float32Array(4*e)),o&&(a.__colorArray=new Float32Array(3*e)),j&&(c.faceVertexUvs.length>0&&(a.__uvArray=new Float32Array(2*e)),c.faceVertexUvs.length>1&&(a.__uv2Array=new Float32Array(2*e))),b.geometry.skinWeights.length&&b.geometry.skinIndices.length&&(a.__skinIndexArray=new Float32Array(4*e),a.__skinWeightArray=new Float32Array(4*e));var p=null!==Qa&&f>21845?Uint32Array:Uint16Array;// 65535 / 3
a.__typeArray=p,a.__faceArray=new p(3*f),a.__lineArray=new p(2*g);var q,r;if(a.numMorphTargets)for(a.__morphTargetsArrays=[],q=0,r=a.numMorphTargets;r>q;q++)a.__morphTargetsArrays.push(new Float32Array(3*e));if(a.numMorphNormals)for(a.__morphNormalsArrays=[],q=0,r=a.numMorphNormals;r>q;q++)a.__morphNormalsArrays.push(new Float32Array(3*e));
// custom attributes
if(a.__webglFaceCount=3*f,a.__webglLineCount=2*g,h.attributes){void 0===a.__webglCustomAttributesList&&(a.__webglCustomAttributesList=[]);for(var s in h.attributes){
// Do a shallow copy of the attribute object so different geometryGroup chunks use different
// attribute buffers which are correctly indexed in the setMeshBuffers function
var t=h.attributes[s],u={};for(var v in t)u[v]=t[v];if(!u.__webglInitialized||u.createUniqueBuffers){u.__webglInitialized=!0;var w=1;// "f" and "i"
"v2"===u.type?w=2:"v3"===u.type?w=3:"v4"===u.type?w=4:"c"===u.type&&(w=3),u.size=w,u.array=new Float32Array(e*w),u.buffer=Ka.createBuffer(),u.buffer.belongsToAttribute=s,t.needsUpdate=!0,u.__original=t}a.__webglCustomAttributesList.push(u)}}a.__inittedArrays=!0}function i(a,b){return a.material instanceof THREE.MeshFaceMaterial?a.material.materials[b.materialIndex]:a.material}function j(a){return a&&void 0!==a.shading&&a.shading===THREE.SmoothShading}function k(a){
// only MeshBasicMaterial and MeshDepthMaterial don't need normals
// only MeshBasicMaterial and MeshDepthMaterial don't need normals
return a instanceof THREE.MeshBasicMaterial&&!a.envMap||a instanceof THREE.MeshDepthMaterial?!1:j(a)?THREE.SmoothShading:THREE.FlatShading}function l(a){return a.vertexColors?a.vertexColors:!1}function m(a){
// material must use some texture to require uvs
// material must use some texture to require uvs
return a.map||a.lightMap||a.bumpMap||a.normalMap||a.specularMap||a.alphaMap||a instanceof THREE.ShaderMaterial?!0:!1}
//
function n(a){for(var b in a.attributes){var c="index"===b?Ka.ELEMENT_ARRAY_BUFFER:Ka.ARRAY_BUFFER,d=a.attributes[b];d.buffer=Ka.createBuffer(),Ka.bindBuffer(c,d.buffer),Ka.bufferData(c,d.array,Ka.STATIC_DRAW)}}
// Buffer setting
function o(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p=a.vertices,q=p.length,r=a.colors,s=r.length,t=a.__vertexArray,u=a.__colorArray,v=a.__sortArray,w=a.verticesNeedUpdate,x=(a.elementsNeedUpdate,a.colorsNeedUpdate),y=a.__webglCustomAttributesList;if(c.sortParticles){for(ub.copy(tb),ub.multiply(c.matrixWorld),d=0;q>d;d++)f=p[d],vb.copy(f),vb.applyProjection(ub),v[d]=[vb.z,d];for(v.sort(z),d=0;q>d;d++)f=p[v[d][1]],g=3*d,t[g]=f.x,t[g+1]=f.y,t[g+2]=f.z;for(e=0;s>e;e++)g=3*e,i=r[v[e][1]],u[g]=i.r,u[g+1]=i.g,u[g+2]=i.b;if(y)for(j=0,k=y.length;k>j;j++)if(o=y[j],void 0===o.boundTo||"vertices"===o.boundTo)if(g=0,m=o.value.length,1===o.size)for(l=0;m>l;l++)h=v[l][1],o.array[l]=o.value[h];else if(2===o.size)for(l=0;m>l;l++)h=v[l][1],n=o.value[h],o.array[g]=n.x,o.array[g+1]=n.y,g+=2;else if(3===o.size)if("c"===o.type)for(l=0;m>l;l++)h=v[l][1],n=o.value[h],o.array[g]=n.r,o.array[g+1]=n.g,o.array[g+2]=n.b,g+=3;else for(l=0;m>l;l++)h=v[l][1],n=o.value[h],o.array[g]=n.x,o.array[g+1]=n.y,o.array[g+2]=n.z,g+=3;else if(4===o.size)for(l=0;m>l;l++)h=v[l][1],n=o.value[h],o.array[g]=n.x,o.array[g+1]=n.y,o.array[g+2]=n.z,o.array[g+3]=n.w,g+=4}else{if(w)for(d=0;q>d;d++)f=p[d],g=3*d,t[g]=f.x,t[g+1]=f.y,t[g+2]=f.z;if(x)for(e=0;s>e;e++)i=r[e],g=3*e,u[g]=i.r,u[g+1]=i.g,u[g+2]=i.b;if(y)for(j=0,k=y.length;k>j;j++)if(o=y[j],o.needsUpdate&&(void 0===o.boundTo||"vertices"===o.boundTo))if(m=o.value.length,g=0,1===o.size)for(l=0;m>l;l++)o.array[l]=o.value[l];else if(2===o.size)for(l=0;m>l;l++)n=o.value[l],o.array[g]=n.x,o.array[g+1]=n.y,g+=2;else if(3===o.size)if("c"===o.type)for(l=0;m>l;l++)n=o.value[l],o.array[g]=n.r,o.array[g+1]=n.g,o.array[g+2]=n.b,g+=3;else for(l=0;m>l;l++)n=o.value[l],o.array[g]=n.x,o.array[g+1]=n.y,o.array[g+2]=n.z,g+=3;else if(4===o.size)for(l=0;m>l;l++)n=o.value[l],o.array[g]=n.x,o.array[g+1]=n.y,o.array[g+2]=n.z,o.array[g+3]=n.w,g+=4}if((w||c.sortParticles)&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglVertexBuffer),Ka.bufferData(Ka.ARRAY_BUFFER,t,b)),(x||c.sortParticles)&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglColorBuffer),Ka.bufferData(Ka.ARRAY_BUFFER,u,b)),y)for(j=0,k=y.length;k>j;j++)o=y[j],(o.needsUpdate||c.sortParticles)&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,o.buffer),Ka.bufferData(Ka.ARRAY_BUFFER,o.array,b))}function p(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o=a.vertices,p=a.colors,q=a.lineDistances,r=o.length,s=p.length,t=q.length,u=a.__vertexArray,v=a.__colorArray,w=a.__lineDistanceArray,x=a.verticesNeedUpdate,y=a.colorsNeedUpdate,z=a.lineDistancesNeedUpdate,A=a.__webglCustomAttributesList;if(x){for(c=0;r>c;c++)f=o[c],g=3*c,u[g]=f.x,u[g+1]=f.y,u[g+2]=f.z;Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglVertexBuffer),Ka.bufferData(Ka.ARRAY_BUFFER,u,b)}if(y){for(d=0;s>d;d++)h=p[d],g=3*d,v[g]=h.r,v[g+1]=h.g,v[g+2]=h.b;Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglColorBuffer),Ka.bufferData(Ka.ARRAY_BUFFER,v,b)}if(z){for(e=0;t>e;e++)w[e]=q[e];Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglLineDistanceBuffer),Ka.bufferData(Ka.ARRAY_BUFFER,w,b)}if(A)for(i=0,j=A.length;j>i;i++)if(n=A[i],n.needsUpdate&&(void 0===n.boundTo||"vertices"===n.boundTo)){if(g=0,l=n.value.length,1===n.size)for(k=0;l>k;k++)n.array[k]=n.value[k];else if(2===n.size)for(k=0;l>k;k++)m=n.value[k],n.array[g]=m.x,n.array[g+1]=m.y,g+=2;else if(3===n.size)if("c"===n.type)for(k=0;l>k;k++)m=n.value[k],n.array[g]=m.r,n.array[g+1]=m.g,n.array[g+2]=m.b,g+=3;else for(k=0;l>k;k++)m=n.value[k],n.array[g]=m.x,n.array[g+1]=m.y,n.array[g+2]=m.z,g+=3;else if(4===n.size)for(k=0;l>k;k++)m=n.value[k],n.array[g]=m.x,n.array[g+1]=m.y,n.array[g+2]=m.z,n.array[g+3]=m.w,g+=4;Ka.bindBuffer(Ka.ARRAY_BUFFER,n.buffer),Ka.bufferData(Ka.ARRAY_BUFFER,n.array,b)}}function q(a,b,c,d,e){if(a.__inittedArrays){var f,g,h,i,j,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y=k(e),Z=l(e),$=m(e),_=Y===THREE.SmoothShading,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=a.__vertexArray,oa=a.__uvArray,pa=a.__uv2Array,qa=a.__normalArray,ra=a.__tangentArray,sa=a.__colorArray,ta=a.__skinIndexArray,ua=a.__skinWeightArray,va=a.__morphTargetsArrays,wa=a.__morphNormalsArrays,xa=a.__webglCustomAttributesList,ya=a.__faceArray,za=a.__lineArray,Aa=b.geometry,// this is shared for all chunks
Ba=Aa.verticesNeedUpdate,Ca=Aa.elementsNeedUpdate,Da=Aa.uvsNeedUpdate,Ea=Aa.normalsNeedUpdate,Fa=Aa.tangentsNeedUpdate,Ga=Aa.colorsNeedUpdate,Ha=Aa.morphTargetsNeedUpdate,Ia=Aa.vertices,Ja=a.faces3,La=Aa.faces,Ma=Aa.faceVertexUvs[0],Na=Aa.faceVertexUvs[1],Oa=(Aa.colors,Aa.skinIndices),Pa=Aa.skinWeights,Qa=Aa.morphTargets,Ra=Aa.morphNormals;if(Ba){for(f=0,g=Ja.length;g>f;f++)i=La[Ja[f]],t=Ia[i.a],u=Ia[i.b],v=Ia[i.c],na[ba]=t.x,na[ba+1]=t.y,na[ba+2]=t.z,na[ba+3]=u.x,na[ba+4]=u.y,na[ba+5]=u.z,na[ba+6]=v.x,na[ba+7]=v.y,na[ba+8]=v.z,ba+=9;Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglVertexBuffer),Ka.bufferData(Ka.ARRAY_BUFFER,na,c)}if(Ha)for(Q=0,R=Qa.length;R>Q;Q++){for(ka=0,f=0,g=Ja.length;g>f;f++)U=Ja[f],i=La[U],
// morph positions
t=Qa[Q].vertices[i.a],u=Qa[Q].vertices[i.b],v=Qa[Q].vertices[i.c],S=va[Q],S[ka]=t.x,S[ka+1]=t.y,S[ka+2]=t.z,S[ka+3]=u.x,S[ka+4]=u.y,S[ka+5]=u.z,S[ka+6]=v.x,S[ka+7]=v.y,S[ka+8]=v.z,
// morph normals
e.morphNormals&&(_?(V=Ra[Q].vertexNormals[U],z=V.a,A=V.b,B=V.c):(z=Ra[Q].faceNormals[U],A=z,B=z),T=wa[Q],T[ka]=z.x,T[ka+1]=z.y,T[ka+2]=z.z,T[ka+3]=A.x,T[ka+4]=A.y,T[ka+5]=A.z,T[ka+6]=B.x,T[ka+7]=B.y,T[ka+8]=B.z),
//
ka+=9;Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglMorphTargetsBuffers[Q]),Ka.bufferData(Ka.ARRAY_BUFFER,va[Q],c),e.morphNormals&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglMorphNormalsBuffers[Q]),Ka.bufferData(Ka.ARRAY_BUFFER,wa[Q],c))}if(Pa.length){for(f=0,g=Ja.length;g>f;f++)i=La[Ja[f]],
// weights
F=Pa[i.a],G=Pa[i.b],H=Pa[i.c],ua[ja]=F.x,ua[ja+1]=F.y,ua[ja+2]=F.z,ua[ja+3]=F.w,ua[ja+4]=G.x,ua[ja+5]=G.y,ua[ja+6]=G.z,ua[ja+7]=G.w,ua[ja+8]=H.x,ua[ja+9]=H.y,ua[ja+10]=H.z,ua[ja+11]=H.w,
// indices
I=Oa[i.a],J=Oa[i.b],K=Oa[i.c],ta[ja]=I.x,ta[ja+1]=I.y,ta[ja+2]=I.z,ta[ja+3]=I.w,ta[ja+4]=J.x,ta[ja+5]=J.y,ta[ja+6]=J.z,ta[ja+7]=J.w,ta[ja+8]=K.x,ta[ja+9]=K.y,ta[ja+10]=K.z,ta[ja+11]=K.w,ja+=12;ja>0&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglSkinIndicesBuffer),Ka.bufferData(Ka.ARRAY_BUFFER,ta,c),Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglSkinWeightsBuffer),Ka.bufferData(Ka.ARRAY_BUFFER,ua,c))}if(Ga&&Z){for(f=0,g=Ja.length;g>f;f++)i=La[Ja[f]],o=i.vertexColors,p=i.color,3===o.length&&Z===THREE.VertexColors?(C=o[0],D=o[1],E=o[2]):(C=p,D=p,E=p),sa[ia]=C.r,sa[ia+1]=C.g,sa[ia+2]=C.b,sa[ia+3]=D.r,sa[ia+4]=D.g,sa[ia+5]=D.b,sa[ia+6]=E.r,sa[ia+7]=E.g,sa[ia+8]=E.b,ia+=9;ia>0&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglColorBuffer),Ka.bufferData(Ka.ARRAY_BUFFER,sa,c))}if(Fa&&Aa.hasTangents){for(f=0,g=Ja.length;g>f;f++)i=La[Ja[f]],q=i.vertexTangents,w=q[0],x=q[1],y=q[2],ra[ga]=w.x,ra[ga+1]=w.y,ra[ga+2]=w.z,ra[ga+3]=w.w,ra[ga+4]=x.x,ra[ga+5]=x.y,ra[ga+6]=x.z,ra[ga+7]=x.w,ra[ga+8]=y.x,ra[ga+9]=y.y,ra[ga+10]=y.z,ra[ga+11]=y.w,ga+=12;Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglTangentBuffer),Ka.bufferData(Ka.ARRAY_BUFFER,ra,c)}if(Ea&&Y){for(f=0,g=Ja.length;g>f;f++)if(i=La[Ja[f]],j=i.vertexNormals,n=i.normal,3===j.length&&_)for(L=0;3>L;L++)N=j[L],qa[fa]=N.x,qa[fa+1]=N.y,qa[fa+2]=N.z,fa+=3;else for(L=0;3>L;L++)qa[fa]=n.x,qa[fa+1]=n.y,qa[fa+2]=n.z,fa+=3;Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglNormalBuffer),Ka.bufferData(Ka.ARRAY_BUFFER,qa,c)}if(Da&&Ma&&$){for(f=0,g=Ja.length;g>f;f++)if(h=Ja[f],r=Ma[h],void 0!==r)for(L=0;3>L;L++)O=r[L],oa[ca]=O.x,oa[ca+1]=O.y,ca+=2;ca>0&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglUVBuffer),Ka.bufferData(Ka.ARRAY_BUFFER,oa,c))}if(Da&&Na&&$){for(f=0,g=Ja.length;g>f;f++)if(h=Ja[f],s=Na[h],void 0!==s)for(L=0;3>L;L++)P=s[L],pa[da]=P.x,pa[da+1]=P.y,da+=2;da>0&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglUV2Buffer),Ka.bufferData(Ka.ARRAY_BUFFER,pa,c))}if(Ca){for(f=0,g=Ja.length;g>f;f++)ya[ea]=aa,ya[ea+1]=aa+1,ya[ea+2]=aa+2,ea+=3,za[ha]=aa,za[ha+1]=aa+1,za[ha+2]=aa,za[ha+3]=aa+2,za[ha+4]=aa+1,za[ha+5]=aa+2,ha+=6,aa+=3;Ka.bindBuffer(Ka.ELEMENT_ARRAY_BUFFER,a.__webglFaceBuffer),Ka.bufferData(Ka.ELEMENT_ARRAY_BUFFER,ya,c),Ka.bindBuffer(Ka.ELEMENT_ARRAY_BUFFER,a.__webglLineBuffer),Ka.bufferData(Ka.ELEMENT_ARRAY_BUFFER,za,c)}if(xa)for(L=0,M=xa.length;M>L;L++)if(X=xa[L],X.__original.needsUpdate){if(la=0,ma=0,1===X.size){if(void 0===X.boundTo||"vertices"===X.boundTo)for(f=0,g=Ja.length;g>f;f++)i=La[Ja[f]],X.array[la]=X.value[i.a],X.array[la+1]=X.value[i.b],X.array[la+2]=X.value[i.c],la+=3;else if("faces"===X.boundTo)for(f=0,g=Ja.length;g>f;f++)W=X.value[Ja[f]],X.array[la]=W,X.array[la+1]=W,X.array[la+2]=W,la+=3}else if(2===X.size){if(void 0===X.boundTo||"vertices"===X.boundTo)for(f=0,g=Ja.length;g>f;f++)i=La[Ja[f]],t=X.value[i.a],u=X.value[i.b],v=X.value[i.c],X.array[la]=t.x,X.array[la+1]=t.y,X.array[la+2]=u.x,X.array[la+3]=u.y,X.array[la+4]=v.x,X.array[la+5]=v.y,la+=6;else if("faces"===X.boundTo)for(f=0,g=Ja.length;g>f;f++)W=X.value[Ja[f]],t=W,u=W,v=W,X.array[la]=t.x,X.array[la+1]=t.y,X.array[la+2]=u.x,X.array[la+3]=u.y,X.array[la+4]=v.x,X.array[la+5]=v.y,la+=6}else if(3===X.size){var Sa;if(Sa="c"===X.type?["r","g","b"]:["x","y","z"],void 0===X.boundTo||"vertices"===X.boundTo)for(f=0,g=Ja.length;g>f;f++)i=La[Ja[f]],t=X.value[i.a],u=X.value[i.b],v=X.value[i.c],X.array[la]=t[Sa[0]],X.array[la+1]=t[Sa[1]],X.array[la+2]=t[Sa[2]],X.array[la+3]=u[Sa[0]],X.array[la+4]=u[Sa[1]],X.array[la+5]=u[Sa[2]],X.array[la+6]=v[Sa[0]],X.array[la+7]=v[Sa[1]],X.array[la+8]=v[Sa[2]],la+=9;else if("faces"===X.boundTo)for(f=0,g=Ja.length;g>f;f++)W=X.value[Ja[f]],t=W,u=W,v=W,X.array[la]=t[Sa[0]],X.array[la+1]=t[Sa[1]],X.array[la+2]=t[Sa[2]],X.array[la+3]=u[Sa[0]],X.array[la+4]=u[Sa[1]],X.array[la+5]=u[Sa[2]],X.array[la+6]=v[Sa[0]],X.array[la+7]=v[Sa[1]],X.array[la+8]=v[Sa[2]],la+=9;else if("faceVertices"===X.boundTo)for(f=0,g=Ja.length;g>f;f++)W=X.value[Ja[f]],t=W[0],u=W[1],v=W[2],X.array[la]=t[Sa[0]],X.array[la+1]=t[Sa[1]],X.array[la+2]=t[Sa[2]],X.array[la+3]=u[Sa[0]],X.array[la+4]=u[Sa[1]],X.array[la+5]=u[Sa[2]],X.array[la+6]=v[Sa[0]],X.array[la+7]=v[Sa[1]],X.array[la+8]=v[Sa[2]],la+=9}else if(4===X.size)if(void 0===X.boundTo||"vertices"===X.boundTo)for(f=0,g=Ja.length;g>f;f++)i=La[Ja[f]],t=X.value[i.a],u=X.value[i.b],v=X.value[i.c],X.array[la]=t.x,X.array[la+1]=t.y,X.array[la+2]=t.z,X.array[la+3]=t.w,X.array[la+4]=u.x,X.array[la+5]=u.y,X.array[la+6]=u.z,X.array[la+7]=u.w,X.array[la+8]=v.x,X.array[la+9]=v.y,X.array[la+10]=v.z,X.array[la+11]=v.w,la+=12;else if("faces"===X.boundTo)for(f=0,g=Ja.length;g>f;f++)W=X.value[Ja[f]],t=W,u=W,v=W,X.array[la]=t.x,X.array[la+1]=t.y,X.array[la+2]=t.z,X.array[la+3]=t.w,X.array[la+4]=u.x,X.array[la+5]=u.y,X.array[la+6]=u.z,X.array[la+7]=u.w,X.array[la+8]=v.x,X.array[la+9]=v.y,X.array[la+10]=v.z,X.array[la+11]=v.w,la+=12;else if("faceVertices"===X.boundTo)for(f=0,g=Ja.length;g>f;f++)W=X.value[Ja[f]],t=W[0],u=W[1],v=W[2],X.array[la]=t.x,X.array[la+1]=t.y,X.array[la+2]=t.z,X.array[la+3]=t.w,X.array[la+4]=u.x,X.array[la+5]=u.y,X.array[la+6]=u.z,X.array[la+7]=u.w,X.array[la+8]=v.x,X.array[la+9]=v.y,X.array[la+10]=v.z,X.array[la+11]=v.w,la+=12;Ka.bindBuffer(Ka.ARRAY_BUFFER,X.buffer),Ka.bufferData(Ka.ARRAY_BUFFER,X.array,c)}d&&(delete a.__inittedArrays,delete a.__colorArray,delete a.__normalArray,delete a.__tangentArray,delete a.__uvArray,delete a.__uv2Array,delete a.__faceArray,delete a.__vertexArray,delete a.__lineArray,delete a.__skinIndexArray,delete a.__skinWeightArray)}}function r(a,b){var c,d,e=a.attributes;for(c in e)d=e[c],d.needsUpdate&&("index"===c?(Ka.bindBuffer(Ka.ELEMENT_ARRAY_BUFFER,d.buffer),Ka.bufferData(Ka.ELEMENT_ARRAY_BUFFER,d.array,b)):(Ka.bindBuffer(Ka.ARRAY_BUFFER,d.buffer),Ka.bufferData(Ka.ARRAY_BUFFER,d.array,b)),d.needsUpdate=!1)}function s(a,b,c,d){for(var e=Object.keys(b),f=0,g=e.length;g>f;f++){var h=e[f],i=b[h],j=c[h];if(i>=0)if(j){var k=j.itemSize;Ka.bindBuffer(Ka.ARRAY_BUFFER,j.buffer),u(i),Ka.vertexAttribPointer(i,k,Ka.FLOAT,!1,0,d*k*4)}else a.defaultAttributeValues&&(2===a.defaultAttributeValues[h].length?Ka.vertexAttrib2fv(i,a.defaultAttributeValues[h]):3===a.defaultAttributeValues[h].length&&Ka.vertexAttrib3fv(i,a.defaultAttributeValues[h]))}v()}function t(){for(var a=0,b=qb.length;b>a;a++)qb[a]=0}function u(a){qb[a]=1,0===rb[a]&&(Ka.enableVertexAttribArray(a),rb[a]=1)}function v(){for(var a=0,b=rb.length;b>a;a++)rb[a]!==qb[a]&&(Ka.disableVertexAttribArray(a),rb[a]=0)}function w(a,b,c){
// set base
var d=a.program.attributes;if(-1!==c.morphTargetBase&&d.position>=0?(Ka.bindBuffer(Ka.ARRAY_BUFFER,b.__webglMorphTargetsBuffers[c.morphTargetBase]),u(d.position),Ka.vertexAttribPointer(d.position,3,Ka.FLOAT,!1,0,0)):d.position>=0&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,b.__webglVertexBuffer),u(d.position),Ka.vertexAttribPointer(d.position,3,Ka.FLOAT,!1,0,0)),c.morphTargetForcedOrder.length)for(
// set forced order
var e=0,f=c.morphTargetForcedOrder,g=c.morphTargetInfluences;e<a.numSupportedMorphTargets&&e<f.length;)d["morphTarget"+e]>=0&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,b.__webglMorphTargetsBuffers[f[e]]),u(d["morphTarget"+e]),Ka.vertexAttribPointer(d["morphTarget"+e],3,Ka.FLOAT,!1,0,0)),d["morphNormal"+e]>=0&&a.morphNormals&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,b.__webglMorphNormalsBuffers[f[e]]),u(d["morphNormal"+e]),Ka.vertexAttribPointer(d["morphNormal"+e],3,Ka.FLOAT,!1,0,0)),c.__webglMorphTargetInfluences[e]=g[f[e]],e++;else{
// find the most influencing
var h,i,j=[],g=c.morphTargetInfluences,k=g.length;for(i=0;k>i;i++)h=g[i],h>0&&j.push([h,i]);j.length>a.numSupportedMorphTargets?(j.sort(z),j.length=a.numSupportedMorphTargets):j.length>a.numSupportedMorphNormals?j.sort(z):0===j.length&&j.push([0,0]);for(var l,e=0;e<a.numSupportedMorphTargets;)j[e]?(l=j[e][1],d["morphTarget"+e]>=0&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,b.__webglMorphTargetsBuffers[l]),u(d["morphTarget"+e]),Ka.vertexAttribPointer(d["morphTarget"+e],3,Ka.FLOAT,!1,0,0)),d["morphNormal"+e]>=0&&a.morphNormals&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,b.__webglMorphNormalsBuffers[l]),u(d["morphNormal"+e]),Ka.vertexAttribPointer(d["morphNormal"+e],3,Ka.FLOAT,!1,0,0)),c.__webglMorphTargetInfluences[e]=g[l]):/*
					_gl.vertexAttribPointer( attributes[ "morphTarget" + m ], 3, _gl.FLOAT, false, 0, 0 );

					if ( material.morphNormals ) {

						_gl.vertexAttribPointer( attributes[ "morphNormal" + m ], 3, _gl.FLOAT, false, 0, 0 );

					}
					*/
c.__webglMorphTargetInfluences[e]=0,e++}
// load updated influences uniform
null!==a.program.uniforms.morphTargetInfluences&&Ka.uniform1fv(a.program.uniforms.morphTargetInfluences,c.__webglMorphTargetInfluences)}
// Sorting
function x(a,b){return a.z!==b.z?b.z-a.z:a.id-b.id}function y(a,b){return a.z!==b.z?a.z-b.z:a.id-b.id}function z(a,b){return b[0]-a[0]}function A(a,b,c){if(b.visible!==!1){var d=a.__webglObjects[b.id];if(d&&(b.frustumCulled===!1||sb.intersectsObject(b)===!0)){K(a,b);for(var e=0,f=d.length;f>e;e++){var g=d[e];F(g),g.render=!0,Sa.sortObjects===!0&&(null!==b.renderDepth?g.z=b.renderDepth:(vb.setFromMatrixPosition(b.matrixWorld),vb.applyProjection(tb),g.z=vb.z))}}for(var e=0,f=b.children.length;f>e;e++)A(a,b.children[e],c)}}function B(a,b,c){if(0!==a.length)for(var d=0,e=a.length;e>d;d++)
// reset state for plugin (to start from clean slate)
Ua=null,Ya=null,ab=-1,eb=-1,fb=-1,$a=-1,_a=-1,Xa=-1,Wa=-1,xb=!0,a[d].render(b,c,ob,pb),
// reset state after plugin (anything could have changed)
Ua=null,Ya=null,ab=-1,eb=-1,fb=-1,$a=-1,_a=-1,Xa=-1,Wa=-1,xb=!0}function C(a,b,c,d,e,f){for(var g,h,i,j,k=a.length-1;-1!==k;k--){if(g=a[k],h=g.object,i=g.buffer,ca(h,b),f)j=f;else{if(j=g.material,!j)continue;e&&Sa.setBlending(j.blending,j.blendEquation,j.blendSrc,j.blendDst),Sa.setDepthTest(j.depthTest),Sa.setDepthWrite(j.depthWrite),ha(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits)}Sa.setMaterialFaces(j),i instanceof THREE.BufferGeometry?Sa.renderBufferDirect(b,c,d,j,i,h):Sa.renderBuffer(b,c,d,j,i,h)}}function D(a,b,c,d,e,f,g){for(var h,i,j,k=0,l=a.length;l>k;k++)if(h=a[k],i=h.object,i.visible){if(g)j=g;else{if(j=h[b],!j)continue;f&&Sa.setBlending(j.blending,j.blendEquation,j.blendSrc,j.blendDst),Sa.setDepthTest(j.depthTest),Sa.setDepthWrite(j.depthWrite),ha(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits)}Sa.renderImmediateObject(c,d,e,j,i)}}function E(a){var b=a.object,c=b.material;c.transparent?(a.transparent=c,a.opaque=null):(a.opaque=c,a.transparent=null)}function F(a){var b=a.object,c=a.buffer,d=b.geometry,e=b.material;if(e instanceof THREE.MeshFaceMaterial){var f=d instanceof THREE.BufferGeometry?0:c.materialIndex;e=e.materials[f],e.transparent?(a.material=e,Ja.push(a)):(a.material=e,Ia.push(a))}else e&&(e.transparent?(a.material=e,Ja.push(a)):(a.material=e,Ia.push(a)))}
// Objects adding
function G(a,d){var e,h;if(void 0===a.__webglInit&&(a.__webglInit=!0,a._modelViewMatrix=new THREE.Matrix4,a._normalMatrix=new THREE.Matrix3),e=a.geometry,void 0===e||void 0===e.__webglInit&&(e.__webglInit=!0,e.addEventListener("dispose",Lb),e instanceof THREE.BufferGeometry?n(e):a instanceof THREE.Mesh?(void 0!==a.__webglActive&&N(a,d),H(d,a,e)):a instanceof THREE.Line?e.__webglVertexBuffer||(c(e),g(e,a),e.verticesNeedUpdate=!0,e.colorsNeedUpdate=!0,e.lineDistancesNeedUpdate=!0):a instanceof THREE.PointCloud&&(e.__webglVertexBuffer||(b(e),f(e,a),e.verticesNeedUpdate=!0,e.colorsNeedUpdate=!0))),void 0===a.__webglActive){if(a instanceof THREE.Mesh){if(e=a.geometry,e instanceof THREE.BufferGeometry)I(d.__webglObjects,e,a);else if(e instanceof THREE.Geometry)for(var i=0,j=e.geometryGroupsList.length;j>i;i++)h=e.geometryGroupsList[i],I(d.__webglObjects,h,a)}else a instanceof THREE.Line||a instanceof THREE.PointCloud?(e=a.geometry,I(d.__webglObjects,e,a)):(a instanceof THREE.ImmediateRenderObject||a.immediateRenderCallback)&&J(d.__webglObjectsImmediate,a);a.__webglActive=!0}}function H(a,b,c){var e,f,g=!1;f=b.material,(void 0===c.geometryGroups||c.groupsNeedUpdate)&&(delete a.__webglObjects[b.id],c.makeGroups(f instanceof THREE.MeshFaceMaterial,Qa?4294967296:65535),c.groupsNeedUpdate=!1);
// create separate VBOs per geometry chunk
for(var i=0,j=c.geometryGroupsList.length;j>i;i++)e=c.geometryGroupsList[i],
// initialise VBO on the first access
e.__webglVertexBuffer?g=!1:(d(e),h(e,b),c.verticesNeedUpdate=!0,c.morphTargetsNeedUpdate=!0,c.elementsNeedUpdate=!0,c.uvsNeedUpdate=!0,c.normalsNeedUpdate=!0,c.tangentsNeedUpdate=!0,c.colorsNeedUpdate=!0,g=!0),(g||void 0===b.__webglActive)&&I(a.__webglObjects,e,b);b.__webglActive=!0}function I(a,b,c){var d=c.id;a[d]=a[d]||[],a[d].push({id:d,buffer:b,object:c,material:null,z:0})}function J(a,b){a.push({id:null,object:b,opaque:null,transparent:null,z:0})}
// Objects updates
function K(a,b){var c,d,e,f=b.geometry;if(f instanceof THREE.BufferGeometry)r(f,Ka.DYNAMIC_DRAW);else if(b instanceof THREE.Mesh){
// check all geometry groups
(f.buffersNeedUpdate||f.groupsNeedUpdate)&&(f instanceof THREE.BufferGeometry?n(f):b instanceof THREE.Mesh&&H(a,b,f));for(var g=0,j=f.geometryGroupsList.length;j>g;g++)c=f.geometryGroupsList[g],e=i(b,c),(f.buffersNeedUpdate||f.groupsNeedUpdate)&&h(c,b),d=e.attributes&&L(e),(f.verticesNeedUpdate||f.morphTargetsNeedUpdate||f.elementsNeedUpdate||f.uvsNeedUpdate||f.normalsNeedUpdate||f.colorsNeedUpdate||f.tangentsNeedUpdate||d)&&q(c,b,Ka.DYNAMIC_DRAW,!f.dynamic,e);f.verticesNeedUpdate=!1,f.morphTargetsNeedUpdate=!1,f.elementsNeedUpdate=!1,f.uvsNeedUpdate=!1,f.normalsNeedUpdate=!1,f.colorsNeedUpdate=!1,f.tangentsNeedUpdate=!1,f.buffersNeedUpdate=!1,e.attributes&&M(e)}else b instanceof THREE.Line?(e=i(b,f),d=e.attributes&&L(e),(f.verticesNeedUpdate||f.colorsNeedUpdate||f.lineDistancesNeedUpdate||d)&&p(f,Ka.DYNAMIC_DRAW),f.verticesNeedUpdate=!1,f.colorsNeedUpdate=!1,f.lineDistancesNeedUpdate=!1,e.attributes&&M(e)):b instanceof THREE.PointCloud&&(e=i(b,f),d=e.attributes&&L(e),(f.verticesNeedUpdate||f.colorsNeedUpdate||b.sortParticles||d)&&o(f,Ka.DYNAMIC_DRAW,b),f.verticesNeedUpdate=!1,f.colorsNeedUpdate=!1,e.attributes&&M(e))}
// Objects updates - custom attributes check
function L(a){for(var b in a.attributes)if(a.attributes[b].needsUpdate)return!0;return!1}function M(a){for(var b in a.attributes)a.attributes[b].needsUpdate=!1}
// Objects removal
function N(a,b){a instanceof THREE.Mesh||a instanceof THREE.PointCloud||a instanceof THREE.Line?O(b.__webglObjects,a):(a instanceof THREE.ImmediateRenderObject||a.immediateRenderCallback)&&P(b.__webglObjectsImmediate,a),delete a.__webglActive}function O(a,b){delete a[b.id]}function P(a,b){for(var c=a.length-1;c>=0;c--)a[c].object===b&&a.splice(c,1)}function Q(a,b,c,d,e){Za=0,d.needsUpdate&&(d.program&&Tb(d),Sa.initMaterial(d,b,c,e),d.needsUpdate=!1),d.morphTargets&&(e.__webglMorphTargetInfluences||(e.__webglMorphTargetInfluences=new Float32Array(Sa.maxMorphTargets)));var f=!1,g=!1,h=!1,i=d.program,j=i.uniforms,k=d.__webglShader.uniforms;
// skinning uniforms must be set even if material didn't change
// auto-setting of texture unit for bone texture must go before other textures
// not sure why, but otherwise weird things happen
if(i.id!==Ua&&(Ka.useProgram(i.program),Ua=i.id,f=!0,g=!0,h=!0),d.id!==Wa&&(-1===Wa&&(h=!0),Wa=d.id,g=!0),(f||a!==Ya)&&(Ka.uniformMatrix4fv(j.projectionMatrix,!1,a.projectionMatrix.elements),Fa&&Ka.uniform1f(j.logDepthBufFC,2/(Math.log(a.far+1)/Math.LN2)),a!==Ya&&(Ya=a),
// load material specific uniforms
// (shader material also gets them for the sake of genericity)
(d instanceof THREE.ShaderMaterial||d instanceof THREE.MeshPhongMaterial||d.envMap)&&null!==j.cameraPosition&&(vb.setFromMatrixPosition(a.matrixWorld),Ka.uniform3f(j.cameraPosition,vb.x,vb.y,vb.z)),(d instanceof THREE.MeshPhongMaterial||d instanceof THREE.MeshLambertMaterial||d instanceof THREE.ShaderMaterial||d.skinning)&&null!==j.viewMatrix&&Ka.uniformMatrix4fv(j.viewMatrix,!1,a.matrixWorldInverse.elements)),d.skinning)if(e.bindMatrix&&null!==j.bindMatrix&&Ka.uniformMatrix4fv(j.bindMatrix,!1,e.bindMatrix.elements),e.bindMatrixInverse&&null!==j.bindMatrixInverse&&Ka.uniformMatrix4fv(j.bindMatrixInverse,!1,e.bindMatrixInverse.elements),Eb&&e.skeleton&&e.skeleton.useVertexTexture){if(null!==j.boneTexture){var l=aa();Ka.uniform1i(j.boneTexture,l),Sa.setTexture(e.skeleton.boneTexture,l)}null!==j.boneTextureWidth&&Ka.uniform1i(j.boneTextureWidth,e.skeleton.boneTextureWidth),null!==j.boneTextureHeight&&Ka.uniform1i(j.boneTextureHeight,e.skeleton.boneTextureHeight)}else e.skeleton&&e.skeleton.boneMatrices&&null!==j.boneGlobalMatrices&&Ka.uniformMatrix4fv(j.boneGlobalMatrices,!1,e.skeleton.boneMatrices);
// refresh uniforms common to several materials
// refresh single material specific uniforms
// load common uniforms
return g&&(c&&d.fog&&V(k,c),(d instanceof THREE.MeshPhongMaterial||d instanceof THREE.MeshLambertMaterial||d.lights)&&(xb&&(h=!0,fa(b),xb=!1),h?(Y(k,yb),Z(k,!0)):Z(k,!1)),(d instanceof THREE.MeshBasicMaterial||d instanceof THREE.MeshLambertMaterial||d instanceof THREE.MeshPhongMaterial)&&R(k,d),d instanceof THREE.LineBasicMaterial?S(k,d):d instanceof THREE.LineDashedMaterial?(S(k,d),T(k,d)):d instanceof THREE.PointCloudMaterial?U(k,d):d instanceof THREE.MeshPhongMaterial?W(k,d):d instanceof THREE.MeshLambertMaterial?X(k,d):d instanceof THREE.MeshDepthMaterial?(k.mNear.value=a.near,k.mFar.value=a.far,k.opacity.value=d.opacity):d instanceof THREE.MeshNormalMaterial&&(k.opacity.value=d.opacity),e.receiveShadow&&!d._shadowPass&&$(k,b),ba(d.uniformsList)),_(j,e),null!==j.modelMatrix&&Ka.uniformMatrix4fv(j.modelMatrix,!1,e.matrixWorld.elements),i}
// Uniforms (refresh uniforms objects)
function R(a,b){a.opacity.value=b.opacity,Sa.gammaInput?a.diffuse.value.copyGammaToLinear(b.color):a.diffuse.value=b.color,a.map.value=b.map,a.lightMap.value=b.lightMap,a.specularMap.value=b.specularMap,a.alphaMap.value=b.alphaMap,b.bumpMap&&(a.bumpMap.value=b.bumpMap,a.bumpScale.value=b.bumpScale),b.normalMap&&(a.normalMap.value=b.normalMap,a.normalScale.value.copy(b.normalScale));
// uv repeat and offset setting priorities
//  1. color map
//  2. specular map
//  3. normal map
//  4. bump map
//  5. alpha map
var c;if(b.map?c=b.map:b.specularMap?c=b.specularMap:b.normalMap?c=b.normalMap:b.bumpMap?c=b.bumpMap:b.alphaMap&&(c=b.alphaMap),void 0!==c){var d=c.offset,e=c.repeat;a.offsetRepeat.value.set(d.x,d.y,e.x,e.y)}a.envMap.value=b.envMap,a.flipEnvMap.value=b.envMap instanceof THREE.WebGLRenderTargetCube?1:-1,Sa.gammaInput?
//uniforms.reflectivity.value = material.reflectivity * material.reflectivity;
a.reflectivity.value=b.reflectivity:a.reflectivity.value=b.reflectivity,a.refractionRatio.value=b.refractionRatio,a.combine.value=b.combine,a.useRefract.value=b.envMap&&b.envMap.mapping instanceof THREE.CubeRefractionMapping}function S(a,b){a.diffuse.value=b.color,a.opacity.value=b.opacity}function T(a,b){a.dashSize.value=b.dashSize,a.totalSize.value=b.dashSize+b.gapSize,a.scale.value=b.scale}function U(a,b){a.psColor.value=b.color,a.opacity.value=b.opacity,a.size.value=b.size,a.scale.value=wa.height/2,// TODO: Cache this.
a.map.value=b.map}function V(a,b){a.fogColor.value=b.color,b instanceof THREE.Fog?(a.fogNear.value=b.near,a.fogFar.value=b.far):b instanceof THREE.FogExp2&&(a.fogDensity.value=b.density)}function W(a,b){a.shininess.value=b.shininess,Sa.gammaInput?(a.ambient.value.copyGammaToLinear(b.ambient),a.emissive.value.copyGammaToLinear(b.emissive),a.specular.value.copyGammaToLinear(b.specular)):(a.ambient.value=b.ambient,a.emissive.value=b.emissive,a.specular.value=b.specular),b.wrapAround&&a.wrapRGB.value.copy(b.wrapRGB)}function X(a,b){Sa.gammaInput?(a.ambient.value.copyGammaToLinear(b.ambient),a.emissive.value.copyGammaToLinear(b.emissive)):(a.ambient.value=b.ambient,a.emissive.value=b.emissive),b.wrapAround&&a.wrapRGB.value.copy(b.wrapRGB)}function Y(a,b){a.ambientLightColor.value=b.ambient,a.directionalLightColor.value=b.directional.colors,a.directionalLightDirection.value=b.directional.positions,a.pointLightColor.value=b.point.colors,a.pointLightPosition.value=b.point.positions,a.pointLightDistance.value=b.point.distances,a.spotLightColor.value=b.spot.colors,a.spotLightPosition.value=b.spot.positions,a.spotLightDistance.value=b.spot.distances,a.spotLightDirection.value=b.spot.directions,a.spotLightAngleCos.value=b.spot.anglesCos,a.spotLightExponent.value=b.spot.exponents,a.hemisphereLightSkyColor.value=b.hemi.skyColors,a.hemisphereLightGroundColor.value=b.hemi.groundColors,a.hemisphereLightDirection.value=b.hemi.positions}
// If uniforms are marked as clean, they don't need to be loaded to the GPU.
function Z(a,b){a.ambientLightColor.needsUpdate=b,a.directionalLightColor.needsUpdate=b,a.directionalLightDirection.needsUpdate=b,a.pointLightColor.needsUpdate=b,a.pointLightPosition.needsUpdate=b,a.pointLightDistance.needsUpdate=b,a.spotLightColor.needsUpdate=b,a.spotLightPosition.needsUpdate=b,a.spotLightDistance.needsUpdate=b,a.spotLightDirection.needsUpdate=b,a.spotLightAngleCos.needsUpdate=b,a.spotLightExponent.needsUpdate=b,a.hemisphereLightSkyColor.needsUpdate=b,a.hemisphereLightGroundColor.needsUpdate=b,a.hemisphereLightDirection.needsUpdate=b}function $(a,b){if(a.shadowMatrix)for(var c=0,d=0,e=b.length;e>d;d++){var f=b[d];f.castShadow&&(f instanceof THREE.SpotLight||f instanceof THREE.DirectionalLight&&!f.shadowCascade)&&(a.shadowMap.value[c]=f.shadowMap,a.shadowMapSize.value[c]=f.shadowMapSize,a.shadowMatrix.value[c]=f.shadowMatrix,a.shadowDarkness.value[c]=f.shadowDarkness,a.shadowBias.value[c]=f.shadowBias,c++)}}
// Uniforms (load to GPU)
function _(a,b){Ka.uniformMatrix4fv(a.modelViewMatrix,!1,b._modelViewMatrix.elements),a.normalMatrix&&Ka.uniformMatrix3fv(a.normalMatrix,!1,b._normalMatrix.elements)}function aa(){var a=Za;return a>=zb&&console.warn("WebGLRenderer: trying to use "+a+" texture units while this GPU supports only "+zb),Za+=1,a}function ba(a){for(var b,c,d,e=0,f=a.length;f>e;e++){var g=a[e][0];
// needsUpdate property is not added to all uniforms.
if(g.needsUpdate!==!1){var h=g.type,i=g.value,j=a[e][1];switch(h){case"1i":Ka.uniform1i(j,i);break;case"1f":Ka.uniform1f(j,i);break;case"2f":Ka.uniform2f(j,i[0],i[1]);break;case"3f":Ka.uniform3f(j,i[0],i[1],i[2]);break;case"4f":Ka.uniform4f(j,i[0],i[1],i[2],i[3]);break;case"1iv":Ka.uniform1iv(j,i);break;case"3iv":Ka.uniform3iv(j,i);break;case"1fv":Ka.uniform1fv(j,i);break;case"2fv":Ka.uniform2fv(j,i);break;case"3fv":Ka.uniform3fv(j,i);break;case"4fv":Ka.uniform4fv(j,i);break;case"Matrix3fv":Ka.uniformMatrix3fv(j,!1,i);break;case"Matrix4fv":Ka.uniformMatrix4fv(j,!1,i);break;
//
case"i":
// single integer
Ka.uniform1i(j,i);break;case"f":
// single float
Ka.uniform1f(j,i);break;case"v2":
// single THREE.Vector2
Ka.uniform2f(j,i.x,i.y);break;case"v3":
// single THREE.Vector3
Ka.uniform3f(j,i.x,i.y,i.z);break;case"v4":
// single THREE.Vector4
Ka.uniform4f(j,i.x,i.y,i.z,i.w);break;case"c":
// single THREE.Color
Ka.uniform3f(j,i.r,i.g,i.b);break;case"iv1":
// flat array of integers (JS or typed array)
Ka.uniform1iv(j,i);break;case"iv":
// flat array of integers with 3 x N size (JS or typed array)
Ka.uniform3iv(j,i);break;case"fv1":
// flat array of floats (JS or typed array)
Ka.uniform1fv(j,i);break;case"fv":
// flat array of floats with 3 x N size (JS or typed array)
Ka.uniform3fv(j,i);break;case"v2v":
// array of THREE.Vector2
void 0===g._array&&(g._array=new Float32Array(2*i.length));for(var k=0,l=i.length;l>k;k++)d=2*k,g._array[d]=i[k].x,g._array[d+1]=i[k].y;Ka.uniform2fv(j,g._array);break;case"v3v":
// array of THREE.Vector3
void 0===g._array&&(g._array=new Float32Array(3*i.length));for(var k=0,l=i.length;l>k;k++)d=3*k,g._array[d]=i[k].x,g._array[d+1]=i[k].y,g._array[d+2]=i[k].z;Ka.uniform3fv(j,g._array);break;case"v4v":
// array of THREE.Vector4
void 0===g._array&&(g._array=new Float32Array(4*i.length));for(var k=0,l=i.length;l>k;k++)d=4*k,g._array[d]=i[k].x,g._array[d+1]=i[k].y,g._array[d+2]=i[k].z,g._array[d+3]=i[k].w;Ka.uniform4fv(j,g._array);break;case"m3":
// single THREE.Matrix3
Ka.uniformMatrix3fv(j,!1,i.elements);break;case"m3v":
// array of THREE.Matrix3
void 0===g._array&&(g._array=new Float32Array(9*i.length));for(var k=0,l=i.length;l>k;k++)i[k].flattenToArrayOffset(g._array,9*k);Ka.uniformMatrix3fv(j,!1,g._array);break;case"m4":
// single THREE.Matrix4
Ka.uniformMatrix4fv(j,!1,i.elements);break;case"m4v":
// array of THREE.Matrix4
void 0===g._array&&(g._array=new Float32Array(16*i.length));for(var k=0,l=i.length;l>k;k++)i[k].flattenToArrayOffset(g._array,16*k);Ka.uniformMatrix4fv(j,!1,g._array);break;case"t":if(
// single THREE.Texture (2d or cube)
b=i,c=aa(),Ka.uniform1i(j,c),!b)continue;b instanceof THREE.CubeTexture||b.image instanceof Array&&6===b.image.length?// CompressedTexture can have Array in image :/
ka(b,c):b instanceof THREE.WebGLRenderTargetCube?la(b,c):Sa.setTexture(b,c);break;case"tv":
// array of THREE.Texture (2d)
void 0===g._array&&(g._array=[]);for(var k=0,l=g.value.length;l>k;k++)g._array[k]=aa();Ka.uniform1iv(j,g._array);for(var k=0,l=g.value.length;l>k;k++)b=g.value[k],c=g._array[k],b&&Sa.setTexture(b,c);break;default:console.warn("THREE.WebGLRenderer: Unknown uniform type: "+h)}}}}function ca(a,b){a._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,a.matrixWorld),a._normalMatrix.getNormalMatrix(a._modelViewMatrix)}
//
function da(a,b,c,d){a[b]=c.r*c.r*d,a[b+1]=c.g*c.g*d,a[b+2]=c.b*c.b*d}function ea(a,b,c,d){a[b]=c.r*d,a[b+1]=c.g*d,a[b+2]=c.b*d}function fa(a){var b,c,d,e,f,g,h,i,j,k=0,l=0,m=0,n=yb,o=n.directional.colors,p=n.directional.positions,q=n.point.colors,r=n.point.positions,s=n.point.distances,t=n.spot.colors,u=n.spot.positions,v=n.spot.distances,w=n.spot.directions,x=n.spot.anglesCos,y=n.spot.exponents,z=n.hemi.skyColors,A=n.hemi.groundColors,B=n.hemi.positions,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;for(b=0,c=a.length;c>b;b++)if(d=a[b],!d.onlyShadow)if(e=d.color,h=d.intensity,j=d.distance,d instanceof THREE.AmbientLight){if(!d.visible)continue;Sa.gammaInput?(k+=e.r*e.r,l+=e.g*e.g,m+=e.b*e.b):(k+=e.r,l+=e.g,m+=e.b)}else if(d instanceof THREE.DirectionalLight){if(G+=1,!d.visible)continue;wb.setFromMatrixPosition(d.matrixWorld),vb.setFromMatrixPosition(d.target.matrixWorld),wb.sub(vb),wb.normalize(),K=3*C,p[K]=wb.x,p[K+1]=wb.y,p[K+2]=wb.z,Sa.gammaInput?da(o,K,e,h*h):ea(o,K,e,h),C+=1}else if(d instanceof THREE.PointLight){if(H+=1,!d.visible)continue;L=3*D,Sa.gammaInput?da(q,L,e,h*h):ea(q,L,e,h),vb.setFromMatrixPosition(d.matrixWorld),r[L]=vb.x,r[L+1]=vb.y,r[L+2]=vb.z,s[D]=j,D+=1}else if(d instanceof THREE.SpotLight){if(I+=1,!d.visible)continue;M=3*E,Sa.gammaInput?da(t,M,e,h*h):ea(t,M,e,h),vb.setFromMatrixPosition(d.matrixWorld),u[M]=vb.x,u[M+1]=vb.y,u[M+2]=vb.z,v[E]=j,wb.copy(vb),vb.setFromMatrixPosition(d.target.matrixWorld),wb.sub(vb),wb.normalize(),w[M]=wb.x,w[M+1]=wb.y,w[M+2]=wb.z,x[E]=Math.cos(d.angle),y[E]=d.exponent,E+=1}else if(d instanceof THREE.HemisphereLight){if(J+=1,!d.visible)continue;wb.setFromMatrixPosition(d.matrixWorld),wb.normalize(),N=3*F,B[N]=wb.x,B[N+1]=wb.y,B[N+2]=wb.z,f=d.color,g=d.groundColor,Sa.gammaInput?(i=h*h,da(z,N,f,i),da(A,N,g,i)):(ea(z,N,f,h),ea(A,N,g,h)),F+=1}
// null eventual remains from removed lights
// (this is to avoid if in shader)
for(b=3*C,c=Math.max(o.length,3*G);c>b;b++)o[b]=0;for(b=3*D,c=Math.max(q.length,3*H);c>b;b++)q[b]=0;for(b=3*E,c=Math.max(t.length,3*I);c>b;b++)t[b]=0;for(b=3*F,c=Math.max(z.length,3*J);c>b;b++)z[b]=0;for(b=3*F,c=Math.max(A.length,3*J);c>b;b++)A[b]=0;n.directional.length=C,n.point.length=D,n.spot.length=E,n.hemi.length=F,n.ambient[0]=k,n.ambient[1]=l,n.ambient[2]=m}function ga(a){a!==jb&&(Ka.lineWidth(a),jb=a)}function ha(a,b,c){gb!==a&&(a?Ka.enable(Ka.POLYGON_OFFSET_FILL):Ka.disable(Ka.POLYGON_OFFSET_FILL),gb=a),!a||hb===b&&ib===c||(Ka.polygonOffset(b,c),hb=b,ib=c)}
// Textures
function ia(a,b,c){c?(Ka.texParameteri(a,Ka.TEXTURE_WRAP_S,qa(b.wrapS)),Ka.texParameteri(a,Ka.TEXTURE_WRAP_T,qa(b.wrapT)),Ka.texParameteri(a,Ka.TEXTURE_MAG_FILTER,qa(b.magFilter)),Ka.texParameteri(a,Ka.TEXTURE_MIN_FILTER,qa(b.minFilter))):(Ka.texParameteri(a,Ka.TEXTURE_WRAP_S,Ka.CLAMP_TO_EDGE),Ka.texParameteri(a,Ka.TEXTURE_WRAP_T,Ka.CLAMP_TO_EDGE),Ka.texParameteri(a,Ka.TEXTURE_MAG_FILTER,pa(b.magFilter)),Ka.texParameteri(a,Ka.TEXTURE_MIN_FILTER,pa(b.minFilter))),Oa&&b.type!==THREE.FloatType&&(b.anisotropy>1||b.__oldAnisotropy)&&(Ka.texParameterf(a,Oa.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,Cb)),b.__oldAnisotropy=b.anisotropy)}function ja(a,b){if(a.width<=b&&a.height<=b)return a;
// Warning: Scaling through the canvas will only work with images that use
// premultiplied alpha.
var c=Math.max(a.width,a.height),d=Math.floor(a.width*b/c),e=Math.floor(a.height*b/c),f=document.createElement("canvas");f.width=d,f.height=e;var g=f.getContext("2d");return g.drawImage(a,0,0,a.width,a.height,0,0,d,e),f}function ka(a,b){if(6===a.image.length)if(a.needsUpdate){a.image.__webglTextureCube||(a.addEventListener("dispose",Mb),a.image.__webglTextureCube=Ka.createTexture(),Sa.info.memory.textures++),Ka.activeTexture(Ka.TEXTURE0+b),Ka.bindTexture(Ka.TEXTURE_CUBE_MAP,a.image.__webglTextureCube),Ka.pixelStorei(Ka.UNPACK_FLIP_Y_WEBGL,a.flipY);for(var c=a instanceof THREE.CompressedTexture,d=[],e=0;6>e;e++)Sa.autoScaleCubemaps&&!c?d[e]=ja(a.image[e],Bb):d[e]=a.image[e];var f=d[0],g=THREE.Math.isPowerOfTwo(f.width)&&THREE.Math.isPowerOfTwo(f.height),h=qa(a.format),i=qa(a.type);ia(Ka.TEXTURE_CUBE_MAP,a,g);for(var e=0;6>e;e++)if(c)for(var j,k=d[e].mipmaps,l=0,m=k.length;m>l;l++)j=k[l],a.format!==THREE.RGBAFormat?Ka.compressedTexImage2D(Ka.TEXTURE_CUBE_MAP_POSITIVE_X+e,l,h,j.width,j.height,0,j.data):Ka.texImage2D(Ka.TEXTURE_CUBE_MAP_POSITIVE_X+e,l,h,j.width,j.height,0,h,i,j.data);else Ka.texImage2D(Ka.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,h,h,i,d[e]);a.generateMipmaps&&g&&Ka.generateMipmap(Ka.TEXTURE_CUBE_MAP),a.needsUpdate=!1,a.onUpdate&&a.onUpdate()}else Ka.activeTexture(Ka.TEXTURE0+b),Ka.bindTexture(Ka.TEXTURE_CUBE_MAP,a.image.__webglTextureCube)}function la(a,b){Ka.activeTexture(Ka.TEXTURE0+b),Ka.bindTexture(Ka.TEXTURE_CUBE_MAP,a.__webglTexture)}
// Render targets
function ma(a,b,c){Ka.bindFramebuffer(Ka.FRAMEBUFFER,a),Ka.framebufferTexture2D(Ka.FRAMEBUFFER,Ka.COLOR_ATTACHMENT0,c,b.__webglTexture,0)}function na(a,b){Ka.bindRenderbuffer(Ka.RENDERBUFFER,a),b.depthBuffer&&!b.stencilBuffer?(Ka.renderbufferStorage(Ka.RENDERBUFFER,Ka.DEPTH_COMPONENT16,b.width,b.height),Ka.framebufferRenderbuffer(Ka.FRAMEBUFFER,Ka.DEPTH_ATTACHMENT,Ka.RENDERBUFFER,a)):b.depthBuffer&&b.stencilBuffer?(Ka.renderbufferStorage(Ka.RENDERBUFFER,Ka.DEPTH_STENCIL,b.width,b.height),Ka.framebufferRenderbuffer(Ka.FRAMEBUFFER,Ka.DEPTH_STENCIL_ATTACHMENT,Ka.RENDERBUFFER,a)):Ka.renderbufferStorage(Ka.RENDERBUFFER,Ka.RGBA4,b.width,b.height)}function oa(a){a instanceof THREE.WebGLRenderTargetCube?(Ka.bindTexture(Ka.TEXTURE_CUBE_MAP,a.__webglTexture),Ka.generateMipmap(Ka.TEXTURE_CUBE_MAP),Ka.bindTexture(Ka.TEXTURE_CUBE_MAP,null)):(Ka.bindTexture(Ka.TEXTURE_2D,a.__webglTexture),Ka.generateMipmap(Ka.TEXTURE_2D),Ka.bindTexture(Ka.TEXTURE_2D,null))}
// Fallback filters for non-power-of-2 textures
function pa(a){return a===THREE.NearestFilter||a===THREE.NearestMipMapNearestFilter||a===THREE.NearestMipMapLinearFilter?Ka.NEAREST:Ka.LINEAR}
// Map three.js constants to WebGL constants
function qa(a){if(a===THREE.RepeatWrapping)return Ka.REPEAT;if(a===THREE.ClampToEdgeWrapping)return Ka.CLAMP_TO_EDGE;if(a===THREE.MirroredRepeatWrapping)return Ka.MIRRORED_REPEAT;if(a===THREE.NearestFilter)return Ka.NEAREST;if(a===THREE.NearestMipMapNearestFilter)return Ka.NEAREST_MIPMAP_NEAREST;if(a===THREE.NearestMipMapLinearFilter)return Ka.NEAREST_MIPMAP_LINEAR;if(a===THREE.LinearFilter)return Ka.LINEAR;if(a===THREE.LinearMipMapNearestFilter)return Ka.LINEAR_MIPMAP_NEAREST;if(a===THREE.LinearMipMapLinearFilter)return Ka.LINEAR_MIPMAP_LINEAR;if(a===THREE.UnsignedByteType)return Ka.UNSIGNED_BYTE;if(a===THREE.UnsignedShort4444Type)return Ka.UNSIGNED_SHORT_4_4_4_4;if(a===THREE.UnsignedShort5551Type)return Ka.UNSIGNED_SHORT_5_5_5_1;if(a===THREE.UnsignedShort565Type)return Ka.UNSIGNED_SHORT_5_6_5;if(a===THREE.ByteType)return Ka.BYTE;if(a===THREE.ShortType)return Ka.SHORT;if(a===THREE.UnsignedShortType)return Ka.UNSIGNED_SHORT;if(a===THREE.IntType)return Ka.INT;if(a===THREE.UnsignedIntType)return Ka.UNSIGNED_INT;if(a===THREE.FloatType)return Ka.FLOAT;if(a===THREE.AlphaFormat)return Ka.ALPHA;if(a===THREE.RGBFormat)return Ka.RGB;if(a===THREE.RGBAFormat)return Ka.RGBA;if(a===THREE.LuminanceFormat)return Ka.LUMINANCE;if(a===THREE.LuminanceAlphaFormat)return Ka.LUMINANCE_ALPHA;if(a===THREE.AddEquation)return Ka.FUNC_ADD;if(a===THREE.SubtractEquation)return Ka.FUNC_SUBTRACT;if(a===THREE.ReverseSubtractEquation)return Ka.FUNC_REVERSE_SUBTRACT;if(a===THREE.ZeroFactor)return Ka.ZERO;if(a===THREE.OneFactor)return Ka.ONE;if(a===THREE.SrcColorFactor)return Ka.SRC_COLOR;if(a===THREE.OneMinusSrcColorFactor)return Ka.ONE_MINUS_SRC_COLOR;if(a===THREE.SrcAlphaFactor)return Ka.SRC_ALPHA;if(a===THREE.OneMinusSrcAlphaFactor)return Ka.ONE_MINUS_SRC_ALPHA;if(a===THREE.DstAlphaFactor)return Ka.DST_ALPHA;if(a===THREE.OneMinusDstAlphaFactor)return Ka.ONE_MINUS_DST_ALPHA;if(a===THREE.DstColorFactor)return Ka.DST_COLOR;if(a===THREE.OneMinusDstColorFactor)return Ka.ONE_MINUS_DST_COLOR;if(a===THREE.SrcAlphaSaturateFactor)return Ka.SRC_ALPHA_SATURATE;if(void 0!==Pa){if(a===THREE.RGB_S3TC_DXT1_Format)return Pa.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===THREE.RGBA_S3TC_DXT1_Format)return Pa.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===THREE.RGBA_S3TC_DXT3_Format)return Pa.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===THREE.RGBA_S3TC_DXT5_Format)return Pa.COMPRESSED_RGBA_S3TC_DXT5_EXT}return 0}
// Allocations
function ra(a){if(Eb&&a&&a.skeleton&&a.skeleton.useVertexTexture)return 1024;
// default for when object is not specified
// ( for example when prebuilding shader
//   to be used with multiple objects )
//
//  - leave some extra space for other uniforms
//  - limit here is ANGLE's 254 max uniform vectors
//    (up to 54 should be safe)
var b=Ka.getParameter(Ka.MAX_VERTEX_UNIFORM_VECTORS),c=Math.floor((b-20)/4),d=c;return void 0!==a&&a instanceof THREE.SkinnedMesh&&(d=Math.min(a.skeleton.bones.length,d),d<a.skeleton.bones.length&&console.warn("WebGLRenderer: too many bones - "+a.skeleton.bones.length+", this GPU supports just "+d+" (try OpenGL instead of ANGLE)")),d}function sa(a){for(var b=0,c=0,d=0,e=0,f=0,g=a.length;g>f;f++){var h=a[f];h.onlyShadow||h.visible===!1||(h instanceof THREE.DirectionalLight&&b++,h instanceof THREE.PointLight&&c++,h instanceof THREE.SpotLight&&d++,h instanceof THREE.HemisphereLight&&e++)}return{directional:b,point:c,spot:d,hemi:e}}function ta(a){for(var b=0,c=0,d=a.length;d>c;c++){var e=a[c];e.castShadow&&(e instanceof THREE.SpotLight&&b++,e instanceof THREE.DirectionalLight&&!e.shadowCascade&&b++)}return b}
// Initialization
function ua(){try{var a={alpha:za,depth:Aa,stencil:Ba,antialias:Ca,premultipliedAlpha:Da,preserveDrawingBuffer:Ea};if(Ka=xa||wa.getContext("webgl",a)||wa.getContext("experimental-webgl",a),null===Ka)throw"Error creating WebGL context."}catch(b){console.error(b)}La=Ka.getExtension("OES_texture_float"),Ma=Ka.getExtension("OES_texture_float_linear"),Na=Ka.getExtension("OES_standard_derivatives"),Oa=Ka.getExtension("EXT_texture_filter_anisotropic")||Ka.getExtension("MOZ_EXT_texture_filter_anisotropic")||Ka.getExtension("WEBKIT_EXT_texture_filter_anisotropic"),Pa=Ka.getExtension("WEBGL_compressed_texture_s3tc")||Ka.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||Ka.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc"),Qa=Ka.getExtension("OES_element_index_uint"),null===La&&console.log("THREE.WebGLRenderer: Float textures not supported."),null===Na&&console.log("THREE.WebGLRenderer: Standard derivatives not supported."),null===Oa&&console.log("THREE.WebGLRenderer: Anisotropic texture filtering not supported."),null===Pa&&console.log("THREE.WebGLRenderer: S3TC compressed textures not supported."),null===Qa&&console.log("THREE.WebGLRenderer: elementindex as unsigned integer not supported."),void 0===Ka.getShaderPrecisionFormat&&(Ka.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}}),Fa&&(Ra=Ka.getExtension("EXT_frag_depth"))}function va(){Ka.clearColor(0,0,0,1),Ka.clearDepth(1),Ka.clearStencil(0),Ka.enable(Ka.DEPTH_TEST),Ka.depthFunc(Ka.LEQUAL),Ka.frontFace(Ka.CCW),Ka.cullFace(Ka.BACK),Ka.enable(Ka.CULL_FACE),Ka.enable(Ka.BLEND),Ka.blendEquation(Ka.FUNC_ADD),Ka.blendFunc(Ka.SRC_ALPHA,Ka.ONE_MINUS_SRC_ALPHA),Ka.viewport(kb,lb,mb,nb),Ka.clearColor(Ga.r,Ga.g,Ga.b,Ha)}console.log("THREE.WebGLRenderer",THREE.REVISION),a=a||{};var wa=void 0!==a.canvas?a.canvas:document.createElement("canvas"),xa=void 0!==a.context?a.context:null,ya=void 0!==a.precision?a.precision:"highp",za=void 0!==a.alpha?a.alpha:!1,Aa=void 0!==a.depth?a.depth:!0,Ba=void 0!==a.stencil?a.stencil:!0,Ca=void 0!==a.antialias?a.antialias:!1,Da=void 0!==a.premultipliedAlpha?a.premultipliedAlpha:!0,Ea=void 0!==a.preserveDrawingBuffer?a.preserveDrawingBuffer:!1,Fa=void 0!==a.logarithmicDepthBuffer?a.logarithmicDepthBuffer:!1,Ga=new THREE.Color(0),Ha=0,Ia=[],Ja=[];
// public properties
this.domElement=wa,this.context=null,this.devicePixelRatio=void 0!==a.devicePixelRatio?a.devicePixelRatio:void 0!==self.devicePixelRatio?self.devicePixelRatio:1,
// clearing
this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,
// scene graph
this.sortObjects=!0,
// physically based shading
this.gammaInput=!1,this.gammaOutput=!1,
// shadow map
this.shadowMapEnabled=!1,this.shadowMapAutoUpdate=!0,this.shadowMapType=THREE.PCFShadowMap,this.shadowMapCullFace=THREE.CullFaceFront,this.shadowMapDebug=!1,this.shadowMapCascade=!1,
// morphs
this.maxMorphTargets=8,this.maxMorphNormals=4,
// flags
this.autoScaleCubemaps=!0,
// custom render plugins
this.renderPluginsPre=[],this.renderPluginsPost=[],
// info
this.info={memory:{programs:0,geometries:0,textures:0},render:{calls:0,vertices:0,faces:0,points:0}};
// internal properties
var Ka,La,Ma,Na,Oa,Pa,Qa,Ra,Sa=this,Ta=[],
// internal state cache
Ua=null,Va=null,Wa=-1,Xa=null,Ya=null,Za=0,
// GL state cache
$a=-1,_a=-1,ab=-1,bb=-1,cb=-1,db=-1,eb=-1,fb=-1,gb=null,hb=null,ib=null,jb=null,kb=0,lb=0,mb=wa.width,nb=wa.height,ob=0,pb=0,qb=new Uint8Array(16),rb=new Uint8Array(16),
// frustum
sb=new THREE.Frustum,
// camera matrices cache
tb=new THREE.Matrix4,ub=new THREE.Matrix4,vb=new THREE.Vector3,
// light arrays cache
wb=new THREE.Vector3,xb=!0,yb={ambient:[0,0,0],directional:{length:0,colors:[],positions:[]},point:{length:0,colors:[],positions:[],distances:[]},spot:{length:0,colors:[],positions:[],distances:[],directions:[],anglesCos:[],exponents:[]},hemi:{length:0,skyColors:[],groundColors:[],positions:[]}};ua(),va(),this.context=Ka;
// GPU capabilities
var zb=Ka.getParameter(Ka.MAX_TEXTURE_IMAGE_UNITS),Ab=Ka.getParameter(Ka.MAX_VERTEX_TEXTURE_IMAGE_UNITS),Bb=(Ka.getParameter(Ka.MAX_TEXTURE_SIZE),Ka.getParameter(Ka.MAX_CUBE_MAP_TEXTURE_SIZE)),Cb=Oa?Ka.getParameter(Oa.MAX_TEXTURE_MAX_ANISOTROPY_EXT):0,Db=Ab>0,Eb=Db&&La,Fb=(Pa?Ka.getParameter(Ka.COMPRESSED_TEXTURE_FORMATS):[],Ka.getShaderPrecisionFormat(Ka.VERTEX_SHADER,Ka.HIGH_FLOAT)),Gb=Ka.getShaderPrecisionFormat(Ka.VERTEX_SHADER,Ka.MEDIUM_FLOAT),Hb=(Ka.getShaderPrecisionFormat(Ka.VERTEX_SHADER,Ka.LOW_FLOAT),Ka.getShaderPrecisionFormat(Ka.FRAGMENT_SHADER,Ka.HIGH_FLOAT)),Ib=Ka.getShaderPrecisionFormat(Ka.FRAGMENT_SHADER,Ka.MEDIUM_FLOAT),Jb=(Ka.getShaderPrecisionFormat(Ka.FRAGMENT_SHADER,Ka.LOW_FLOAT),Fb.precision>0&&Hb.precision>0),Kb=Gb.precision>0&&Ib.precision>0;"highp"!==ya||Jb||(Kb?(ya="mediump",console.warn("THREE.WebGLRenderer: highp not supported, using mediump.")):(ya="lowp",console.warn("THREE.WebGLRenderer: highp and mediump not supported, using lowp."))),"mediump"!==ya||Kb||(ya="lowp",console.warn("THREE.WebGLRenderer: mediump not supported, using lowp.")),
// API
this.getContext=function(){return Ka},this.supportsVertexTextures=function(){return Db},this.supportsFloatTextures=function(){return La},this.supportsStandardDerivatives=function(){return Na},this.supportsCompressedTextureS3TC=function(){return Pa},this.getMaxAnisotropy=function(){return Cb},this.getPrecision=function(){return ya},this.setSize=function(a,b,c){wa.width=a*this.devicePixelRatio,wa.height=b*this.devicePixelRatio,c!==!1&&(wa.style.width=a+"px",wa.style.height=b+"px"),this.setViewport(0,0,a,b)},this.setViewport=function(a,b,c,d){kb=a*this.devicePixelRatio,lb=b*this.devicePixelRatio,mb=c*this.devicePixelRatio,nb=d*this.devicePixelRatio,Ka.viewport(kb,lb,mb,nb)},this.setScissor=function(a,b,c,d){Ka.scissor(a*this.devicePixelRatio,b*this.devicePixelRatio,c*this.devicePixelRatio,d*this.devicePixelRatio)},this.enableScissorTest=function(a){a?Ka.enable(Ka.SCISSOR_TEST):Ka.disable(Ka.SCISSOR_TEST)},
// Clearing
this.setClearColor=function(a,b){Ga.set(a),Ha=void 0!==b?b:1,Ka.clearColor(Ga.r,Ga.g,Ga.b,Ha)},this.setClearColorHex=function(a,b){console.warn("THREE.WebGLRenderer: .setClearColorHex() is being removed. Use .setClearColor() instead."),this.setClearColor(a,b)},this.getClearColor=function(){return Ga},this.getClearAlpha=function(){return Ha},this.clear=function(a,b,c){var d=0;(void 0===a||a)&&(d|=Ka.COLOR_BUFFER_BIT),(void 0===b||b)&&(d|=Ka.DEPTH_BUFFER_BIT),(void 0===c||c)&&(d|=Ka.STENCIL_BUFFER_BIT),Ka.clear(d)},this.clearColor=function(){Ka.clear(Ka.COLOR_BUFFER_BIT)},this.clearDepth=function(){Ka.clear(Ka.DEPTH_BUFFER_BIT)},this.clearStencil=function(){Ka.clear(Ka.STENCIL_BUFFER_BIT)},this.clearTarget=function(a,b,c,d){this.setRenderTarget(a),this.clear(b,c,d)},
// Plugins
this.addPostPlugin=function(a){a.init(this),this.renderPluginsPost.push(a)},this.addPrePlugin=function(a){a.init(this),this.renderPluginsPre.push(a)},
// Rendering
this.updateShadowMap=function(a,b){Ua=null,ab=-1,eb=-1,fb=-1,Xa=-1,Wa=-1,xb=!0,$a=-1,_a=-1,Ub(a),this.shadowMapPlugin.update(a,b)};
// Events
var Lb=function(a){var b=a.target;b.removeEventListener("dispose",Lb),Qb(b)},Mb=function(a){var b=a.target;b.removeEventListener("dispose",Mb),Rb(b),Sa.info.memory.textures--},Nb=function(a){var b=a.target;b.removeEventListener("dispose",Nb),Sb(b),Sa.info.memory.textures--},Ob=function(a){var b=a.target;b.removeEventListener("dispose",Ob),Tb(b)},Pb=function(a){
// custom attributes
if(void 0!==a.__webglVertexBuffer&&Ka.deleteBuffer(a.__webglVertexBuffer),void 0!==a.__webglNormalBuffer&&Ka.deleteBuffer(a.__webglNormalBuffer),void 0!==a.__webglTangentBuffer&&Ka.deleteBuffer(a.__webglTangentBuffer),void 0!==a.__webglColorBuffer&&Ka.deleteBuffer(a.__webglColorBuffer),void 0!==a.__webglUVBuffer&&Ka.deleteBuffer(a.__webglUVBuffer),void 0!==a.__webglUV2Buffer&&Ka.deleteBuffer(a.__webglUV2Buffer),void 0!==a.__webglSkinIndicesBuffer&&Ka.deleteBuffer(a.__webglSkinIndicesBuffer),void 0!==a.__webglSkinWeightsBuffer&&Ka.deleteBuffer(a.__webglSkinWeightsBuffer),void 0!==a.__webglFaceBuffer&&Ka.deleteBuffer(a.__webglFaceBuffer),void 0!==a.__webglLineBuffer&&Ka.deleteBuffer(a.__webglLineBuffer),void 0!==a.__webglLineDistanceBuffer&&Ka.deleteBuffer(a.__webglLineDistanceBuffer),void 0!==a.__webglCustomAttributesList)for(var b in a.__webglCustomAttributesList)Ka.deleteBuffer(a.__webglCustomAttributesList[b].buffer);Sa.info.memory.geometries--},Qb=function(a){if(a.__webglInit=void 0,a instanceof THREE.BufferGeometry){var b=a.attributes;for(var c in b)void 0!==b[c].buffer&&Ka.deleteBuffer(b[c].buffer);Sa.info.memory.geometries--}else if(void 0!==a.geometryGroups)for(var d=0,e=a.geometryGroupsList.length;e>d;d++){var f=a.geometryGroupsList[d];if(void 0!==f.numMorphTargets)for(var g=0,h=f.numMorphTargets;h>g;g++)Ka.deleteBuffer(f.__webglMorphTargetsBuffers[g]);if(void 0!==f.numMorphNormals)for(var g=0,h=f.numMorphNormals;h>g;g++)Ka.deleteBuffer(f.__webglMorphNormalsBuffers[g]);Pb(f)}else Pb(a)},Rb=function(a){if(a.image&&a.image.__webglTextureCube)
// cube texture
Ka.deleteTexture(a.image.__webglTextureCube);else{
// 2D texture
if(!a.__webglInit)return;a.__webglInit=!1,Ka.deleteTexture(a.__webglTexture)}},Sb=function(a){if(a&&a.__webglTexture)if(Ka.deleteTexture(a.__webglTexture),a instanceof THREE.WebGLRenderTargetCube)for(var b=0;6>b;b++)Ka.deleteFramebuffer(a.__webglFramebuffer[b]),Ka.deleteRenderbuffer(a.__webglRenderbuffer[b]);else Ka.deleteFramebuffer(a.__webglFramebuffer),Ka.deleteRenderbuffer(a.__webglRenderbuffer)},Tb=function(a){var b=a.program.program;if(void 0!==b){a.program=void 0;
// only deallocate GL program if this was the last use of shared program
// assumed there is only single copy of any program in the _programs list
// (that's how it's constructed)
var c,d,e,f=!1;for(c=0,d=Ta.length;d>c;c++)if(e=Ta[c],e.program===b){e.usedTimes--,0===e.usedTimes&&(f=!0);break}if(f===!0){
// avoid using array.splice, this is costlier than creating new array from scratch
var g=[];for(c=0,d=Ta.length;d>c;c++)e=Ta[c],e.program!==b&&g.push(e);Ta=g,Ka.deleteProgram(b),Sa.info.memory.programs--}}};
// Buffer rendering
this.renderBufferImmediate=function(a,b,c){if(t(),a.hasPositions&&!a.__webglVertexBuffer&&(a.__webglVertexBuffer=Ka.createBuffer()),a.hasNormals&&!a.__webglNormalBuffer&&(a.__webglNormalBuffer=Ka.createBuffer()),a.hasUvs&&!a.__webglUvBuffer&&(a.__webglUvBuffer=Ka.createBuffer()),a.hasColors&&!a.__webglColorBuffer&&(a.__webglColorBuffer=Ka.createBuffer()),a.hasPositions&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglVertexBuffer),Ka.bufferData(Ka.ARRAY_BUFFER,a.positionArray,Ka.DYNAMIC_DRAW),u(b.attributes.position),Ka.vertexAttribPointer(b.attributes.position,3,Ka.FLOAT,!1,0,0)),a.hasNormals){if(Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglNormalBuffer),c.shading===THREE.FlatShading){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r=3*a.count;for(q=0;r>q;q+=9)p=a.normalArray,g=p[q],j=p[q+1],m=p[q+2],h=p[q+3],k=p[q+4],n=p[q+5],i=p[q+6],l=p[q+7],o=p[q+8],d=(g+h+i)/3,e=(j+k+l)/3,f=(m+n+o)/3,p[q]=d,p[q+1]=e,p[q+2]=f,p[q+3]=d,p[q+4]=e,p[q+5]=f,p[q+6]=d,p[q+7]=e,p[q+8]=f}Ka.bufferData(Ka.ARRAY_BUFFER,a.normalArray,Ka.DYNAMIC_DRAW),u(b.attributes.normal),Ka.vertexAttribPointer(b.attributes.normal,3,Ka.FLOAT,!1,0,0)}a.hasUvs&&c.map&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglUvBuffer),Ka.bufferData(Ka.ARRAY_BUFFER,a.uvArray,Ka.DYNAMIC_DRAW),u(b.attributes.uv),Ka.vertexAttribPointer(b.attributes.uv,2,Ka.FLOAT,!1,0,0)),a.hasColors&&c.vertexColors!==THREE.NoColors&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,a.__webglColorBuffer),Ka.bufferData(Ka.ARRAY_BUFFER,a.colorArray,Ka.DYNAMIC_DRAW),u(b.attributes.color),Ka.vertexAttribPointer(b.attributes.color,3,Ka.FLOAT,!1,0,0)),v(),Ka.drawArrays(Ka.TRIANGLES,0,a.count),a.count=0},this.renderBufferDirect=function(a,b,c,d,e,f){if(d.visible!==!1){var g=Q(a,b,c,d,f),h=g.attributes,i=e.attributes,j=!1,k=d.wireframe?1:0,l=16777215*e.id+2*g.id+k;
// render mesh
if(l!==Xa&&(Xa=l,j=!0),j&&t(),f instanceof THREE.Mesh){var m=i.index;if(m){
// indexed triangles
var n,o;m.array instanceof Uint32Array?(n=Ka.UNSIGNED_INT,o=4):(n=Ka.UNSIGNED_SHORT,o=2);var p=e.offsets;if(0===p.length)j&&(s(d,h,i,0),Ka.bindBuffer(Ka.ELEMENT_ARRAY_BUFFER,m.buffer)),Ka.drawElements(Ka.TRIANGLES,m.array.length,n,0),Sa.info.render.calls++,Sa.info.render.vertices+=m.array.length,// not really true, here vertices can be shared
Sa.info.render.faces+=m.array.length/3;else{
// if there is more than 1 chunk
// must set attribute pointers to use new offsets for each chunk
// even if geometry and materials didn't change
j=!0;for(var q=0,r=p.length;r>q;q++){var u=p[q].index;j&&(s(d,h,i,u),Ka.bindBuffer(Ka.ELEMENT_ARRAY_BUFFER,m.buffer)),
// render indexed triangles
Ka.drawElements(Ka.TRIANGLES,p[q].count,n,p[q].start*o),Sa.info.render.calls++,Sa.info.render.vertices+=p[q].count,// not really true, here vertices can be shared
Sa.info.render.faces+=p[q].count/3}}}else{
// non-indexed triangles
j&&s(d,h,i,0);var v=e.attributes.position;
// render non-indexed triangles
Ka.drawArrays(Ka.TRIANGLES,0,v.array.length/3),Sa.info.render.calls++,Sa.info.render.vertices+=v.array.length/3,Sa.info.render.faces+=v.array.length/9}}else if(f instanceof THREE.PointCloud){
// render particles
j&&s(d,h,i,0);var v=i.position;
// render particles
Ka.drawArrays(Ka.POINTS,0,v.array.length/3),Sa.info.render.calls++,Sa.info.render.points+=v.array.length/3}else if(f instanceof THREE.Line){var w=f.type===THREE.LineStrip?Ka.LINE_STRIP:Ka.LINES;ga(d.linewidth);var m=i.index;if(m){
// indexed lines
var n,o;m.array instanceof Uint32Array?(n=Ka.UNSIGNED_INT,o=4):(n=Ka.UNSIGNED_SHORT,o=2);var p=e.offsets;if(0===p.length)j&&(s(d,h,i,0),Ka.bindBuffer(Ka.ELEMENT_ARRAY_BUFFER,m.buffer)),Ka.drawElements(w,m.array.length,n,0),// 2 bytes per Uint16Array
Sa.info.render.calls++,Sa.info.render.vertices+=m.array.length;else{
// if there is more than 1 chunk
// must set attribute pointers to use new offsets for each chunk
// even if geometry and materials didn't change
p.length>1&&(j=!0);for(var q=0,r=p.length;r>q;q++){var u=p[q].index;j&&(s(d,h,i,u),Ka.bindBuffer(Ka.ELEMENT_ARRAY_BUFFER,m.buffer)),
// render indexed lines
Ka.drawElements(w,p[q].count,n,p[q].start*o),// 2 bytes per Uint16Array
Sa.info.render.calls++,Sa.info.render.vertices+=p[q].count}}}else{
// non-indexed lines
j&&s(d,h,i,0);var v=i.position;Ka.drawArrays(w,0,v.array.length/3),Sa.info.render.calls++,Sa.info.render.points+=v.array.length/3}}}},this.renderBuffer=function(a,b,c,d,e,f){if(d.visible!==!1){var g,h,i,j=Q(a,b,c,d,f),k=j.attributes,l=!1,m=d.wireframe?1:0,n=16777215*e.id+2*j.id+m;if(n!==Xa&&(Xa=n,l=!0),l&&t(),
// vertices
!d.morphTargets&&k.position>=0?l&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,e.__webglVertexBuffer),u(k.position),Ka.vertexAttribPointer(k.position,3,Ka.FLOAT,!1,0,0)):f.morphTargetBase&&w(d,e,f),l){
// custom attributes
// Use the per-geometryGroup custom attribute arrays which are setup in initMeshBuffers
if(e.__webglCustomAttributesList)for(h=0,i=e.__webglCustomAttributesList.length;i>h;h++)g=e.__webglCustomAttributesList[h],k[g.buffer.belongsToAttribute]>=0&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,g.buffer),u(k[g.buffer.belongsToAttribute]),Ka.vertexAttribPointer(k[g.buffer.belongsToAttribute],g.size,Ka.FLOAT,!1,0,0));
// colors
k.color>=0&&(f.geometry.colors.length>0||f.geometry.faces.length>0?(Ka.bindBuffer(Ka.ARRAY_BUFFER,e.__webglColorBuffer),u(k.color),Ka.vertexAttribPointer(k.color,3,Ka.FLOAT,!1,0,0)):d.defaultAttributeValues&&Ka.vertexAttrib3fv(k.color,d.defaultAttributeValues.color)),
// normals
k.normal>=0&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,e.__webglNormalBuffer),u(k.normal),Ka.vertexAttribPointer(k.normal,3,Ka.FLOAT,!1,0,0)),
// tangents
k.tangent>=0&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,e.__webglTangentBuffer),u(k.tangent),Ka.vertexAttribPointer(k.tangent,4,Ka.FLOAT,!1,0,0)),
// uvs
k.uv>=0&&(f.geometry.faceVertexUvs[0]?(Ka.bindBuffer(Ka.ARRAY_BUFFER,e.__webglUVBuffer),u(k.uv),Ka.vertexAttribPointer(k.uv,2,Ka.FLOAT,!1,0,0)):d.defaultAttributeValues&&Ka.vertexAttrib2fv(k.uv,d.defaultAttributeValues.uv)),k.uv2>=0&&(f.geometry.faceVertexUvs[1]?(Ka.bindBuffer(Ka.ARRAY_BUFFER,e.__webglUV2Buffer),u(k.uv2),Ka.vertexAttribPointer(k.uv2,2,Ka.FLOAT,!1,0,0)):d.defaultAttributeValues&&Ka.vertexAttrib2fv(k.uv2,d.defaultAttributeValues.uv2)),d.skinning&&k.skinIndex>=0&&k.skinWeight>=0&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,e.__webglSkinIndicesBuffer),u(k.skinIndex),Ka.vertexAttribPointer(k.skinIndex,4,Ka.FLOAT,!1,0,0),Ka.bindBuffer(Ka.ARRAY_BUFFER,e.__webglSkinWeightsBuffer),u(k.skinWeight),Ka.vertexAttribPointer(k.skinWeight,4,Ka.FLOAT,!1,0,0)),
// line distances
k.lineDistance>=0&&(Ka.bindBuffer(Ka.ARRAY_BUFFER,e.__webglLineDistanceBuffer),u(k.lineDistance),Ka.vertexAttribPointer(k.lineDistance,1,Ka.FLOAT,!1,0,0))}
// render mesh
if(v(),f instanceof THREE.Mesh){var o=e.__typeArray===Uint32Array?Ka.UNSIGNED_INT:Ka.UNSIGNED_SHORT;
// wireframe
d.wireframe?(ga(d.wireframeLinewidth),l&&Ka.bindBuffer(Ka.ELEMENT_ARRAY_BUFFER,e.__webglLineBuffer),Ka.drawElements(Ka.LINES,e.__webglLineCount,o,0)):(l&&Ka.bindBuffer(Ka.ELEMENT_ARRAY_BUFFER,e.__webglFaceBuffer),Ka.drawElements(Ka.TRIANGLES,e.__webglFaceCount,o,0)),Sa.info.render.calls++,Sa.info.render.vertices+=e.__webglFaceCount,Sa.info.render.faces+=e.__webglFaceCount/3}else if(f instanceof THREE.Line){var p=f.type===THREE.LineStrip?Ka.LINE_STRIP:Ka.LINES;ga(d.linewidth),Ka.drawArrays(p,0,e.__webglLineCount),Sa.info.render.calls++}else f instanceof THREE.PointCloud&&(Ka.drawArrays(Ka.POINTS,0,e.__webglParticleCount),Sa.info.render.calls++,Sa.info.render.points+=e.__webglParticleCount)}},
// Rendering
this.render=function(a,b,c,d){
// update Skeleton objects
function e(a){a instanceof THREE.SkinnedMesh&&a.skeleton.update();for(var b=0,c=a.children.length;c>b;b++)e(a.children[b])}if(b instanceof THREE.Camera==!1)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");var f,g,h,i,j,k=a.__lights,l=a.fog;for(
// reset caching for this frame
Wa=-1,Ya=null,xb=!0,
// update scene graph
a.autoUpdate===!0&&a.updateMatrixWorld(),
// update camera matrices and frustum
void 0===b.parent&&b.updateMatrixWorld(),e(a),b.matrixWorldInverse.getInverse(b.matrixWorld),tb.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse),sb.setFromMatrix(tb),Ub(a),Ia.length=0,Ja.length=0,A(a,a,b),Sa.sortObjects===!0&&(Ia.sort(x),Ja.sort(y)),
// custom render plugins (pre pass)
B(this.renderPluginsPre,a,b),
//
Sa.info.render.calls=0,Sa.info.render.vertices=0,Sa.info.render.faces=0,Sa.info.render.points=0,this.setRenderTarget(c),(this.autoClear||d)&&this.clear(this.autoClearColor,this.autoClearDepth,this.autoClearStencil),
// set matrices for regular objects (frustum culled)
// set matrices for immediate objects
j=a.__webglObjectsImmediate,f=0,g=j.length;g>f;f++)h=j[f],i=h.object,i.visible&&(ca(i,b),E(h));if(a.overrideMaterial){var m=a.overrideMaterial;this.setBlending(m.blending,m.blendEquation,m.blendSrc,m.blendDst),this.setDepthTest(m.depthTest),this.setDepthWrite(m.depthWrite),ha(m.polygonOffset,m.polygonOffsetFactor,m.polygonOffsetUnits),C(Ia,b,k,l,!0,m),C(Ja,b,k,l,!0,m),D(a.__webglObjectsImmediate,"",b,k,l,!1,m)}else{var m=null;
// opaque pass (front-to-back order)
this.setBlending(THREE.NoBlending),C(Ia,b,k,l,!1,m),D(a.__webglObjectsImmediate,"opaque",b,k,l,!1,m),
// transparent pass (back-to-front order)
C(Ja,b,k,l,!0,m),D(a.__webglObjectsImmediate,"transparent",b,k,l,!0,m)}
// custom render plugins (post pass)
B(this.renderPluginsPost,a,b),
// Generate mipmap if we're using any kind of mipmap filtering
c&&c.generateMipmaps&&c.minFilter!==THREE.NearestFilter&&c.minFilter!==THREE.LinearFilter&&oa(c),
// Ensure depth buffer writing is enabled so it can be cleared on next render
this.setDepthTest(!0),this.setDepthWrite(!0)},this.renderImmediateObject=function(a,b,c,d,e){var f=Q(a,b,c,d,e);Xa=-1,Sa.setMaterialFaces(d),e.immediateRenderCallback?e.immediateRenderCallback(f,Ka,sb):e.render(function(a){Sa.renderBufferImmediate(a,f,d)})};
// Objects refresh
var Ub=function(a){for(a.__webglObjects||(a.__webglObjects={},a.__webglObjectsImmediate=[]);a.__objectsAdded.length;)G(a.__objectsAdded[0],a),a.__objectsAdded.splice(0,1);for(;a.__objectsRemoved.length;)N(a.__objectsRemoved[0],a),a.__objectsRemoved.splice(0,1)};
// Materials
this.initMaterial=function(a,b,c,d){a.addEventListener("dispose",Ob);var e,f,g,h,i,j,k;if(a instanceof THREE.MeshDepthMaterial?k="depth":a instanceof THREE.MeshNormalMaterial?k="normal":a instanceof THREE.MeshBasicMaterial?k="basic":a instanceof THREE.MeshLambertMaterial?k="lambert":a instanceof THREE.MeshPhongMaterial?k="phong":a instanceof THREE.LineBasicMaterial?k="basic":a instanceof THREE.LineDashedMaterial?k="dashed":a instanceof THREE.PointCloudMaterial&&(k="particle_basic"),k){var l=THREE.ShaderLib[k];a.__webglShader={uniforms:THREE.UniformsUtils.clone(l.uniforms),vertexShader:l.vertexShader,fragmentShader:l.fragmentShader}}else a.__webglShader={uniforms:a.uniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader};
// heuristics to create shader parameters according to lights in the scene
// (not to blow over maxLights budget)
h=sa(b),j=ta(b),i=ra(d),g={precision:ya,supportsVertexTextures:Db,map:!!a.map,envMap:!!a.envMap,lightMap:!!a.lightMap,bumpMap:!!a.bumpMap,normalMap:!!a.normalMap,specularMap:!!a.specularMap,alphaMap:!!a.alphaMap,vertexColors:a.vertexColors,fog:c,useFog:a.fog,fogExp:c instanceof THREE.FogExp2,sizeAttenuation:a.sizeAttenuation,logarithmicDepthBuffer:Fa,skinning:a.skinning,maxBones:i,useVertexTexture:Eb&&d&&d.skeleton&&d.skeleton.useVertexTexture,morphTargets:a.morphTargets,morphNormals:a.morphNormals,maxMorphTargets:this.maxMorphTargets,maxMorphNormals:this.maxMorphNormals,maxDirLights:h.directional,maxPointLights:h.point,maxSpotLights:h.spot,maxHemiLights:h.hemi,maxShadows:j,shadowMapEnabled:this.shadowMapEnabled&&d.receiveShadow&&j>0,shadowMapType:this.shadowMapType,shadowMapDebug:this.shadowMapDebug,shadowMapCascade:this.shadowMapCascade,alphaTest:a.alphaTest,metal:a.metal,wrapAround:a.wrapAround,doubleSided:a.side===THREE.DoubleSide,flipSided:a.side===THREE.BackSide};
// Generate code
var m=[];k?m.push(k):(m.push(a.fragmentShader),m.push(a.vertexShader));for(var n in a.defines)m.push(n),m.push(a.defines[n]);for(var o in g)m.push(o),m.push(g[o]);
// Check if code has been already compiled
for(var p,q=m.join(),o=0,r=Ta.length;r>o;o++){var s=Ta[o];if(s.code===q){p=s,p.usedTimes++;break}}void 0===p&&(p=new THREE.WebGLProgram(this,q,a,g),Ta.push(p),Sa.info.memory.programs=Ta.length),a.program=p;var t=a.program.attributes;if(a.morphTargets){a.numSupportedMorphTargets=0;var u,v="morphTarget";for(f=0;f<this.maxMorphTargets;f++)u=v+f,t[u]>=0&&a.numSupportedMorphTargets++}if(a.morphNormals){a.numSupportedMorphNormals=0;var u,v="morphNormal";for(f=0;f<this.maxMorphNormals;f++)u=v+f,t[u]>=0&&a.numSupportedMorphNormals++}a.uniformsList=[];for(e in a.__webglShader.uniforms){var w=a.program.uniforms[e];w&&a.uniformsList.push([a.__webglShader.uniforms[e],w])}},
// GL state setting
this.setFaceCulling=function(a,b){a===THREE.CullFaceNone?Ka.disable(Ka.CULL_FACE):(b===THREE.FrontFaceDirectionCW?Ka.frontFace(Ka.CW):Ka.frontFace(Ka.CCW),a===THREE.CullFaceBack?Ka.cullFace(Ka.BACK):a===THREE.CullFaceFront?Ka.cullFace(Ka.FRONT):Ka.cullFace(Ka.FRONT_AND_BACK),Ka.enable(Ka.CULL_FACE))},this.setMaterialFaces=function(a){var b=a.side===THREE.DoubleSide,c=a.side===THREE.BackSide;$a!==b&&(b?Ka.disable(Ka.CULL_FACE):Ka.enable(Ka.CULL_FACE),$a=b),_a!==c&&(c?Ka.frontFace(Ka.CW):Ka.frontFace(Ka.CCW),_a=c)},this.setDepthTest=function(a){eb!==a&&(a?Ka.enable(Ka.DEPTH_TEST):Ka.disable(Ka.DEPTH_TEST),eb=a)},this.setDepthWrite=function(a){fb!==a&&(Ka.depthMask(a),fb=a)},this.setBlending=function(a,b,c,d){a!==ab&&(a===THREE.NoBlending?Ka.disable(Ka.BLEND):a===THREE.AdditiveBlending?(Ka.enable(Ka.BLEND),Ka.blendEquation(Ka.FUNC_ADD),Ka.blendFunc(Ka.SRC_ALPHA,Ka.ONE)):a===THREE.SubtractiveBlending?(
// TODO: Find blendFuncSeparate() combination
Ka.enable(Ka.BLEND),Ka.blendEquation(Ka.FUNC_ADD),Ka.blendFunc(Ka.ZERO,Ka.ONE_MINUS_SRC_COLOR)):a===THREE.MultiplyBlending?(
// TODO: Find blendFuncSeparate() combination
Ka.enable(Ka.BLEND),Ka.blendEquation(Ka.FUNC_ADD),Ka.blendFunc(Ka.ZERO,Ka.SRC_COLOR)):a===THREE.CustomBlending?Ka.enable(Ka.BLEND):(Ka.enable(Ka.BLEND),Ka.blendEquationSeparate(Ka.FUNC_ADD,Ka.FUNC_ADD),Ka.blendFuncSeparate(Ka.SRC_ALPHA,Ka.ONE_MINUS_SRC_ALPHA,Ka.ONE,Ka.ONE_MINUS_SRC_ALPHA)),ab=a),a===THREE.CustomBlending?(b!==bb&&(Ka.blendEquation(qa(b)),bb=b),(c!==cb||d!==db)&&(Ka.blendFunc(qa(c),qa(d)),cb=c,db=d)):(bb=null,cb=null,db=null)},this.setTexture=function(a,b){if(a.needsUpdate){a.__webglInit||(a.__webglInit=!0,a.addEventListener("dispose",Mb),a.__webglTexture=Ka.createTexture(),Sa.info.memory.textures++),Ka.activeTexture(Ka.TEXTURE0+b),Ka.bindTexture(Ka.TEXTURE_2D,a.__webglTexture),Ka.pixelStorei(Ka.UNPACK_FLIP_Y_WEBGL,a.flipY),Ka.pixelStorei(Ka.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),Ka.pixelStorei(Ka.UNPACK_ALIGNMENT,a.unpackAlignment);var c=a.image,d=THREE.Math.isPowerOfTwo(c.width)&&THREE.Math.isPowerOfTwo(c.height),e=qa(a.format),f=qa(a.type);ia(Ka.TEXTURE_2D,a,d);var g,h=a.mipmaps;if(a instanceof THREE.DataTexture)
// use manually created mipmaps if available
// if there are no manual mipmaps
// set 0 level mipmap and then use GL to generate other mipmap levels
if(h.length>0&&d){for(var i=0,j=h.length;j>i;i++)g=h[i],Ka.texImage2D(Ka.TEXTURE_2D,i,e,g.width,g.height,0,e,f,g.data);a.generateMipmaps=!1}else Ka.texImage2D(Ka.TEXTURE_2D,0,e,c.width,c.height,0,e,f,c.data);else if(a instanceof THREE.CompressedTexture)for(var i=0,j=h.length;j>i;i++)g=h[i],a.format!==THREE.RGBAFormat?Ka.compressedTexImage2D(Ka.TEXTURE_2D,i,e,g.width,g.height,0,g.data):Ka.texImage2D(Ka.TEXTURE_2D,i,e,g.width,g.height,0,e,f,g.data);else// regular Texture (image, video, canvas)
// use manually created mipmaps if available
// if there are no manual mipmaps
// set 0 level mipmap and then use GL to generate other mipmap levels
if(h.length>0&&d){for(var i=0,j=h.length;j>i;i++)g=h[i],Ka.texImage2D(Ka.TEXTURE_2D,i,e,e,f,g);a.generateMipmaps=!1}else Ka.texImage2D(Ka.TEXTURE_2D,0,e,e,f,a.image);a.generateMipmaps&&d&&Ka.generateMipmap(Ka.TEXTURE_2D),a.needsUpdate=!1,a.onUpdate&&a.onUpdate()}else Ka.activeTexture(Ka.TEXTURE0+b),Ka.bindTexture(Ka.TEXTURE_2D,a.__webglTexture)},this.setRenderTarget=function(a){var b=a instanceof THREE.WebGLRenderTargetCube;if(a&&!a.__webglFramebuffer){void 0===a.depthBuffer&&(a.depthBuffer=!0),void 0===a.stencilBuffer&&(a.stencilBuffer=!0),a.addEventListener("dispose",Nb),a.__webglTexture=Ka.createTexture(),Sa.info.memory.textures++;
// Setup texture, create render and frame buffers
var c=THREE.Math.isPowerOfTwo(a.width)&&THREE.Math.isPowerOfTwo(a.height),d=qa(a.format),e=qa(a.type);if(b){a.__webglFramebuffer=[],a.__webglRenderbuffer=[],Ka.bindTexture(Ka.TEXTURE_CUBE_MAP,a.__webglTexture),ia(Ka.TEXTURE_CUBE_MAP,a,c);for(var f=0;6>f;f++)a.__webglFramebuffer[f]=Ka.createFramebuffer(),a.__webglRenderbuffer[f]=Ka.createRenderbuffer(),Ka.texImage2D(Ka.TEXTURE_CUBE_MAP_POSITIVE_X+f,0,d,a.width,a.height,0,d,e,null),ma(a.__webglFramebuffer[f],a,Ka.TEXTURE_CUBE_MAP_POSITIVE_X+f),na(a.__webglRenderbuffer[f],a);c&&Ka.generateMipmap(Ka.TEXTURE_CUBE_MAP)}else a.__webglFramebuffer=Ka.createFramebuffer(),a.shareDepthFrom?a.__webglRenderbuffer=a.shareDepthFrom.__webglRenderbuffer:a.__webglRenderbuffer=Ka.createRenderbuffer(),Ka.bindTexture(Ka.TEXTURE_2D,a.__webglTexture),ia(Ka.TEXTURE_2D,a,c),Ka.texImage2D(Ka.TEXTURE_2D,0,d,a.width,a.height,0,d,e,null),ma(a.__webglFramebuffer,a,Ka.TEXTURE_2D),a.shareDepthFrom?a.depthBuffer&&!a.stencilBuffer?Ka.framebufferRenderbuffer(Ka.FRAMEBUFFER,Ka.DEPTH_ATTACHMENT,Ka.RENDERBUFFER,a.__webglRenderbuffer):a.depthBuffer&&a.stencilBuffer&&Ka.framebufferRenderbuffer(Ka.FRAMEBUFFER,Ka.DEPTH_STENCIL_ATTACHMENT,Ka.RENDERBUFFER,a.__webglRenderbuffer):na(a.__webglRenderbuffer,a),c&&Ka.generateMipmap(Ka.TEXTURE_2D);
// Release everything
b?Ka.bindTexture(Ka.TEXTURE_CUBE_MAP,null):Ka.bindTexture(Ka.TEXTURE_2D,null),Ka.bindRenderbuffer(Ka.RENDERBUFFER,null),Ka.bindFramebuffer(Ka.FRAMEBUFFER,null)}var g,h,i,j,k;a?(g=b?a.__webglFramebuffer[a.activeCubeFace]:a.__webglFramebuffer,h=a.width,i=a.height,j=0,k=0):(g=null,h=mb,i=nb,j=kb,k=lb),g!==Va&&(Ka.bindFramebuffer(Ka.FRAMEBUFFER,g),Ka.viewport(j,k,h,i),Va=g),ob=h,pb=i},
// default plugins (order is important)
this.shadowMapPlugin=new THREE.ShadowMapPlugin,this.addPrePlugin(this.shadowMapPlugin),this.addPostPlugin(new THREE.SpritePlugin),this.addPostPlugin(new THREE.LensFlarePlugin)},
// File:src/renderers/WebGLRenderTarget.js
/**
 * @author szimek / https://github.com/szimek/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.WebGLRenderTarget=function(a,b,c){this.width=a,this.height=b,c=c||{},this.wrapS=void 0!==c.wrapS?c.wrapS:THREE.ClampToEdgeWrapping,this.wrapT=void 0!==c.wrapT?c.wrapT:THREE.ClampToEdgeWrapping,this.magFilter=void 0!==c.magFilter?c.magFilter:THREE.LinearFilter,this.minFilter=void 0!==c.minFilter?c.minFilter:THREE.LinearMipMapLinearFilter,this.anisotropy=void 0!==c.anisotropy?c.anisotropy:1,this.offset=new THREE.Vector2(0,0),this.repeat=new THREE.Vector2(1,1),this.format=void 0!==c.format?c.format:THREE.RGBAFormat,this.type=void 0!==c.type?c.type:THREE.UnsignedByteType,this.depthBuffer=void 0!==c.depthBuffer?c.depthBuffer:!0,this.stencilBuffer=void 0!==c.stencilBuffer?c.stencilBuffer:!0,this.generateMipmaps=!0,this.shareDepthFrom=null},THREE.WebGLRenderTarget.prototype={constructor:THREE.WebGLRenderTarget,setSize:function(a,b){this.width=a,this.height=b},clone:function(){var a=new THREE.WebGLRenderTarget(this.width,this.height);return a.wrapS=this.wrapS,a.wrapT=this.wrapT,a.magFilter=this.magFilter,a.minFilter=this.minFilter,a.anisotropy=this.anisotropy,a.offset.copy(this.offset),a.repeat.copy(this.repeat),a.format=this.format,a.type=this.type,a.depthBuffer=this.depthBuffer,a.stencilBuffer=this.stencilBuffer,a.generateMipmaps=this.generateMipmaps,a.shareDepthFrom=this.shareDepthFrom,a},dispose:function(){this.dispatchEvent({type:"dispose"})}},THREE.EventDispatcher.prototype.apply(THREE.WebGLRenderTarget.prototype),
// File:src/renderers/WebGLRenderTargetCube.js
/**
 * @author alteredq / http://alteredqualia.com
 */
THREE.WebGLRenderTargetCube=function(a,b,c){THREE.WebGLRenderTarget.call(this,a,b,c),this.activeCubeFace=0},THREE.WebGLRenderTargetCube.prototype=Object.create(THREE.WebGLRenderTarget.prototype),
// File:src/renderers/webgl/WebGLProgram.js
THREE.WebGLProgram=function(){var a=0,b=function(a){var b,c,d=[];for(var e in a)b=a[e],b!==!1&&(c="#define "+e+" "+b,d.push(c));return d.join("\n")},c=function(a,b,c){for(var d={},e=0,f=c.length;f>e;e++){var g=c[e];d[g]=a.getUniformLocation(b,g)}return d},d=function(a,b,c){for(var d={},e=0,f=c.length;f>e;e++){var g=c[e];d[g]=a.getAttribLocation(b,g)}return d};return function(e,f,g,h){var i=e,j=i.context,k=g.defines,l=g.__webglShader.uniforms,m=g.attributes,n=g.__webglShader.vertexShader,o=g.__webglShader.fragmentShader,p=g.index0AttributeName;void 0===p&&h.morphTargets===!0&&(
// programs with morphTargets displace position out of attribute 0
p="position");var q="SHADOWMAP_TYPE_BASIC";h.shadowMapType===THREE.PCFShadowMap?q="SHADOWMAP_TYPE_PCF":h.shadowMapType===THREE.PCFSoftShadowMap&&(q="SHADOWMAP_TYPE_PCF_SOFT");
// console.log( "building new program " );
//
var r,s,t=b(k),u=j.createProgram();g instanceof THREE.RawShaderMaterial?(r="",s=""):(r=["precision "+h.precision+" float;","precision "+h.precision+" int;",t,h.supportsVertexTextures?"#define VERTEX_TEXTURES":"",i.gammaInput?"#define GAMMA_INPUT":"",i.gammaOutput?"#define GAMMA_OUTPUT":"","#define MAX_DIR_LIGHTS "+h.maxDirLights,"#define MAX_POINT_LIGHTS "+h.maxPointLights,"#define MAX_SPOT_LIGHTS "+h.maxSpotLights,"#define MAX_HEMI_LIGHTS "+h.maxHemiLights,"#define MAX_SHADOWS "+h.maxShadows,"#define MAX_BONES "+h.maxBones,h.map?"#define USE_MAP":"",h.envMap?"#define USE_ENVMAP":"",h.lightMap?"#define USE_LIGHTMAP":"",h.bumpMap?"#define USE_BUMPMAP":"",h.normalMap?"#define USE_NORMALMAP":"",h.specularMap?"#define USE_SPECULARMAP":"",h.alphaMap?"#define USE_ALPHAMAP":"",h.vertexColors?"#define USE_COLOR":"",h.skinning?"#define USE_SKINNING":"",h.useVertexTexture?"#define BONE_TEXTURE":"",h.morphTargets?"#define USE_MORPHTARGETS":"",h.morphNormals?"#define USE_MORPHNORMALS":"",h.wrapAround?"#define WRAP_AROUND":"",h.doubleSided?"#define DOUBLE_SIDED":"",h.flipSided?"#define FLIP_SIDED":"",h.shadowMapEnabled?"#define USE_SHADOWMAP":"",h.shadowMapEnabled?"#define "+q:"",h.shadowMapDebug?"#define SHADOWMAP_DEBUG":"",h.shadowMapCascade?"#define SHADOWMAP_CASCADE":"",h.sizeAttenuation?"#define USE_SIZEATTENUATION":"",h.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",
//_this._glExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
h.logarithmicDepthBuffer&&j.getExtension("EXT_frag_depth")?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","attribute vec2 uv2;","#ifdef USE_COLOR","	attribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",""].join("\n"),s=["precision "+h.precision+" float;","precision "+h.precision+" int;",h.bumpMap||h.normalMap?"#extension GL_OES_standard_derivatives : enable":"",t,"#define MAX_DIR_LIGHTS "+h.maxDirLights,"#define MAX_POINT_LIGHTS "+h.maxPointLights,"#define MAX_SPOT_LIGHTS "+h.maxSpotLights,"#define MAX_HEMI_LIGHTS "+h.maxHemiLights,"#define MAX_SHADOWS "+h.maxShadows,h.alphaTest?"#define ALPHATEST "+h.alphaTest:"",i.gammaInput?"#define GAMMA_INPUT":"",i.gammaOutput?"#define GAMMA_OUTPUT":"",h.useFog&&h.fog?"#define USE_FOG":"",h.useFog&&h.fogExp?"#define FOG_EXP2":"",h.map?"#define USE_MAP":"",h.envMap?"#define USE_ENVMAP":"",h.lightMap?"#define USE_LIGHTMAP":"",h.bumpMap?"#define USE_BUMPMAP":"",h.normalMap?"#define USE_NORMALMAP":"",h.specularMap?"#define USE_SPECULARMAP":"",h.alphaMap?"#define USE_ALPHAMAP":"",h.vertexColors?"#define USE_COLOR":"",h.metal?"#define METAL":"",h.wrapAround?"#define WRAP_AROUND":"",h.doubleSided?"#define DOUBLE_SIDED":"",h.flipSided?"#define FLIP_SIDED":"",h.shadowMapEnabled?"#define USE_SHADOWMAP":"",h.shadowMapEnabled?"#define "+q:"",h.shadowMapDebug?"#define SHADOWMAP_DEBUG":"",h.shadowMapCascade?"#define SHADOWMAP_CASCADE":"",h.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",
//_this._glExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
h.logarithmicDepthBuffer&&j.getExtension("EXT_frag_depth")?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;",""].join("\n"));var v=new THREE.WebGLShader(j,j.VERTEX_SHADER,r+n),w=new THREE.WebGLShader(j,j.FRAGMENT_SHADER,s+o);j.attachShader(u,v),j.attachShader(u,w),void 0!==p&&
// Force a particular attribute to index 0.
// because potentially expensive emulation is done by browser if attribute 0 is disabled.
// And, color, for example is often automatically bound to index 0 so disabling it
j.bindAttribLocation(u,0,p),j.linkProgram(u),j.getProgramParameter(u,j.LINK_STATUS)===!1&&(console.error("THREE.WebGLProgram: Could not initialise shader."),console.error("gl.VALIDATE_STATUS",j.getProgramParameter(u,j.VALIDATE_STATUS)),console.error("gl.getError()",j.getError())),""!==j.getProgramInfoLog(u)&&console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",j.getProgramInfoLog(u)),
// clean up
j.deleteShader(v),j.deleteShader(w);
// cache uniform locations
var x=["viewMatrix","modelViewMatrix","projectionMatrix","normalMatrix","modelMatrix","cameraPosition","morphTargetInfluences","bindMatrix","bindMatrixInverse"];h.useVertexTexture?(x.push("boneTexture"),x.push("boneTextureWidth"),x.push("boneTextureHeight")):x.push("boneGlobalMatrices"),h.logarithmicDepthBuffer&&x.push("logDepthBufFC");for(var y in l)x.push(y);this.uniforms=c(j,u,x),
// cache attributes locations
x=["position","normal","uv","uv2","tangent","color","skinIndex","skinWeight","lineDistance"];for(var z=0;z<h.maxMorphTargets;z++)x.push("morphTarget"+z);for(var z=0;z<h.maxMorphNormals;z++)x.push("morphNormal"+z);for(var A in m)x.push(A);
//
return this.attributes=d(j,u,x),this.id=a++,this.code=f,this.usedTimes=1,this.program=u,this.vertexShader=v,this.fragmentShader=w,this}}(),
// File:src/renderers/webgl/WebGLShader.js
THREE.WebGLShader=function(){var a=function(a){for(var b=a.split("\n"),c=0;c<b.length;c++)b[c]=c+1+": "+b[c];return b.join("\n")};return function(b,c,d){var e=b.createShader(c);
// --enable-privileged-webgl-extension
// console.log( type, gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );
return b.shaderSource(e,d),b.compileShader(e),b.getShaderParameter(e,b.COMPILE_STATUS)===!1&&console.error("THREE.WebGLShader: Shader couldn't compile."),""!==b.getShaderInfoLog(e)&&(console.warn("THREE.WebGLShader: gl.getShaderInfoLog()",b.getShaderInfoLog(e)),console.warn(a(d))),e}}(),
// File:src/renderers/renderables/RenderableVertex.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.RenderableVertex=function(){this.position=new THREE.Vector3,this.positionWorld=new THREE.Vector3,this.positionScreen=new THREE.Vector4,this.visible=!0},THREE.RenderableVertex.prototype.copy=function(a){this.positionWorld.copy(a.positionWorld),this.positionScreen.copy(a.positionScreen)},
// File:src/renderers/renderables/RenderableFace.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.RenderableFace=function(){this.id=0,this.v1=new THREE.RenderableVertex,this.v2=new THREE.RenderableVertex,this.v3=new THREE.RenderableVertex,this.normalModel=new THREE.Vector3,this.vertexNormalsModel=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3],this.vertexNormalsLength=0,this.color=new THREE.Color,this.material=null,this.uvs=[new THREE.Vector2,new THREE.Vector2,new THREE.Vector2],this.z=0},
// File:src/renderers/renderables/RenderableObject.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.RenderableObject=function(){this.id=0,this.object=null,this.z=0},
// File:src/renderers/renderables/RenderableSprite.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.RenderableSprite=function(){this.id=0,this.object=null,this.x=0,this.y=0,this.z=0,this.rotation=0,this.scale=new THREE.Vector2,this.material=null},
// File:src/renderers/renderables/RenderableLine.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.RenderableLine=function(){this.id=0,this.v1=new THREE.RenderableVertex,this.v2=new THREE.RenderableVertex,this.vertexColors=[new THREE.Color,new THREE.Color],this.material=null,this.z=0},
// File:src/extras/GeometryUtils.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.GeometryUtils={merge:function(a,b,c){console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");var d;b instanceof THREE.Mesh&&(b.matrixAutoUpdate&&b.updateMatrix(),d=b.matrix,b=b.geometry),a.merge(b,d,c)},center:function(a){return console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead."),a.center()}},
// File:src/extras/ImageUtils.js
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author Daosheng Mu / https://github.com/DaoshengMu/
 */
THREE.ImageUtils={crossOrigin:void 0,loadTexture:function(a,b,c,d){var e=new THREE.ImageLoader;e.crossOrigin=this.crossOrigin;var f=new THREE.Texture(void 0,b);return e.load(a,function(a){f.image=a,f.needsUpdate=!0,c&&c(f)},void 0,function(a){d&&d(a)}),f.sourceFile=a,f},loadTextureCube:function(a,b,c,d){var e=[],f=new THREE.ImageLoader;f.crossOrigin=this.crossOrigin;var g=new THREE.CubeTexture(e,b);
// no flipping needed for cube textures
g.flipY=!1;for(var h=0,i=function(b){f.load(a[b],function(a){g.images[b]=a,h+=1,6===h&&(g.needsUpdate=!0,c&&c(g))})},j=0,k=a.length;k>j;++j)i(j);return g},loadCompressedTexture:function(){console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")},loadCompressedTextureCube:function(){console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")},getNormalMap:function(a,b){
// Adapted from http://www.paulbrunt.co.uk/lab/heightnormal/
var c=function(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]},d=function(a,b){return[a[0]-b[0],a[1]-b[1],a[2]-b[2]]},e=function(a){var b=Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);return[a[0]/b,a[1]/b,a[2]/b]};b=1|b;var f=a.width,g=a.height,h=document.createElement("canvas");h.width=f,h.height=g;var i=h.getContext("2d");i.drawImage(a,0,0);for(var j=i.getImageData(0,0,f,g).data,k=i.createImageData(f,g),l=k.data,m=0;f>m;m++)for(var n=0;g>n;n++){var o=0>n-1?0:n-1,p=n+1>g-1?g-1:n+1,q=0>m-1?0:m-1,r=m+1>f-1?f-1:m+1,s=[],t=[0,0,j[4*(n*f+m)]/255*b];s.push([-1,0,j[4*(n*f+q)]/255*b]),s.push([-1,-1,j[4*(o*f+q)]/255*b]),s.push([0,-1,j[4*(o*f+m)]/255*b]),s.push([1,-1,j[4*(o*f+r)]/255*b]),s.push([1,0,j[4*(n*f+r)]/255*b]),s.push([1,1,j[4*(p*f+r)]/255*b]),s.push([0,1,j[4*(p*f+m)]/255*b]),s.push([-1,1,j[4*(p*f+q)]/255*b]);for(var u=[],v=s.length,w=0;v>w;w++){var x=s[w],y=s[(w+1)%v];x=d(x,t),y=d(y,t),u.push(e(c(x,y)))}for(var z=[0,0,0],w=0;w<u.length;w++)z[0]+=u[w][0],z[1]+=u[w][1],z[2]+=u[w][2];z[0]/=u.length,z[1]/=u.length,z[2]/=u.length;var A=4*(n*f+m);l[A]=(z[0]+1)/2*255|0,l[A+1]=(z[1]+1)/2*255|0,l[A+2]=255*z[2]|0,l[A+3]=255}return i.putImageData(k,0,0),h},generateDataTexture:function(a,b,c){for(var d=a*b,e=new Uint8Array(3*d),f=Math.floor(255*c.r),g=Math.floor(255*c.g),h=Math.floor(255*c.b),i=0;d>i;i++)e[3*i]=f,e[3*i+1]=g,e[3*i+2]=h;var j=new THREE.DataTexture(e,a,b,THREE.RGBFormat);return j.needsUpdate=!0,j}},
// File:src/extras/SceneUtils.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.SceneUtils={createMultiMaterialObject:function(a,b){for(var c=new THREE.Object3D,d=0,e=b.length;e>d;d++)c.add(new THREE.Mesh(a,b[d]));return c},detach:function(a,b,c){a.applyMatrix(b.matrixWorld),b.remove(a),c.add(a)},attach:function(a,b,c){var d=new THREE.Matrix4;d.getInverse(c.matrixWorld),a.applyMatrix(d),b.remove(a),c.add(a)}},
// File:src/extras/FontUtils.js
/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author alteredq / http://alteredqualia.com/
 *
 * For Text operations in three.js (See TextGeometry)
 *
 * It uses techniques used in:
 *
 * 	typeface.js and canvastext
 * 		For converting fonts and rendering with javascript
 *		http://typeface.neocracy.org
 *
 *	Triangulation ported from AS3
 *		Simple Polygon Triangulation
 *		http://actionsnippet.com/?p=1462
 *
 * 	A Method to triangulate shapes with holes
 *		http://www.sakri.net/blog/2009/06/12/an-approach-to-triangulating-polygons-with-holes/
 *
 */
THREE.FontUtils={faces:{},
// Just for now. face[weight][style]
face:"helvetiker",weight:"normal",style:"normal",size:150,divisions:10,getFace:function(){try{return this.faces[this.face][this.weight][this.style]}catch(a){throw"The font "+this.face+" with "+this.weight+" weight and "+this.style+" style is missing."}},loadFace:function(a){var b=a.familyName.toLowerCase(),c=this;c.faces[b]=c.faces[b]||{},c.faces[b][a.cssFontWeight]=c.faces[b][a.cssFontWeight]||{},c.faces[b][a.cssFontWeight][a.cssFontStyle]=a;c.faces[b][a.cssFontWeight][a.cssFontStyle]=a;return a},drawText:function(a){var b,c=this.getFace(),d=this.size/c.resolution,e=0,f=String(a).split(""),g=f.length,h=[];for(b=0;g>b;b++){var i=new THREE.Path,j=this.extractGlyphPoints(f[b],c,d,e,i);e+=j.offset,h.push(j.path)}
// get the width
var k=e/2;
//
// for ( p = 0; p < allPts.length; p++ ) {
//
// 	allPts[ p ].x -= width;
//
// }
//var extract = this.extractPoints( allPts, characterPts );
//extract.contour = allPts;
//extract.paths = fontPaths;
//extract.offset = width;
return{paths:h,offset:k}},extractGlyphPoints:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y=[],z=b.glyphs[a]||b.glyphs["?"];if(z){if(z.o)for(i=z._cachedOutline||(z._cachedOutline=z.o.split(" ")),k=i.length,l=c,m=c,f=0;k>f;)
//console.log( action );
switch(j=i[f++]){case"m":
// Move To
n=i[f++]*l+d,o=i[f++]*m,e.moveTo(n,o);break;case"l":
// Line To
n=i[f++]*l+d,o=i[f++]*m,e.lineTo(n,o);break;case"q":if(
// QuadraticCurveTo
p=i[f++]*l+d,q=i[f++]*m,t=i[f++]*l+d,u=i[f++]*m,e.quadraticCurveTo(t,u,p,q),x=y[y.length-1])for(r=x.x,s=x.y,g=1,h=this.divisions;h>=g;g++){var A=g/h;THREE.Shape.Utils.b2(A,r,t,p),THREE.Shape.Utils.b2(A,s,u,q)}break;case"b":if(
// Cubic Bezier Curve
p=i[f++]*l+d,q=i[f++]*m,t=i[f++]*l+d,u=i[f++]*m,v=i[f++]*l+d,w=i[f++]*m,e.bezierCurveTo(t,u,v,w,p,q),x=y[y.length-1])for(r=x.x,s=x.y,g=1,h=this.divisions;h>=g;g++){var A=g/h;THREE.Shape.Utils.b3(A,r,t,v,p),THREE.Shape.Utils.b3(A,s,u,w,q)}}return{offset:z.ha*c,path:e}}}},THREE.FontUtils.generateShapes=function(a,b){
// Parameters 
b=b||{};var c=void 0!==b.size?b.size:100,d=void 0!==b.curveSegments?b.curveSegments:4,e=void 0!==b.font?b.font:"helvetiker",f=void 0!==b.weight?b.weight:"normal",g=void 0!==b.style?b.style:"normal";THREE.FontUtils.size=c,THREE.FontUtils.divisions=d,THREE.FontUtils.face=e,THREE.FontUtils.weight=f,THREE.FontUtils.style=g;for(var h=THREE.FontUtils.drawText(a),i=h.paths,j=[],k=0,l=i.length;l>k;k++)Array.prototype.push.apply(j,i[k].toShapes());return j},/**
 * This code is a quick port of code written in C++ which was submitted to
 * flipcode.com by John W. Ratcliff  // July 22, 2000
 * See original code and more information here:
 * http://www.flipcode.com/archives/Efficient_Polygon_Triangulation.shtml
 *
 * ported to actionscript by Zevan Rosser
 * www.actionsnippet.com
 *
 * ported to javascript by Joshua Koo
 * http://www.lab4games.net/zz85/blog
 *
 */
function(a){var b=1e-10,c=function(a,b){var c=a.length;if(3>c)return null;var f,g,h,i=[],j=[],k=[];if(d(a)>0)for(g=0;c>g;g++)j[g]=g;else for(g=0;c>g;g++)j[g]=c-1-g;var l=c,m=2*l;/* error detection */
for(g=l-1;l>2;){/* if we loop, it is probably a non-simple polygon */
if(m--<=0)
//** Triangulate: ERROR - probable bad polygon!
//throw ( "Warning, unable to triangulate polygon!" );
//return null;
// Sometimes warning is fine, especially polygons are triangulated in reverse.
return console.log("Warning, unable to triangulate polygon!"),b?k:i;/* next     */
if(/* three consecutive vertices in current polygon, <u,v,w> */
f=g,f>=l&&(f=0),/* previous */
g=f+1,g>=l&&(g=0),/* new v    */
h=g+1,h>=l&&(h=0),e(a,f,g,h,l,j)){var n,o,p,q,r;/* remove v from the remaining polygon */
for(/* true names of the vertices */
n=j[f],o=j[g],p=j[h],/* output Triangle */
i.push([a[n],a[o],a[p]]),k.push([j[f],j[g],j[h]]),q=g,r=g+1;l>r;q++,r++)j[q]=j[r];l--,/* reset error detection counter */
m=2*l}}return b?k:i},d=function(a){for(var b=a.length,c=0,d=b-1,e=0;b>e;d=e++)c+=a[d].x*a[e].y-a[e].x*a[d].y;return.5*c},e=function(a,c,d,e,f,g){var h,i,j,k,l,m,n,o,p;if(i=a[g[c]].x,j=a[g[c]].y,k=a[g[d]].x,l=a[g[d]].y,m=a[g[e]].x,n=a[g[e]].y,b>(k-i)*(n-j)-(l-j)*(m-i))return!1;var q,r,s,t,u,v,w,x,y,z,A,B,C,D,E;for(q=m-k,r=n-l,s=i-m,t=j-n,u=k-i,v=l-j,h=0;f>h;h++)if(o=a[g[h]].x,p=a[g[h]].y,!(o===i&&p===j||o===k&&p===l||o===m&&p===n)&&(w=o-i,x=p-j,y=o-k,z=p-l,A=o-m,B=p-n,
// see if p is inside triangle abc
E=q*z-r*y,C=u*x-v*w,D=s*B-t*A,E>=-b&&D>=-b&&C>=-b))return!1;return!0};return a.Triangulate=c,a.Triangulate.area=d,a}(THREE.FontUtils),
// To use the typeface.js face files, hook up the API
self._typeface_js={faces:THREE.FontUtils.faces,loadFace:THREE.FontUtils.loadFace},THREE.typeface_js=self._typeface_js,
// File:src/extras/core/Curve.js
/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Extensible curve object
 *
 * Some common of Curve methods
 * .getPoint(t), getTangent(t)
 * .getPointAt(u), getTagentAt(u)
 * .getPoints(), .getSpacedPoints()
 * .getLength()
 * .updateArcLengths()
 *
 * This following classes subclasses THREE.Curve:
 *
 * -- 2d classes --
 * THREE.LineCurve
 * THREE.QuadraticBezierCurve
 * THREE.CubicBezierCurve
 * THREE.SplineCurve
 * THREE.ArcCurve
 * THREE.EllipseCurve
 *
 * -- 3d classes --
 * THREE.LineCurve3
 * THREE.QuadraticBezierCurve3
 * THREE.CubicBezierCurve3
 * THREE.SplineCurve3
 * THREE.ClosedSplineCurve3
 *
 * A series of curves can be represented as a THREE.CurvePath
 *
 **/
/**************************************************************
 *	Abstract Curve base class
 **************************************************************/
THREE.Curve=function(){},
// Virtual base class method to overwrite and implement in subclasses
//	- t [0 .. 1]
THREE.Curve.prototype.getPoint=function(a){return console.log("Warning, getPoint() not implemented!"),null},
// Get point at relative position in curve according to arc length
// - u [0 .. 1]
THREE.Curve.prototype.getPointAt=function(a){var b=this.getUtoTmapping(a);return this.getPoint(b)},
// Get sequence of points using getPoint( t )
THREE.Curve.prototype.getPoints=function(a){a||(a=5);var b,c=[];for(b=0;a>=b;b++)c.push(this.getPoint(b/a));return c},
// Get sequence of points using getPointAt( u )
THREE.Curve.prototype.getSpacedPoints=function(a){a||(a=5);var b,c=[];for(b=0;a>=b;b++)c.push(this.getPointAt(b/a));return c},
// Get total curve arc length
THREE.Curve.prototype.getLength=function(){var a=this.getLengths();return a[a.length-1]},
// Get list of cumulative segment lengths
THREE.Curve.prototype.getLengths=function(a){if(a||(a=this.__arcLengthDivisions?this.__arcLengthDivisions:200),this.cacheArcLengths&&this.cacheArcLengths.length==a+1&&!this.needsUpdate)
//console.log( "cached", this.cacheArcLengths );
return this.cacheArcLengths;this.needsUpdate=!1;var b,c,d=[],e=this.getPoint(0),f=0;for(d.push(0),c=1;a>=c;c++)b=this.getPoint(c/a),f+=b.distanceTo(e),d.push(f),e=b;return this.cacheArcLengths=d,d},THREE.Curve.prototype.updateArcLengths=function(){this.needsUpdate=!0,this.getLengths()},
// Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equi distance
THREE.Curve.prototype.getUtoTmapping=function(a,b){var c,d=this.getLengths(),e=0,f=d.length;// The targeted u distance value to get
c=b?b:a*d[f-1];for(
//var time = Date.now();
// binary search for the index with largest value smaller than target u distance
var g,h=0,i=f-1;i>=h;)if(e=Math.floor(h+(i-h)/2),// less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats
g=d[e]-c,0>g)h=e+1;else{if(!(g>0)){i=e;break}i=e-1}
//console.log('b' , i, low, high, Date.now()- time);
if(e=i,d[e]==c){var j=e/(f-1);return j}
// we could get finer grain at lengths, or use simple interpolatation between two points
var k=d[e],l=d[e+1],m=l-k,n=(c-k)/m,j=(e+n)/(f-1);return j},
// Returns a unit vector tangent at t
// In case any sub curve does not implement its tangent derivation,
// 2 points a small delta apart will be used to find its gradient
// which seems to give a reasonable approximation
THREE.Curve.prototype.getTangent=function(a){var b=1e-4,c=a-b,d=a+b;
// Capping in case of danger
0>c&&(c=0),d>1&&(d=1);var e=this.getPoint(c),f=this.getPoint(d),g=f.clone().sub(e);return g.normalize()},THREE.Curve.prototype.getTangentAt=function(a){var b=this.getUtoTmapping(a);return this.getTangent(b)},/**************************************************************
 *	Utils
 **************************************************************/
THREE.Curve.Utils={tangentQuadraticBezier:function(a,b,c,d){return 2*(1-a)*(c-b)+2*a*(d-c)},
// Puay Bing, thanks for helping with this derivative!
tangentCubicBezier:function(a,b,c,d,e){return-3*b*(1-a)*(1-a)+3*c*(1-a)*(1-a)-6*a*c*(1-a)+6*a*d*(1-a)-3*a*a*d+3*a*a*e},tangentSpline:function(a,b,c,d,e){
// To check if my formulas are correct
var f=6*a*a-6*a,g=3*a*a-4*a+1,h=-6*a*a+6*a,i=3*a*a-2*a;// t3 − t2
return f+g+h+i},
// Catmull-Rom
interpolate:function(a,b,c,d,e){var f=.5*(c-a),g=.5*(d-b),h=e*e,i=e*h;return(2*b-2*c+f+g)*i+(-3*b+3*c-2*f-g)*h+f*e+b}},
// TODO: Transformation for Curves?
/**************************************************************
 *	3D Curves
 **************************************************************/
// A Factory method for creating new curve subclasses
THREE.Curve.create=function(a,b){return a.prototype=Object.create(THREE.Curve.prototype),a.prototype.getPoint=b,a},
// File:src/extras/core/CurvePath.js
/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 *
 **/
/**************************************************************
 *	Curved Path - a curve path is simply a array of connected
 *  curves, but retains the api of a curve
 **************************************************************/
THREE.CurvePath=function(){this.curves=[],this.bends=[],this.autoClose=!1},THREE.CurvePath.prototype=Object.create(THREE.Curve.prototype),THREE.CurvePath.prototype.add=function(a){this.curves.push(a)},THREE.CurvePath.prototype.checkConnection=function(){},THREE.CurvePath.prototype.closePath=function(){
// TODO Test
// and verify for vector3 (needs to implement equals)
// Add a line curve if start and end of lines are not connected
var a=this.curves[0].getPoint(0),b=this.curves[this.curves.length-1].getPoint(1);a.equals(b)||this.curves.push(new THREE.LineCurve(b,a))},
// To get accurate point with reference to
// entire path distance at time t,
// following has to be done:
// 1. Length of each sub path have to be known
// 2. Locate and identify type of curve
// 3. Get t for the curve
// 4. Return curve.getPointAt(t')
THREE.CurvePath.prototype.getPoint=function(a){
// To think about boundaries points.
for(var b,c,d=a*this.getLength(),e=this.getCurveLengths(),f=0;f<e.length;){if(e[f]>=d){b=e[f]-d,c=this.curves[f];var g=1-b/c.getLength();return c.getPointAt(g)}f++}return null},/*
THREE.CurvePath.prototype.getTangent = function( t ) {
};*/
// We cannot use the default THREE.Curve getPoint() with getLength() because in
// THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
// getPoint() depends on getLength
THREE.CurvePath.prototype.getLength=function(){var a=this.getCurveLengths();return a[a.length-1]},
// Compute lengths and cache them
// We cannot overwrite getLengths() because UtoT mapping uses it.
THREE.CurvePath.prototype.getCurveLengths=function(){
// We use cache values if curves and cache array are same length
if(this.cacheLengths&&this.cacheLengths.length==this.curves.length)return this.cacheLengths;
// Get length of subsurve
// Push sums into cached array
var a,b=[],c=0,d=this.curves.length;for(a=0;d>a;a++)c+=this.curves[a].getLength(),b.push(c);return this.cacheLengths=b,b},
// Returns min and max coordinates
THREE.CurvePath.prototype.getBoundingBox=function(){var a,b,c,d,e,f,g=this.getPoints();a=b=Number.NEGATIVE_INFINITY,d=e=Number.POSITIVE_INFINITY;var h,i,j,k,l=g[0]instanceof THREE.Vector3;for(k=l?new THREE.Vector3:new THREE.Vector2,i=0,j=g.length;j>i;i++)h=g[i],h.x>a?a=h.x:h.x<d&&(d=h.x),h.y>b?b=h.y:h.y<e&&(e=h.y),l&&(h.z>c?c=h.z:h.z<f&&(f=h.z)),k.add(h);var m={minX:d,minY:e,maxX:a,maxY:b};return l&&(m.maxZ=c,m.minZ=f),m},/**************************************************************
 *	Create Geometries Helpers
 **************************************************************/
/// Generate geometry from path points (for Line or Points objects)
THREE.CurvePath.prototype.createPointsGeometry=function(a){var b=this.getPoints(a,!0);return this.createGeometry(b)},
// Generate geometry from equidistance sampling along the path
THREE.CurvePath.prototype.createSpacedPointsGeometry=function(a){var b=this.getSpacedPoints(a,!0);return this.createGeometry(b)},THREE.CurvePath.prototype.createGeometry=function(a){for(var b=new THREE.Geometry,c=0;c<a.length;c++)b.vertices.push(new THREE.Vector3(a[c].x,a[c].y,a[c].z||0));return b},/**************************************************************
 *	Bend / Wrap Helper Methods
 **************************************************************/
// Wrap path / Bend modifiers?
THREE.CurvePath.prototype.addWrapPath=function(a){this.bends.push(a)},THREE.CurvePath.prototype.getTransformedPoints=function(a,b){var c,d,e=this.getPoints(a);for(b||(b=this.bends),c=0,d=b.length;d>c;c++)e=this.getWrapPoints(e,b[c]);return e},THREE.CurvePath.prototype.getTransformedSpacedPoints=function(a,b){var c,d,e=this.getSpacedPoints(a);for(b||(b=this.bends),c=0,d=b.length;d>c;c++)e=this.getWrapPoints(e,b[c]);return e},
// This returns getPoints() bend/wrapped around the contour of a path.
// Read http://www.planetclegg.com/projects/WarpingTextToSplines.html
THREE.CurvePath.prototype.getWrapPoints=function(a,b){var c,d,e,f,g,h,i=this.getBoundingBox();for(c=0,d=a.length;d>c;c++){e=a[c],f=e.x,g=e.y,h=f/i.maxX,
// If using actual distance, for length > path, requires line extrusions
//xNorm = path.getUtoTmapping(xNorm, oldX); // 3 styles. 1) wrap stretched. 2) wrap stretch by arc length 3) warp by actual distance
h=b.getUtoTmapping(h,f);
// check for out of bounds?
var j=b.getPoint(h),k=b.getTangent(h);k.set(-k.y,k.x).multiplyScalar(g),e.x=j.x+k.x,e.y=j.y+k.y}return a},
// File:src/extras/core/Gyroscope.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.Gyroscope=function(){THREE.Object3D.call(this)},THREE.Gyroscope.prototype=Object.create(THREE.Object3D.prototype),THREE.Gyroscope.prototype.updateMatrixWorld=function(a){this.matrixAutoUpdate&&this.updateMatrix(),
// update matrixWorld
(this.matrixWorldNeedsUpdate||a)&&(this.parent?(this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorld.decompose(this.translationWorld,this.quaternionWorld,this.scaleWorld),this.matrix.decompose(this.translationObject,this.quaternionObject,this.scaleObject),this.matrixWorld.compose(this.translationWorld,this.quaternionObject,this.scaleWorld)):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,a=!0);
// update children
for(var b=0,c=this.children.length;c>b;b++)this.children[b].updateMatrixWorld(a)},THREE.Gyroscope.prototype.translationWorld=new THREE.Vector3,THREE.Gyroscope.prototype.translationObject=new THREE.Vector3,THREE.Gyroscope.prototype.quaternionWorld=new THREE.Quaternion,THREE.Gyroscope.prototype.quaternionObject=new THREE.Quaternion,THREE.Gyroscope.prototype.scaleWorld=new THREE.Vector3,THREE.Gyroscope.prototype.scaleObject=new THREE.Vector3,
// File:src/extras/core/Path.js
/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Creates free form 2d path using series of points, lines or curves.
 *
 **/
THREE.Path=function(a){THREE.CurvePath.call(this),this.actions=[],a&&this.fromPoints(a)},THREE.Path.prototype=Object.create(THREE.CurvePath.prototype),THREE.PathActions={MOVE_TO:"moveTo",LINE_TO:"lineTo",QUADRATIC_CURVE_TO:"quadraticCurveTo",// Bezier quadratic curve
BEZIER_CURVE_TO:"bezierCurveTo",// Bezier cubic curve
CSPLINE_THRU:"splineThru",// Catmull-rom spline
ARC:"arc",// Circle
ELLIPSE:"ellipse"},
// TODO Clean up PATH API
// Create path using straight lines to connect all points
// - vectors: array of Vector2
THREE.Path.prototype.fromPoints=function(a){this.moveTo(a[0].x,a[0].y);for(var b=1,c=a.length;c>b;b++)this.lineTo(a[b].x,a[b].y)},
// startPath() endPath()?
THREE.Path.prototype.moveTo=function(a,b){var c=Array.prototype.slice.call(arguments);this.actions.push({action:THREE.PathActions.MOVE_TO,args:c})},THREE.Path.prototype.lineTo=function(a,b){var c=Array.prototype.slice.call(arguments),d=this.actions[this.actions.length-1].args,e=d[d.length-2],f=d[d.length-1],g=new THREE.LineCurve(new THREE.Vector2(e,f),new THREE.Vector2(a,b));this.curves.push(g),this.actions.push({action:THREE.PathActions.LINE_TO,args:c})},THREE.Path.prototype.quadraticCurveTo=function(a,b,c,d){var e=Array.prototype.slice.call(arguments),f=this.actions[this.actions.length-1].args,g=f[f.length-2],h=f[f.length-1],i=new THREE.QuadraticBezierCurve(new THREE.Vector2(g,h),new THREE.Vector2(a,b),new THREE.Vector2(c,d));this.curves.push(i),this.actions.push({action:THREE.PathActions.QUADRATIC_CURVE_TO,args:e})},THREE.Path.prototype.bezierCurveTo=function(a,b,c,d,e,f){var g=Array.prototype.slice.call(arguments),h=this.actions[this.actions.length-1].args,i=h[h.length-2],j=h[h.length-1],k=new THREE.CubicBezierCurve(new THREE.Vector2(i,j),new THREE.Vector2(a,b),new THREE.Vector2(c,d),new THREE.Vector2(e,f));this.curves.push(k),this.actions.push({action:THREE.PathActions.BEZIER_CURVE_TO,args:g})},THREE.Path.prototype.splineThru=function(a){var b=Array.prototype.slice.call(arguments),c=this.actions[this.actions.length-1].args,d=c[c.length-2],e=c[c.length-1],f=[new THREE.Vector2(d,e)];Array.prototype.push.apply(f,a);var g=new THREE.SplineCurve(f);this.curves.push(g),this.actions.push({action:THREE.PathActions.CSPLINE_THRU,args:b})},
// FUTURE: Change the API or follow canvas API?
THREE.Path.prototype.arc=function(a,b,c,d,e,f){var g=this.actions[this.actions.length-1].args,h=g[g.length-2],i=g[g.length-1];this.absarc(a+h,b+i,c,d,e,f)},THREE.Path.prototype.absarc=function(a,b,c,d,e,f){this.absellipse(a,b,c,c,d,e,f)},THREE.Path.prototype.ellipse=function(a,b,c,d,e,f,g){var h=this.actions[this.actions.length-1].args,i=h[h.length-2],j=h[h.length-1];this.absellipse(a+i,b+j,c,d,e,f,g)},THREE.Path.prototype.absellipse=function(a,b,c,d,e,f,g){var h=Array.prototype.slice.call(arguments),i=new THREE.EllipseCurve(a,b,c,d,e,f,g);this.curves.push(i);var j=i.getPoint(1);h.push(j.x),h.push(j.y),this.actions.push({action:THREE.PathActions.ELLIPSE,args:h})},THREE.Path.prototype.getSpacedPoints=function(a,b){a||(a=40);for(var c=[],d=0;a>d;d++)c.push(this.getPoint(d/a));
// if ( closedPath ) {
//
// 	points.push( points[ 0 ] );
//
// }
return c},/* Return an array of vectors based on contour of the path */
THREE.Path.prototype.getPoints=function(a,b){if(this.useSpacedPoints)return console.log("tata"),this.getSpacedPoints(a,b);a=a||12;var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u=[];for(c=0,d=this.actions.length;d>c;c++)switch(e=this.actions[c],f=e.action,g=e.args,f){case THREE.PathActions.MOVE_TO:u.push(new THREE.Vector2(g[0],g[1]));break;case THREE.PathActions.LINE_TO:u.push(new THREE.Vector2(g[0],g[1]));break;case THREE.PathActions.QUADRATIC_CURVE_TO:for(h=g[2],i=g[3],l=g[0],m=g[1],u.length>0?(p=u[u.length-1],n=p.x,o=p.y):(p=this.actions[c-1].args,n=p[p.length-2],o=p[p.length-1]),q=1;a>=q;q++)r=q/a,s=THREE.Shape.Utils.b2(r,n,l,h),t=THREE.Shape.Utils.b2(r,o,m,i),u.push(new THREE.Vector2(s,t));break;case THREE.PathActions.BEZIER_CURVE_TO:for(h=g[4],i=g[5],l=g[0],m=g[1],j=g[2],k=g[3],u.length>0?(p=u[u.length-1],n=p.x,o=p.y):(p=this.actions[c-1].args,n=p[p.length-2],o=p[p.length-1]),q=1;a>=q;q++)r=q/a,s=THREE.Shape.Utils.b3(r,n,l,j,h),t=THREE.Shape.Utils.b3(r,o,m,k,i),u.push(new THREE.Vector2(s,t));break;case THREE.PathActions.CSPLINE_THRU:p=this.actions[c-1].args;var v=new THREE.Vector2(p[p.length-2],p[p.length-1]),w=[v],x=a*g[0].length;w=w.concat(g[0]);var y=new THREE.SplineCurve(w);for(q=1;x>=q;q++)u.push(y.getPointAt(q/x));break;case THREE.PathActions.ARC:var z,A=g[0],B=g[1],C=g[2],D=g[3],E=g[4],F=!!g[5],G=E-D,H=2*a;for(q=1;H>=q;q++)r=q/H,F||(r=1-r),z=D+r*G,s=A+C*Math.cos(z),t=B+C*Math.sin(z),
//console.log('t', t, 'angle', angle, 'tx', tx, 'ty', ty);
u.push(new THREE.Vector2(s,t));
//console.log(points);
break;case THREE.PathActions.ELLIPSE:var z,A=g[0],B=g[1],I=g[2],J=g[3],D=g[4],E=g[5],F=!!g[6],G=E-D,H=2*a;for(q=1;H>=q;q++)r=q/H,F||(r=1-r),z=D+r*G,s=A+I*Math.cos(z),t=B+J*Math.sin(z),
//console.log('t', t, 'angle', angle, 'tx', tx, 'ty', ty);
u.push(new THREE.Vector2(s,t))}
// Normalize to remove the closing point by default.
var K=u[u.length-1],L=1e-10;return Math.abs(K.x-u[0].x)<L&&Math.abs(K.y-u[0].y)<L&&u.splice(u.length-1,1),b&&u.push(u[0]),u},
//
// Breaks path into shapes
//
//	Assumptions (if parameter isCCW==true the opposite holds):
//	- solid shapes are defined clockwise (CW)
//	- holes are defined counterclockwise (CCW)
//
//	If parameter noHoles==true:
//  - all subPaths are regarded as solid shapes
//  - definition order CW/CCW has no relevance
//
THREE.Path.prototype.toShapes=function(a,b){function c(a){var b,c,d,e,f,g=[],h=new THREE.Path;for(b=0,c=a.length;c>b;b++)d=a[b],f=d.args,e=d.action,e==THREE.PathActions.MOVE_TO&&0!=h.actions.length&&(g.push(h),h=new THREE.Path),h[e].apply(h,f);
// console.log(subPaths);
return 0!=h.actions.length&&g.push(h),g}function d(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c],f=new THREE.Shape;f.actions=e.actions,f.curves=e.curves,b.push(f)}
//console.log("shape", shapes);
return b}function e(a,b){for(var c=1e-10,d=b.length,e=!1,f=d-1,g=0;d>g;f=g++){var h=b[f],i=b[g],j=i.x-h.x,k=i.y-h.y;if(Math.abs(k)>c){if(// not parallel
0>k&&(h=b[g],j=-j,i=b[f],k=-k),a.y<h.y||a.y>i.y)continue;if(a.y==h.y){if(a.x==h.x)return!0}else{var l=k*(a.x-h.x)-j*(a.y-h.y);if(0==l)return!0;// inPt is on contour ?
if(0>l)continue;e=!e}}else{// parallel or colinear
if(a.y!=h.y)continue;// parallel
// egde lies on the same horizontal line as inPt
if(i.x<=a.x&&a.x<=h.x||h.x<=a.x&&a.x<=i.x)return!0}}return e}var f=c(this.actions);if(0==f.length)return[];if(b===!0)return d(f);var g,h,i,j=[];if(1==f.length)return h=f[0],i=new THREE.Shape,i.actions=h.actions,i.curves=h.curves,j.push(i),j;var k=!THREE.Shape.Utils.isClockWise(f[0].getPoints());k=a?!k:k;
// console.log("Holes first", holesFirst);
var l,m=[],n=[],o=[],p=0;n[p]=void 0,o[p]=[];var q,r;for(q=0,r=f.length;r>q;q++)h=f[q],l=h.getPoints(),g=THREE.Shape.Utils.isClockWise(l),g=a?!g:g,g?(!k&&n[p]&&p++,n[p]={s:new THREE.Shape,p:l},n[p].s.actions=h.actions,n[p].s.curves=h.curves,k&&p++,o[p]=[]):o[p].push({h:h,p:l[0]});
// only Holes? -> probably all Shapes with wrong orientation
if(!n[0])return d(f);if(n.length>1){for(var s=!1,t=[],u=0,v=n.length;v>u;u++)m[u]=[];for(var u=0,v=n.length;v>u;u++)for(var w=(n[u],o[u]),x=0;x<w.length;x++){for(var y=w[x],z=!0,A=0;A<n.length;A++)e(y.p,n[A].p)&&(u!=A&&t.push({froms:u,tos:A,hole:x}),z?(z=!1,m[A].push(y)):s=!0);z&&m[u].push(y)}
// console.log("ambigious: ", ambigious);
t.length>0&&(
// console.log("to change: ", toChange);
s||(o=m))}var B,C,D;for(q=0,r=n.length;r>q;q++)for(i=n[q].s,j.push(i),B=o[q],C=0,D=B.length;D>C;C++)i.holes.push(B[C].h);
//console.log("shape", shapes);
return j},
// File:src/extras/core/Shape.js
/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Defines a 2d shape plane using paths.
 **/
// STEP 1 Create a path.
// STEP 2 Turn path into shape.
// STEP 3 ExtrudeGeometry takes in Shape/Shapes
// STEP 3a - Extract points from each shape, turn to vertices
// STEP 3b - Triangulate each shape, add faces.
THREE.Shape=function(){THREE.Path.apply(this,arguments),this.holes=[]},THREE.Shape.prototype=Object.create(THREE.Path.prototype),
// Convenience method to return ExtrudeGeometry
THREE.Shape.prototype.extrude=function(a){var b=new THREE.ExtrudeGeometry(this,a);return b},
// Convenience method to return ShapeGeometry
THREE.Shape.prototype.makeGeometry=function(a){var b=new THREE.ShapeGeometry(this,a);return b},
// Get points of holes
THREE.Shape.prototype.getPointsHoles=function(a){var b,c=this.holes.length,d=[];for(b=0;c>b;b++)d[b]=this.holes[b].getTransformedPoints(a,this.bends);return d},
// Get points of holes (spaced by regular distance)
THREE.Shape.prototype.getSpacedPointsHoles=function(a){var b,c=this.holes.length,d=[];for(b=0;c>b;b++)d[b]=this.holes[b].getTransformedSpacedPoints(a,this.bends);return d},
// Get points of shape and holes (keypoints based on segments parameter)
THREE.Shape.prototype.extractAllPoints=function(a){return{shape:this.getTransformedPoints(a),holes:this.getPointsHoles(a)}},THREE.Shape.prototype.extractPoints=function(a){return this.useSpacedPoints?this.extractAllSpacedPoints(a):this.extractAllPoints(a)},
//
// THREE.Shape.prototype.extractAllPointsWithBend = function ( divisions, bend ) {
//
// 	return {
//
// 		shape: this.transform( bend, divisions ),
// 		holes: this.getPointsHoles( divisions, bend )
//
// 	};
//
// };
// Get points of shape and holes (spaced by regular distance)
THREE.Shape.prototype.extractAllSpacedPoints=function(a){return{shape:this.getTransformedSpacedPoints(a),holes:this.getSpacedPointsHoles(a)}},/**************************************************************
 *	Utils
 **************************************************************/
THREE.Shape.Utils={triangulateShape:function(a,b){function c(a,b,c){
// inOtherPt needs to be colinear to the inSegment
// inOtherPt needs to be colinear to the inSegment
return a.x!=b.x?a.x<b.x?a.x<=c.x&&c.x<=b.x:b.x<=c.x&&c.x<=a.x:a.y<b.y?a.y<=c.y&&c.y<=b.y:b.y<=c.y&&c.y<=a.y}function d(a,b,d,e,f){var g=1e-10,h=b.x-a.x,i=b.y-a.y,j=e.x-d.x,k=e.y-d.y,l=a.x-d.x,m=a.y-d.y,n=i*j-h*k,o=i*l-h*m;if(Math.abs(n)>g){// not parallel
var p;if(n>0){if(0>o||o>n)return[];if(p=k*l-j*m,0>p||p>n)return[]}else{if(o>0||n>o)return[];if(p=k*l-j*m,p>0||n>p)return[]}
// i.e. to reduce rounding errors
// intersection at endpoint of segment#1?
if(0==p)return!f||0!=o&&o!=n?[a]:[];if(p==n)return!f||0!=o&&o!=n?[b]:[];
// intersection at endpoint of segment#2?
if(0==o)return[d];if(o==n)return[e];
// return real intersection point
var q=p/n;return[{x:a.x+q*h,y:a.y+q*i}]}// parallel or colinear
if(0!=o||k*l!=j*m)return[];
// they are collinear or degenerate
var r=0==h&&0==i,s=0==j&&0==k;// segment2 ist just a point?
// both segments are points
if(r&&s)return a.x!=d.x||a.y!=d.y?[]:[a];
// segment#1  is a single point
if(r)return c(d,e,a)?[a]:[];
// segment#2  is a single point
if(s)return c(a,b,d)?[d]:[];
// they are collinear segments, which might overlap
var t,u,v,w,x,y,z,A;// the segments are NOT on a vertical line
// the segments are on a vertical line
return 0!=h?(a.x<b.x?(t=a,v=a.x,u=b,w=b.x):(t=b,v=b.x,u=a,w=a.x),d.x<e.x?(x=d,z=d.x,y=e,A=e.x):(x=e,z=e.x,y=d,A=d.x)):(a.y<b.y?(t=a,v=a.y,u=b,w=b.y):(t=b,v=b.y,u=a,w=a.y),d.y<e.y?(x=d,z=d.y,y=e,A=e.y):(x=e,z=e.y,y=d,A=d.y)),z>=v?z>w?[]:w==z?f?[]:[x]:A>=w?[x,u]:[x,y]:v>A?[]:v==A?f?[]:[t]:A>=w?[t,u]:[t,y]}function e(a,b,c,d){
// The order of legs is important
var e=1e-10,f=b.x-a.x,g=b.y-a.y,h=c.x-a.x,i=c.y-a.y,j=d.x-a.x,k=d.y-a.y,l=f*i-g*h,m=f*k-g*j;if(Math.abs(l)>e){// angle != 180 deg.
var n=j*i-k*h;
// console.log( "from2to: " + from2toAngle + ", from2other: " + from2otherAngle + ", other2to: " + other2toAngle );
// console.log( "from2to: " + from2toAngle + ", from2other: " + from2otherAngle + ", other2to: " + other2toAngle );
return l>0?m>=0&&n>=0:m>=0||n>=0}// angle == 180 deg.
// console.log( "from2to: 180 deg., from2other: " + from2otherAngle  );
return m>0}function f(a,b){function c(a,b){
// Check if hole point lies within angle around shape point
var c=s.length-1,d=a-1;0>d&&(d=c);var f=a+1;f>c&&(f=0);var g=e(s[a],s[d],s[f],h[b]);if(!g)
// console.log( "Vertex (Shape): " + inShapeIdx + ", Point: " + hole[inHoleIdx].x + "/" + hole[inHoleIdx].y );
return!1;
// Check if shape point lies within angle around hole point
var i=h.length-1,j=b-1;0>j&&(j=i);var k=b+1;return k>i&&(k=0),g=e(h[b],h[j],h[k],s[a]),g?!0:!1}function f(a,b){
// checks for intersections with shape edges
var c,e,f;for(c=0;c<s.length;c++)if(e=c+1,e%=s.length,f=d(a,b,s[c],s[e],!0),f.length>0)return!0;return!1}function g(a,c){
// checks for intersections with hole edges
var e,f,g,h,i;for(e=0;e<t.length;e++)for(f=b[t[e]],g=0;g<f.length;g++)if(h=g+1,h%=f.length,i=d(a,c,f[g],f[h],!0),i.length>0)return!0;return!1}for(var h,i,j,k,l,m,n,o,p,q,r,s=a.concat(),t=[],u=[],v=0,w=b.length;w>v;v++)t.push(v);for(var x=0,y=2*t.length;t.length>0;){if(y--,0>y){console.log("Infinite Loop! Holes left:"+t.length+", Probably Hole outside Shape!");break}
// search for shape-vertex and hole-vertex,
// which can be connected without intersections
for(j=x;j<s.length;j++){k=s[j],i=-1;
// search for hole which can be reached without intersections
for(var v=0;v<t.length;v++)if(m=t[v],
// prevent multiple checks
n=k.x+":"+k.y+":"+m,void 0===u[n]){h=b[m];for(var z=0;z<h.length;z++)if(l=h[z],c(j,z)&&!f(k,l)&&!g(k,l)){i=z,t.splice(v,1),o=s.slice(0,j+1),p=s.slice(j),q=h.slice(i),r=h.slice(0,i+1),s=o.concat(q).concat(r).concat(p),x=j;
// Debug only, to show the selected cuts
// glob_CutLines.push( [ shapePt, holePt ] );
break}if(i>=0)break;// hole-vertex found
u[n]=!0}if(i>=0)break}}return s}for(var g,h,i,j,k,l,m={},n=a.concat(),o=0,p=b.length;p>o;o++)Array.prototype.push.apply(n,b[o]);
//console.log( "allpoints",allpoints, allpoints.length );
// prepare all points map
for(g=0,h=n.length;h>g;g++)k=n[g].x+":"+n[g].y,void 0!==m[k]&&console.log("Duplicate point",k),m[k]=g;
// remove holes by cutting paths to holes and adding them to the shape
var q=f(a,b),r=THREE.FontUtils.Triangulate(q,!1);// True returns indices for points of spooled shape
//console.log( "triangles",triangles, triangles.length );
// check all face vertices against all points map
for(g=0,h=r.length;h>g;g++)for(j=r[g],i=0;3>i;i++)k=j[i].x+":"+j[i].y,l=m[k],void 0!==l&&(j[i]=l);return r.concat()},isClockWise:function(a){return THREE.FontUtils.Triangulate.area(a)<0},
// Bezier Curves formulas obtained from
// http://en.wikipedia.org/wiki/B%C3%A9zier_curve
// Quad Bezier Functions
b2p0:function(a,b){var c=1-a;return c*c*b},b2p1:function(a,b){return 2*(1-a)*a*b},b2p2:function(a,b){return a*a*b},b2:function(a,b,c,d){return this.b2p0(a,b)+this.b2p1(a,c)+this.b2p2(a,d)},
// Cubic Bezier Functions
b3p0:function(a,b){var c=1-a;return c*c*c*b},b3p1:function(a,b){var c=1-a;return 3*c*c*a*b},b3p2:function(a,b){var c=1-a;return 3*c*a*a*b},b3p3:function(a,b){return a*a*a*b},b3:function(a,b,c,d,e){return this.b3p0(a,b)+this.b3p1(a,c)+this.b3p2(a,d)+this.b3p3(a,e)}},
// File:src/extras/curves/LineCurve.js
/**************************************************************
 *	Line
 **************************************************************/
THREE.LineCurve=function(a,b){this.v1=a,this.v2=b},THREE.LineCurve.prototype=Object.create(THREE.Curve.prototype),THREE.LineCurve.prototype.getPoint=function(a){var b=this.v2.clone().sub(this.v1);return b.multiplyScalar(a).add(this.v1),b},
// Line curve is linear, so we can overwrite default getPointAt
THREE.LineCurve.prototype.getPointAt=function(a){return this.getPoint(a)},THREE.LineCurve.prototype.getTangent=function(a){var b=this.v2.clone().sub(this.v1);return b.normalize()},
// File:src/extras/curves/QuadraticBezierCurve.js
/**************************************************************
 *	Quadratic Bezier curve
 **************************************************************/
THREE.QuadraticBezierCurve=function(a,b,c){this.v0=a,this.v1=b,this.v2=c},THREE.QuadraticBezierCurve.prototype=Object.create(THREE.Curve.prototype),THREE.QuadraticBezierCurve.prototype.getPoint=function(a){var b,c;return b=THREE.Shape.Utils.b2(a,this.v0.x,this.v1.x,this.v2.x),c=THREE.Shape.Utils.b2(a,this.v0.y,this.v1.y,this.v2.y),new THREE.Vector2(b,c)},THREE.QuadraticBezierCurve.prototype.getTangent=function(a){var b,c;b=THREE.Curve.Utils.tangentQuadraticBezier(a,this.v0.x,this.v1.x,this.v2.x),c=THREE.Curve.Utils.tangentQuadraticBezier(a,this.v0.y,this.v1.y,this.v2.y);
// returns unit vector
var d=new THREE.Vector2(b,c);return d.normalize(),d},
// File:src/extras/curves/CubicBezierCurve.js
/**************************************************************
 *	Cubic Bezier curve
 **************************************************************/
THREE.CubicBezierCurve=function(a,b,c,d){this.v0=a,this.v1=b,this.v2=c,this.v3=d},THREE.CubicBezierCurve.prototype=Object.create(THREE.Curve.prototype),THREE.CubicBezierCurve.prototype.getPoint=function(a){var b,c;return b=THREE.Shape.Utils.b3(a,this.v0.x,this.v1.x,this.v2.x,this.v3.x),c=THREE.Shape.Utils.b3(a,this.v0.y,this.v1.y,this.v2.y,this.v3.y),new THREE.Vector2(b,c)},THREE.CubicBezierCurve.prototype.getTangent=function(a){var b,c;b=THREE.Curve.Utils.tangentCubicBezier(a,this.v0.x,this.v1.x,this.v2.x,this.v3.x),c=THREE.Curve.Utils.tangentCubicBezier(a,this.v0.y,this.v1.y,this.v2.y,this.v3.y);var d=new THREE.Vector2(b,c);return d.normalize(),d},
// File:src/extras/curves/SplineCurve.js
/**************************************************************
 *	Spline curve
 **************************************************************/
THREE.SplineCurve=function(a){this.points=void 0==a?[]:a},THREE.SplineCurve.prototype=Object.create(THREE.Curve.prototype),THREE.SplineCurve.prototype.getPoint=function(a){var b,c,d,e=new THREE.Vector2,f=[],g=this.points;return b=(g.length-1)*a,c=Math.floor(b),d=b-c,f[0]=0==c?c:c-1,f[1]=c,f[2]=c>g.length-2?g.length-1:c+1,f[3]=c>g.length-3?g.length-1:c+2,e.x=THREE.Curve.Utils.interpolate(g[f[0]].x,g[f[1]].x,g[f[2]].x,g[f[3]].x,d),e.y=THREE.Curve.Utils.interpolate(g[f[0]].y,g[f[1]].y,g[f[2]].y,g[f[3]].y,d),e},
// File:src/extras/curves/EllipseCurve.js
/**************************************************************
 *	Ellipse curve
 **************************************************************/
THREE.EllipseCurve=function(a,b,c,d,e,f,g){this.aX=a,this.aY=b,this.xRadius=c,this.yRadius=d,this.aStartAngle=e,this.aEndAngle=f,this.aClockwise=g},THREE.EllipseCurve.prototype=Object.create(THREE.Curve.prototype),THREE.EllipseCurve.prototype.getPoint=function(a){var b,c=this.aEndAngle-this.aStartAngle;0>c&&(c+=2*Math.PI),c>2*Math.PI&&(c-=2*Math.PI),b=this.aClockwise===!0?this.aEndAngle+(1-a)*(2*Math.PI-c):this.aStartAngle+a*c;var d=this.aX+this.xRadius*Math.cos(b),e=this.aY+this.yRadius*Math.sin(b);return new THREE.Vector2(d,e)},
// File:src/extras/curves/ArcCurve.js
/**************************************************************
 *	Arc curve
 **************************************************************/
THREE.ArcCurve=function(a,b,c,d,e,f){THREE.EllipseCurve.call(this,a,b,c,c,d,e,f)},THREE.ArcCurve.prototype=Object.create(THREE.EllipseCurve.prototype),
// File:src/extras/curves/LineCurve3.js
/**************************************************************
 *	Line3D
 **************************************************************/
THREE.LineCurve3=THREE.Curve.create(function(a,b){this.v1=a,this.v2=b},function(a){var b=new THREE.Vector3;// diff
return b.subVectors(this.v2,this.v1),b.multiplyScalar(a),b.add(this.v1),b}),
// File:src/extras/curves/QuadraticBezierCurve3.js
/**************************************************************
 *	Quadratic Bezier 3D curve
 **************************************************************/
THREE.QuadraticBezierCurve3=THREE.Curve.create(function(a,b,c){this.v0=a,this.v1=b,this.v2=c},function(a){var b,c,d;return b=THREE.Shape.Utils.b2(a,this.v0.x,this.v1.x,this.v2.x),c=THREE.Shape.Utils.b2(a,this.v0.y,this.v1.y,this.v2.y),d=THREE.Shape.Utils.b2(a,this.v0.z,this.v1.z,this.v2.z),new THREE.Vector3(b,c,d)}),
// File:src/extras/curves/CubicBezierCurve3.js
/**************************************************************
 *	Cubic Bezier 3D curve
 **************************************************************/
THREE.CubicBezierCurve3=THREE.Curve.create(function(a,b,c,d){this.v0=a,this.v1=b,this.v2=c,this.v3=d},function(a){var b,c,d;return b=THREE.Shape.Utils.b3(a,this.v0.x,this.v1.x,this.v2.x,this.v3.x),c=THREE.Shape.Utils.b3(a,this.v0.y,this.v1.y,this.v2.y,this.v3.y),d=THREE.Shape.Utils.b3(a,this.v0.z,this.v1.z,this.v2.z,this.v3.z),new THREE.Vector3(b,c,d)}),
// File:src/extras/curves/SplineCurve3.js
/**************************************************************
 *	Spline 3D curve
 **************************************************************/
THREE.SplineCurve3=THREE.Curve.create(function(a){this.points=void 0==a?[]:a},function(a){var b,c,d,e=new THREE.Vector3,f=[],g=this.points;b=(g.length-1)*a,c=Math.floor(b),d=b-c,f[0]=0==c?c:c-1,f[1]=c,f[2]=c>g.length-2?g.length-1:c+1,f[3]=c>g.length-3?g.length-1:c+2;var h=g[f[0]],i=g[f[1]],j=g[f[2]],k=g[f[3]];return e.x=THREE.Curve.Utils.interpolate(h.x,i.x,j.x,k.x,d),e.y=THREE.Curve.Utils.interpolate(h.y,i.y,j.y,k.y,d),e.z=THREE.Curve.Utils.interpolate(h.z,i.z,j.z,k.z,d),e}),
// THREE.SplineCurve3.prototype.getTangent = function(t) {
// 		var v = new THREE.Vector3();
// 		var c = [];
// 		var points = this.points, point, intPoint, weight;
// 		point = ( points.length - 1 ) * t;
// 		intPoint = Math.floor( point );
// 		weight = point - intPoint;
// 		c[ 0 ] = intPoint == 0 ? intPoint : intPoint - 1;
// 		c[ 1 ] = intPoint;
// 		c[ 2 ] = intPoint  > points.length - 2 ? points.length - 1 : intPoint + 1;
// 		c[ 3 ] = intPoint  > points.length - 3 ? points.length - 1 : intPoint + 2;
// 		var pt0 = points[ c[0] ],
// 			pt1 = points[ c[1] ],
// 			pt2 = points[ c[2] ],
// 			pt3 = points[ c[3] ];
// 	// t = weight;
// 	v.x = THREE.Curve.Utils.tangentSpline( t, pt0.x, pt1.x, pt2.x, pt3.x );
// 	v.y = THREE.Curve.Utils.tangentSpline( t, pt0.y, pt1.y, pt2.y, pt3.y );
// 	v.z = THREE.Curve.Utils.tangentSpline( t, pt0.z, pt1.z, pt2.z, pt3.z );
// 	return v;
// }
// File:src/extras/curves/ClosedSplineCurve3.js
/**************************************************************
 *	Closed Spline 3D curve
 **************************************************************/
THREE.ClosedSplineCurve3=THREE.Curve.create(function(a){this.points=void 0==a?[]:a},function(a){var b,c,d,e=new THREE.Vector3,f=[],g=this.points;
// This needs to be from 0-length +1
return b=(g.length-0)*a,c=Math.floor(b),d=b-c,c+=c>0?0:(Math.floor(Math.abs(c)/g.length)+1)*g.length,f[0]=(c-1)%g.length,f[1]=c%g.length,f[2]=(c+1)%g.length,f[3]=(c+2)%g.length,e.x=THREE.Curve.Utils.interpolate(g[f[0]].x,g[f[1]].x,g[f[2]].x,g[f[3]].x,d),e.y=THREE.Curve.Utils.interpolate(g[f[0]].y,g[f[1]].y,g[f[2]].y,g[f[3]].y,d),e.z=THREE.Curve.Utils.interpolate(g[f[0]].z,g[f[1]].z,g[f[2]].z,g[f[3]].z,d),e}),
// File:src/extras/animation/AnimationHandler.js
/**
 * @author mikael emtinger / http://gomo.se/
 */
THREE.AnimationHandler={LINEAR:0,CATMULLROM:1,CATMULLROM_FORWARD:2,
//
add:function(){console.warn("THREE.AnimationHandler.add() has been deprecated.")},get:function(){console.warn("THREE.AnimationHandler.get() has been deprecated.")},remove:function(){console.warn("THREE.AnimationHandler.remove() has been deprecated.")},
//
animations:[],init:function(a){if(a.initialized!==!0){
// loop through all keys
for(var b=0;b<a.hierarchy.length;b++){for(var c=0;c<a.hierarchy[b].keys.length;c++)
// create quaternions
if(
// remove minus times
a.hierarchy[b].keys[c].time<0&&(a.hierarchy[b].keys[c].time=0),void 0!==a.hierarchy[b].keys[c].rot&&!(a.hierarchy[b].keys[c].rot instanceof THREE.Quaternion)){var d=a.hierarchy[b].keys[c].rot;a.hierarchy[b].keys[c].rot=(new THREE.Quaternion).fromArray(d)}
// prepare morph target keys
if(a.hierarchy[b].keys.length&&void 0!==a.hierarchy[b].keys[0].morphTargets){for(var e={},c=0;c<a.hierarchy[b].keys.length;c++)for(var f=0;f<a.hierarchy[b].keys[c].morphTargets.length;f++){var g=a.hierarchy[b].keys[c].morphTargets[f];e[g]=-1}a.hierarchy[b].usedMorphTargets=e;
// set all used on all frames
for(var c=0;c<a.hierarchy[b].keys.length;c++){var h={};for(var g in e){for(var f=0;f<a.hierarchy[b].keys[c].morphTargets.length;f++)if(a.hierarchy[b].keys[c].morphTargets[f]===g){h[g]=a.hierarchy[b].keys[c].morphTargetsInfluences[f];break}f===a.hierarchy[b].keys[c].morphTargets.length&&(h[g]=0)}a.hierarchy[b].keys[c].morphTargetsInfluences=h}}
// remove all keys that are on the same time
for(var c=1;c<a.hierarchy[b].keys.length;c++)a.hierarchy[b].keys[c].time===a.hierarchy[b].keys[c-1].time&&(a.hierarchy[b].keys.splice(c,1),c--);
// set index
for(var c=0;c<a.hierarchy[b].keys.length;c++)a.hierarchy[b].keys[c].index=c}return a.initialized=!0,a}},parse:function(a){var b=function(a,c){c.push(a);for(var d=0;d<a.children.length;d++)b(a.children[d],c)},c=[];if(a instanceof THREE.SkinnedMesh)for(var d=0;d<a.skeleton.bones.length;d++)c.push(a.skeleton.bones[d]);else b(a,c);return c},play:function(a){-1===this.animations.indexOf(a)&&this.animations.push(a)},stop:function(a){var b=this.animations.indexOf(a);-1!==b&&this.animations.splice(b,1)},update:function(a){for(var b=0;b<this.animations.length;b++)this.animations[b].update(a)}},
// File:src/extras/animation/Animation.js
/**
 * @author mikael emtinger / http://gomo.se/
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.Animation=function(a,b){this.root=a,this.data=THREE.AnimationHandler.init(b),this.hierarchy=THREE.AnimationHandler.parse(a),this.currentTime=0,this.timeScale=1,this.isPlaying=!1,this.loop=!0,this.weight=0,this.interpolationType=THREE.AnimationHandler.LINEAR},THREE.Animation.prototype.keyTypes=["pos","rot","scl"],THREE.Animation.prototype.play=function(a,b){this.currentTime=void 0!==a?a:0,this.weight=void 0!==b?b:1,this.isPlaying=!0,this.reset(),THREE.AnimationHandler.play(this)},THREE.Animation.prototype.stop=function(){this.isPlaying=!1,THREE.AnimationHandler.stop(this)},THREE.Animation.prototype.reset=function(){for(var a=0,b=this.hierarchy.length;b>a;a++){var c=this.hierarchy[a];c.matrixAutoUpdate=!0,void 0===c.animationCache&&(c.animationCache={}),void 0===c.animationCache[this.data.name]&&(c.animationCache[this.data.name]={},c.animationCache[this.data.name].prevKey={pos:0,rot:0,scl:0},c.animationCache[this.data.name].nextKey={pos:0,rot:0,scl:0},c.animationCache[this.data.name].originalMatrix=c.matrix);
// Get keys to match our current time
for(var d=c.animationCache[this.data.name],e=0;3>e;e++){for(var f=this.keyTypes[e],g=this.data.hierarchy[a].keys[0],h=this.getNextKeyWith(f,a,1);h.time<this.currentTime&&h.index>g.index;)g=h,h=this.getNextKeyWith(f,a,h.index+1);d.prevKey[f]=g,d.nextKey[f]=h}}},THREE.Animation.prototype.update=function(){var a=[],b=new THREE.Vector3,c=new THREE.Vector3,d=new THREE.Quaternion,e=function(a,b){var c,d,e,g,h,i,j,k,l,m=[],n=[];return c=(a.length-1)*b,d=Math.floor(c),e=c-d,m[0]=0===d?d:d-1,m[1]=d,m[2]=d>a.length-2?d:d+1,m[3]=d>a.length-3?d:d+2,i=a[m[0]],j=a[m[1]],k=a[m[2]],l=a[m[3]],g=e*e,h=e*g,n[0]=f(i[0],j[0],k[0],l[0],e,g,h),n[1]=f(i[1],j[1],k[1],l[1],e,g,h),n[2]=f(i[2],j[2],k[2],l[2],e,g,h),n},f=function(a,b,c,d,e,f,g){var h=.5*(c-a),i=.5*(d-b);return(2*(b-c)+h+i)*g+(-3*(b-c)-2*h-i)*f+h*e+b};return function(f){if(this.isPlaying!==!1&&(this.currentTime+=f*this.timeScale,0!==this.weight)){
//
var g=this.data.length;if(this.loop===!0&&this.currentTime>g)this.currentTime%=g,this.reset();else if(this.loop===!1&&this.currentTime>g)return void this.stop();for(var h=0,i=this.hierarchy.length;i>h;h++)
// loop through pos/rot/scl
for(var j=this.hierarchy[h],k=j.animationCache[this.data.name],l=0;3>l;l++){
// get keys
var m=this.keyTypes[l],n=k.prevKey[m],o=k.nextKey[m];if(o.time<=this.currentTime){for(n=this.data.hierarchy[h].keys[0],o=this.getNextKeyWith(m,h,1);o.time<this.currentTime&&o.index>n.index;)n=o,o=this.getNextKeyWith(m,h,o.index+1);k.prevKey[m]=n,k.nextKey[m]=o}j.matrixAutoUpdate=!0,j.matrixWorldNeedsUpdate=!0;var p=(this.currentTime-n.time)/(o.time-n.time),q=n[m],r=o[m];
// interpolate
if(0>p&&(p=0),p>1&&(p=1),"pos"===m){if(this.interpolationType===THREE.AnimationHandler.LINEAR)
// blend
if(c.x=q[0]+(r[0]-q[0])*p,c.y=q[1]+(r[1]-q[1])*p,c.z=q[2]+(r[2]-q[2])*p,j instanceof THREE.Bone){var s=this.weight/(this.weight+j.accumulatedPosWeight);j.position.lerp(c,s),j.accumulatedPosWeight+=this.weight}else j.position.copy(c);else if(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD){a[0]=this.getPrevKeyWith("pos",h,n.index-1).pos,a[1]=q,a[2]=r,a[3]=this.getNextKeyWith("pos",h,o.index+1).pos,p=.33*p+.33;var t=e(a,p),s=1;j instanceof THREE.Bone&&(s=this.weight/(this.weight+j.accumulatedPosWeight),j.accumulatedPosWeight+=this.weight);
// blend
var u=j.position;if(u.x=u.x+(t[0]-u.x)*s,u.y=u.y+(t[1]-u.y)*s,u.z=u.z+(t[2]-u.z)*s,this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD){var v=e(a,1.01*p);b.set(v[0],v[1],v[2]),b.sub(u),b.y=0,b.normalize();var w=Math.atan2(b.x,b.z);j.rotation.set(0,w,0)}}}else if("rot"===m)
// Avoid paying the cost of an additional slerp if we don't have to
if(THREE.Quaternion.slerp(q,r,d,p),j instanceof THREE.Bone)if(0===j.accumulatedRotWeight)j.quaternion.copy(d),j.accumulatedRotWeight=this.weight;else{var s=this.weight/(this.weight+j.accumulatedRotWeight);THREE.Quaternion.slerp(j.quaternion,d,j.quaternion,s),j.accumulatedRotWeight+=this.weight}else j.quaternion.copy(d);else if("scl"===m)if(c.x=q[0]+(r[0]-q[0])*p,c.y=q[1]+(r[1]-q[1])*p,c.z=q[2]+(r[2]-q[2])*p,j instanceof THREE.Bone){var s=this.weight/(this.weight+j.accumulatedSclWeight);j.scale.lerp(c,s),j.accumulatedSclWeight+=this.weight}else j.scale.copy(c)}return!0}}}(),
// Get next key with
THREE.Animation.prototype.getNextKeyWith=function(a,b,c){var d=this.data.hierarchy[b].keys;for(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD?c=c<d.length-1?c:d.length-1:c%=d.length;c<d.length;c++)if(void 0!==d[c][a])return d[c];return this.data.hierarchy[b].keys[0]},
// Get previous key with
THREE.Animation.prototype.getPrevKeyWith=function(a,b,c){var d=this.data.hierarchy[b].keys;for(c=this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD?c>0?c:0:c>=0?c:c+d.length;c>=0;c--)if(void 0!==d[c][a])return d[c];return this.data.hierarchy[b].keys[d.length-1]},
// File:src/extras/animation/KeyFrameAnimation.js
/**
 * @author mikael emtinger / http://gomo.se/
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author khang duong
 * @author erik kitson
 */
THREE.KeyFrameAnimation=function(a){this.root=a.node,this.data=THREE.AnimationHandler.init(a),this.hierarchy=THREE.AnimationHandler.parse(this.root),this.currentTime=0,this.timeScale=.001,this.isPlaying=!1,this.isPaused=!0,this.loop=!0;
// initialize to first keyframes
for(var b=0,c=this.hierarchy.length;c>b;b++){var d=this.data.hierarchy[b].keys,e=this.data.hierarchy[b].sids,f=this.hierarchy[b];if(d.length&&e){for(var g=0;g<e.length;g++){var h=e[g],i=this.getNextKeyWith(h,b,0);i&&i.apply(h)}f.matrixAutoUpdate=!1,this.data.hierarchy[b].node.updateMatrix(),f.matrixWorldNeedsUpdate=!0}}},THREE.KeyFrameAnimation.prototype.play=function(a){if(this.currentTime=void 0!==a?a:0,this.isPlaying===!1){this.isPlaying=!0;
// reset key cache
var b,c,d,e=this.hierarchy.length;for(b=0;e>b;b++){c=this.hierarchy[b],d=this.data.hierarchy[b],void 0===d.animationCache&&(d.animationCache={},d.animationCache.prevKey=null,d.animationCache.nextKey=null,d.animationCache.originalMatrix=c.matrix);var f=this.data.hierarchy[b].keys;f.length&&(d.animationCache.prevKey=f[0],d.animationCache.nextKey=f[1],this.startTime=Math.min(f[0].time,this.startTime),this.endTime=Math.max(f[f.length-1].time,this.endTime))}this.update(0)}this.isPaused=!1,THREE.AnimationHandler.play(this)},THREE.KeyFrameAnimation.prototype.stop=function(){this.isPlaying=!1,this.isPaused=!1,THREE.AnimationHandler.stop(this);
// reset JIT matrix and remove cache
for(var a=0;a<this.data.hierarchy.length;a++){var b=this.hierarchy[a],c=this.data.hierarchy[a];if(void 0!==c.animationCache){var d=c.animationCache.originalMatrix;d.copy(b.matrix),b.matrix=d,delete c.animationCache}}},
// Update
THREE.KeyFrameAnimation.prototype.update=function(a){if(this.isPlaying!==!1){this.currentTime+=a*this.timeScale;
//
var b=this.data.length;this.loop===!0&&this.currentTime>b&&(this.currentTime%=b),this.currentTime=Math.min(this.currentTime,b);for(var c=0,d=this.hierarchy.length;d>c;c++){var e=this.hierarchy[c],f=this.data.hierarchy[c],g=f.keys,h=f.animationCache;if(g.length){var i=h.prevKey,j=h.nextKey;if(j.time<=this.currentTime){for(;j.time<this.currentTime&&j.index>i.index;)i=j,j=g[i.index+1];h.prevKey=i,h.nextKey=j}j.time>=this.currentTime?i.interpolate(j,this.currentTime):i.interpolate(j,j.time),this.data.hierarchy[c].node.updateMatrix(),e.matrixWorldNeedsUpdate=!0}}}},
// Get next key with
THREE.KeyFrameAnimation.prototype.getNextKeyWith=function(a,b,c){var d=this.data.hierarchy[b].keys;for(c%=d.length;c<d.length;c++)if(d[c].hasTarget(a))return d[c];return d[0]},
// Get previous key with
THREE.KeyFrameAnimation.prototype.getPrevKeyWith=function(a,b,c){var d=this.data.hierarchy[b].keys;for(c=c>=0?c:c+d.length;c>=0;c--)if(d[c].hasTarget(a))return d[c];return d[d.length-1]},
// File:src/extras/animation/MorphAnimation.js
/**
 * @author mrdoob / http://mrdoob.com
 */
THREE.MorphAnimation=function(a){this.mesh=a,this.frames=a.morphTargetInfluences.length,this.currentTime=0,this.duration=1e3,this.loop=!0,this.isPlaying=!1},THREE.MorphAnimation.prototype={play:function(){this.isPlaying=!0},pause:function(){this.isPlaying=!1},update:function(){var a=0,b=0;return function(c){if(this.isPlaying!==!1){this.currentTime+=c,this.loop===!0&&this.currentTime>this.duration&&(this.currentTime%=this.duration),this.currentTime=Math.min(this.currentTime,this.duration);var d=this.duration/this.frames,e=Math.floor(this.currentTime/d);e!=b&&(this.mesh.morphTargetInfluences[a]=0,this.mesh.morphTargetInfluences[b]=1,this.mesh.morphTargetInfluences[e]=0,a=b,b=e),this.mesh.morphTargetInfluences[e]=this.currentTime%d/d,this.mesh.morphTargetInfluences[a]=1-this.mesh.morphTargetInfluences[e]}}}()},
// File:src/extras/geometries/BoxGeometry.js
/**
 * @author mrdoob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Cube.as
 */
THREE.BoxGeometry=function(a,b,c,d,e,f){// nz
function g(a,b,c,d,e,f,g,i){var j,k,l,m=h.widthSegments,n=h.heightSegments,o=e/2,p=f/2,q=h.vertices.length;"x"===a&&"y"===b||"y"===a&&"x"===b?j="z":"x"===a&&"z"===b||"z"===a&&"x"===b?(j="y",n=h.depthSegments):("z"===a&&"y"===b||"y"===a&&"z"===b)&&(j="x",m=h.depthSegments);var r=m+1,s=n+1,t=e/m,u=f/n,v=new THREE.Vector3;for(v[j]=g>0?1:-1,l=0;s>l;l++)for(k=0;r>k;k++){var w=new THREE.Vector3;w[a]=(k*t-o)*c,w[b]=(l*u-p)*d,w[j]=g,h.vertices.push(w)}for(l=0;n>l;l++)for(k=0;m>k;k++){var x=k+r*l,y=k+r*(l+1),z=k+1+r*(l+1),A=k+1+r*l,B=new THREE.Vector2(k/m,1-l/n),C=new THREE.Vector2(k/m,1-(l+1)/n),D=new THREE.Vector2((k+1)/m,1-(l+1)/n),E=new THREE.Vector2((k+1)/m,1-l/n),F=new THREE.Face3(x+q,y+q,A+q);F.normal.copy(v),F.vertexNormals.push(v.clone(),v.clone(),v.clone()),F.materialIndex=i,h.faces.push(F),h.faceVertexUvs[0].push([B,C,E]),F=new THREE.Face3(y+q,z+q,A+q),F.normal.copy(v),F.vertexNormals.push(v.clone(),v.clone(),v.clone()),F.materialIndex=i,h.faces.push(F),h.faceVertexUvs[0].push([C.clone(),D,E.clone()])}}THREE.Geometry.call(this),this.parameters={width:a,height:b,depth:c,widthSegments:d,heightSegments:e,depthSegments:f},this.widthSegments=d||1,this.heightSegments=e||1,this.depthSegments=f||1;var h=this,i=a/2,j=b/2,k=c/2;g("z","y",-1,-1,c,b,i,0),// px
g("z","y",1,-1,c,b,-i,1),// nx
g("x","z",1,1,a,c,j,2),// py
g("x","z",1,-1,a,c,-j,3),// ny
g("x","y",1,-1,a,b,k,4),// pz
g("x","y",-1,-1,a,b,-k,5),this.mergeVertices()},THREE.BoxGeometry.prototype=Object.create(THREE.Geometry.prototype),
// File:src/extras/geometries/CircleGeometry.js
/**
 * @author hughes
 */
THREE.CircleGeometry=function(a,b,c,d){THREE.Geometry.call(this),this.parameters={radius:a,segments:b,thetaStart:c,thetaLength:d},a=a||50,b=void 0!==b?Math.max(3,b):8,c=void 0!==c?c:0,d=void 0!==d?d:2*Math.PI;var e,f=[],g=new THREE.Vector3,h=new THREE.Vector2(.5,.5);for(this.vertices.push(g),f.push(h),e=0;b>=e;e++){var i=new THREE.Vector3,j=c+e/b*d;i.x=a*Math.cos(j),i.y=a*Math.sin(j),this.vertices.push(i),f.push(new THREE.Vector2((i.x/a+1)/2,(i.y/a+1)/2))}var k=new THREE.Vector3(0,0,1);for(e=1;b>=e;e++)this.faces.push(new THREE.Face3(e,e+1,0,[k.clone(),k.clone(),k.clone()])),this.faceVertexUvs[0].push([f[e].clone(),f[e+1].clone(),h.clone()]);this.computeFaceNormals(),this.boundingSphere=new THREE.Sphere(new THREE.Vector3,a)},THREE.CircleGeometry.prototype=Object.create(THREE.Geometry.prototype),
// File:src/extras/geometries/CubeGeometry.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.CubeGeometry=function(a,b,c,d,e,f){return console.warn("THEE.CubeGeometry has been renamed to THREE.BoxGeometry."),new THREE.BoxGeometry(a,b,c,d,e,f)},
// File:src/extras/geometries/CylinderGeometry.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.CylinderGeometry=function(a,b,c,d,e,f){THREE.Geometry.call(this),this.parameters={radiusTop:a,radiusBottom:b,height:c,radialSegments:d,heightSegments:e,openEnded:f},a=void 0!==a?a:20,b=void 0!==b?b:20,c=void 0!==c?c:100,d=d||8,e=e||1,f=void 0!==f?f:!1;var g,h,i=c/2,j=[],k=[];for(h=0;e>=h;h++){var l=[],m=[],n=h/e,o=n*(b-a)+a;for(g=0;d>=g;g++){var p=g/d,q=new THREE.Vector3;q.x=o*Math.sin(p*Math.PI*2),q.y=-n*c+i,q.z=o*Math.cos(p*Math.PI*2),this.vertices.push(q),l.push(this.vertices.length-1),m.push(new THREE.Vector2(p,1-n))}j.push(l),k.push(m)}var r,s,t=(b-a)/c;for(g=0;d>g;g++)for(0!==a?(r=this.vertices[j[0][g]].clone(),s=this.vertices[j[0][g+1]].clone()):(r=this.vertices[j[1][g]].clone(),s=this.vertices[j[1][g+1]].clone()),r.setY(Math.sqrt(r.x*r.x+r.z*r.z)*t).normalize(),s.setY(Math.sqrt(s.x*s.x+s.z*s.z)*t).normalize(),h=0;e>h;h++){var u=j[h][g],v=j[h+1][g],w=j[h+1][g+1],x=j[h][g+1],y=r.clone(),z=r.clone(),A=s.clone(),B=s.clone(),C=k[h][g].clone(),D=k[h+1][g].clone(),E=k[h+1][g+1].clone(),F=k[h][g+1].clone();this.faces.push(new THREE.Face3(u,v,x,[y,z,B])),this.faceVertexUvs[0].push([C,D,F]),this.faces.push(new THREE.Face3(v,w,x,[z.clone(),A,B.clone()])),this.faceVertexUvs[0].push([D.clone(),E,F.clone()])}
// top cap
if(f===!1&&a>0)for(this.vertices.push(new THREE.Vector3(0,i,0)),g=0;d>g;g++){var u=j[0][g],v=j[0][g+1],w=this.vertices.length-1,y=new THREE.Vector3(0,1,0),z=new THREE.Vector3(0,1,0),A=new THREE.Vector3(0,1,0),C=k[0][g].clone(),D=k[0][g+1].clone(),E=new THREE.Vector2(D.x,0);this.faces.push(new THREE.Face3(u,v,w,[y,z,A])),this.faceVertexUvs[0].push([C,D,E])}
// bottom cap
if(f===!1&&b>0)for(this.vertices.push(new THREE.Vector3(0,-i,0)),g=0;d>g;g++){var u=j[h][g+1],v=j[h][g],w=this.vertices.length-1,y=new THREE.Vector3(0,-1,0),z=new THREE.Vector3(0,-1,0),A=new THREE.Vector3(0,-1,0),C=k[h][g+1].clone(),D=k[h][g].clone(),E=new THREE.Vector2(D.x,1);this.faces.push(new THREE.Face3(u,v,w,[y,z,A])),this.faceVertexUvs[0].push([C,D,E])}this.computeFaceNormals()},THREE.CylinderGeometry.prototype=Object.create(THREE.Geometry.prototype),
// File:src/extras/geometries/ExtrudeGeometry.js
/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 *
 * Creates extruded geometry from a path shape.
 *
 * parameters = {
 *
 *  curveSegments: <int>, // number of points on the curves
 *  steps: <int>, // number of points for z-side extrusions / used for subdividing segements of extrude spline too
 *  amount: <int>, // Depth to extrude the shape
 *
 *  bevelEnabled: <bool>, // turn on bevel
 *  bevelThickness: <float>, // how deep into the original shape bevel goes
 *  bevelSize: <float>, // how far from shape outline is bevel
 *  bevelSegments: <int>, // number of bevel layers
 *
 *  extrudePath: <THREE.CurvePath> // 3d spline path to extrude shape along. (creates Frames if .frames aren't defined)
 *  frames: <THREE.TubeGeometry.FrenetFrames> // containing arrays of tangents, normals, binormals
 *
 *  material: <int> // material index for front and back faces
 *  extrudeMaterial: <int> // material index for extrusion and beveled faces
 *  uvGenerator: <Object> // object that provides UV generator functions
 *
 * }
 **/
THREE.ExtrudeGeometry=function(a,b){return"undefined"==typeof a?void(a=[]):(THREE.Geometry.call(this),a=a instanceof Array?a:[a],this.addShapeList(a,b),void this.computeFaceNormals())},THREE.ExtrudeGeometry.prototype=Object.create(THREE.Geometry.prototype),THREE.ExtrudeGeometry.prototype.addShapeList=function(a,b){for(var c=a.length,d=0;c>d;d++){var e=a[d];this.addShape(e,b)}},THREE.ExtrudeGeometry.prototype.addShape=function(a,b){function c(a,b,c){return b||console.log("die"),b.clone().multiplyScalar(c).add(a)}function d(a,b,c){var d,e,f=1e-10,g=THREE.Math.sign,h=1,i=a.x-b.x,j=a.y-b.y,k=c.x-a.x,l=c.y-a.y,m=i*i+j*j,n=i*l-j*k;if(Math.abs(n)>f){// not colinear
// length of vectors for normalizing
var o=Math.sqrt(m),p=Math.sqrt(k*k+l*l),q=b.x-j/o,r=b.y+i/o,s=c.x-l/p,t=c.y+k/p,u=((s-q)*l-(t-r)*k)/(i*l-j*k);
// vector from inPt to intersection point
d=q+i*u-a.x,e=r+j*u-a.y;
// Don't normalize!, otherwise sharp corners become ugly
//  but prevent crazy spikes
var v=d*d+e*e;if(2>=v)return new THREE.Vector2(d,e);h=Math.sqrt(v/2)}else{// handle special case of colinear edges
var w=!1;// assumes: opposite
i>f?k>f&&(w=!0):-f>i?-f>k&&(w=!0):g(j)==g(l)&&(w=!0),w?(
// console.log("Warning: lines are a straight sequence");
d=-j,e=i,h=Math.sqrt(m)):(
// console.log("Warning: lines are a straight spike");
d=i,e=j,h=Math.sqrt(m/2))}return new THREE.Vector2(d/h,e/h)}
/////  Internal functions
function e(){if(t){var a=0,b=S*a;
// Bottom faces
for(V=0;T>V;V++)R=K[V],i(R[2]+b,R[1]+b,R[0]+b,!0);
// Top faces
for(a=v+2*s,b=S*a,V=0;T>V;V++)R=K[V],i(R[0]+b,R[1]+b,R[2]+b,!1)}else{
// Bottom faces
for(V=0;T>V;V++)R=K[V],i(R[2],R[1],R[0],!0);
// Top faces
for(V=0;T>V;V++)R=K[V],i(R[0]+S*v,R[1]+S*v,R[2]+S*v,!1)}}
// Create faces for the z-sides of the shape
function f(){var a=0;for(g(L,a),a+=L.length,C=0,D=I.length;D>C;C++)B=I[C],g(B,a),
//, true
a+=B.length}function g(a,b){var c,d;for(V=a.length;--V>=0;){c=V,d=V-1,0>d&&(d=a.length-1);
//console.log('b', i,j, i-1, k,vertices.length);
var e=0,f=v+2*s;for(e=0;f>e;e++){var g=S*e,h=S*(e+1),i=b+c+g,k=b+d+g,l=b+d+h,m=b+c+h;j(i,k,l,m,a,e,f,c,d)}}}function h(a,b,c){E.vertices.push(new THREE.Vector3(a,b,c))}function i(c,d,e,f){c+=F,d+=F,e+=F,
// normal, color, material
E.faces.push(new THREE.Face3(c,d,e,null,null,y));var g=f?A.generateBottomUV(E,a,b,c,d,e):A.generateTopUV(E,a,b,c,d,e);E.faceVertexUvs[0].push(g)}function j(c,d,e,f,g,h,i,j,k){c+=F,d+=F,e+=F,f+=F,E.faces.push(new THREE.Face3(c,d,f,null,null,z)),E.faces.push(new THREE.Face3(d,e,f,null,null,z));var l=A.generateSideWallUV(E,a,g,b,c,d,e,f,h,i,j,k);E.faceVertexUvs[0].push([l[0],l[1],l[3]]),E.faceVertexUvs[0].push([l[1],l[2],l[3]])}var k,l,m,n,o,p=void 0!==b.amount?b.amount:100,q=void 0!==b.bevelThickness?b.bevelThickness:6,r=void 0!==b.bevelSize?b.bevelSize:q-2,s=void 0!==b.bevelSegments?b.bevelSegments:3,t=void 0!==b.bevelEnabled?b.bevelEnabled:!0,u=void 0!==b.curveSegments?b.curveSegments:12,v=void 0!==b.steps?b.steps:1,w=b.extrudePath,x=!1,y=b.material,z=b.extrudeMaterial,A=void 0!==b.UVGenerator?b.UVGenerator:THREE.ExtrudeGeometry.WorldUVGenerator;w&&(k=w.getSpacedPoints(v),x=!0,t=!1,// bevels not supported for path extrusion
// SETUP TNB variables
// Reuse TNB from TubeGeomtry for now.
// TODO1 - have a .isClosed in spline?
l=void 0!==b.frames?b.frames:new THREE.TubeGeometry.FrenetFrames(w,v,!1),
// console.log(splineTube, 'splineTube', splineTube.normals.length, 'steps', steps, 'extrudePts', extrudePts.length);
m=new THREE.Vector3,n=new THREE.Vector3,o=new THREE.Vector3),
// Safeguards if bevels are not enabled
t||(s=0,q=0,r=0);
// Variables initalization
var B,C,D,E=this,F=this.vertices.length,G=a.extractPoints(u),H=G.shape,I=G.holes,J=!THREE.Shape.Utils.isClockWise(H);if(J){
// Maybe we should also check if holes are in the opposite direction, just to be safe ...
for(H=H.reverse(),C=0,D=I.length;D>C;C++)B=I[C],THREE.Shape.Utils.isClockWise(B)&&(I[C]=B.reverse());J=!1}var K=THREE.Shape.Utils.triangulateShape(H,I),L=H;// vertices has all points but contour has only points of circumference
for(C=0,D=I.length;D>C;C++)B=I[C],H=H.concat(B);for(var M,N,O,P,Q,R,S=H.length,T=K.length,U=(L.length,180/Math.PI,[]),V=0,W=L.length,X=W-1,Y=V+1;W>V;V++,X++,Y++){X===W&&(X=0),Y===W&&(Y=0);
//  (j)---(i)---(k)
// console.log('i,j,k', i, j , k)
L[V],L[X],L[Y];U[V]=d(L[V],L[X],L[Y])}var Z,$=[],_=U.concat();for(C=0,D=I.length;D>C;C++){for(B=I[C],Z=[],V=0,W=B.length,X=W-1,Y=V+1;W>V;V++,X++,Y++)X===W&&(X=0),Y===W&&(Y=0),
//  (j)---(i)---(k)
Z[V]=d(B[V],B[X],B[Y]);$.push(Z),_=_.concat(Z)}
// Loop bevelSegments, 1 for the front, 1 for the back
for(M=0;s>M;M++){// curved
//bs = bevelSize * t ; // linear
// contract shape
for(
//for ( b = bevelSegments; b > 0; b -- ) {
O=M/s,P=q*(1-O),
//z = bevelThickness * t;
N=r*Math.sin(O*Math.PI/2),V=0,W=L.length;W>V;V++)Q=c(L[V],U[V],N),h(Q.x,Q.y,-P);
// expand holes
for(C=0,D=I.length;D>C;C++)for(B=I[C],Z=$[C],V=0,W=B.length;W>V;V++)Q=c(B[V],Z[V],N),h(Q.x,Q.y,-P)}
// Back facing vertices
for(N=r,V=0;S>V;V++)Q=t?c(H[V],_[V],N):H[V],x?(
// v( vert.x, vert.y + extrudePts[ 0 ].y, extrudePts[ 0 ].x );
n.copy(l.normals[0]).multiplyScalar(Q.x),m.copy(l.binormals[0]).multiplyScalar(Q.y),o.copy(k[0]).add(n).add(m),h(o.x,o.y,o.z)):h(Q.x,Q.y,0);
// Add stepped vertices...
// Including front facing vertices
var aa;for(aa=1;v>=aa;aa++)for(V=0;S>V;V++)Q=t?c(H[V],_[V],N):H[V],x?(
// v( vert.x, vert.y + extrudePts[ s - 1 ].y, extrudePts[ s - 1 ].x );
n.copy(l.normals[aa]).multiplyScalar(Q.x),m.copy(l.binormals[aa]).multiplyScalar(Q.y),o.copy(k[aa]).add(n).add(m),h(o.x,o.y,o.z)):h(Q.x,Q.y,p/v*aa);
// Add bevel segments planes
//for ( b = 1; b <= bevelSegments; b ++ ) {
for(M=s-1;M>=0;M--){
// contract shape
for(O=M/s,P=q*(1-O),
//bs = bevelSize * ( 1-Math.sin ( ( 1 - t ) * Math.PI/2 ) );
N=r*Math.sin(O*Math.PI/2),V=0,W=L.length;W>V;V++)Q=c(L[V],U[V],N),h(Q.x,Q.y,p+P);
// expand holes
for(C=0,D=I.length;D>C;C++)for(B=I[C],Z=$[C],V=0,W=B.length;W>V;V++)Q=c(B[V],Z[V],N),x?h(Q.x,Q.y+k[v-1].y,k[v-1].x+P):h(Q.x,Q.y,p+P)}/* Faces */
// Top and bottom faces
e(),
// Sides faces
f()},THREE.ExtrudeGeometry.WorldUVGenerator={generateTopUV:function(a,b,c,d,e,f){var g=a.vertices[d].x,h=a.vertices[d].y,i=a.vertices[e].x,j=a.vertices[e].y,k=a.vertices[f].x,l=a.vertices[f].y;return[new THREE.Vector2(g,h),new THREE.Vector2(i,j),new THREE.Vector2(k,l)]},generateBottomUV:function(a,b,c,d,e,f){return this.generateTopUV(a,b,c,d,e,f)},generateSideWallUV:function(a,b,c,d,e,f,g,h,i,j,k,l){var m=a.vertices[e].x,n=a.vertices[e].y,o=a.vertices[e].z,p=a.vertices[f].x,q=a.vertices[f].y,r=a.vertices[f].z,s=a.vertices[g].x,t=a.vertices[g].y,u=a.vertices[g].z,v=a.vertices[h].x,w=a.vertices[h].y,x=a.vertices[h].z;return Math.abs(n-q)<.01?[new THREE.Vector2(m,1-o),new THREE.Vector2(p,1-r),new THREE.Vector2(s,1-u),new THREE.Vector2(v,1-x)]:[new THREE.Vector2(n,1-o),new THREE.Vector2(q,1-r),new THREE.Vector2(t,1-u),new THREE.Vector2(w,1-x)]}},THREE.ExtrudeGeometry.__v1=new THREE.Vector2,THREE.ExtrudeGeometry.__v2=new THREE.Vector2,THREE.ExtrudeGeometry.__v3=new THREE.Vector2,THREE.ExtrudeGeometry.__v4=new THREE.Vector2,THREE.ExtrudeGeometry.__v5=new THREE.Vector2,THREE.ExtrudeGeometry.__v6=new THREE.Vector2,
// File:src/extras/geometries/ShapeGeometry.js
/**
 * @author jonobr1 / http://jonobr1.com
 *
 * Creates a one-sided polygonal geometry from a path shape. Similar to
 * ExtrudeGeometry.
 *
 * parameters = {
 *
 *	curveSegments: <int>, // number of points on the curves. NOT USED AT THE MOMENT.
 *
 *	material: <int> // material index for front and back faces
 *	uvGenerator: <Object> // object that provides UV generator functions
 *
 * }
 **/
THREE.ShapeGeometry=function(a,b){THREE.Geometry.call(this),a instanceof Array==!1&&(a=[a]),this.addShapeList(a,b),this.computeFaceNormals()},THREE.ShapeGeometry.prototype=Object.create(THREE.Geometry.prototype),/**
 * Add an array of shapes to THREE.ShapeGeometry.
 */
THREE.ShapeGeometry.prototype.addShapeList=function(a,b){for(var c=0,d=a.length;d>c;c++)this.addShape(a[c],b);return this},/**
 * Adds a shape to THREE.ShapeGeometry, based on THREE.ExtrudeGeometry.
 */
THREE.ShapeGeometry.prototype.addShape=function(a,b){void 0===b&&(b={});var c,d,e,f=void 0!==b.curveSegments?b.curveSegments:12,g=b.material,h=void 0===b.UVGenerator?THREE.ExtrudeGeometry.WorldUVGenerator:b.UVGenerator,i=this.vertices.length,j=a.extractPoints(f),k=j.shape,l=j.holes,m=!THREE.Shape.Utils.isClockWise(k);if(m){
// Maybe we should also check if holes are in the opposite direction, just to be safe...
for(k=k.reverse(),c=0,d=l.length;d>c;c++)e=l[c],THREE.Shape.Utils.isClockWise(e)&&(l[c]=e.reverse());m=!1}var n=THREE.Shape.Utils.triangulateShape(k,l),o=k;for(c=0,d=l.length;d>c;c++)e=l[c],k=k.concat(e);
//
var p,q,r=k.length,s=n.length;o.length;for(c=0;r>c;c++)p=k[c],this.vertices.push(new THREE.Vector3(p.x,p.y,0));for(c=0;s>c;c++){q=n[c];var t=q[0]+i,u=q[1]+i,v=q[2]+i;this.faces.push(new THREE.Face3(t,u,v,null,null,g)),this.faceVertexUvs[0].push(h.generateBottomUV(this,a,b,t,u,v))}},
// File:src/extras/geometries/LatheGeometry.js
/**
 * @author astrodud / http://astrodud.isgreat.org/
 * @author zz85 / https://github.com/zz85
 * @author bhouston / http://exocortex.com
 */
// points - to create a closed torus, one must use a set of points 
//    like so: [ a, b, c, d, a ], see first is the same as last.
// segments - the number of circumference segments to create
// phiStart - the starting radian
// phiLength - the radian (0 to 2*PI) range of the lathed section
//    2*pi is a closed lathe, less than 2PI is a portion.
THREE.LatheGeometry=function(a,b,c,d){THREE.Geometry.call(this),b=b||12,c=c||0,d=d||2*Math.PI;for(var e=1/(a.length-1),f=1/b,g=0,h=b;h>=g;g++)for(var i=c+g*f*d,j=Math.cos(i),k=Math.sin(i),l=0,m=a.length;m>l;l++){var n=a[l],o=new THREE.Vector3;o.x=j*n.x-k*n.y,o.y=k*n.x+j*n.y,o.z=n.z,this.vertices.push(o)}for(var p=a.length,g=0,h=b;h>g;g++)for(var l=0,m=a.length-1;m>l;l++){var q=l+p*g,r=q,s=q+p,j=q+1+p,t=q+1,u=g*f,v=l*e,w=u+f,x=v+e;this.faces.push(new THREE.Face3(r,s,t)),this.faceVertexUvs[0].push([new THREE.Vector2(u,v),new THREE.Vector2(w,v),new THREE.Vector2(u,x)]),this.faces.push(new THREE.Face3(s,j,t)),this.faceVertexUvs[0].push([new THREE.Vector2(w,v),new THREE.Vector2(w,x),new THREE.Vector2(u,x)])}this.mergeVertices(),this.computeFaceNormals(),this.computeVertexNormals()},THREE.LatheGeometry.prototype=Object.create(THREE.Geometry.prototype),
// File:src/extras/geometries/PlaneGeometry.js
/**
 * @author mrdoob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Plane.as
 */
THREE.PlaneGeometry=function(a,b,c,d){THREE.Geometry.call(this),this.parameters={width:a,height:b,widthSegments:c,heightSegments:d};var e,f,g=a/2,h=b/2,i=c||1,j=d||1,k=i+1,l=j+1,m=a/i,n=b/j,o=new THREE.Vector3(0,0,1);for(f=0;l>f;f++){var p=f*n-h;for(e=0;k>e;e++){var q=e*m-g;this.vertices.push(new THREE.Vector3(q,-p,0))}}for(f=0;j>f;f++)for(e=0;i>e;e++){var r=e+k*f,s=e+k*(f+1),t=e+1+k*(f+1),u=e+1+k*f,v=new THREE.Vector2(e/i,1-f/j),w=new THREE.Vector2(e/i,1-(f+1)/j),x=new THREE.Vector2((e+1)/i,1-(f+1)/j),y=new THREE.Vector2((e+1)/i,1-f/j),z=new THREE.Face3(r,s,u);z.normal.copy(o),z.vertexNormals.push(o.clone(),o.clone(),o.clone()),this.faces.push(z),this.faceVertexUvs[0].push([v,w,y]),z=new THREE.Face3(s,t,u),z.normal.copy(o),z.vertexNormals.push(o.clone(),o.clone(),o.clone()),this.faces.push(z),this.faceVertexUvs[0].push([w.clone(),x,y.clone()])}},THREE.PlaneGeometry.prototype=Object.create(THREE.Geometry.prototype),/**
 * @author mrdoob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Plane.as
 */
THREE.PlaneBufferGeometry=function(a,b,c,d){THREE.BufferGeometry.call(this),this.type="PlaneBufferGeometry",this.parameters={width:a,height:b,widthSegments:c,heightSegments:d};for(var e=a/2,f=b/2,g=c||1,h=d||1,i=g+1,j=h+1,k=a/g,l=b/h,m=new Float32Array(i*j*3),n=new Float32Array(i*j*3),o=new Float32Array(i*j*2),p=0,q=0,r=0;j>r;r++)for(var s=r*l-f,t=0;i>t;t++){var u=t*k-e;m[p]=u,m[p+1]=-s,n[p+2]=1,o[q]=t/g,o[q+1]=1-r/h,p+=3,q+=2}p=0;for(var v=new(m.length/3>65535?Uint32Array:Uint16Array)(g*h*6),r=0;h>r;r++)for(var t=0;g>t;t++){var w=t+i*r,x=t+i*(r+1),y=t+1+i*(r+1),z=t+1+i*r;v[p]=w,v[p+1]=x,v[p+2]=z,v[p+3]=x,v[p+4]=y,v[p+5]=z,p+=6}this.addAttribute("index",new THREE.BufferAttribute(v,1)),this.addAttribute("position",new THREE.BufferAttribute(m,3)),this.addAttribute("normal",new THREE.BufferAttribute(n,3)),this.addAttribute("uv",new THREE.BufferAttribute(o,2))},THREE.PlaneBufferGeometry.prototype=Object.create(THREE.BufferGeometry.prototype),
// File:src/extras/geometries/RingGeometry.js
/**
 * @author Kaleb Murphy
 */
THREE.RingGeometry=function(a,b,c,d,e,f){THREE.Geometry.call(this),a=a||0,b=b||50,e=void 0!==e?e:0,f=void 0!==f?f:2*Math.PI,c=void 0!==c?Math.max(3,c):8,d=void 0!==d?Math.max(1,d):8;var g,h,i=[],j=a,k=(b-a)/d;for(g=0;d+1>g;g++){// concentric circles inside ring
for(h=0;c+1>h;h++){// number of segments per circle
var l=new THREE.Vector3,m=e+h/c*f;l.x=j*Math.cos(m),l.y=j*Math.sin(m),this.vertices.push(l),i.push(new THREE.Vector2((l.x/b+1)/2,(l.y/b+1)/2))}j+=k}var n=new THREE.Vector3(0,0,1);for(g=0;d>g;g++){// concentric circles inside ring
var o=g*(c+1);for(h=0;c>h;h++){// number of segments per circle
var m=h+o,p=m,q=m+c+1,r=m+c+2;this.faces.push(new THREE.Face3(p,q,r,[n.clone(),n.clone(),n.clone()])),this.faceVertexUvs[0].push([i[p].clone(),i[q].clone(),i[r].clone()]),p=m,q=m+c+2,r=m+1,this.faces.push(new THREE.Face3(p,q,r,[n.clone(),n.clone(),n.clone()])),this.faceVertexUvs[0].push([i[p].clone(),i[q].clone(),i[r].clone()])}}this.computeFaceNormals(),this.boundingSphere=new THREE.Sphere(new THREE.Vector3,j)},THREE.RingGeometry.prototype=Object.create(THREE.Geometry.prototype),
// File:src/extras/geometries/SphereGeometry.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.SphereGeometry=function(a,b,c,d,e,f,g){THREE.Geometry.call(this),this.parameters={radius:a,widthSegments:b,heightSegments:c,phiStart:d,phiLength:e,thetaStart:f,thetaLength:g},a=a||50,b=Math.max(3,Math.floor(b)||8),c=Math.max(2,Math.floor(c)||6),d=void 0!==d?d:0,e=void 0!==e?e:2*Math.PI,f=void 0!==f?f:0,g=void 0!==g?g:Math.PI;var h,i,j=[],k=[];for(i=0;c>=i;i++){var l=[],m=[];for(h=0;b>=h;h++){var n=h/b,o=i/c,p=new THREE.Vector3;p.x=-a*Math.cos(d+n*e)*Math.sin(f+o*g),p.y=a*Math.cos(f+o*g),p.z=a*Math.sin(d+n*e)*Math.sin(f+o*g),this.vertices.push(p),l.push(this.vertices.length-1),m.push(new THREE.Vector2(n,1-o))}j.push(l),k.push(m)}for(i=0;c>i;i++)for(h=0;b>h;h++){var q=j[i][h+1],r=j[i][h],s=j[i+1][h],t=j[i+1][h+1],u=this.vertices[q].clone().normalize(),v=this.vertices[r].clone().normalize(),w=this.vertices[s].clone().normalize(),x=this.vertices[t].clone().normalize(),y=k[i][h+1].clone(),z=k[i][h].clone(),A=k[i+1][h].clone(),B=k[i+1][h+1].clone();Math.abs(this.vertices[q].y)===a?(y.x=(y.x+z.x)/2,this.faces.push(new THREE.Face3(q,s,t,[u,w,x])),this.faceVertexUvs[0].push([y,A,B])):Math.abs(this.vertices[s].y)===a?(A.x=(A.x+B.x)/2,this.faces.push(new THREE.Face3(q,r,s,[u,v,w])),this.faceVertexUvs[0].push([y,z,A])):(this.faces.push(new THREE.Face3(q,r,t,[u,v,x])),this.faceVertexUvs[0].push([y,z,B]),this.faces.push(new THREE.Face3(r,s,t,[v.clone(),w,x.clone()])),this.faceVertexUvs[0].push([z.clone(),A,B.clone()]))}this.computeFaceNormals(),this.boundingSphere=new THREE.Sphere(new THREE.Vector3,a)},THREE.SphereGeometry.prototype=Object.create(THREE.Geometry.prototype),
// File:src/extras/geometries/TextGeometry.js
/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author alteredq / http://alteredqualia.com/
 *
 * For creating 3D text geometry in three.js
 *
 * Text = 3D Text
 *
 * parameters = {
 *  size: 			<float>, 	// size of the text
 *  height: 		<float>, 	// thickness to extrude text
 *  curveSegments: 	<int>,		// number of points on the curves
 *
 *  font: 			<string>,		// font name
 *  weight: 		<string>,		// font weight (normal, bold)
 *  style: 			<string>,		// font style  (normal, italics)
 *
 *  bevelEnabled:	<bool>,			// turn on bevel
 *  bevelThickness: <float>, 		// how deep into text bevel goes
 *  bevelSize:		<float>, 		// how far from text outline is bevel
 *  }
 *
 */
/*	Usage Examples

	// TextGeometry wrapper

	var text3d = new TextGeometry( text, options );

	// Complete manner

	var textShapes = THREE.FontUtils.generateShapes( text, options );
	var text3d = new ExtrudeGeometry( textShapes, options );

*/
THREE.TextGeometry=function(a,b){b=b||{};var c=THREE.FontUtils.generateShapes(a,b);
// translate parameters to ExtrudeGeometry API
b.amount=void 0!==b.height?b.height:50,
// defaults
void 0===b.bevelThickness&&(b.bevelThickness=10),void 0===b.bevelSize&&(b.bevelSize=8),void 0===b.bevelEnabled&&(b.bevelEnabled=!1),THREE.ExtrudeGeometry.call(this,c,b)},THREE.TextGeometry.prototype=Object.create(THREE.ExtrudeGeometry.prototype),
// File:src/extras/geometries/TorusGeometry.js
/**
 * @author oosmoxiecode
 * @author mrdoob / http://mrdoob.com/
 * based on http://code.google.com/p/away3d/source/browse/trunk/fp10/Away3DLite/src/away3dlite/primitives/Torus.as?r=2888
 */
THREE.TorusGeometry=function(a,b,c,d,e){THREE.Geometry.call(this),this.parameters={radius:a,tube:b,radialSegments:c,tubularSegments:d,arc:e},a=a||100,b=b||40,c=c||8,d=d||6,e=e||2*Math.PI;for(var f=new THREE.Vector3,g=[],h=[],i=0;c>=i;i++)for(var j=0;d>=j;j++){var k=j/d*e,l=i/c*Math.PI*2;f.x=a*Math.cos(k),f.y=a*Math.sin(k);var m=new THREE.Vector3;m.x=(a+b*Math.cos(l))*Math.cos(k),m.y=(a+b*Math.cos(l))*Math.sin(k),m.z=b*Math.sin(l),this.vertices.push(m),g.push(new THREE.Vector2(j/d,i/c)),h.push(m.clone().sub(f).normalize())}for(var i=1;c>=i;i++)for(var j=1;d>=j;j++){var n=(d+1)*i+j-1,o=(d+1)*(i-1)+j-1,p=(d+1)*(i-1)+j,q=(d+1)*i+j,r=new THREE.Face3(n,o,q,[h[n].clone(),h[o].clone(),h[q].clone()]);this.faces.push(r),this.faceVertexUvs[0].push([g[n].clone(),g[o].clone(),g[q].clone()]),r=new THREE.Face3(o,p,q,[h[o].clone(),h[p].clone(),h[q].clone()]),this.faces.push(r),this.faceVertexUvs[0].push([g[o].clone(),g[p].clone(),g[q].clone()])}this.computeFaceNormals()},THREE.TorusGeometry.prototype=Object.create(THREE.Geometry.prototype),
// File:src/extras/geometries/TorusKnotGeometry.js
/**
 * @author oosmoxiecode
 * based on http://code.google.com/p/away3d/source/browse/trunk/fp10/Away3D/src/away3d/primitives/TorusKnot.as?spec=svn2473&r=2473
 */
THREE.TorusKnotGeometry=function(a,b,c,d,e,f,g){function h(a,b,c,d,e){var f=Math.cos(a),g=Math.sin(a),h=b/c*a,i=Math.cos(h),j=d*(2+i)*.5*f,k=d*(2+i)*g*.5,l=e*d*Math.sin(h)*.5;return new THREE.Vector3(j,k,l)}THREE.Geometry.call(this),this.parameters={radius:a,tube:b,radialSegments:c,tubularSegments:d,p:e,q:f,heightScale:g},a=a||100,b=b||40,c=c||64,d=d||8,e=e||2,f=f||3,g=g||1;for(var i=new Array(c),j=new THREE.Vector3,k=new THREE.Vector3,l=new THREE.Vector3,m=0;c>m;++m){i[m]=new Array(d);var n=m/c*2*e*Math.PI,o=h(n,f,e,a,g),p=h(n+.01,f,e,a,g);j.subVectors(p,o),k.addVectors(p,o),l.crossVectors(j,k),k.crossVectors(l,j),l.normalize(),k.normalize();for(var q=0;d>q;++q){var r=q/d*2*Math.PI,s=-b*Math.cos(r),t=b*Math.sin(r),u=new THREE.Vector3;u.x=o.x+s*k.x+t*l.x,u.y=o.y+s*k.y+t*l.y,u.z=o.z+s*k.z+t*l.z,i[m][q]=this.vertices.push(u)-1}}for(var m=0;c>m;++m)for(var q=0;d>q;++q){var v=(m+1)%c,w=(q+1)%d,x=i[m][q],y=i[v][q],z=i[v][w],A=i[m][w],B=new THREE.Vector2(m/c,q/d),C=new THREE.Vector2((m+1)/c,q/d),D=new THREE.Vector2((m+1)/c,(q+1)/d),E=new THREE.Vector2(m/c,(q+1)/d);this.faces.push(new THREE.Face3(x,y,A)),this.faceVertexUvs[0].push([B,C,E]),this.faces.push(new THREE.Face3(y,z,A)),this.faceVertexUvs[0].push([C.clone(),D,E.clone()])}this.computeFaceNormals(),this.computeVertexNormals()},THREE.TorusKnotGeometry.prototype=Object.create(THREE.Geometry.prototype),
// File:src/extras/geometries/TubeGeometry.js
/**
 * @author WestLangley / https://github.com/WestLangley
 * @author zz85 / https://github.com/zz85
 * @author miningold / https://github.com/miningold
 *
 * Modified from the TorusKnotGeometry by @oosmoxiecode
 *
 * Creates a tube which extrudes along a 3d spline
 *
 * Uses parallel transport frames as described in
 * http://www.cs.indiana.edu/pub/techreports/TR425.pdf
 */
THREE.TubeGeometry=function(a,b,c,d,e){function f(a,b,c){return B.vertices.push(new THREE.Vector3(a,b,c))-1}THREE.Geometry.call(this),this.parameters={path:a,segments:b,radius:c,radialSegments:d,closed:e},b=b||64,c=c||1,d=d||8,e=e||!1;var g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A=[],B=this,C=b+1,D=new THREE.Vector3,E=new THREE.TubeGeometry.FrenetFrames(a,b,e),F=E.tangents,G=E.normals,H=E.binormals;
// consruct the grid
for(
// proxy internals
this.tangents=F,this.normals=G,this.binormals=H,o=0;C>o;o++)for(A[o]=[],j=o/(C-1),n=a.getPointAt(j),g=F[o],h=G[o],i=H[o],p=0;d>p;p++)k=p/d*2*Math.PI,l=-c*Math.cos(k),// TODO: Hack: Negating it so it faces outside.
m=c*Math.sin(k),D.copy(n),D.x+=l*h.x+m*i.x,D.y+=l*h.y+m*i.y,D.z+=l*h.z+m*i.z,A[o][p]=f(D.x,D.y,D.z);
// construct the mesh
for(o=0;b>o;o++)for(p=0;d>p;p++)q=e?(o+1)%b:o+1,r=(p+1)%d,s=A[o][p],// *** NOT NECESSARILY PLANAR ! ***
t=A[q][p],u=A[q][r],v=A[o][r],w=new THREE.Vector2(o/b,p/d),x=new THREE.Vector2((o+1)/b,p/d),y=new THREE.Vector2((o+1)/b,(p+1)/d),z=new THREE.Vector2(o/b,(p+1)/d),this.faces.push(new THREE.Face3(s,t,v)),this.faceVertexUvs[0].push([w,x,z]),this.faces.push(new THREE.Face3(t,u,v)),this.faceVertexUvs[0].push([x.clone(),y,z.clone()]);this.computeFaceNormals(),this.computeVertexNormals()},THREE.TubeGeometry.prototype=Object.create(THREE.Geometry.prototype),
// For computing of Frenet frames, exposing the tangents, normals and binormals the spline
THREE.TubeGeometry.FrenetFrames=function(a,b,c){/*
	function initialNormal1(lastBinormal) {
		// fixed start binormal. Has dangers of 0 vectors
		normals[ 0 ] = new THREE.Vector3();
		binormals[ 0 ] = new THREE.Vector3();
		if (lastBinormal===undefined) lastBinormal = new THREE.Vector3( 0, 0, 1 );
		normals[ 0 ].crossVectors( lastBinormal, tangents[ 0 ] ).normalize();
		binormals[ 0 ].crossVectors( tangents[ 0 ], normals[ 0 ] ).normalize();
	}

	function initialNormal2() {

		// This uses the Frenet-Serret formula for deriving binormal
		var t2 = path.getTangentAt( epsilon );

		normals[ 0 ] = new THREE.Vector3().subVectors( t2, tangents[ 0 ] ).normalize();
		binormals[ 0 ] = new THREE.Vector3().crossVectors( tangents[ 0 ], normals[ 0 ] );

		normals[ 0 ].crossVectors( binormals[ 0 ], tangents[ 0 ] ).normalize(); // last binormal x tangent
		binormals[ 0 ].crossVectors( tangents[ 0 ], normals[ 0 ] ).normalize();

	}
	*/
function d(){
// select an initial normal vector perpenicular to the first tangent vector,
// and in the direction of the smallest tangent xyz component
n[0]=new THREE.Vector3,o[0]=new THREE.Vector3,f=Number.MAX_VALUE,g=Math.abs(m[0].x),h=Math.abs(m[0].y),i=Math.abs(m[0].z),f>=g&&(f=g,l.set(1,0,0)),f>=h&&(f=h,l.set(0,1,0)),f>=i&&l.set(0,0,1),p.crossVectors(m[0],l).normalize(),n[0].crossVectors(m[0],p),o[0].crossVectors(m[0],n[0])}var e,f,g,h,i,j,k,l=(new THREE.Vector3,new THREE.Vector3),m=(new THREE.Vector3,[]),n=[],o=[],p=new THREE.Vector3,q=new THREE.Matrix4,r=b+1,s=1e-4;
// compute the tangent vectors for each segment on the path
for(
// expose internals
this.tangents=m,this.normals=n,this.binormals=o,j=0;r>j;j++)k=j/(r-1),m[j]=a.getTangentAt(k),m[j].normalize();
// compute the slowly-varying normal and binormal vectors for each segment on the path
for(d(),j=1;r>j;j++)n[j]=n[j-1].clone(),o[j]=o[j-1].clone(),p.crossVectors(m[j-1],m[j]),p.length()>s&&(p.normalize(),e=Math.acos(THREE.Math.clamp(m[j-1].dot(m[j]),-1,1)),// clamp for floating pt errors
n[j].applyMatrix4(q.makeRotationAxis(p,e))),o[j].crossVectors(m[j],n[j]);
// if the curve is closed, postprocess the vectors so the first and last normal vectors are the same
if(c)for(e=Math.acos(THREE.Math.clamp(n[0].dot(n[r-1]),-1,1)),e/=r-1,m[0].dot(p.crossVectors(n[0],n[r-1]))>0&&(e=-e),j=1;r>j;j++)
// twist a little...
n[j].applyMatrix4(q.makeRotationAxis(m[j],e*j)),o[j].crossVectors(m[j],n[j])},
// File:src/extras/geometries/PolyhedronGeometry.js
/**
 * @author clockworkgeek / https://github.com/clockworkgeek
 * @author timothypratley / https://github.com/timothypratley
 * @author WestLangley / http://github.com/WestLangley
*/
THREE.PolyhedronGeometry=function(a,b,c,d){
// Project vector onto sphere's surface
function e(a){var b=a.normalize().clone();b.index=k.vertices.push(b)-1;
// Texture coords are equivalent to map coords, calculate angle and convert to fraction of a circle.
var c=h(a)/2/Math.PI+.5,d=i(a)/Math.PI+.5;return b.uv=new THREE.Vector2(c,1-d),b}
// Approximate a curved face with recursively sub-divided triangles.
function f(a,b,c){var d=new THREE.Face3(a.index,b.index,c.index,[a.clone(),b.clone(),c.clone()]);k.faces.push(d),t.copy(a).add(b).add(c).divideScalar(3);var e=h(t);k.faceVertexUvs[0].push([j(a.uv,a,e),j(b.uv,b,e),j(c.uv,c,e)])}
// Analytically subdivide a face to the required detail level.
function g(a,b){
// Construct all of the vertices for this subdivision.
for(var c=Math.pow(2,b),d=(Math.pow(4,b),e(k.vertices[a.a])),g=e(k.vertices[a.b]),h=e(k.vertices[a.c]),i=[],j=0;c>=j;j++){i[j]=[];for(var l=e(d.clone().lerp(h,j/c)),m=e(g.clone().lerp(h,j/c)),n=c-j,o=0;n>=o;o++)0==o&&j==c?i[j][o]=l:i[j][o]=e(l.clone().lerp(m,o/n))}
// Construct all of the faces.
for(var j=0;c>j;j++)for(var o=0;2*(c-j)-1>o;o++){var p=Math.floor(o/2);o%2==0?f(i[j][p+1],i[j+1][p],i[j][p]):f(i[j][p+1],i[j+1][p+1],i[j+1][p])}}
// Angle around the Y axis, counter-clockwise when looking from above.
function h(a){return Math.atan2(a.z,-a.x)}
// Angle above the XZ plane.
function i(a){return Math.atan2(-a.y,Math.sqrt(a.x*a.x+a.z*a.z))}
// Texture fixing helper. Spheres have some odd behaviours.
function j(a,b,c){return 0>c&&1===a.x&&(a=new THREE.Vector2(a.x-1,a.y)),0===b.x&&0===b.z&&(a=new THREE.Vector2(c/2/Math.PI+.5,a.y)),a.clone()}THREE.Geometry.call(this),c=c||1,d=d||0;for(var k=this,l=0,m=a.length;m>l;l+=3)e(new THREE.Vector3(a[l],a[l+1],a[l+2]));for(var n=this.vertices,o=[],l=0,p=0,m=b.length;m>l;l+=3,p++){var q=n[b[l]],r=n[b[l+1]],s=n[b[l+2]];o[p]=new THREE.Face3(q.index,r.index,s.index,[q.clone(),r.clone(),s.clone()])}for(var t=new THREE.Vector3,l=0,m=o.length;m>l;l++)g(o[l],d);
// Handle case when face straddles the seam
for(var l=0,m=this.faceVertexUvs[0].length;m>l;l++){var u=this.faceVertexUvs[0][l],v=u[0].x,w=u[1].x,x=u[2].x,y=Math.max(v,Math.max(w,x)),z=Math.min(v,Math.min(w,x));y>.9&&.1>z&&(// 0.9 is somewhat arbitrary
.2>v&&(u[0].x+=1),.2>w&&(u[1].x+=1),.2>x&&(u[2].x+=1))}
// Apply radius
for(var l=0,m=this.vertices.length;m>l;l++)this.vertices[l].multiplyScalar(c);
// Merge vertices
this.mergeVertices(),this.computeFaceNormals(),this.boundingSphere=new THREE.Sphere(new THREE.Vector3,c)},THREE.PolyhedronGeometry.prototype=Object.create(THREE.Geometry.prototype),
// File:src/extras/geometries/IcosahedronGeometry.js
/**
 * @author timothypratley / https://github.com/timothypratley
 */
THREE.IcosahedronGeometry=function(a,b){this.parameters={radius:a,detail:b};var c=(1+Math.sqrt(5))/2,d=[-1,c,0,1,c,0,-1,-c,0,1,-c,0,0,-1,c,0,1,c,0,-1,-c,0,1,-c,c,0,-1,c,0,1,-c,0,-1,-c,0,1],e=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];THREE.PolyhedronGeometry.call(this,d,e,a,b)},THREE.IcosahedronGeometry.prototype=Object.create(THREE.Geometry.prototype),
// File:src/extras/geometries/OctahedronGeometry.js
/**
 * @author timothypratley / https://github.com/timothypratley
 */
THREE.OctahedronGeometry=function(a,b){this.parameters={radius:a,detail:b};var c=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],d=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];THREE.PolyhedronGeometry.call(this,c,d,a,b)},THREE.OctahedronGeometry.prototype=Object.create(THREE.Geometry.prototype),
// File:src/extras/geometries/TetrahedronGeometry.js
/**
 * @author timothypratley / https://github.com/timothypratley
 */
THREE.TetrahedronGeometry=function(a,b){var c=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],d=[2,1,0,0,3,2,1,3,0,2,3,1];THREE.PolyhedronGeometry.call(this,c,d,a,b)},THREE.TetrahedronGeometry.prototype=Object.create(THREE.Geometry.prototype),
// File:src/extras/geometries/ParametricGeometry.js
/**
 * @author zz85 / https://github.com/zz85
 * Parametric Surfaces Geometry
 * based on the brilliant article by @prideout http://prideout.net/blog/?p=44
 *
 * new THREE.ParametricGeometry( parametricFunction, uSegments, ySegements );
 *
 */
THREE.ParametricGeometry=function(a,b,c){THREE.Geometry.call(this);var d,e,f,g,h,i=this.vertices,j=this.faces,k=this.faceVertexUvs[0],l=b+1;for(d=0;c>=d;d++)for(h=d/c,e=0;b>=e;e++)g=e/b,f=a(g,h),i.push(f);var m,n,o,p,q,r,s,t;for(d=0;c>d;d++)for(e=0;b>e;e++)m=d*l+e,n=d*l+e+1,o=(d+1)*l+e+1,p=(d+1)*l+e,q=new THREE.Vector2(e/b,d/c),r=new THREE.Vector2((e+1)/b,d/c),s=new THREE.Vector2((e+1)/b,(d+1)/c),t=new THREE.Vector2(e/b,(d+1)/c),j.push(new THREE.Face3(m,n,p)),k.push([q,r,t]),j.push(new THREE.Face3(n,o,p)),k.push([r.clone(),s,t.clone()]);
// console.log(this);
// magic bullet
// var diff = this.mergeVertices();
// console.log('removed ', diff, ' vertices by merging');
this.computeFaceNormals(),this.computeVertexNormals()},THREE.ParametricGeometry.prototype=Object.create(THREE.Geometry.prototype),
// File:src/extras/helpers/AxisHelper.js
/**
 * @author sroucheray / http://sroucheray.org/
 * @author mrdoob / http://mrdoob.com/
 */
THREE.AxisHelper=function(a){a=a||1;var b=new Float32Array([0,0,0,a,0,0,0,0,0,0,a,0,0,0,0,0,0,a]),c=new Float32Array([1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1]),d=new THREE.BufferGeometry;d.addAttribute("position",new THREE.BufferAttribute(b,3)),d.addAttribute("color",new THREE.BufferAttribute(c,3));var e=new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors});THREE.Line.call(this,d,e,THREE.LinePieces)},THREE.AxisHelper.prototype=Object.create(THREE.Line.prototype),
// File:src/extras/helpers/ArrowHelper.js
/**
 * @author WestLangley / http://github.com/WestLangley
 * @author zz85 / http://github.com/zz85
 * @author bhouston / http://exocortex.com
 *
 * Creates an arrow for visualizing directions
 *
 * Parameters:
 *  dir - Vector3
 *  origin - Vector3
 *  length - Number
 *  color - color in hex value
 *  headLength - Number
 *  headWidth - Number
 */
THREE.ArrowHelper=function(){var a=new THREE.Geometry;a.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(0,1,0));var b=new THREE.CylinderGeometry(0,.5,1,5,1);return b.applyMatrix((new THREE.Matrix4).makeTranslation(0,-.5,0)),function(c,d,e,f,g,h){
// dir is assumed to be normalized
THREE.Object3D.call(this),void 0===f&&(f=16776960),void 0===e&&(e=1),void 0===g&&(g=.2*e),void 0===h&&(h=.2*g),this.position.copy(d),this.line=new THREE.Line(a,new THREE.LineBasicMaterial({color:f})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new THREE.Mesh(b,new THREE.MeshBasicMaterial({color:f})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(c),this.setLength(e,g,h)}}(),THREE.ArrowHelper.prototype=Object.create(THREE.Object3D.prototype),THREE.ArrowHelper.prototype.setDirection=function(){var a,b=new THREE.Vector3;return function(c){
// dir is assumed to be normalized
c.y>.99999?this.quaternion.set(0,0,0,1):c.y<-.99999?this.quaternion.set(1,0,0,0):(b.set(c.z,0,-c.x).normalize(),a=Math.acos(c.y),this.quaternion.setFromAxisAngle(b,a))}}(),THREE.ArrowHelper.prototype.setLength=function(a,b,c){void 0===b&&(b=.2*a),void 0===c&&(c=.2*b),this.line.scale.set(1,a,1),this.line.updateMatrix(),this.cone.scale.set(c,b,c),this.cone.position.y=a,this.cone.updateMatrix()},THREE.ArrowHelper.prototype.setColor=function(a){this.line.material.color.set(a),this.cone.material.color.set(a)},
// File:src/extras/helpers/BoxHelper.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.BoxHelper=function(a){var b=new THREE.BufferGeometry;b.addAttribute("position",new THREE.BufferAttribute(new Float32Array(72),3)),THREE.Line.call(this,b,new THREE.LineBasicMaterial({color:16776960}),THREE.LinePieces),void 0!==a&&this.update(a)},THREE.BoxHelper.prototype=Object.create(THREE.Line.prototype),THREE.BoxHelper.prototype.update=function(a){var b=a.geometry;null===b.boundingBox&&b.computeBoundingBox();var c=b.boundingBox.min,d=b.boundingBox.max,e=this.geometry.attributes.position.array;e[0]=d.x,e[1]=d.y,e[2]=d.z,e[3]=c.x,e[4]=d.y,e[5]=d.z,e[6]=c.x,e[7]=d.y,e[8]=d.z,e[9]=c.x,e[10]=c.y,e[11]=d.z,e[12]=c.x,e[13]=c.y,e[14]=d.z,e[15]=d.x,e[16]=c.y,e[17]=d.z,e[18]=d.x,e[19]=c.y,e[20]=d.z,e[21]=d.x,e[22]=d.y,e[23]=d.z,
//
e[24]=d.x,e[25]=d.y,e[26]=c.z,e[27]=c.x,e[28]=d.y,e[29]=c.z,e[30]=c.x,e[31]=d.y,e[32]=c.z,e[33]=c.x,e[34]=c.y,e[35]=c.z,e[36]=c.x,e[37]=c.y,e[38]=c.z,e[39]=d.x,e[40]=c.y,e[41]=c.z,e[42]=d.x,e[43]=c.y,e[44]=c.z,e[45]=d.x,e[46]=d.y,e[47]=c.z,
//
e[48]=d.x,e[49]=d.y,e[50]=d.z,e[51]=d.x,e[52]=d.y,e[53]=c.z,e[54]=c.x,e[55]=d.y,e[56]=d.z,e[57]=c.x,e[58]=d.y,e[59]=c.z,e[60]=c.x,e[61]=c.y,e[62]=d.z,e[63]=c.x,e[64]=c.y,e[65]=c.z,e[66]=d.x,e[67]=c.y,e[68]=d.z,e[69]=d.x,e[70]=c.y,e[71]=c.z,this.geometry.attributes.position.needsUpdate=!0,this.geometry.computeBoundingSphere(),this.matrixAutoUpdate=!1,this.matrixWorld=a.matrixWorld},
// File:src/extras/helpers/BoundingBoxHelper.js
/**
 * @author WestLangley / http://github.com/WestLangley
 */
// a helper to show the world-axis-aligned bounding box for an object
THREE.BoundingBoxHelper=function(a,b){var c=void 0!==b?b:8947848;this.object=a,this.box=new THREE.Box3,THREE.Mesh.call(this,new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:c,wireframe:!0}))},THREE.BoundingBoxHelper.prototype=Object.create(THREE.Mesh.prototype),THREE.BoundingBoxHelper.prototype.update=function(){this.box.setFromObject(this.object),this.box.size(this.scale),this.box.center(this.position)},
// File:src/extras/helpers/CameraHelper.js
/**
 * @author alteredq / http://alteredqualia.com/
 *
 *	- shows frustum, line of sight and up of the camera
 *	- suitable for fast updates
 * 	- based on frustum visualization in lightgl.js shadowmap example
 *		http://evanw.github.com/lightgl.js/tests/shadowmap.html
 */
THREE.CameraHelper=function(a){function b(a,b,d){c(a,d),c(b,d)}function c(a,b){d.vertices.push(new THREE.Vector3),d.colors.push(new THREE.Color(b)),void 0===f[a]&&(f[a]=[]),f[a].push(d.vertices.length-1)}var d=new THREE.Geometry,e=new THREE.LineBasicMaterial({color:16777215,vertexColors:THREE.FaceColors}),f={},g=16755200,h=16711680,i=43775,j=16777215,k=3355443;
// near
b("n1","n2",g),b("n2","n4",g),b("n4","n3",g),b("n3","n1",g),
// far
b("f1","f2",g),b("f2","f4",g),b("f4","f3",g),b("f3","f1",g),
// sides
b("n1","f1",g),b("n2","f2",g),b("n3","f3",g),b("n4","f4",g),
// cone
b("p","n1",h),b("p","n2",h),b("p","n3",h),b("p","n4",h),
// up
b("u1","u2",i),b("u2","u3",i),b("u3","u1",i),
// target
b("c","t",j),b("p","c",k),
// cross
b("cn1","cn2",k),b("cn3","cn4",k),b("cf1","cf2",k),b("cf3","cf4",k),THREE.Line.call(this,d,e,THREE.LinePieces),this.camera=a,this.matrixWorld=a.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=f,this.update()},THREE.CameraHelper.prototype=Object.create(THREE.Line.prototype),THREE.CameraHelper.prototype.update=function(){var a=new THREE.Vector3,b=new THREE.Camera,c=new THREE.Projector;return function(){function d(d,f,g,h){a.set(f,g,h),c.unprojectVector(a,b);var i=e.pointMap[d];if(void 0!==i)for(var j=0,k=i.length;k>j;j++)e.geometry.vertices[i[j]].copy(a)}var e=this,f=1,g=1;
// we need just camera projection matrix
// world matrix must be identity
b.projectionMatrix.copy(this.camera.projectionMatrix),
// center / target
d("c",0,0,-1),d("t",0,0,1),
// near
d("n1",-f,-g,-1),d("n2",f,-g,-1),d("n3",-f,g,-1),d("n4",f,g,-1),
// far
d("f1",-f,-g,1),d("f2",f,-g,1),d("f3",-f,g,1),d("f4",f,g,1),
// up
d("u1",.7*f,1.1*g,-1),d("u2",.7*-f,1.1*g,-1),d("u3",0,2*g,-1),
// cross
d("cf1",-f,0,1),d("cf2",f,0,1),d("cf3",0,-g,1),d("cf4",0,g,1),d("cn1",-f,0,-1),d("cn2",f,0,-1),d("cn3",0,-g,-1),d("cn4",0,g,-1),this.geometry.verticesNeedUpdate=!0}}(),
// File:src/extras/helpers/DirectionalLightHelper.js
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 */
THREE.DirectionalLightHelper=function(a,b){THREE.Object3D.call(this),this.light=a,this.light.updateMatrixWorld(),this.matrixWorld=a.matrixWorld,this.matrixAutoUpdate=!1,b=b||1;var c=new THREE.Geometry;c.vertices.push(new THREE.Vector3(-b,b,0),new THREE.Vector3(b,b,0),new THREE.Vector3(b,-b,0),new THREE.Vector3(-b,-b,0),new THREE.Vector3(-b,b,0));var d=new THREE.LineBasicMaterial({fog:!1});d.color.copy(this.light.color).multiplyScalar(this.light.intensity),this.lightPlane=new THREE.Line(c,d),this.add(this.lightPlane),c=new THREE.Geometry,c.vertices.push(new THREE.Vector3,new THREE.Vector3),d=new THREE.LineBasicMaterial({fog:!1}),d.color.copy(this.light.color).multiplyScalar(this.light.intensity),this.targetLine=new THREE.Line(c,d),this.add(this.targetLine),this.update()},THREE.DirectionalLightHelper.prototype=Object.create(THREE.Object3D.prototype),THREE.DirectionalLightHelper.prototype.dispose=function(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()},THREE.DirectionalLightHelper.prototype.update=function(){var a=new THREE.Vector3,b=new THREE.Vector3,c=new THREE.Vector3;return function(){a.setFromMatrixPosition(this.light.matrixWorld),b.setFromMatrixPosition(this.light.target.matrixWorld),c.subVectors(b,a),this.lightPlane.lookAt(c),this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity),this.targetLine.geometry.vertices[1].copy(c),this.targetLine.geometry.verticesNeedUpdate=!0,this.targetLine.material.color.copy(this.lightPlane.material.color)}}(),
// File:src/extras/helpers/EdgesHelper.js
/**
 * @author WestLangley / http://github.com/WestLangley
 */
THREE.EdgesHelper=function(a,b){var c=void 0!==b?b:16777215,d=[0,0],e={},f=function(a,b){return a-b},g=["a","b","c"],h=new THREE.BufferGeometry,i=a.geometry.clone();i.mergeVertices(),i.computeFaceNormals();for(var j=i.vertices,k=i.faces,l=0,m=0,n=k.length;n>m;m++)for(var o=k[m],p=0;3>p;p++){d[0]=o[g[p]],d[1]=o[g[(p+1)%3]],d.sort(f);var q=d.toString();void 0===e[q]?(e[q]={vert1:d[0],vert2:d[1],face1:m,face2:void 0},l++):e[q].face2=m}h.addAttribute("position",new THREE.Float32Attribute(2*l*3,3));var r=h.attributes.position.array,s=0;for(var q in e){var t=e[q];if(void 0===t.face2||k[t.face1].normal.dot(k[t.face2].normal)<.9999){// hardwired const OK
var u=j[t.vert1];r[s++]=u.x,r[s++]=u.y,r[s++]=u.z,u=j[t.vert2],r[s++]=u.x,r[s++]=u.y,r[s++]=u.z}}THREE.Line.call(this,h,new THREE.LineBasicMaterial({color:c}),THREE.LinePieces),this.matrixAutoUpdate=!1,this.matrixWorld=a.matrixWorld},THREE.EdgesHelper.prototype=Object.create(THREE.Line.prototype),
// File:src/extras/helpers/FaceNormalsHelper.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
*/
THREE.FaceNormalsHelper=function(a,b,c,d){this.object=a,this.size=void 0!==b?b:1;for(var e=void 0!==c?c:16776960,f=void 0!==d?d:1,g=new THREE.Geometry,h=this.object.geometry.faces,i=0,j=h.length;j>i;i++)g.vertices.push(new THREE.Vector3,new THREE.Vector3);THREE.Line.call(this,g,new THREE.LineBasicMaterial({color:e,linewidth:f}),THREE.LinePieces),this.matrixAutoUpdate=!1,this.normalMatrix=new THREE.Matrix3,this.update()},THREE.FaceNormalsHelper.prototype=Object.create(THREE.Line.prototype),THREE.FaceNormalsHelper.prototype.update=function(){var a=this.geometry.vertices,b=this.object,c=b.geometry.vertices,d=b.geometry.faces,e=b.matrixWorld;b.updateMatrixWorld(!0),this.normalMatrix.getNormalMatrix(e);for(var f=0,g=0,h=d.length;h>f;f++,g+=2){var i=d[f];a[g].copy(c[i.a]).add(c[i.b]).add(c[i.c]).divideScalar(3).applyMatrix4(e),a[g+1].copy(i.normal).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size).add(a[g])}return this.geometry.verticesNeedUpdate=!0,this},
// File:src/extras/helpers/GridHelper.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.GridHelper=function(a,b){var c=new THREE.Geometry,d=new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors});this.color1=new THREE.Color(4473924),this.color2=new THREE.Color(8947848);for(var e=-a;a>=e;e+=b){c.vertices.push(new THREE.Vector3(-a,0,e),new THREE.Vector3(a,0,e),new THREE.Vector3(e,0,-a),new THREE.Vector3(e,0,a));var f=0===e?this.color1:this.color2;c.colors.push(f,f,f,f)}THREE.Line.call(this,c,d,THREE.LinePieces)},THREE.GridHelper.prototype=Object.create(THREE.Line.prototype),THREE.GridHelper.prototype.setColors=function(a,b){this.color1.set(a),this.color2.set(b),this.geometry.colorsNeedUpdate=!0},
// File:src/extras/helpers/HemisphereLightHelper.js
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */
THREE.HemisphereLightHelper=function(a,b,c,d){THREE.Object3D.call(this),this.light=a,this.light.updateMatrixWorld(),this.matrixWorld=a.matrixWorld,this.matrixAutoUpdate=!1,this.colors=[new THREE.Color,new THREE.Color];var e=new THREE.SphereGeometry(b,4,2);e.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI/2));for(var f=0,g=8;g>f;f++)e.faces[f].color=this.colors[4>f?0:1];var h=new THREE.MeshBasicMaterial({vertexColors:THREE.FaceColors,wireframe:!0});this.lightSphere=new THREE.Mesh(e,h),this.add(this.lightSphere),this.update()},THREE.HemisphereLightHelper.prototype=Object.create(THREE.Object3D.prototype),THREE.HemisphereLightHelper.prototype.dispose=function(){this.lightSphere.geometry.dispose(),this.lightSphere.material.dispose()},THREE.HemisphereLightHelper.prototype.update=function(){var a=new THREE.Vector3;return function(){this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity),this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity),this.lightSphere.lookAt(a.setFromMatrixPosition(this.light.matrixWorld).negate()),this.lightSphere.geometry.colorsNeedUpdate=!0}}(),
// File:src/extras/helpers/PointLightHelper.js
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */
THREE.PointLightHelper=function(a,b){this.light=a,this.light.updateMatrixWorld();var c=new THREE.SphereGeometry(b,4,2),d=new THREE.MeshBasicMaterial({wireframe:!0,fog:!1});d.color.copy(this.light.color).multiplyScalar(this.light.intensity),THREE.Mesh.call(this,c,d),this.matrixWorld=this.light.matrixWorld,this.matrixAutoUpdate=!1},THREE.PointLightHelper.prototype=Object.create(THREE.Mesh.prototype),THREE.PointLightHelper.prototype.dispose=function(){this.geometry.dispose(),this.material.dispose()},THREE.PointLightHelper.prototype.update=function(){this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)},
// File:src/extras/helpers/SkeletonHelper.js
/**
 * @author Sean Griffin / http://twitter.com/sgrif
 * @author Michael Guerrero / http://realitymeltdown.com
 * @author mrdoob / http://mrdoob.com/
 * @author ikerr / http://verold.com
 */
THREE.SkeletonHelper=function(a){this.bones=this.getBoneList(a);for(var b=new THREE.Geometry,c=0;c<this.bones.length;c++){var d=this.bones[c];d.parent instanceof THREE.Bone&&(b.vertices.push(new THREE.Vector3),b.vertices.push(new THREE.Vector3),b.colors.push(new THREE.Color(0,0,1)),b.colors.push(new THREE.Color(0,1,0)))}var e=new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors,depthTest:!1,depthWrite:!1,transparent:!0});THREE.Line.call(this,b,e,THREE.LinePieces),this.root=a,this.matrixWorld=a.matrixWorld,this.matrixAutoUpdate=!1,this.update()},THREE.SkeletonHelper.prototype=Object.create(THREE.Line.prototype),THREE.SkeletonHelper.prototype.getBoneList=function(a){var b=[];a instanceof THREE.Bone&&b.push(a);for(var c=0;c<a.children.length;c++)b.push.apply(b,this.getBoneList(a.children[c]));return b},THREE.SkeletonHelper.prototype.update=function(){for(var a=this.geometry,b=(new THREE.Matrix4).getInverse(this.root.matrixWorld),c=new THREE.Matrix4,d=0,e=0;e<this.bones.length;e++){var f=this.bones[e];f.parent instanceof THREE.Bone&&(c.multiplyMatrices(b,f.matrixWorld),a.vertices[d].setFromMatrixPosition(c),c.multiplyMatrices(b,f.parent.matrixWorld),a.vertices[d+1].setFromMatrixPosition(c),d+=2)}a.verticesNeedUpdate=!0,a.computeBoundingSphere()},
// File:src/extras/helpers/SpotLightHelper.js
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
*/
THREE.SpotLightHelper=function(a){THREE.Object3D.call(this),this.light=a,this.light.updateMatrixWorld(),this.matrixWorld=a.matrixWorld,this.matrixAutoUpdate=!1;var b=new THREE.CylinderGeometry(0,1,1,8,1,!0);b.applyMatrix((new THREE.Matrix4).makeTranslation(0,-.5,0)),b.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI/2));var c=new THREE.MeshBasicMaterial({wireframe:!0,fog:!1});this.cone=new THREE.Mesh(b,c),this.add(this.cone),this.update()},THREE.SpotLightHelper.prototype=Object.create(THREE.Object3D.prototype),THREE.SpotLightHelper.prototype.dispose=function(){this.cone.geometry.dispose(),this.cone.material.dispose()},THREE.SpotLightHelper.prototype.update=function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(){var c=this.light.distance?this.light.distance:1e4,d=c*Math.tan(this.light.angle);this.cone.scale.set(d,d,c),a.setFromMatrixPosition(this.light.matrixWorld),b.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(b.sub(a)),this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)}}(),
// File:src/extras/helpers/VertexNormalsHelper.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
*/
THREE.VertexNormalsHelper=function(a,b,c,d){this.object=a,this.size=void 0!==b?b:1;for(var e=void 0!==c?c:16711680,f=void 0!==d?d:1,g=new THREE.Geometry,h=(a.geometry.vertices,a.geometry.faces),i=0,j=h.length;j>i;i++)for(var k=h[i],l=0,m=k.vertexNormals.length;m>l;l++)g.vertices.push(new THREE.Vector3,new THREE.Vector3);THREE.Line.call(this,g,new THREE.LineBasicMaterial({color:e,linewidth:f}),THREE.LinePieces),this.matrixAutoUpdate=!1,this.normalMatrix=new THREE.Matrix3,this.update()},THREE.VertexNormalsHelper.prototype=Object.create(THREE.Line.prototype),THREE.VertexNormalsHelper.prototype.update=function(a){var b=new THREE.Vector3;return function(a){var c=["a","b","c","d"];this.object.updateMatrixWorld(!0),this.normalMatrix.getNormalMatrix(this.object.matrixWorld);for(var d=this.geometry.vertices,e=this.object.geometry.vertices,f=this.object.geometry.faces,g=this.object.matrixWorld,h=0,i=0,j=f.length;j>i;i++)for(var k=f[i],l=0,m=k.vertexNormals.length;m>l;l++){var n=k[c[l]],o=e[n],p=k.vertexNormals[l];d[h].copy(o).applyMatrix4(g),b.copy(p).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size),b.add(d[h]),h+=1,d[h].copy(b),h+=1}return this.geometry.verticesNeedUpdate=!0,this}}(),
// File:src/extras/helpers/VertexTangentsHelper.js
/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
*/
THREE.VertexTangentsHelper=function(a,b,c,d){this.object=a,this.size=void 0!==b?b:1;for(var e=void 0!==c?c:255,f=void 0!==d?d:1,g=new THREE.Geometry,h=(a.geometry.vertices,a.geometry.faces),i=0,j=h.length;j>i;i++)for(var k=h[i],l=0,m=k.vertexTangents.length;m>l;l++)g.vertices.push(new THREE.Vector3),g.vertices.push(new THREE.Vector3);THREE.Line.call(this,g,new THREE.LineBasicMaterial({color:e,linewidth:f}),THREE.LinePieces),this.matrixAutoUpdate=!1,this.update()},THREE.VertexTangentsHelper.prototype=Object.create(THREE.Line.prototype),THREE.VertexTangentsHelper.prototype.update=function(a){var b=new THREE.Vector3;return function(a){var c=["a","b","c","d"];this.object.updateMatrixWorld(!0);for(var d=this.geometry.vertices,e=this.object.geometry.vertices,f=this.object.geometry.faces,g=this.object.matrixWorld,h=0,i=0,j=f.length;j>i;i++)for(var k=f[i],l=0,m=k.vertexTangents.length;m>l;l++){var n=k[c[l]],o=e[n],p=k.vertexTangents[l];d[h].copy(o).applyMatrix4(g),b.copy(p).transformDirection(g).multiplyScalar(this.size),b.add(d[h]),h+=1,d[h].copy(b),h+=1}return this.geometry.verticesNeedUpdate=!0,this}}(),
// File:src/extras/helpers/WireframeHelper.js
/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.WireframeHelper=function(a,b){var c=void 0!==b?b:16777215,d=[0,0],e={},f=function(a,b){return a-b},g=["a","b","c"],h=new THREE.BufferGeometry;if(a.geometry instanceof THREE.Geometry){for(var i=a.geometry.vertices,j=a.geometry.faces,k=0,l=new Uint32Array(6*j.length),m=0,n=j.length;n>m;m++)for(var o=j[m],p=0;3>p;p++){d[0]=o[g[p]],d[1]=o[g[(p+1)%3]],d.sort(f);var q=d.toString();void 0===e[q]&&(l[2*k]=d[0],l[2*k+1]=d[1],e[q]=!0,k++)}for(var r=new Float32Array(2*k*3),m=0,n=k;n>m;m++)for(var p=0;2>p;p++){var s=i[l[2*m+p]],t=6*m+3*p;r[t+0]=s.x,r[t+1]=s.y,r[t+2]=s.z}h.addAttribute("position",new THREE.BufferAttribute(r,3))}else if(a.geometry instanceof THREE.BufferGeometry)if(void 0!==a.geometry.attributes.index){for(var i=a.geometry.attributes.position.array,u=a.geometry.attributes.index.array,v=a.geometry.offsets,k=0,l=new Uint32Array(2*u.length),w=0,x=v.length;x>w;++w)for(var y=v[w].start,z=v[w].count,t=v[w].index,m=y,A=y+z;A>m;m+=3)for(var p=0;3>p;p++){d[0]=t+u[m+p],d[1]=t+u[m+(p+1)%3],d.sort(f);var q=d.toString();void 0===e[q]&&(l[2*k]=d[0],l[2*k+1]=d[1],e[q]=!0,k++)}for(var r=new Float32Array(2*k*3),m=0,n=k;n>m;m++)for(var p=0;2>p;p++){var t=6*m+3*p,B=3*l[2*m+p];r[t+0]=i[B],r[t+1]=i[B+1],r[t+2]=i[B+2]}h.addAttribute("position",new THREE.BufferAttribute(r,3))}else{for(var i=a.geometry.attributes.position.array,k=i.length/3,C=k/3,r=new Float32Array(2*k*3),m=0,n=C;n>m;m++)for(var p=0;3>p;p++){var t=18*m+6*p,D=9*m+3*p;r[t+0]=i[D],r[t+1]=i[D+1],r[t+2]=i[D+2];var B=9*m+3*((p+1)%3);r[t+3]=i[B],r[t+4]=i[B+1],r[t+5]=i[B+2]}h.addAttribute("position",new THREE.BufferAttribute(r,3))}THREE.Line.call(this,h,new THREE.LineBasicMaterial({color:c}),THREE.LinePieces),this.matrixAutoUpdate=!1,this.matrixWorld=a.matrixWorld},THREE.WireframeHelper.prototype=Object.create(THREE.Line.prototype),
// File:src/extras/objects/ImmediateRenderObject.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.ImmediateRenderObject=function(){THREE.Object3D.call(this),this.render=function(a){}},THREE.ImmediateRenderObject.prototype=Object.create(THREE.Object3D.prototype),
// File:src/extras/objects/LensFlare.js
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.LensFlare=function(a,b,c,d,e){THREE.Object3D.call(this),this.lensFlares=[],this.positionScreen=new THREE.Vector3,this.customUpdateCallback=void 0,void 0!==a&&this.add(a,b,c,d,e)},THREE.LensFlare.prototype=Object.create(THREE.Object3D.prototype),/*
 * Add: adds another flare
 */
THREE.LensFlare.prototype.add=function(a,b,c,d,e,f){void 0===b&&(b=-1),void 0===c&&(c=0),void 0===f&&(f=1),void 0===e&&(e=new THREE.Color(16777215)),void 0===d&&(d=THREE.NormalBlending),c=Math.min(c,Math.max(0,c)),this.lensFlares.push({texture:a,// THREE.Texture
size:b,// size in pixels (-1 = use texture.width)
distance:c,// distance (0-1) from light source (0=at light source)
x:0,y:0,z:0,// screen position (-1 => 1) z = 0 is ontop z = 1 is back
scale:1,// scale
rotation:1,// rotation
opacity:f,// opacity
color:e,// color
blending:d})},/*
 * Update lens flares update positions on all flares based on the screen position
 * Set myLensFlare.customUpdateCallback to alter the flares in your project specific way.
 */
THREE.LensFlare.prototype.updateLensFlares=function(){var a,b,c=this.lensFlares.length,d=2*-this.positionScreen.x,e=2*-this.positionScreen.y;for(a=0;c>a;a++)b=this.lensFlares[a],b.x=this.positionScreen.x+d*b.distance,b.y=this.positionScreen.y+e*b.distance,b.wantedRotation=b.x*Math.PI*.25,b.rotation+=.25*(b.wantedRotation-b.rotation)},
// File:src/extras/objects/MorphBlendMesh.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.MorphBlendMesh=function(a,b){THREE.Mesh.call(this,a,b),this.animationsMap={},this.animationsList=[];
// prepare default animation
// (all frames played together in 1 second)
var c=this.geometry.morphTargets.length,d="__default",e=0,f=c-1,g=c/1;this.createAnimation(d,e,f,g),this.setAnimationWeight(d,1)},THREE.MorphBlendMesh.prototype=Object.create(THREE.Mesh.prototype),THREE.MorphBlendMesh.prototype.createAnimation=function(a,b,c,d){var e={startFrame:b,endFrame:c,length:c-b+1,fps:d,duration:(c-b)/d,lastFrame:0,currentFrame:0,active:!1,time:0,direction:1,weight:1,directionBackwards:!1,mirroredLoop:!1};this.animationsMap[a]=e,this.animationsList.push(e)},THREE.MorphBlendMesh.prototype.autoCreateAnimations=function(a){for(var b,c=/([a-z]+)_?(\d+)/,d={},e=this.geometry,f=0,g=e.morphTargets.length;g>f;f++){var h=e.morphTargets[f],i=h.name.match(c);if(i&&i.length>1){var j=i[1];i[2];d[j]||(d[j]={start:1/0,end:-(1/0)});var k=d[j];f<k.start&&(k.start=f),f>k.end&&(k.end=f),b||(b=j)}}for(var j in d){var k=d[j];this.createAnimation(j,k.start,k.end,a)}this.firstAnimation=b},THREE.MorphBlendMesh.prototype.setAnimationDirectionForward=function(a){var b=this.animationsMap[a];b&&(b.direction=1,b.directionBackwards=!1)},THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward=function(a){var b=this.animationsMap[a];b&&(b.direction=-1,b.directionBackwards=!0)},THREE.MorphBlendMesh.prototype.setAnimationFPS=function(a,b){var c=this.animationsMap[a];c&&(c.fps=b,c.duration=(c.end-c.start)/c.fps)},THREE.MorphBlendMesh.prototype.setAnimationDuration=function(a,b){var c=this.animationsMap[a];c&&(c.duration=b,c.fps=(c.end-c.start)/c.duration)},THREE.MorphBlendMesh.prototype.setAnimationWeight=function(a,b){var c=this.animationsMap[a];c&&(c.weight=b)},THREE.MorphBlendMesh.prototype.setAnimationTime=function(a,b){var c=this.animationsMap[a];c&&(c.time=b)},THREE.MorphBlendMesh.prototype.getAnimationTime=function(a){var b=0,c=this.animationsMap[a];return c&&(b=c.time),b},THREE.MorphBlendMesh.prototype.getAnimationDuration=function(a){var b=-1,c=this.animationsMap[a];return c&&(b=c.duration),b},THREE.MorphBlendMesh.prototype.playAnimation=function(a){var b=this.animationsMap[a];b?(b.time=0,b.active=!0):console.warn("animation["+a+"] undefined")},THREE.MorphBlendMesh.prototype.stopAnimation=function(a){var b=this.animationsMap[a];b&&(b.active=!1)},THREE.MorphBlendMesh.prototype.update=function(a){for(var b=0,c=this.animationsList.length;c>b;b++){var d=this.animationsList[b];if(d.active){var e=d.duration/d.length;d.time+=d.direction*a,d.mirroredLoop?(d.time>d.duration||d.time<0)&&(d.direction*=-1,d.time>d.duration&&(d.time=d.duration,d.directionBackwards=!0),d.time<0&&(d.time=0,d.directionBackwards=!1)):(d.time=d.time%d.duration,d.time<0&&(d.time+=d.duration));var f=d.startFrame+THREE.Math.clamp(Math.floor(d.time/e),0,d.length-1),g=d.weight;f!==d.currentFrame&&(this.morphTargetInfluences[d.lastFrame]=0,this.morphTargetInfluences[d.currentFrame]=1*g,this.morphTargetInfluences[f]=0,d.lastFrame=d.currentFrame,d.currentFrame=f);var h=d.time%e/e;d.directionBackwards&&(h=1-h),this.morphTargetInfluences[d.currentFrame]=h*g,this.morphTargetInfluences[d.lastFrame]=(1-h)*g}}},
// File:src/extras/renderers/plugins/LensFlarePlugin.js
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.LensFlarePlugin=function(){function a(a,c){var d=b.createProgram(),e=b.createShader(b.FRAGMENT_SHADER),f=b.createShader(b.VERTEX_SHADER),g="precision "+c+" float;\n";return b.shaderSource(e,g+a.fragmentShader),b.shaderSource(f,g+a.vertexShader),b.compileShader(e),b.compileShader(f),b.attachShader(d,e),b.attachShader(d,f),b.linkProgram(d),d}var b,c,d,e=[],f={};this.init=function(e){b=e.context,c=e,d=e.getPrecision(),f.vertices=new Float32Array(16),f.faces=new Uint16Array(6);var g=0;f.vertices[g++]=-1,f.vertices[g++]=-1,// vertex
f.vertices[g++]=0,f.vertices[g++]=0,// uv... etc.
f.vertices[g++]=1,f.vertices[g++]=-1,f.vertices[g++]=1,f.vertices[g++]=0,f.vertices[g++]=1,f.vertices[g++]=1,f.vertices[g++]=1,f.vertices[g++]=1,f.vertices[g++]=-1,f.vertices[g++]=1,f.vertices[g++]=0,f.vertices[g++]=1,g=0,f.faces[g++]=0,f.faces[g++]=1,f.faces[g++]=2,f.faces[g++]=0,f.faces[g++]=2,f.faces[g++]=3,
// buffers
f.vertexBuffer=b.createBuffer(),f.elementBuffer=b.createBuffer(),b.bindBuffer(b.ARRAY_BUFFER,f.vertexBuffer),b.bufferData(b.ARRAY_BUFFER,f.vertices,b.STATIC_DRAW),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,f.elementBuffer),b.bufferData(b.ELEMENT_ARRAY_BUFFER,f.faces,b.STATIC_DRAW),
// textures
f.tempTexture=b.createTexture(),f.occlusionTexture=b.createTexture(),b.bindTexture(b.TEXTURE_2D,f.tempTexture),b.texImage2D(b.TEXTURE_2D,0,b.RGB,16,16,0,b.RGB,b.UNSIGNED_BYTE,null),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST),b.bindTexture(b.TEXTURE_2D,f.occlusionTexture),b.texImage2D(b.TEXTURE_2D,0,b.RGBA,16,16,0,b.RGBA,b.UNSIGNED_BYTE,null),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST),b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<=0?(f.hasVertexTexture=!1,f.program=a(THREE.ShaderFlares.lensFlare,d)):(f.hasVertexTexture=!0,f.program=a(THREE.ShaderFlares.lensFlareVertexTexture,d)),f.attributes={},f.uniforms={},f.attributes.vertex=b.getAttribLocation(f.program,"position"),f.attributes.uv=b.getAttribLocation(f.program,"uv"),f.uniforms.renderType=b.getUniformLocation(f.program,"renderType"),f.uniforms.map=b.getUniformLocation(f.program,"map"),f.uniforms.occlusionMap=b.getUniformLocation(f.program,"occlusionMap"),f.uniforms.opacity=b.getUniformLocation(f.program,"opacity"),f.uniforms.color=b.getUniformLocation(f.program,"color"),f.uniforms.scale=b.getUniformLocation(f.program,"scale"),f.uniforms.rotation=b.getUniformLocation(f.program,"rotation"),f.uniforms.screenPosition=b.getUniformLocation(f.program,"screenPosition")},/*
	 * Render lens flares
	 * Method: renders 16x16 0xff00ff-colored points scattered over the light source area,
	 *         reads these back and calculates occlusion.
	 *         Then _lensFlare.update_lensFlares() is called to re-position and
	 *         update transparency of flares. Then they are rendered.
	 *
	 */
this.render=function(a,d,g,h){if(e.length=0,a.traverseVisible(function(a){a instanceof THREE.LensFlare&&e.push(a)}),0!==e.length){var i=new THREE.Vector3,j=h/g,k=.5*g,l=.5*h,m=16/h,n=new THREE.Vector2(m*j,m),o=new THREE.Vector3(1,1,0),p=new THREE.Vector2(1,1),q=f.uniforms,r=f.attributes;
// set _lensFlare program and reset blending
b.useProgram(f.program),b.enableVertexAttribArray(f.attributes.vertex),b.enableVertexAttribArray(f.attributes.uv),
// loop through all lens flares to update their occlusion and positions
// setup gl and common used attribs/unforms
b.uniform1i(q.occlusionMap,0),b.uniform1i(q.map,1),b.bindBuffer(b.ARRAY_BUFFER,f.vertexBuffer),b.vertexAttribPointer(r.vertex,2,b.FLOAT,!1,16,0),b.vertexAttribPointer(r.uv,2,b.FLOAT,!1,16,8),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,f.elementBuffer),b.disable(b.CULL_FACE),b.depthMask(!1);for(var s=0,t=e.length;t>s;s++){m=16/h,n.set(m*j,m);
// calc object screen position
var u=e[s];
// screen cull
if(i.set(u.matrixWorld.elements[12],u.matrixWorld.elements[13],u.matrixWorld.elements[14]),i.applyMatrix4(d.matrixWorldInverse),i.applyProjection(d.projectionMatrix),
// setup arrays for gl programs
o.copy(i),p.x=o.x*k+k,p.y=o.y*l+l,f.hasVertexTexture||p.x>0&&p.x<g&&p.y>0&&p.y<h){
// save current RGB to temp texture
b.activeTexture(b.TEXTURE1),b.bindTexture(b.TEXTURE_2D,f.tempTexture),b.copyTexImage2D(b.TEXTURE_2D,0,b.RGB,p.x-8,p.y-8,16,16,0),
// render pink quad
b.uniform1i(q.renderType,0),b.uniform2f(q.scale,n.x,n.y),b.uniform3f(q.screenPosition,o.x,o.y,o.z),b.disable(b.BLEND),b.enable(b.DEPTH_TEST),b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0),
// copy result to occlusionMap
b.activeTexture(b.TEXTURE0),b.bindTexture(b.TEXTURE_2D,f.occlusionTexture),b.copyTexImage2D(b.TEXTURE_2D,0,b.RGBA,p.x-8,p.y-8,16,16,0),
// restore graphics
b.uniform1i(q.renderType,1),b.disable(b.DEPTH_TEST),b.activeTexture(b.TEXTURE1),b.bindTexture(b.TEXTURE_2D,f.tempTexture),b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0),
// update object positions
u.positionScreen.copy(o),u.customUpdateCallback?u.customUpdateCallback(u):u.updateLensFlares(),
// render flares
b.uniform1i(q.renderType,2),b.enable(b.BLEND);for(var v=0,w=u.lensFlares.length;w>v;v++){var x=u.lensFlares[v];x.opacity>.001&&x.scale>.001&&(o.x=x.x,o.y=x.y,o.z=x.z,m=x.size*x.scale/h,n.x=m*j,n.y=m,b.uniform3f(q.screenPosition,o.x,o.y,o.z),b.uniform2f(q.scale,n.x,n.y),b.uniform1f(q.rotation,x.rotation),b.uniform1f(q.opacity,x.opacity),b.uniform3f(q.color,x.color.r,x.color.g,x.color.b),c.setBlending(x.blending,x.blendEquation,x.blendSrc,x.blendDst),c.setTexture(x.texture,1),b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0))}}}
// restore gl
b.enable(b.CULL_FACE),b.enable(b.DEPTH_TEST),b.depthMask(!0)}}},
// File:src/extras/renderers/plugins/ShadowMapPlugin.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.ShadowMapPlugin=function(){function a(b,c,d){if(c.visible){var e=b.__webglObjects[c.id];if(e&&c.castShadow&&(c.frustumCulled===!1||l.intersectsObject(c)===!0))for(var f=0,g=e.length;g>f;f++){var h=e[f];c._modelViewMatrix.multiplyMatrices(d.matrixWorldInverse,c.matrixWorld),q.push(h)}for(var f=0,g=c.children.length;g>f;f++)a(b,c.children[f],d)}}function b(a,b){var c=new THREE.DirectionalLight;c.isVirtual=!0,c.onlyShadow=!0,c.castShadow=!0,c.shadowCameraNear=a.shadowCameraNear,c.shadowCameraFar=a.shadowCameraFar,c.shadowCameraLeft=a.shadowCameraLeft,c.shadowCameraRight=a.shadowCameraRight,c.shadowCameraBottom=a.shadowCameraBottom,c.shadowCameraTop=a.shadowCameraTop,c.shadowCameraVisible=a.shadowCameraVisible,c.shadowDarkness=a.shadowDarkness,c.shadowBias=a.shadowCascadeBias[b],c.shadowMapWidth=a.shadowCascadeWidth[b],c.shadowMapHeight=a.shadowCascadeHeight[b],c.pointsWorld=[],c.pointsFrustum=[];for(var d=c.pointsWorld,e=c.pointsFrustum,f=0;8>f;f++)d[f]=new THREE.Vector3,e[f]=new THREE.Vector3;var g=a.shadowCascadeNearZ[b],h=a.shadowCascadeFarZ[b];return e[0].set(-1,-1,g),e[1].set(1,-1,g),e[2].set(-1,1,g),e[3].set(1,1,g),e[4].set(-1,-1,h),e[5].set(1,-1,h),e[6].set(-1,1,h),e[7].set(1,1,h),c}
// Synchronize virtual light with the original light
function c(a,b){var c=a.shadowCascadeArray[b];c.position.copy(a.position),c.target.position.copy(a.target.position),c.lookAt(c.target),c.shadowCameraVisible=a.shadowCameraVisible,c.shadowDarkness=a.shadowDarkness,c.shadowBias=a.shadowCascadeBias[b];var d=a.shadowCascadeNearZ[b],e=a.shadowCascadeFarZ[b],f=c.pointsFrustum;f[0].z=d,f[1].z=d,f[2].z=d,f[3].z=d,f[4].z=e,f[5].z=e,f[6].z=e,f[7].z=e}
// Fit shadow camera's ortho frustum to camera frustum
function d(a,b){var c=b.shadowCamera,d=b.pointsFrustum,e=b.pointsWorld;n.set(1/0,1/0,1/0),o.set(-(1/0),-(1/0),-(1/0));for(var f=0;8>f;f++){var g=e[f];g.copy(d[f]),THREE.ShadowMapPlugin.__projector.unprojectVector(g,a),g.applyMatrix4(c.matrixWorldInverse),g.x<n.x&&(n.x=g.x),g.x>o.x&&(o.x=g.x),g.y<n.y&&(n.y=g.y),g.y>o.y&&(o.y=g.y),g.z<n.z&&(n.z=g.z),g.z>o.z&&(o.z=g.z)}c.left=n.x,c.right=o.x,c.top=o.y,c.bottom=n.y,
// can't really fit near/far
//shadowCamera.near = _min.z;
//shadowCamera.far = _max.z;
c.updateProjectionMatrix()}
// For the moment just ignore objects that have multiple materials with different animation methods
// Only the first material will be taken into account for deciding which depth material to use for shadow maps
function e(a){return a.material instanceof THREE.MeshFaceMaterial?a.material.materials[0]:a.material}var f,g,h,i,j,k,l=new THREE.Frustum,m=new THREE.Matrix4,n=new THREE.Vector3,o=new THREE.Vector3,p=new THREE.Vector3,q=[];this.init=function(a){f=a.context,g=a;var b=THREE.ShaderLib.depthRGBA,c=THREE.UniformsUtils.clone(b.uniforms);h=new THREE.ShaderMaterial({fragmentShader:b.fragmentShader,vertexShader:b.vertexShader,uniforms:c}),i=new THREE.ShaderMaterial({fragmentShader:b.fragmentShader,vertexShader:b.vertexShader,uniforms:c,morphTargets:!0}),j=new THREE.ShaderMaterial({fragmentShader:b.fragmentShader,vertexShader:b.vertexShader,uniforms:c,skinning:!0}),k=new THREE.ShaderMaterial({fragmentShader:b.fragmentShader,vertexShader:b.vertexShader,uniforms:c,morphTargets:!0,skinning:!0}),h._shadowPass=!0,i._shadowPass=!0,j._shadowPass=!0,k._shadowPass=!0},this.render=function(a,b){g.shadowMapEnabled&&g.shadowMapAutoUpdate&&this.update(a,b)},this.update=function(n,o){var r,s,t,u,v,w,x,y,z,A,B,C,D,E=[],F=0,G=null;
// preprocess lights
// 	- skip lights that are not casting shadows
//	- create virtual lights for cascaded shadow maps
for(
// set GL state for depth map
f.clearColor(1,1,1,1),f.disable(f.BLEND),f.enable(f.CULL_FACE),f.frontFace(f.CCW),g.shadowMapCullFace===THREE.CullFaceFront?f.cullFace(f.FRONT):f.cullFace(f.BACK),g.setDepthTest(!0),r=0,s=n.__lights.length;s>r;r++)if(D=n.__lights[r],D.castShadow)if(D instanceof THREE.DirectionalLight&&D.shadowCascade)for(v=0;v<D.shadowCascadeCount;v++){var H;if(D.shadowCascadeArray[v])H=D.shadowCascadeArray[v];else{H=b(D,v),H.originalCamera=o;var I=new THREE.Gyroscope;I.position.copy(D.shadowCascadeOffset),I.add(H),I.add(H.target),o.add(I),D.shadowCascadeArray[v]=H,console.log("Created virtualLight",H)}c(D,v),E[F]=H,F++}else E[F]=D,F++;
// render depth map
for(r=0,s=E.length;s>r;r++){if(D=E[r],!D.shadowMap){var J=THREE.LinearFilter;g.shadowMapType===THREE.PCFSoftShadowMap&&(J=THREE.NearestFilter);var K={minFilter:J,magFilter:J,format:THREE.RGBAFormat};D.shadowMap=new THREE.WebGLRenderTarget(D.shadowMapWidth,D.shadowMapHeight,K),D.shadowMapSize=new THREE.Vector2(D.shadowMapWidth,D.shadowMapHeight),D.shadowMatrix=new THREE.Matrix4}if(!D.shadowCamera){if(D instanceof THREE.SpotLight)D.shadowCamera=new THREE.PerspectiveCamera(D.shadowCameraFov,D.shadowMapWidth/D.shadowMapHeight,D.shadowCameraNear,D.shadowCameraFar);else{if(!(D instanceof THREE.DirectionalLight)){console.error("Unsupported light type for shadow");continue}D.shadowCamera=new THREE.OrthographicCamera(D.shadowCameraLeft,D.shadowCameraRight,D.shadowCameraTop,D.shadowCameraBottom,D.shadowCameraNear,D.shadowCameraFar)}n.add(D.shadowCamera),n.autoUpdate===!0&&n.updateMatrixWorld()}D.shadowCameraVisible&&!D.cameraHelper&&(D.cameraHelper=new THREE.CameraHelper(D.shadowCamera),D.shadowCamera.add(D.cameraHelper)),D.isVirtual&&H.originalCamera==o&&d(o,D),w=D.shadowMap,x=D.shadowMatrix,y=D.shadowCamera,y.position.setFromMatrixPosition(D.matrixWorld),p.setFromMatrixPosition(D.target.matrixWorld),y.lookAt(p),y.updateMatrixWorld(),y.matrixWorldInverse.getInverse(y.matrixWorld),D.cameraHelper&&(D.cameraHelper.visible=D.shadowCameraVisible),D.shadowCameraVisible&&D.cameraHelper.update(),
// compute shadow matrix
x.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),x.multiply(y.projectionMatrix),x.multiply(y.matrixWorldInverse),
// update camera matrices and frustum
m.multiplyMatrices(y.projectionMatrix,y.matrixWorldInverse),l.setFromMatrix(m),
// render shadow map
g.setRenderTarget(w),g.clear(),
// set object matrices & frustum culling
q.length=0,a(n,n,y);
// render regular objects
var L,M,N;for(t=0,u=q.length;u>t;t++)B=q[t],C=B.object,z=B.buffer,
// culling is overriden globally for all objects
// while rendering depth map
// need to deal with MeshFaceMaterial somehow
// in that case just use the first of material.materials for now
// (proper solution would require to break objects by materials
//  similarly to regular rendering and then set corresponding
//  depth materials per each chunk instead of just once per object)
L=e(C),M=void 0!==C.geometry.morphTargets&&C.geometry.morphTargets.length>0&&L.morphTargets,N=C instanceof THREE.SkinnedMesh&&L.skinning,A=C.customDepthMaterial?C.customDepthMaterial:N?M?k:j:M?i:h,g.setMaterialFaces(L),z instanceof THREE.BufferGeometry?g.renderBufferDirect(y,n.__lights,G,A,z,C):g.renderBuffer(y,n.__lights,G,A,z,C);
// set matrices and render immediate objects
var O=n.__webglObjectsImmediate;for(t=0,u=O.length;u>t;t++)B=O[t],C=B.object,C.visible&&C.castShadow&&(C._modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,C.matrixWorld),g.renderImmediateObject(y,n.__lights,G,h,C))}
// restore GL state
var P=g.getClearColor(),Q=g.getClearAlpha();f.clearColor(P.r,P.g,P.b,Q),f.enable(f.BLEND),g.shadowMapCullFace===THREE.CullFaceFront&&f.cullFace(f.BACK)}},THREE.ShadowMapPlugin.__projector=new THREE.Projector,
// File:src/extras/renderers/plugins/SpritePlugin.js
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */
THREE.SpritePlugin=function(){function a(){var a=c.createProgram(),b=c.createShader(c.VERTEX_SHADER),e=c.createShader(c.FRAGMENT_SHADER);return c.shaderSource(b,["precision "+d.getPrecision()+" float;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform float rotation;","uniform vec2 scale;","uniform vec2 uvOffset;","uniform vec2 uvScale;","attribute vec2 position;","attribute vec2 uv;","varying vec2 vUV;","void main() {","vUV = uvOffset + uv * uvScale;","vec2 alignedPosition = position * scale;","vec2 rotatedPosition;","rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;","rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;","vec4 finalPosition;","finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );","finalPosition.xy += rotatedPosition;","finalPosition = projectionMatrix * finalPosition;","gl_Position = finalPosition;","}"].join("\n")),c.shaderSource(e,["precision "+d.getPrecision()+" float;","uniform vec3 color;","uniform sampler2D map;","uniform float opacity;","uniform int fogType;","uniform vec3 fogColor;","uniform float fogDensity;","uniform float fogNear;","uniform float fogFar;","uniform float alphaTest;","varying vec2 vUV;","void main() {","vec4 texture = texture2D( map, vUV );","if ( texture.a < alphaTest ) discard;","gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );","if ( fogType > 0 ) {","float depth = gl_FragCoord.z / gl_FragCoord.w;","float fogFactor = 0.0;","if ( fogType == 1 ) {","fogFactor = smoothstep( fogNear, fogFar, depth );","} else {","const float LOG2 = 1.442695;","float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );","fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );","}","gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );","}","}"].join("\n")),c.compileShader(b),c.compileShader(e),c.attachShader(a,b),c.attachShader(a,e),c.linkProgram(a),a}function b(a,b){return a.z!==b.z?b.z-a.z:b.id-a.id}var c,d,e,f,g,h,i,j,k,l,m=[];this.init=function(b){c=b.context,d=b,f=new Float32Array([-.5,-.5,0,0,.5,-.5,1,0,.5,.5,1,1,-.5,.5,0,1]),g=new Uint16Array([0,1,2,0,2,3]),h=c.createBuffer(),i=c.createBuffer(),c.bindBuffer(c.ARRAY_BUFFER,h),c.bufferData(c.ARRAY_BUFFER,f,c.STATIC_DRAW),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,i),c.bufferData(c.ELEMENT_ARRAY_BUFFER,g,c.STATIC_DRAW),j=a(),k={position:c.getAttribLocation(j,"position"),uv:c.getAttribLocation(j,"uv")},l={uvOffset:c.getUniformLocation(j,"uvOffset"),uvScale:c.getUniformLocation(j,"uvScale"),rotation:c.getUniformLocation(j,"rotation"),scale:c.getUniformLocation(j,"scale"),color:c.getUniformLocation(j,"color"),map:c.getUniformLocation(j,"map"),opacity:c.getUniformLocation(j,"opacity"),modelViewMatrix:c.getUniformLocation(j,"modelViewMatrix"),projectionMatrix:c.getUniformLocation(j,"projectionMatrix"),fogType:c.getUniformLocation(j,"fogType"),fogDensity:c.getUniformLocation(j,"fogDensity"),fogNear:c.getUniformLocation(j,"fogNear"),fogFar:c.getUniformLocation(j,"fogFar"),fogColor:c.getUniformLocation(j,"fogColor"),alphaTest:c.getUniformLocation(j,"alphaTest")};var m=document.createElement("canvas");m.width=8,m.height=8;var n=m.getContext("2d");n.fillStyle="white",n.fillRect(0,0,8,8),e=new THREE.Texture(m),e.needsUpdate=!0},this.render=function(a,f,g,n){if(m.length=0,a.traverseVisible(function(a){a instanceof THREE.Sprite&&m.push(a)}),0!==m.length){
// setup gl
c.useProgram(j),c.enableVertexAttribArray(k.position),c.enableVertexAttribArray(k.uv),c.disable(c.CULL_FACE),c.enable(c.BLEND),c.bindBuffer(c.ARRAY_BUFFER,h),c.vertexAttribPointer(k.position,2,c.FLOAT,!1,16,0),c.vertexAttribPointer(k.uv,2,c.FLOAT,!1,16,8),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,i),c.uniformMatrix4fv(l.projectionMatrix,!1,f.projectionMatrix.elements),c.activeTexture(c.TEXTURE0),c.uniform1i(l.map,0);var o=0,p=0,q=a.fog;q?(c.uniform3f(l.fogColor,q.color.r,q.color.g,q.color.b),q instanceof THREE.Fog?(c.uniform1f(l.fogNear,q.near),c.uniform1f(l.fogFar,q.far),c.uniform1i(l.fogType,1),o=1,p=1):q instanceof THREE.FogExp2&&(c.uniform1f(l.fogDensity,q.density),c.uniform1i(l.fogType,2),o=2,p=2)):(c.uniform1i(l.fogType,0),o=0,p=0);
// update positions and sort
for(var r=0,s=m.length;s>r;r++){var t=m[r],u=t.material;t._modelViewMatrix.multiplyMatrices(f.matrixWorldInverse,t.matrixWorld),t.z=-t._modelViewMatrix.elements[14]}m.sort(b);for(var v=[],r=0,s=m.length;s>r;r++){var t=m[r],u=t.material;c.uniform1f(l.alphaTest,u.alphaTest),c.uniformMatrix4fv(l.modelViewMatrix,!1,t._modelViewMatrix.elements),v[0]=t.scale.x,v[1]=t.scale.y;var w=0;a.fog&&u.fog&&(w=p),o!==w&&(c.uniform1i(l.fogType,w),o=w),null!==u.map?(c.uniform2f(l.uvOffset,u.map.offset.x,u.map.offset.y),c.uniform2f(l.uvScale,u.map.repeat.x,u.map.repeat.y)):(c.uniform2f(l.uvOffset,0,0),c.uniform2f(l.uvScale,1,1)),c.uniform1f(l.opacity,u.opacity),c.uniform3f(l.color,u.color.r,u.color.g,u.color.b),c.uniform1f(l.rotation,u.rotation),c.uniform2fv(l.scale,v),d.setBlending(u.blending,u.blendEquation,u.blendSrc,u.blendDst),d.setDepthTest(u.depthTest),d.setDepthWrite(u.depthWrite),u.map&&u.map.image&&u.map.image.width?d.setTexture(u.map,0):d.setTexture(e,0),c.drawElements(c.TRIANGLES,6,c.UNSIGNED_SHORT,0)}
// restore gl
c.enable(c.CULL_FACE)}}},
// File:src/extras/renderers/plugins/DepthPassPlugin.js
/**
 * @author alteredq / http://alteredqualia.com/
 */
THREE.DepthPassPlugin=function(){function a(b,c,d){if(c.visible){var e=b.__webglObjects[c.id];if(e&&(c.frustumCulled===!1||i.intersectsObject(c)===!0))for(var f=0,g=e.length;g>f;f++){var h=e[f];c._modelViewMatrix.multiplyMatrices(d.matrixWorldInverse,c.matrixWorld),k.push(h)}for(var f=0,g=c.children.length;g>f;f++)a(b,c.children[f],d)}}
// For the moment just ignore objects that have multiple materials with different animation methods
// Only the first material will be taken into account for deciding which depth material to use
function b(a){return a.material instanceof THREE.MeshFaceMaterial?a.material.materials[0]:a.material}this.enabled=!1,this.renderTarget=null;var c,d,e,f,g,h,i=new THREE.Frustum,j=new THREE.Matrix4,k=[];this.init=function(a){c=a.context,d=a;var b=THREE.ShaderLib.depthRGBA,i=THREE.UniformsUtils.clone(b.uniforms);e=new THREE.ShaderMaterial({fragmentShader:b.fragmentShader,vertexShader:b.vertexShader,uniforms:i}),f=new THREE.ShaderMaterial({fragmentShader:b.fragmentShader,vertexShader:b.vertexShader,uniforms:i,morphTargets:!0}),g=new THREE.ShaderMaterial({fragmentShader:b.fragmentShader,vertexShader:b.vertexShader,uniforms:i,skinning:!0}),h=new THREE.ShaderMaterial({fragmentShader:b.fragmentShader,vertexShader:b.vertexShader,uniforms:i,morphTargets:!0,skinning:!0}),e._shadowPass=!0,f._shadowPass=!0,g._shadowPass=!0,h._shadowPass=!0},this.render=function(a,b){this.enabled&&this.update(a,b)},this.update=function(l,m){var n,o,p,q,r,s,t,u=null;
// set GL state for depth map
c.clearColor(1,1,1,1),c.disable(c.BLEND),d.setDepthTest(!0),
// update scene
l.autoUpdate===!0&&l.updateMatrixWorld(),
// update camera matrices and frustum
m.matrixWorldInverse.getInverse(m.matrixWorld),j.multiplyMatrices(m.projectionMatrix,m.matrixWorldInverse),i.setFromMatrix(j),
// render depth map
d.setRenderTarget(this.renderTarget),d.clear(),
// set object matrices & frustum culling
k.length=0,a(l,l,m);
// render regular objects
var v,w,x;for(n=0,o=k.length;o>n;n++)r=k[n],s=r.object,p=r.buffer,
// todo: create proper depth material for particles
s instanceof THREE.PointCloud&&!s.customDepthMaterial||(v=b(s),v&&d.setMaterialFaces(s.material),w=void 0!==s.geometry.morphTargets&&s.geometry.morphTargets.length>0&&v.morphTargets,x=s instanceof THREE.SkinnedMesh&&v.skinning,q=s.customDepthMaterial?s.customDepthMaterial:x?w?h:g:w?f:e,p instanceof THREE.BufferGeometry?d.renderBufferDirect(m,l.__lights,u,q,p,s):d.renderBuffer(m,l.__lights,u,q,p,s));for(
// set matrices and render immediate objects
t=l.__webglObjectsImmediate,n=0,o=t.length;o>n;n++)r=t[n],s=r.object,s.visible&&(s._modelViewMatrix.multiplyMatrices(m.matrixWorldInverse,s.matrixWorld),d.renderImmediateObject(m,l.__lights,u,e,s));
// restore GL state
var y=d.getClearColor(),z=d.getClearAlpha();c.clearColor(y.r,y.g,y.b,z),c.enable(c.BLEND)}},
// File:src/extras/shaders/ShaderFlares.js
/**
 * @author mikael emtinger / http://gomo.se/
 */
THREE.ShaderFlares={lensFlareVertexTexture:{vertexShader:["uniform lowp int renderType;","uniform vec3 screenPosition;","uniform vec2 scale;","uniform float rotation;","uniform sampler2D occlusionMap;","attribute vec2 position;","attribute vec2 uv;","varying vec2 vUV;","varying float vVisibility;","void main() {","vUV = uv;","vec2 pos = position;","if( renderType == 2 ) {","vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );","visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );","visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );","visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );","visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );","visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );","visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );","visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );","visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );","vVisibility =        visibility.r / 9.0;","vVisibility *= 1.0 - visibility.g / 9.0;","vVisibility *=       visibility.b / 9.0;","vVisibility *= 1.0 - visibility.a / 9.0;","pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;","pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;","}","gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );","}"].join("\n"),fragmentShader:["uniform lowp int renderType;","uniform sampler2D map;","uniform float opacity;","uniform vec3 color;","varying vec2 vUV;","varying float vVisibility;","void main() {",
// pink square
"if( renderType == 0 ) {","gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );",
// restore
"} else if( renderType == 1 ) {","gl_FragColor = texture2D( map, vUV );",
// flare
"} else {","vec4 texture = texture2D( map, vUV );","texture.a *= opacity * vVisibility;","gl_FragColor = texture;","gl_FragColor.rgb *= color;","}","}"].join("\n")},lensFlare:{vertexShader:["uniform lowp int renderType;","uniform vec3 screenPosition;","uniform vec2 scale;","uniform float rotation;","attribute vec2 position;","attribute vec2 uv;","varying vec2 vUV;","void main() {","vUV = uv;","vec2 pos = position;","if( renderType == 2 ) {","pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;","pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;","}","gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );","}"].join("\n"),fragmentShader:["precision mediump float;","uniform lowp int renderType;","uniform sampler2D map;","uniform sampler2D occlusionMap;","uniform float opacity;","uniform vec3 color;","varying vec2 vUV;","void main() {",
// pink square
"if( renderType == 0 ) {","gl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );",
// restore
"} else if( renderType == 1 ) {","gl_FragColor = texture2D( map, vUV );",
// flare
"} else {","float visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;","visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;","visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;","visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;","visibility = ( 1.0 - visibility / 4.0 );","vec4 texture = texture2D( map, vUV );","texture.a *= opacity * visibility;","gl_FragColor = texture;","gl_FragColor.rgb *= color;","}","}"].join("\n")}};