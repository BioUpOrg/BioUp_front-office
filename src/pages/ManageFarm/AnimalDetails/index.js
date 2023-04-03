import * as React from "react";
import { Box, Grid, Paper } from "@material-ui/core";

import AnimalCard from "../../../components/Cards/AnimalCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnimals } from "../../..//store/animals";

export default function AnimalDetails() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnimals());
  }, [dispatch]);
  const animals = useSelector((state) => state.entities.animals.list);


  return (
    <div style={
      {
        paddingInline: "200px",
        paddingBottom: "200px",
        paddingTop: "100px",
      }
    }>
      <Box sx={{ flexGrow: 1 }}>
        <Paper variant="outlined" square>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "20px",
              paddingTop: "20px",
              color: "green",
            }}
          >
            All My Animals
          </h1>
          <Grid container spacing={2}>
            {animals.map((animal) => (
              <Grid key={animal._id} item xs={12} sm={6} md={4}>
                <AnimalCard animal={animal} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}
