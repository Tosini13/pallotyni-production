import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Grid, Typography } from "@material-ui/core";
import { ConfessionStoreContext } from "../../../stores/ConfessionStore";
import { Day } from "../../../models/Global";
import { translateDays } from "../../../helpers/temp_translations";
import { TitleTypography } from "../../../style/MainStyled";

export interface HomeConfessionsProps {}

const HomeConfessions: React.FC<HomeConfessionsProps> = observer(() => {
  const storeConfessions = useContext(ConfessionStoreContext);

  useEffect(() => {
    storeConfessions.fetch();
  }, [storeConfessions]);
  const dailyConfessionsMap = storeConfessions.getConfessionsByDay;
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <TitleTypography>{"Spowiedź Święta"}</TitleTypography>
      </Grid>
      <Grid item>
        {Object.values(Day).map((day) => {
          const confessions = dailyConfessionsMap.get(day);
          if (!confessions?.length) {
            return null;
          }
          return (
            <Grid container direction="column" key={day}>
              <Grid item>
                <Typography color="textPrimary" style={{ fontWeight: "bold" }}>
                  {translateDays(day)}
                </Typography>
              </Grid>
              {confessions.map((confessions) => (
                <Grid item style={{ paddingLeft: "20px" }} key={confessions.id}>
                  <Typography color="textPrimary">
                    {confessions.fromTime} - {confessions.toTime}{" "}
                    {confessions.priest}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
});

export default HomeConfessions;
