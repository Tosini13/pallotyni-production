import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Grid, Typography } from "@material-ui/core";
import { ServiceStoreContext } from "../../../stores/ServiceStore";
import { Day } from "../../../models/Global";

export interface HomeServicesProps {}

const HomeServices: React.FC<HomeServicesProps> = observer(() => {
  const storeServices = useContext(ServiceStoreContext);

  useEffect(() => {
    storeServices.fetch();
  }, [storeServices]);
  let noServices = true;
  return (
    <>
      {Object.values(Day).map((day) => {
        const services = storeServices.getServicesByDay(day);
        console.log(day);
        if (!services.length) {
          return null;
        }
        noServices = false;
        return (
          <Grid container direction="column">
            <Grid item>
              <Typography color="textPrimary" style={{ fontWeight: "bold" }}>
                {day}
              </Typography>
            </Grid>
            {services.map((service) => (
              <Grid item style={{ paddingLeft: "20px" }}>
                <Typography color="textPrimary">
                  {service.time} - {service.title}
                </Typography>
              </Grid>
            ))}
          </Grid>
        );
      })}
      {noServices ? (
        <Typography color="textPrimary">No Services</Typography>
      ) : null}
    </>
  );
});

export default HomeServices;
