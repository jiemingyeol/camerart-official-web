document.addEventListener('DOMContentLoaded', () => {
  const poster    = document.querySelector('.poster');
  const carousel  = document.querySelector('.poster-carousel');
  const totalPages     = 15;
  const threshold      = 120;
  const transitionTime = 300;

  let scrollDeltaPage = 0;
  let lastTimePage    = 0;

  // 현재 페이지 번호 추출
  const match = document.body.className.match(/archive-(\d+)/);
  const currentPage = match ? Number(match[1]) : null;

  // -------------------------------
  // 1) 페이지 이동
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
  // 3) FUNDING 위치 자동 계산
  // -------------------------------
  const worksGrid = document.getElementById("worksGrid");
  const fundingHeader = document.getElementById("fundingHeader");
  const fundingContainer = document.getElementById("fundingContainer");

  if (worksGrid && fundingHeader && fundingContainer) {
    const workItems = worksGrid.querySelectorAll(".work-item img");

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

    const updateFundingPosition = () => {
      const { lastImg, maxBottom } = getLastVisibleImage();
      if (!lastImg) return;

      const fundingHeaderOffset = maxBottom + (238 / 1080 * window.innerHeight);
      fundingHeader.style.position = "absolute";
      fundingHeader.style.top = `${fundingHeaderOffset}px`;

      const fundingHeaderHeight = fundingHeader.offsetHeight || (48 / 1080 * window.innerHeight);
      const fundingContainerOffset = fundingHeaderOffset + fundingHeaderHeight + (32 / 1080 * window.innerHeight);
      fundingContainer.style.position = "absolute";
      fundingContainer.style.top = `${fundingContainerOffset}px`;
    };

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

    if (imagesLoaded === workItems.length) {
      updateFundingPosition();
    }

    window.addEventListener("resize", updateFundingPosition);
    window.addEventListener("scroll", updateFundingPosition);
  }

  // -------------------------------
  // 4) FUNDING 클릭 시 링크 열기
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
