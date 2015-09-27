$(document).ready(function() {
   var HeaderH = $('header').outerHeight(true);
   // console.log("header height: " + HeaderH);
   
   $(window).scroll(function() {
       var scrollVal = $(this).scrollTop();
        if ( scrollVal > HeaderH ) {
            // console.log("show");
            $('._static-nav').removeClass('hide');
        } else {
            // console.log("hide");
            $('._static-nav').addClass('hide');
        }
    });
 });