import React from "react";

import { Dialog, DialogContent, Typography } from "@material-ui/core";
import { Photograph } from "../../stores/PhotographsStore";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../models/Global";
import { pl } from "date-fns/locale";

const ImgContainer = styled.div`
  background-color: ${mainTheme.palette.primary.main};
`;

const DialogStyled = styled(Dialog)`
  .MuiDialog-paper {
    background-color: transparent;
  }
`;

const DialogContentStyled = styled(DialogContent)`
  margin-top: 5px;
  background-color: ${mainTheme.palette.primary.main};
`;

export interface PhotoDetailsProps {
  photo: Photograph;
  open: boolean;
  handleClose: () => void;
}

const PhotoDetails: React.FC<PhotoDetailsProps> = ({
  photo,
  open,
  handleClose,
}) => {
  return (
    <DialogStyled open={open} onClose={handleClose}>
      <div style={{ position: "relative" }}>
        <ImgContainer>
          <img
            src={photo.path}
            alt={photo.path}
            style={{ maxHeight: "100vh", maxWidth: "600px", width: "100%" }}
          />
        </ImgContainer>
        <DialogContentStyled>
          <Typography color="textSecondary" variant="body2" align="right">
            {format(new Date(photo.createdAt), DATE_FORMAT, { locale: pl })}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {photo.description}
          </Typography>
        </DialogContentStyled>
      </div>
    </DialogStyled>
  );
};

export default PhotoDetails;
