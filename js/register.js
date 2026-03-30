const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

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

    showToast("Đăng ký thành công!", "success");
    setTimeout(() => {
        window.location.href = "/pages/login.html";
    }, 1500);
});
