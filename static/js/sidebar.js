function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const isCurrentlyOpen = sidebar.classList.contains("open");

    try {
        const refPath = new URL(document.referrer).pathname;
        if (window.location.pathname === '/now' && refPath === '/') {
            localStorage.setItem('sidebarOpen', 'false');
        }
    } catch (e) {}

    if (isCurrentlyOpen) {
        // 🔹 애니메이션 중에도 클릭 막힘 방지
        sidebar.style.pointerEvents = "none";

        sidebar.classList.remove("open");
        localStorage.setItem("sidebarOpen", "false");

        setTimeout(() => {
            sidebar.style.display = "none";
            sidebar.style.pointerEvents = "auto"; // 다음 열림 대비 복원
        }, 300);
    } else {
        sidebar.style.display = "block";
        setTimeout(() => {
            sidebar.classList.add("open");
        }, 10);
        localStorage.setItem("sidebarOpen", "true");
    }
}

function toggleSubmenu(element) {
    const arrow = element.querySelector(".arrow");
    const submenu = element.nextElementSibling;
    const isOpen = submenu.classList.contains("show");

    if (isOpen) {
        submenu.classList.remove("show");
        arrow.textContent = "▶";
        localStorage.setItem("submenuOpen", "false");
    } else {
        submenu.classList.add("show");
        arrow.textContent = "▼";
        localStorage.setItem("submenuOpen", "true");
    }
}

// ✅ 페이지 로드 시 이전 상태 복원
window.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const shouldBeOpen = localStorage.getItem("sidebarOpen") === "true";

    try {
        const refPath = new URL(document.referrer).pathname;
        const isFirstLoad = (window.location.pathname === '/now' && refPath === '/');
        
        // ✅ intro → now 최초 진입 시 submenu 닫기
        if (isFirstLoad) {
            localStorage.setItem("submenuOpen", "false");
        }
    } catch (e) {}

    sidebar.classList.add("sidebar-no-transition");

    // 사이드바 열림 복원
    if (shouldBeOpen) {
        sidebar.classList.add("open");
    }

    // 서브메뉴 상태 복원
    if (localStorage.getItem("submenuOpen") === "true") {
        const menuToggle = document.querySelector(".menu-toggle");
        const arrow = menuToggle.querySelector(".arrow");
        const submenu = menuToggle.nextElementSibling;

        submenu.classList.add("show");
        arrow.textContent = "▼";
    }

    // 트랜지션 복원
    requestAnimationFrame(() => {
        sidebar.classList.remove("sidebar-no-transition");
    });
});
