document.addEventListener('DOMContentLoaded', () => {
  const poster    = document.querySelector('.poster');
  const carousel  = document.querySelector('.poster-carousel');
  const totalPages     = 15;
  const threshold      = 120;
  const transitionTime = 300;

  let scrollDeltaPage = 0;
  let lastTimePage    = 0;

  // -------------------------------
  // 1) 페이지 이동 (포스터 영역 마우스 휠)
  // -------------------------------
  const match = document.body.className.match(/archive-(\d+)/);
  const currentPage = match ? Number(match[1]) : null;

  const goToPage = (pageNum) => {
    if (!pageNum || pageNum < 1 || pageNum > totalPages) return;
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = `/archive/${pageNum}`;
    }, transitionTime);
  };

  const navElement = poster || carousel;
  if (navElement && currentPage) {
    navElement.addEventListener('wheel', e => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastTimePage < transitionTime) return;

      scrollDeltaPage += e.deltaY;
      if (Math.abs(scrollDeltaPage) >= threshold) {
        const dir = scrollDeltaPage > 0 ? 1 : -1;
        goToPage(currentPage + dir);
        scrollDeltaPage = 0;
        lastTimePage    = now;
      }
    });
  }

  // -------------------------------
  // 2) 캐러셀 버튼
  // -------------------------------
  if (carousel) {
    const track       = carousel.querySelector('.carousel-track');
    const slides      = Array.from(track.children);
    let currentIndex  = 0;

    const updateCarousel = () => {
      const w = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * w}px)`;
    };
    updateCarousel();
    window.addEventListener('resize', updateCarousel);

    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
      updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
      updateCarousel();
    });
  }

  // -------------------------------
  // 3) WORKS 수동 좌표 배치
  // -------------------------------
  function toVw(px) {
    return `calc(${px} / 1920 * 100vw)`;
  }
  function toVh(px) {
    return `calc(${px} / 1080 * 100vh)`;
  }

  document.querySelectorAll('.work-item').forEach(item => {
    item.style.position = 'absolute';
    item.style.top = toVh(item.dataset.y);
    item.style.left = toVw(item.dataset.x);
    if (item.dataset.w) item.style.width = toVw(item.dataset.w);
    if (item.dataset.h) item.style.height = toVh(item.dataset.h);
  });

  // -------------------------------
  // 4) FUNDING 수동 좌표 배치
  // -------------------------------
  function toVw(px) {
    return `calc(${px} / 1920 * 100vw)`;
  }
  function toVh(px) {
    return `calc(${px} / 1080 * 100vh)`;
  }

  const fundingHeader = document.getElementById('fundingManual');
  if (fundingHeader) {
    fundingHeader.style.position = 'absolute';
    fundingHeader.style.top = toVh(fundingHeader.dataset.y);
    fundingHeader.style.left = toVw(fundingHeader.dataset.x);
  }

  const fundingImg = document.querySelector('.funding-manual-img');
  if (fundingImg && fundingHeader) {
    fundingImg.style.position = 'absolute';
    fundingImg.style.top = `calc(${fundingHeader.dataset.y} / 1080 * 100vh + 72 / 1080 * 100vh)`;
    fundingImg.style.left = toVw(fundingHeader.dataset.x);
  }

  // -------------------------------
  // 5) FUNDING 클릭 시 외부 링크 열기
  // -------------------------------
  const fundingTitle = document.querySelector(".funding-title");

  if (fundingTitle) {
    fetch("/static/data/archive.json")
      .then(response => response.json())
      .then(data => {
        // 현재 페이지 번호 확인
        const match = document.body.className.match(/archive-(\d+)/);
        const currentPage = match ? match[1] : null;

        if (currentPage && data[currentPage]) {
          // ✅ JSON 경로: images.funding_embed
          const fundingUrl = data[currentPage].images?.funding_embed;

          if (fundingUrl) {
            fundingTitle.addEventListener("click", () => {
              window.open(fundingUrl, "_blank");
            });
          } else {
            console.warn("funding_embed 링크가 존재하지 않습니다:", currentPage);
          }
        }
      })
      .catch(err => console.error("archive.json 로드 오류:", err));
  }
});
