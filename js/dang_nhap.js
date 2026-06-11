//khai báo các biến//
const tenDangNhap = document.getElementById("tenDangNhap");
const matKhau = document.getElementById("mk");
console.log("B1")
const buttonDangNhap = document.getElementById("buttonDangNhap");
console.log(buttonDangNhap);

//lấy dữ liệu người dùng nhập//
buttonDangNhap.addEventListener("click", function(){
    console.log("B2")
    let ten = tenDangNhap.value ;
    let mk = matKhau.value;
    console.log("B3")
    let duLieu = localStorage.getItem("taiKhoan")
    console.log("B4")
    
    console.log("B5");
    //ktra xem có tk hay chưa//
    if(duLieu === null){
        console.log("B6");
        alert("Chưa có tài khoản mất rùi, đăng ký nhé!");
        return;
    };
    let taiKhoan = JSON.parse(duLieu); //chuyển duLieu thành object//
    
    //So sánh dữ liệu đn với dữ liệu đki//
    if(
        ten === taiKhoan.tenDangNhap && mk === taiKhoan.mk
    ){
        console.log("B7");
        alert("Đăng nhập thành công");
        console.log("B8");
        window.location.href = "trang_chu.html"; //Đn thành công chuyển sang trang chủ//
    }
    else{
        console.log("B9");
        alert("ohoh! Sai tài khoản hoặc mật khẩu mất rồi!")
    };

    
});