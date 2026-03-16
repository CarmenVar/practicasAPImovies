let pagina = 1;
const API_KEY = 'TU_API_KEY_AQUÍ'; // Reemplaza con tu clave

const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

// Función para cargar películas
const cargarPeliculas = async () => {
    try {
        // Consultamos películas populares, filtrando por años clásicos si lo deseas
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX&page=${pagina}`);
        
        if(respuesta.status === 200) {
            const datos = await respuesta.json();
            
            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
            });

            document.getElementById('contenedor').innerHTML = peliculas;
            document.getElementById('numeroPagina').innerText = `Página: ${pagina}`;

        }
    } catch (error) {
        console.log(error);
    }
}

// Eventos de Paginación
btnSiguiente.addEventListener('click', () => {
    if(pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener('click', () => {
    if(pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
});

cargarPeliculas();