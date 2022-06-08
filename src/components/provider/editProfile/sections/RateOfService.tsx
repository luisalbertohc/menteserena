import { makeStyles, Grid, Typography } from '@material-ui/core';

import { Accordion } from '@components/shared';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
  },
  price: {
    height: 30,
    width: 'auto',
    background: '#D1FAE5',
    '& > p': {
      color: '#047857',
      margin: 4,
    },
  },
  card: {
    height: 90,
    borderRadius: 4,
    border: '1px solid #D1D5DB',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(0, 2),
  },
  service: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '21px',
    color: theme.palette.grey[700],
    marginBottom: theme.spacing(1),
  },
  minutes: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '18px',
    color: theme.palette.grey[700],
  },
}));

interface RateOfServiceProps {
  rateAndServices: {
    session_type: string;
    cost: number;
    session_length: number;
  }[];
}

const RateOfService = ({ rateAndServices }: RateOfServiceProps) => {
  const classes = useStyles();

  return (
    <Accordion collapsedHeight={rateAndServices.length >= 3 ? 335 : 112} hideCollapsedBtn={rateAndServices.length <= 3}>
      <Grid className={classes.container}>
        {rateAndServices.map((rate, idx) => {
          return (
            <Grid container alignItems="center" justifyContent="space-between" className={classes.card} key={idx}>
              <Grid>
                <Typography className={classes.service}>{rate.session_type}</Typography>
                <Typography className={classes.minutes}>{rate.session_length} minutos</Typography>
              </Grid>
              <Grid container alignItems="center" justifyContent="center" className={classes.price}>
                <Typography>$ {rate.cost} USD</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Accordion>
  );
};

export default RateOfService;
