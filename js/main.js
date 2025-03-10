document.addEventListener("DOMContentLoaded", () => {
    // Loading Overlay
    const loadingOverlay = document.createElement("div")
    loadingOverlay.className = "loading-overlay"
    loadingOverlay.innerHTML = '<div class="loader"></div>'
    document.body.appendChild(loadingOverlay)
  
    // Hide loading overlay when page is loaded
    window.addEventListener("load", () => {
      setTimeout(() => {
        loadingOverlay.classList.add("hidden")
      }, 500)
    })
  
    // Set dark mode by default
    document.body.classList.add("dark-mode")
  
    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const navMenu = document.querySelector(".nav-menu")
  
    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active")
        menuToggle.querySelector("i").classList.toggle("fa-bars")
        menuToggle.querySelector("i").classList.toggle("fa-times")
      })
    }
  
    // Header Scroll Effect
    const header = document.querySelector("header")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll(".testimonial-slide")
    const dots = document.querySelectorAll(".dot")
    let currentSlide = 0
    let testimonialInterval
  
    if (dots.length > 0) {
      // Set up automatic slideshow
      startTestimonialSlider()
  
      // Set up dot navigation
      dots.forEach((dot) => {
        dot.addEventListener("click", function () {
          const slideIndex = Number.parseInt(this.getAttribute("data-slide"))
          showSlide(slideIndex)
          resetTestimonialInterval()
        })
      })
    }
  
    function showSlide(index) {
      testimonialSlides.forEach((slide) => {
        slide.classList.remove("active")
        slide.style.display = "none"
      })
      dots.forEach((dot) => dot.classList.remove("active"))
  
      testimonialSlides[index].style.display = "block"
      setTimeout(() => {
        testimonialSlides[index].classList.add("active")
      }, 10)
      dots[index].classList.add("active")
      currentSlide = index
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % testimonialSlides.length
      showSlide(currentSlide)
    }
  
    function startTestimonialSlider() {
      testimonialInterval = setInterval(nextSlide, 5000)
    }
  
    function resetTestimonialInterval() {
      clearInterval(testimonialInterval)
      startTestimonialSlider()
    }
  
    // Gallery Filtering with Animation
    const filterBtns = document.querySelectorAll(".filter-btn")
    const galleryItems = document.querySelectorAll(".gallery-item")
  
    if (filterBtns.length > 0) {
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          // Remove active class from all buttons
          filterBtns.forEach((btn) => btn.classList.remove("active"))
  
          // Add active class to clicked button
          this.classList.add("active")
  
          // Get filter value
          const filterValue = this.getAttribute("data-filter")
  
          // Filter gallery items with animation
          galleryItems.forEach((item) => {
            item.style.transform = "scale(0.8)"
            item.style.opacity = "0"
  
            setTimeout(() => {
              if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                item.style.display = "block"
                setTimeout(() => {
                  item.style.transform = "scale(1)"
                  item.style.opacity = "1"
                }, 50)
              } else {
                item.style.display = "none"
              }
            }, 300)
          })
        })
      })
    }
  
    // Accordion with Smooth Animation
    const accordionHeaders = document.querySelectorAll(".accordion-header")
  
    if (accordionHeaders.length > 0) {
      accordionHeaders.forEach((header) => {
        header.addEventListener("click", function () {
          const accordionItem = this.parentElement
  
          // Close all other accordion items
          const allAccordionItems = document.querySelectorAll(".accordion-item")
          allAccordionItems.forEach((item) => {
            if (item !== accordionItem && item.classList.contains("active")) {
              item.classList.remove("active")
            }
          })
  
          accordionItem.classList.toggle("active")
        })
      })
    }
  
    // Contact Form Validation and Submission
    const contactForm = document.getElementById("contact-form")
    const formSuccess = document.getElementById("form-success")
  
    if (contactForm) {
      const validateEmail = (email) => {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
      }
  
      const showError = (input, message) => {
        const formGroup = input.parentElement
        const errorElement = document.createElement("div")
        errorElement.className = "error-message"
        errorElement.textContent = message
        errorElement.style.color = "#e74c3c"
        errorElement.style.fontSize = "0.8rem"
        errorElement.style.marginTop = "5px"
  
        // Remove any existing error messages
        const existingError = formGroup.querySelector(".error-message")
        if (existingError) {
          formGroup.removeChild(existingError)
        }
  
        formGroup.appendChild(errorElement)
        input.style.borderColor = "#e74c3c"
      }
  
      const clearError = (input) => {
        const formGroup = input.parentElement
        const existingError = formGroup.querySelector(".error-message")
        if (existingError) {
          formGroup.removeChild(existingError)
        }
        input.style.borderColor = ""
      }
  
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        let isValid = true
  
        // Validate name
        const nameInput = document.getElementById("name")
        if (nameInput.value.trim() === "") {
          showError(nameInput, "Name is required")
          isValid = false
        } else {
          clearError(nameInput)
        }
  
        // Validate email
        const emailInput = document.getElementById("email")
        if (emailInput.value.trim() === "") {
          showError(emailInput, "Email is required")
          isValid = false
        } else if (!validateEmail(emailInput.value.trim())) {
          showError(emailInput, "Please enter a valid email")
          isValid = false
        } else {
          clearError(emailInput)
        }
  
        // Validate message
        const messageInput = document.getElementById("message")
        if (messageInput.value.trim() === "") {
          showError(messageInput, "Message is required")
          isValid = false
        } else {
          clearError(messageInput)
        }
  
        if (isValid) {
          // Show loading state
          const submitBtn = contactForm.querySelector(".btn-submit")
          const originalText = submitBtn.textContent
          submitBtn.textContent = "Sending..."
          submitBtn.disabled = true
  
          // Simulate form submission (in a real app, this would be an AJAX request)
          setTimeout(() => {
            contactForm.style.display = "none"
            formSuccess.classList.remove("hidden")
  
            // Reset form
            contactForm.reset()
            submitBtn.textContent = originalText
            submitBtn.disabled = false
          }, 1500)
        }
      })
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Account for fixed header
            behavior: "smooth",
          })
  
          // Close mobile menu if open
          if (navMenu && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active")
            menuToggle.querySelector("i").classList.toggle("fa-bars")
            menuToggle.querySelector("i").classList.toggle("fa-times")
          }
        }
      })
    })
  
    // Scroll Down Arrow in Hero Section
    const createScrollDownArrow = () => {
      const heroSection = document.querySelector(".hero")
      if (heroSection) {
        const scrollDown = document.createElement("div")
        scrollDown.className = "scroll-down"
        scrollDown.innerHTML = '<i class="fas fa-chevron-down"></i>'
        heroSection.appendChild(scrollDown)
  
        scrollDown.addEventListener("click", () => {
          const nextSection = heroSection.nextElementSibling
          if (nextSection) {
            window.scrollTo({
              top: nextSection.offsetTop - 80,
              behavior: "smooth",
            })
          }
        })
      }
    }
  
    createScrollDownArrow()
  
    // Back to Top Button
    const createBackToTopButton = () => {
      const backToTopBtn = document.createElement("div")
      backToTopBtn.className = "back-to-top"
      backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
      document.body.appendChild(backToTopBtn)
  
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add("visible")
        } else {
          backToTopBtn.classList.remove("visible")
        }
      })
  
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }
  
    createBackToTopButton()
  
    // Cookie Consent Banner
    const createCookieConsent = () => {
      // Check if user has already accepted cookies
      if (localStorage.getItem("cookiesAccepted") !== "true") {
        const cookieConsent = document.createElement("div")
        cookieConsent.className = "cookie-consent"
        cookieConsent.innerHTML = `
              <div class="cookie-text">
                  <p>This website uses cookies to ensure you get the best experience on our website.</p>
              </div>
              <div class="cookie-buttons">
                  <button class="btn btn-small" id="accept-cookies">Accept</button>
                  <button class="btn btn-small" id="decline-cookies" style="background-color: #6c757d;">Decline</button>
              </div>
          `
        document.body.appendChild(cookieConsent)
  
        // Show cookie banner with delay
        setTimeout(() => {
          cookieConsent.classList.add("show")
        }, 1000)
  
        // Accept cookies
        document.getElementById("accept-cookies").addEventListener("click", () => {
          localStorage.setItem("cookiesAccepted", "true")
          cookieConsent.classList.remove("show")
          setTimeout(() => {
            document.body.removeChild(cookieConsent)
          }, 500)
        })
  
        // Decline cookies
        document.getElementById("decline-cookies").addEventListener("click", () => {
          cookieConsent.classList.remove("show")
          setTimeout(() => {
            document.body.removeChild(cookieConsent)
          }, 500)
        })
      }
    }
  
    createCookieConsent()
  
    // Lazy Loading Images
    const lazyLoadImages = () => {
      const lazyImages = document.querySelectorAll("img:not(.lightbox-content)")
  
      lazyImages.forEach((img) => {
        // Skip images that don't have a src attribute
        if (!img.getAttribute("src")) return
  
        // Add lazy-load class
        img.classList.add("lazy-load")
  
        // Create an observer
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add loaded class when image is in viewport
              setTimeout(() => {
                img.classList.add("loaded")
              }, 100)
              observer.unobserve(img)
            }
          })
        })
  
        observer.observe(img)
      })
    }
  
    lazyLoadImages()
  
        // Animate elements on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll")
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementPosition < windowHeight - 100) {
          element.classList.add("animated")
        }
      })
    }
  
    // Add animate-on-scroll class to elements that should animate
    document
      .querySelectorAll(
        ".featured-item, .about-content, .philosophy-item, .service-card, .process-step, .equipment-item, .timeline-item",
      )
      .forEach((element) => {
        element.classList.add("animate-on-scroll")
      })
  
    window.addEventListener("scroll", animateOnScroll)
    animateOnScroll() // Run once on page load
  })

      // PEACE OUT! 🤘
  
  