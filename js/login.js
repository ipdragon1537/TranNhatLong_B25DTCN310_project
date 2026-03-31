// toggle khi bấm vào icon mắt hiện mật khẩu
let password = document.getElementById("password");
let eye = document.querySelector("#password ~ i");
eye.addEventListener("click", () => {
  if (password.type === "password") {
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
  users: [
    {
      id: 1,
      fullName: "Admin Chính",
      email: "LQTuan@rikkei.edu.vn",
      password: "Admin123456",
      role: "admin",
      createdAt: "2026-03-03T12:26:21.617Z",
      isActive: true,
    },
    {
      id: 2,
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      password: "Matkhau123",
      role: "user",
      createdAt: "2026-03-01T12:26:21.617Z",
      isActive: true,
    },
    {
      id: 3,
      fullName: "Trần Thị B",
      email: "tranthib@example.com",
      password: "12345678",
      role: "user",
      createdAt: "2026-03-03T12:26:21.617Z",
      isActive: false,
    },
  ],
};
const loginForm = document.getElementById("login-form");

const showToast = (message, type = "success") => {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");

  const title =
    type === "success" ? "Đăng nhập thành công" : "Đăng nhập thất bại";
  const icon = type === "success" ? "fa-circle-check" : "fa-circle-xmark";

  toast.className = `toast ${type}`;
  toast.innerHTML = `
        <i class="fa-solid ${icon} main-icon" style="font-size: 20px; margin-top: 2px;"></i>
        <div class="toast-content">
            <span class="toast-title">${title}</span>
            <span class="toast-msg">${message}</span>
        </div>
        <i class="fa-solid fa-xmark toast-close"></i>
    `;

  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => toast.remove());

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "fadeOut 0.5s ease forwards";
    setTimeout(() => toast.remove(), 500);
  }, 4000);
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailValue = document.getElementById("email").value.trim();
  const passwordValue = document.getElementById("password").value.trim();

  if (emailValue === "") {
    showToast("Email không được để trống!", "error");
    return;
  }
  if (passwordValue === "") {
    showToast("Mật khẩu không được để trống!", "error");
    return;
  }

  let user = data.users.find(
    (u) => u.email === emailValue && u.password === passwordValue,
  );

  if (!user) {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (
      localUser &&
      localUser.email === emailValue &&
      localUser.password === passwordValue
    ) {
      user = { ...localUser, role: "user", isActive: true };
    }
  }

  if (user) {
    if (!user.isActive) {
      showToast("Tài khoản của bạn hiện đang bị khóa!", "error");
      return;
    }

    showToast("Chào mừng bạn đến với trang web của Rikkei.", "success");

    setTimeout(() => {
      if (user.role === "admin") {
        window.location.href = "admin.html";
      }
    }, 1500);
  } else {
    showToast("Tài khoản hoặc mật khẩu không chính xác.", "error");
  }
});
