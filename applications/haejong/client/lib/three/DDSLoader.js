/*
 * @author mrdoob / http://mrdoob.com/
 */
THREE.DDSLoader=function(){},THREE.DDSLoader.prototype={constructor:THREE.DDSLoader,load:function(a,b,c){var d=this,e=[],f=new THREE.CompressedTexture;if(f.image=e,
// no flipping for cube textures
// (also flipping doesn't work for compressed textures )
f.flipY=!1,
// can't generate mipmaps for compressed textures
// mips must be embedded in DDS files
f.generateMipmaps=!1,a instanceof Array){var g=0,h=new THREE.XHRLoader;h.setResponseType("arraybuffer");for(var i=function(c){h.load(a[c],function(a){var h=d.parse(a,!0);e[c]={width:h.width,height:h.height,format:h.format,mipmaps:h.mipmaps},g+=1,6===g&&(f.format=h.format,f.needsUpdate=!0,b&&b(f))})},j=0,k=a.length;k>j;++j)i(j)}else{
// compressed cubemap texture stored in a single DDS file
var h=new THREE.XHRLoader;h.setResponseType("arraybuffer"),h.load(a,function(a){var c=d.parse(a,!0);if(c.isCubemap)for(var g=c.mipmaps.length/c.mipmapCount,h=0;g>h;h++){e[h]={mipmaps:[]};for(var i=0;i<c.mipmapCount;i++)e[h].mipmaps.push(c.mipmaps[h*c.mipmapCount+i]),e[h].format=c.format,e[h].width=c.width,e[h].height=c.height}else f.image.width=c.width,f.image.height=c.height,f.mipmaps=c.mipmaps;f.format=c.format,f.needsUpdate=!0,b&&b(f)})}return f},parse:function(a,b){function c(a){return a.charCodeAt(0)+(a.charCodeAt(1)<<8)+(a.charCodeAt(2)<<16)+(a.charCodeAt(3)<<24)}function d(a){return String.fromCharCode(255&a,a>>8&255,a>>16&255,a>>24&255)}function e(a,b,c,d){for(var e=c*d*4,f=new Uint8Array(a,b,e),g=new Uint8Array(e),h=0,i=0,j=0;d>j;j++)for(var k=0;c>k;k++){var l=f[i];i++;var m=f[i];i++;var n=f[i];i++;var o=f[i];i++,g[h]=n,h++,//r
g[h]=m,h++,//g
g[h]=l,h++,//b
g[h]=o,h++}return g}var f={mipmaps:[],width:0,height:0,format:null,mipmapCount:1},g=542327876,h=131072,i=512,j=4,k=c("DXT1"),l=c("DXT3"),m=c("DXT5"),n=31,o=0,p=1,q=2,r=3,s=4,t=7,u=20,v=21,w=22,x=23,y=24,z=25,A=26,B=28,C=new Int32Array(a,0,n);if(C[o]!==g)return console.error("THREE.DDSLoader.parse: Invalid magic number in DDS header."),f;if(!C[u]&j)return console.error("THREE.DDSLoader.parse: Unsupported format, must contain a FourCC code."),f;var D,E=C[v],F=!1;switch(E){case k:D=8,f.format=THREE.RGB_S3TC_DXT1_Format;break;case l:D=16,f.format=THREE.RGBA_S3TC_DXT3_Format;break;case m:D=16,f.format=THREE.RGBA_S3TC_DXT5_Format;break;default:if(!(32==C[w]&&16711680&C[x]&&65280&C[y]&&255&C[z]&&4278190080&C[A]))return console.error("THREE.DDSLoader.parse: Unsupported FourCC code ",d(E)),f;F=!0,D=64,f.format=THREE.RGBAFormat}f.mipmapCount=1,C[q]&h&&b!==!1&&(f.mipmapCount=Math.max(1,C[t])),
//TODO: Verify that all faces of the cubemap are present with DDSCAPS2_CUBEMAP_POSITIVEX, etc.
f.isCubemap=C[B]&i?!0:!1,f.width=C[s],f.height=C[r];for(var G=C[p]+4,H=f.width,I=f.height,J=f.isCubemap?6:1,K=0;J>K;K++){for(var L=0;L<f.mipmapCount;L++){if(F)var M=e(a,G,H,I),N=M.length;else var N=Math.max(4,H)/4*Math.max(4,I)/4*D,M=new Uint8Array(a,G,N);var O={data:M,width:H,height:I};f.mipmaps.push(O),G+=N,H=Math.max(.5*H,1),I=Math.max(.5*I,1)}H=f.width,I=f.height}return f}};