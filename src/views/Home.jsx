export function Home (){
    return(
        <div>
      <div className="carousel">
        {/* Carrusel de imágenes */}
      </div>

      <div className="bg-gray-100 py-8">
        {/* Sección de categorías */}
        <h2 className="text-2xl font-bold text-center mb-4">Categorías</h2>
        <div className="flex justify-center gap-8">
          <div>
            <Link to="/sculptures">
              <h3 className="text-lg font-semibold mb-2">Esculturas</h3>
              {/* Imágenes representativas de esculturas */}
            </Link>
          </div>
          <div>
            <Link to="/paintings">
              <h3 className="text-lg font-semibold mb-2">Pinturas</h3>
              {/* Imágenes representativas de pinturas */}
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 py-8">
        {/* Destacados de artistas */}
        <h2 className="text-2xl font-bold text-center mb-4">Artistas destacados</h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <img src="ruta-a-la-imagen-del-artista" alt="Nombre del artista" className="w-32 h-32 rounded-full mb-2" />
            <h3 className="text-lg font-semibold mb-1">Nombre del artista</h3>
            <p className="text-sm text-gray-600">Breve biografía o descripción del artista</p>
            <Link to="/artist-profile" className="text-blue-500">Ver más obras</Link>
          </div>
          {/* Repite este bloque para otros artistas destacados */}
        </div>
      </div>

      <div className="bg-gray-300 py-8">
        {/* Testimonios de clientes */}
        <h2 className="text-2xl font-bold text-center mb-4">Testimonios</h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <p className="text-lg">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod enim at nulla vestibulum, id sollicitudin nisl dapibus."</p>
            <p className="text-gray-600">- Nombre del cliente</p>
          </div>
          {/* Repite este bloque para otros testimonios */}
        </div>
      </div>

      <div className="bg-gray-400 py-8">
        {/* Formulario de contacto */}
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Contacto</h2>
          <p className="text-center">¿Tienes alguna pregunta? ¡Contáctanos!</p>
          {/* Formulario de contacto */}
        </div>
      </div>
    </div>
    )
}