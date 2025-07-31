document.addEventListener("DOMContentLoaded", function () {
  const preview = document.getElementById("imagePreview");
  const entries = document.querySelectorAll(".timeline-entry");

  entries.forEach(entry => {
    const previewImg = entry.dataset.preview;
    const label = entry.querySelector(".timeline-label");

    // Hover preview
    entry.addEventListener("mouseenter", () => {
      if (entry.classList.contains("active")) return;
      if (preview && previewImg) {
        const randomHeight = Math.floor(Math.random() * (320)) + 160;
        preview.innerHTML = `<img src="${previewImg}" alt="preview" style="height: ${randomHeight}px; width: auto;">`;
        preview.style.display = "block";
      }
    });

    entry.addEventListener("mousemove", (e) => {
      const previewImgEl = preview.querySelector("img");
      const padding = 10;
      const previewWidth = previewImgEl?.offsetWidth || 200;
      const previewHeight = previewImgEl?.offsetHeight || 100;

      let x = e.clientX + padding;
      let y = e.clientY + padding;

      // 우측 또는 하단 넘칠 경우 위치 보정
      if (x + previewWidth > window.innerWidth) {
        x = e.clientX - previewWidth - padding;
      }
      if (y + previewHeight > window.innerHeight) {
        y = e.clientY - previewHeight - padding;
      }

      preview.style.left = `${x}px`;
      preview.style.top = `${y}px`;
    });

    entry.addEventListener("mouseleave", () => {
      preview.style.display = "none";
    });

    // Click to toggle detail (열림/닫힘)
    label.addEventListener("click", () => {
      if (entry.classList.contains("active")) {
        entry.classList.remove("active");
      } else {
        entries.forEach(e => e.classList.remove("active"));
        entry.classList.add("active");

        // ✅ transition이 끝날 때까지 기다린 후 스크롤
        setTimeout(() => {
          const index = Array.from(entries).indexOf(entry);

          if (index >= 2 && index <= 10) {
            // 중앙으로 스크롤
            const elementTop = entry.getBoundingClientRect().top + window.scrollY;
            const elementHeight = entry.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollPosition = elementTop - (viewportHeight / 2) + (elementHeight / 2);

            window.scrollTo({
              top: scrollPosition,
              behavior: 'smooth'
            });
          } else if (index >= 11) {
            // 페이지 끝까지 스크롤 (scrollHeight 다시 계산)
            const scrollHeight = document.documentElement.scrollHeight;
            window.scrollTo({
              top: scrollHeight,
              behavior: 'smooth'
            });
          }
        }, 500); // transition이 끝난 후 위치 계산
      }
      preview.style.display = "none";
    });
  });
});
