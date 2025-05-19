document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle

    const menuToggle = document.querySelector('.menu-toggle');

    const navLinks = document.querySelector('.nav-links');

    

    menuToggle.addEventListener('click', function() {

        navLinks.classList.toggle('active');

        this.querySelector('i').classList.toggle('fa-bars');

        this.querySelector('i').classList.toggle('fa-times');

    });

    // Close mobile menu when clicking on a link

    document.querySelectorAll('.nav-links a').forEach(link => {

        link.addEventListener('click', () => {

            navLinks.classList.remove('active');

            menuToggle.querySelector('i').classList.add('fa-bars');

            menuToggle.querySelector('i').classList.remove('fa-times');

        });

    });

    // Smooth scrolling for anchor links

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function(e) {

            e.preventDefault();

            

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                window.scrollTo({

                    top: targetElement.offsetTop - 80,

                    behavior: 'smooth'

                });

            }

        });

    });

    // Testimonial Slider

    const testimonials = document.querySelectorAll('.testimonial');

    const prevBtn = document.querySelector('.prev');

    const nextBtn = document.querySelector('.next');

    let currentTestimonial = 0;

    function showTestimonial(index) {

        testimonials.forEach(testimonial => {

            testimonial.classList.remove('active');

        });

        

        testimonials[index].classList.add('active');

        currentTestimonial = index;

    }

    prevBtn.addEventListener('click', function() {

        let newIndex = currentTestimonial - 1;

        if (newIndex < 0) newIndex = testimonials.length - 1;

        showTestimonial(newIndex);

    });

    nextBtn.addEventListener('click', function() {

        let newIndex = currentTestimonial + 1;

        if (newIndex >= testimonials.length) newIndex = 0;

        showTestimonial(newIndex);

    });

    // Auto-rotate testimonials

    let testimonialInterval = setInterval(() => {

        let newIndex = currentTestimonial + 1;

        if (newIndex >= testimonials.length) newIndex = 0;

        showTestimonial(newIndex);

    }, 5000);

    // Pause auto-rotation on hover

    const testimonialSlider = document.querySelector('.testimonial-slider');

    testimonialSlider.addEventListener('mouseenter', () => {

        clearInterval(testimonialInterval);

    });

    testimonialSlider.addEventListener('mouseleave', () => {

        testimonialInterval = setInterval(() => {

            let newIndex = currentTestimonial + 1;

            if (newIndex >= testimonials.length) newIndex = 0;

            showTestimonial(newIndex);

        }, 5000);

    });

    // Animate stats counter

    const statNumbers = document.querySelectorAll('.stat-number');

    

    function animateStats() {

        statNumbers.forEach(stat => {

            const target = parseInt(stat.getAttribute('data-count'));

            const duration = 2000;

            const start = 0;

            const increment = target / (duration / 16);

            let current = start;

            

            const timer = setInterval(() => {

                current += increment;

                stat.textContent = Math.floor(current);

                

                if (current >= target) {

                    stat.textContent = target;

                    clearInterval(timer);

                }

            }, 16);

        });

    }

    // Intersection Observer for animations

    const observerOptions = {

        threshold: 0.1

    };

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                if (entry.target.classList.contains('stats')) {

                    animateStats();

                }

                

                entry.target.classList.add('animate');

                observer.unobserve(entry.target);

            }

        });

    }, observerOptions);

    document.querySelectorAll('.service-card, .portfolio-item, .stats').forEach(element => {

        observer.observe(element);

    });

    // Form submission

    const contactForm = document.getElementById('projectForm');

    

    if (contactForm) {

        contactForm.addEventListener('submit', function(e) {

            e.preventDefault();

            

            // Get form values

            const name = document.getElementById('name').value;

            const email = document.getElementById('email').value;

            const subject = document.getElementById('subject').value;

            const message = document.getElementById('message').value;

            

            // Here you would typically send the data to a server

            console.log('Form submitted:', { name, email, subject, message });

            

            // Show success message

            alert('Thank you for your message! We will get back to you soon.');

            

            // Reset form

            contactForm.reset();

        });

    }

    // Scroll reveal animation

    window.addEventListener('scroll', revealOnScroll);

    function revealOnScroll() {

        const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .about-image, .contact-info, .contact-form');

        

        elements.forEach(element => {

            const elementPosition = element.getBoundingClientRect().top;

            const windowHeight = window.innerHeight;

            

            if (elementPosition < windowHeight - 100) {

                element.classList.add('reveal');

            }

        });

    }

    // Initial call to check elements already in view

    revealOnScroll();

    // Parallax effect for hero image

    window.addEventListener('scroll', function() {

        const scrollPosition = window.pageYOffset;

        const heroImage = document.querySelector('.hero-img');

        

        if (heroImage) {

            heroImage.style.transform = `perspective(1000px) rotateY(-15deg) translateY(${scrollPosition * 0.2}px)`;

        }

    });

});