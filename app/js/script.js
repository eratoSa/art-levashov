/*
 Third party
 */

//= ../bower_components/jquery/dist/jquery.min.js
//= ../bower_components/owl-carousel/owl-carousel/owl.carousel.js
//= ../bower_components/gsap/src/minified/TweenMax.min.js
//= ../bower_components/gsap/src/minified/plugins/ScrollToPlugin.min.js
//= ../bower_components/jquery-resize-image-to-parent/jquery.resizeimagetoparent.js
//= ../bower_components/jquery.easing/js/jquery.easing.min.js


/*
 Custom
 */

(function($) {
    $(function(){
        /*This area for init Function*/

        pageEntryAnimation();
        gridFunc();
        slideInAsUScollDown();
        imageResize();
    });

    /*This area for declaration Functions*/

    function  pageEntryAnimation(){
        TweenMax.to("html", 0.5, {delay:0.5, opacity: 1, ease:Cubic.easeInOut});
    }

    function imageResize(){
        $('.img-resize').resizeToParent();
    }

    function gridFunc(){

        // for turn on grid press CTRL + ALT + X
        document.onkeydown = keydown;
        function keydown(e){
            if (!e) e = event;
            var gridon = "on";
            if(e.ctrlKey && e.altKey && e.keyCode == 88) {
                if ($('.dev-grid').hasClass(gridon)) {
                    $('.dev-grid').removeClass(gridon);
                }
                else {
                    $('.dev-grid').addClass(gridon);
                }
            }
        }
    }

    function slideInAsUScollDown(){
        $.fn.visible = function(partial) {

            var $t            = $(this),
                $w            = $(window),
                viewTop       = $w.scrollTop(),
                viewBottom    = viewTop + $w.height(),
                _top          = $t.offset().top,
                _bottom       = _top + $t.height(),
                compareTop    = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;

            return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

        };

        var win = $(window);
        var allMods = $(".display");

        allMods.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("animate");
                el.removeClass("fade-in");
            } else {
                el.addClass("fade-in");
            }

        });

        win.scroll(function (event) {
            allMods.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("animate");
                    el.removeClass("fade-in");
                }
            });
        });

        win.resize(function (event) {
            allMods.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("animate");
                    el.removeClass("fade-in");
                }
            });
        });

        allMods.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("animate");
                el.removeClass("fade-in");
            }
        });
    }

})(jQuery);

