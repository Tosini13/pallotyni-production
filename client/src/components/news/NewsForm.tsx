import { useContext, useEffect } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { ButtonSuccess, ButtonError } from "../../componentsReusable/Buttons";
import { DialogStyled, RCDialogTitle } from "../../componentsReusable/Dialogs";
import TextFieldC from "../../componentsReusable/Forms";
import { TNews, TNewsCreate } from "../../models/News";
import { NewStoreContext } from "../../stores/NewsStore";

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

  const onSubmit = (data: TNewsCreate) => {
    if (selectedNews) {
      newsStore.updateNews({
        ...data,
        id: selectedNews.id,
        createdAt: selectedNews.createdAt,
      });
    } else {
      newsStore.createNews(data);
    }
    handleCloseForm();
  };

  useEffect(() => {
    reset(selectedNews);
  }, [reset, selectedNews]);

  return (
    <DialogStyled open={open} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RCDialogTitle>{selectedNews ? "Edit" : "Create"} News</RCDialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextFieldC inputRef={register} name="title" label="title" />
            </Grid>
            <Grid item>
              <TextFieldC
                multiline
                inputRef={register}
                name="content"
                label="content"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonSuccess type="submit">
            {selectedNews ? "Update" : "Create"}
          </ButtonSuccess>
          <ButtonError onClick={handleCloseForm}>Cancel</ButtonError>
        </DialogActions>
      </form>
    </DialogStyled>
  );
};

export default NewsForm;
