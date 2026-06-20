let thongTin = {
    hoTen: "",
    gioiTinh: "",
    soDienThoai: "",
    ngaySinh: "",
    email: "",
    avatar: "" 
};

let truongDangSua = "";

//lay thong tin
function taiThongTin(){
    const duLieuThongTin = localStorage.getItem("thongTin");
    if (duLieuThongTin){
        try { thongTin = Object.assign(thongTin, JSON.parse(duLieuThongTin)); } catch(e){/* ignore */ }
    }

    const duLieuTaiKhoan = localStorage.getItem("taiKhoan");
    if(duLieuTaiKhoan) {
        try {
            const taiKhoan = JSON.parse(duLieuTaiKhoan);
            // nếu chưa có email trong thongTin thì lấy từ taiKhoan
            if (!thongTin.email) {
                thongTin.email = taiKhoan.email || "";
            }
        } catch(e){}
    }
}

//luu du lieu
function luuThongTin(){
    localStorage.setItem("thongTin", JSON.stringify(thongTin));
    updateSidebarProfile();
    // phát custom event để các script khác trong cùng tab lắng nghe 
     window.dispatchEvent(new CustomEvent("thongTinUpdated", { detail: thongTin }));
}

//hien thi thong tin
function hienThiThongTin(){
    const taiKhoanRaw = localStorage.getItem("taiKhoan");
    let taiKhoan = null;
    try { taiKhoan = taiKhoanRaw ? JSON.parse(taiKhoanRaw) : null; } catch(e){ taiKhoan = null; }

    const elHoTen = document.getElementById("hien-thi-ho-ten");
    const elGioiTinh = document.getElementById("hien-thi-gioi-tinh");
    const elEmail = document.getElementById("hien-thi-email");
    const elSoDT = document.getElementById("hien-thi-so-dien-thoai");
    const elNgaySinh = document.getElementById("hien-thi-ngay-sinh");
    const avatarImg = document.getElementById("avatar-img");

    if (elHoTen) elHoTen.textContent = thongTin.hoTen || "Chưa cập nhật";
    if (elGioiTinh) elGioiTinh.textContent = thongTin.gioiTinh || "Chưa cập nhật";
    if (elEmail) elEmail.textContent = (thongTin.email || (taiKhoan && taiKhoan.email)) || "Chưa cập nhật";
    if (elSoDT) elSoDT.textContent = thongTin.soDienThoai || "Chưa cập nhật";
    if (elNgaySinh) elNgaySinh.textContent = thongTin.ngaySinh || "Chưa cập nhật";

    if (avatarImg){
        if (thongTin.avatar){
            avatarImg.src = thongTin.avatar;
            avatarImg.style.display = "block";
        } else {
            // hiển thị chữ cái đầu làm avatar
            const box = document.getElementById("avatar-box");
            avatarImg.style.display = "none";
            box.textContent = (thongTin.hoTen && thongTin.hoTen.trim().length > 0) ? thongTin.hoTen.trim().charAt(0).toUpperCase() : "N";
        }
    }
    
}

function moPopup(truong, tieuDe, loai){
    truongDangSua = truong;
    document.getElementById("tieu-de-popup").textContent = tieuDe;
    const container = document.getElementById("noi-dung-popup");
    container.innerHTML = ""; 

    if (truong === "avatar") {
        document.getElementById("input-file-avatar").click();
        return;
    }

    if (truong === "gioiTinh"){
        container.innerHTML = `
            <select id="input-popup">
                <option value="">--Chọn--</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </select>
        `;
        const sel = document.getElementById("input-popup");
        sel.value = thongTin.gioiTinh || "";
    } else if (truong === "ngaySinh") {
        container.innerHTML = `<input type="date" id="input-popup">`;
        const inp = document.getElementById("input-popup");
        if (thongTin.ngaySinh){
            const parts = thongTin.ngaySinh.split("/");
            if (parts.length === 3){
                const [d,m,y] = parts;
                const yyyy = (y.length===2) ? ("20"+y) : y;
                inp.value = `${yyyy}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
            }
        }
    } else if (truong === "soDienThoai"){
        container.innerHTML = `<input type="tel" id="input-popup" inputmode="numeric" pattern="[0-9]*" maxlength="15">`;
        document.getElementById("input-popup").value = thongTin.soDienThoai || "";
    } else if (truong === "email") {
        container.innerHTML = `<input type="email" id="input-popup">`;
        document.getElementById("input-popup").value = thongTin.email || "";
    } else {
        container.innerHTML = `<input type="text" id="input-popup">`;
        document.getElementById("input-popup").value = thongTin[truong] || "";
    }
    document.getElementById("popup-chinh-sua").style.display = "flex";
}

function dongPopup(){
    document.getElementById("popup-chinh-sua").style.display = "none";
}

function formatDateToDDMMYYYY(dateObj){
    const dd = String(dateObj.getDate()).padStart(2,'0');
    const mm = String(dateObj.getMonth()+1).padStart(2,'0');
    const yyyy = dateObj.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
}

function luuPopup(){
    const inp = document.getElementById("input-popup");
    if (!inp && truongDangSua !== "avatar") return;

    let giaTriMoi = inp ? inp.value.trim() : "";

   
    if (truongDangSua === "ngaySinh" && giaTriMoi){
        if (/^\d{4}-\d{2}-\d{2}$/.test(giaTriMoi)){
            const [y,m,d] = giaTriMoi.split("-");
            giaTriMoi = `${d}/${m}/${y}`;
        } else if (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(giaTriMoi)){
            const parts = giaTriMoi.split("/");
            let [d,m,y] = parts;
            if (y.length === 2) y = "20"+y;
            giaTriMoi = `${d.padStart(2,'0')}/${m.padStart(2,'0')}/${y}`;
        }
    }

    // validation
    if (truongDangSua === "hoTen"){
        if (giaTriMoi === "" || giaTriMoi.length < 2){
            alert("Họ tên phải ít nhất 2 ký tự.");
            return;
        }
    } else if (truongDangSua === "gioiTinh"){
        if (!["Nam","Nữ"].includes(giaTriMoi)){
            alert("Vui lòng chọn Nam hoặc Nữ.");
            return;
        }
    } else if (truongDangSua === "email"){
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(giaTriMoi)){
            alert("Email không hợp lệ.");
            return;
        }
    } else if (truongDangSua === "soDienThoai"){
        if (!/^\d{6,15}$/.test(giaTriMoi)){
            alert("Số điện thoại chỉ chứa 6-15 chữ số.");
            return;
        }
    } else if (truongDangSua === "ngaySinh"){
        if (giaTriMoi === ""){
            alert("Vui lòng chọn ngày sinh.");
            return;
        }
        giaTriMoi = formatDateToDDMMYYYY(dateObj);
    }

    // lưu
    thongTin[truongDangSua] = giaTriMoi;
    luuThongTin();
    hienThiThongTin();
    dongPopup();
}

// xử lý upload avatar
const fileInput = document.getElementById("input-file-avatar");
if (fileInput){
    fileInput.addEventListener("change", function(e){
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        if (!f.type.startsWith("image/")){
            alert("Vui lòng chọn file ảnh.");
            return;
        }
        const reader = new FileReader();
        reader.onload = function(ev){
            thongTin.avatar = ev.target.result; 
            luuThongTin();
            hienThiThongTin();
        };
        reader.readAsDataURL(f);
    });
}

// event listeners
const elItemAnh = document.getElementById("item-anh");
if (elItemAnh) elItemAnh.onclick = function(){ moPopup("avatar","Thay ảnh hồ sơ","file"); };

const elHoTen = document.getElementById("item-ho-ten");
if (elHoTen) elHoTen.onclick = function(){ moPopup("hoTen","Chỉnh sửa họ tên","text"); };

const elGioiTinh = document.getElementById("item-gioi-tinh");
if (elGioiTinh) elGioiTinh.onclick = function(){ moPopup("gioiTinh","Chỉnh sửa giới tính","option"); };

const elNgaySinh = document.getElementById("item-ngay-sinh");
if (elNgaySinh) elNgaySinh.onclick = function(){ moPopup("ngaySinh","Chỉnh sửa ngày sinh","date"); };

const elEmail = document.getElementById("item-email");
if (elEmail) elEmail.onclick = function(){ moPopup("email","Chỉnh sửa email","email"); };

const elSoDT = document.getElementById("item-so-dien-thoai");
if (elSoDT) elSoDT.onclick = function(){ moPopup("soDienThoai","Chỉnh sửa số điện thoại","tel"); };

document.getElementById("popup-chinh-sua").style.display = "none";
document.getElementById("nut-luu-popup").addEventListener("click",luuPopup);
document.getElementById("nut-huy-popup").addEventListener("click",dongPopup);
taiThongTin();
hienThiThongTin();
updateSidebarProfile();
