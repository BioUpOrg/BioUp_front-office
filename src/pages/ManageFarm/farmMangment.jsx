import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import AddFarm from '../ManageFarm/AddFarm'
import AddPlant from '../ManageFarm/AddPlant'
import AddAnimal from '../ManageFarm/AddAnimal'

import { getFarms } from "../..//store/farms";
import { getPlants } from "../..//store/plants";
import { getAnimals } from "../..//store/animals";

import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import Image from 'react-bootstrap/Image'; // Import Image component
import { useNavigate } from 'react-router-dom';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



export default function FarmMangment() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openPlant, setOpenPlant] = React.useState(false);

  const handleClickOpenPlant = () => {
    setOpenPlant(true);
  };

  const handleClosePlant = () => {
    setOpenPlant(false);
  };

  const [openAnimal, setOpenAnimal] = React.useState(false);

  const handleClickOpenAnimal = () => {
    setOpenAnimal(true);
  };

  const handleCloseAnimal = () => {
    setOpenAnimal(false);
  };




  const userId = useSelector((state) => state.entities.users.userId);

  useEffect(() => {
    dispatch(getFarms());
    dispatch(getPlants());
    dispatch(getAnimals());

  }, [dispatch]);
  const farms = useSelector(state => state.entities.farms.list);
  const plants = useSelector(state => state.entities.plants.list);
  const animals = useSelector(state => state.entities.animals.list);

  const userFarms = farms.filter((farm) => farm.user === userId);



  //const plants = 20;
 // const animals = 30;
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid xs>
          <Item>xs</Item>
        </Grid>
        <Grid xs={6}>
          <Item>
            <Grid container spacing={3}>
                <Grid xs>
                    <Item>
                <Image src="https://static.wixstatic.com/media/0e5dbb_8b662557450f4402976fcc88d26bd439~mv2.png/v1/fill/w_981,h_670,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/0e5dbb_8b662557450f4402976fcc88d26bd439~mv2.png" style={{width:"200px",height:"250px"}}></Image>
            <Button variant="outlined" onClick={handleClickOpen}>
                        Add Farm
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        style={{ zIndex: 20 }}
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Add Farm"}
                        </DialogTitle>
                        <DialogContent>
                          <AddFarm/>
                        </DialogContent>

                      </Dialog>
                  </Item>
                </Grid>
                <Grid xs>
                   <Item> 
                   <Image src="https://treedefi.com/images/seed.png" style={{width:"200px",height:"250px"}}></Image>
                   <Button variant="outlined" onClick={handleClickOpenPlant}>
                        Add Plant
                      </Button>
                      <Dialog
                        open={openPlant}
                        onClose={handleClosePlant}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        style={{ zIndex: 20 }}
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Add Plant"}
                        </DialogTitle>
                        <DialogContent>
                          <AddPlant/>
                        </DialogContent>

                      </Dialog>

            </Item>
                </Grid>
                <Grid xs>
                    <Item>
                    <Image src="https://i.pinimg.com/originals/82/5c/c1/825cc150e143b6e801bbfaf4b4dfee74.png" style={{width:"200px",height:"250px"}}></Image>
                    <Button variant="outlined" onClick={handleClickOpenAnimal}>
                        Add Animal
                      </Button>
                      <Dialog
                        open={openAnimal}
                        onClose={handleCloseAnimal}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        style={{ zIndex: 20 }}
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Add Animal"}
                        </DialogTitle>
                        <DialogContent>
                          <AddAnimal/>
                        </DialogContent>

                      </Dialog>
                  </Item>
                </Grid>
            </Grid>
          </Item>
                    <Item>
                        <Grid container spacing={3}>
                        <Grid item xs>
                            <Card onClick={() => navigate("FarmsDetail")}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                Farms
                                </Typography>
                                <Typography variant="h5" component="h2">
                                {userFarms.length}
                                </Typography>
                            </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs>
                            <Card onClick={() => navigate("PlantsDetail")}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                Plants
                                </Typography>
                                <Typography variant="h5" component="h2">
                                {plants.length}
                                </Typography>
                            </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs>
                            <Card onClick={() => navigate("AnimalsDetail")}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                Animals
                                </Typography>
                                <Typography variant="h5" component="h2">
                                {animals.length}
                                </Typography>
                            </CardContent>
                            </Card>
                        </Grid>
                        </Grid>
                    </Item>
        </Grid>
        <Grid xs>
          <Item>xs</Item>
        </Grid>
      </Grid>
    </Box>
    <br></br>
    <br></br>
    <br></br>
    </div>
    );
}
