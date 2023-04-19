import * as React from 'react';
import { useState } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { getPlants,deletePlant } from '../../store/plants';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import UpdatePlantModal from '../modals/EditPlantModal';
import Swal from 'sweetalert2';


export default function PlantCard({ plant }) {
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();


  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    const handleDelete = async () => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this plant!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });
      if (result.isConfirmed) {
        dispatch(deletePlant(plant._id)).then(() => {
          dispatch(getPlants());
      });
        Swal.fire(
          'Deleted!',
          'Your plant has been deleted.',
          'success'
        );
      }

      
  };




  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };


  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);



//Plant Form

const [openForm, setOpenForm] = React.useState(false);

const handleClickOpenForm = () => {
  setOpenForm(true);
};

const handleCloseForm = () => {
  setOpenForm(false);
};





    return (
      <Card sx={{ maxWidth: 250, width: 250 }}>
        <CardHeader
        action={
          <IconButton aria-label="settings">
            
             <Stack direction="row" spacing={2}>

                <div>
                    <MoreVertIcon 
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    />
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                            >
                              <MenuItem onClick={handleClickOpenForm}>Update</MenuItem>

                              <Dialog
                              open={openForm}
                              onClose={handleCloseForm}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">
                                {"Update Plant"}
                              </DialogTitle>
                              <DialogContent>
                               <UpdatePlantModal element={plant } />
                              </DialogContent>
      
                            </Dialog>

                              <MenuItem onClick={handleDelete}>Delete</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </Stack>
          </IconButton>
        }

          title={plant.name}
        />
        <CardMedia
          component="img"
          height="200" // set a fixed height for all cards
          image={plant.image}
          alt={plant.name}
          style={{width: "70%", height: "auto"}}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
             sunlightNeeds: {plant.sunlightNeeds}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>

          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >View Details
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Details:</Typography>
            <Typography paragraph>MatureHeight: {plant.matureHeight}</Typography>
            <Typography paragraph>MatureWidth: {plant.matureWidth}</Typography>
            <Typography paragraph>SoilType: {plant.soilType}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }