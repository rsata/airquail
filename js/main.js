$(function () {


  $('.page-scroll a').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutQuint');
    event.preventDefault();
  });


  // var h1 = $('.intro').height();
  // var h2 = $('features').height();

  // $('img.plant-pic').css('margin-top', '600px');


});