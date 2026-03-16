// 1. Configuración inicial
let paginaAPI = 1; // La página que le pedimos a TMDB
const API_KEY = '9f295ba3a95a60a61aef0a8581865c38'; 

const contenedor = document.getElementById('contenedor');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

// 2. Función para obtener y filtrar datos
const cargarPeliculas = async () => {
    try {
        // Pedimos los datos a la API
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX&page=${paginaAPI}`;
        const respuesta = await fetch(url);
        
        if(respuesta.status === 200) {
            const datos = await respuesta.json();
            
            // LÓGICA DE 12 PELÍCULAS:
            // .slice(0, 12) toma solo los elementos del índice 0 al 11
            const primerasDoce = datos.results.slice(0, 12);
            
            let peliculasHTML = '';
            primerasDoce.forEach(pelicula => {
                peliculasHTML += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
            });

            contenedor.innerHTML = peliculasHTML;
            document.getElementById('numeroPagina').innerText = `Página: ${paginaAPI}`;
            
            // Scroll suave hacia arriba al cambiar de página
            window.scrollTo({top: 0, behavior: 'smooth'});

        } else {
            console.error('Error en la respuesta de la API');
        }
    } catch (error) {
        console.log('Error de conexión:', error);
    }
}

// 3. Eventos
btnSiguiente.addEventListener('click', () => {
    paginaAPI++;
    cargarPeliculas();
});

btnAnterior.addEventListener('click', () => {
    if(paginaAPI > 1) {
        paginaAPI--;
        cargarPeliculas();
    }
});

// Ejecución inicial
cargarPeliculas();