/*! loglevel - v1.2.0 - https://github.com/pimterry/loglevel - (c) 2014 Tim Perry - licensed MIT */
!function(a,b){"object"==typeof module&&module.exports&&"function"==typeof require?module.exports=b():"function"==typeof define&&"object"==typeof define.amd?define("lib/loglevel",b):a.log=b()}(this,function(){function a(a){return typeof console===i?!1:void 0!==console[a]?b(console,a):void 0!==console.log?b(console,"log"):h}function b(a,b){var c=a[b];if("function"==typeof c.bind)return c.bind(a);try{return Function.prototype.bind.call(c,a)}catch(d){
// Missing bind shim or IE8 + Modernizr, fallback to wrapping
return function(){return Function.prototype.apply.apply(c,[a,arguments])}}}function c(a,b){return function(){typeof console!==i&&(d(b),g[a].apply(g,arguments))}}function d(a){for(var b=0;b<j.length;b++){var c=j[b];g[c]=a>b?h:g.methodFactory(c,a)}}function e(a){var b=(j[a]||"silent").toUpperCase();
// Use localStorage if available
try{return void(window.localStorage.loglevel=b)}catch(c){}
// Use session cookie as fallback
try{window.document.cookie="loglevel="+b+";"}catch(c){}}function f(){var a;try{a=window.localStorage.loglevel}catch(b){}if(typeof a===i)try{a=/loglevel=([^;]+)/.exec(window.document.cookie)[1]}catch(b){}void 0===g.levels[a]&&(a="WARN"),g.setLevel(g.levels[a])}var g={},h=function(){},i="undefined",j=["trace","debug","info","warn","error"];/*
     *
     * Public API
     *
     */
g.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},g.level=2,// @note web-rocket modification
g.methodFactory=function(b,d){return a(b)||c(b,d)},g.setLevel=function(a){if("string"==typeof a&&void 0!==g.levels[a.toUpperCase()]&&(a=g.levels[a.toUpperCase()]),!("number"==typeof a&&a>=0&&a<=g.levels.SILENT))throw"log.setLevel() called with invalid level: "+a;return this.level=a,e(a),d(a),typeof console===i&&a<g.levels.SILENT?"No console available for logging":void 0},g.enableAll=function(){g.setLevel(g.levels.TRACE)},g.disableAll=function(){g.setLevel(g.levels.SILENT)};
// Grab the current global log variable in case of overwrite
var k=typeof window!==i?window.log:void 0;return g.noConflict=function(){return typeof window!==i&&window.log===g&&(window.log=k),g},f(),g});