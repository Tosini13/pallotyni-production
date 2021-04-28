import React, { useContext, useState } from "react";

import { Divider, Grid, Typography } from "@material-ui/core";
import { NewStoreContext } from "../../../stores/NewsStore";
import SideBarNewsSummary from "./SideBarNewsSummary";
import SideBarNewsDetails from "./SideBarNewsDetails";
import { Id } from "../../../models/Global";
import { observer } from "mobx-react";

export interface SideBarNewsProps {}

const SideBarNews: React.FC<SideBarNewsProps> = observer(() => {
  const newsStore = useContext(NewStoreContext);

  const [selectedNews, setSelectedNews] = useState<undefined | Id>(undefined);

  return (
    <>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h5" align="center">
            Latest News
          </Typography>
        </Grid>
        {newsStore.getLatestNews(3).map((news) => (
          <React.Fragment key={news.id}>
            <Grid item onClick={() => setSelectedNews(news.id)}>
              <SideBarNewsSummary news={news} />
            </Grid>
            <Divider
              style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                width: "90%",
                margin: "auto",
              }}
            />
            {selectedNews ? (
              <SideBarNewsDetails
                open={selectedNews === selectedNews}
                id={selectedNews}
                handleClose={() => setSelectedNews(undefined)}
              />
            ) : null}
          </React.Fragment>
        ))}
      </Grid>
    </>
  );
});

export default SideBarNews;
