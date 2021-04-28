import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { NewStoreContext } from "../../../stores/NewsStore";
import { Typography } from "@material-ui/core";

export interface HomeNewsProps {}

const HomeNews: React.FC<HomeNewsProps> = observer(() => {
  const newsStore = useContext(NewStoreContext);
  useEffect(() => {
    newsStore.fetch();
  }, [newsStore]);
  return (
    <>
      {newsStore.getLatestNews(1).map((news) => (
        <Typography color="textPrimary">
          {news.title} - {news.content}
        </Typography>
      ))}
    </>
  );
});

export default HomeNews;
