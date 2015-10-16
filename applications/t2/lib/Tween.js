/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/sole/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/sole/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */
// Date.now shim for (ahem) Internet Explo(d|r)er
void 0===Date.now&&(Date.now=function(){return(new Date).valueOf()});var TWEEN=TWEEN||function(){var a=[];return{REVISION:"14",getAll:function(){return a},removeAll:function(){a=[]},add:function(b){a.push(b)},remove:function(b){var c=a.indexOf(b);-1!==c&&a.splice(c,1)},update:function(b){if(0===a.length)return!1;var c=0;for(b=void 0!==b?b:"undefined"!=typeof window&&void 0!==window.performance&&void 0!==window.performance.now?window.performance.now():Date.now();c<a.length;)a[c].update(b)?c++:a.splice(c,1);return!0}}}();TWEEN.Tween=function(a){var b=a,c={},d={},e={},f=1e3,g=0,h=!1,i=!1,j=!1,k=0,l=null,m=TWEEN.Easing.Linear.None,n=TWEEN.Interpolation.Linear,o=[],p=null,q=!1,r=null,s=null,t=null;
// Set all starting values present on the target object
for(var u in a)c[u]=parseFloat(a[u],10);this.to=function(a,b){return void 0!==b&&(f=b),d=a,this},this.start=function(a){TWEEN.add(this),i=!0,q=!1,l=void 0!==a?a:"undefined"!=typeof window&&void 0!==window.performance&&void 0!==window.performance.now?window.performance.now():Date.now(),l+=k;for(var f in d){
// check if an Array was provided as property value
if(d[f]instanceof Array){if(0===d[f].length)continue;
// create a local copy of the Array with the start value at the front
d[f]=[b[f]].concat(d[f])}c[f]=b[f],c[f]instanceof Array==!1&&(c[f]*=1),e[f]=c[f]||0}return this},this.isPlaying=function(){return i},this.stop=function(){return i?(TWEEN.remove(this),i=!1,null!==t&&t.call(b),this.stopChainedTweens(),this):this},this.stopChainedTweens=function(){for(var a=0,b=o.length;b>a;a++)o[a].stop()},this.delay=function(a){return k=a,this},this.repeat=function(a){return g=a,this},this.yoyo=function(a){return h=a,this},this.easing=function(a){return m=a,this},this.interpolation=function(a){return n=a,this},this.chain=function(){return o=arguments,this},this.onStart=function(a){return p=a,this},this.onUpdate=function(a){return r=a,this},this.onComplete=function(a){return s=a,this},this.onStop=function(a){return t=a,this},this.update=function(a){var t;if(l>a)return!0;q===!1&&(null!==p&&p.call(b),q=!0);var u=(a-l)/f;u=u>1?1:u;var v=m(u);for(t in d){var w=c[t]||0,x=d[t];x instanceof Array?b[t]=n(x,v):(
// Parses relative end values with start as base (e.g.: +10, -3)
"string"==typeof x&&(x=w+parseFloat(x,10)),
// protect against non numeric properties.
"number"==typeof x&&(b[t]=w+(x-w)*v))}if(null!==r&&r.call(b,v),1==u){if(g>0){isFinite(g)&&g--;
// reassign starting values, restart by making startTime = now
for(t in e){if("string"==typeof d[t]&&(e[t]=e[t]+parseFloat(d[t],10)),h){var y=e[t];e[t]=d[t],d[t]=y}c[t]=e[t]}return h&&(j=!j),l=a+k,!0}i=!1,null!==s&&s.call(b);for(var z=0,A=o.length;A>z;z++)o[z].start(a);return!1}return!0}},TWEEN.Easing={Linear:{None:function(a){return a}},Quadratic:{In:function(a){return a*a},Out:function(a){return a*(2-a)},InOut:function(a){return(a*=2)<1?.5*a*a:-.5*(--a*(a-2)-1)}},Cubic:{In:function(a){return a*a*a},Out:function(a){return--a*a*a+1},InOut:function(a){return(a*=2)<1?.5*a*a*a:.5*((a-=2)*a*a+2)}},Quartic:{In:function(a){return a*a*a*a},Out:function(a){return 1- --a*a*a*a},InOut:function(a){return(a*=2)<1?.5*a*a*a*a:-.5*((a-=2)*a*a*a-2)}},Quintic:{In:function(a){return a*a*a*a*a},Out:function(a){return--a*a*a*a*a+1},InOut:function(a){return(a*=2)<1?.5*a*a*a*a*a:.5*((a-=2)*a*a*a*a+2)}},Sinusoidal:{In:function(a){return 1-Math.cos(a*Math.PI/2)},Out:function(a){return Math.sin(a*Math.PI/2)},InOut:function(a){return.5*(1-Math.cos(Math.PI*a))}},Exponential:{In:function(a){return 0===a?0:Math.pow(1024,a-1)},Out:function(a){return 1===a?1:1-Math.pow(2,-10*a)},InOut:function(a){return 0===a?0:1===a?1:(a*=2)<1?.5*Math.pow(1024,a-1):.5*(-Math.pow(2,-10*(a-1))+2)}},Circular:{In:function(a){return 1-Math.sqrt(1-a*a)},Out:function(a){return Math.sqrt(1- --a*a)},InOut:function(a){return(a*=2)<1?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)}},Elastic:{In:function(a){var b,c=.1,d=.4;return 0===a?0:1===a?1:(!c||1>c?(c=1,b=d/4):b=d*Math.asin(1/c)/(2*Math.PI),-(c*Math.pow(2,10*(a-=1))*Math.sin(2*(a-b)*Math.PI/d)))},Out:function(a){var b,c=.1,d=.4;return 0===a?0:1===a?1:(!c||1>c?(c=1,b=d/4):b=d*Math.asin(1/c)/(2*Math.PI),c*Math.pow(2,-10*a)*Math.sin(2*(a-b)*Math.PI/d)+1)},InOut:function(a){var b,c=.1,d=.4;return 0===a?0:1===a?1:(!c||1>c?(c=1,b=d/4):b=d*Math.asin(1/c)/(2*Math.PI),(a*=2)<1?-.5*c*Math.pow(2,10*(a-=1))*Math.sin(2*(a-b)*Math.PI/d):c*Math.pow(2,-10*(a-=1))*Math.sin(2*(a-b)*Math.PI/d)*.5+1)}},Back:{In:function(a){var b=1.70158;return a*a*((b+1)*a-b)},Out:function(a){var b=1.70158;return--a*a*((b+1)*a+b)+1},InOut:function(a){var b=2.5949095;return(a*=2)<1?.5*a*a*((b+1)*a-b):.5*((a-=2)*a*((b+1)*a+b)+2)}},Bounce:{In:function(a){return 1-TWEEN.Easing.Bounce.Out(1-a)},Out:function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},InOut:function(a){return.5>a?.5*TWEEN.Easing.Bounce.In(2*a):.5*TWEEN.Easing.Bounce.Out(2*a-1)+.5}}},TWEEN.Interpolation={Linear:function(a,b){var c=a.length-1,d=c*b,e=Math.floor(d),f=TWEEN.Interpolation.Utils.Linear;return 0>b?f(a[0],a[1],d):b>1?f(a[c],a[c-1],c-d):f(a[e],a[e+1>c?c:e+1],d-e)},Bezier:function(a,b){var c,d=0,e=a.length-1,f=Math.pow,g=TWEEN.Interpolation.Utils.Bernstein;for(c=0;e>=c;c++)d+=f(1-b,e-c)*f(b,c)*a[c]*g(e,c);return d},CatmullRom:function(a,b){var c=a.length-1,d=c*b,e=Math.floor(d),f=TWEEN.Interpolation.Utils.CatmullRom;return a[0]===a[c]?(0>b&&(e=Math.floor(d=c*(1+b))),f(a[(e-1+c)%c],a[e],a[(e+1)%c],a[(e+2)%c],d-e)):0>b?a[0]-(f(a[0],a[0],a[1],a[1],-d)-a[0]):b>1?a[c]-(f(a[c],a[c],a[c-1],a[c-1],d-c)-a[c]):f(a[e?e-1:0],a[e],a[e+1>c?c:e+1],a[e+2>c?c:e+2],d-e)},Utils:{Linear:function(a,b,c){return(b-a)*c+a},Bernstein:function(a,b){var c=TWEEN.Interpolation.Utils.Factorial;return c(a)/c(b)/c(a-b)},Factorial:function(){var a=[1];return function(b){var c,d=1;if(a[b])return a[b];for(c=b;c>1;c--)d*=c;return a[b]=d}}(),CatmullRom:function(a,b,c,d,e){var f=.5*(c-a),g=.5*(d-b),h=e*e,i=e*h;return(2*b-2*c+f+g)*i+(-3*b+3*c-2*f-g)*h+f*e+b}}};