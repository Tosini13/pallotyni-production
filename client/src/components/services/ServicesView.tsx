import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { observer } from "mobx-react";

import { DATE_FORMAT, Day } from "../../models/Global";
import { ServiceStoreContext, Service } from "../../stores/ServiceStore";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import { parseStyledBoolean } from "../../helpers/BooleanParser";
import { Grid, GridSize, Typography } from "@material-ui/core";
import ServiceForm from "./forms/ServiceForm";
import QuestionDialog from "../../componentsReusable/Dialogs";
import { ButtonError, ButtonSuccess } from "../../componentsReusable/Buttons";
import MainLayout from "../layout/MainLayout";
import BackgroundImg from "../../resources/images/church_cross.png";
import { MainGridStyled, TitleTypography } from "../../style/MainStyled";
import RCButtonsCUD from "../../componentsReusable/ButtonsCUD";

const breakpoints = {
  md: 5 as GridSize,
  xs: 12 as GridSize,
};

export const TypographySelectableStyled = styled(Typography)<{
  selectable?: string;
  hovered?: string;
}>`
  padding: 3px;
  transition: all 0.3s;
  width: fit-content;
  ${(props) =>
    props.selectable
      ? `
        margin-bottom: 5px;
        border-bottom: 1px solid ${mainTheme.palette.secondary.dark};`
      : ""}
  ${(props) =>
    props.hovered
      ? `
        cursor: pointer;
        border-bottom: 1px solid ${mainTheme.palette.primary.dark};
        margin-left: -10px;
      `
      : ""}
`;

export interface ServicesViewProps {
  openForm: boolean;
  edition: boolean;
  removal: boolean;
  selectedService?: Service;
  selectService: (s: Service) => void;
  handleClearActionsSD: () => void;
}

const ServicesView: React.FC<ServicesViewProps> = observer(() => {
  const storeServices = useContext(ServiceStoreContext);
  const singleServices = storeServices.getSingleService;

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>(false);
  const [removal, setRemoval] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>();
  const [hovered, setHovered] = useState<Service | undefined>();

  useEffect(() => {
    storeServices.fetch();
  }, [storeServices]);

  const handleClearActionsSD = () => {
    setRemoval(false);
    setEdition(false);
    setOpenForm(false);
    setSelectedService(undefined);
  };

  const handleSelectService = (service: Service) => {
    if (edition || removal) {
      setSelectedService(service);
    }
  };

  const IS_ADMIN_TEMP = true; // TODO: change with real admin value;
  return (
    <MainLayout img={BackgroundImg} title="Msze święte">
      {IS_ADMIN_TEMP ? (
        <RCButtonsCUD
          handleAdd={() => setOpenForm(true)}
          handleEdit={() => setEdition(true)}
          handleDelete={() => setRemoval(true)}
          handleCancel={handleClearActionsSD}
        />
      ) : null}
      <Grid container justify="space-around">
        <MainGridStyled item md={breakpoints.md}>
          <TitleTypography>Msze święte co tydzień</TitleTypography>
          {Object.values(Day).map((day) => {
            const services = storeServices.getServicesByDay(day);
            if (!services.length) {
              return null;
            }
            return (
              <Grid container direction="column">
                <Grid item>
                  <Typography
                    color="textPrimary"
                    style={{ fontWeight: "bold" }}
                  >
                    {day}
                  </Typography>
                </Grid>
                {services.map((service) => (
                  <Grid item style={{ paddingLeft: "20px" }}>
                    <TypographySelectableStyled
                      color="textPrimary"
                      key={service.id}
                      selectable={parseStyledBoolean(edition || removal)}
                      hovered={parseStyledBoolean(
                        (edition || removal) && hovered?.id === service.id
                      )}
                      onMouseEnter={() => setHovered(service)}
                      onMouseLeave={() => setHovered(undefined)}
                      onClick={() => handleSelectService(service)}
                    >
                      {service.time} - {service.title}, {service.priest}
                    </TypographySelectableStyled>
                  </Grid>
                ))}
              </Grid>
            );
          })}
        </MainGridStyled>
        <MainGridStyled item md={breakpoints.md}>
          <TitleTypography>Pojedyncze msze święte</TitleTypography>
          {singleServices ? (
            <>
              {singleServices.map((service) => (
                <TypographySelectableStyled
                  color="textPrimary"
                  key={service.id}
                  selectable={parseStyledBoolean(edition || removal)}
                  hovered={parseStyledBoolean(
                    (edition || removal) && hovered?.id === service.id
                  )}
                  onMouseEnter={() => setHovered(service)}
                  onMouseLeave={() => setHovered(undefined)}
                  onClick={() => handleSelectService(service)}
                >
                  {service.show}
                </TypographySelectableStyled>
              ))}
            </>
          ) : null}
        </MainGridStyled>
      </Grid>
      <ServiceForm
        open={Boolean((openForm || selectedService) && !removal)}
        selectedService={removal ? undefined : selectedService}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialog
        open={Boolean(selectedService && removal)}
        handleClose={handleClearActionsSD}
        title="Do you want to delete?"
      >
        <ButtonSuccess
          onClick={() => {
            if (selectedService) {
              storeServices.removeService(selectedService);
              handleClearActionsSD();
            }
          }}
        >
          Yes
        </ButtonSuccess>
        <ButtonError onClick={handleClearActionsSD}>No</ButtonError>
      </QuestionDialog>
    </MainLayout>
  );
});

export default ServicesView;
