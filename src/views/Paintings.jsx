import { Dialog, Card, CardBody, CardFooter, Input, Typography, Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../bd/supaBase';
import { useGlobalContext } from '../context/globalContext';

export function Paintings() {
  const { t } = useTranslation();
  const { isAdmin } = useGlobalContext();
  const [paintings, setPaintings] = useState([]);
  const [open, setOpen] = useState(false);
  const [openN, setOpenN] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);

  // State for the new painting form
  const [newPainting, setNewPainting] = useState({
    name: '',
    description: '',
    author: '',
    image: '',
    status: false
  });

  // State for editing a painting
  const [editPainting, setEditPainting] = useState(null);

  const handleOpen = (painting) => {
    setSelectedPainting(painting);
    setOpen(true);
  };

  const handleOpenN = () => setOpenN((cur) => !cur);

  const handleOpenEdit = (painting) => {
    setEditPainting(painting);
    setNewPainting({
      name: painting.name,
      description: painting.description,
      author: painting.author,
      image: painting.image,
      status: painting.status
    });
    setOpenN(true);
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

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('Paintings').update(newPainting).eq('id', editPainting.id).select();
      if (error) {
        throw error;
      }
      if (!data || data.length === 0) {
        throw new Error('Update failed, no data returned.');
      }
      setPaintings(paintings.map(painting => (painting.id === editPainting.id ? data[0] : painting)));
      setNewPainting({ name: '', description: '', author: '', image: '', status: false });
      setEditPainting(null);
      setOpenN(false);
    } catch (error) {
      console.error('Error updating painting:', error.message);
    }
  };

  // Handle input changes for the new painting form
  const handleChange = (e) => {
    setNewPainting((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle form submission for the new painting form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('Paintings').insert([newPainting]).select();
      if (error) {
        throw error;
      }
      if (!data || data.length === 0) {
        throw new Error('Insert failed, no data returned.');
      }
      setPaintings([...paintings, data[0]]);
      setNewPainting({ name: '', description: '', author: '', image: '', status: false });
      setOpenN(false);
    } catch (error) {
      console.error('Error adding painting:', error.message);
    }
  };

  return (
    <div className="container mx-auto py-8 relative">
      <h1 className="dark:text-white text-blue-gray-800 text-3xl font-bold mb-4">{t('Paintings')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paintings.map(painting => (
          <div key={painting.id} className="bg-white p-4 rounded-lg shadow-md">
            <button className="w-full transition duration-150 hover:scale-x-105 hover:scale-y-105">
              <img onClick={() => handleOpen(painting)} src={painting.image} alt={t(painting.name)} className="w-full h-48 object-cover mb-4 rounded-md" />
            </button>
            <Dialog
              size="xs"
              open={open && selectedPainting === painting}
              handler={handleOpen}
              className="bg-transparent shadow-none"
            >
              <img src={selectedPainting?.image} alt={t(selectedPainting?.name)} className="w-full mb-4 rounded-md" />
            </Dialog>
            <h2 className="text-xl font-semibold mb-2">{t(painting.name)}</h2>
            <p className="text-blue-gray-600">{t(painting.description)}</p>
            <p className="text-blue-gray-600">Author: {t(painting.author)}</p>
            {isAdmin && (
              <div className="flex justify-between mt-4">
                <button onClick={() => handleOpenEdit(painting)} className="bg-blue-500 text-white py-2 px-4 rounded-md">Edit</button>
                <button onClick={() => handleDelete(painting.id)} className="bg-red-500 text-white py-2 px-4 rounded-md">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isAdmin && (
        <Button
          onClick={() => setOpenN(true)}
          className="fixed bottom-4 right-4"
          variant="gradient"
        >
          Add Painting
        </Button>
      )}

      <Dialog open={openN} handler={handleOpenN} size="xs" className="bg-transparent shadow-none">
        <Card className="dark:bg-blue-gray-900 dark:text-white mx-auto w-full max-w-[24rem]">
          <form onSubmit={editPainting ? handleEdit : handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4">{editPainting ? 'Edit Painting' : 'Add New Painting'}</Typography>
              <Input
                label="Name"
                size="lg"
                name="name"
                required
                value={newPainting.name}
                onChange={handleChange}
              />
              <Input
                label="Description"
                size="lg"
                name="description"
                required
                value={newPainting.description}
                onChange={handleChange}
              />
              <Input
                label="Author"
                size="lg"
                name="author"
                required
                value={newPainting.author}
                onChange={handleChange}
              />
              <Input
                label="Image URL"
                size="lg"
                name="image"
                required
                value={newPainting.image}
                onChange={handleChange}
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="status"
                  checked={newPainting.status}
                  onChange={() => setNewPainting(prev => ({ ...prev, status: !prev.status }))}
                />
                <span>Status</span>
              </label>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth type="submit">
                {editPainting ? 'Update Painting' : 'Add Painting'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}