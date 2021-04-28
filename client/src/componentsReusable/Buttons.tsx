import { Cancel, CheckCircle } from "@material-ui/icons";
import { Button, ButtonProps } from "@material-ui/core";
import styled from "styled-components";
import { mainTheme } from "../style/config";

const ButtonSuccessStyled = styled(Button)`
  color: ${mainTheme.palette.success.main};
  border-color: ${mainTheme.palette.success.main};
`;

export const ButtonSuccess = (props: ButtonProps) => {
  const { children } = props;
  return (
    <ButtonSuccessStyled
      color="secondary"
      variant="outlined"
      {...props}
      startIcon={<CheckCircle />}
    >
      {children}
    </ButtonSuccessStyled>
  );
};

const ButtonErrorStyled = styled(Button)`
  color: ${mainTheme.palette.error.main};
  border-color: ${mainTheme.palette.error.main};
`;

export const ButtonError = (props: ButtonProps) => {
  const { children } = props;
  return (
    <ButtonErrorStyled
      color="secondary"
      variant="outlined"
      {...props}
      startIcon={<Cancel />}
    >
      {children}
    </ButtonErrorStyled>
  );
};
