
const tenDangNhap = document.getElementById("tenDangNhap");
const email = document.getElementById("email");
const matKhau = document.getElementById("matKhau")
const xacNhanMatKhau = document.getElementById("xacNhanMatKhau");

const buttonDangKy = document.getElementById("buttonDangKy");
buttonDangKy.addEventListener("click", function(event){
    event.preventDefault();
    let ten = tenDangNhap.value ;
    let mail = email.value;
    let mk = matKhau.value;
    let xacNhanMK = xacNhanMatKhau.value;
    if(
        ten === "" || 
        mail === "" ||
        mk === "" ||
        xacNhanMK === "" 
    ) {
        alert("Vui lòng nhập đủ thông tin");
        return;
    }
    if(mk !== xacNhanMK){
        alert("Mật khẩu không khớp");
        return;
    }
    let taiKhoan = {
        tenDangNhap: ten,
        email: mail,
        matkhau: mk
    };

    localStorage.setItem(
        "taiKhoan",
        JSON.stringify(taiKhoan)
    );
    alert("Đăng kí thành công");
    window.location.href = "dang_nhap.html";
});
