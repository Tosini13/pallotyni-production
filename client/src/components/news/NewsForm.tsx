import { useContext, useEffect, useState } from "react";
import {
  Radio,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { ButtonSuccess, ButtonError } from "../../componentsReusable/Buttons";
import {
  DialogCircularProgress,
  DialogStyled,
  RCDialogTitle,
} from "../../componentsReusable/Dialogs";
import TextFieldC from "../../componentsReusable/Forms";
import { TNews, TNewsCreate, E_NEWS_TYPE } from "../../models/News";
import { NewStoreContext } from "../../stores/NewsStore";
import useAction from "../../helpers/useAction";

export interface NewsFormProps {
  open: boolean;
  selectedNews?: TNews;
  handleClose: () => void;
  defaultType: E_NEWS_TYPE;
}

const NewsForm: React.FC<NewsFormProps> = ({
  open,
  handleClose,
  selectedNews,
  defaultType,
}) => {
  const { isProcessing, execute } = useAction();
  const newsStore = useContext(NewStoreContext);
  const { register, handleSubmit, reset } = useForm<TNewsCreate>();

  const [type, setType] = useState(defaultType ?? E_NEWS_TYPE.NEWS);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType((event.target as HTMLInputElement).value as E_NEWS_TYPE);
  };

  const clearForm = () => {
    setType(E_NEWS_TYPE.NEWS);
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
          type,
        })
      );
    } else {
      await execute(newsStore.createNews({ ...data, type }));
    }
    handleCloseForm();
  };

  useEffect(() => {
    reset({ ...selectedNews });
    setType(selectedNews?.type ?? defaultType ?? E_NEWS_TYPE.NEWS);
  }, [reset, selectedNews]);

  const types = new Map<E_NEWS_TYPE, string>();
  types.set(E_NEWS_TYPE.NEWS, "Aktualności");
  types.set(E_NEWS_TYPE.ANNOUNCEMENT, "Ogłoszenia");
  types.set(E_NEWS_TYPE.INTENTION, "Intencje");

  return (
    <DialogStyled open={open} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RCDialogTitle>
          {selectedNews ? "Edycja" : "Tworzenie"} Newsa
        </RCDialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend" color="secondary">
              Typ:
            </FormLabel>
            <RadioGroup
              aria-label="type"
              name="type"
              value={type}
              onChange={handleChange}
            >
              {Object.values(E_NEWS_TYPE).map((type) => (
                <FormControlLabel
                  value={type}
                  control={<Radio />}
                  label={
                    <Typography color="textSecondary">
                      {types.get(type)}
                    </Typography>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
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
                required
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
