import * as React from "react";
import { Box, Grid, Paper } from "@material-ui/core";

import FarmCard from "../../../components/Cards/FarmCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFarms } from "../../..//store/farms";

export default function FarmDetails() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.entities.users.userId);

  useEffect(() => {
    dispatch(getFarms());
  }, [dispatch]);
  const farms = useSelector((state) => state.entities.farms.list);

  const userFarms = farms.filter((farm) => farm.user === userId);

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
            Farms
          </h1>
          <Grid container spacing={2}>
            {userFarms.map((farm) => (
              <Grid key={farm._id} item xs={12} sm={6} md={4}>
                <FarmCard farm={farm} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}
