import { Grid } from '@material-ui/core';

import { Accordion } from '@components/shared';
import { Chip } from '@components/shared';

const HEALTH_PLANS = [
  'Triple S',
  'MCS',
  'First Medical',
  'Tricare',
  'Roberto Plan',
  'Terapia de pareja',
  'Terapida de Adultos',
];

interface HealthPlansProps {
  healthPlans: string[];
}

const HealthPlans = ({ healthPlans }: HealthPlansProps) => {
  return (
    <Accordion collapsedHeight={healthPlans.length >= 4 ? 46 : 35} hideCollapsedBtn={healthPlans.length <= 4}>
      <Grid container>
        {healthPlans.map((plan, idx) => {
          return <Chip label={plan} key={idx} />;
        })}
      </Grid>
    </Accordion>
  );
};

export default HealthPlans;
