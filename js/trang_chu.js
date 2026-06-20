let danhSachGiaoDich = [];

//tai du lie
function taiDuLieu() {
    const duLieu = localStorage.getItem("giaoDich");
    if (duLieu) {
        danhSachGiaoDich = JSON.parse(duLieu);
    }
}

//tinh tong thu, chi, so du, ti le
function tinhToan() {
    let tongThu = 0;
    let tongChi = 0;

    for (let i = 0; i < danhSachGiaoDich.length; i++){
        const gd = danhSachGiaoDich[i];
        if (gd.loai === "Thu"){
            tongThu += Number(gd.soTien);
        } else{
            tongChi +=Number(gd.soTien);
        }
    }
    const soDu = tongThu - tongChi;
    const tiLe = tongThu > 0 ? ((tongChi / tongThu)*100).toFixed(1) : 0;
    return {tongThu, tongChi, soDu, tiLe};

}

//hien thi cards
function hienThiCards(){
    const {tongThu, tongChi, soDu, tiLe} = tinhToan();

    document.getElementById("hien-thi-tong-thu").textContent = tongThu.toLocaleString() + "đ";
    document.getElementById("hien-thi-tong-chi").textContent = tongChi.toLocaleString() + "đ";
    document.getElementById("hien-thi-so-du").textContent = soDu.toLocaleString() + "đ";
    document.getElementById("hien-thi-ti-lư").textContent = tiLe.toLocaleString() + "đ";

}

//hien thi giao dich gan day
function hienThiGiaoDichGanDay(){
    const khung = document.getElementById("danh-sach-gan-day");
    khung.innerHTML = "";
    if(danhSachGiaoDich.length === 0){
        khung.innerHTML = "<p>Chưa có giao dịch nào</p>";
        return;
    }
   const gdGanDay = [...danhSachGiaoDich].reverse().slice(0, 5);

    for (let i = 0; i < gdGanDay.length; i++) {
        const gd = gdGanDay[i];
        const mauTien = gd.loai === "Thu" ? "green" : "red";
        const kyHieu  = gd.loai === "Thu" ? "+"     : "-";

        const item = document.createElement("div");
        item.className = "giao-dich-item";
        item.innerHTML = `
            <div class="gd-info">
                <p class="gd-ten">${gd.ten}</p>
                <p class="gd-phu">${gd.danhMuc} · ${gd.ngay}</p>
            </div>
            <p class="gd-so-tien" style="color:${mauTien}">
                ${kyHieu}${Number(gd.soTien).toLocaleString()} đ
            </p>
        `;
        khung.appendChild(item);
    }
}

//bieu do cot theo thang
function veBieuDoThang() {
    // Nhóm dữ liệu theo tháng (YYYY-MM)
    const duLieuThang = {};

    for (let i = 0; i < danhSachGiaoDich.length; i++) {
        const gd    = danhSachGiaoDich[i];
        const thang = gd.ngay.substring(0, 7); // "2024-05"

        if (!duLieuThang[thang]) {
            duLieuThang[thang] = { thu: 0, chi: 0 };
        }
        if (gd.loai === "Thu") {
            duLieuThang[thang].thu += Number(gd.soTien);
        } else {
            duLieuThang[thang].chi += Number(gd.soTien);
        }
    }

    const cacThang  = Object.keys(duLieuThang).sort();
    const dsThu     = cacThang.map(t => duLieuThang[t].thu);
    const dsChi     = cacThang.map(t => duLieuThang[t].chi);

    const ctx = document.getElementById("bieu-do-thang").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: cacThang,
            datasets: [
                { label: "Thu", data: dsThu, backgroundColor: "#22C55E" },
                { label: "Chi", data: dsChi, backgroundColor: "#F0147C" }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: "top" } }
        }
    });
}

//bieu do tron theo danh muc
function veBieuDoDanhMuc() {
    // Chỉ tính các khoản Chi
    const duLieuDanhMuc = {};

    for (let i = 0; i < danhSachGiaoDich.length; i++) {
        const gd = danhSachGiaoDich[i];
        if (gd.loai !== "Chi") continue;

        if (!duLieuDanhMuc[gd.danhMuc]) {
            duLieuDanhMuc[gd.danhMuc] = 0;
        }
        duLieuDanhMuc[gd.danhMuc] += Number(gd.soTien);
    }

    const cacDanhMuc = Object.keys(duLieuDanhMuc);
    const cacGiaTri  = cacDanhMuc.map(dm => duLieuDanhMuc[dm]);
    const mauSac     = ["#F472B6", "#A78BFA", "#FB923C", "#34D399", "#94A3B8"];

    const ctx = document.getElementById("bieu-do-danh-muc").getContext("2d");
    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: cacDanhMuc,
            datasets: [{
                data:            cacGiaTri,
                backgroundColor: mauSac.slice(0, cacDanhMuc.length)
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: "right" } }
        }
    });
}

taiDuLieu();
hienThiCards();
hienThiGiaoDichGanDay();
veBieuDoThang();
veBieuDoDanhMuc();