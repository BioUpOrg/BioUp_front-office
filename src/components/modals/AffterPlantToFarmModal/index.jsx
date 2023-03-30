import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useDispatch, useSelector } from "react-redux";


export default function AffectPlantToFarmModal({onSelectedPlantsChange}) {

    const plants = useSelector(state => state.entities.plants.list);
  
    console.log(plants);

    
    const [selectedPlants, setSelectedPlants] = React.useState([]);
    const handleCardClick = (plantId) => {
      const index = selectedPlants.indexOf(plantId);
      if (index === -1) {
        // Plant is not selected, add it to the array
        setSelectedPlants([...selectedPlants, plantId]);
      } else {
        // Plant is already selected, remove it from the array
        const newSelectedPlants = [...selectedPlants];
        newSelectedPlants.splice(index, 1);
        setSelectedPlants(newSelectedPlants);
      }
      onSelectedPlantsChange(selectedPlants);
    };

  return (
    <div>
      {plants.map((plant) => (
        <Card key={plant._id} sx={{ display: 'flex' }} style={{paddingTop:"20px"}} onClick={() => handleCardClick(plant._id)}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {plant.name}
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={plant.image}
            alt={plant.name}
          />
        </Card>
      ))}
    </div>
  );
}

