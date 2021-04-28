import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Grid, Typography } from "@material-ui/core";
import { ConfessionStoreContext } from "../../../stores/ConfessionStore";
import { Day } from "../../../models/Global";

export interface HomeConfessionsProps {}

const HomeConfessions: React.FC<HomeConfessionsProps> = observer(() => {
  const storeConfessions = useContext(ConfessionStoreContext);

  useEffect(() => {
    storeConfessions.fetch();
  }, [storeConfessions]);
  return (
    <>
      {Object.values(Day).map((day) => {
        const confessions = storeConfessions.getConfessionsByDay(day);
        if (!confessions.length) {
          return null;
        }
        return (
          <Grid container direction="column">
            <Grid item>
              <Typography color="textPrimary" style={{ fontWeight: "bold" }}>
                {day}
              </Typography>
            </Grid>
            {confessions.map((confessions) => (
              <Grid item style={{ paddingLeft: "20px" }}>
                <Typography color="textPrimary">
                  {confessions.fromTime} - {confessions.toTime}{" "}
                  {confessions.priest}
                </Typography>
              </Grid>
            ))}
          </Grid>
        );
      })}
    </>
  );
});

export default HomeConfessions;
