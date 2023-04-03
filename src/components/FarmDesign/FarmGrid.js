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
          <span>{plant.plant.quantity} </span>
            {plant.plant.name}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 69, marginLeft: "auto" }}
        image={plant.plant.image}
        alt={plant.plant.name}
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
  onClick,
  setCoordinates,
}) => {
  console.log("h2", plant);
  const [image] = useImage(plant?.plant.image);

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
  const farm = location?.state?.farm;
  const Navigate = useNavigate();
  const [state, setState] = React.useState({
    right: false,
  });
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = React.useState({ x: 0, y: 0 });

  const rows = 6;
  const cols = 6;
  const cellWidth = 100;
  const cellHeight = 100;

  const [updatedPlants, setUpdatedPlants] = React.useState(farm?.plants);

  console.log("h1", updatedPlants);

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
    const handlePlantClick = (plant) => {
      updatedFarm(plant);
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
            <PlantListItem plant={plant} onClick={handlePlantClick} />
          ))}
        </List>
      </Box>
    );
  };

  const handleSave = () => {
    const updatedFarm = {
      ...farm,
      plants: updatedPlants,
    };
    console.log(updatedFarm);

    dispatch(updateFarm(updatedFarm, farm._id)).then(() => {
      Navigate("/ManageMyFarm/FarmsDetail");
    });
    
  };

  const [image, setImage] = useState(new window.Image());
  React.useEffect(() => {
    const img = new window.Image();
    img.src =
      "https://static.vecteezy.com/system/resources/previews/007/984/827/original/ground-seamless-texture-game-ui-for-the-game-farm-brown-background-of-cultivated-land-vector.jpg";
    img.width = 600;
    img.height = 600;
      setImage(img);
  }, []);

               
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
      >
        <Layer>
        <Image x={0} y={0} image={image} />
          {[...Array(rows * cols)].map((_, index) => {
            const rowIndex = Math.floor(index / cols);
            const colIndex = index % cols;
            const plant = updatedPlants?.find(
              (p) => p.position.x === rowIndex && p.position.y === colIndex
            );
            return (
              <GridCell
                key={`${rowIndex}-${colIndex}`}
                x={rowIndex}
                y={colIndex}
                cellWidth={cellWidth}
                cellHeight={cellHeight}
                plant={plant}
                onClick={toggleDrawer("right", true)}
                setCoordinates={setCoordinates}
              />
            );
          })}
        </Layer>
      </Stage>

      <Button variant="primary" className={classes.Savebutton}   onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}