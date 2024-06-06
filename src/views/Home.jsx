import { Carousel, Typography } from "@material-tailwind/react"
import { useTranslation } from "react-i18next";

export function Home (){
    const { t } = useTranslation(); // Obtener la función de traducción t()
    return(
        <>
        <Carousel className="">
      <div className="relative h-full w-full">
        <img
          src="public/jacob.png"
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
          src="public/venus.png"
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
              {t('Sculptures')}
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              {t('Sculpture (from the Latin sculptūra) is the art of molding clay, carving in stone, wood and other materials. The work created by a sculptor is also called sculpture.')}
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="public/spanish.png"
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
              {t('Paintings')}
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              {t('Painting is the art of graphic representation using pigments mixed with other binding substances, organic or synthetic. This art uses painting techniques, knowledge of color theory and pictorial composition, and drawing. The practice of the art of painting consists of applying, on a specific surface a sheet of paper, a canvas, a wall, a piece of wood, a fragment of fabric, etc. A specific technique, to obtain a composition of shapes, colors, textures, drawings, etc. giving rise to a work of art according to some aesthetic principles.')}
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