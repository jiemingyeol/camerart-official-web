// dragscroll.js
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("installScroll");
    if (!container) return; // 이 페이지에는 갤러리 없음 → 그냥 종료

    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
        isDown = true;
        container.classList.add("dragging");
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mouseleave", () => {
        isDown = false;
        container.classList.remove("dragging");
    });

    container.addEventListener("mouseup", () => {
        isDown = false;
        container.classList.remove("dragging");
    });

    container.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5; // drag 속도 조절
        container.scrollLeft = scrollLeft - walk;
    });
});