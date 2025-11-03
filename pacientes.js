 // 🔐 Validar sesión activa
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }

  // 🚪 Cerrar sesión
  document.getElementById("logoutBtn").addEventListener("click", () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Se cerrará tu sesión actual.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire({
          icon: "success",
          title: "Sesión cerrada",
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          window.location.href = "login.html";
        });
      }
    });
  });