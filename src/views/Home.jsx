import { Carousel, IconButton } from "@material-tailwind/react"

export function Home (){
    return(
        <>
        <div className="container mx-auto py-8">
          <h1 className="font-serif dark:text-white text-4xl font-bold text-center mb-8">ARTWORLD</h1>
        <Carousel
      className="rounded-xl"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
    >
      <img
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
    

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              <div className="bg-white p-6 rounded-lg shadow-md">
                  <img src="https://via.placeholder.com/400x300" alt="Featured Sculpture" className="w-full h-64 object-cover rounded-md mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Featured Sculpture</h2>
                  <p className="text-blue-gray-600">Explore our curated collection of exquisite sculptures.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                  <img src="https://via.placeholder.com/400x300" alt="Featured Painting" className="w-full h-64 object-cover rounded-md mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Featured Painting</h2>
                  <p className="text-blue-gray-600">Discover stunning paintings from renowned artists.</p>
              </div>
  
              <div className="bg-white p-6 rounded-lg shadow-md">
                  <img src="https://via.placeholder.com/400x300" alt="Artist Spotlight" className="w-full h-64 object-cover rounded-md mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Artist Spotlight</h2>
                  <p className="text-blue-gray-600">Get to know our featured artist of the month.</p>
              </div>
          </div>
        </div>
      </>
    )
}