import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Grid, Typography } from "@material-ui/core";
import { ServiceStoreContext } from "../../../stores/ServiceStore";
import { Day } from "../../../models/Global";
import { translateDays } from "../../../helpers/temp_translations";
import { TitleTypography } from "../../../style/MainStyled";

export interface HomeServicesProps {}

const HomeServices: React.FC<HomeServicesProps> = observer(() => {
  const storeServices = useContext(ServiceStoreContext);

  useEffect(() => {
    storeServices.fetch();
  }, [storeServices]);
  let noServices = true;

  const servicesMap = storeServices.getServicesByDay;
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <TitleTypography>{"Msze św"}</TitleTypography>
      </Grid>
      <Grid item>
        {Object.values(Day).map((day) => {
          const services = servicesMap.get(day);
          if (!services?.length) {
            return null;
          }
          noServices = false;
          return (
            <Grid container direction="column" key={day}>
              <Grid item>
                <Typography color="textPrimary" style={{ fontWeight: "bold" }}>
                  {translateDays(day)}
                </Typography>
              </Grid>
              {services.map((service) => (
                <Grid item style={{ paddingLeft: "20px" }} key={service.id}>
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
      </Grid>
    </Grid>
  );
});

export default HomeServices;
