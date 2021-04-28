import React, { useContext } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { NewStoreContext } from "../../../stores/NewsStore";
import { Id } from "../../../models/Global";
import styled from "styled-components";

export interface SideBarNewsDetailsProps {
  id: Id;
  open: boolean;
  handleClose: () => void;
}

const SideBarNewsDetails: React.FC<SideBarNewsDetailsProps> = ({
  open,
  id,
  handleClose,
}) => {
  const newsStore = useContext(NewStoreContext);
  const news = newsStore.getNews(id);
  if (!news) return <p>No content</p>;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h6">{news.title}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2">{news.content}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default SideBarNewsDetails;
