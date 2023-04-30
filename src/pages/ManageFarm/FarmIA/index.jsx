import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { getObjectFromPic } from '../../../store/animals';
import { addAnimal } from '../../../store/animals';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { animals } from '../AddAnimal/animals';
import Alert from '@mui/material/Alert';

export default function GoogleCloudVision() {


  const [objects, setObjects] = useState([]);
  const [pic, setPic] = useState(null);
  const dispatch = useDispatch();
  const [clickedObject, setClickedObject] = useState(null);

  const userId = useSelector((state) => state.entities.users.userId);

  const handleChangeFile = (event) => {
    setPic(event.target.files[0]);
  };

  function getImageUrl(animalName) {
    const animal = animals.animals.find(p => p.name.toLowerCase() === animalName.toLowerCase());
    return animal ? animal.image : '';
  }

  const handleAdd = (object) => {
    const imageUrl = getImageUrl(object.name);
    object.image = imageUrl;
    object.user = userId;

    console.log("test",object)
    dispatch(addAnimal(object));
  }

  const handleClick = (object) => {
    handleAdd(object);
    setClickedObject(object);
    setTimeout(() => setClickedObject(null), 2000);
  };

  const groupedObjects = objects.reduce((accumulator, currentObject) => {
    const existingObject = accumulator.find((obj) => obj.name === currentObject.name);
    if (existingObject) {
      existingObject.quantity += 1;
    } else {
      accumulator.push({ ...currentObject, quantity: 1 });
    }
    return accumulator;
  }, []);

  const formik = useFormik({
    initialValues: {
      pic:''
    },
    onSubmit: async (data) => {
      const formData = new FormData();
      if (pic) {
        formData.append('file', pic);
      }
      const imageData = formData;
      const resultPromise = dispatch(getObjectFromPic(imageData));
      const result = await resultPromise;
      setObjects(result.payload);
      
    }

  });
  const { touched, handleSubmit } = formik;




  return (
<div style={{ maxWidth: '600px', margin: '0 auto' }}>
<FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
        <Stack sm={6} xs={12}>
            <TextField name="pic" fullWidth type="file" onChange={handleChangeFile} />

            <div
              style={{
                display: 'flex',
                width: '100%',

                justifyContent: 'center'
              }}
            >
              <img
                src={
                  // eslint-disable-next-line no-nested-ternary
                  pic
                    ? URL.createObjectURL(pic)
                    : touched?.pic
                    ? touched?.pic
                    : 'https://res.cloudinary.com/clouder32/image/upload/v1655285221/1200px-Breezeicons-actions-22-im-user.svg_r4qbs1.png'
                }
                alt="ItemImage"
                style={{
                  width: '80%',
                  height: '60%',
                  objectFit: 'contain',
                  paddingTop: 16
                }}
              />
            </div>
          </Stack>

          <h1>Objects</h1>
         
          {groupedObjects.map((object) => (
        <div key={object.name}>
          <h1>{object.name} (Quantity: {object.quantity})</h1>
          <h1>{object.score.toFixed(2)}%</h1>
          {clickedObject && clickedObject.name === object.name  ? (
            <Alert severity="success" onClose={() => setClickedObject(null)}>
              Item Added to Farm
            </Alert>
          ) : (
            <Button onClick={() => handleClick(object)} variant="contained" color="success">
              Add
            </Button>
          )}
        </div>
      ))}
     
        <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Scan
          </LoadingButton>

        </Stack>
      </Form>
    </FormikProvider>
    </div>



    )
}
