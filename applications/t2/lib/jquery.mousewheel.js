/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.3
 *
 * Requires: 1.2.2+
 */
!function(a){
// AMD. Register as an anonymous module.
a("function"==typeof define&&define.amd?jQuery:"object"==typeof exports?jQuery:jQuery)}(function(a){function b(b){var e,f=b||window.event,g=[].slice.call(arguments,1),h=0,i=0,j=0,k=0,l=0;
// Old school scrollwheel delta
// New school wheel delta (wheel event)
// Webkit
// Look for lowest delta to normalize the delta values
// Get a whole value for the deltas
// Add event and delta to the front of the arguments
return b=a.event.fix(f),b.type="mousewheel",f.wheelDelta&&(h=f.wheelDelta),f.detail&&(h=-1*f.detail),f.deltaY&&(j=-1*f.deltaY,h=j),f.deltaX&&(i=f.deltaX,h=-1*i),void 0!==f.wheelDeltaY&&(j=f.wheelDeltaY),void 0!==f.wheelDeltaX&&(i=-1*f.wheelDeltaX),k=Math.abs(h),(!c||c>k)&&(c=k),l=Math.max(Math.abs(j),Math.abs(i)),(!d||d>l)&&(d=l),e=h>0?"floor":"ceil",h=Math[e](h/c),i=Math[e](i/d),j=Math[e](j/d),g.unshift(b,h,i,j),(a.event.dispatch||a.event.handle).apply(this,g)}var c,d,e=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],f="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"];if(a.event.fixHooks)for(var g=e.length;g;)a.event.fixHooks[e[--g]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=f.length;a;)this.addEventListener(f[--a],b,!1);else this.onmousewheel=b},teardown:function(){if(this.removeEventListener)for(var a=f.length;a;)this.removeEventListener(f[--a],b,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});