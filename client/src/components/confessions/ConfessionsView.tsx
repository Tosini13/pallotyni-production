import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";

import { DATE_FORMAT, Day } from "../../models/Global";
import {
  Confession,
  ConfessionStoreContext,
} from "../../stores/ConfessionStore";
import { parseStyledBoolean } from "../../helpers/BooleanParser";
import QuestionDialog from "../../componentsReusable/Dialogs";
import { ButtonError, ButtonSuccess } from "../../componentsReusable/Buttons";
import ConfessionForm from "./forms/ConfessionForm";
import { observer } from "mobx-react";
import { TypographySelectableStyled } from "../services/ServicesView";
import { Grid, GridSize, Typography } from "@material-ui/core";
import { MainGridStyled, TitleTypography } from "../../style/MainStyled";
import MainLayout from "../layout/MainLayout";
import BackgroundImg from "../../resources/images/church_cross.png";
import RCButtonsCUD from "../../componentsReusable/ButtonsCUD";

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
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>(false);
  const [removal, setRemoval] = useState<boolean>(false);
  const [selectedConfession, setSelectedConfession] = useState<
    Confession | undefined
  >();
  const [hovered, setHovered] = useState<Confession | undefined>();

  const storeConfession = useContext(ConfessionStoreContext);
  const handleSelectConfession = (confession: Confession) => {
    if (edition || removal) {
      setSelectedConfession(confession);
    }
  };

  const handleClearActionsSD = () => {
    setRemoval(false);
    setEdition(false);
    setOpenForm(false);
    setSelectedConfession(undefined);
  };
  useEffect(() => {
    storeConfession.fetch();
  }, [storeConfession]);

  const IS_ADMIN_TEMP = true; // TODO: change with real admin value;
  return (
    <MainLayout img={BackgroundImg} title="Spowiedź święta">
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
          <TitleTypography>Spowiedź co tydzień</TitleTypography>

          {Object.values(Day).map((day) => {
            const confessions = storeConfession.getConfessionsByDay(day);
            if (!confessions.length) {
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
                {confessions.map((confession) => (
                  <Grid item style={{ paddingLeft: "20px" }}>
                    <TypographySelectableStyled
                      color="textPrimary"
                      key={confession.id}
                      selectable={parseStyledBoolean(edition || removal)}
                      hovered={parseStyledBoolean(
                        (edition || removal) && hovered?.id === confession.id
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
        </MainGridStyled>
        <MainGridStyled item md={breakpoints.md}>
          <TitleTypography>Pojedyncza spowiedź</TitleTypography>
          {storeConfession.getConfessionsNextWeek.map((confession) => (
            <TypographySelectableStyled
              color="textPrimary"
              key={confession.id}
              selectable={parseStyledBoolean(edition || removal)}
              hovered={parseStyledBoolean(
                (edition || removal) && hovered?.id === confession.id
              )}
              onMouseEnter={() => setHovered(confession)}
              onMouseLeave={() => setHovered(undefined)}
              onClick={() => handleSelectConfession(confession)}
            >
              {confession.show}
            </TypographySelectableStyled>
          ))}
        </MainGridStyled>
      </Grid>
      <ConfessionForm
        open={Boolean((openForm || selectedConfession) && !removal)}
        selectedConfession={removal ? undefined : selectedConfession}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialog
        open={Boolean(selectedConfession && removal)}
        handleClose={handleClearActionsSD}
        title="Do you want to delete?"
      >
        <ButtonSuccess
          onClick={() => {
            if (selectedConfession) {
              storeConfession.removeConfession(selectedConfession);
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

export default ConfessionsView;
