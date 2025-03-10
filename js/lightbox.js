document.addEventListener("DOMContentLoaded", () => {
    // Lightbox functionality with preloading
    const galleryItems = document.querySelectorAll(".gallery-item")
    const lightbox = document.getElementById("lightbox")
    const lightboxImg = document.getElementById("lightbox-img")
    const lightboxCaption = document.querySelector(".lightbox-caption")
    const closeLightbox = document.querySelector(".close-lightbox")
    const prevBtn = document.querySelector(".prev")
    const nextBtn = document.querySelector(".next")
  
    let currentIndex = 0
    const imagesArray = []
  
    if (galleryItems.length > 0 && lightbox) {
      // Preload images
      galleryItems.forEach((item) => {
        const img = item.querySelector("img")
        const title = item.querySelector("h3")?.textContent || ""
        const description = item.querySelector("p")?.textContent || ""
  
        imagesArray.push({
          src: img.src,
          title: title,
          description: description,
        })
  
        // Preload image
        const preloadImg = new Image()
        preloadImg.src = img.src
      })
  
      // Open lightbox when gallery item is clicked
      galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
          openLightbox(index)
        })
      })
  
      // Close lightbox
      closeLightbox.addEventListener("click", () => {
        closeLightboxFunc()
      })
  
      // Close lightbox when clicking outside the image
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          closeLightboxFunc()
        }
      })
  
      // Navigate to previous image
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        navigateLightbox("prev")
      })
  
      // Navigate to next image
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        navigateLightbox("next")
      })
  
      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "block") {
          if (e.key === "Escape") {
            closeLightboxFunc()
          } else if (e.key === "ArrowLeft") {
            navigateLightbox("prev")
          } else if (e.key === "ArrowRight") {
            navigateLightbox("next")
          }
        }
      })
  
      // Touch swipe for mobile
      let touchStartX = 0
      let touchEndX = 0
  
      lightbox.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX
      })
  
      lightbox.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      })
  
      function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
          // Swipe left, go to next
          navigateLightbox("next")
        } else if (touchEndX > touchStartX + 50) {
          // Swipe right, go to previous
          navigateLightbox("prev")
        }
      }
  
      // Open lightbox function
      function openLightbox(index) {
        currentIndex = index
        updateLightboxContent()
        lightbox.style.display = "block"
        setTimeout(() => {
          lightbox.classList.add("active")
        }, 10)
  
        // Disable scrolling on body
        document.body.style.overflow = "hidden"
  
        // Preload next and previous images
        preloadAdjacentImages()
      }
  
      // Close lightbox function
      function closeLightboxFunc() {
        lightbox.classList.remove("active")
        setTimeout(() => {
          lightbox.style.display = "none"
          document.body.style.overflow = "auto"
        }, 300)
      }
  
      // Navigate lightbox function
      function navigateLightbox(direction) {
        if (direction === "prev") {
          currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
        } else {
          currentIndex = (currentIndex + 1) % galleryItems.length
        }
  
        // Fade out current image
        lightboxImg.style.opacity = "0"
  
        // Update content after fade out
        setTimeout(() => {
          updateLightboxContent()
          // Preload adjacent images
          preloadAdjacentImages()
        }, 300)
      }
  
      // Update lightbox content
      function updateLightboxContent() {
        const imageData = imagesArray[currentIndex]
  
        // Set new image source
        lightboxImg.src = imageData.src
        lightboxCaption.innerHTML = `<h3>${imageData.title}</h3><p>${imageData.description}</p>`
  
        // Fade in new image
        setTimeout(() => {
          lightboxImg.style.opacity = "1"
        }, 10)
      }
  
      // Preload adjacent images for smoother navigation
      function preloadAdjacentImages() {
        const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
        const nextIndex = (currentIndex + 1) % galleryItems.length
  
        const preloadPrev = new Image()
        preloadPrev.src = imagesArray[prevIndex].src
  
        const preloadNext = new Image()
        preloadNext.src = imagesArray[nextIndex].src
      }
    }
  })
  
  