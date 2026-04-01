const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const agree = document.getElementById("agree").checked;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let errors = [];
    if (fullName === "") {
        errors.push("Họ và tên không được để trống!");
    }
    if (email === "") {
        errors.push("Email không được để trống!");
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push("Email không đúng định dạng!");
        }
    }
    if (password === "") {
        errors.push("Mật khẩu không được để trống!");
    } else {
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordRegex.test(password)) {
            errors.push("Mật khẩu tối thiểu 8 ký tự và có ít nhất 1 ký tự đặc biệt!");
        }
    }
    if (confirmPassword === "") {
        errors.push("Mật khẩu xác nhận không được để trống!");
    } else if (password !== confirmPassword) {
        errors.push("Mật khẩu không trùng khớp!");
    }
    if (!agree) {
        errors.push("Vui lòng đồng ý với điều khoản sử dụng!");
    }
    if (errors.length > 0) {
        showToast(errors[0], "error");
        return;
    }
    if (users.some((u) => u.email === email)) {
        showToast("Email đã được sử dụng!", "error");
        return;
    }
    users.push({
        fullName: fullName,
        email: email,
        password: password,
        role: "user",
        createdAt: new Date().toISOString(),
        isActive: true,
    });
    
    localStorage.setItem("users", JSON.stringify(users));

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
