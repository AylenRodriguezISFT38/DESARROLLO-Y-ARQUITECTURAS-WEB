var inputs = Array.from(document.getElementsByTagName('input'));
var validacionesConMensajes = {
  nombreCompleto: {validacion: /^[a-zA-Z]+( [a-zA-Z]+)+$/, mensaje: 'El nombre completo debe tener mas de 6 caracteres y al menos un espacio'},
  email: {validacion: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, mensaje: 'El email no es valido'},
  contrasenia: {validacion: /^[a-zA-Z0-9]{8,}$/, mensaje: 'La contraseña debe tener al menos 8 caracteres, una letra y un número'},
  edad: {validacion: /^(1[8-9]|[2-9][0-9]|\d{3,})$/, mensaje: 'La edad minima es de 18 años'},
  telefono: {validacion: /^[0-9]{7,15}$/, mensaje: 'El teléfono debe tener al menos 7 digitos, no se aceptan puntos, espacios ni caracteres especiales'},
  direccion: {validacion: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\s).{5,}$/, mensaje: 'La dirección debe tener al menos 5 caracteres con letras, numeros y un espacio entre medio'},
  ciudad: {validacion: /^[a-zA-Z0-9\s]{3,}$/, mensaje: 'La ciudad debe tener al menos 3 caracteres'},
  codigoPostal: {validacion: /^[0-9]{7,8}$/, mensaje: 'El código postal debe tener entre 7 y 8 dígitos'},
  dni: {validacion: /^[0-9]{7,8}$/, mensaje: 'El DNI debe tener entre 7 y 8 dígitos'}
}
var isOk = false;
var listErrores = [];

inputs.filter(x=> x.type !== 'submit').forEach(input => {
    input.addEventListener('blur', () =>{
        validarCampo(input);
        if(validacionesConMensajes[input.id]){
            const { validacion, mensaje } = validacionesConMensajes[input.id];
            if (!validacion.test(input.value)) {
                input.classList.add('invalid');
                mostrarError(input,mensaje);
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
    const saludo = document.getElementsByClassName('saludar')[0];
    saludo.innerHTML = `Hola ${e.target.value}`;
});

inputs.find(x => x.type === 'submit').addEventListener('click', (e) => {

    var popup = document.createElement('div');
    popup.classList.add('popup');

    if(isOk) {
      
    popup.classList.add('popup');

    popup.innerHTML = `
    <h5>¡Gracias por suscribirte! 😁👍</h5>
    <p>Informacion de usuario:</p>
    <ul>
        <li>Nombre completo: ${inputs[0].value}</li>
        <li>Email: ${inputs[1].value}</li>
        <li>Contraseña: ${inputs[2].value}</li>
        <li>Edad: ${inputs[3].value}</li>
        <li>Teléfono: ${inputs[4].value}</li>
        <li>Dirección: ${inputs[5].value}</li>
        <li>Ciudad: ${inputs[6].value}</li>
        <li>Código Postal: ${inputs[7].value}</li>
        <li>DNI: ${inputs[8].value}</li>
    </ul>
    <button class="close-popup">Aceptar</button>`;
    }else{

      popup.classList.add('popup-error');

      popup.innerHTML = `
    <h5>¡Error! 😞</h5>
    <p>Todos los campos son obligatorios!</p>
    <ul>
        ${listErrores.map(error => `<li>${error}</li>`).join('')}
    </ul>
    <button class="close-popup">Cerrar</button>`;
    }

    document.body.appendChild(popup);
    document.querySelector('.close-popup').addEventListener('click', () => {
        popup.remove();
        if(isOk) {
          inputs.filter(x=> x.type !== 'submit').forEach(input => {
              input.value = '';
              isOk = false;
          })
        }
    });
    
    e.preventDefault();

});

validarCampo = (obj) => {
  if(obj.value.trim() === '') {
      obj.setCustomValidity('Este campo es obligatorio');
      obj.classList.add('invalid'); 
  }else{
      obj.setCustomValidity(''); 
      obj.classList.remove('invalid'); 
  }
}

mostrarError = (input, mensaje) => {
  const error = mensajeDeError(input);
  if (mensaje) {
    error.textContent = mensaje;
    error.style.display = 'block';
  } else {
    error.textContent = '';
    error.style.display = 'none';
  }
}

mensajeDeError = (input) => {
  var error = input.nextElementSibling;
  if(!error || !error.classList.contains('error-message')) {
      error = document.createElement('span');
      error.classList.add('error-message');
      input.parentNode.insertBefore(error, input.nextSibling);
  }
  return error;
}

eliminarError = (input) => {
  var error = mensajeDeError(input);
  error.textContent = '';
  error.style.display = 'none';
}