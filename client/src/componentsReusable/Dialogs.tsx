import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogTitleProps,
} from "@material-ui/core";
import styled from "styled-components";
import { mainTheme } from "../style/config";
import { ButtonError, ButtonSuccess } from "./Buttons";

export const DialogCircularProgress = styled(CircularProgress)`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

export const DialogStyled = styled(Dialog)`
  .MuiDialog-paper {
    width: 99vw;
    background-color: ${mainTheme.palette.primary.main};
  }
`;

export const DialogTitleStyled = styled(DialogTitle)`
  color: ${mainTheme.palette.secondary.main};
  text-align: center;
`;

export const RCDialogTitle: React.FC<DialogTitleProps> = ({
  children,
  ...props
}) => <DialogTitleStyled {...props}>{children}</DialogTitleStyled>;

export const DialogContenteStyled = styled(DialogContent)`
  color: ${mainTheme.palette.text.secondary};
  text-align: center;
`;

export interface QuestionDialogProps {
  title: string;
  content?: string;
  open: boolean;
  handleClose?: () => void;
}

const QuestionDialog: React.FC<QuestionDialogProps> = ({
  children,
  title,
  content,
  open,
  handleClose,
}) => {
  return (
    <DialogStyled open={open} onClose={handleClose}>
      <RCDialogTitle>{title}</RCDialogTitle>
      {content ? <DialogContenteStyled>{content}</DialogContenteStyled> : null}
      <DialogActions>{children}</DialogActions>
    </DialogStyled>
  );
};

export default QuestionDialog;

export interface QuestionDialogDeleteProps {
  open: boolean;
  isProcessing?: boolean;
  handleNo: () => void;
  handleYes: () => void;
}

export const QuestionDialogDelete: React.FC<QuestionDialogDeleteProps> = ({
  open,
  isProcessing,
  handleNo,
  handleYes,
}) => {
  return (
    <QuestionDialog open={open} title="Czy an pewno chcesz usunąć?">
      <ButtonSuccess onClick={handleYes} disabled={isProcessing}>
        Tak
      </ButtonSuccess>
      <ButtonError onClick={handleNo} disabled={isProcessing}>
        Nie
      </ButtonError>
      {isProcessing ? <DialogCircularProgress color="secondary" /> : null}
    </QuestionDialog>
  );
};
