import React, { ReactNode } from "react";

import AddIcon from "@material-ui/icons/Add";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import styled from "styled-components";
import { parseStyledBoolean } from "../helpers/BooleanParser";
import { mainTheme } from "../style/config";

const SpeedDialStyled = styled(SpeedDial)`
  position: absolute;
  right: 10px;
  top: 10px;
  transition: all 0.15s;
  button {
    background-color: ${mainTheme.palette.secondary.main};
    color: ${mainTheme.palette.primary.main};
    &:hover {
      background-color: ${mainTheme.palette.secondary.main};
    }
  }
`;

const SpeedDialActionStyled = styled(SpeedDialAction)`
  background-color: ${mainTheme.palette.secondary.main};
`;

const AddStyled = styled(AddIcon)<{
  blocked?: string;
  hoverblocked?: string;
}>`
  transition: all 0.3s;
  ${(props) =>
    props.hoverblocked
      ? `transform: rotate(45deg);`
      : `transform: rotate(0deg);`}
  ${(props) => (props.blocked ? `fill: ${mainTheme.palette.error.dark}` : ``)}
`;

type SpeedDialComponentProps = {
  actions: {
    icon: ReactNode;
    name: string;
  }[];
  blocked?: boolean;
  unBlock?: () => void;
};

const SpeedDialComponent: React.FC<SpeedDialComponentProps> = ({
  actions,
  blocked = false,
  unBlock,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (e: Object, reason: string) => {
    if (blocked && unBlock && reason === "focus") {
      unBlock();
      return true;
    }
    if ((blocked && reason === "mouseEnter") || reason === "focus") {
      return false;
    }
    setOpen(true);
  };

  return (
    <SpeedDialStyled
      ariaLabel="SpeedDial example"
      icon={
        <AddStyled
          blocked={parseStyledBoolean(blocked)}
          hoverblocked={parseStyledBoolean(open || blocked)}
        />
      }
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction={"down"}
    >
      {actions.map((action) => (
        <SpeedDialActionStyled
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={handleClose}
        />
      ))}
    </SpeedDialStyled>
  );
};

export default SpeedDialComponent;
