let danhSachDanhMuc = [];

//luu du lieu
function luuDuLieu(){
    localStorage.setItem("danhMuc",
        JSON.stringify(danhSachDanhMuc));
}

//lay du lieu
function taiDuLieu(){
    const duLieu = localStorage.getItem("danhMuc");
    if(duLieu){
        danhSachDanhMuc = JSON.parse(duLieu);
    }
}

//hien thi danh muc
function hienThiDanhMuc(){
    const danhSach = document.querySelector(".danh-sach-danh-muc");
    danhSach.innerHTML= "";
    for(let i = 0; 
        i < danhSachDanhMuc.length;
        i++
    ){
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = ` 
        <h4>${danhSachDanhMuc[i].ten}</h4>
        <div class="nut-card">
            <button onclick="xoaDanhMuc(${danhSachDanhMuc[i].id})"> Xóa </button>
        </div> `;

        danhSach.appendChild(card);
    }
}
//them danh muc
function themDanhMuc(){
    const tenDanhMuc = document.getElementById("ten-danh-muc").value.trim() ;
    if(tenDanhMuc === ""){
        alert("Vui lòng nhập tên danh mục");
        return;

    };

    const danhMuc = {
        id: Date.now(),
        ten: tenDanhMuc
    };

    danhSachDanhMuc.push(danhMuc);
    luuDuLieu();
    hienThiDanhMuc()
    document.getElementById("ten-danh-muc").value = "";
}

//xoa danhMuc
function xoaDanhMuc(id){
    const xacNhan =
    confirm("Bạn có muốn xóa danh mục này không?");
    if(!xacNhan) return;

    // Tìm vị trí phần tử có id trùng khớp
    const index = danhSachDanhMuc.findIndex(dm => dm.id === id);

    // Xóa 1 phần tử tại vị trí index
    danhSachDanhMuc.splice(index, 1);
    luuDuLieu();
    hienThiDanhMuc();

}

document.getElementById("button-them").addEventListener("click", themDanhMuc);

taiDuLieu();
hienThiDanhMuc();