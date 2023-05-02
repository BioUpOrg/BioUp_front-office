import { Slider, withStyles } from '@material-ui/core';

const GreenSlider = withStyles({
  root: {
    color: '#DEF9EC',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#3BB77E',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: 'black', 
    },
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
    opacity: 1,
  },
})(Slider);

export default GreenSlider;
