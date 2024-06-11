import { Dialog, Card, CardBody, CardFooter, Input, Typography, Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../bd/supaBase';
import { useGlobalContext } from '../context/globalContext';

export function Sculptures() {
  const { t } = useTranslation();
  const { isAdmin } = useGlobalContext();
  const [sculptures, setSculptures] = useState([]);
  const [open, setOpen] = useState(false);
  const [openN, setOpenN] = useState(false);
  const [selectedSculpture, setSelectedSculpture] = useState(null);

  // State for the new sculpture form
  const [newSculpture, setNewSculpture] = useState({
    name: '',
    description: '',
    author: '',
    image: '',
    status: false
  });

  const [editSculpture, setEditSculpture] = useState(null);

  const handleOpen = (sculpture) => {
    setSelectedSculpture(sculpture);
    setOpen(true);
  };

  const handleOpenN = () => setOpenN((cur) => !cur);

  const handleOpenEdit = (sculpture) => {
    setEditSculpture(sculpture);
    setNewSculpture({
      name: sculpture.name,
      description: sculpture.description,
      author: sculpture.author,
      image: sculpture.image,
      status: sculpture.status
    });
    setOpenN(true);
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

  const handleDelete = async (sculptureId) => {
    try {
      const { error } = await supabase.from('Sculptures').delete().eq('id', sculptureId);
      if (error) {
        throw error;
      }
      setSculptures(sculptures.filter(sculpture => sculpture.id !== sculptureId));
    } catch (error) {
      console.error('Error deleting sculpture:', error.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('Sculptures').update(newSculpture).eq('id', editSculpture.id).select();
      if (error) {
        throw error;
      }
      if (!data || data.length === 0) {
        throw new Error('Update failed, no data returned.');
      }
      setSculptures(sculptures.map(sculpture => (sculpture.id === editSculpture.id ? data[0] : sculpture)));
      setNewSculpture({ name: '', description: '', author: '', image: '', status: false });
      setEditSculpture(null);
      setOpenN(false);
    } catch (error) {
      console.error('Error updating sculpture:', error.message);
    }
  };

  // Handle input changes for the new sculpture form
  const handleChange = (e) => {
    setNewSculpture((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle form submission for the new sculpture form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('Sculptures').insert([newSculpture]).select();
      if (error) {
        throw error;
      }
      if (!data || data.length === 0) {
        throw new Error('Insert failed, no data returned.');
      }
      setSculptures([...sculptures, data[0]]);
      setNewSculpture({ name: '', description: '', author: '', image: '', status: false });
      setOpenN(false);
    } catch (error) {
      console.error('Error adding sculpture:', error.message);
    }
  };

  return (
    <div className="container mx-auto py-8 relative">
      <h1 className="dark:text-white text-blue-gray-800 text-3xl font-bold mb-4">{t('Sculptures')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sculptures.map(sculpture => (
          <div key={sculpture.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <button className="w-full transition duration-150 hover:scale-x-105 hover:scale-y-105">
              <img onClick={() => handleOpen(sculpture)} src={sculpture.image} alt={t(sculpture.name)} className="w-full h-48 object-cover mb-4 rounded-md" />
            </button>
            <Dialog
              size="xs"
              open={open && selectedSculpture === sculpture}
              handler={handleOpen}
              className="bg-transparent shadow-none"
            >
              <img src={selectedSculpture?.image} alt={t(selectedSculpture?.name)} className="w-full mb-4 rounded-md" />
            </Dialog>
            <h2 className="text-xl font-semibold mb-2 dark:text-white">{t(sculpture.name)}</h2>
            <p className="text-blue-gray-600 dark:text-blue-gray-100">{t(sculpture.description)}</p>
            <p className="text-blue-gray-600 dark:text-blue-gray-100">Author: {t(sculpture.author)}</p>
            {isAdmin && (
              <div className="flex justify-between mt-4">
                <button onClick={() => handleOpenEdit(sculpture)} className="bg-blue-500 text-white py-2 px-4 rounded-md">Edit</button>
                <button onClick={() => handleDelete(sculpture.id)} className="bg-red-500 text-white py-2 px-4 rounded-md">Delete</button>
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
          Add Sculpture
        </Button>
      )}

      <Dialog open={openN} handler={handleOpenN} size="xs" className="bg-transparent shadow-none">
        <Card className="dark:bg-blue-gray-900 dark:text-white mx-auto w-full max-w-[24rem]">
          <form onSubmit={editSculpture ? handleEditSubmit : handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4">{editSculpture ? 'Edit Sculpture' : 'Add New Sculpture'}</Typography>
                <Input
                  label="Name"
                  size="lg"
                  color='blue-gray'
                  name="name"
                  required
                  value={newSculpture.name}
                  onChange={handleChange}
                  className="dark:text-gray-300"
                />
                <Input
                  label="Description"
                  size="lg"
                  color='blue-gray'
                  name="description"
                  required
                  value={newSculpture.description}
                  onChange={handleChange}
                  className="dark:text-gray-300"
                />
                <Input
                  label="Author"
                  size="lg"
                  color='blue-gray'
                  name="author"
                  required
                  value={newSculpture.author}
                  onChange={handleChange}
                  className="dark:text-gray-300"
                />
                <Input
                  label="Image URL"
                  size="lg"
                  color='blue-gray'
                  name="image"
                  required
                  value={newSculpture.image}
                  onChange={handleChange}
                  className="dark:text-gray-300"
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="status"
                    checked={newSculpture.status}
                    onChange={() => setNewSculpture(prev => ({ ...prev, status: !prev.status }))}
                  />
                  <span>Status</span>
                </label>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth type="submit">
                {editSculpture ? 'Update Sculpture' : 'Add Sculpture'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}