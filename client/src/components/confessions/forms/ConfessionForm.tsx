import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { DialogActions, DialogContent, Grid, Switch } from "@material-ui/core";

import {
  DialogCircularProgress,
  DialogStyled,
  RCDialogTitle,
} from "../../../componentsReusable/Dialogs";
import TextFieldC from "../../../componentsReusable/Forms";
import { DATE_FORMAT, Day } from "../../../models/Global";
import {
  Confession,
  ConfessionStoreContext,
} from "../../../stores/ConfessionStore";
import DatePickerSwitch, {
  FormControlLabelStyled,
} from "../../services/forms/DatePickerSwitch";
import {
  ButtonError,
  ButtonSuccess,
} from "../../../componentsReusable/Buttons";
import { TCreateConfession } from "../../../models/Confession";
import useAction from "../../../helpers/useAction";

type TConfessionForm = TCreateConfession;

export interface ConfessionFormProps {
  open: boolean;
  selectedConfession?: Confession;
  handleClose: () => void;
}

const ConfessionForm: React.FC<ConfessionFormProps> = ({
  open,
  selectedConfession,
  handleClose,
}) => {
  const { isProcessing, execute } = useAction();
  const sConfession = useContext(ConfessionStoreContext);
  const { register, handleSubmit, reset } = useForm<TConfessionForm>();

  const [periodic, setPeriodic] = useState<boolean>(true);
  const [repeat, setRepeat] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date() ?? format(new Date(), DATE_FORMAT)
  );
  const [selectedDays, setSelectedDays] = useState<Day[]>(
    selectedConfession?.days ?? []
  );

  const clearForm = () => {
    reset({
      title: "",
      fromTime: "12:00",
      toTime: "12:30",
      priest: "",
      period: "",
    });
  };

  const handleCloseForm = () => {
    clearForm();
    handleClose();
  };

  const onSubmit = async (data: TConfessionForm) => {
    if (selectedConfession) {
      await execute(
        sConfession.updateConfession({
          title: data.title,
          priest: data.priest,
          fromTime: !periodic ? data.fromTime : undefined,
          toTime: !periodic ? data.toTime : undefined,
          days: !periodic && repeat ? selectedDays : undefined,
          date:
            !periodic && !repeat && selectedDate
              ? format(selectedDate, DATE_FORMAT)
              : undefined,
          period: periodic ? data.period : undefined,
          id: selectedConfession.id,
        })
      );
    } else {
      await execute(
        sConfession.createConfession({
          title: data.title,
          priest: data.priest,
          fromTime: !periodic ? data.fromTime : undefined,
          toTime: !periodic ? data.toTime : undefined,
          days: !periodic && repeat ? selectedDays : undefined,
          date:
            !periodic && !repeat && selectedDate
              ? format(selectedDate, DATE_FORMAT)
              : undefined,
          period: periodic ? data.period : undefined,
        })
      );
    }
    handleCloseForm();
  };

  useEffect(() => {
    reset(selectedConfession);
    setSelectedDays(selectedConfession?.days ?? []);
    setSelectedDate(
      selectedConfession?.date ? new Date(selectedConfession?.date) : new Date()
    );
    setRepeat(Boolean(selectedConfession?.days?.length));
  }, [reset, selectedConfession]);

  return (
    <DialogStyled open={open} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RCDialogTitle>
          {selectedConfession ? "Edycja" : "Tworzenie"} Spowiedzi
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
            <Grid item md={3}>
              <FormControlLabelStyled
                value={periodic}
                checked={periodic}
                name="periodic"
                control={<Switch color="secondary" checked={periodic} />}
                label="Okresowo"
                labelPlacement="end"
                inputRef={register}
                onClick={() => setPeriodic(!periodic)}
              />
            </Grid>
            <Grid item md={9}>
              <TextFieldC
                multiline
                inputRef={register}
                name="period"
                label="Okres"
                disabled={!periodic}
                required={periodic}
              />
            </Grid>
            <DatePickerSwitch
              disabled={periodic}
              register={register}
              repeat={repeat}
              setRepeat={setRepeat}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
            />
            {!periodic ? (
              <>
                <Grid item md={3}>
                  <TextFieldC
                    required
                    label="Rozpoczęcie"
                    type="time"
                    defaultValue={"12:00"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 60,
                    }}
                    inputRef={register}
                    name="fromTime"
                  />
                </Grid>
                <Grid item md={3}>
                  <TextFieldC
                    required
                    label="Zakończenie"
                    type="time"
                    defaultValue={"12:00"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 60,
                    }}
                    inputRef={register}
                    name="toTime"
                  />
                </Grid>
              </>
            ) : null}
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

export default ConfessionForm;
