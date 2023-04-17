import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  useSelector } from "react-redux";


export default function AffectPlantToFarmModal({ onSelectedPlantsChange , element}) {
  const plants = useSelector((state) => state.entities.plants.list);

  const userId = useSelector((state) => state.entities.users.userId);

  const userPlants = plants.filter((plant) => plant.user === userId);
  
  const [selectedPlants, setSelectedPlants] = React.useState(element || [] );
  console.log("selectedPlants", selectedPlants);

  const handleCardClick = (plant) => {
    const index = selectedPlants.findIndex((p) => p._id === plant._id);

    if (index === -1) {
      // Plant is not selected, add it to the array
      setSelectedPlants([...selectedPlants, plant]);
    } else {
      // Plant is already selected, remove it from the array
      const newSelectedPlants = [...selectedPlants];
      newSelectedPlants.splice(index, 1);
      setSelectedPlants(newSelectedPlants);
    }
  };

  React.useEffect(() => {
    onSelectedPlantsChange(selectedPlants);
  }, [selectedPlants, onSelectedPlantsChange]);

  return (
    <div>
      {userPlants.map((plant) => (
        <Card
          key={plant._id}
          sx={{ display: "flex" }}
          style={{ marginTop: "3px" }}
          onClick={() => handleCardClick(plant)}
        >
         <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {plant.name}
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 80, marginLeft: "auto" }}
            image={plant.image}
            alt={plant.name}
          />
        </Card>
      ))}
    </div>
  );
}

