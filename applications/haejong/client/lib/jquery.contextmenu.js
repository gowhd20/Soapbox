/**
 * jQuery.contextMenu - Show a custom context when right clicking something
 * Jonas Arnklint, http://github.com/arnklint/jquery-contextMenu
 * Released into the public domain
 * Date: Jan 14, 2011
 * @author Jonas Arnklint
 * @version 1.7
 *
*/
// Making a local '$' alias of jQuery to support jQuery.noConflict
!function(a){jQuery.fn.contextMenu=function(b,c,d){var e=this,f=a(window),g=a('<ul id="'+b+'" class="context-menu"></ul>').hide().appendTo("body"),h=null,// last clicked element that responds with contextMenu
i=function(){a(".context-menu:visible").each(function(){a(this).trigger("closed"),a(this).hide(),a("body").unbind("click",i),g.unbind("closed")})},j={disable_native_context_menu:!1,// disables the native contextmenu everywhere you click
leftClick:!1},d=a.extend(j,d);if(a(document).bind("contextmenu",function(a){d.disable_native_context_menu&&a.preventDefault(),i()}),a.each(c,function(b,c){if(c.link)var d=c.link;else var d='<a href="#">'+b+"</a>";var e=a("<li>"+d+"</li>");c.klass&&e.attr("class",c.klass),e.appendTo(g).bind("click",function(a){c.click(h),a.preventDefault()})}),d.leftClick)var k="click";else var k="contextmenu";var l=function(b){
// Hide any existing context menus
i(),h=a(this),// set clicked element
d.showMenu&&d.showMenu.call(g,h),
// Bind to the closed event if there is a hideMenu handler specified
d.hideMenu&&g.bind("closed",function(){d.hideMenu.call(g,h)}),g.css({visibility:"hidden",position:"absolute",zIndex:1e3});
// include margin so it can be used to offset from page border.
var c=g.outerWidth(!0),e=g.outerHeight(!0),j=b.pageX-f.scrollLeft()+c<f.width()?b.pageX:b.pageX-c,k=b.pageY-f.scrollTop()+e<f.height()?b.pageY:b.pageY-e;return g.show(0,function(){a("body").bind("click",i)}).css({visibility:"visible",top:k+"px",left:j+"px",zIndex:1e3}),!1};return d.delegateEventTo?e.on(k,d.delegateEventTo,l):e.bind(k,l)}}(jQuery);