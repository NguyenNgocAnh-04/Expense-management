let danhSachGiaoDich = [];
function layDuLieu(){
    const ten = document.getElementById("ten-giao-dich").value ;
    const soTien = document.getElementById("so-tien").value ;
    const loai = document.getElementById("loai-giao-dich").value ;
    const danhMuc = document.getElementById("danh-muc").value ;

};

//object giao dich 
const giaoDich = {
    ngay: ngay,
    ten: ten,
    soTien: soTien,
    loai: loai,
    danhMuc: danhMuc
};
danhSachGiaoDich.push(giaoDich);

let danhSachDanhMuc = [];
/*for(let i = 0; i < danhSachDanhMuc.length; i++){

    const option =
    document.createElement("option");

    option.value = danhSachDanhMuc[i];

    option.textContent = danhSachDanhMuc[i];

    document
        .getElementById("danh-muc")
        .appendChild(option);

}
    */
function hienThiGiaoDich() {
    const bang = document.getElementById("bang-giao-dich");
    for(let i=0;
        i < danhSachGiaoDich.length;
        i++
    ){
    const dong = document.createElement("tr");
    dong.innerHTML = <td>${danhSachGiaoDich[i].ngay}</td>,
                    <td>${danhSachGiaoDich[i].ten}</td>,
                    <td>${danhSachGiaoDich[i].soTien}</td>,
                    <td>${danhSachGiaoDich[i].loai}</td>,
                    <td>${danhSachGiaoDich[i].danhMuc}</td>,
                    <td>
                        <button onclick="xoaGiaoDich(${i})">Xóa</button>
                    </td>;
    bang.appendChild(dong);
    }
}

localStorage.setItem(
    "giaoDich",
    JSON.stringify(danhSachGiaoDich)
);

const duLieu = localStorage.getItem("giaoDich");
if(duLieu){}

//popup
