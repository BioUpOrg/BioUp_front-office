import * as React from "react";
import { Box, Grid, Paper } from "@material-ui/core";

import PlantCard from "../../../components/Cards/PlantCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlants } from "../../..//store/plants";

export default function PlantDetails() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlants());
  }, [dispatch]);
  const plants = useSelector((state) => state.entities.plants.list);


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
            All My Plants
          </h1>
          <Grid container spacing={2}>
            {plants.map((plant) => (
              <Grid key={plant._id} item xs={12} sm={6} md={4}>
                <PlantCard plant={plant} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}
