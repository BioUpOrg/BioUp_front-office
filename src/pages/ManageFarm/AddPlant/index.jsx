import React, { useState, useCallback, useEffect } from "react";
import { TextField, Grid, Paper } from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from '@iconify/react';
import { addPlant } from "../../..//store/plants";
import useStyles from "./style";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { plants } from './plants.js';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

export default function AddPlant() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);
  const userId = useSelector((state) => state.entities.users.userId);

  const EventSchema = Yup.object().shape({
    name: Yup.string().required("Le nom de la formation est obligatoire"),
    scientificName: Yup.string().required("La scientificName est obligatoire"),

  });


  const formik = useFormik({
    initialValues: {
      name: "",
      scientificName: "",
      growthPeriod: "",
      matureHeight: "",
      matureWidth: "",
      soilType: "",
      wateringNeeds: "",
      sunlightNeeds: "",
      temperatureRange: "",
      harvestTime: "",
      quantity: "",
      spacing: "",
      image: "",
    },
    validationSchema: EventSchema,
    onSubmit: async (data) => {
    //const imageUrl = await searchPhotos(data.scientificName);
        const imageUrl = getImageUrl(data.scientificName);
        data.image = imageUrl;
        data.user = userId;
      dispatch(addPlant(data))
        .then(() => {
          setShowAlert(true);
        })
        .then(() => {
          formik.resetForm();
        })
        .then(() => {
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
        }); 
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;


  function getImageUrl(plantName) {
    const plant = plants.plants.find(p => p.name.toLowerCase() === plantName.toLowerCase());
    return plant ? plant.image : '';
  }


  return (
    <div>
      <fieldset className={classes.fieldset}>
        <legend className={classes.legend}></legend>
        {showAlert && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Plant added successfully
          </Alert>
        )}
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={4} className={classes.root}>
              <Grid item sm={6} xs={12}>
                <TextField
                  data-testid="PlantNameInput"
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
                <TextField
                  data-testid="PlantscientificNameInput"
                  name="scientificName"
                  fullWidth
                  type="text"
                  label="scientificName"
                  {...getFieldProps("scientificName")}
                  error={Boolean(touched.scientificName && errors.scientificName)}
                  helperText={touched.scientificName && errors.scientificName}
                />
              </Grid>


              <Grid item sm={6} xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>

                <TextField
                  name="matureHeight"
                  fullWidth
                  type="text"
                  label="matureHeight *"
                  {...getFieldProps("matureHeight")}
                  error={Boolean(touched.matureHeight && errors.matureHeight)}
                  helperText={touched.matureHeight && errors.matureHeight}
                />
                <Icon icon="pixelarticons:human-height-alt" color="green" width="50" height="50" />
                </div>

              </Grid>

              <Grid item sm={6} xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  name="matureWidth"
                  fullWidth
                  type="text"
                  label="matureWidth *"
                  {...getFieldProps("matureWidth")}
                  error={Boolean(touched.matureWidth && errors.matureWidth)}
                  helperText={touched.matureWidth && errors.matureWidth}
                />
                <Icon icon="fluent:arrow-autofit-width-24-filled" color="green" width="50" height="50" />
                </div>
              </Grid>

              <Grid item sm={6} xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  name="growthPeriod"
                  fullWidth
                  type="text"
                  label="growthPeriod *"
                  {...getFieldProps("growthPeriod")}
                  error={Boolean(touched.growthPeriod && errors.longitude)}
                  helperText={touched.growthPeriod && errors.longitude}
                />
                <Icon icon="game-icons:stump-regrowth" color="green" width="50" height="50" />
                </div>
              </Grid>

              <Grid item sm={6} xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        name="soilType"
                        fullWidth
                        type="text"
                        label="soilType *"
                        {...getFieldProps("soilType")}
                        error={Boolean(touched.soilType && errors.soilType)}
                        helperText={touched.soilType && errors.soilType}
                    />
                    <Icon icon="iconoir:soil-alt" color="green" width="50" height="50" />
                    </div>
                </Grid>  


              <Grid item sm={6} xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  name="wateringNeeds"
                  fullWidth
                  type="text"
                  label="wateringNeeds *"
                  {...getFieldProps("wateringNeeds")}
                  error={Boolean(touched.wateringNeeds && errors.wateringNeeds)}
                  helperText={touched.wateringNeeds && errors.wateringNeeds}
                />
                <Icon icon="mdi:watering-can" color="green" width="50" height="50" />
                </div>
              </Grid>

              <Grid item sm={6} xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  name="sunlightNeeds"
                  fullWidth
                  type="text"
                  label="sunlightNeeds *"
                  {...getFieldProps("sunlightNeeds")}
                  error={Boolean(touched.sunlightNeeds && errors.sunlightNeeds)}
                  helperText={touched.sunlightNeeds && errors.sunlightNeeds}
                />
                <Icon icon="mdi:sun-wireless-outline" color="green" width="50" height="50" rotate={1} />

                </div>
              </Grid>

              <Grid item sm={4} xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  name="temperatureRange"
                  fullWidth
                  type="text"
                  label="temperatureRange *"
                  {...getFieldProps("temperatureRange")}
                  error={Boolean(
                    touched.temperatureRange && errors.temperatureRange
                  )}
                  helperText={
                    touched.temperatureRange && errors.temperatureRange
                  }
                />
                <Icon icon="mdi:temperature-auto" color="green" width="50" height="50" />
                </div>
              </Grid>

              <Grid item sm={4} xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  name="harvestTime"
                  fullWidth
                  type="text"
                  label="harvestTime *"
                  {...getFieldProps("harvestTime")}
                  error={Boolean(touched.harvestTime && errors.harvestTime)}
                  helperText={touched.harvestTime && errors.harvestTime}
                />
                <Icon icon="material-symbols:energy-program-time-used-outline" color="green" width="50" height="50" />
                </div>
              </Grid>
              <Grid item sm={4} xs={12}>
                <TextField
                  data-testid="PlantQtInput"
                  name="quantity"
                  fullWidth
                  type="text"
                  label="quantity *"
                  {...getFieldProps("quantity")}
                  error={Boolean(touched.quantity && errors.quantity)}
                  helperText={touched.quantity && errors.quantity}
                />
              </Grid>
                <Stack direction="row" spacing={4} style={{paddingTop:"50px", paddingLeft:"50px"}}>
                  <Link to={"/ManageMyFarm/FarmAI"}>
                          <Button variant="outlined" color="error" style={{ whiteSpace: 'nowrap' }}>

                            ADD Plant with IA Model
                          </Button>
                          </Link>

                    
                  </Stack>

              <Grid item xs={12} className={classes.grid}>
                <Grid item sm={3} xs={12}>
                  <LoadingButton
                    data-testid="AddPlantSubmitButton"
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
