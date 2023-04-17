import * as React from "react";
import { Box, Grid, Paper } from "@material-ui/core";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnimals } from "../../../store/animals";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import AnimalCard from "../../../components/cards/AnimalCard";


export default function AnimalDetails() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.entities.users.userId);

  useEffect(() => {
    dispatch(getAnimals());
  }, [dispatch]);
  const animals = useSelector((state) => state.entities.animals.list);
  const userAnimals = animals.filter((animal) => animal.user === userId);

  const pageSize = 2;
  const pageCount = Math.ceil(userAnimals.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const currentAnimals = userAnimals.slice(startIdx, endIdx);


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
            Animals
          </h1>
          <Grid container spacing={2}>
            {currentAnimals.map((animal) => (
              <Grid key={animal._id} item xs={12} sm={6} md={3}>
                <AnimalCard animal={animal} />
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
