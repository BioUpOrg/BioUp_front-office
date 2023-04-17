import React, { useState, useCallback, useEffect } from "react";
import { TextField, Grid, Paper , Typography} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";

import { addFarm } from "../../..//store/farms";
import useStyles from "./style";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import AffectPlantToFarmModal from '../../../components/modals/AffterPlantToFarmModal';
import AffectAnimalToFarmModal from '../../../components/modals/AffectAnimalToFarmModal';
import { Icon } from '@iconify/react';
import MapPage from "./Map";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Card, CardContent, CardMedia } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

export default function AddFarm(){
  const classes = useStyles();
  const dispatch = useDispatch();
  const [latLng, setLatLng] = useState(null);
  const [area, setArea] = useState(null);

  function handleMapClick(latLng) {
    setLatLng(latLng);
    formik.setFieldValue("latitude", latLng.lat);
    formik.setFieldValue("longitude", latLng.lng);
  }

  function handleAreaChange(newArea) {
    setArea(newArea);
    formik.setFieldValue("area", newArea);
  };

  const [showAlert, setShowAlert] = useState(false);

  const userId = useSelector((state) => state.entities.users.userId);


  const EventSchema = Yup.object().shape({
    name: Yup.string().required("Le nom de la formation est obligatoire"),
    latitude: Yup.string().required("La latitude est obligatoire"),
    longitude: Yup.string().required("La longitude est obligatoire"),
    area: Yup.string().required("L'aire est obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      latitude: "",
      longitude: "",
      area: "",
      type: "",
      plants: [],

    },
    validationSchema: EventSchema,
    onSubmit: async (data) => {

      const plantData = selectedPlants.reduce((plants, plant) => {
        for (let i = 0; i < plant.quantity; i++) {
          plants.push({ plant: plant._id });
        }
        return plants;
      }, []);

      const animalData = selectedAnimals.reduce((animals, animal) => {
        for (let i = 0; i < animal.quantity; i++) {
          animals.push({ animal: animal._id });
        }
        return animals;
      }, []);


      const farmData = {
        ...data,
        user: userId,
        plants: plantData,
        animals: animalData,

      };
      dispatch(addFarm(farmData))
        .then(() => {
          setShowAlert(true);
        })
        .then(() => {
          formik.resetForm();
          setSelectedPlants([]);
          setSelectedAnimals([]);
        })
        .then(() => {
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
        }); 
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, setValues } = formik;

  

  const [selectedPlants, setSelectedPlants] = useState([]);
  

  const handleSelectedPlantsChange =  (plants) => {
     setSelectedPlants(plants);

  };

  const [selectedAnimals, setSelectedAnimals] = useState([]);
  

  const handleSelectedAnimalsChange =  (animals) => {
    setSelectedAnimals(animals);

  };


  const [state, setState] = React.useState({

    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
     <AffectPlantToFarmModal onSelectedPlantsChange={handleSelectedPlantsChange}/>
     <AffectAnimalToFarmModal onSelectedAnimalsChange={handleSelectedAnimalsChange}/>

    </Box>
  );


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  
  const selectedPlantsJSX = selectedPlants.map((plant) => (
    <div key={plant._id} style={{ display: 'flex', alignItems: 'center' }}>
      <Card sx={{ display: 'flex' }} style={{paddingTop:"20px", marginRight:"10px"}}>
        <CardMedia
          component="img"
          sx={{ width: 70 }}
          image={plant.image}
          alt={plant.name}
        />
      </Card>

    </div>
  ));


  const selectedAnimalsJSX = selectedAnimals.map((animal) => (
    <div key={animal._id} style={{ display: 'flex', alignItems: 'center' }}>
      <Card sx={{ display: 'flex' }} style={{paddingTop:"20px", marginRight:"10px"}}>
        <CardMedia
          component="img"
          sx={{ width: 70 }}
          image={animal.image}
          alt={animal.name}
        />
      </Card>

    </div>
  ));






  return (
    <div>
      <fieldset className={classes.fieldset}>
        <legend className={classes.legend}></legend>
        {showAlert && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Farm added successfully
          </Alert>
        )}
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={4} className={classes.root}>
              
              <Grid item sm={6} xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>

                <TextField
                  name="name"
                  fullWidth
                  type="text"
                  label="Name *"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Icon icon="dashicons:nametag" color="green" width="50" height="50" />

               </div>
              </Grid>

              <Grid item sm={6} xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>

                <TextField
                  name="type"
                  fullWidth
                  type="text"
                  label="type"
                  {...getFieldProps("type")}
                />
              <Icon icon="mdi:farm" color="green" width="50" height="50" />

              </div>          
              </Grid>




              <Grid item sm={12} xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1">Location:</Typography>     
                    <Icon onClick={handleClickOpen} icon="gis:map-search" color="green" width="50" height="50" />
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        style={{ zIndex: 20 }}
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Farm Location"}
                        </DialogTitle>
                        <DialogContent style={{width:"800px" , height:"300px"}}>
                        <MapPage onMapClick={handleMapClick} onAreaChange={handleAreaChange} /> 
                        </DialogContent>

                      </Dialog>
                  
                </div>
              </Grid>

              <Grid item sm={6} xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>

                <TextField
                  name="longitude"
                  fullWidth
                  type="text"
                  label="longitude *"
                  {...getFieldProps("longitude")}
                  error={Boolean(touched.longitude && errors.longitude)}
                  helperText={touched.longitude && errors.longitude}
                />
                <Icon icon="mdi:longitude" color="green" width="50" height="50"
                
                />
                </div>
              </Grid>

              <Grid item sm={6} xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>

                <TextField
                  name="latitude"
                  fullWidth
                  type="text"
                  label="latitude *"
                  {...getFieldProps("latitude")}
                  error={Boolean(touched.latitude && errors.latitude)}
                  helperText={touched.latitude && errors.latitude}
                />
                <Icon icon="mdi:latitude" color="green" width="50" height="50" />
                </div>
              </Grid>

              <Grid item sm={8} xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>

                <TextField
                  name="area"
                  fullWidth
                  type="text"
                  label="area *"
                  {...getFieldProps("area")}
                  error={Boolean(touched.area && errors.area)}
                  helperText={touched.area && errors.area}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">(m²)</InputAdornment>,
                  }}
                />
                
                <Icon icon="gis:measure-area-alt" color="green" width="50" height="50" />
                </div>
              </Grid>

      
              <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', paddingBottom: '50px', paddingLeft: '50px' }}>
                  {selectedPlantsJSX}
                  {selectedAnimalsJSX}
                  </div>
                  <Stack direction="row" spacing={2} style={{paddingTop:"50px", paddingLeft:"50px"}}>
                    <Button variant="contained" onClick={toggleDrawer("right", true)} >Select From Stock</Button>

                    <SwipeableDrawer
                      anchor={"right"}
                      open={state["right"]}
                      onClose={toggleDrawer("right", false)}
                      onOpen={toggleDrawer("right", true)}
                      style={{ zIndex: 30 }}
                    >
                      {list("right")}
                    </SwipeableDrawer>
                  </Stack>
                </div>

               
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
