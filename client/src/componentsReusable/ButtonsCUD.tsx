import { useContext } from "react";
import styled from "styled-components";

import { Button, ButtonProps, Grid, GridSize } from "@material-ui/core";
import { Delete, Edit, Add } from "@material-ui/icons";
import { AuthStoreContext } from "../stores/AuthStore";
import { observer } from "mobx-react";

export enum ACTION_MODE {
  ADD = "ADD",
  EDIT = "EDIT",
  DELETE = "DELETE",
}

export const ButtonCUD = (props: ButtonProps) => {
  const { children } = props;
  return (
    <Button variant="outlined" {...props}>
      {children}
    </Button>
  );
};

const breakpoints = {
  md: 4 as GridSize,
  xs: 12 as GridSize,
};
const GridButtonsContainer = styled(Grid)`
  margin-bottom: 10px;
`;

const GridButtonsItem = styled(Grid)`
  text-align: center;
`;

export interface RCButtonsCUDProps {
  handleAdd?: () => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
  handleCancel?: () => void;
  mode?: ACTION_MODE;
}

export const useCUD = (currentMode?: ACTION_MODE) => {
  return {
    isAdd: currentMode === ACTION_MODE.ADD,
    isEdit: currentMode === ACTION_MODE.EDIT,
    isDelete: currentMode === ACTION_MODE.DELETE,
  };
};

const RCButtonsCUD: React.FC<RCButtonsCUDProps> = observer(
  ({ handleAdd, handleEdit, handleDelete, handleCancel, mode }) => {
    const authStore = useContext(AuthStoreContext);

    const { isAdd, isEdit, isDelete } = useCUD(mode);

    if (!authStore.isLoggedIn) {
      return null;
    }
    return (
      <GridButtonsContainer
        container
        spacing={3}
        direction="column"
        alignItems="center"
      >
        <GridButtonsItem item md={breakpoints.md} xs={breakpoints.xs}>
          <ButtonCUD disabled={!handleCancel || !mode} onClick={handleCancel}>
            Anuluj
          </ButtonCUD>
        </GridButtonsItem>
        <GridButtonsItem item>
          <Grid container justify="center" spacing={5}>
            <GridButtonsItem item md={breakpoints.md} xs={breakpoints.xs}>
              <ButtonCUD
                disabled={!handleAdd}
                onClick={handleAdd}
                startIcon={<Add />}
                color={isAdd ? "secondary" : "primary"}
              >
                Dodaj
              </ButtonCUD>
            </GridButtonsItem>
            <GridButtonsItem item md={breakpoints.md} xs={breakpoints.xs}>
              <ButtonCUD
                disabled={!handleEdit}
                onClick={handleEdit}
                startIcon={<Edit />}
                color={isEdit ? "secondary" : "primary"}
              >
                Edytuj
              </ButtonCUD>
            </GridButtonsItem>
            <GridButtonsItem item md={breakpoints.md} xs={breakpoints.xs}>
              <ButtonCUD
                disabled={!handleDelete}
                onClick={handleDelete}
                startIcon={<Delete />}
                color={isDelete ? "secondary" : "primary"}
              >
                Usuń
              </ButtonCUD>
            </GridButtonsItem>
          </Grid>
        </GridButtonsItem>
      </GridButtonsContainer>
    );
  }
);

export default RCButtonsCUD;
