import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import  { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import { format } from 'date-fns';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',

    '@media (max-width:768px)': {
      flexDirection: 'column',
      justifyContent: 'center'
    }
  },
  desc: {
    fontSize: 14,
    paddingBottom: 8,
    color: 'grey',
    textAlign: 'center'
  },

  title: {
    textAlign: 'left',
    paddingBottom: 32
  },
  SubTitle: {
    fontFamily: 'monospace',

    textAlign: 'left'
  },

  fieldset: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    border: 'none',
    boxShadow: '0px 0px 2px 0px rgba(0,0,0,1)',
    borderRadius: 20
  },
  legend: {
    backgroundColor: '#00AB55',
    padding: '0.75rem',
    fontSize: '1.3rem',
    color: 'white',
    textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
    transform: 'translateX(-0.5rem)',
    boxShadow: '-1px 1px 1px rgba(0,0,0,0.8)'
  },
  boxWrapper: {
    padding: 8
  },
  TitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    wordBreak: 'break-all'
  },
  additionalInfo: {
    borderRadius: 10
  },
  img: {
    display: 'flex',
    borderRadius: 2,
    padding: 10,
    objectFit: 'contain',
    height: 250
  }
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
    <div className={classes.header}>

      <h1 className={classes.title}>
        Date de création :{' '}
        {user.createdAt  && format(new Date(user?.createdAt), 'dd/MM/yyyy')}
      </h1>
    </div>

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <Paper
            elevation={3}
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '90%'
            }}
          >
            {user?.pic ? (
              <img src={user?.pic} alt={user?.firstName} className={classes.img} />
            ) : (
              <Icon icon="noto-v1:man-teacher" fontSize={120} className={classes.img} />
            )}
          </Paper>
        </Grid>
        <Grid item md={9} xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Paper>
                <fieldset className={classes.fieldset}>
                  <legend className={classes.legend}>Personal Informations</legend>
                  <div className={classes.boxWrapper}>
                    <div className={classes.TitleWrapper}>
                      <h3 style={{ width: '50%' }}>First Name</h3>
                      <div style={{ width: '30%' }}>
                        <p>{user?.firstName}</p>
                      </div>
                    </div>
                    <div className={classes.TitleWrapper}>
                      <h3 style={{ width: '50%' }}>Last Name</h3>
                      <div style={{ width: '30%' }}>
                        <p>{user?.lastName}</p>
                      </div>
                    </div>
                    <div className={classes.TitleWrapper}>
                      <h3 style={{ width: '50%' }}>Gender</h3>
                      <div style={{ width: '30%' }}>
                        <p>
                             {user?.gender}
                        </p>
                      </div>
                    </div>
                    <div className={classes.TitleWrapper}>
                      <h3 style={{ width: '50%' }}>Status Activation</h3>
                      <div style={{ width: '30%' }}>
                      <Icon icon="ps:checked" color="green" width="40" height="40" />

                      </div>
                    </div>

                 
                  </div>
                </fieldset>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <fieldset className={classes.fieldset}>
                  <legend className={classes.legend}>Contact</legend>

                  <div className={classes.boxWrapper}>
                    <div className={classes.TitleWrapper}>
                      <h3 style={{ width: '50%' }}>Role</h3>
                      <div style={{ width: '30%' }}>
                        <p>{user?.role}</p>
                      </div>
                    </div>
                    <div className={classes.TitleWrapper}>
                      <h3 style={{ width: '50%' }}>E-mail</h3>
                      <div style={{ width: '30%' }}>
                        <p>{user?.email}</p>
                      </div>
                    </div>
                    <div className={classes.TitleWrapper}>
                      <h3 style={{ width: '50%' }}>Phone Number</h3>
                      <div style={{ width: '30%' }}>
                        <p>{user?.phoneNumber}</p>
                      </div>
                    </div>
                
                  </div>
                </fieldset>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </div>
  );
}

export default UserDashbord;
