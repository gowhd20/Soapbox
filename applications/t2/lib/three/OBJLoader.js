/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.OBJLoader=function(a){this.manager=void 0!==a?a:THREE.DefaultLoadingManager},THREE.OBJLoader.prototype={constructor:THREE.OBJLoader,load:function(a,b,c,d){var e=this,f=new THREE.XHRLoader(e.manager);f.setCrossOrigin(this.crossOrigin),f.load(a,function(a){b(e.parse(a))},c,d)},parse:function(a){function b(a){var b=parseInt(a);return 3*(b>=0?b-1:b+m.length/3)}function c(a){var b=parseInt(a);return 3*(b>=0?b-1:b+n.length/3)}function d(a){var b=parseInt(a);return 2*(b>=0?b-1:b+o.length/2)}function e(a,b,c){j.vertices.push(m[a],m[a+1],m[a+2],m[b],m[b+1],m[b+2],m[c],m[c+1],m[c+2])}function f(a,b,c){j.normals.push(n[a],n[a+1],n[a+2],n[b],n[b+1],n[b+2],n[c],n[c+1],n[c+2])}function g(a,b,c){j.uvs.push(o[a],o[a+1],o[b],o[b+1],o[c],o[c+1])}function h(a,h,i,j,k,l,m,n,o,p,q,r){var s,t=b(a),u=b(h),v=b(i);void 0===j?e(t,u,v):(s=b(j),e(t,u,s),e(u,v,s)),void 0!==k&&(t=d(k),u=d(l),v=d(m),void 0===j?g(t,u,v):(s=d(n),g(t,u,s),g(u,v,s))),void 0!==o&&(t=c(o),u=c(p),v=c(q),void 0===j?f(t,u,v):(s=c(r),f(t,u,s),f(u,v,s)))}console.time("OBJLoader");var i,j,k,l=[];
// create mesh if no objects in text
/^o /gm.test(a)===!1&&(j={vertices:[],normals:[],uvs:[]},k={name:""},i={name:"",geometry:j,material:k},l.push(i));for(var m=[],n=[],o=[],p=/v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,q=/vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,r=/vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,s=/f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/,t=/f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/,u=/f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/,v=/f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/,w=a.split("\n"),x=0;x<w.length;x++){var y=w[x];y=y.trim();var z;0!==y.length&&"#"!==y.charAt(0)&&(null!==(z=p.exec(y))?
// ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
m.push(parseFloat(z[1]),parseFloat(z[2]),parseFloat(z[3])):null!==(z=q.exec(y))?
// ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
n.push(parseFloat(z[1]),parseFloat(z[2]),parseFloat(z[3])):null!==(z=r.exec(y))?
// ["vt 0.1 0.2", "0.1", "0.2"]
o.push(parseFloat(z[1]),parseFloat(z[2])):null!==(z=s.exec(y))?
// ["f 1 2 3", "1", "2", "3", undefined]
h(z[1],z[2],z[3],z[4]):null!==(z=t.exec(y))?
// ["f 1/1 2/2 3/3", " 1/1", "1", "1", " 2/2", "2", "2", " 3/3", "3", "3", undefined, undefined, undefined]
h(z[2],z[5],z[8],z[11],z[3],z[6],z[9],z[12]):null!==(z=u.exec(y))?
// ["f 1/1/1 2/2/2 3/3/3", " 1/1/1", "1", "1", "1", " 2/2/2", "2", "2", "2", " 3/3/3", "3", "3", "3", undefined, undefined, undefined, undefined]
h(z[2],z[6],z[10],z[14],z[3],z[7],z[11],z[15],z[4],z[8],z[12],z[16]):null!==(z=v.exec(y))?
// ["f 1//1 2//2 3//3", " 1//1", "1", "1", " 2//2", "2", "2", " 3//3", "3", "3", undefined, undefined, undefined]
h(z[2],z[5],z[8],z[11],void 0,void 0,void 0,void 0,z[3],z[6],z[9],z[12]):/^o /.test(y)?(j={vertices:[],normals:[],uvs:[]},k={name:""},i={name:y.substring(2).trim(),geometry:j,material:k},l.push(i)):/^g /.test(y)||(/^usemtl /.test(y)?
// material
k.name=y.substring(7).trim():/^mtllib /.test(y)||/^s /.test(y)))}for(var A=new THREE.Object3D,x=0,B=l.length;B>x;x++){i=l[x],j=i.geometry;var C=new THREE.BufferGeometry;C.addAttribute("position",new THREE.BufferAttribute(new Float32Array(j.vertices),3)),j.normals.length>0&&C.addAttribute("normal",new THREE.BufferAttribute(new Float32Array(j.normals),3)),j.uvs.length>0&&C.addAttribute("uv",new THREE.BufferAttribute(new Float32Array(j.uvs),2)),k=new THREE.MeshLambertMaterial,k.name=i.material.name;var D=new THREE.Mesh(C,k);D.name=i.name,A.add(D)}return console.timeEnd("OBJLoader"),A}};