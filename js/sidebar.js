function updateSidebarProfile() {
    try {
        const stored = localStorage.getItem("thongTin");
        if (!stored) return;
        const info = JSON.parse(stored);

        const sideImg  = document.querySelector(".sidebar .profile img");
        const sideName = document.querySelector(".sidebar .profile h3");

        if (sideImg) {
            // Nếu có avatar thì cập nhật, không thì giữ ảnh mặc định
            if (info.avatar) sideImg.src = info.avatar;
        }
        if (sideName) {
            if (info.hoTen) sideName.textContent = info.hoTen;
        }
    } catch(e) {}
}

// Chạy ngay khi trang load
updateSidebarProfile();

// Lắng nghe thay đổi từ tab khác
window.addEventListener("storage", function(e) {
    if (e.key === "thongTin") updateSidebarProfile();
});
//tao ham dang xuat
function dangXuat() {
    const xacNhan = confirm("Bạn có chắc muốn đăng xuất không?");
    if (!xacNhan) return;

    // Xóa session đăng nhập (giữ lại tài khoản để đăng nhập lại)
    localStorage.removeItem("dangNhap");
    
    // Chuyển về trang đăng nhập
    window.location.href = "dang_nhap.html";
}