
        // Mostrar una pantalla y ocultar las demás
        function mostrarPantalla(id) {
            document.querySelectorAll(".container").forEach(div => div.classList.add("hidden"));
            document.getElementById(id).classList.remove("hidden");
        }

        // SIMULACIÓN de base de datos
        const pacientesFake = [
            { nombre: "Juan Pérez", dni: "23456789", tel: "2645123456", email: "juan@gmail.com" },
            { nombre: "Juana Peralta", dni: "23456999", tel: "2644332211", email: "juana@gmail.com" }
        ];

        function buscarPaciente() {
            const term = document.getElementById("inputBusqueda").value.trim().toLowerCase();

            if (term === "") {
                Swal.fire("Atención", "Ingrese DNI o apellido.", "warning");
                return;
            }

            // Filtrar pacientes ficticios
            const results = pacientesFake.filter(p =>
                p.nombre.toLowerCase().includes(term) || p.dni.includes(term)
            );

            const cont = document.getElementById("listaResultados");
            cont.innerHTML = "";

            if (results.length === 0) {
                cont.innerHTML = `<p>No se encontraron resultados.</p>`;
            } else {
                results.forEach(p => {
                    cont.innerHTML += `
                        <div class="border rounded p-3 mb-3">
                            <b>${p.nombre}</b><br>
                            DNI: ${p.dni}<br>
                            Tel: ${p.tel}<br>
                            Email: ${p.email}<br>
                            <button class="btn btn-primary btn-sm mt-2 w-100" onclick="seleccionarPaciente('${p.nombre}','${p.dni}','${p.tel}','${p.email}')">
                                Seleccionar
                            </button>
                        </div>
                    `;
                });
            }

            mostrarPantalla("resultados");
        }

        function seleccionarPaciente(nombre, dni, tel, email) {
            document.getElementById("datosConfirmacion").innerHTML = `
                <b>${nombre}</b><br>
                DNI: ${dni}<br>
                Tel: ${tel}<br>
                Email: ${email}<br>
            `;

            mostrarPantalla("confirmacion");
        }

        function guardarPaciente() {
            const nombre = document.getElementById("nombre").value;
            const apellido1 = document.getElementById("apellido1").value;
            const dni = document.getElementById("dni").value;
            const telefono = document.getElementById("telefono").value;

            if (!nombre || !apellido1 || !dni || !telefono) {
                Swal.fire("Error", "Completá todos los campos obligatorios.", "error");
                return;
            }

            Swal.fire({
                icon: "success",
                title: "Paciente guardado",
                timer: 1500,
                showConfirmButton: false
            });

            document.getElementById("datosConfirmacion").innerHTML = `
                <b>${nombre} ${apellido1}</b><br>
                DNI: ${dni}<br>
                Tel: ${telefono}<br>
            `;

            mostrarPantalla("confirmacion");
        }
   