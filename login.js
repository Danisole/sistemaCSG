document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // 🧩 Validación de campos
  if (!username || !password) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor, completá todos los campos."
    });
    return;
  }

  // 🧪 Login de prueba local
  if (username === "admin" && password === "123") {
    localStorage.setItem("token", "token_de_prueba_123");
    Swal.fire({
      icon: "success",
      title: "Inicio de sesión exitoso",
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      window.location.href = "index.html";
    });
    return;
  }

  try {
    Swal.fire({
      title: "Verificando...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    const response = await fetch("https://politesting.sangabrielsj.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    Swal.close();

    if (response.ok) {
      const data = await response.json();

      // Guarda token
      localStorage.setItem("token", data.token);

      Swal.fire({
        icon: "success",
        title: "Acceso concedido",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.href = "index.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Credenciales incorrectas",
        text: "Usuario o contraseña inválidos."
      });
    }
  } catch (error) {
    Swal.close();
    Swal.fire({
      icon: "error",
      title: "Error de conexión",
      text: "No se pudo conectar con el servidor. (CORS o red)."
    });
  }
});
