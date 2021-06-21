import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { Priest } from "../../stores/PriestStore";
import Avatar from "../../resources/avatar/avatarPriest.png";

const PriestImg = styled.img`
  height: 200px;
`;

export interface PriestSummaryProps {
  priest: Priest;
}

const PriestSummary: React.FC<PriestSummaryProps> = ({ priest }) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={1}>
      <Grid item>
        <PriestImg src={priest.path ?? Avatar} />
      </Grid>
      <Grid item>
        <Typography color="textPrimary">
          {priest.firstName} {priest.lastName}
        </Typography>
      </Grid>
      <Grid item>
        <Typography color="textPrimary">{priest.position}</Typography>
      </Grid>
      <Grid item>
        <Typography color="textPrimary">{priest.description}</Typography>
      </Grid>
    </Grid>
  );
};

export default PriestSummary;
