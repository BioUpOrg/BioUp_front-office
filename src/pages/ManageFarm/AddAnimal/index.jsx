import React, { useState, useCallback, useEffect } from "react";
import { TextField, Grid, Paper } from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from '@iconify/react';
import useStyles from "./style";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { createApi } from "unsplash-js";
import { addAnimal } from "../../..//store/animals";
import { animals } from './animals.js';




export default function AddAnimal() {
    const classes = useStyles();
    const dispatch = useDispatch();
  
    const [showAlert, setShowAlert] = useState(false);
  
    const EventSchema = Yup.object().shape({
      name: Yup.string().required("Le nom de la formation est obligatoire"),
  
    });
    const userId = useSelector((state) => state.entities.users.userId);

  
    const formik = useFormik({
      initialValues: {
        name: "",
        sex: "",
        birthdate: "",
        age: "",
        healthStatus: "",
        vaccinations: "",
        feedingSchedule: "",
        price: "",
        quantity: "",
        image: "",
      },
      validationSchema: EventSchema,
      onSubmit: async (data) => {
      //const imageUrl = await searchPhotos(data.sex);
          const imageUrl = getImageUrl(data.name);
          data.image = imageUrl;

          data.user = userId;
        dispatch(addAnimal(data))
          .then(() => {
            setShowAlert(true);
          })
          .then(() => {
            formik.resetForm();
          })
          .then(() => {
            setTimeout(() => {
              setShowAlert(false);
            }, 5000);
          }); 
      },
    });
  
    const { errors, touched, handleSubmit, getFieldProps, setValues } = formik;
  
  
    function getImageUrl(animalName) {
      const animal = animals.animals.find(p => p.name.toLowerCase() === animalName.toLowerCase());
      return animal ? animal.image : '';
    }
  
  
    return (
      <div>
        <fieldset className={classes.fieldset}>
          <legend className={classes.legend}></legend>
          {showAlert && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Animal added successfully
            </Alert>
          )}
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={4} className={classes.root}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="name"
                    fullWidth
                    type="text"
                    label="Name *"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
  

                <Grid item sm={6} xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
  
                  <TextField
                    name="age"
                    fullWidth
                    type="text"
                    label="age *"
                    {...getFieldProps("age")}
                    error={Boolean(touched.age && errors.age)}
                    helperText={touched.age && errors.age}
                  />
                  </div>
  
                </Grid>






                <Grid item sm={6} xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>

                  <TextField
                    name="sex"
                    fullWidth
                    type="text"
                    label="sex"
                    {...getFieldProps("sex")}
                    error={Boolean(touched.sex && errors.sex)}
                    helperText={touched.sex && errors.sex}
                  />
                  <Icon icon="healthicons:sexual-reproductive-health" color="green" width="50" height="50" />
                    </div>
                </Grid>
  
  
  
                <Grid item sm={6} xs={12}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    name="healthStatus"
                    fullWidth
                    type="text"
                    label="healthStatus *"
                    {...getFieldProps("healthStatus")}
                    error={Boolean(touched.healthStatus && errors.healthStatus)}
                    helperText={touched.healthStatus && errors.healthStatus}
                  />
                  <Icon icon="solar:health-bold" color="green" width="50" height="50" />
                  </div>
                </Grid>
  
                <Grid item sm={6} xs={12}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    name="birthdate"
                    fullWidth
                    type="text"
                    label="birthdate *"
                    {...getFieldProps("birthdate")}
                    error={Boolean(touched.birthdate && errors.longitude)}
                    helperText={touched.birthdate && errors.longitude}
                  />
                  <Icon icon="fxemoji:birthdaycake" color="green" width="50" height="50" />
                  </div>
                </Grid>
  
                <Grid item sm={6} xs={12}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                          name="vaccinations"
                          fullWidth
                          type="text"
                          label="vaccinations *"
                          {...getFieldProps("vaccinations")}
                          error={Boolean(touched.vaccinations && errors.vaccinations)}
                          helperText={touched.vaccinations && errors.vaccinations}
                      />
                      <Icon icon="fluent-mdl2:vaccination" color="green" width="50" height="50" />
                      </div>
                  </Grid>  
  
  
                <Grid item sm={6} xs={12}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    name="feedingSchedule"
                    fullWidth
                    type="text"
                    label="feedingSchedule *"
                    {...getFieldProps("feedingSchedule")}
                    error={Boolean(touched.feedingSchedule && errors.feedingSchedule)}
                    helperText={touched.feedingSchedule && errors.feedingSchedule}
                  />
                  <Icon icon="icon-park:schedule" color="green" width="50" height="50" />
                  </div>
                </Grid>
  
                <Grid item sm={6} xs={12}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    name="price"
                    fullWidth
                    type="text"
                    label="price *"
                    {...getFieldProps("price")}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                 <Icon icon="material-symbols:price-change" color="green" width="50" height="50" />
  
                  </div>
                </Grid>
  
                <Grid item sm={4} xs={12}>
                  <TextField
                    name="quantity"
                    fullWidth
                    type="text"
                    label="quantity *"
                    {...getFieldProps("quantity")}
                    error={Boolean(touched.quantity && errors.quantity)}
                    helperText={touched.quantity && errors.quantity}
                  />
                </Grid>
  
                <Grid item xs={12} className={classes.grid}>
                  <Grid item sm={3} xs={12}>
                    <LoadingButton
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Submit
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </fieldset>
      </div>
    );
  }
  