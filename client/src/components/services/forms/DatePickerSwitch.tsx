import { useState } from "react";
import "date-fns";
import { format } from "date-fns";

import { DATE_FORMAT, Day } from "../../../models/Global";
import styled from "styled-components";
import { FormControlLabel, Grid, Switch } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DayPicker from "./DayPicker";
import { inputStyle } from "../../../componentsReusable/Forms";
import { mainTheme } from "../../../style/config";

const KeyboardDatePickerStyled = styled(KeyboardDatePicker)`
  ${inputStyle}
  width: fit-content;
  .MuiPickersDay-day {
    color: ${mainTheme.palette.text.secondary};
  }
`;

export interface DatePickerSwitchProps {
  register: any;
  repeat: boolean;
  setRepeat: (repeat: boolean) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedDays: Day[];
  setSelectedDays: (days: Day[]) => void;
}

const DatePickerSwitch: React.FC<DatePickerSwitchProps> = ({
  register,
  repeat,
  setRepeat,
  selectedDate,
  setSelectedDate,
  selectedDays,
  setSelectedDays,
}) => {
  const handleSelect = (day: Day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Grid item md={3}>
        <FormControlLabel
          value={repeat}
          checked={repeat}
          name="repeat"
          control={<Switch color="secondary" checked={repeat} />}
          label="Repeat"
          labelPlacement="end"
          inputRef={register}
          onClick={() => setRepeat(!repeat)}
        />
      </Grid>
      <Grid item md={9}>
        {repeat ? (
          <DayPicker selected={selectedDays} handleSelect={handleSelect} />
        ) : (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePickerStyled
              color="secondary"
              label="Date picker dialog"
              format={DATE_FORMAT}
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        )}
      </Grid>
    </>
  );
};

export default DatePickerSwitch;
