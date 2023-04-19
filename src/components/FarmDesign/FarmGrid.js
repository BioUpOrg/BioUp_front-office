import { Stage, Layer, Image, Rect } from "react-konva";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useImage } from "react-konva-utils";
import { Button } from "react-bootstrap";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { getFarms, updateFarm } from "../../store/farms";
import { useState, useCallback } from "react";
import  useStyles  from "./style"
import html2canvas from 'html2canvas';
import { useRef , useEffect } from "react";
import { Icon } from '@iconify/react';


function PlantListItem({ plant, onClick }) {
  return (
    <Card
      key={plant.plant._id}
      sx={{ display: "flex" }}
      style={{ marginTop: "3px" }}
      onClick={() => onClick(plant)}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {plant.plant.name}
          </Typography>

        </CardContent>
        <Typography component="div" variant="subtitle1" sx={{ color: "text.secondary",fontSize: "10px" }}>
            Position :[ {plant.position.x} ][ {plant.position.y} ]
          </Typography>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 79, marginLeft: "auto" }}
        image={plant.plant.image}
        alt={plant.plant.name}
      />
    </Card>
  );
}



function AnimalListItem({ animal, onClickAnimal }) {
  return (
    <Card
      key={animal.animal._id}
      sx={{ display: "flex" }}
      style={{ marginTop: "3px" }}
      onClick={() => onClickAnimal(animal)}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {animal.animal.name}
          </Typography>
        </CardContent>
        <Typography component="div" variant="subtitle1" sx={{ color: "text.secondary",fontSize: "10px" }}>
            Position :[ {animal.position.x} ][ {animal.position.y} ]
          </Typography>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 79, marginLeft: "auto" }}
        image={animal.animal.image}
        alt={animal.animal.name}
      />
    </Card>
  );
}


const GridCell = ({
  x,
  y,
  cellWidth,
  cellHeight,
  plant,
  animal,
  onClick,
  setCoordinates,
}) => {


  const [image] = useImage(plant?.plant?.image || animal?.animal?.image, 'Anonymous');


  

  const handleClick = () => {
    onClick(x, y);
    setCoordinates({ x, y });
  };

  return (
    <>
       <Rect
        x={x * cellWidth}
        y={y * cellHeight}
        width={cellWidth}
        height={cellHeight}
        stroke="black"
        strokeWidth={0.5}
        onClick={handleClick}
      />


      {image && (
        <Image
          image={image}
          x={x * cellWidth + cellWidth / 2 - 35}
          y={y * cellHeight + cellHeight / 2 - 35}
          width={60}
          height={60}
        />
      )}
    </>
  );
};

export default function FarmGrid() {
  const classes = useStyles();
  const location = useLocation();
  //const farm = location?.state?.farm;

 const [farm, setFarm] =React.useState(location?.state?.farm);
  const numberOfAppleTrees = location?.state?.numberOfAppleTrees;
  const Navigate = useNavigate();
  const [state, setState] = React.useState({
    right: false,
  });
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = React.useState({ x: 0, y: 0 });


console.log(numberOfAppleTrees)


let cols = numberOfAppleTrees.cols;
  let rows = numberOfAppleTrees.rows;

  const cellWidth = 100;
  const cellHeight = 100;

  const [updatedPlants, setUpdatedPlants] = React.useState(farm?.plants);
  const [updatedAnimals, setUpdatedAnimals] = React.useState(farm?.animals);



  const updatedFarm = (selectedPlant) => {
    const updated = updatedPlants.map((plant) => {
      if (plant === selectedPlant) {
        return {
          ...plant,
          position: {
            x: coordinates.x,
            y: coordinates.y,
          },
        };
      } else {
        return plant;
      }
    });
    setUpdatedPlants(updated);
  };


  const updatedFarmAnimal = (selectedAnimal) => {
    const updated = updatedAnimals.map((animal) => {
      if (animal === selectedAnimal) {
        return {
          ...animal,
          position: {
            x: coordinates.x,
            y: coordinates.y,
          },
        };
      } else {
        return animal;
      }
    });
    setUpdatedAnimals(updated);
  };








  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => {
    function handlePlantClick(plant) {
      setFarm((prevFarm) => {
        const plantIndex = prevFarm.plants.findIndex(p => p === plant);
        const newPlants = prevFarm.plants.filter((p, index) => index !== plantIndex);
        return {
          ...prevFarm,
          plants: newPlants,
        };
      });
      updatedFarm(plant);
      toggleDrawer(anchor, false);
    }

    const handleAnimalClick = (animal) => {
      setFarm((prevFarm) => {
        const animalIndex = prevFarm.animals.findIndex(p => p === animal);
        const newAnimals = prevFarm.animals.filter((p, index) => index !== animalIndex);
        return {
          ...prevFarm,
          animals: newAnimals,
        };
      });

      updatedFarmAnimal(animal);
      toggleDrawer(anchor, false);
    };


    return (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={() => toggleDrawer(anchor, false)}
        onKeyDown={() => toggleDrawer(anchor, false)}
      >
        <List>
          {farm?.plants?.map((plant) => (
            //Warning: Each child in a list should have a unique "key" prop
            <PlantListItem  plant={plant} onClick={handlePlantClick} />
          ))}
        </List>
        <List>
              {farm?.animals?.map((animal) => (
            <AnimalListItem animal={animal} onClickAnimal={handleAnimalClick} />
          ))}      
        </List>
      </Box>
    );
  };

  const handleSave = () => {
    const updatedFarm = {
      ...farm,
      plants: updatedPlants,
      animals: updatedAnimals,
    };

    dispatch(updateFarm(updatedFarm, farm._id)).then(() => {
      Navigate("/ManageMyFarm/FarmsDetail");
    });
    
  };

  const [image, setImage] = useState(new window.Image());
  React.useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'Anonymous';

    //img.src ="https://cdna.artstation.com/p/assets/images/images/048/850/940/medium/welld-v-location-forest.jpg?1651081928"
    img.src ="https://static.vecteezy.com/system/resources/previews/007/984/827/original/ground-seamless-texture-game-ui-for-the-game-farm-brown-background-of-cultivated-land-vector.jpg";
    img.width = cols * cellWidth;
    img.height = rows * cellHeight;
      setImage(img);
  }, []);


  const stageRef = useRef(null);




  const handleExportClick = () => {
    const stage = stageRef.current;  
    // use html2canvas to convert the stage to an image
    html2canvas(stage.container()).then(canvas => {
      // create a new canvas element to draw the original image and text on
      const finalCanvas = document.createElement('canvas');
      const finalContext = finalCanvas.getContext('2d');
  
      // set the dimensions of the final canvas to match the original image
      finalCanvas.width = canvas.width;
      finalCanvas.height = canvas.height;
  
      // draw the original image on the final canvas
      finalContext.drawImage(canvas, 0, 0);
  
      // add text to the final canvas
      finalContext.font = 'bold 20px Arial';
      finalContext.fillStyle = '#000';
      finalContext.fillText('My Farm', 20, 30);
  
      // create a temporary link to download the image
      const link = document.createElement('a');
      link.download = 'my-farm.png';
      link.href = finalCanvas.toDataURL();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  



            
  return (
    <div>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>

      {farm && <h1>Farm Name: {farm.name}</h1>}

      <Stage width={cols * cellWidth} height={rows * cellHeight}
        className={classes.title}
        ref={stageRef}
      >
        <Layer>
        <Image x={0} y={0} image={image} />
          {[...Array(rows * cols)].map((_, index) => {
            const rowIndex = Math.floor(index / cols);
            const colIndex = index % cols;
            const plant = updatedPlants?.find(
              (p) => p.position.x === rowIndex && p.position.y === colIndex
            );
            const animal = updatedAnimals?.find(
              (A) => A.position.x === rowIndex && A.position.y === colIndex
            );
            return (
              <GridCell
                key={`${rowIndex}-${colIndex}`}
                x={rowIndex}
                y={colIndex}
                cellWidth={cellWidth}
                cellHeight={cellHeight}
                plant={plant}
                animal={animal}
                onClick={toggleDrawer("right", true)}
                setCoordinates={setCoordinates}
              />
            );
          })}
        </Layer>
      </Stage>

      <div className={classes.buttonContainer}>
          <Button variant="primary" className={classes.Savebutton} onClick={handleSave}>
            Save
          </Button>
          <Icon icon="uil:file-download" color="green" width="50" height="50" onClick={handleExportClick}>
            Export
          </Icon>
        </div>
    </div>
  );
}