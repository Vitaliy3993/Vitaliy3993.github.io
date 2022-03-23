$(document).ready(function(){
  $('.clients__slider').slick({
      centerMode: true,
      centerPadding: '40px',
      slidesToShow: 3,
      variableWidth: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevrons/left.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/chevrons/right.svg"></button>',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            variableWidth: true,
            centerPadding: '0px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            variableWidth: true,
            centerPadding: '0px',
            slidesToShow: 1
          }
        }
      ]
    });
});

$(document).ready(function(){
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

  $('form').submit(function(e) {
      e.preventDefault();

      if (!$(this).valid()) {
          return;
      }

      $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
      }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');
          $('form').trigger('reset')
      });
      return false;
  });
  
  });

const hamburger = document.querySelector('.hamburger'),
  menu = document.querySelector('.mobilemenu'),
  closeElem = document.querySelector('.mobilemenu__overlay');

hamburger.addEventListener('click', () => {
  menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
  menu.classList.remove('active');
});
