import { Dialog } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../bd/supaBase';

export function Paintings() {
  const { t } = useTranslation();
  const [paintings, setPaintings] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);

  const handleOpen = (painting) => {
    setSelectedPainting(painting);
    setOpen(true);
  };

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const { data: paintings, error } = await supabase.from('Paintings').select('*');
        if (error) {
          throw error;
        }
        setPaintings(paintings);
      } catch (error) {
        console.error('Error fetching paintings:', error.message);
      }
    };

    fetchPaintings();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="dark:text-white text-blue-gray-800 text-3xl font-bold mb-4">{t('Paintings')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paintings.map(painting => (
          <div key={painting.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              onClick={() => handleOpen(painting)}
              src={painting.image}
              alt={t(painting.name)}
              className="w-full h-auto object-cover cursor-pointer rounded-md"
            />
            <h2 className="text-xl font-semibold mb-2">{t(painting.name)}</h2>
            <p className="text-blue-gray-600">{t(painting.description)}</p>
            <p className="text-blue-gray-600">Author: {t(painting.author)}</p>
            <p className="text-blue-gray-600">Status: {t(painting.status)}</p>
          </div>
        ))}
      </div>
      {selectedPainting && (
        <Dialog
          size="lg" // Cambia el tamaño del diálogo para que sea más grande
          open={open}
          onClose={() => setOpen(false)}
          className="bg-transparent shadow-none"
        >
          <div className="p-4">
            <img
              src={selectedPainting.image}
              alt={t(selectedPainting.name)}
              className="w-full h-auto object-contain rounded-md"
            />
            <h2 className="text-xl font-semibold mb-2">{t(selectedPainting.name)}</h2>
            <p className="text-blue-gray-600">{t(selectedPainting.description)}</p>
            <p className="text-blue-gray-600">Author: {t(selectedPainting.author)}</p>
            <p className="text-blue-gray-600">Status: {t(selectedPainting.status)}</p>
          </div>
        </Dialog>
      )}
    </div>
  );
}