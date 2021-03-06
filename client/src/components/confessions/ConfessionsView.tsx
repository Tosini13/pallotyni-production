import { useContext, useEffect, useState } from "react";

import { Day } from "../../models/Global";
import {
  Confession,
  ConfessionStoreContext,
} from "../../stores/ConfessionStore";
import { parseStyledBoolean } from "../../helpers/BooleanParser";
import { QuestionDialogDelete } from "../../componentsReusable/Dialogs";
import ConfessionForm from "./forms/ConfessionForm";
import { observer } from "mobx-react";
import { TypographySelectableStyled } from "../services/ServicesView";
import { Grid, GridSize, Typography } from "@material-ui/core";
import { MainGridStyled, TitleTypography } from "../../style/MainStyled";
import MainLayout from "../layout/MainLayout";
import BackgroundImg from "../../resources/images/background_church.jpg";
import RCButtonsCUD, {
  ACTION_MODE,
  useCUD,
} from "../../componentsReusable/ButtonsCUD";
import { translateDays } from "../../helpers/temp_translations";

const breakpoints = {
  md: 5 as GridSize,
  xs: 12 as GridSize,
};

export interface ConfessionsViewProps {
  openForm: boolean;
  edition: boolean;
  removal: boolean;
  selectedConfession?: Confession;
  setSelectedConfession: (s: Confession) => void;
  handleClearActionsSD: () => void;
}

const ConfessionsView: React.FC<ConfessionsViewProps> = observer(() => {
  const storeConfession = useContext(ConfessionStoreContext);
  const [selectedConfession, setSelectedConfession] =
    useState<Confession | undefined>();
  const [hovered, setHovered] = useState<Confession | undefined>();
  const [actionMode, setActionMode] = useState<ACTION_MODE | undefined>();
  const { isAdd, isEdit, isDelete } = useCUD(actionMode);

  const confessionExistsAction = (action: () => void) =>
    storeConfession.confessions.length ? action : undefined;

  const handleSelectConfession = (confession: Confession) => {
    if (isEdit || isDelete) {
      setSelectedConfession(confession);
    }
  };

  const handleClearActionsSD = () => {
    setSelectedConfession(undefined);
    setActionMode(undefined);
  };
  useEffect(() => {
    storeConfession.fetch();
  }, [storeConfession]);

  const periodicConfessions = storeConfession.getPeriodic;
  const dailyConfessionsMap = storeConfession.getConfessionsByDay;
  const singleConfession = storeConfession.getConfessionsNextWeek;
  const IS_ADMIN_TEMP = true; // TODO: change with real admin value;
  return (
    <MainLayout img={BackgroundImg} title="Spowied?? ??wi??ta">
      {IS_ADMIN_TEMP ? (
        <RCButtonsCUD
          mode={actionMode}
          handleAdd={() => setActionMode(ACTION_MODE.ADD)}
          handleEdit={confessionExistsAction(() =>
            setActionMode(ACTION_MODE.EDIT)
          )}
          handleDelete={confessionExistsAction(() =>
            setActionMode(ACTION_MODE.DELETE)
          )}
          handleCancel={confessionExistsAction(handleClearActionsSD)}
        />
      ) : null}
      <Grid container justify="space-around">
        <MainGridStyled item md={breakpoints.md}>
          <TitleTypography>Spowied?? co tydzie??</TitleTypography>

          {Object.values(Day).map((day) => {
            const confessions = dailyConfessionsMap.get(day);
            if (!confessions?.length) {
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
                {confessions.map((confession) => (
                  <Grid
                    item
                    style={{ paddingLeft: "20px" }}
                    key={confession.id}
                  >
                    <TypographySelectableStyled
                      color="textPrimary"
                      key={confession.id}
                      selectable={parseStyledBoolean(isEdit || isDelete)}
                      hovered={parseStyledBoolean(
                        (isEdit || isDelete) && hovered?.id === confession.id
                      )}
                      onMouseEnter={() => setHovered(confession)}
                      onMouseLeave={() => setHovered(undefined)}
                      onClick={() => handleSelectConfession(confession)}
                    >
                      {confession.show}
                    </TypographySelectableStyled>
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
                <TypographySelectableStyled
                  color="textPrimary"
                  key={confession.id}
                  selectable={parseStyledBoolean(isEdit || isDelete)}
                  hovered={parseStyledBoolean(
                    (isEdit || isDelete) && hovered?.id === confession.id
                  )}
                  onMouseEnter={() => setHovered(confession)}
                  onMouseLeave={() => setHovered(undefined)}
                  onClick={() => handleSelectConfession(confession)}
                >
                  {confession.show}
                </TypographySelectableStyled>
              </Grid>
            </Grid>
          ))}
        </MainGridStyled>
        {singleConfession.length ? (
          <MainGridStyled item md={breakpoints.md}>
            <TitleTypography>Pojedyncza spowied??</TitleTypography>
            {singleConfession.map((confession) => (
              <TypographySelectableStyled
                color="textPrimary"
                key={confession.id}
                selectable={parseStyledBoolean(isEdit || isDelete)}
                hovered={parseStyledBoolean(
                  (isEdit || isDelete) && hovered?.id === confession.id
                )}
                onMouseEnter={() => setHovered(confession)}
                onMouseLeave={() => setHovered(undefined)}
                onClick={() => handleSelectConfession(confession)}
              >
                {confession.show}
              </TypographySelectableStyled>
            ))}
          </MainGridStyled>
        ) : null}
      </Grid>
      <ConfessionForm
        open={Boolean(isAdd || (selectedConfession && isEdit))}
        selectedConfession={isDelete ? undefined : selectedConfession}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialogDelete
        open={Boolean(selectedConfession && isDelete)}
        handleNo={handleClearActionsSD}
        handleYes={() => {
          if (selectedConfession) {
            storeConfession.removeConfession(selectedConfession);
            handleClearActionsSD();
          }
        }}
      />
    </MainLayout>
  );
});

export default ConfessionsView;
