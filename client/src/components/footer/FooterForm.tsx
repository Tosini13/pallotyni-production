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
import useAction from "../../helpers/useAction";
import { TFooterData } from "../../models/Footer";
import { FooterStoreContext } from "../../stores/FooterStore";

export interface FooterFormProps {
  open: boolean;
  data?: TFooterData;
  handleClose: () => void;
}

const FooterForm: React.FC<FooterFormProps> = ({ open, handleClose, data }) => {
  const { isProcessing, execute } = useAction();
  const footerStore = useContext(FooterStoreContext);
  const { register, handleSubmit, reset } = useForm<TFooterData>();

  const clearForm = () => {
    reset({
      ...data,
    });
  };

  const handleCloseForm = () => {
    handleClose();
    clearForm();
  };

  const onSubmit = async (data: TFooterData) => {
    await execute(footerStore.updateFooter(data));
    handleCloseForm();
  };

  useEffect(() => {
    reset({ ...data });
  }, [reset, data, open]);

  return (
    <DialogStyled open={open} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RCDialogTitle>Edycja Stopki</RCDialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextFieldC inputRef={register} name="address" label="Adres" />
            </Grid>
            <Grid item>
              <TextFieldC
                inputRef={register}
                name="mailbox"
                label="Skrzynka pocztowa"
              />
            </Grid>
            <Grid item>
              <TextFieldC inputRef={register} name="tel" label="tel" />
            </Grid>
            <Grid item>
              <TextFieldC inputRef={register} name="fax" label="tel./fax" />
            </Grid>
            <Grid item>
              <TextFieldC inputRef={register} name="email" label="e-mail" />
            </Grid>
            <Grid item>
              <TextFieldC
                inputRef={register}
                name="accountNumber"
                label="numer konta bankowego"
              />
            </Grid>
            <Grid item>
              <TextFieldC
                inputRef={register}
                name="bankName"
                label="Nazwa banku"
              />
            </Grid>
            <Grid item>
              <TextFieldC
                inputRef={register}
                name="officialWebsite"
                label="Oficjalna Strona"
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

export default FooterForm;
