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

    const elTongThu = document.getElementById("hien-thi-tong-thu");
    const elTongChi = document.getElementById("hien-thi-tong-chi");
    const elSoDu   = document.getElementById("hien-thi-so-du");
    const elTiLe   = document.getElementById("hien-thi-ti-le");

    if (elTongThu) elTongThu.textContent = Number(tongThu).toLocaleString() + "đ";
    if (elTongChi) elTongChi.textContent = Number(tongChi).toLocaleString() + "đ";
    if (elSoDu)    elSoDu.textContent = Number(soDu).toLocaleString() + "đ";
   
    const tiLeNum = Number(tiLe); // đảm bảo là Number
    if (elTiLe) elTiLe.textContent = tiLeNum.toLocaleString() + "%";
}

//hien thi giao dich gan day
function hienThiGiaoDichGanDay(){
    const khung = document.getElementById("danh-sach-gan-day");
    khung.innerHTML = "";
    if(danhSachGiaoDich.length === 0){
        khung.innerHTML = "<p class='empty'>Chưa có giao dịch nào</p>";
        return;
    }

    const table = document.createElement("table");
    table.className = "giao-dich-table";
    table.innerHTML = `
        <thead>
            <tr>
                <th>Ngày</th>
                <th>Giao dịch</th>
                <th>Danh mục</th>
                <th style="text-align:right">Số tiền</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const tbody = table.querySelector("tbody");

    const gdGanDay = [...danhSachGiaoDich].reverse().slice(0, 8); // lấy 8 giao dịch gần nhất
    for (let i = 0; i < gdGanDay.length; i++) {
        const gd = gdGanDay[i];
        const tr = document.createElement("tr");
        const amountText = Number(gd.soTien).toLocaleString();
        const sign = gd.loai === "Thu" ? "+" : "-";
        const typeClass = gd.loai === "Thu" ? "thu" : "chi";

        tr.innerHTML = `
            <td class="gd-ngay">${gd.ngay}</td>
            <td class="gd-ten">${gd.ten}</td>
            <td class="gd-phu">${gd.danhMuc}</td>
            <td class="gd-so-tien ${typeClass}">${sign}${amountText} đ</td>
        `;
        tbody.appendChild(tr);
    }

    khung.appendChild(table);
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