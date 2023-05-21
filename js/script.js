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

        // change the location
        window.location.href = e.target.href;
    }
});

// Function to close the side menu when called
function closeSideMenu() {
  const sideMenuToggle = document.querySelector('#close');
  sideMenuToggle.click(); // Simulates a click on the sideMenuToggle element
}

// Checks if menuBar exists
if (menuBar) {
  menuBar.addEventListener('click', () => {
      mobileMenu.classList.add('menu-open'); // Adds the 'menu-open' class to the mobileMenu element
  })
}

// Checks if close exists
if (close) {
  close.addEventListener('click', () => {
      mobileMenu.classList.remove('menu-open'); // Removes the 'menu-open' class from the mobileMenu element
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
  
    advance(); // Call the 'advance' function to prepare for the next slide.
  
    if ($group.is(':animated') || currentIndex === newIndex) {
      return; // If the slideshow is currently animating or the new index is the same as the current index, exit the function.
    }
  
    bulletArray[currentIndex].removeClass('active'); // Remove the 'active' class from the bullet corresponding to the current slide.
    bulletArray[newIndex].addClass('active'); // Add the 'active' class to the bullet corresponding to the new slide.
  
    if (newIndex > currentIndex) {
      slideLeft = '100%'; // If the new index is greater than the current index, set the slide left position to '100%'.
      animateLeft = '-100%'; // Set the animate left position to '-100%'.
    } else {
      slideLeft = '-100%'; // If the new index is less than or equal to the current index, set the slide left position to '-100%'.
      animateLeft = '100%'; // Set the animate left position to '100%'.
    }
  
    $slides.eq(newIndex).css({
      display: 'block',
      left: slideLeft
    }); // Set the CSS properties for the new slide: display it and set its left position.
  
    $group.animate({
      left: animateLeft
    }, function() {
      $slides.eq(currentIndex).css({
        display: 'none'
      }); // Hide the current slide.
      $slides.eq(newIndex).css({
        left: 0
      }); // Set the left position of the new slide to 0 to bring it into view.
      $group.css({
        left: 0
      }); // Reset the left position of the slide group.
      currentIndex = newIndex; // Update the current index to the new index.
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
// Create a new IntersectionObserver object named 'observer'
// The callback function 'f' will be executed when the observed elements intersect with the viewport
// The options object specifies that the callback should be triggered when the intersection ratio is 0 or 1
const observer = new IntersectionObserver(f, {
  threshold: [0, 1]
});

// Callback function 'f' is executed when intersection changes occur
function f(entries) {
  // Iterate through each entry in the 'entries' array
  for (const entry of entries) {
    // Check if the observed element is intersecting with the viewport and has an intersection ratio of at least 1
    if (entry.isIntersecting && entry.intersectionRatio >= 1) {
      // Add the CSS class "inbound" to the target element
      entry.target.classList.toggle("inbound", true);
    } else {
      // Remove the CSS class "inbound" from the target element
      entry.target.classList.toggle("inbound", false);
    }
  }
}

// Get all elements with the class "item" and convert the resulting NodeList to an array
const itemEls = Array.from(document.querySelectorAll(".item"));

// Observe each item element using the 'observer' IntersectionObserver
for (const itemEl of itemEls) {
  observer.observe(itemEl);
}