import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  useSelector } from "react-redux";


export default function AffectAnimalToFarmModal({ onSelectedAnimalsChange , element}) {
  const animals = useSelector((state) => state.entities.animals.list);
  const userId = useSelector((state) => state.entities.users.userId);
  const userAnimals = animals.filter((animal) => animal.user === userId);


  const [selectedAnimals, setSelectedAnimals] = React.useState(element || [] );
  console.log("selectedAnimals", selectedAnimals);

  const handleCardClick = (animal) => {
    const index = selectedAnimals.findIndex((p) => p._id === animal._id);

    if (index === -1) {
      // Animal is not selected, add it to the array
      setSelectedAnimals([...selectedAnimals, animal]);
    } else {
      // Animal is already selected, remove it from the array
      const newSelectedAnimals = [...selectedAnimals];
      newSelectedAnimals.splice(index, 1);
      setSelectedAnimals(newSelectedAnimals);
    }
  };

  React.useEffect(() => {
    onSelectedAnimalsChange(selectedAnimals);
  }, [selectedAnimals, onSelectedAnimalsChange]);

  return (
    <div>
      {userAnimals.map((animal) => (
        <Card
          key={animal._id}
          sx={{ display: "flex" }}
          style={{ marginTop: "3px" }}
          onClick={() => handleCardClick(animal)}
        >
         <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {animal.name}
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 80, marginLeft: "auto" }}
            image={animal.image}
            alt={animal.name}
          />
        </Card>
      ))}
    </div>
  );
}

