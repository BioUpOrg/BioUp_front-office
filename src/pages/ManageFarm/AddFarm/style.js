/* eslint-disable import/no-unresolved */
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: 32
  },
  grid: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
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

  deviseStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4
  },
  imagePlace: {
    width: '100%',
    borderRadius: 5,
    height: 250
  },
  imagePicker: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    border: 'solid',
    borderWidth: 1,
    color: 'lightgray',
    borderColor: 'lightgray',
    cursor: 'pointer',
    borderRadius: 5,
    height: 250,
    '&:hover': {
      color: 'black'
    }
  }
}));

export default useStyles;
