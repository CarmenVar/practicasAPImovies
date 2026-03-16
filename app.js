let paginaAPI = 1;
let busquedaActiva = false; 
let terminoBusqueda = '';   

const API_KEY = CONFIG.API_KEY; 
const inputBusqueda = document.getElementById('inputBusqueda');
const btnBuscar = document.getElementById('btnBuscar');
// ¡IMPORTANTE! Asegúrate de que el contenedor esté definido aquí
const contenedor = document.getElementById('contenedor'); 

const cargarPeliculas = async () => {
    try {
        let url = '';
        
        if (busquedaActiva) {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-MX&query=${terminoBusqueda}&page=${paginaAPI}`;
        } else {
            url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX&page=${paginaAPI}`;
        }

        const respuesta = await fetch(url);
        
        if(respuesta.status === 200) {
            const datos = await respuesta.json();
            const primerasDoce = datos.results.slice(0, 12);
            
            // REVISIÓN: Aquí estaba el vacío. Necesitamos el bucle para crear el HTML:
            let peliculasHTML = '';
            
            primerasDoce.forEach(pelicula => {
                // Verificamos si la película tiene póster para evitar imágenes rotas
                const imagenPath = pelicula.poster_path 
                    ? `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}` 
                    : 'https://via.placeholder.com/500x750?text=No+Image';

                peliculasHTML += `
                    <div class="pelicula">
                        <img class="poster" src="${imagenPath}" alt="${pelicula.title}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
            });

            // Insertamos el HTML generado en el contenedor
            contenedor.innerHTML = peliculasHTML;
            
            // Actualizamos el número de página en la pantalla
            document.getElementById('numeroPagina').innerText = `Página: ${paginaAPI}`;

            if (datos.results.length === 0) {
                contenedor.innerHTML = '<h2>No se encontraron películas.</h2>';
            }
        }
    } catch (error) {
        console.log("Error detectado:", error);
    }
}

// Evento para el botón de buscar
btnBuscar.addEventListener('click', () => {
    const valor = inputBusqueda.value;
    if (valor !== '') {
        terminoBusqueda = valor;
        busquedaActiva = true;
        paginaAPI = 1;
        cargarPeliculas();
    } else {
        busquedaActiva = false;
        paginaAPI = 1;
        cargarPeliculas();
    }
});

// Llamada inicial para que la web no abra vacía
cargarPeliculas();