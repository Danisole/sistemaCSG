
    const form = document.getElementById('prestadorForm');
    const mensaje = document.getElementById('mensaje');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      mensaje.textContent = '';
      mensaje.className = 'mensaje';

      // Validaciones simples
      if (!form.checkValidity()) {
        mensaje.textContent = 'Por favor, completá todos los campos obligatorios.';
        mensaje.classList.add('error');
        return;
      }

      // Recolectar datos
      const data = {
        documento: document.getElementById('documento').value.trim(),
        matricula: document.getElementById('matricula').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        fecha_nac: document.getElementById('fecha_nac').value,
        sexo: document.getElementById('sexo').value,
        telefono: document.getElementById('telefono').value.trim(),
        email: document.getElementById('email').value.trim(),
        especialidad: document.getElementById('especialidad').value,
        plantilla_hc: document.getElementById('plantilla_hc').value,
        plantilla_foja: document.getElementById('plantilla_foja').value,
        usuario: document.getElementById('usuario').value
      };

      const formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      const firmaFile = document.getElementById('firma').files[0];
      if (firmaFile) formData.append('firma', firmaFile);

      const token = localStorage.getItem('token'); // ← se lee desde el login

      try {
        const response = await fetch('https://politesting.sangabrielsj.com/medicos/new', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (response.ok) {
          mensaje.textContent = '✅ Prestador guardado correctamente.';
          mensaje.classList.add('ok');
          form.reset();
        } else {
          const errorText = await response.text();
          mensaje.textContent = '❌ Error al guardar: ' + errorText;
          mensaje.classList.add('error');
        }
      } catch (err) {
        mensaje.textContent = '⚠️ Error de conexión con el servidor.';
        mensaje.classList.add('error');
      }
    });
