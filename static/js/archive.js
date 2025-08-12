document.addEventListener('DOMContentLoaded', () => {
  const poster    = document.querySelector('.poster');
  const carousel  = document.querySelector('.poster-carousel');
  const totalPages     = 15;
  const threshold      = 120;
  const transitionTime = 300;

  let scrollDeltaPage = 0;
  let lastTimePage    = 0;

  // -------------------------------
  // 1) 캐러셀 버튼
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
      if (currentIndex > 0) {
        currentIndex -= 1;
        updateCarousel();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        currentIndex += 1;
        updateCarousel();
      }
    });
  }

  // -------------------------------
  // 2) ARTIST 동적 위치 조정
  // -------------------------------
  function toVw(px) {
    return `calc(${px} / 1920 * 100vw)`;
  }
  function toVh(px) {
    return `calc(${px} / 1080 * 100vh)`;
  }

  // Artist 텍스트의 줄 수를 계산하고 위치 조정
  const artistElement = document.querySelector('.exhibition-artist');
  if (artistElement) {
    // <br> 태그 개수를 세어 줄 수 계산
    const artistText = artistElement.innerHTML;
    const lineBreaks = (artistText.match(/<br\s*\/?>/gi) || []).length;
    const lineCount = lineBreaks + 1; // 줄 수 = <br> 개수 + 1
    
    // 한 줄당 높이 (line-height 값)
    const lineHeight = 28; // CSS에서 설정된 line-height 값
    
    // 전체 텍스트 높이 계산
    const totalHeight = lineCount * lineHeight;
    
    // divider2 위치에서 36px 위에 바닥이 오도록 위치 계산
    const divider2Position = 1084; // CSS에서 설정된 divider2의 top 값
    const marginFromDivider = 36; // divider2로부터의 여백
    
    // artist 요소의 top 위치 계산
    const artistTopPosition = divider2Position - marginFromDivider - totalHeight;
    
    // 위치 적용
    artistElement.style.top = toVh(artistTopPosition);
  }

  document.querySelectorAll('.work-item').forEach(item => {
    const x = parseFloat(item.dataset.x);
    const y = parseFloat(item.dataset.y);
    const w = parseFloat(item.dataset.w);
    const h = parseFloat(item.dataset.h);

    // 부모 컨테이너 스타일 지정
    item.style.position = 'absolute';
    item.style.top = toVh(y);
    item.style.left = toVw(x);
    if (w) item.style.width = toVw(w);
    if (h) item.style.height = toVh(h);

    // ✅ 캡션 위치 설정
    const caption = item.querySelector('.work-caption');
    if (caption) {
      caption.style.position = 'absolute';
      caption.style.left = '0';
      caption.style.top = `calc(${h} / 1080 * 100vh + 12 / 1080 * 100vh)`;
      caption.style.width = '100%';
    }
  });

  // -------------------------------
  // 3) FUNDING 수동 좌표 배치
  // -------------------------------
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
  // 4) FUNDING 클릭 시 외부 링크 열기
  // -------------------------------
  const fundingTitle = document.querySelector(".funding-container img");

  if (fundingTitle) {
    let fundingUrl = null;

    // 클릭 리스너 먼저 등록
    fundingTitle.addEventListener("click", () => {
      if (fundingUrl) {
        window.open(fundingUrl, "_blank", "noopener,noreferrer");
      }
    });

    // JSON 로드
    fetch("/static/data/archive.json")
      .then(response => response.json())
      .then(data => {
        const match = document.body.className.match(/archive-(\d+)/);
        const currentPage = match ? match[1] : null;

        if (currentPage && data[currentPage]) {
          fundingUrl = data[currentPage].images?.funding_embed || null;
        }
      })
      .catch(err => console.error("archive.json 로드 오류:", err));
  }
});
