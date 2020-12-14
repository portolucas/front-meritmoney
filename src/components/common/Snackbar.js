import React, { createContext, useContext } from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import forOwn from 'lodash/forOwn';
import get from 'lodash/get';

export const SnackBarContext = createContext();
const SnackBarProvider = SnackBarContext.Provider;

const useStyles = makeStyles(theme => ({
  root: {
    top: 48
  },
  success: {
    backgroundColor: '#007E7A'
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    flexWrap: 'nowrap'
  }
}));

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

export default function SnackBar({ children }) {
  const [state, setState] = React.useState({
    open: false,
    message: '',
    variant: 'error'
  });

  const classes = useStyles();
  const Icon = variantIcon[state.variant];

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setState(oldState => ({ ...oldState, open: false }));
  };

  return (
    <SnackBarProvider value={[setState]}>
      <Snackbar
        className={classes.root}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={state.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          className={clsx(classes.content, classes[state.variant])}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
              <div className={classes.messages}>
                {Array.isArray(state.message)
                  ? state.message.map((item, i) => <p key={i}>{item}</p>)
                  : state.message}
              </div>
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
      {children}
    </SnackBarProvider>
  );
}

export function useSnackBar() {
  const [setState] = useContext(SnackBarContext);

  const setSnackBarHttpSuccess = message => {
    setState({ open: true, message: message, variant: 'success' });
  };

  const setSnackBarHttpWarning = message => {
    setState({ open: true, message: message, variant: 'warning' });
  };

  const setSnackbarHttpError = (error, customError) => {
    if (customError) {
      return setState({
        open: true,
        message: customError,
        variant: 'error'
      });
    }

    let errorData = get(error, 'response.data', []);
    let errorStatus = get(error, 'response.status', null);

    if (errorStatus >= 500) {
      return setState({
        open: true,
        message: 'An unexpected error occurrred.',
        variant: 'error'
      });
    }

    if (Array.isArray(errorData)) {
      return setState({
        open: true,
        message: errorData.map(item => item),
        variant: 'error'
      });
    }

    const errorMessage = [];

    forOwn(errorData, (vals, key) => {
      if (Array.isArray(vals)) {
        vals.forEach(val => {
          if (typeof val === 'string') {
            errorMessage.push(`${key}: ${val}`);
          } else {
            forOwn(val, (v, k) => {
              errorMessage.push(`${key}: ${k}: ${v}`);
            });
          }
        });
      } else {
        if (typeof vals === 'string') {
          errorMessage.push(`${vals}`);
        } else {
          forOwn(vals, (v, k) => {
            if (Array.isArray(v)) {
              v.forEach(val => {
                if (typeof val === 'string') {
                  errorMessage.push(`${k}: ${val}`);
                } else {
                  forOwn(val, (vv, kk) => {
                    errorMessage.push(`${k}: ${kk}: ${vv}`);
                  });
                }
              });
            } else {
              if (typeof v === 'string') errorMessage.push(`${k} ${v}`);
            }
          });
        }
      }
    });
    setState({ open: true, message: errorMessage, variant: 'error' });
  };

  const setSnackBarError = errorMessage => {
    setState({ open: true, message: errorMessage, variant: 'error' });
  };

  return { setSnackBarHttpSuccess, setSnackBarHttpWarning, setSnackbarHttpError, setSnackBarError };
}
