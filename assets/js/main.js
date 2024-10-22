(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 24
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let navbar = document.getElementById('navbar')
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        navbar.style.display = "inline"
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
        navbar.style.display = "none"
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scroll with offset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false
    // },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

// ourstory image carousel
let slideIndex = 1;
showSlides(slideIndex);

function showSlides(num) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (num > slides.length) {
      slideIndex = 1;
  }    
  if (num < 1) {
      slideIndex = slides.length;
  }

  const updatedSlideDisplay = () => {
    // const screenWidth = window.innerWidth;
    const screenWidth = document.getElementById("aboutus").offsetWidth
    // if (screenWidth < 1200) {
    //   num = 1;
    // } else {
    //   num = 2; 
    // }
    num = 1;
  
    // default to setting slides as display: none
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
  
    // set current slide to showing/emphasized
    slides[slideIndex - 1].style.display = "inline-block";
  
    // set next slides
    for (i = 1; i < num; i++) {
      if (slideIndex + i < slides.length) {
        slides[slideIndex + i].style.display = "inline-block";
      } else {
        slides[(slideIndex + i) % slides.length].style.display = "inline-block";
      }
    }
  }
  updatedSlideDisplay();

  window.addEventListener('resize', updatedSlideDisplay)
  
}

function plusSlides(num) {
    showSlides(slideIndex += num);
}

function currentSlide(num) {
    showSlides(slideIndex = num);
}




// //Slider functionality for "our story"
// const slider = document.querySelector('.slideshow-container'),
//   slides = Array.from(document.querySelectorAll('.mySlides'))

// let isDragging = false,
//   startPos = 0,
//   currentTranslate = 0,
//   prevTranslate = 0,
//   animationID,
//   currentIndex = 0

// slides.forEach((slide, index) => {
//   const slideImage = slide.querySelector('img')
//   slideImage.addEventListener('dragstart', (e) => e.preventDefault())

//   // Pointer and touch events
//   slide.addEventListener('pointerdown', pointerDown(index))
//   slide.addEventListener('pointerup', pointerUp)
//   slide.addEventListener('pointerleave', pointerUp)
//   slide.addEventListener('pointermove', pointerMove)

//   // Add touch support
//   slide.addEventListener('touchstart', pointerDown(index))
//   slide.addEventListener('touchend', pointerUp)
//   slide.addEventListener('touchmove', pointerMove)
// })

// // Make responsive to viewport changes
// window.addEventListener('resize', setPositionByIndex)


// function pointerDown(index) {
//   return function (event) {
//     currentIndex = index
//     startPos = getPositionX(event)
//     isDragging = true
//     animationID = requestAnimationFrame(animation)
//     slider.classList.add('grabbing')
//   }
// }

// function pointerMove(event) {
//   if (isDragging) {
//     const currentPosition = getPositionX(event)
//     currentTranslate = prevTranslate + currentPosition - startPos
//   }
// }

// function pointerUp() {
//   cancelAnimationFrame(animationID)
//   isDragging = false
//   const movedBy = currentTranslate - prevTranslate

//   // If moved enough negative then snap to next slide if there is one
//   if (movedBy < -20 && currentIndex < slides.length - 1) currentIndex += 1

//   // If moved enough positive then snap to previous slide if there is one
//   if (movedBy > 20 && currentIndex > 0) currentIndex -= 1

//   setPositionByIndex()
//   slider.classList.remove('grabbing')
// }

// function animation() {
//   setSliderPosition()
//   if (isDragging) requestAnimationFrame(animation)
// }

// function setPositionByIndex() {
//   function setPositionByIndex() {
//     currentTranslate = currentIndex * -window.innerWidth; // Move to the correct slide based on index
//     prevTranslate = currentTranslate; // Update previous translate value
//     setSliderPosition();
//   }
  
// }

// function setSliderPosition() {
//   slider.style.transform = `translateX(${currentTranslate}px)`
// }

// // Helper function to get X position from either touch or mouse event
// function getPositionX(event) {
//   return event.type.includes('mouse')
//     ? event.clientX
//     : event.touches[0].clientX
// }

let faqQuestion1 = document.getElementById("faqQuestion1");
let faqQuestion2 = document.getElementById("faqQuestion2");
let faqQuestion3 = document.getElementById("faqQuestion3");
let faqQuestion4 = document.getElementById("faqQuestion4");
let faqAnswer1 = document.getElementById("faqAnswer1");
let faqAnswer2 = document.getElementById("faqAnswer2");
let faqAnswer3 = document.getElementById("faqAnswer3");
let faqAnswer4 = document.getElementById("faqAnswer4");
let faqArrowUp1 = document.getElementById("faqArrowUp1");
let faqArrowUp2 = document.getElementById("faqArrowUp2");
let faqArrowUp3 = document.getElementById("faqArrowUp3");
let faqArrowUp4 = document.getElementById("faqArrowUp4");
let faqArrowDown1 = document.getElementById("faqArrowDown1");
let faqArrowDown2 = document.getElementById("faqArrowDown2");
let faqArrowDown3 = document.getElementById("faqArrowDown3");
let faqArrowDown4 = document.getElementById("faqArrowDown4");

faqQuestion1.addEventListener("click", function(){
  toggleDisplay(faqAnswer1, faqArrowDown1, faqArrowUp1)
})

faqQuestion2.addEventListener("click", function(){
  toggleDisplay(faqAnswer2, faqArrowDown2, faqArrowUp2)
})

faqQuestion3.addEventListener("click", function(){
  toggleDisplay(faqAnswer3, faqArrowDown3, faqArrowUp3)
})
faqQuestion4.addEventListener("click", function(){
  toggleDisplay(faqAnswer4, faqArrowDown4, faqArrowUp4)
})

function toggleDisplay(answer, arrowDown, arrowUp) {
  let currentDisplay = window.getComputedStyle(answer).display
  if (currentDisplay == "none"){
    answer.style.display = "block"
    arrowDown.style.display = "none"
    arrowUp.style.display = "inline"
  }
  else {
    answer.style.display = "none"
    arrowDown.style.display = "inline"
    arrowUp.style.display = "none"
  }
}
