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
  const [newPainting, setNewPainting] = useState({
    name: '',
    description: '',
    author: '',
    image: '',
    status: false
  });
  const [editPainting, setEditPainting] = useState(null);

  const handleOpen = (painting) => {
    setSelectedPainting(painting);
    setOpen(true);
  };

  const handleOpenN = () => setOpenN(!openN);

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

  const handleChange = (event) => {
    setNewPainting({
      ...newPainting,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editPainting) {
        const { error } = await supabase.from('Paintings').update(newPainting).eq('id', editPainting.id);
        if (error) throw error;
        setPaintings(paintings.map(painting => painting.id === editPainting.id ? newPainting : painting));
      } else {
        const { data, error } = await supabase.from('Paintings').insert([newPainting]);
        if (error) throw error;
        setPaintings([...paintings, ...data]);
      }
      setOpenN(false);
      setNewPainting({ name: '', description: '', author: '', image: '', status: false });
      setEditPainting(null);
    } catch (error) {
      console.error('Error saving painting:', error.message);
    }
  };

  return (
    <>
      <div>
        {isAdmin && (
          <Button onClick={handleOpenN} className="mb-4">Añadir Nueva Pintura</Button>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paintings.map(painting => (
            <Card key={painting.id} className="dark:bg-blue-gray-900 dark:text-white">
              <CardBody>
                <Typography variant="h5">{painting.name}</Typography>
                <Typography variant="paragraph">{painting.description}</Typography>
                <Typography variant="small">{painting.author}</Typography>
                <img src={painting.image} alt={painting.name} className="w-full h-48 object-cover mt-2"/>
              </CardBody>
              <CardFooter className="flex justify-between">
                {isAdmin && (
                  <>
                    <Button size="sm" onClick={() => handleOpenEdit(painting)}>Editar</Button>
                    <Button size="sm" color="red" onClick={() => handleDelete(painting.id)}>Eliminar</Button>
                  </>
                )}
                <Button size="sm" onClick={() => handleOpen(painting)}>Ver más</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Diálogo para Ver más */}
        {selectedPainting && (
          <Dialog size="lg" open={open} handler={() => setOpen(false)} className="bg-transparent shadow-none">
            <Card className="dark:bg-blue-gray-900 dark:text-white mx-auto w-full max-w-[24rem]">
              <CardBody>
                <Typography variant="h5">{selectedPainting.name}</Typography>
                <Typography variant="paragraph">{selectedPainting.description}</Typography>
                <Typography variant="small">{selectedPainting.author}</Typography>
                <img src={selectedPainting.image} alt={selectedPainting.name} className="w-full h-48 object-cover mt-2"/>
              </CardBody>
              <CardFooter className="pt-0">
                <Button onClick={() => setOpen(false)}>Cerrar</Button>
              </CardFooter>
            </Card>
          </Dialog>
        )}

        {/* Diálogo para Añadir/Editar Pintura */}
        <Dialog size="xs" open={openN} handler={handleOpenN} className="bg-transparent shadow-none">
          <Card className="dark:bg-blue-gray-900 dark:text-white mx-auto w-full max-w-[24rem]">
            <form onSubmit={handleSubmit}>
              <CardBody className="flex flex-col gap-4">
                <Typography variant="h4">{editPainting ? 'Editar Pintura' : 'Añadir Nueva Pintura'}</Typography>
                <Input color="blue-gray" label="Nombre" size="lg" name="name" value={newPainting.name} onChange={handleChange} required />
                <Input color="blue-gray" label="Descripción" size="lg" name="description" value={newPainting.description} onChange={handleChange} required />
                <Input color="blue-gray" label="Autor" size="lg" name="author" value={newPainting.author} onChange={handleChange} required />
                <Input color="blue-gray" label="Imagen" size="lg" name="image" value={newPainting.image} onChange={handleChange} required />
                <Input type="checkbox" label="Activo" name="status" checked={newPainting.status} onChange={() => setNewPainting({ ...newPainting, status: !newPainting.status })} />
              </CardBody>
              <CardFooter className="pt-0">
                <Button variant="gradient" fullWidth type="submit">
                  {editPainting ? 'Guardar Cambios' : 'Añadir Pintura'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </Dialog>
      </div>
    </>
  );
}