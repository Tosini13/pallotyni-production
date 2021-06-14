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
  const periodicConfessions = storeConfessions.getPeriodic;
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
              {confessions.map((confession) => (
                <Grid item style={{ paddingLeft: "20px" }} key={confession.id}>
                  <Typography color="textPrimary">
                    {confession.fromTime} - {confession.toTime}{" "}
                    {confession.priest}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          );
        })}
        {periodicConfessions.map((confession) => (
          <Grid container direction="column" key={confession.id}>
            <Grid item>
              <Typography color="textPrimary" style={{ fontWeight: "bold" }}>
                {confession.period}
              </Typography>
            </Grid>
            <Grid item style={{ paddingLeft: "20px" }}>
              <Typography color="textPrimary">{confession.show}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
});

export default HomeConfessions;
