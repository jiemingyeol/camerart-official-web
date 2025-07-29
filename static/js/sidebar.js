function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const isCurrentlyOpen = sidebar.classList.contains("open");

    // Intro 페이지(‘/’)에서 Now 페이지('/now')로 직접 이동한 경우
    // 이전에 저장된 open 상태를 강제로 'false'로 설정합니다.
    try {
        const refPath = new URL(document.referrer).pathname;
        if (window.location.pathname === '/now' && refPath === '/') {
        localStorage.setItem('sidebarOpen', 'false');
        }
    } catch (e) {
        // referrer 정보가 없으면 무시
    }
    
    if (isCurrentlyOpen) {
        sidebar.classList.remove("open");
        localStorage.setItem("sidebarOpen", "false");

        setTimeout(() => {
            sidebar.style.display = "none";
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
    const submenuShouldOpen = localStorage.getItem("submenuOpen") === "true";

    // ✅ 로딩 중에는 애니메이션 제거
    sidebar.classList.add("sidebar-no-transition");

    // 열림 상태 복원
    if (shouldBeOpen) {
        sidebar.classList.add("open");
    }

    // 서브메뉴 상태 복원
    if (submenuShouldOpen) {
        const menuToggle = document.querySelector(".menu-toggle");
        const arrow = menuToggle.querySelector(".arrow");
        const submenu = menuToggle.nextElementSibling;

        submenu.classList.add("show");
        arrow.textContent = "▼";
    }

    // ✅ 첫 렌더 후 트랜지션 다시 활성화
    requestAnimationFrame(() => {
        sidebar.classList.remove("sidebar-no-transition");
    });
});
