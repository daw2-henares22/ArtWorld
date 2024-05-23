import { Carousel, Typography } from "@material-tailwind/react"
import { useTranslation } from "react-i18next";

export function Home (){
    const { t } = useTranslation(); // Obtener la función de traducción t()
    return(
        <>
        <Carousel className="">
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="font-serif mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              ArtWorld
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              {t('Rubén Henares Hidalgo&apos; art page, to make known the art of the world.')}
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
          </div>
        </div>
      </div>
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
      </>
    )
}