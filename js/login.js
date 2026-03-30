// toggle khi bấm vào icon mắt hiện mật khẩu
let password = document.getElementById('password')
let eye = document.querySelector("#password ~ i");
eye.addEventListener("click",() => {
    if(password.type === "password"){
        password.type = "text";
        eye.classList.add("fa-eye-slash");
        eye.classList.remove("fa-eye");
    } else {
        password.type = "password";
        eye.classList.add("fa-eye");
        eye.classList.remove("fa-eye-slash");
    }
});
const data = {
  "users" : [
    {
      "id": 1,
      "fullName": "Admin Chính",
      "email": "LQTuan@rikkei.edu.vn",
      "password": "Admin123456",
      "role": "admin",
      "createdAt": "2026-03-03T12:26:21.617Z",
      "isActive": true
    },
    {
      "id": 2,
      "fullName": "Nguyễn Văn A",
      "email": "nguyenvana@example.com",
      "password": "Matkhau123",
      "role": "user",
      "createdAt": "2026-03-01T12:26:21.617Z",
      "isActive": true
    },
    {
      "id": 3,
      "fullName": "Trần Thị B",
      "email": "tranthib@example.com",
      "password": "12345678",
      "role": "user",
      "createdAt": "2026-03-03T12:26:21.617Z",
      "isActive": false
    }
  ]
};

let showToast = (message, type = "error") => {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const iconClass = type === 'success' ? `fa-check-circle` : `fa-exclamation-circle`;
    toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
//Xử lý đăng nhập
const loginForm = document.getElementById("login-form");
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailValue = document.getElementById('email').value.trim();
    const passwordValue = document.getElementById('password').value.trim();
    if(emailValue === ""){
        showToast("Email không được trống!","error");
        return;
    }
    if(passwordValue === ""){
        showToast("Mật khẩu không được trống!","error");
        return
    }
    //Kiểm tra tài khoản trong data
    const user = data.users.find(u => u.email === emailValue && u.password === passwordValue);
    if (user) {
        if(!user.isActive) {
            showToast("Tài khoản bị phá!","error");
            return;
        }
        showToast("Đăng nhập thành công!","success");
        setTimeout(() => {
            if(user.role === "admin"){
                window.location.href = "index.html"
            }
        },1500)
    } else {
        showToast("Email hoặc mật khẩu không đúng ","error");
    }
})

