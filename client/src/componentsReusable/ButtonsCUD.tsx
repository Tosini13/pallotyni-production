import { useContext } from "react";
import styled from "styled-components";

import { Button, ButtonProps, Grid } from "@material-ui/core";
import { Delete, Edit, Add } from "@material-ui/icons";
import { AuthStoreContext } from "../stores/AuthStore";
import { observer } from "mobx-react";

export const ButtonCUD = (props: ButtonProps) => {
  const { children } = props;
  return (
    <Button variant="outlined" {...props}>
      {children}
    </Button>
  );
};

const GridButtonsContainer = styled(Grid)`
  margin-bottom: 10px;
`;

export interface RCButtonsCUDProps {
  handleAdd?: () => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
  handleCancel: () => void;
}

const RCButtonsCUD: React.FC<RCButtonsCUDProps> = observer(
  ({ handleAdd, handleEdit, handleDelete, handleCancel }) => {
    const authStore = useContext(AuthStoreContext);

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
        <Grid item>
          <ButtonCUD onClick={handleCancel}>Cancel</ButtonCUD>
        </Grid>
        <Grid item>
          <Grid container justify="center" spacing={5}>
            <Grid item>
              <ButtonCUD onClick={handleAdd} startIcon={<Add />}>
                Add
              </ButtonCUD>
            </Grid>
            <Grid item>
              <ButtonCUD onClick={handleEdit} startIcon={<Edit />}>
                Edit
              </ButtonCUD>
            </Grid>
            <Grid item>
              <ButtonCUD onClick={handleDelete} startIcon={<Delete />}>
                Delete
              </ButtonCUD>
            </Grid>
          </Grid>
        </Grid>
      </GridButtonsContainer>
    );
  }
);

export default RCButtonsCUD;
