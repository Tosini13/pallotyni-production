import { Grid, Paper, Typography } from "@material-ui/core";
import styled from "styled-components";
import { parseStyledBoolean } from "../../../helpers/BooleanParser";
import { Day } from "../../../models/Global";
import { mainTheme } from "../../../style/config";

const DaysContainerStyled = styled(Grid)`
  background-color: ${mainTheme.palette.secondary.light};
  div:not(:first-child) {
    border-left: solid 1px ${mainTheme.palette.secondary.light};
  }
`;
const DayContainerStyled = styled(Grid)<{ selectedday?: string }>`
  flex-grow: 1;
  transition: all 0.3s;
  &:hover {
    background-color: ${mainTheme.palette.secondary.main};
    cursor: pointer;
  }
  ${(props) =>
    props.selectedday
      ? `background-color: ${mainTheme.palette.secondary.main};
      `
      : ``}
`;

const DayTypoStyled = styled(Typography)<{ selectedday?: string }>`
  transition: all 0.15s;
  ${(props) =>
    props.selectedday ? `color: ${mainTheme.palette.primary.main};` : ``}
`;

export interface DayPickerProps {
  selected: Day[];
  handleSelect: (day: Day) => void;
}

const DayPicker: React.FC<DayPickerProps> = ({ selected, handleSelect }) => {
  return (
    <Paper style={{ overflow: "hidden", margin: "23px 0px" }}>
      <DaysContainerStyled
        container
        justify="space-between"
        alignItems="stretch"
      >
        {Object.values(Day).map((day) => (
          <DayContainerStyled
            item
            key={day}
            selectedday={parseStyledBoolean(selected.includes(day))}
            onClick={() => handleSelect(day)}
          >
            <DayTypoStyled
              align="center"
              selectedday={parseStyledBoolean(selected.includes(day))}
            >
              {daysLabel.get(day)}
            </DayTypoStyled>
          </DayContainerStyled>
        ))}
      </DaysContainerStyled>
    </Paper>
  );
};

export default DayPicker;

const daysLabel = new Map();
daysLabel.set(Day.mon, "pon");
daysLabel.set(Day.tue, "wt");
daysLabel.set(Day.wed, "śr");
daysLabel.set(Day.thu, "czw");
daysLabel.set(Day.fri, "pią");
daysLabel.set(Day.sat, "sob");
daysLabel.set(Day.sun, "nie");
