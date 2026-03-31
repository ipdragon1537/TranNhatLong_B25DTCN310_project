const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (fullName === "") {
        showToast("Họ và tên không được để trống!", "error");
        return;
    }

    if (email === "") {
        showToast("Email không được để trống!", "error");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast("Email không đúng định dạng!", "error");
        return;
    }

    if (password === "") {
        showToast("Mật khẩu không được để trống!", "error");
        return;
    }
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
        showToast("Mật khẩu tối thiểu 8 ký tự và có ít nhất 1 ký tự đặc biệt!", "error");
        return;
    }

    if (confirmPassword === "") {
        showToast("Mật khẩu xác nhận không được để trống!", "error");
        return;
    }

    if (password !== confirmPassword) {
        showToast("Mật khẩu không trùng khớp!", "error");
        return;
    }
    localStorage.setItem("user",JSON.stringify({
        fullName:fullName,
        email:email,
        password:password
    }));
    showToast("Đăng ký thành công!", "success");
    setTimeout(() => {
        window.location.href = "/pages/login.html";
    }, 1500);
});
function showToast(message, type) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 14px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
        background: ${type === "success" ? "#16a34a" : "#ef4444"};
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: fadeIn .3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2000);
}