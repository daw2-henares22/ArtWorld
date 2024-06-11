import { Dialog } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../bd/supaBase';
import { useGlobalContext } from '../context/globalContext';

export function Paintings() {
  const { t } = useTranslation();
  const { isAdmin } = useGlobalContext();
  console.log("isAdmin:", isAdmin);
  const [paintings, setPaintings] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);

  const handleOpen = (painting) => {
    setSelectedPainting(painting);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleDelete = async (paintingId) => {
    try {
      const { error } = await supabase.from('Paintings').delete().eq('id', paintingId);
      if (error) {
        throw error;
      }
      setPaintings(paintings.filter(painting => painting.id !== paintingId));
    } catch (error) {
      console.error('Error deleting painting:', error.message);
    }
  };

  const handleEdit = (painting) => {
    // Handle edit functionality
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="dark:text-white text-blue-gray-800 text-3xl font-bold mb-4">{t('Paintings')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paintings.map(painting => (
          <div key={painting.id} className="bg-white p-4 rounded-lg shadow-md">
            <button className="w-full transition duration-150 hover:scale-x-105 hover:scale-y-105"><img onClick={() => handleOpen(painting)} src={painting.image} alt={t(painting.name)} className="w-full h-48 object-cover mb-4 rounded-md" /></button>
            <Dialog
              size="xs"
              open={open && selectedPainting === painting}
              handler={handleClose}
              className="bg-transparent shadow-none"
            >
              <img src={selectedPainting?.image} alt={t(selectedPainting?.name)} className="w-full mb-4 rounded-md" />
            </Dialog>
            <h2 className="text-xl font-semibold mb-2">{t(painting.name)}</h2>
            <p className="text-blue-gray-600">{t(painting.description)}</p>
            <p className="text-blue-gray-600">Author: {t(painting.author)}</p>
            {isAdmin && (
              <div className="flex justify-between mt-4">
                <button onClick={() => handleEdit(painting)} className="bg-blue-500 text-white py-2 px-4 rounded-md">Edit</button>
                <button onClick={() => handleDelete(painting.id)} className="bg-red-500 text-white py-2 px-4 rounded-md">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}