// SCRIPT DE VALIDACIÓN

    $(document).ready(function() {
      $("#loginForm").on("submit", function(e) {
        e.preventDefault();

        const username = $("#username").val().trim();
        const password = $("#password").val().trim();

        if (!username || !password) {
          alert("Por favor, completa usuario y contraseña");
          return;
        }

        // Llamada a la API de login
        fetch("https://politesting.sangabrielsj.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            data: {
              username: username,
              password: password
            }
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.token) {
            // ✅ Login correcto
            localStorage.setItem("token", data.token);
            // redirigir a la siguiente página
            window.location.href = "medicos.html";
          } else {
            // ❌ Credenciales incorrectas
            alert("Usuario o contraseña incorrectos");
          }
        })
        .catch(error => {
          console.error("Error en la solicitud:", error);
          alert("Error al conectar con el servidor");
        });
      });
    });
