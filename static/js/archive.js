// static/js/archive.js

document.addEventListener('DOMContentLoaded', () => {
  const poster    = document.querySelector('.poster');
  const carousel  = document.querySelector('.poster-carousel');
  const totalPages     = 15;   // 전체 페이지 수
  const threshold      = 120;  // 휠 누적 delta 기준
  const transitionTime = 300;  // 페이드 전환 시간(ms)

  // 페이지 내비게이션용 상태
  let scrollDeltaPage = 0;
  let lastTimePage    = 0;

  // 캐러셀 내비게이션용 상태 (휠 기능은 제거)
  let scrollDeltaCar = 0;
  let lastTimeCar    = 0;

  // 현재 페이지 번호 추출
  const match = document.body.className.match(/archive-(\d+)/);
  const currentPage = match ? Number(match[1]) : null;

  // 페이지 이동 함수
  const goToPage = (pageNum) => {
    if (!pageNum || pageNum < 1 || pageNum > totalPages) return;
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = `/archive/${pageNum}`;
    }, transitionTime);
  };

  // 1) 왼쪽 영역( poster 또는 poster-carousel ) 휠 스크롤 → 페이지 전환
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

  // 2) 캐러셀이 있는 경우 → 버튼 클릭으로만 슬라이드 전환
  if (carousel) {
    const track       = carousel.querySelector('.carousel-track');
    const slides      = Array.from(track.children);
    let currentIndex  = 0;

    // 슬라이드 위치 갱신
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
});
