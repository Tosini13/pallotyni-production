import { useContext, useEffect } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { ButtonSuccess, ButtonError } from "../../componentsReusable/Buttons";
import { DialogStyled } from "../../componentsReusable/Dialogs";
import TextFieldC from "../../componentsReusable/Forms";
import { ParagraphStoreContext } from "../../stores/AboutUsStore";
import { TParagraph, TParagraphCreate } from "../../models/Paragraph";

export interface ParagraphFormProps {
  open: boolean;
  selectedParagraph?: TParagraph;
  handleClose: () => void;
}

const ParagraphForm: React.FC<ParagraphFormProps> = ({
  open,
  handleClose,
  selectedParagraph,
}) => {
  const pStore = useContext(ParagraphStoreContext);
  const { register, handleSubmit, reset } = useForm<TParagraphCreate>();

  const clearForm = () => {
    reset({
      title: "",
      content: "",
    });
  };

  const handleCloseForm = () => {
    handleClose();
    clearForm();
  };

  const onSubmit = (data: TParagraphCreate) => {
    if (selectedParagraph) {
      pStore.updateParagraph({ ...data, id: selectedParagraph.id });
    } else {
      pStore.createParagraph(data);
    }
    handleCloseForm();
  };

  useEffect(() => {
    reset(selectedParagraph);
  }, [reset, selectedParagraph]);

  return (
    <DialogStyled open={open} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {selectedParagraph ? "Edit" : "Create"} Paragraph
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextFieldC
                inputRef={register}
                name="title"
                label="title"
                color="secondary"
              />
            </Grid>
            <Grid item>
              <TextFieldC
                multiline
                inputRef={register}
                name="content"
                label="paragraph"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonSuccess type="submit">
            {selectedParagraph ? "Update" : "Create"}
          </ButtonSuccess>
          <ButtonError onClick={handleCloseForm}>Cancel</ButtonError>
        </DialogActions>
      </form>
    </DialogStyled>
  );
};

export default ParagraphForm;
