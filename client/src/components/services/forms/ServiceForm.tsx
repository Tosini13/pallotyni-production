import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DialogActions, DialogContent, Grid } from "@material-ui/core";
import {
  ButtonError,
  ButtonSuccess,
} from "../../../componentsReusable/Buttons";
import {
  DialogCircularProgress,
  DialogStyled,
  RCDialogTitle,
} from "../../../componentsReusable/Dialogs";
import TextFieldC from "../../../componentsReusable/Forms";
import { Service, ServiceStoreContext } from "../../../stores/ServiceStore";
import { DATE_FORMAT, Day } from "../../../models/Global";
import { format } from "date-fns";
import DatePickerSwitch from "./DatePickerSwitch";
import { TServiceCreate } from "../../../models/Service";
import useAction from "../../../helpers/useAction";

type TServiceForm = TServiceCreate;

export interface ServiceFormProps {
  open: boolean;
  selectedService?: Service;
  handleClose: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  open,
  handleClose,
  selectedService,
}) => {
  const { isProcessing, execute } = useAction();
  const sStore = useContext(ServiceStoreContext);
  const { register, handleSubmit, reset } = useForm<TServiceForm>();

  const [repeat, setRepeat] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date() ?? format(new Date(), DATE_FORMAT)
  );
  const [selectedDays, setSelectedDays] = useState<Day[]>(
    selectedService?.days ?? []
  );

  const clearForm = () => {
    reset({
      title: "",
      time: "12:00",
      priest: "",
    });
  };
  const handleCloseForm = () => {
    handleClose();
    clearForm();
  };

  const onSubmit = async (data: TServiceForm) => {
    if (repeat && !selectedDays.length) {
      console.log("select Days!");
    }
    if (selectedService) {
      await execute(
        sStore.updateService({
          title: data.title,
          priest: data.priest,
          time: data.time,
          days: repeat ? selectedDays : undefined,
          date:
            !repeat && selectedDate
              ? format(selectedDate, DATE_FORMAT)
              : undefined,
          id: selectedService.id,
        })
      );
    } else {
      await execute(
        sStore.createService({
          title: data.title,
          priest: data.priest,
          time: data.time,
          days: repeat ? selectedDays : undefined,
          date:
            !repeat && selectedDate
              ? format(selectedDate, DATE_FORMAT)
              : undefined,
        })
      );
    }
    handleCloseForm();
  };

  useEffect(() => {
    reset(selectedService);
    setSelectedDays(selectedService?.days ?? []);
    setSelectedDate(
      selectedService?.date ? new Date(selectedService?.date) : new Date()
    );
    setRepeat(Boolean(selectedService?.days?.length));
  }, [reset, selectedService]);

  return (
    <DialogStyled open={open} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RCDialogTitle>
          {selectedService ? "Edycja" : "Tworzenie"} Mszy Świętej
        </RCDialogTitle>
        <DialogContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={6}>
              <TextFieldC
                required
                inputRef={register}
                name="title"
                label="Tytuł"
              />
            </Grid>
            <Grid item md={6}>
              <TextFieldC
                multiline
                inputRef={register}
                name="priest"
                label="Ksiądz"
              />
            </Grid>
            <DatePickerSwitch
              register={register}
              repeat={repeat}
              setRepeat={setRepeat}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
            />
            <Grid item md={3}>
              <TextFieldC
                required
                label="Czas"
                type="time"
                defaultValue={"12:00"}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 60,
                }}
                inputRef={register}
                name="time"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonSuccess type="submit" disabled={isProcessing}>
            Zapisz
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

export default ServiceForm;
