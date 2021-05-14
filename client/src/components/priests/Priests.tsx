import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Grid } from "@material-ui/core";

import MainLayout from "../layout/MainLayout";
import BackgroundImg from "../../resources/images/church_cross.png";
import { Priest, PriestContext } from "../../stores/PriestStore";
import PriestSummary from "./PriestSummary";
import RCButtonsCUD, {
  ACTION_MODE,
  useCUD,
} from "../../componentsReusable/ButtonsCUD";
import { QuestionDialogDelete } from "../../componentsReusable/Dialogs";
import useAction from "../../helpers/useAction";
import PriestForm from "./PriestForm";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import { parseStyledBoolean } from "../../helpers/BooleanParser";
import { ActionButtonStyled } from "../aboutUs/AboutUs";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const GridActionStyled = styled(Grid)<{ selectable?: string }>`
  position: relative;
  transition: all 0.3s;
  margin: 10px;
  ${(props) =>
    props.selectable
      ? `
      cursor: pointer;
      background-color: ${mainTheme.palette.secondary.main};
      padding: 10px;
      margin-top: 15px;
      &:hover{
        background-color: ${mainTheme.palette.primary.main};
        p{
          color: ${mainTheme.palette.secondary.main};
        }
      }
      `
      : ""}
`;

const HoverStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type TActionIcons = {
  isEdit: boolean;
  isDelete: boolean;
};

const ActionIcons: React.FC<TActionIcons> = ({ isEdit, isDelete }) => (
  <>
    {isEdit ? (
      <HoverStyled>
        <ActionButtonStyled>
          <EditIcon fontSize="large" />
        </ActionButtonStyled>
      </HoverStyled>
    ) : null}
    {isDelete ? (
      <HoverStyled>
        <ActionButtonStyled>
          <DeleteIcon fontSize="large" />
        </ActionButtonStyled>
      </HoverStyled>
    ) : null}
  </>
);

export interface PriestsProps {}

const Priests: React.FC<PriestsProps> = observer(() => {
  const { isProcessing, execute } = useAction();
  const priestStore = useContext(PriestContext);

  const [image, setImage] = useState<any>();
  const [selectedPriest, setSelectedPriest] = useState<Priest | undefined>();
  const [actionMode, setActionMode] = useState<ACTION_MODE | undefined>();

  const { isAdd, isEdit, isDelete } = useCUD(actionMode);

  const priestExistsAction = (action: () => void) =>
    priestStore.priests.length ? action : undefined;

  useEffect(() => {
    priestStore.fetch();
  }, [priestStore]);

  const handleClearActionsSD = () => {
    setSelectedPriest(undefined);
    setActionMode(undefined);
  };

  const selectable = parseStyledBoolean(isEdit || isDelete);
  return (
    <MainLayout img={BackgroundImg} title="Księża">
      <RCButtonsCUD
        mode={actionMode}
        handleAdd={() => setActionMode(ACTION_MODE.ADD)}
        handleEdit={priestExistsAction(() => setActionMode(ACTION_MODE.EDIT))}
        handleDelete={priestExistsAction(() =>
          setActionMode(ACTION_MODE.DELETE)
        )}
        handleCancel={priestExistsAction(handleClearActionsSD)}
      />
      <Grid container spacing={8} style={{ marginTop: "20px" }}>
        {priestStore.priests.map((priest) => (
          <GridActionStyled
            item
            key={priest.id}
            selectable={selectable}
            onClick={() => setSelectedPriest(priest)}
          >
            <PriestSummary priest={priest} />
            <ActionIcons isEdit={isEdit} isDelete={isDelete} />
          </GridActionStyled>
        ))}
      </Grid>
      <PriestForm
        image={image}
        setImage={setImage}
        open={Boolean(isAdd || (selectedPriest && isEdit))}
        selectedPriest={selectedPriest}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialogDelete
        open={Boolean(selectedPriest && isDelete)}
        handleNo={handleClearActionsSD}
        handleYes={async () => {
          if (selectedPriest) {
            await execute(priestStore.deletePriest(selectedPriest));
            handleClearActionsSD();
          }
        }}
        isProcessing={isProcessing}
      />
    </MainLayout>
  );
});

export default Priests;
