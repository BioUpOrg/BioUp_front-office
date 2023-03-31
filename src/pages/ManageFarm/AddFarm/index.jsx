import React, { useState, useCallback, useEffect } from "react";
import { TextField, Grid, Paper } from "@mui/material";
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



export default function AddFarm() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);

  const userId = useSelector((state) => state.entities.users.userId);


  


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

      const farmData = {
        ...data,
        user: userId,
        plants: plantData,

      };
      dispatch(addFarm(farmData))
        .then(() => {
          setShowAlert(true);
        })
        .then(() => {
          formik.resetForm();
          setSelectedPlants([]);
        })
        .then(() => {
          setTimeout(() => {
            setShowAlert(false);
          }, 5000);
        });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, setValues } = formik;

  

  const [selectedPlants, setSelectedPlants] = useState([]);

  const handleSelectedPlantsChange = (plants) => {
    setSelectedPlants(plants);
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
    </Box>
  );



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
                <TextField
                  name="type"
                  fullWidth
                  type="text"
                  label="type"
                  {...getFieldProps("type")}
                />
              </Grid>

              <Grid item sm={4} xs={12}>
                <TextField
                  name="longitude"
                  fullWidth
                  type="text"
                  label="longitude *"
                  {...getFieldProps("longitude")}
                  error={Boolean(touched.longitude && errors.longitude)}
                  helperText={touched.longitude && errors.longitude}
                />
              </Grid>

              <Grid item sm={4} xs={12}>
                <TextField
                  name="latitude"
                  fullWidth
                  type="text"
                  label="latitude *"
                  {...getFieldProps("latitude")}
                  error={Boolean(touched.latitude && errors.latitude)}
                  helperText={touched.latitude && errors.latitude}
                />
              </Grid>

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

                <p>{selectedPlants._id}</p>

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
