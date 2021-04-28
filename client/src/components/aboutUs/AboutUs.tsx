import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Grid, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { ParagraphStoreContext } from "../../stores/AboutUsStore";
import ParagraphForm from "./ParagraphForm";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import { parseStyledBoolean } from "../../helpers/BooleanParser";
import QuestionDialog from "../../componentsReusable/Dialogs";
import { ButtonError, ButtonSuccess } from "../../componentsReusable/Buttons";
import { TParagraph } from "../../models/Paragraph";
import MainLayout from "../layout/MainLayout";
import BackgroundImg from "../../resources/images/background_main.jpg";
import { MainGridStyled, TitleTypography } from "../../style/MainStyled";
import RCButtonsCUD from "../../componentsReusable/ButtonsCUD";

export const HoverStyled = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
`;
export const ActionButtonStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  background-color: rgba(100, 100, 100, 0.8);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.24);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GridActionStyled = styled(MainGridStyled)<{ edition?: string }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: all 0.3s;
  ${(props) =>
    props.edition
      ? `
      margin-bottom: 5px;
      border-radius: 3px;
      background-color: ${mainTheme.palette.secondary.dark};
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
      &:hover{
        cursor: pointer;
      }`
      : ""}
`;

export interface AboutUsProps {}

const AboutUs: React.FC<AboutUsProps> = observer(() => {
  const storeParagraph = useContext(ParagraphStoreContext);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>(false);
  const [removal, setRemoval] = useState<boolean>(false);
  const [selectedParagraph, setSelectedParagraph] = useState<
    TParagraph | undefined
  >();

  useEffect(() => {
    storeParagraph.fetch();
  }, [storeParagraph]);

  const handleClearActionsSD = () => {
    setRemoval(false);
    setEdition(false);
    setOpenForm(false);
    setSelectedParagraph(undefined);
  };

  const handleAction = (p: TParagraph) => {
    if (edition) {
      setSelectedParagraph(p);
      setOpenForm(true);
    } else if (removal) {
      setSelectedParagraph(p);
    }
  };

  const IS_ADMIN_TEMP = true; // TODO: change with real admin value;
  return (
    <MainLayout
      img={BackgroundImg}
      title="Parafia p.w. św. Jana Ewangelisty w Szczecinie"
      subtitle="Kościół Pallotynów"
    >
      <Grid container spacing={3} style={{ position: "relative" }}>
        <Grid item>
          <Typography variant="h4">About us</Typography>
        </Grid>{" "}
        {IS_ADMIN_TEMP ? (
          <RCButtonsCUD
            handleAdd={() => setOpenForm(true)}
            handleEdit={() => setEdition(true)}
            handleDelete={() => setRemoval(true)}
            handleCancel={handleClearActionsSD}
          />
        ) : null}
        {storeParagraph.getParagraph().map((paragraph) => (
          <GridActionStyled
            item
            key={paragraph.id}
            edition={parseStyledBoolean(edition || removal)}
            onClick={() => handleAction(paragraph)}
          >
            {paragraph.title ? (
              <TitleTypography>{paragraph.title}</TitleTypography>
            ) : null}
            <Typography color="textPrimary">{paragraph.content}</Typography>
            {edition ? (
              <HoverStyled>
                <ActionButtonStyled>
                  <EditIcon fontSize="large" />
                </ActionButtonStyled>
              </HoverStyled>
            ) : null}
            {removal ? (
              <HoverStyled>
                <ActionButtonStyled>
                  <DeleteIcon fontSize="large" />
                </ActionButtonStyled>
              </HoverStyled>
            ) : null}
          </GridActionStyled>
        ))}
      </Grid>
      <ParagraphForm
        open={Boolean((openForm || selectedParagraph) && !removal)}
        selectedParagraph={openForm ? selectedParagraph : undefined}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialog
        open={Boolean(selectedParagraph && removal)}
        handleClose={handleClearActionsSD}
        title="Do you want to delete?"
        content="Do you want to delete?"
      >
        <ButtonSuccess
          onClick={() => {
            if (selectedParagraph) {
              storeParagraph.removeParagraph(selectedParagraph);
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

export default AboutUs;
