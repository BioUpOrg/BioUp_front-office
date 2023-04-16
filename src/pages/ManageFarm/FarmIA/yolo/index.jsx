import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { getObjectFromPic } from '../../../..//store/animals';

export default function GoogleCloudVision() {


  const [objects, setObjects] = useState([]);
  const [pic, setPic] = useState(null);
  const dispatch = useDispatch();

  const handleChangeFile = (event) => {
    setPic(event.target.files[0]);
  };



  const formik = useFormik({
    initialValues: {
      pic:''
    },
    onSubmit: async (data) => {
      console.log(data);
      const formData = new FormData();
      if (pic) {
        console.log(pic)
        formData.append('file', pic);
      }
      const imageData = formData;
      const resultPromise = dispatch(getObjectFromPic(imageData));
      const result = await resultPromise;
      console.log(result.payload);
      setObjects(result.payload);
      
    }

  });
  const { touched, handleSubmit } = formik;


  return (

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
                alt="UserImage"
                style={{
                  width: '40%',
                  height: '20%',
                  objectFit: 'contain',
                  paddingTop: 16
                }}
              />
            </div>
          </Stack>
          <h1>Objects</h1>
         
          {objects.map((object) => (
            <div key={object.name}>
              <h1>{object.name}</h1>
              <h1>{object.score}</h1>
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




    )
}
