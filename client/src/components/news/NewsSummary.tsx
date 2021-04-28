import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { TNews } from "../../models/News";
import { TitleTypography } from "../../style/MainStyled";

const DateTypographyStyled = styled(Typography)`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const ContentTypographyStyled = styled(Typography)`
  margin-top: 20px;
  padding: 20px;
`;

export interface NewsSummaryProps {
  news: TNews;
}

const NewsSummary: React.FC<NewsSummaryProps> = ({ news }) => {
  return (
    <>
      <Grid container justify="center">
        {news.title ? (
          <Grid item xs={10}>
            <TitleTypography
              variant="h6"
              style={{ padding: "5px 50px", marginBottom: "10px" }}
            >
              {news.title}
            </TitleTypography>
          </Grid>
        ) : null}
        <DateTypographyStyled variant="body2" color="textPrimary">
          {news.createdAt}
        </DateTypographyStyled>
      </Grid>
      <ContentTypographyStyled color="textPrimary" align="justify">
        {news.content}
      </ContentTypographyStyled>
    </>
  );
};

export default NewsSummary;
