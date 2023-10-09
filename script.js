        // JavaScript para gestionar la biblioteca y la funcionalidad requerida
        // Usa el Local Storage para almacenar el criterio de ordenamiento preferido

        // Define la estructura del objeto Libro
        function Libro(titulo, autor, anioPublicacion, estado, prestadoA) {
            this.titulo = titulo;
            this.autor = autor;
            this.anioPublicacion = anioPublicacion;
            this.estado = estado;
            this.prestadoA = prestadoA;
        }

        // Inicializa la lista de libros desde el Local Storage si existe
        let listaLibros = JSON.parse(localStorage.getItem('listaLibros')) || [];

        // Función para actualizar la tabla con la lista de libros
        function actualizarTabla() {
            const ordenarPor = document.getElementById('ordenarPor').value;

            // Ordenar la lista de libros según el criterio seleccionado
            if (ordenarPor === 'autor') {
                listaLibros.sort((a, b) => (a.autor > b.autor) ? 1 : -1);
            } else if (ordenarPor === 'estado') {
                listaLibros.sort((a, b) => (a.estado > b.estado) ? 1 : -1);
            } else {
                listaLibros.sort((a, b) => (a.titulo > b.titulo) ? 1 : -1);
            }

            const listaLibrosHTML = document.getElementById('listaLibros');
            listaLibrosHTML.innerHTML = '';

            // Actualizar la tabla con los libros ordenados
            listaLibros.forEach(libro => {
                const row = listaLibrosHTML.insertRow();
                row.innerHTML = `<td>${libro.titulo}</td><td>${libro.autor}</td><td>${libro.anioPublicacion}</td><td>${libro.estado}</td><td>${libro.prestadoA}</td>`;
            });
        }

        // Función para agregar un libro a la lista
        function agregarLibro(titulo, autor, anioPublicacion) {
            const libro = new Libro(titulo, autor, anioPublicacion, 'Disponible', null);
            listaLibros.push(libro);
            localStorage.setItem('listaLibros', JSON.stringify(listaLibros));
            actualizarTabla();
        }

        // Función para marcar un libro como prestado
        function marcarPrestado(index, prestadoA) {
            listaLibros[index].estado = 'Prestado';
            listaLibros[index].prestadoA = prestadoA;
            localStorage.setItem('listaLibros', JSON.stringify(listaLibros));
            actualizarTabla();
        }

        // Función para marcar un libro como devuelto
        function marcarDevuelto(index) {
            listaLibros[index].estado = 'Disponible';
            listaLibros[index].prestadoA = null;
            localStorage.setItem('listaLibros', JSON.stringify(listaLibros));
            actualizarTabla();
        }

        // Función para eliminar un libro de la lista
        function eliminarLibro(index) {
            listaLibros.splice(index, 1);
            localStorage.setItem('listaLibros', JSON.stringify(listaLibros));
            actualizarTabla();
        }

        // Event listeners para los botones
        document.getElementById('agregarLibro').addEventListener('click', () => {
            const titulo = prompt('Ingrese el título del libro:');
            const autor = prompt('Ingrese el autor del libro:');
            const anioPublicacion = prompt('Ingrese el año de publicación del libro:');
            agregarLibro(titulo, autor, anioPublicacion);
        });

        document.getElementById('marcarPrestado').addEventListener('click', () => {
            const index = prompt('Ingrese el índice del libro que desea marcar como prestado:');
            const prestadoA = prompt('Ingrese el nombre del lector que pidió el libro:');
            marcarPrestado(index, prestadoA);
        });

        document.getElementById('marcarDevuelto').addEventListener('click', () => {
            const index = prompt('Ingrese el índice del libro que desea marcar como devuelto:');
            marcarDevuelto(index);
        });

        document.getElementById('eliminarLibro').addEventListener('click', () => {
            const index = prompt('Ingrese el índice del libro que desea eliminar:');
            eliminarLibro(index);
        });

        // Inicializar la tabla al cargar la página
        actualizarTabla();