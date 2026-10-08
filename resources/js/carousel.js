
(function () {
    if (typeof photos === "undefined") {
      console.warn("carousel.js: no `photos` array found on this page — skipping carousel setup.");
      return;
    }
   
    const carouselInner = document.getElementById("carouselInner");
    const eyebrowEl = document.getElementById("captionEyebrow");
    const titleEl = document.getElementById("captionTitle");
    const bodyEl = document.getElementById("captionBody");
    const carouselEl = document.getElementById("albumCarousel");
   
    if (!carouselInner || !carouselEl) {
      console.warn("carousel.js: expected carousel markup not found on this page.");
      return;
    }
   
    function buildSlides() {
      photos.forEach((p, i) => {
        const item = document.createElement("div");
        item.className = "carousel-item" + (i === 0 ? " active" : "");
   
        if (p.type === "video") {
          const video = document.createElement("video");
          video.src = p.src;
          video.controls = true;
          video.playsInline = true;
          video.muted = true; // remove if you want sound by default
          item.appendChild(video);
        } 
        else if (p.type === "youtube") {
          const iframe = document.createElement("iframe");
          iframe.src = p.src;
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          iframe.allowFullscreen = true;
          iframe.style.width = "100%";
          iframe.style.aspectRatio = "4 / 3";
          iframe.style.border = "none";
          item.appendChild(iframe);
        } else {
          const img = document.createElement("img");
          img.src = p.src;
          img.alt = p.title || "";
          item.appendChild(img);
        }
   
        carouselInner.appendChild(item);
      });
    }
   
    function updateCaption(index) {
      const p = photos[index];
      if (!p) return;
      if (eyebrowEl) eyebrowEl.textContent = p.eyebrow || "";
      if (titleEl) titleEl.textContent = p.title || "";
      if (bodyEl) bodyEl.textContent = p.body || "";
    }
   
    // Pause any playing video on a slide when you navigate away from it
    function pauseVideoInSlide(index) {
      const slide = carouselInner.children[index];
      if (!slide) return;
      const video = slide.querySelector("video");
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
   
    buildSlides();
    updateCaption(0);
   
    carouselEl.addEventListener("slide.bs.carousel", (e) => {
      pauseVideoInSlide(e.from);
      updateCaption(e.to);
    });
  })();