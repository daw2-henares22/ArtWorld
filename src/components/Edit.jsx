import { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardFooter, Checkbox, Dialog, Input, Typography } from "@material-tailwind/react";

export function Edit({ open, onClose, paintingId }) {
  const [currentPainting, setCurrentPainting] = useState(null);

  useEffect(() => {
    // Aquí puedes cargar la información de la pintura utilizando el paintingId
    // Esto se ejecutará cuando el paintingId cambie
  }, [paintingId]);

  const handleUpdatePainting = async () => {
    // Implementa la lógica para actualizar la pintura
    onClose(); // Cierra el modal después de la actualización
  };

  return (
    <Dialog open={open} onClose={onClose}>
        <Card>
      <Typography>Edit Painting</Typography>
      <CardBody>
        <form>
          <Input
            label="Title"
            value={currentPainting?.title}
            onChange={(e) => setCurrentPainting({ ...currentPainting, title: e.target.value })}
          />
          <Input
            label="Description"
            multiline
            rows={4}
            value={currentPainting?.description}
            onChange={(e) => setCurrentPainting({ ...currentPainting, description: e.target.value })}
          />
          <Input
            label="Image URL"
            value={currentPainting?.imageUrl}
            onChange={(e) => setCurrentPainting({ ...currentPainting, imageUrl: e.target.value })}
          />
        </form>
      </CardBody>
      <CardFooter>
        <Button onClick={handleUpdatePainting} color="primary">
          Update
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </CardFooter>
      </Card>
    </Dialog>
  );
}