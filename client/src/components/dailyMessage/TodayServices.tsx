import React, { useContext, useEffect } from "react";
import { format } from "date-fns";
import styled from "styled-components";

import {
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  Paper,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { AccordionStyled } from "./DailyMessage";
import { ServiceStoreContext } from "../../stores/ServiceStore";
import { DATE_FORMAT, Day } from "../../models/Global";
import { mainTheme } from "../../style/config";
import { observer } from "mobx-react";

const ServiceDescTypographyStyled = styled(Typography)`
  margin-left: 5px;
`;

const ServiceTimeTypographyStyled = styled(Typography)`
  color: rgba(0, 0, 0, 0.8);
`;

const PaperStyled = styled(Paper)`
  background-color: ${mainTheme.palette.secondary.main};
  padding: 10px;
`;

export interface TodayServicesProps {}

const TodayServices: React.FC<TodayServicesProps> = observer(() => {
  const servicesStore = useContext(ServiceStoreContext);

  const todayDay = format(new Date(), "EEEE").toUpperCase();
  console.log("TodayServices - todayDay", todayDay);
  const todayServices = servicesStore.services;
  console.log("TodayServices - todayServices", todayServices);
  todayServices.sort(servicesStore.sortByTime);

  if (!todayServices.length) {
    return (
      <PaperStyled>
        <Typography>Today's no services</Typography>
      </PaperStyled>
    );
  }
  return (
    <AccordionStyled defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Today's Services</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {todayServices.map((service) => (
            <ListItem key={service.id}>
              <ServiceTimeTypographyStyled>
                {service.time}
              </ServiceTimeTypographyStyled>
              <ServiceDescTypographyStyled>
                {service.title}
              </ServiceDescTypographyStyled>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </AccordionStyled>
  );
});

export default TodayServices;
