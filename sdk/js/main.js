
window.addEventListener('polymer-ready', function(e) {
    // Animate shadows on sections
    /*$("section").each(function() {
        $(this).hover(function() {
            $("paper-shadow", this).first().get(0).setZ(2);
        }, function() {
            $("paper-shadow", this).first().get(0).setZ(1);
        });
    });*/

    // Animate show section contents
    $(".section-content").each(function(index)
    {
        (function(elem, i) {
            var toAnimate = [elem];
            toAnimate.push(elem.parent().find(".section-title").first());
            toAnimate.push(elem.parent().find(".section-stats").first());
            for (var ei = 0; ei < toAnimate.length; ei++) {
                if (toAnimate[ei]) toAnimate[ei].hide();
            };
            setTimeout(function() {
                var speed = elem.height() > 500 ? 1250 : 500;
                for (var ei = 0; ei < toAnimate.length; ei++) {
                    if (toAnimate[ei])
                    {
                        //if (!toAnimate[ei].hasClass("section-stats"))
                            toAnimate[ei].slideDown(speed);
                        /*else if (toAnimate[ei].attr("id") !== "server-stats") // @todo This is a hack for the status page
                            toAnimate[ei].fadeIn(4000);*/
                    }
                }
            }, i * 500);
        }($(this), index));
    });
});

window.showToast = function(message)
{
    var toast = $("body").find("#sdk-toast");
    if (toast && toast.length > 0)
    {
        toast.attr("text", message);
        toast[0].show();
    }
};
