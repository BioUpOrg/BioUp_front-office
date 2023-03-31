/* eslint-disable import/no-unresolved */
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({

container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px',
    },
    drawer: {
      width: '250px',
      flexShrink: 0,
    },
    list: {
      width: '100%',
      maxWidth: '360px',
    },
    button: {
      margin: '20px',
    },
    stage: {
      border: '1px solid black',
    },
    title:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '50px',
        marginTop: '100px',
    },
    Savebutton:{

        display:'block',
        margin: '0 auto',
        width: '500px',
        marginBottom: '100px',


    }
  }
));
export default useStyles;
