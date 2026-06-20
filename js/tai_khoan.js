let thongTin = {
    hoTen: "",
    gioiTinh: "",
    soDienThoai: "",
    ngaySinh: ""
};


//lay thong tin
function taiThongTin(){
    const duLieuThongTin = localStorage.getItem("thongTin");
    if (duLieuThongTin){
        thongTin = JSON.parse(duLieuThongTin);
    };

    const duLieuTaiKhoan = localStorage.getItem("taiKhoan");
    if(duLieuTaiKhoan) {
        const taiKhoan = JSON.parse(duLieuTaiKhoan);
        if (thongTin.email === ""){

            thongTin.email = taiKhoan.email || "";
            luuThongTin();
        }
    }
}

//luu du lieu
function luuThongTin(){
    localStorage.setItem("thongTin", JSON.stringify(thongTin));
}

//hien thi thong tin
function hienThiThongTin(){
    const taiKhoan = JSON.parse(localStorage.getItem("taiKhoan"));
    
    document.getElementById("hien-thi-ho-ten").textContent = thongTin.hoTen || "Chưa cập nhật";
    document.getElementById("hien-thi-gioi-tinh").textContent = thongTin.gioiTinh    || "Chưa cập nhật";
    document.getElementById("hien-thi-email").textContent = taiKhoan.email       || "Chưa cập nhật";
    document.getElementById("hien-thi-so-dien-thoai").textContent= thongTin.soDienThoai || "Chưa cập nhật";
    document.getElementById("hien-thi-ngay-sinh").textContent = thongTin.ngaySinh    || "Chưa cập nhật";
    //chinh avatar

}

function moPopup(truong, tieuDe, loai){
    truongDangSua = truong;
    document.getElementById("tieu-de-popup").textContent = tieuDe;
    const input = document.getElementById("input-popup");
    input.type = loai;
    input.value = thongTin[truong] || "";
    document.getElementById("popup-chinh-sua").style.display = "flex";
    if(truong === "gioiTinh"){
        document.getElementById("noi-dung-popup").innerHTML = `
            <select id="input-popup">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </select>
        `;
}
}
function dongPopup(){
    document.getElementById("popup-chinh-sua").style.display = "none";
}

function luuPopup(){
    const giaTriMoi = document.getElementById("input-popup").value.trim();
    if(giaTriMoi === ""){
        alert("Không được để trống");
        return;
    }
    thongTin[truongDangSua] = giaTriMoi;
    luuThongTin();
    hienThiThongTin();
    dongPopup();
}

document.getElementById("item-ho-ten").onclick = function(){
    moPopup(
        "hoTen",
        "Chỉnh sửa họ tên",
        "text"
    );

};
document.getElementById("item-gioi-tinh").onclick = function(){
    moPopup(
        "gioiTinh",
        "Chỉnh sửa giới tính",
        "option"
    );

};
document.getElementById("item-ngay-sinh").onclick = function(){
    moPopup(
        "ngaySinh",
        "Chỉnh sửa ngày sinh",
        "date"
    );

};
document.getElementById("popup-chinh-sua").style.display = "none";
document.getElementById("nut-luu-popup").addEventListener("click",luuPopup);
document.getElementById("nut-huy-popup").addEventListener("click",dongPopup);
taiThongTin();
hienThiThongTin();


