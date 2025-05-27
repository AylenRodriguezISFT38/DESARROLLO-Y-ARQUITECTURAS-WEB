// Crear una función suma que reciba dos valores numéricos y retorne el resultado.
// Ejecutar la función y guardar el resultado en una variable, mostrando el valor de
// dicha variable en la consola del navegador.
function suma(a, b) {
    return a + b;
}
var result = suma(5, 3);
console.log(`ea suma de 5 y 3 es: ${result}`);

// A la función suma anterior, agregarle una validación para controlar si alguno de
// los parámetros no es un número, mostrar una alerta aclarando que uno de los
// parámetros tiene error y retornar el valor NaN como resultado.
function suma2(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        alert("error: uno de los parametros no es un numero.");
        return NaN;
    }
    return a + b;
}
var result = suma2(5, "3");
console.log(`La suma de 5 y "3" con validacion es: ${result}`);

// Crear una función validate integer que reciba un número como parámetro y
// devuelva verdadero si es un número entero.
function validateInteger(num) {
    return Number.isInteger(num);
}
console.log("El dato ingresado es un numero? " + validateInteger(5)); 

// A la función suma del ejercicio 6b) agregarle una llamada que valide que los
// números sean enteros. En caso que haya decimales mostrar un alerta con el
// error y retorna el número convertido a entero (redondeado).
function suma3(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        alert("error: uno de los parametros no es un numero.");
        return NaN;
    }
    if (!validateInteger(a) || !validateInteger(b)) {
        alert("error: uno de los numeros no es entero. Se redondeara.");
        a = Math.round(a);
        b = Math.round(b);
    }
    return a + b;
}

// Convertir la validación del ejercicio 6d) en una función separada y llamarla
// dentro de la función suma probando que todo siga funcionando igual.
function validateAndRound(a, b) {
    if (!validateInteger(a) || !validateInteger(b)) {
        alert("error: uno de los numeros no es entero. Se redondeara.");
        a = Math.round(a);
        b = Math.round(b);
    }
    return [a, b];
}

function suma4(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        alert("error: uno de los parametros no es un numero.");
        return NaN;
    }
    [a, b] = validateAndRound(a, b);
    return a + b;
}
