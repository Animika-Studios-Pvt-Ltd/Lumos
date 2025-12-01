AOS.init();

$(function(){
  $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');       
    $(this).parent().toggleClass('show');   

    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-submenu .show').removeClass('show');  
      $('.dropdown-submenu.show').removeClass('show');
    });
    return false;
  });
});


$(function() {
  $('#main-menu').smartmenus({
    subMenusSubOffsetX: 1,
    subMenusSubOffsetY: -2
  });
});

$(function() {
  var $mainMenuState = $('#main-menu-state');
  if ($mainMenuState.length) {
    $mainMenuState.change(function(e) {
      var $menu = $('#main-menu');
      if (this.checked) {
        $menu.hide().slideDown(1000, function() { $menu.css('display', ''); });
      }
      else {
        $menu.show().slideUp(1000, function() { $menu.css('display', ''); });
      }
    });

    $(window).bind('beforeunload unload', function() {
      if ($mainMenuState[0].checked) {
        $mainMenuState[0].click();
      }
    });
  }
});

$(window).scroll(function() {
  if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
    $('#return-to-top').fadeIn(200);    // Fade in the arrow
  } 
  else {
    $('#return-to-top').fadeOut(200);   // Else fade out the arrow
  }
});
$('#return-to-top').click(function() {      // When arrow is clicked
  $('body,html').animate({
    scrollTop : 0                       // Scroll to top of body
  }, 500);
});


// let navbar = document.getElementById("nav-section");
// let navOffset = navbar.offsetTop;
// window.addEventListener("scroll", () => {
//   (window.scrollY >= navOffset) ? navbar.classList.add("fixed-nav") : navbar.classList.remove("fixed-nav")
// });


$(window).scroll(function(){
  if ($(this).scrollTop() > 800) {
    $('.header').addClass('fixed');
  }
  else {
    $('.header').removeClass('fixed');
  }
});

$(window).scroll(function(){
  if ($(this).scrollTop() > 800) {
    $('.up').addClass('fixed');
  }
  else {
    $('.up').removeClass('fixed');
  }
});

// $('#toggle').click(function() {
//   $(this).toggleClass('active');
//   $('#overlay').toggleClass('open');
// });
// $('.overlay-menu a').click(function() {
//   $('.button_container').toggleClass('active');
//   $('#overlay').toggleClass('open');
//   return false;
// });


$(document).ready(function(){
  $(".filter-button").click(function(){
    var value = $(this).attr('data-filter');
    if(value == "all")
      { 
        $('.filter').show('10000');
      }
    else
      {    
        $(".filter").not('.'+value).hide('8000');
        $('.filter').filter('.'+value).show('10000');
      }
  });
});



$(document).ready(function(){
  // active thumbnail
  $("#thumbSlider .thumb").on("click", function(){
      $(this).addClass("active");
      $(this).siblings().removeClass("active");
    
    });
})



$('.projectcol a').on('click', function (e) {
      e.preventDefault();
      $('.filterdiv').slideToggle(200).toggleClass('filDown');
    });


// <script type="text/javascript">
//   $(window).on('load',function() {
//     var $grid = $('.clientpagerow').isotope({
//       itemSelector: '.clientcolumn',
//       layoutMode: 'fitRows'
// });
    
          
    
// $('.filters-button-group').on( 'click', 'a[href="#"]', function(e) {
//   e.preventDefault();
//     var filterValue = $( this ).attr('data-filter');
//     var filter = filter
//     $grid.isotope({ filter: filterValue });
//   });
    
// $('.filters-button-group ul li').each( function( i, buttonGroup ) {
//   var $buttonGroup = $( buttonGroup );
//     $buttonGroup.on( 'click', 'a[href="#"]', function() {
//     $buttonGroup.parent().find('.is-checked').removeClass('is-checked');
//     $( this ).addClass('is-checked');
//     });
//   });
// });





$(document).ready(function() {
  $('.collapse.in').prev('.panel-heading').addClass('active');
  $('#accordion, #bs-collapse')
    .on('show.bs.collapse', function(a) {
      $(a.target).prev('.panel-heading').addClass('active');
    })
    .on('hide.bs.collapse', function(a) {
      $(a.target).prev('.panel-heading').removeClass('active');
    });
});



/*
  ICON AUTO PLAYS
  HOVER OVER ICON
  TO MAKE IT INTERACTIVE
*/

// upInteractive = false;

// function autoToggle() {
//   $('.arrow').toggleClass('auto');
// }

// $('.arrow').hover(function() {
//   upInteractive = true;
//   $('.arrow').removeClass('auto');
// });

// setInterval(function(){ 
  
//   console.log(upInteractive);
  
//   if(upInteractive === false) {
//     autoToggle();
//   }

// },2000);


// $(window).load(function(){
//   $(' .spinner ').addClass('fadeOut animated');
//   $(' .preloader ').delay(1000).fadeOut(1000); // set duration in brackets    
//   setTimeout(function(){
//     $('.see-more-button').addClass('bounceIn animated');
//   }, 2000);

    
// });



$('button').on('click', function(){
  $('body').toggleClass('open');
});


// window.onload = function(){
//   setTimeout(function(){
//   var loader = document.getElementsByClassName("loader")[0];
//   loader.className="loader fadeout" ;
//   setTimeout(function(){loader.style.display="none"},1000)
//   },1000)
// }


// const body = document.body,
//       jsScroll = document.getElementsByClassName('js-scroll')[0],
//       height = jsScroll.getBoundingClientRect().height - 1,
//       speed = 0.05

// var offset = 0

// body.style.height = Math.floor(height) + "px"

// function smoothScroll() {
//     offset += (window.pageYOffset - offset) * speed
    
//     var scroll = "translateY(-" + offset + "px) translateZ(0)"
//     jsScroll.style.transform = scroll
    
//     raf = requestAnimationFrame(smoothScroll)
// }
// smoothScroll()


// $('#myCarousel').carousel({
//   interval: false
// });
// $('#carousel-thumbs').carousel({
//   interval: false
// });
// $('[id^=carousel-selector-]').click(function() {
//   var id_selector = $(this).attr('id');
//   var id = parseInt( id_selector.substr(id_selector.lastIndexOf('-') + 1) );
//   $('#myCarousel').carousel(id);
// });
// if ($(window).width() < 575) {
//   $('#carousel-thumbs .row div:nth-child(4)').each(function() {
//     var rowBoundary = $(this);
//     $('<div class="row mx-0">').insertAfter(rowBoundary.parent()).append(rowBoundary.nextAll().addBack());
//   });
//   $('#carousel-thumbs .carousel-item .row:nth-child(even)').each(function() {
//     var boundary = $(this);
//     $('<div class="carousel-item">').insertAfter(boundary.parent()).append(boundary.nextAll().addBack());
//   });
// }
// if ($('#carousel-thumbs .carousel-item').length < 2) {
//   $('#carousel-thumbs [class^=carousel-control-]').remove();
//   $('.machine-carousel-container #carousel-thumbs').css('padding','0 5px');
// }
// $('#myCarousel').on('slide.bs.carousel', function(e) {
//   var id = parseInt( $(e.relatedTarget).attr('data-slide-number') );
//   $('[id^=carousel-selector-]').removeClass('selected');
//   $('[id=carousel-selector-'+id+']').addClass('selected');
// });
// $('#myCarousel').swipe({
//   fallbackToMouseEvents: true,
//   swipeLeft: function(e) {
//     $('#myCarousel').carousel('next');
//   },
//   swipeRight: function(e) {
//     $('#myCarousel').carousel('prev');
//   },
//   allowPageScroll: 'vertical',
//   preventDefaultEvents: false,
//   threshold: 75
// });

// $('#myCarousel .carousel-item img').on('click', function(e) {
//   var src = $(e.target).attr('data-remote');
//   if (src) $(this).ekkoLightbox();
// });





 $(".client-section").slick({
     slidesToShow: 3,
     slidesToScroll: 1,
     loop: 0,
    autoplay: true,
    speed: 1500,
     autoplaySpeed: 5e3,
     arrows: true,
     nextArrow: '<div class="slick-custom-arrow slick-custom-arrow-right"><img src="content/public/images/Arrow-A.webp" class="img-fluid" alt="arrow"></div>',
     prevArrow: '<div class="slick-custom-arrow slick-custom-arrow-left"><img src="content/public/images/Arrow-B.webp" class="img-fluid" alt="arrow"></div>',
    responsive: [{
         breakpoint: 989,
         settings: {
             slidesToShow: 3,
            slidesToScroll: 1,
            infinite: 0
        }
     }, {
        breakpoint: 699,
         settings: {
            slidesToShow: 2,
             slidesToScroll: 1
         }
     }, {
        breakpoint: 476,
        settings: {
             slidesToShow: 1,
             slidesToScroll: 1
        }
     }]
 })


$(function () {
  
  $('.md-trigger').on('click', function() {
    $('.md-modal').addClass('md-show');
  });
  
  $('.md-close').on('click', function() {
    $('.md-modal').removeClass('md-show');
  });
  
});



