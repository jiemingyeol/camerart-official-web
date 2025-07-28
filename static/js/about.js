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
        const randomHeight = Math.floor(Math.random() * (180 - 80 + 1)) + 80;
        preview.innerHTML = `<img src="${previewImg}" alt="preview" style="height: ${randomHeight}px; width: auto;">`;
        preview.style.display = "block";
      }
    });

    entry.addEventListener("mousemove", (e) => {
      const previewImg = preview.querySelector("img");
      const padding = 10;
      const previewWidth = previewImg?.offsetWidth || 200;
      const previewHeight = previewImg?.offsetHeight || 100;

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

        // 확장 시 페이지 맨 아래로 스크롤 이동
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
      }
      preview.style.display = "none";
    });
  });
});