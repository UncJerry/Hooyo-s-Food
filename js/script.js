const navbar = document.querySelector('.navbar');
const mobileMenu = document.querySelector('.popup-mobilemenu');
const menuBar = document.getElementById('bar');
const close = document.getElementById('close');

mobileMenu.addEventListener('click', (e) => {
    if (e.target.matches('.menu__item')) {
        // disable default behavior
        e.preventDefault();

        // close the side-bar menu
        closeSideMenu();

        // changes the location 
        window.location.href = e.target.href;
    }
});

function closeSideMenu() {
    const sideMenuToggle = document.querySelector('#close');
    sideMenuToggle.click();
}


if (menuBar) {
    menuBar.addEventListener('click', () => {
        mobileMenu.classList.add('menu-open');
    })
}

if (close) {
    close.addEventListener('click', () => {
        mobileMenu.classList.remove('menu-open');
    })
}

// Navbar Scroll Down
window.onscroll = () => {
    if (document.documentElement.scrollTop > 170) {
      navbar.classList.add("scroll-on");
    } else {
      navbar.classList.remove("scroll-on");
    }
  }

//Main Hero Section Slider
$('.slider').each(function() {
  var $this = $(this);
  var $group = $this.find('.slide_group');
  var $slides = $this.find('.slide');
  var bulletArray = [];
  var currentIndex = 0;
  var timeout;
  
  function move(newIndex) {
    var animateLeft, slideLeft;
    
    advance();
    
    if ($group.is(':animated') || currentIndex === newIndex) {
      return;
    }
    
    bulletArray[currentIndex].removeClass('active');
    bulletArray[newIndex].addClass('active');
    
    if (newIndex > currentIndex) {
      slideLeft = '100%';
      animateLeft = '-100%';
    } else {
      slideLeft = '-100%';
      animateLeft = '100%';
    }
    
    $slides.eq(newIndex).css({
      display: 'block',
      left: slideLeft
    });
    $group.animate({
      left: animateLeft
    }, function() {
      $slides.eq(currentIndex).css({
        display: 'none'
      });
      $slides.eq(newIndex).css({
        left: 0
      });
      $group.css({
        left: 0
      });
      currentIndex = newIndex;
    });
  }
  
  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    }, 7000);
  }
  
  $('.next_btn').on('click', function() {
    if (currentIndex < ($slides.length - 1)) {
      move(currentIndex + 1);
    } else {
      move(0);
    }
  });
  
  $('.previous_btn').on('click', function() {
    if (currentIndex !== 0) {
      move(currentIndex - 1);
    } else {
      move(3);
    }
  });
  
  $.each($slides, function(index) {
    var $button = $('<a class="slide_btn">&bull;</a>');
    
    if (index === currentIndex) {
      $button.addClass('active');
    }
    $button.on('click', function() {
      move(index);
    }).appendTo('.slide_buttons');
    bulletArray.push($button);
  });
  
  advance();
});


//Image Gallery
const observer = new IntersectionObserver(f, {
  threshold:[0,1]
});

function f(entries) {
  for (const entry of entries) {
    if (entry.isIntersecting && entry.intersectionRatio >= 1) {
      entry.target.classList.toggle("inbound", true)
    }
    else {
      entry.target.classList.toggle("inbound", false)
    }
  }
}

const itemEls = Array.from(document.querySelectorAll(".item"));
for (const itemEl of itemEls)
  observer.observe(itemEl)
