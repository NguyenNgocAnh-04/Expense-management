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
    const table = document.querySelector(".bang-giao-dich table");
    if(!table) return;

    // đảm bảo có tbody
    let tbody = table.querySelector("tbody");
    if(!tbody){
        tbody = document.createElement("tbody");
        table.appendChild(tbody);
    }
    // sắp xếp danhSach theo ngày giảm dần (mới -> cũ)
    danhSachGiaoDich.sort((a,b) => {
        const da = _parseToISO(a.ngay || "");
        const db = _parseToISO(b.ngay || "");
        return db.localeCompare(da);
    });

    tbody.innerHTML= "";
    for (let i = 0; i < danhSachGiaoDich.length; i++){
        const gd = danhSachGiaoDich[i];
        const hang = document.createElement("tr");

        const mauTien = gd.loai === "Thu" ? "green" : "red";
        const kyHieu = gd.loai === "Thu" ? "+" : "-";
        const soTienText = gd.soTien != null ? Number(gd.soTien).toLocaleString() + " đ" : "";

        hang.innerHTML = `
        <td>${gd.ngay}</td>
        <td>${gd.ten}</td>
        <td style="color:${mauTien}">${kyHieu}${soTienText}</td>
        <td>${gd.loai}</td>
        <td>${gd.danhMuc}</td>
        <td>
            <button onclick="xoaGiaoDich(${gd.id})">Xóa</button>
        </td>
        `;
        tbody.appendChild(hang);
    }
}
//tai danh muc
function taiDanhMuc(){
    const duLieu =
    localStorage.getItem("danhMuc");
    if(!duLieu){
        return;
    }
    const danhSachDanhMuc =
    JSON.parse(duLieu);
    const select =
    document.getElementById("danh-muc");
    select.innerHTML = "";
    for(let i = 0;
        i < danhSachDanhMuc.length;
        i++)
    {
        const option = document.createElement("option");
        option.value = danhSachDanhMuc[i].ten;
        option.textContent = danhSachDanhMuc[i].ten;
        select.appendChild(option);
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
    const elTen = document.getElementById("ten-giao-dich");
    const elSo = document.getElementById("so-tien");
    const elNgay = document.getElementById("ngay-giao-dich");
    if(elTen) elTen.value = "";
    if(elSo) elSo.value = "";
    if(elNgay) elNgay.value = "";
}

//addEventListener
const nutThem = document.getElementById("nut-them-giao-dich");
if(nutThem) nutThem.addEventListener("click", function(e){
    e.preventDefault();
    themGiaoDich();
});
const nutDongPopup = document.getElementById("nut-dong-popup");
if(nutDongPopup) nutDongPopup.addEventListener("click", anPopup);

// Hàm parse ngày (hỗ trợ dd/mm/yyyy và yyyy-mm-dd)
function _parseToISO(dateStr){
    if (!dateStr) return "";
    dateStr = dateStr.trim();
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)){
        const [d,m,y] = dateStr.split("/");
        return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    return dateStr;
}

taiDanhMuc();
taiDuLieu();
hienThiBang();

