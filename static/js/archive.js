document.addEventListener('DOMContentLoaded', () => {
  const poster = document.querySelector('.poster');
  if (!poster) return;

  // body 클래스에서 현재 페이지 번호 추출
  const match = document.body.className.match(/archive-(\d+)/);
  if (!match) return;
  const pageNum = Number(match[1]);
  const totalPages = 15; // 실제 전체 페이지 수로 조정

  let scrollDelta = 0;
  const threshold = 120;       // 누적 deltaY 기준값
  const transitionTime = 300;  // 페이드 전환 시간 (ms)
  let lastTime = 0;

  const goToPage = (num) => {
    if (num < 1 || num > totalPages) return;
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = `/archive/${num}`;
    }, transitionTime);
  };

  poster.addEventListener('wheel', (e) => {
    e.preventDefault();
    const now = Date.now();
    // 스로틀: transitionTime만큼 대기
    if (now - lastTime < transitionTime) return;

    scrollDelta += e.deltaY;
    if (Math.abs(scrollDelta) >= threshold) {
      const dir = scrollDelta > 0 ? 1 : -1;
      goToPage(pageNum + dir);
      scrollDelta = 0;
      lastTime = now;
    }
  });
});
