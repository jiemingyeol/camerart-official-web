document.addEventListener('DOMContentLoaded', () => {
  const poster   = document.querySelector('.poster');
  const carousel = document.querySelector('.poster-carousel');
  const totalPages     = 15;
  const threshold      = 120;
  const transitionTime = 300;

  let scrollDeltaPage = 0, lastTimePage = 0;
  let scrollDeltaCar  = 0, lastTimeCar  = 0;

  // 페이지 이동 함수(생략)…

  // 1) .poster 휠 → 페이지 전환 (생략)…

  // 2) .poster-carousel 휠 & 클릭 → 슬라이드 전환
  if (carousel) {
    const track   = carousel.querySelector('.carousel-track');
    const slides  = Array.from(track.children);
    let currentIndex = 0;

    // 슬라이드 위치 업데이트
    const update = () => {
      const w = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * w}px)`;
    };
    window.addEventListener('resize', update);
    update();

    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');

    // ← 버튼 클릭
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
      update();
    });
    // → 버튼 클릭
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
      update();
    });

    // 휠 스크롤으로도 prev/next 트리거
    carousel.addEventListener('wheel', (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastTimeCar < transitionTime) return;

      scrollDeltaCar += e.deltaY;
      if (Math.abs(scrollDeltaCar) >= threshold) {
        if (scrollDeltaCar > 0) nextBtn.click();
        else prevBtn.click();
        scrollDeltaCar = 0;
        lastTimeCar    = now;
      }
    });
  }
});
