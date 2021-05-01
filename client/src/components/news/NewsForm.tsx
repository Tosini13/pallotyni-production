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
import { TNews, TNewsCreate } from "../../models/News";
import { NewStoreContext } from "../../stores/NewsStore";
import useAction from "../../helpers/useAction";

export interface NewsFormProps {
  open: boolean;
  selectedNews?: TNews;
  handleClose: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({
  open,
  handleClose,
  selectedNews,
}) => {
  const { isProcessing, execute } = useAction();
  const newsStore = useContext(NewStoreContext);
  const { register, handleSubmit, reset } = useForm<TNewsCreate>();

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

  const onSubmit = async (data: TNewsCreate) => {
    if (selectedNews) {
      await execute(
        newsStore.updateNews({
          ...data,
          id: selectedNews.id,
          createdAt: selectedNews.createdAt,
        })
      );
    } else {
      await execute(newsStore.createNews(data));
    }
    handleCloseForm();
  };

  useEffect(() => {
    reset(selectedNews);
  }, [reset, selectedNews]);

  return (
    <DialogStyled open={open} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RCDialogTitle>
          {selectedNews ? "Edycja" : "Tworzenie"} Newsa
        </RCDialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextFieldC inputRef={register} name="title" label="Tytuł" />
            </Grid>
            <Grid item>
              <TextFieldC
                multiline
                inputRef={register}
                name="content"
                label="Treść"
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

export default NewsForm;
