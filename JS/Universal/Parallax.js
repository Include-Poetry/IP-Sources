
$(document).ready(function(){
   $window = $(window);
    $('article[data-type="background"]').each(function() {
        var $scroll = $(this);

        $(window).scroll(function() {
            var yPos = -($window.scrollTop() / $scroll.data('speed'));
            var coords = '50%' + yPos + 'px';//Antes era '50%' al inicio
            $scroll.css({ backgroundPosition: coords });
        });
    });
});
