//khai báo các biến//
const tenDangNhap = document.getElementById("tenDangNhap");
const matKhau = document.getElementById("mk");


//lấy dữ liệu người dùng nhập//
buttonDangNhap.addEventListener("click", function(event){
    event.preventDefault();
    
    let ten = tenDangNhap.value ;
    let mk = matKhau.value;
    
    let duLieu = localStorage.getItem("taiKhoan")
   
    //ktra xem có tk hay chưa//
    if(duLieu === null){
        
        alert("Chưa có tài khoản mất rùi, đăng ký nhé!");
        return;
    };
    let taiKhoan = JSON.parse(duLieu); //chuyển duLieu thành object//
    
    //So sánh dữ liệu đn với dữ liệu đki//
    if(
        ten === taiKhoan.tenDangNhap && mk === taiKhoan.matKhau
    ){
        
        alert("Đăng nhập thành công");
        window.location.href = "trang_chu.html"; //Đn thành công chuyển sang trang chủ//
    }
    else{
        
        alert("ohoh! Sai tài khoản hoặc mật khẩu mất rồi!")
    };
   
});
if (ten === taiKhoan.tenDangNhap && mk === taiKhoan.matKhau) {
    // Lưu trạng thái đăng nhập
    localStorage.setItem("dangNhap", "true"); // ← thêm dòng này
    alert("Đăng nhập thành công");
    window.location.href = "trang_chu.html";
}