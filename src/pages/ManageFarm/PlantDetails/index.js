import * as React from "react";
import { Box, Grid, Paper } from "@material-ui/core";


import PlantCard from "../../../components/Cards/PlantCard"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlants } from "../../..//store/plants";
import { useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PlantDetails() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.entities.users.userId);

  useEffect(() => {
    dispatch(getPlants());
  }, [dispatch]);
  const plants = useSelector((state) => state.entities.plants.list);
  const userPlants = plants.filter((plant) => plant.user === userId);

  const pageSize = 2;
  const pageCount = Math.ceil(userPlants.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const currentPlants = userPlants.slice(startIdx, endIdx);






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
            Plants
          </h1>
          <Grid container spacing={2}>
            {currentPlants.map((plant) => (
              <Grid key={plant._id} item xs={12} sm={6} md={3}>
                <PlantCard plant={plant} /> 
              </Grid>
            ))}
          </Grid>
        </Paper>
        <Stack spacing={2} >
        <Pagination
                count={pageCount}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                variant="outlined"
                shape="rounded"
                color="primary"
              />
          </Stack>
      </Box>
    </div>
  );
}
