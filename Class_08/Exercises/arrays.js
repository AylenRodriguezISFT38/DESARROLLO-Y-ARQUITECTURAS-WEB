// Dado el siguiente array: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
// "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"] mostrar por
// consola los meses 5 y 11 (utilizar console.log).
meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
console.log("Mes 5: ", meses[4]); 
console.log("Mes 11: ", meses[10]);

// Ordenar el array de meses alfabéticamente y mostrarlo por consola (utilizar sort).
mesesCop = [...meses].sort();
console.log("Meses ordenados alfabeticamente: ", mesesCop);

// Agregar un elemento al principio y al final del array (utilizar unshift y push).
meses.unshift("Principio de calendario");
meses.push("Final de calendario");
console.log("Meses despues de agregar elementos: ", meses); 

// Quitar un elemento del principio y del final del array (utilizar shift y pop).
meses.shift();
meses.pop();
console.log("Meses despues de quitar primer y ultimo elemento: ", meses);

// Invertir el orden del array (utilizar reverse).
invertido = [...meses].reverse();
console.log("Meses invertidos: ", invertido);

// Unir todos los elementos del array en un único string donde cada mes esteseparado por un guión - (utilizar join).
var mesesUnidos = meses.join(" - ");
console.log("Meses unidos por guion: ", mesesUnidos);

// Crear una copia del array de meses que contenga desde Mayo hasta Noviembre (utilizar slice).
var mesesCopia = [...meses].slice(4, 11);
console.log("Copia de meses desde Mayo hasta Noviembre: ", mesesCopia);
