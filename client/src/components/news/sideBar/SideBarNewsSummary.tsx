import React, { useContext, useState } from "react";
import styled from "styled-components";

import { Grid, Paper, Typography } from "@material-ui/core";
import { News } from "../../../stores/NewsStore";

const backgroundColor = "rgb(255, 255, 255)";
const greyColor = "150";
const backgroundColorHovered = `rgba(${greyColor}, ${greyColor}, ${greyColor})`;
const PaperStyled = styled.div`
  padding: 10px;
  background-color: ${backgroundColor};
  cursor: pointer;
  position: relative;
  max-height: 20vh;
  overflow: hidden;
  transition: all 0.3s;
  &:hover {
    background-color: ${backgroundColorHovered};
  }
`;

const ContentTypographyStyled = styled(Typography)`
  height: 40%;
`;

const ReadMoreStyled = styled.div<{
  open: boolean;
}>`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 20px;
  padding: 3px 10px;
  transition: all 0.3s;
  ${(props) =>
    props.open
      ? `
      transform: translateY(0%);
      background-color: ${backgroundColorHovered};
      box-shadow: 0px -6px 4px ${backgroundColorHovered};`
      : `
      transform: translateY(100%);
      background-color: ${backgroundColor};
      box-shadow: 0px -6px 4px ${backgroundColor};`}
`;

export interface SideBarNewsSummaryProps {
  news: News;
}

const SideBarNewsSummary: React.FC<SideBarNewsSummaryProps> = ({ news }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <PaperStyled
      onMouseOver={() => setReadMore(true)}
      onMouseLeave={() => setReadMore(false)}
    >
      <Typography variant="h6">{news.title}</Typography>
      <ContentTypographyStyled variant="body2">
        {news.content}
      </ContentTypographyStyled>
      <ReadMoreStyled open={readMore}>
        <Typography variant="subtitle2">Read more...</Typography>
      </ReadMoreStyled>
    </PaperStyled>
  );
};

export default SideBarNewsSummary;
