import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { NewStoreContext } from "../../../stores/NewsStore";
import { Grid, Typography } from "@material-ui/core";

export interface HomeNewsProps {}

const HomeNews: React.FC<HomeNewsProps> = observer(() => {
  const newsStore = useContext(NewStoreContext);
  useEffect(() => {
    newsStore.fetch();
  }, [newsStore]);
  return (
    <>
      {newsStore.getLatestNews(1).map((news) => (
        <Grid container direction="column" spacing={2} key={news.id}>
          <Grid item>
            <Typography color="textPrimary" variant="h6" align="center">
              {news.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textPrimary" align="justify">
              {news.content}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </>
  );
});

export default HomeNews;
