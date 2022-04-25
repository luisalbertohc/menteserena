import { Grid } from '@material-ui/core';

import { Accordion } from '@components/shared';
import { Chip } from '@components/shared';

const Specialty = ({ specialties }) => {
  return (
    <Accordion collapsedHeight={specialties.length >= 4 ? 86 : 35} hideCollapsedBtn={specialties.length <= 4}>
      <Grid container>
        {specialties.map((specialty, idx) => {
          return <Chip label={specialty} key={idx} />;
        })}
      </Grid>
    </Accordion>
  );
};

export default Specialty;
