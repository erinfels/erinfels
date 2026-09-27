const photos = [
    {
      type: "photo",
      src: "../../resources/img/AuroraUserInteraction.png",
      eyebrow: "Chapter 1",
      title: "Mountain Overlook",
      body: "A shot from the trailhead just after sunrise, before the fog burned off."
    },
    {
      type: "video",
      src: "../../resources/vid/AuroraInteractionDemo.mp4",
      eyebrow: "Chapter 2",
      title: "Live Demo",
      body: "A quick clip of the aurora effect running."
    },
    {
      type: "photo",
      src: "../../resources/img/AuroraEduSheet.png",
      eyebrow: "Chapter 3",
      title: "River Bend",
      body: "The river cuts through here — this was about an hour into the hike."
    }
  ];
  
  const carouselInner = document.getElementById("carouselInner");
  const eyebrowEl = document.getElementById("captionEyebrow");
  const titleEl = document.getElementById("captionTitle");
  const bodyEl = document.getElementById("captionBody");
  
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
      } else {
        const img = document.createElement("img");
        img.src = p.src;
        img.alt = p.title;
        item.appendChild(img);
      }
  
      carouselInner.appendChild(item);
    });
  }
  
  function updateCaption(index) {
    const p = photos[index];
    eyebrowEl.textContent = p.eyebrow || "";
    titleEl.textContent = p.title;
    bodyEl.textContent = p.body;
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
  
  const carouselEl = document.getElementById("albumCarousel");
  
  carouselEl.addEventListener("slide.bs.carousel", (e) => {
    pauseVideoInSlide(e.from); // stop the slide you're leaving
    updateCaption(e.to);
  });