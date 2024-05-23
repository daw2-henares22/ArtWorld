import { useTranslation } from "react-i18next";

export function Sculptures (){
  const { t } = useTranslation(); // Obtener la función de traducción t()
    // Supongamos que tienes un array de objetos con información sobre cada pintura
 const paintings = [
   {
     id: 1,
     title: "Starry Night",
     imageUrl: "https://via.placeholder.com/400x300",
     description: "A masterpiece by Vincent van Gogh."
   },
   {
     id: 2,
     title: "Mona Lisa",
     imageUrl: "https://via.placeholder.com/400x300",
     description: "An iconic painting by Leonardo da Vinci."
   },
   // Agrega más pinturas aquí si lo deseas
 ];



   return(
       <div className="container mx-auto py-8">
           <h1 className="dark:text-white text-blue-gray-800 text-3xl font-bold mb-4">{t('Sculptures')}</h1>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {paintings.map(painting => (
                   <div key={painting.id} className="bg-white p-4 rounded-lg shadow-md">
                       <img src={painting.imageUrl} alt={t(painting.title)} className="w-full h-48 object-cover mb-4 rounded-md" />
                       <h2 className="text-xl font-semibold mb-2">{t(painting.title)}</h2>
                       <p className="text-blue-gray-600">{t(painting.description)}</p>
                   </div>
               ))}
           </div>
       </div>
   )
}