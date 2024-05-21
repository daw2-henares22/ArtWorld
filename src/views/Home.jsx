export function Home (){
    return(
      <div className="container mx-auto py-8">
          <h1 className="dark:text-white text-4xl font-bold text-center mb-8">ArtWorld</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured Sculpture */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                  <img src="https://via.placeholder.com/400x300" alt="Featured Sculpture" className="w-full h-64 object-cover rounded-md mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Featured Sculpture</h2>
                  <p className="text-gray-600">Explore our curated collection of exquisite sculptures.</p>
              </div>
  
              {/* Featured Painting */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                  <img src="https://via.placeholder.com/400x300" alt="Featured Painting" className="w-full h-64 object-cover rounded-md mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Featured Painting</h2>
                  <p className="text-gray-600">Discover stunning paintings from renowned artists.</p>
              </div>
  
              {/* Artist Spotlight */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                  <img src="https://via.placeholder.com/400x300" alt="Artist Spotlight" className="w-full h-64 object-cover rounded-md mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Artist Spotlight</h2>
                  <p className="text-gray-600">Get to know our featured artist of the month.</p>
              </div>
          </div>
      </div>
    )
}