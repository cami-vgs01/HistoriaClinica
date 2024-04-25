document.addEventListener('DOMContentLoaded', function() {
    const paisSelect = document.getElementById('pais');
    const ciudadSelect = document.getElementById('ciudad');

    const ciudadesPorPais = {
        'EC': ['Quito', 'Guayaquil', 'Cuenca'],
        'CO': ['Bogotá', 'Medellín', 'Cali'],
        'AR': ['Buenos Aires', 'Córdoba', 'Rosario'],
        'BR': ['São Paulo', 'Río de Janeiro', 'Brasilia'],
        'EU': ['Nueva York', 'Los Ángeles', 'Chicago'],
        'UR': ['Montevideo', 'Canelones', 'Salto']
    };

    paisSelect.addEventListener('change', function() {
        const selectedPais = paisSelect.value;
        cargarCiudades(selectedPais);
    });

    function cargarCiudades(selectedPais) {
        ciudadSelect.innerHTML = ''; // Limpiar las opciones actuales
        const ciudades = ciudadesPorPais[selectedPais] || []; // Obtener las ciudades para el país seleccionado
        ciudades.forEach(function(ciudad) {
            const option = document.createElement('option');
            option.textContent = ciudad;
            option.value = ciudad;
            ciudadSelect.appendChild(option);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultar-btn');
    const tbodyConsultas = document.getElementById('tbody-consultas');
    const tbodyHijos = document.getElementById('tbody-hijos');
    const uploadPhotoInput = document.getElementById('uploadPhotoInput');
    const btnFoto = document.getElementById('btn_foto');
    const photoPreview = document.getElementById('photo-preview');


    function calcularEdad(fechaNacimiento) {
        const ahora = new Date();
        let edad = ahora.getFullYear() - fechaNacimiento.getFullYear();
        let meses = ahora.getMonth() - fechaNacimiento.getMonth();
        let dias = ahora.getDate() - fechaNacimiento.getDate();
        let horas = ahora.getHours() - fechaNacimiento.getHours();

        if (meses < 0 || (meses === 0 && dias < 0)) {
            edad--;
            meses += 12;
        }

        if (dias < 0) {
            // Ajuste de días basado en el último mes completo
            const lastFullMonth = new Date(ahora.getFullYear(), ahora.getMonth(), 0);
            dias += lastFullMonth.getDate();
        }

        if (horas < 0) {
            horas += 24;
            dias--;
        }

        // Límite máximo de edad razonable
        const maxEdad = 110; // Por ejemplo, 110 años

        if (edad > maxEdad) {
            return null; // Si la edad supera el límite, devolvemos null
        }

        return { anios: edad, meses: meses, dias: dias, horas: horas };
    }

    form.addEventListener('click', function() {
        const fechaNacimiento = new Date(document.getElementById('fecha-nacimiento').value);
        const edad = calcularEdad(fechaNacimiento);
        if (!uploadPhotoInput.files || !uploadPhotoInput.files[0]) {
            alert('Por favor, ingrese todos los campos');
            return;
        }else{
            if (validateForm()) {
                if (edad) {
                    if (isNaN(fechaNacimiento.getTime())) {
                        alert('Por favor ingrese una fecha válida.');
                        return;
                    }
                    const resultadoEdad = document.getElementById('resultado-edad');
                    resultadoEdad.textContent = `Edad: ${edad.anios} años, ${edad.meses} meses, ${edad.dias} días, ${edad.horas} horas.`;
                    cargarConsultas();
                    cargarHijos();
                    alert('Formulario llenado correctamente')
                } else {
                    alert('La edad supera el límite máximo permitido.');
                }
            } else {
                alert('Por favor, llena correctamente el formulario')
                return;
            }
        }
    });

    btnFoto.addEventListener('click', function() {
        uploadPhotoInput.click();
    });
    
    uploadPhotoInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '200px'; // Establece el ancho de la imagen
                img.style.height = 'auto'; // Mantiene la proporción de aspecto
                photoPreview.innerHTML = '';
                photoPreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });

    function cargarConsultas() {
        // Limpiar las filas existentes de la tabla de consultas
        tbodyConsultas.innerHTML = '';

        // Crear filas de consulta de ejemplo (puedes reemplazar estas con tus datos reales)
        const consultas = [
            { fecha: '12/12/2020', hora: '13:24' },
            { fecha: '01/03/2021', hora: '15:00' }
            // Agregar más consultas según sea necesario
        ];

        // Agregar cada consulta como una fila en la tabla de consultas
        consultas.forEach(function(consulta) {
            const tr = document.createElement('tr');
            const fechaTd = document.createElement('td');
            fechaTd.textContent = consulta.fecha;
            const horaTd = document.createElement('td');
            horaTd.textContent = consulta.hora;
            tr.appendChild(fechaTd);
            tr.appendChild(horaTd);
            tbodyConsultas.appendChild(tr);
        });
    }

    function cargarHijos() {
        // Limpiar las filas existentes de la tabla de hijos
        tbodyHijos.innerHTML = '';

        // Crear filas de consulta de ejemplo (puedes reemplazar estas con tus datos reales)
        const hijos = [
            { Nombre: 'Camila Granda', Sexo: 'Femenino' },
            { Nombre: 'Juan José Granda', Sexo: 'Masculino' }
            // Agregar más consultas según sea necesario
        ];

        // Agregar cada consulta como una fila en la tabla de consultas
        hijos.forEach(function(hijo) {
            const tr = document.createElement('tr');
            const nombreP = document.createElement('td');
            nombreP.textContent = hijo.Nombre;
            const sexoP = document.createElement('td');
            sexoP.textContent = hijo.Sexo;
            tr.appendChild(nombreP);
            tr.appendChild(sexoP);
            tbodyHijos.appendChild(tr);
        });
    }

    function validateForm() {
        return validateNombre() && validateDireccion() && validateTelefono() && isValidCI() && validarPais();
    }

    function validateNombre() {
        const nombre = document.getElementById('nombre').value;
        const regex = /^[a-zA-Z\s]+$/; // Solo letras y espacios
        return regex.test(nombre);
    }

    function validateDireccion() {
        // Asume que cualquier entrada es válida
        return true;
    }

    function validateTelefono() {
        const telefono = document.getElementById('teléfono').value;
        const regex = /^\d{10}$/; // Exactamente 10 dígitos
        return regex.test(telefono);
    }


    function isValidCI() {
        const ci = document.getElementById('cedula').value;
        var isNumeric = true;
        var total = 0, 
            individual;	
    
        for (var position = 0 ; position < 10 ; position++) {
            // Obtiene cada posición del número de cédula
            // Se convierte a string en caso de que 'ci' sea un valor numérico
            individual = ci.toString().substring(position, position + 1)
    
            if(isNaN(individual)) {
                console.log(ci, position,individual, isNaN(individual))
                isNumeric=false;				
                break;			
            } else {
                // Si la posición es menor a 9
                if(position < 9) {
                    // Si la posición es par, osea 0, 2, 4, 6, 8.
                    if(position % 2 == 0) {
                        // Si el número individual de la cédula es mayor a 5
                        if(parseInt(individual)*2 > 9) {
                            // Se duplica el valor, se obtiene la parte decimal y se aumenta uno 
                            // y se lo suma al total
                            total += 1 + ((parseInt(individual)*2)%10);
                        } else {
                            // Si el número individual de la cédula es menor que 5 solo se lo duplica
                            // y se lo suma al total
                            total += parseInt(individual)*2;
                        }
                    // Si la posición es impar (1, 3, 5, 7)
                    }else {
                        // Se suma el número individual de la cédula al total
                        total += parseInt(individual);		    		
                    }
                } 
            }
        }
    
        if((total % 10) != 0) {
            total =  (total - (total%10) + 10) - total;		
        } else {
            total = 0 ; 	
        }
    
    
        if(isNumeric) {	
            // El total debe ser igual al último número de la cédula
            console.log(ci, total, individual);
            console.log(ci, typeof ci, ci.length)
            // La cédula debe contener al menos 10 dígitos
            if(ci.toString().length != 10) { 
                alert("La c\u00E9dula debe ser de: 10 d\u00EDgitos.");
                return false; 
            }
    
            // El número de cédula no debe ser cero
            if (parseInt(ci, 10) == 0) { 
                alert("La c\u00E9dula ingresada no puede ser cero.");
                return false;
            }
    
            // El total debe ser igual al último número de la cédula
            if(total != parseInt(individual)) { 
                alert("La c\u00E9dula ingresada no es v\u00E1lida.");
                return false;
            } 
    
            console.log('cédula válida', ci);
            return true;			
        }
    }

    function validarPais () {
        const pais = document.getElementById('pais').value;
        console.log(pais);
        if (pais === '') {
            return false;
        }
        return true;
    }
});