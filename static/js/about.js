document.addEventListener("DOMContentLoaded", function () {
  const preview = document.getElementById("imagePreview");
  const entries = document.querySelectorAll(".timeline-entry");
  
  // 스크롤 가능한 컨테이너 찾기
  const scrollableContainer = document.querySelector('.about-wrapper') || document.documentElement;
  console.log('스크롤 가능한 컨테이너:', scrollableContainer);

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
          const index = Array.from(entries).indexOf(entry) + 1; // 1부터 시작하는 인덱스
          console.log('클릭된 항목 인덱스:', index);

          if (index >= 1 && index <= 10) {
            // 중앙으로 스크롤 - 스크롤 가능한 컨테이너에 적용
            const elementRect = entry.getBoundingClientRect();
            const containerRect = scrollableContainer.getBoundingClientRect();
            const elementTop = elementRect.top - containerRect.top + scrollableContainer.scrollTop;
            const elementHeight = entry.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            // 요소를 화면 중앙에 위치시키기 위한 스크롤 위치 계산
            const scrollPosition = elementTop - (viewportHeight / 2) + (elementHeight / 2);
            
            // 스크롤 위치가 음수가 되지 않도록 보정
            const finalScrollPosition = Math.max(0, scrollPosition);
            
            console.log('중앙 스크롤 정보:', {
              elementTop,
              elementHeight,
              viewportHeight,
              scrollPosition,
              finalScrollPosition
            });

            // 스크롤 가능한 컨테이너에 스크롤 적용
            if (scrollableContainer === document.documentElement) {
              window.scrollTo({
                top: finalScrollPosition,
                behavior: 'smooth'
              });
            } else {
              scrollableContainer.scrollTo({
                top: finalScrollPosition,
                behavior: 'smooth'
              });
            }
          } else if (index >= 11) {
            // 페이지 끝까지 스크롤 - 스크롤 가능한 컨테이너에 적용
            const containerHeight = scrollableContainer.scrollHeight;
            const viewportHeight = window.innerHeight;
            const scrollToBottom = containerHeight - viewportHeight;
            
            console.log('끝 스크롤 정보:', {
              containerHeight,
              viewportHeight,
              scrollToBottom
            });

            // 스크롤 가능한 컨테이너에 스크롤 적용
            if (scrollableContainer === document.documentElement) {
              window.scrollTo({
                top: scrollToBottom,
                behavior: 'smooth'
              });
            } else {
              scrollableContainer.scrollTo({
                top: scrollToBottom,
                behavior: 'smooth'
              });
            }
          }
        }, 450); // transition 시간을 조금 더 늘려서 확실하게 대기
      }
      preview.style.display = "none";
    });
  });
});
