document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('open');
      menuToggle.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          mainNav.classList.remove('open');
          menuToggle.textContent = '☰';
        }
      });
    });
    
    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
      });
    });
    
    lightboxClose.addEventListener('click', function() {
      lightbox.classList.remove('active');
    });
    
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
      });
    }
  });



  function upiPayment499(){
    let upiLink = "upi://pay?pa=monusharma14692@oksbi&pn=Monu_Sharma_Global_Fitness_Gym&am=499&cu=INR";
    window.location.href = upiLink;
    }

  function upiPayment699(){
    let upiLink = "upi://pay?pa=monusharma14692@oksbi&pn=Monu_Sharma_Global_Fitness_Gym&am=699&cu=INR";
    window.location.href = upiLink;
    }

  function upiPayment999(){
    let upiLink = "upi://pay?pa=monusharma14692@oksbi&pn=Monu_Sharma_Global_Fitness_Gym&am=999&cu=INR";
    window.location.href = upiLink;
    }

  function openLightbox(imageSrc) {
    document.getElementById("lightbox-img").src = imageSrc;
    document.getElementById("lightbox").style.display = "flex";
  }
  
  function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
  }
  

  // For Mobile-Map Only

  // if (window.innerWidth < 768) {
  //   document.getElementById("map-container").innerHTML = `
  //     <iframe 
  //       src="https://www.google.com/maps/embed?pb=..."
  //       width="100%" 
  //       height="300" 
  //       style="border:0;" 
  //       allowfullscreen="" 
  //       loading="lazy" 
  //       referrerpolicy="no-referrer-when-downgrade">
  //     </iframe>`;
  // }
