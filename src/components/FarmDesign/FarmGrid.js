import { useState } from "react";
import { Stage, Layer, Image, Rect } from "react-konva";
import * as React from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function SimpleDialog(props) {
  const { onClose, open, handleCardClick } = props;
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => {
    onClose(selectedImage);
    setSelectedImage(null); // Reset selectedImage state

  };

  const handleCardClickAndClose = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose Element From your Farm : </DialogTitle>
      <Card sx={{ maxWidth: 100 }}>
        <CardActionArea onClick={() => handleCardClickAndClose("https://konvajs.org/assets/lion.png")}>
          <CardMedia
            component="img"
            height="140"
            image="https://konvajs.org/assets/lion.png"
            alt="Lion"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lion
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 100 }}>
        <CardActionArea onClick={() => handleCardClickAndClose("https://static1.squarespace.com/static/5c05e24636099be8c82c8a7e/t/5c05e34a40ec9a678db48f0b/1676906360868/")}>
          <CardMedia
            component="img"
            height="140"
            image="https://static1.squarespace.com/static/5c05e24636099be8c82c8a7e/t/5c05e34a40ec9a678db48f0b/1676906360868/"
            alt="Lion"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Cow
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Dialog>
  );
}



const Grid = ({ rows, cols, cellWidth, cellHeight }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const [images, setImages] = useState(() => {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => null)
    );
  });

  const [selectedCell, setSelectedCell] = useState(null);

  const handleCardClick = (imageUrl) => {
    console.log("imageUrl", imageUrl);
    setSelectedValue(imageUrl);
    setOpen(false);
  };

  const handleClickOpen = (rowIndex, colIndex) => {
    console.log("rowIndex", rowIndex, "colIndex", colIndex);
    setSelectedCell({ rowIndex, colIndex });
    setOpen(true);
  };

  const handleClose = (imageUrl) => {
    setOpen(false);
    console.log(images);
    if (selectedCell !== null) {
      // Fetch the image
      const img = new window.Image();
      img.src = imageUrl;
      img.onload = () => {
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[selectedCell.rowIndex][selectedCell.colIndex] = img;
          return newImages;
        });
        setSelectedCell(null);
      };
    }
  };

  return (
    <>
      <Stage width={cols * cellWidth} height={rows * cellHeight}>
        <Layer>
          {[...Array(rows)].map((_, rowIndex) =>
            [...Array(cols)].map((_, colIndex) => (
              <Rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * cellWidth}
                y={rowIndex * cellHeight}
                width={cellWidth}
                height={cellHeight}
                stroke="black"
                onClick={() => handleClickOpen(rowIndex, colIndex)}
              ></Rect>
            ))
          )}
          {images.map((row, rowIndex) =>
            row.map((image, colIndex) => {
              if (image) {
                return (
                  <Image
                    key={`${rowIndex}-${colIndex}`}
                    x={colIndex * cellWidth}
                    y={rowIndex * cellHeight}
                    width={cellWidth}
                    height={cellHeight}
                    image={image}
                  />
                );
              }
              return null;
            })
          )}
        </Layer>
      </Stage>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        handleCardClick={handleCardClick}
      />
    </>
  );
};

export default function FarmGrid() {
  return <Grid rows={5} cols={5} cellWidth={100} cellHeight={100} />;
}
