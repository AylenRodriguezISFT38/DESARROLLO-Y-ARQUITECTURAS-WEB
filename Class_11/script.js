var btnGet = document.getElementById("getCharacters");

btnGet.addEventListener("click", () => {
    fetch("https://rickandmortyapi.com/api/character", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => {
        if (!resp.ok) showError("Error al obtener personajes");
        return resp.json();
    })
    .then(data => {
        if (localStorage.getItem("characters") == null) {
            localStorage.setItem("characters", JSON.stringify(data.results));
        }
        mostrarPersonajes(data.results);
    })

    .catch(error => {
        console.error("Ocurrió un error:", error);
    });
});

function mostrarPersonajes(personajes) {
    var characterList = document.getElementById("character-list");
    characterList.innerHTML = ""; 

    personajes.forEach(personaje => {
        characterList.innerHTML += `
            <div class="character-card" id="character-${personaje.id}">
                <img src="${personaje.image}" alt="${personaje.name}">
                <div class="character-info">
                <h2>${personaje.name}</h2>
                <p>Specie: ${personaje.species}</p>
                <p>Status: ${personaje.status}</p>
                <p>Type: ${personaje.type ? personaje.type : "Undefined"}</p>
                <p>Gender: ${personaje.gender}</p>
                </div>
                <button class="btn-details" data-id="${personaje.id}">View details</button>
            </div>
        `;
    });

    const botones = document.querySelectorAll(".btn-details");
    botones.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            const personaje = personajes.find(p => p.id == id);
            mostrarPopupCompleto(personaje);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    var storedCharacters = localStorage.getItem("characters");
    if (storedCharacters) {
        var characters = JSON.parse(storedCharacters);
        mostrarPersonajes(characters);
    } else {
        console.log("No hay personajes almacenados en localStorage");
    }
});

function showError(mensaje) {
    const popup = document.querySelector(".pop-up");
    popup.innerHTML = `
        <div class="popup-content popup-error">
            <h2>ERROR! ⚠</h2>
            <p>${mensaje}</p>
            <p>Por favor, inténtalo de nuevo más tarde.</p>
            <button class="close-popup">Cerrar</button>
        </div>
    `;
    popup.style.display = "block";

    document.querySelector(".close-popup").addEventListener("click", () => {
        popup.style.display = "none";
        popup.innerHTML = "";
    });
}

function mostrarPopupCompleto(personaje) {
    const popup = document.querySelector(".pop-up");
    popup.innerHTML = `
        <div class="popup-content">
            <img src="${personaje.image}" alt="${personaje.name}">
            <h4>${personaje.name}</h4>
            <p><strong>Status:</strong> ${personaje.status}</p>
            <p><strong>Species:</strong> ${personaje.species}</p>
            <p><strong>Type:</strong> ${personaje.type || "Undefined"}</p>
            <p><strong>Gender:</strong> ${personaje.gender}</p>
            <p><strong>Location:</strong> ${personaje.location.name}</p>
            <p><strong>Origin:</strong> ${personaje.origin.name}</p>
            <p><strong>Appearance in episodes:</strong> ${personaje.episode.length}</p>
            <p><strong>Created at:</strong> ${new Date(personaje.created).toLocaleDateString()}</p>
            <button class="close-popup">Cerrar</button>
        </div>
    `;
    popup.style.display = "block";

    document.querySelector(".close-popup").addEventListener("click", () => {
        popup.style.display = "none";
        popup.innerHTML = "";
    });
}

document.getElementById("filter").addEventListener("click", () => {
    var character = document.getElementById("character").value;
    var statusval = document.getElementById("status").value;
    var species = document.getElementById("species").value;
    var type = document.getElementById("type").value;
    var gender = document.getElementById("gender").value;

    const params = new URLSearchParams();

    if (character) params.append("name", character);
    if (statusval) params.append("status", statusval);
    if (species) params.append("species", species);
    if (type) params.append("type", type);
    if (gender) params.append("gender", gender);

    const filtrado = `https://rickandmortyapi.com/api/character/?${params.toString()}`;

    fetch(filtrado, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => {
        if (!resp.ok) showError("Error al obtener personajes filtrados");
        return resp.json();
    })
    .then(data => {
        clearFilters();
        localStorage.setItem("characters", JSON.stringify(data.results));
        mostrarPersonajes(data.results);
    })
    .catch(error => {
        console.error("Ocurrió un error:", error);
    });
});

function clearFilters() {
    document.getElementById("character").value = "";
    document.getElementById("status").selectedIndex = 0;
    document.getElementById("species").value = "";
    document.getElementById("type").value = "";
    document.getElementById("gender").value = "";
    localStorage.removeItem("characters");
}
