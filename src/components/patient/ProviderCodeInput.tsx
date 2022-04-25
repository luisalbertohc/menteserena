import { Button, Grid, makeStyles, Typography, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { api } from '@api';
import { useCognito } from '@components/context/AuthContext';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: '24px',
    marginBottom: theme.spacing(1.5),
    width: '100%',
  },
  buttonContainer: {
    color: theme.palette.grey[700],
    maxWidth: 312,
    '& > button': {
      height: 44,
      marginBottom: theme.spacing(7),
      fontSize: 14,
      fontWeight: 500,
      textTransform: 'capitalize',
    },
    '&.subscribe': {
      marginBottom: 'unset',
      marginTop: theme.spacing(2),
    },
  },
  textField: {
    height: 40,
    marginBottom: theme.spacing(2),
  },
  successfulText: {
    color: '#4caf50',
  },
}));

const onSubmit = async (data, getSession, openMessageTab, setError, setValue, setSuccessfulRelated) => {
  try {
    const session = await getSession();
    const response = await api.post('/api/patient_provider/create', data, {
      headers: {
        authorization: `bearer ${session.getAccessToken().getJwtToken()}`,
      },
    });
    if (response.status === 200) {
      openMessageTab();
      setValue('provider_code', '');
      setSuccessfulRelated(true);
    }
  } catch (error) {
    setSuccessfulRelated(false);
    setError('provider_code', {
      type: 'manual',
      message: 'El código es incorrecto',
    });
  }
};

interface ProviderCodeInputProps {
  openMessageTab: () => void;
  className?: string;
}

const ProviderCodeInput = ({ openMessageTab, className }: ProviderCodeInputProps) => {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { isSubmitting, errors },
  } = useForm();

  const { getSession } = useCognito();

  const [successfulRelated, setSuccessfulRelated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessfulRelated(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [successfulRelated]);

  return (
    <Grid container className={className}>
      <Typography color="primary" className={classes.title}>
        Ingrese el Código <br />
        de su terapeuta
      </Typography>
      <TextField
        fullWidth
        placeholder="Código del terapeuta"
        variant="outlined"
        InputProps={{
          className: classes.textField,
        }}
        error={Boolean(errors.provider_code)}
        helperText={errors.provider_code?.message}
        onChange={e => setValue('provider_code', e.target.value)}
        inputProps={{
          ...register('provider_code'),
          defaultValue: getValues('provider_code'),
        }}
      />
      {successfulRelated && (
        <Typography variant="caption" className={classes.successfulText}>
          Su restricción del chat ha sido eliminada.
        </Typography>
      )}
      <Grid container justify="center" direction="column" className={`${classes.buttonContainer} subscribe`}>
        <Button
          disabled={isSubmitting || Boolean(Object.keys(errors).length)}
          variant="contained"
          color="primary"
          onClick={handleSubmit(values =>
            onSubmit(values, getSession, openMessageTab, setError, setValue, setSuccessfulRelated)
          )}
        >
          Conéctanos
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProviderCodeInput;
