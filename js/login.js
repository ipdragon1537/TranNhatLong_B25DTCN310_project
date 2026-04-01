const getStorageUsers = () => {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
};

const saveStorageUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};
const getAllUsers = () => {
  const storageUsers = getStorageUsers();
  const defaultEmails = new Set(storageUsers.map(u => u.email));
  const uniqueStorage = storageUsers.filter(u => !defaultEmails.has(u.email));
  return [...storageUsers, ...uniqueStorage];
};
const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById("fullName")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();
    const confirmPassword = document.getElementById("confirmPassword")?.value.trim();
    if (!fullName || !email || !password) {
      showToast("Vui lòng điền đầy đủ thông tin!", "error");
      return;
    }
    
    if (password !== confirmPassword) {
      showToast("Mật khẩu xác nhận không khớp!", "error");
      return;
    }
    
    if (password.length < 6) {
      showToast("Mật khẩu phải có ít nhất 6 ký tự!", "error");
      return;
    }
    
    const allUsers = getAllUsers();
    if (allUsers.some(u => u.email === email)) {
      showToast("Email đã được sử dụng!", "error");
      return;
    }
    const newUser = {
      id: Date.now(),
      fullName,
      email,
      password, 
      role: "user",
      createdAt: new Date().toISOString(),
      isActive: true
    };
    const storageUsers = getStorageUsers(); 
    if (storageUsers.some(u => u.email === email)) {
        showToast("Email này đã tồn tại trong bộ nhớ!", "error");
        return;
    }

    storageUsers.push(newUser);
    saveStorageUsers(storageUsers); 
    
    showToast("Đăng ký thành công!", "success");
    
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  });
}
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailValue = document.getElementById("email").value.trim();
    const passwordValue = document.getElementById("password").value.trim();

    if (!emailValue) {
      showToast("Email không được để trống!", "error");
      return;
    }
    if (!passwordValue) {
      showToast("Mật khẩu không được để trống!", "error");
      return;
    }
    const allUsers = getAllUsers();
    const user = allUsers.find(
      u => u.email === emailValue && u.password === passwordValue
    );

    if (!user) {
      showToast("Tài khoản hoặc mật khẩu không chính xác.", "error");
      return;
    }

    if (!user.isActive) {
      showToast("Tài khoản của bạn hiện đang bị khóa!", "error");
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));

    showToast("Đăng nhập thành công!", "success");

    setTimeout(() => {
      if (user.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "index.html";
      }
    }, 1500);
  });
}
function showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const icon = type === "success" ? "check_circle" : "error";
    const title = type === "success" ? "Thành công" : "Thất bại";
    toast.innerHTML = `
        <i class="material-icons main-icon">${icon}</i>
        <div class="toast-content">
            <span class="toast-title">${title}</span>
            <span class="toast-msg">${message}</span>
        </div>
        <i class="material-icons toast-close" onclick="this.parentElement.remove()">close</i>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = "fadeOut 0.5s ease forwards";
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 4000);
}