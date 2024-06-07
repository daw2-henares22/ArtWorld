import { Dialog } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../bd/supaBase';

export function Sculptures() {
  const { t } = useTranslation();
  const [sculptures, setSculptures] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSculpture, setSelectedSculpture] = useState(null);

  const handleOpen = (sculpture) => {
    setSelectedSculpture(sculpture);
    setOpen(true);
  };

  useEffect(() => {
    const fetchSculptures = async () => {
      try {
        const { data: sculptures, error } = await supabase.from('Sculptures').select('*');
        if (error) {
          throw error;
        }
        setSculptures(sculptures);
      } catch (error) {
        console.error('Error fetching sculptures:', error.message);
      }
    };

    fetchSculptures();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="dark:text-white text-blue-gray-800 text-3xl font-bold mb-4">{t('Sculptures')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sculptures.map(sculpture => (
          <div key={sculpture.id} className="bg-white p-4 rounded-lg shadow-md">
             <button className="w-full"><img onClick={() => handleOpen(sculpture)} src={sculpture.image} alt={t(sculpture.name)} className="w-full h-48 object-cover mb-4 rounded-md" /></button>
            <Dialog
              size="xs"
              open={open && selectedSculpture === sculpture}
              handler={handleOpen}
              className="bg-transparent shadow-none"
            >
              <img src={selectedSculpture?.image} alt={t(selectedSculpture?.name)} className="w-full mb-4 rounded-md" />
            </Dialog>
            <h2 className="text-xl font-semibold mb-2">{t(sculpture.name)}</h2>
            <p className="text-blue-gray-600">{t(sculpture.description)}</p>
            <p className="text-blue-gray-600">Author: {t(sculpture.author)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}