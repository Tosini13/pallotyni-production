import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Day } from "../../models/Global";
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
import RCButtonsCUD, {
  ACTION_MODE,
  useCUD,
} from "../../componentsReusable/ButtonsCUD";

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
                      selectable={parseStyledBoolean(isEdit || isDelete)}
                      hovered={parseStyledBoolean(
                        (isEdit || isDelete) && hovered?.id === service.id
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
      </Grid>
      <ServiceForm
        open={Boolean(isAdd || (selectedService && isEdit))}
        selectedService={isDelete ? undefined : selectedService}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialog
        open={Boolean(selectedService && isDelete)}
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
