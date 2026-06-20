document.addEventListener("DOMContentLoaded", applySidebarFromStorage);
window.addEventListener("storage", (e) => { if (e.key === "thongTin") applySidebarFromStorage(); });
// nhận event nội bộ trong cùng tab
window.addEventListener("thongTinUpdated", (ev) => { applySidebar(ev.detail); });

function applySidebarFromStorage(){
    try {
        const raw = localStorage.getItem("thongTin");
        if (!raw) return;
        const info = JSON.parse(raw);
        applySidebar(info);
    } catch(e){ console.error(e); }
}
function applySidebar(info){
    const sideImg = document.querySelector(".sidebar .profile img");
    const sideName = document.querySelector(".sidebar .profile h3");
    if (sideImg){
        sideImg.src = info.avatar || sideImg.getAttribute("data-default") || sideImg.src;
    }
    if (sideName){
        sideName.textContent = info.hoTen || sideName.textContent;
    }
}