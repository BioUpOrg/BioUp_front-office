import React, { useState, useEffect } from "react";
import { TextField, Grid, Paper , Typography} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { Icon } from '@iconify/react';
import useStyles from "./style";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { updateFarm } from "../../../store/farms";
import MapPage from "../../../pages/ManageFarm/AddFarm/Map";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import AffectPlantToFarmModal from "../AffterPlantToFarmModal";
import { Card, CardContent, CardMedia } from '@mui/material';

export default function UpdateFarmModal({ element }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedPlants, setSelectedPlants] = useState([]);

  const [state, setState] = React.useState({right: false,});
  const [open, setOpen] = React.useState(false);

  const [latLng, setLatLng] = useState(null);

  console.log("e1",element.plants);

  function getSelectedPlants(plantData) {
    const selectedPlants = {};
    plantData.forEach((data) => {
      const plantId = data.plant._id; // Access the plant ID from the plant object
      if (!selectedPlants[plantId]) {
        // Create a new plant object if it doesn't exist
        selectedPlants[plantId] = { ...data.plant };
        selectedPlants[plantId].quantity = 1;
      } else {
        // Increment the quantity of an existing plant object
        selectedPlants[plantId].quantity += 1;
      }
    });
    // Return an array of plants with the total quantity
    return Object.values(selectedPlants);
  }
  
  const ExistingPlant = getSelectedPlants(element.plants);

  console.log("e2",ExistingPlant);

  const removePlants = () => {
    setSelectedPlants([]);
  };




  function handleMapClick(latLng) {
    setLatLng(latLng);
    formik.setFieldValue("latitude", latLng.lat);
    formik.setFieldValue("longitude", latLng.lng);
  }



  const [showAlert, setShowAlert] = useState(false);

  const EventSchema = Yup.object().shape({
    name: Yup.string().required("Le nom de la formation est obligatoire"),
    latitude: Yup.string().required("La latitude est obligatoire"),
    longitude: Yup.string().required("La longitude est obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      latitude: "",
      longitude: "",
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
      data.plants = plantData;



      dispatch(updateFarm(data, element._id))
        .then(() => {
          setShowAlert(true);
        })
        .then(() => {
          resetForm();
        })
        .then(() => {
          setTimeout(() => {
            setShowAlert(false);
          }, 5000);
        });
    },
  });

  useEffect(() => {
    setValues({
      name: element?.name,
      type: element?.type,
      longitude: element?.longitude,
      latitude: element?.latitude,
      plants: element?.plants,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element]);

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setValues,
    setTouched,
  } = formik;

  const resetForm = () => {
    setValues({
      name: "",
      latitude: "",
      longitude: "",
      type: "",
    });
    setTouched({
      name: false,
      latitude: false,
      longitude: false,
      type: false,
    });
  };




  const handleSelectedPlantsChange =  (plants) => {
    setSelectedPlants(plants);

 };







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
     <AffectPlantToFarmModal onSelectedPlantsChange={handleSelectedPlantsChange} element={ExistingPlant} />
    </Box>
  );



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



  return (
    <div>
      <fieldset className={classes.fieldset}>
        <legend className={classes.legend}></legend>
        {showAlert && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Farm Updated successfully
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

              <Grid item sm={4} xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1">Location:</Typography>     
                    <Icon onClick={handleClickOpen} icon="gis:map-search" color="green" width="50" height="50" />
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        style={{ zindex: 20 }}
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Farm Location"}
                        </DialogTitle>
                        <DialogContent style={{width:"800px" , height:"300px"}}>
                        <MapPage onMapClick={handleMapClick} /> 
                        </DialogContent>

                      </Dialog>
                  
                </div>
              </Grid>



              <Grid item sm={4} xs={12}>
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

              <Grid item sm={4} xs={12}>
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





              <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', paddingBottom: '50px', paddingLeft: '50px' }}>
                    {selectedPlantsJSX}
                  </div>
                  <Stack direction="row" spacing={2} style={{paddingTop:"50px", paddingLeft:"50px"}}>
                    <Button variant="contained" onClick={toggleDrawer("right", true)} >Select Plants</Button>
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
                    Update
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
