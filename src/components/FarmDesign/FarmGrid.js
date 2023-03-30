import { Stage, Layer, Image, Rect } from "react-konva";
import * as React from "react";
import { useLocation } from "react-router-dom";
import { useImage } from "react-konva-utils";

const GridCell = ({ x, y, cellWidth, cellHeight, plant }) => {
  const [image] = useImage(plant?.plant.image);

  return (
    <>
      <Rect
        x={x * cellWidth}
        y={y * cellHeight}
        width={cellWidth}
        height={cellHeight}
        stroke="black"
      />
      {image && (
        <Image
          image={image}
          x={x * cellWidth}
          y={y * cellHeight}
          width={cellWidth}
          height={cellHeight}
        />
      )}
    </>
  );
};

const Grid = ({ rows, cols, cellWidth, cellHeight, farm }) => {
  const plants = farm?.plants;
  console.log("plants", plants);

  return (
    <>
      {farm && <h1>Farm Name: {farm.name}</h1>}

      <Stage width={cols * cellWidth} height={rows * cellHeight}>
        <Layer>
          {[...Array(rows)].map((_, rowIndex) =>
            [...Array(cols)].map((_, colIndex) => {
              const plant = plants?.find(
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
                />
              );
            })
          )}
        </Layer>
      </Stage>
    </>
  );
};

export default function FarmGrid() {
  const location = useLocation();
  const farm = location?.state?.farm;
  return (
    <Grid rows={6} cols={6} cellWidth={100} cellHeight={100} farm={farm} />
  );
}
