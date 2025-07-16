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

    // Click to toggle detail (열림/닫힘)
    label.addEventListener("click", () => {
      if (entry.classList.contains("active")) {
        // 이미 열려 있으면 닫기
        entry.classList.remove("active");
      } else {
        // 다른 항목 닫고 클릭한 항목만 열기
        entries.forEach(e => e.classList.remove("active"));
        entry.classList.add("active");
      }
      preview.style.display = "none";
    });
  });
});
