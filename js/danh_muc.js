let danhSachDanhMuc = [];
let idDangSua = null;

const ICON_MAP = {
    "an uong":  { emoji: "🍔", mau: "#fff0e0" },
    "di lai":   { emoji: "🚗", mau: "#e0f0ff" },
    "hoc tap":  { emoji: "📚", mau: "#f0e0ff" },
    "giai tri": { emoji: "🎮", mau: "#fff9e0" },
    "mua sam":  { emoji: "🛍️", mau: "#e0fff5" },
    "suc khoe": { emoji: "💊", mau: "#ffe0e8" },
    "luong":    { emoji: "💰", mau: "#e8ffe0" },
};

function chuanHoaChuoi(str) {
    return str.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d");
}

function layIcon(ten) {
    const s = chuanHoaChuoi(ten);
    for (const key in ICON_MAP) {
        if (s.includes(key) || key.includes(s)) return ICON_MAP[key];
    }
    return { emoji: "📁", mau: "#f0f0f5" };
}

function demGiaoDich(tenDanhMuc) {
    const raw = localStorage.getItem("giaoDich");
    if (!raw) return 0;
    return JSON.parse(raw).filter(gd => gd.danhMuc === tenDanhMuc).length;
}

function luuDuLieu() {
    localStorage.setItem("danhMuc", JSON.stringify(danhSachDanhMuc));
}

function taiDuLieu() {
    const raw = localStorage.getItem("danhMuc");
    if (raw) danhSachDanhMuc = JSON.parse(raw);
}

function hienThiDanhMuc() {
    const container = document.getElementById("danh-sach-danh-muc");
    const tieuDe    = document.getElementById("tieu-de-danh-sach");

    container.innerHTML = "";
    tieuDe.textContent  = `Danh sách danh mục (${danhSachDanhMuc.length})`;

    if (danhSachDanhMuc.length === 0) {
        container.innerHTML = `
            <p style="color:#987280;grid-column:1/-1;padding:20px 0;">
                Chưa có danh mục nào. Hãy thêm danh mục đầu tiên!
            </p>`;
        return;
    }

    danhSachDanhMuc.forEach(dm => {
        const icon = layIcon(dm.ten);
        const soGD = demGiaoDich(dm.ten);
        const card = document.createElement("div");
        card.className = "card-danh-muc";
        card.innerHTML = `
            <div class="card-top">
                <div class="card-icon" style="background:${icon.mau}">
                    ${icon.emoji}
                </div>
                <div class="card-info">
                    <h4>${dm.ten}</h4>
                    <p>${soGD} giao dịch</p>
                </div>
                <button class="card-menu">⋮</button>
            </div>
            <div class="card-buttons">
                <button class="nut-sua" onclick="moPopupSua(${dm.id})"> Sửa</button>
                <button class="nut-xoa" onclick="xoaDanhMuc(${dm.id})"> Xóa</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function themDanhMuc() {
    const ten = document.getElementById("ten-danh-muc").value.trim();
    if (ten === "") { alert("Vui lòng nhập tên danh mục!"); return; }

    const trung = danhSachDanhMuc.find(
        dm => dm.ten.toLowerCase() === ten.toLowerCase()
    );
    if (trung) { alert("Danh mục này đã tồn tại!"); return; }

    danhSachDanhMuc.push({ id: Date.now(), ten: ten });
    luuDuLieu();
    hienThiDanhMuc();
    document.getElementById("ten-danh-muc").value = "";
}

function xoaDanhMuc(id) {
    if (!confirm("Bạn có muốn xóa danh mục này không?")) return;
    const index = danhSachDanhMuc.findIndex(dm => dm.id === id);
    danhSachDanhMuc.splice(index, 1);
    luuDuLieu();
    hienThiDanhMuc();
}

function moPopupSua(id) {
    idDangSua = id;
    const dm = danhSachDanhMuc.find(dm => dm.id === id);
    if (!dm) return;
    document.getElementById("input-ten-moi").value = dm.ten;
    document.getElementById("overlay").style.display   = "block";
    document.getElementById("popup-sua").style.display = "block";
    document.getElementById("input-ten-moi").focus();
}

function dongPopup() {
    document.getElementById("overlay").style.display   = "none";
    document.getElementById("popup-sua").style.display = "none";
    idDangSua = null;
}

function luuSua() {
    const tenMoi = document.getElementById("input-ten-moi").value.trim();
    if (tenMoi === "") { alert("Tên không được để trống!"); return; }
    const index = danhSachDanhMuc.findIndex(dm => dm.id === idDangSua);
    if (index !== -1) {
        danhSachDanhMuc[index].ten = tenMoi;
        luuDuLieu();
        hienThiDanhMuc();
        dongPopup();
    }
}

document.getElementById("button-them").addEventListener("click", function(e) {
    e.preventDefault();
    themDanhMuc();
});

document.getElementById("ten-danh-muc").addEventListener("keydown", function(e) {
    if (e.key === "Enter") { e.preventDefault(); themDanhMuc(); }
});

document.getElementById("input-ten-moi").addEventListener("keydown", function(e) {
    if (e.key === "Enter") luuSua();
    if (e.key === "Escape") dongPopup();
});

taiDuLieu();
hienThiDanhMuc();