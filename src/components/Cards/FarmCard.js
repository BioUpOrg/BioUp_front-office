import * as React from 'react';
import { useState } from 'react';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function FarmCard({ farm }) {
    const [expanded, setExpanded] = useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader


          title={farm.name}
          subheader={`Location: ${farm.latitude}, Longitude: ${farm.longitude}`}
        />
       <CardMedia
          component="img"
          height="194"
          image="https://static.wixstatic.com/media/0e5dbb_8b662557450f4402976fcc88d26bd439~mv2.png/v1/fill/w_981,h_670,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/0e5dbb_8b662557450f4402976fcc88d26bd439~mv2.png"
          alt={farm.name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {farm.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Details:</Typography>
            <Typography paragraph>Size: {farm.size}</Typography>
            <Typography paragraph>Yield: {farm.yield}</Typography>
            <Typography paragraph>Price: {farm.price}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }