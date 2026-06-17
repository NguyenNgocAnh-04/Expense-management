let danhSachGiaoDich = [];

//luu vao localStorage
function luuDuLieu(){
    localStorage.setItem("giaoDich",
        JSON.stringify(danhSachGiaoDich)
    );
}
//tai du lieu len
function taiDuLieu(){
    const duLieu = localStorage.getItem("giaoDich");
    if(duLieu){
        danhSachGiaoDich = JSON.parse(duLieu);
    }
}

//hien thi
function hienThiBang(){
    const bang = document.querySelector(".bang-giao-dich table");
    bang.innerHTML= "";
    for (let i = 1; i < danhSachGiaoDich.length; i++){
        const gd = danhSachGiaoDich[i];
        const hang = document.createElement("tr");

        const mauTien = gd.loai === "Thu" ? "green" : "red";
        const kyHieu = gd.loai === "Thu" ? "+" : "-";
        
        hang.innerHTML = `
        <td>${gd.ngay}</td>
        <td>${gd.ten}</td>
        <td style="color:${mauTien}">${kyHieu}${Number(gd.soTien).toLocaleString()} đ</td>
        <td>${gd.loai}</td>
        <td>${gd.danhMuc}</td>
        <td>
            <button onclick="xoaGiaoDich(${gd.id})">Xóa</button>
        </td>
        `;
        bang.appendChild(hang);
    }
}
//them giao dich
function themGiaoDich(){
    const ngay = document.getElementById("ngay-giao-dich").value ;
    const ten = document.getElementById("ten-giao-dich").value.trim() ;
    const soTien = document.getElementById("so-tien").value ;
    const loai = document.getElementById("loai-giao-dich").value ;
    const danhMuc = document.getElementById("danh-muc").value ;

    // ktra du lieu 
    if(ten === ""){
        alert("Vui lòng nhập tên giao dịch!");
        return;
    }
    if(soTien === "" || Number(soTien) <= 0){
        alert("Vui lòng nhập số tiền hợp lệ!");
        return;
    }
    if(ngay === ""){
        alert("Vui lòng chọn ngày!");
        return;
    }

    //tao object giao dich 
    const giaoDichMoi = {
        id: Date.now(),
        ngay: ngay,
        ten: ten,
        soTien: soTien,
        loai: loai,
        danhMuc: danhMuc
    };
    danhSachGiaoDich.push(giaoDichMoi);
    luuDuLieu();
    hienThiBang();
    xoaForm();
    hienThiPopup();

};

//xoa giao dich
function xoaGiaoDich(id){
    const xacNhan = confirm("Bạn có muốn xóa giao dịch này không?");
    if(!xacNhan) return;

    const index = danhSachGiaoDich.findIndex(gd => gd.id === id);
    danhSachGiaoDich.splice(index, 1);
    luuDuLieu();
    hienThiBang();
}

//popup
function hienThiPopup(){
    document.getElementById("popup").style.display = "block";

}
function anPopup() {
    document.getElementById("popup").style.display = "none";
}

//xoa form
function xoaForm(){
    document.getElementById("ten-giao-dich").value = "";
    document.getElementById("so-tien").value = "";
    document.getElementById("ngay-giao-dich").value = "";
}

//addEventListener
document.getElementById("nut-them-giao-dich").addEventListener("click", function(e){
    e.preventDefault();
    themGiaoDich();
});
document.getElementById("nut-dong-popup").addEventListener("click", anPopup);

taiDuLieu();
hienThiBang();
