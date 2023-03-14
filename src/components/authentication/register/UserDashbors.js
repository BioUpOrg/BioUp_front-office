import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import  { useState, useEffect } from 'react';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function UserDashbord() {

  const classes = useStyles();
  const [user, setUser] = useState({});

  //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwYWM3ZDZiYWVlYmQ0MWQxZjY3OTciLCJlbWFpbCI6ImFyZXNiZW5hcmVzQGdtYWlsLmNvbSIsInBob25lIjoiIiwiZmlyc3ROYW1lIjoiYXJlcyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc4ODE0MzM0fQ.U_1XlhAgIsoeZiM8xelu7YZv_s7wXs8p-WgEEzzu10k"

  const token =  localStorage.getItem("TOKEN_KEY");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(' http://localhost:3000/users/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => {
            console.log(response.data)
            setUser(response.data);
          })
          .catch(error => {
             console.error(error);
          });
        
      } catch (error) {
       
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar} src="user-avatar.png" alt="User Avatar" />
            <Typography variant="h5" component="h2" gutterBottom>
            {user.firstName}
            </Typography>
            <Typography variant="body1" component="p">
                    {user.email}
            </Typography>
            <Typography variant="body1" component="p">
              Joined: January 2022
            </Typography>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit Profile
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="h6" component="h3" gutterBottom>
              About Me
            </Typography>
            <Typography variant="body1" component="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod dapibus enim at
              sagittis. Proin tempor elit vel magna suscipit, eget finibus nisl bibendum. Praesent
              vel dui in metus maximus vestibulum. Suspendisse et velit orci.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserDashbord;
