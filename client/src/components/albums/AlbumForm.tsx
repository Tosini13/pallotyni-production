import { useContext, useEffect } from "react";
import { DialogActions, DialogContent, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { ButtonSuccess, ButtonError } from "../../componentsReusable/Buttons";
import {
  DialogCircularProgress,
  DialogStyled,
  RCDialogTitle,
} from "../../componentsReusable/Dialogs";
import TextFieldC from "../../componentsReusable/Forms";
import { TAlbum, TAlbumCreate } from "../../models/Album";
import { AlbumStoreContext } from "../../stores/GalleryStore";
import useAction from "../../helpers/useAction";

export interface AlbumFormProps {
  open: boolean;
  selectedAlbum?: TAlbum;
  handleClose: () => void;
}

const AlbumForm: React.FC<AlbumFormProps> = ({
  open,
  handleClose,
  selectedAlbum,
}) => {
  const { isProcessing, execute } = useAction();
  const store = useContext(AlbumStoreContext);
  const { register, handleSubmit, reset } = useForm<TAlbumCreate>();

  const clearForm = () => {
    reset({
      title: "",
      description: "",
    });
  };

  const handleCloseForm = () => {
    handleClose();
    clearForm();
  };

  const onSubmit = async (data: TAlbumCreate) => {
    if (selectedAlbum) {
      await execute(
        store.updateAlbum({
          ...data,
          id: selectedAlbum.id,
        })
      );
    } else {
      await execute(store.createAlbum(data));
    }
    handleCloseForm();
  };

  useEffect(() => {
    reset(selectedAlbum);
  }, [reset, selectedAlbum]);

  return (
    <DialogStyled open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RCDialogTitle>
          {selectedAlbum ? "Edycja" : "Tworzenie"} Albumu
        </RCDialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextFieldC
                inputRef={register}
                name="title"
                label="Tytuł"
                color="secondary"
              />
            </Grid>
            <Grid item>
              <TextFieldC
                multiline
                inputRef={register}
                name="description"
                label="Opis"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonSuccess type="submit" disabled={isProcessing}>
            Zapisz{" "}
          </ButtonSuccess>
          <ButtonError onClick={handleCloseForm} disabled={isProcessing}>
            Anuluj
          </ButtonError>
        </DialogActions>
        {isProcessing ? <DialogCircularProgress color="secondary" /> : null}
      </form>
    </DialogStyled>
  );
};

export default AlbumForm;
