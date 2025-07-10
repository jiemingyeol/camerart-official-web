document.addEventListener("DOMContentLoaded", function () {
  const preview = document.getElementById("imagePreview");
  const entries = document.querySelectorAll(".timeline-entry");

  entries.forEach(entry => {
    const previewImg = entry.dataset.preview;
    const detail = entry.querySelector(".timeline-detail");
    const label = entry.querySelector(".timeline-label");

    // Hover preview
    entry.addEventListener("mouseenter", () => {
      if (entry.classList.contains("active")) return;
      if (preview && previewImg) {
        preview.innerHTML = `<img src="${previewImg}" alt="preview">`;
        preview.style.display = "block";
      }
    });

    entry.addEventListener("mousemove", (e) => {
      preview.style.top = (e.pageY + 15) + "px";
      preview.style.left = (e.pageX + 15) + "px";
    });

    entry.addEventListener("mouseleave", () => {
      preview.style.display = "none";
    });

    // Click to toggle detail
    label.addEventListener("click", () => {
      const isActive = entry.classList.contains("active");

      entries.forEach(e => {
        e.classList.remove("active");
        e.querySelector(".timeline-detail")?.style.setProperty("display", "none");
      });

      if (!isActive) {
        entry.classList.add("active");
        detail.style.display = "block";
        preview.style.display = "none";
      }
    });
  });
});
