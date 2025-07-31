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

  // 현재 페이지 번호 추출
  const match = document.body.className.match(/archive-(\d+)/);
  const currentPage = match ? Number(match[1]) : null;

  // -------------------------------
  // 1) 페이지 이동 (왼쪽 포스터 스크롤)
  // -------------------------------
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
  // 2) 캐러셀 버튼 클릭 전환
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
  // 3) FUNDING 위치 자동 계산
  // -------------------------------
  const worksGrid = document.getElementById("worksGrid");
  const fundingHeader = document.getElementById("fundingHeader");
  const fundingImageContainer = document.getElementById("fundingImageContainer");

  if (worksGrid && fundingHeader && fundingImageContainer) {
    const workItems = worksGrid.querySelectorAll(".work-item img");

    // 가장 아래에 위치한 이미지 탐색
    const getLastVisibleImage = () => {
      let lastImg = null;
      let maxBottom = 0;
      workItems.forEach(img => {
        const rect = img.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const bottom = rect.top + scrollTop + rect.height;

        if (bottom > maxBottom) {
          maxBottom = bottom;
          lastImg = img;
        }
      });
      return { lastImg, maxBottom };
    };

    // FUNDING 위치 갱신
    const updateFundingPosition = () => {
      const { lastImg, maxBottom } = getLastVisibleImage();
      if (!lastImg) return;

      // FUNDING 헤더 위치 = 마지막 이미지 하단 + 238px
      const fundingHeaderOffset = maxBottom + (238 / 1080 * window.innerHeight);
      fundingHeader.style.position = "absolute";
      fundingHeader.style.top = `${fundingHeaderOffset}px`;

      // FUNDING 이미지 위치 = 헤더 하단 + 32px
      const fundingHeaderHeight = fundingHeader.offsetHeight || (48 / 1080 * window.innerHeight);
      const fundingImageOffset = fundingHeaderOffset + fundingHeaderHeight + (32 / 1080 * window.innerHeight);
      fundingImageContainer.style.position = "absolute";
      fundingImageContainer.style.top = `${fundingImageOffset}px`;
    };

    // 이미지 로드 완료 후 위치 계산
    let imagesLoaded = 0;
    workItems.forEach(img => {
      if (img.complete) {
        imagesLoaded++;
      } else {
        img.addEventListener("load", () => {
          imagesLoaded++;
          if (imagesLoaded === workItems.length) {
            updateFundingPosition();
          }
        });
      }
    });

    // 모든 이미지가 이미 로드된 상태
    if (imagesLoaded === workItems.length) {
      updateFundingPosition();
    }

    // 화면 리사이즈/스크롤 시 위치 갱신
    window.addEventListener("resize", updateFundingPosition);
    window.addEventListener("scroll", updateFundingPosition);
  }
});
