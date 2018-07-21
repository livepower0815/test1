$.fn.extend({
    animateCss: function(animationName, callback) {
      var animationEnd = (function(el) {
        var animations = {
          animation: 'animationend',
          OAnimation: 'oAnimationEnd',
          MozAnimation: 'mozAnimationEnd',
          WebkitAnimation: 'webkitAnimationEnd',
        };
  
        for (var t in animations) {
          if (el.style[t] !== undefined) {
            return animations[t];
          }
        }
      })(document.createElement('div'));
  
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
  
        if (typeof callback === 'function') callback();
      });
  
      return this;
    },
  });
$(document).ready(function () {
    $(".box1").click(function () {
        $(this).animateCss("rubberBand");
    });
    $(".box2").click(function () {
        $(".box2").animateCss("swing");
    });
    $(".box3").click(function () {
        $(".box3").animateCss("hinge");
    });
    $(".box4").click(function () {
        $(".box4").animateCss("flipInY");
    });
});