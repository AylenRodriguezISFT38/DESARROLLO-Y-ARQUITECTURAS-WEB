// Crear una variable de tipo string con al menos 10 caracteres y convertir todo el
// texto en mayúscula (utilizar toUpperCase).
var text = "javascript en uppercase";
var upper = text.toUpperCase();
console.log("El texto en mayusculas es: ", upper);

// Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo
// string con los primeros 5 caracteres guardando el resultado en una nueva
// variable (utilizar substring).
var text2 = "javascript con substring";
var str = text2.substring(0, 5);
console.log("Los primeros 5 caracteres son: ", str);

// Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo
// string con los últimos 3 caracteres guardando el resultado en una nueva variable
// (utilizar substring).
var text3 = "js con slice";
var str2 = text3.slice(-3);
console.log("Los ultimos 3 caracteres son: ", str2);

// Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo
// string con la primera letra en mayúscula y las demás en minúscula. Guardar el
// resultado en una nueva variable (utilizar substring, toUpperCase, toLowerCase y
// el operador +).
var str3 = "manejo de string";
var primLetra = str3.substring(0, 1).toUpperCase(); 
var resto = str3.substring(1).toLowerCase();
var resultado = primLetra + resto;
console.log("El string con la primera letra en maysucula y resto minuscula es: ", resultado);

// Crear una variable de tipo string con al menos 10 caracteres y algún espacio en
// blanco. Encontrar la posición del primer espacio en blanco y guardarla en una
// variable (utilizar indexOf).
var str4 = "javascript con espacios";
var spc = str4.indexOf(" ");
console.log("La posicion del primer espacio en blanco es: ", spc);

// Crear una variable de tipo string con al menos 2 palabras largas (10 caracteres y
// algún espacio entre medio). Utilizar los métodos de los ejercicios anteriores para
// generar un nuevo string que tenga la primera letra de ambas palabras en
// mayúscula y las demás letras en minúscula (utilizar indexOf, substring,
// toUpperCase, toLowerCase y el operador +).
var str5 = "desarrollo arquitectura";
var spc2 = str5.indexOf(" ");
var primLetraUpper = str5.substring(0, 1).toUpperCase();
var segLetraUpper = str5.substring(spc2 + 1,spc2 + 2).toUpperCase();
var primPalabraLower = str5.substring(1, spc2).toLowerCase();
var segPalabraLower = str5.substring(spc2 + 2).toLowerCase();
var resultadoFinal = primLetraUpper + primPalabraLower + " " + segLetraUpper + segPalabraLower;
console.log("El nuevo string final es: ", resultadoFinal);