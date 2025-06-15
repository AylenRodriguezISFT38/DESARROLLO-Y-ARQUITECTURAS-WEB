var inputs = Array.from(document.getElementsByTagName('input'));
var validacionesConMensajes = {
  nombreCompleto: { validacion: /^[a-zA-Z]+( [a-zA-Z]+)+$/, mensaje: 'El nombre completo debe tener más de 6 caracteres y al menos un espacio' },
  email: { validacion: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, mensaje: 'El email no es válido' },
  contrasenia: { validacion: /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/, mensaje: 'La contraseña debe tener al menos 8 caracteres, una letra y un número' },
  edad: { validacion: /^(1[8-9]|[2-9][0-9]|\d{3,})$/, mensaje: 'La edad mínima es de 18 años' },
  telefono: { validacion: /^[0-9]{7,15}$/, mensaje: 'El teléfono debe tener al menos 7 dígitos' },
  direccion: { validacion: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\s).{5,}$/, mensaje: 'La direccion debe tener letras, números y al menos un espacio' },
  ciudad: { validacion: /^[a-zA-Z0-9\s]{3,}$/, mensaje: 'La ciudad debe tener al menos 3 caracteres' },
  codigoPostal: { validacion: /^[0-9]{7,8}$/, mensaje: 'El codigo postal debe tener entre 7 y 8 dígitos' },
  dni: { validacion: /^[0-9]{7,8}$/, mensaje: 'El DNI debe tener entre 7 y 8 dígitos' }
};
var isOk = false;
var listErrores = [];

inputs.filter(x => x.type !== 'submit').forEach(input => {
  input.addEventListener('blur', () => {
    validarCampo(input);
    if (validacionesConMensajes[input.id]) {
      var { validacion, mensaje } = validacionesConMensajes[input.id];
      if (!validacion.test(input.value)) {
        input.classList.add('invalid');
        mostrarError(input, mensaje);
        isOk = false;
        listErrores.push(mensaje);
      } else {
        input.classList.remove('invalid');
        isOk = true;
      }
    }
  });

  input.addEventListener('focus', () => {
    eliminarError(input);
    input.classList.remove('invalid');
  });
});

inputs.find(x => x.id === 'nombreCompleto').addEventListener('keydown', (e) => {
  var saludo = document.querySelector('.saludar');
  saludo.innerHTML = `Hola ${e.target.value}`;
});

inputs.find(x => x.type === 'submit').addEventListener('click', (e) => {
  e.preventDefault();

  var popup = document.createElement('div');
  popup.classList.add('popup');

  if (isOk) {
    var datos = {
      nombreCompleto: inputs[0].value,
      email: inputs[1].value,
      contrasenia: inputs[2].value,
      edad: inputs[3].value,
      telefono: inputs[4].value,
      direccion: inputs[5].value,
      ciudad: inputs[6].value,
      codigoPostal: inputs[7].value,
      dni: inputs[8].value
    };

    document.body.appendChild(popup);

    enviarFetch(datos).then(data => {
      if (data) {
        localStorage.setItem('usuarioNewsletter', JSON.stringify(data));
        mostrarPopupExito(data, popup);
      }
    }).catch(error => {
      mostrarPopupError(`Error al enviar datos: ${error.message}`, popup);
    });

  } else {
    mostrarPopupError(
      `<p>Todos los campos son obligatorios:</p><ul>${listErrores.map(e => `<li>${e}</li>`).join('')}</ul>`,
      popup
    );
  }
});

function validarCampo(input) {
  if (input.value.trim() === '') {
    input.setCustomValidity('Este campo es obligatorio');
    input.classList.add('invalid');
  } else {
    input.setCustomValidity('');
    input.classList.remove('invalid');
  }
}

function mostrarError(input, mensaje) {
  var error = mensajeDeError(input);
  error.textContent = mensaje;
  error.style.display = 'block';
}

function mensajeDeError(input) {
  let error = input.nextElementSibling;
  if (!error || !error.classList.contains('error-message')) {
    error = document.createElement('span');
    error.classList.add('error-message');
    input.parentNode.insertBefore(error, input.nextSibling);
  }
  return error;
}

function eliminarError(input) {
  var error = mensajeDeError(input);
  error.textContent = '';
  error.style.display = 'none';
}

function mostrarPopupExito(data, popupElement = null) {
  var popup = popupElement || document.createElement('div');
  popup.classList.add('popup');

  popup.innerHTML = `
    <h5>¡Gracias por suscribirte! 😁👍</h5>
    <p>Informacion de usuario:</p>
    <ul>
      <li>Nombre completo: ${data.nombreCompleto}</li>
      <li>Email: ${data.email}</li>
      <li>Contraseña: ${data.contrasenia}</li>
      <li>Edad: ${data.edad}</li>
      <li>Teléfono: ${data.telefono}</li>
      <li>Direccion: ${data.direccion}</li>
      <li>Ciudad: ${data.ciudad}</li>
      <li>Codigo Postal: ${data.codigoPostal}</li>
      <li>DNI: ${data.dni}</li>
    </ul>
    <button class="close-popup">Aceptar</button>
  `;

  if (!popupElement) document.body.appendChild(popup);

  popup.querySelector('.close-popup').addEventListener('click', () => {
    popup.remove();
    inputs.filter(x => x.type !== 'submit').forEach(input => input.value = '');
    isOk = false;
    listErrores = [];
  });
}

function mostrarPopupError(message, popup) {
  popup.classList.add('popup-error');
  popup.innerHTML = `
    <h5>¡Error! 😞</h5>
    ${message}
    <button class="close-popup">Cerrar</button>
  `;
  document.body.appendChild(popup);
  popup.querySelector('.close-popup').addEventListener('click', () => {
    popup.remove();
  });
}

function enviarFetch(datos) {
  return fetch('https://jsonplaceholder.typicode.com/posts/', {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('El servidor respondio con un error');
      }
      return response.json();
    });
}

document.addEventListener('DOMContentLoaded', () => {
  var datosGuardados = localStorage.getItem('usuarioNewsletter');
  if (datosGuardados) {
    var data = JSON.parse(datosGuardados);
    mostrarPopupExito(data);
  }
});