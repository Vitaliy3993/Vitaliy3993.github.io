const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.mobilemenu'),
    closeElem = document.querySelector('.mobilemenu__overlay');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});



$(document).ready(function(){
  $('.promo__slide').slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 1,
      dots: true,
      slidesToScroll: 1,
      infinite: true,
      speed: 500,
      fade: true,
      slidesToShow: 1,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrows/leftsm.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/arrows/rightsm.png"></button>',
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 991,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1,
            dots: false,
            autoplay: true,
            speed: 1000
          }
        },
      ]  
    });


$('.computer__slider').slick({
  speed: 500,
  prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrows/left comp.svg"></button>',
  nextArrow: '<button type="button" class="slick-next"><img src="icons/arrows/right comp.svg"></button>',
  responsive: [
    {
      breakpoint: 1050,
      settings: {
        arrows: false,
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 1
      }
    }
  ]
});

$('ul.computer__tabs').on('click', 'li:not(.computer__tab_active)', function() {
  $(this)
    .addClass('computer__tab_active').siblings().removeClass('computer__tab_active')
    .closest('div.container').find('div.computer__content').removeClass('computer__content_active').eq($(this).index()).addClass('computer__content_active');
});


$(document).ready(function(){
  $('.variant__slider').slick({
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '0px',
          slidesToShow: 1
        }
      },
    ]
  });
});


$(window).scroll(function() {
  if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
  } else {
      $('.pageup').fadeOut();
  }
});

$("a").on('click', function(event) {

  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {
  // Prevent default anchor click behavior
  event.preventDefault();

  // Store hash
  var hash = this.hash;

  // Using jQuery's animate() method to add smooth page scroll
  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
  $('html, body').animate({
      scrollTop: $(hash).offset().top
  }, 800, function(){

      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
  });
  } // End if
});
});