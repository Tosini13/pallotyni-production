import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { NewStoreContext } from "../../../stores/NewsStore";
import { Grid, Typography } from "@material-ui/core";
import { TitleTypography } from "../../../style/MainStyled";

export interface HomeNewsProps {}

const HomeNews: React.FC<HomeNewsProps> = observer(() => {
  const newsStore = useContext(NewStoreContext);
  const latestNews = newsStore.getLatestNews();
  useEffect(() => {
    newsStore.fetch();
  }, [newsStore]);

  if (!latestNews) {
    return null;
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ padding: "0px 20px" }}
    >
      <Grid item>
        <TitleTypography>{"Aktualności"}</TitleTypography>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography color="textPrimary" variant="h6" align="center">
              {latestNews.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textPrimary" align="justify">
              {latestNews.content}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default HomeNews;
