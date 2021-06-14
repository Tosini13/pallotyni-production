import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Day } from "../../models/Global";
import { ServiceStoreContext, Service } from "../../stores/ServiceStore";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import { parseStyledBoolean } from "../../helpers/BooleanParser";
import { Grid, GridSize, Typography } from "@material-ui/core";
import ServiceForm from "./forms/ServiceForm";
import { QuestionDialogDelete } from "../../componentsReusable/Dialogs";
import MainLayout from "../layout/MainLayout";
import BackgroundImg from "../../resources/images/background_church.jpg";
import { MainGridStyled, TitleTypography } from "../../style/MainStyled";
import RCButtonsCUD, {
  ACTION_MODE,
  useCUD,
} from "../../componentsReusable/ButtonsCUD";
import { translateDays } from "../../helpers/temp_translations";

const breakpoints = {
  md: 5 as GridSize,
  xs: 12 as GridSize,
};

const showService = (service: Service) => (
  <>
    {service.time} - {service.title}{" "}
    {service.priest ? `, ${service.priest}` : null}
  </>
);

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
        color: ${mainTheme.palette.secondary.main};
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

  const [selectedService, setSelectedService] = useState<Service | undefined>();
  const [hovered, setHovered] = useState<Service | undefined>();
  const [actionMode, setActionMode] = useState<ACTION_MODE | undefined>();

  const { isAdd, isEdit, isDelete } = useCUD(actionMode);

  const serviceExistsAction = (action: () => void) =>
    storeServices.services.length ? action : undefined;

  useEffect(() => {
    storeServices.fetch();
  }, [storeServices]);

  const handleClearActionsSD = () => {
    setSelectedService(undefined);
    setActionMode(undefined);
  };

  const handleSelectService = (service: Service) => {
    if (isEdit || isDelete) {
      setSelectedService(service);
    }
  };

  const periodicServices = storeServices.getPeriodic;
  const servicesMap = storeServices.getServicesByDay;
  const IS_ADMIN_TEMP = true; // TODO: change with real admin value;
  return (
    <MainLayout img={BackgroundImg} title="Msze święte">
      {IS_ADMIN_TEMP ? (
        <RCButtonsCUD
          mode={actionMode}
          handleAdd={() => setActionMode(ACTION_MODE.ADD)}
          handleEdit={serviceExistsAction(() =>
            setActionMode(ACTION_MODE.EDIT)
          )}
          handleDelete={serviceExistsAction(() =>
            setActionMode(ACTION_MODE.DELETE)
          )}
          handleCancel={serviceExistsAction(handleClearActionsSD)}
        />
      ) : null}
      <Grid container justify="space-around">
        <MainGridStyled item md={breakpoints.md}>
          <TitleTypography>Msze święte</TitleTypography>
          {Object.values(Day).map((day) => {
            const services = servicesMap.get(day);
            if (!services?.length) {
              return null;
            }
            return (
              <Grid container direction="column" key={day}>
                <Grid item>
                  <Typography
                    color="textPrimary"
                    style={{ fontWeight: "bold" }}
                  >
                    {translateDays(day)}
                  </Typography>
                </Grid>
                {services.map((service) => (
                  <Grid item style={{ paddingLeft: "20px" }} key={service.id}>
                    <TypographySelectableStyled
                      color="textPrimary"
                      key={service.id}
                      selectable={parseStyledBoolean(isEdit || isDelete)}
                      hovered={parseStyledBoolean(
                        (isEdit || isDelete) && hovered?.id === service.id
                      )}
                      onMouseEnter={() => setHovered(service)}
                      onMouseLeave={() => setHovered(undefined)}
                      onClick={() => handleSelectService(service)}
                    >
                      {showService(service)}
                    </TypographySelectableStyled>
                  </Grid>
                ))}
              </Grid>
            );
          })}
          {periodicServices.map((service) => (
            <>
              <Grid container direction="column" key={service.id}>
                <Grid item>
                  <Typography
                    color="textPrimary"
                    style={{ fontWeight: "bold" }}
                  >
                    {service.period}
                  </Typography>
                </Grid>
                <Grid item style={{ paddingLeft: "20px" }}>
                  <TypographySelectableStyled
                    color="textPrimary"
                    key={service.id}
                    selectable={parseStyledBoolean(isEdit || isDelete)}
                    hovered={parseStyledBoolean(
                      (isEdit || isDelete) && hovered?.id === service.id
                    )}
                    onMouseEnter={() => setHovered(service)}
                    onMouseLeave={() => setHovered(undefined)}
                    onClick={() => handleSelectService(service)}
                  >
                    {showService(service)}
                  </TypographySelectableStyled>
                </Grid>
              </Grid>
            </>
          ))}
        </MainGridStyled>
        {singleServices.length ? (
          <MainGridStyled item md={breakpoints.md}>
            <TitleTypography>Pojedyncze msze święte</TitleTypography>
            {singleServices ? (
              <>
                {singleServices.map((service) => (
                  <TypographySelectableStyled
                    color="textPrimary"
                    key={service.id}
                    selectable={parseStyledBoolean(isEdit || isDelete)}
                    hovered={parseStyledBoolean(
                      (isEdit || isDelete) && hovered?.id === service.id
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
        ) : null}
      </Grid>
      <ServiceForm
        open={Boolean(isAdd || (selectedService && isEdit))}
        selectedService={isDelete ? undefined : selectedService}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialogDelete
        open={Boolean(selectedService && isDelete)}
        handleNo={handleClearActionsSD}
        handleYes={() => {
          if (selectedService) {
            storeServices.removeService(selectedService);
            handleClearActionsSD();
          }
        }}
      />
    </MainLayout>
  );
});

export default ServicesView;
