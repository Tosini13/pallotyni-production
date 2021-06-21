import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";

import { Divider, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { parseStyledBoolean } from "../../helpers/BooleanParser";
import { QuestionDialogDelete } from "../../componentsReusable/Dialogs";
import { NewStoreContext } from "../../stores/NewsStore";
import {
  GridActionStyled,
  HoverStyled,
  ActionButtonStyled,
} from "../aboutUs/AboutUs";
import { E_NEWS_TYPE, TNews } from "../../models/News";
import MainLayout from "../layout/MainLayout";
import BackgroundImg from "../../resources/images/church_cross.png";
import RCButtonsCUD from "../../componentsReusable/ButtonsCUD";
import NewsSummary from "../news/NewsSummary";
import NewsForm from "../news/NewsForm";

export interface NewsProps {}

const Intentions: React.FC<NewsProps> = observer(() => {
  const newsStore = useContext(NewStoreContext);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>(false);
  const [removal, setRemoval] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<TNews | undefined>();

  useEffect(() => {
    newsStore.fetch();
  }, [newsStore]);

  const handleClearActionsSD = () => {
    setRemoval(false);
    setEdition(false);
    setOpenForm(false);
    setSelectedNews(undefined);
  };

  const handleAction = (n: TNews) => {
    if (edition) {
      setSelectedNews(n);
      setOpenForm(true);
    } else if (removal) {
      setSelectedNews(n);
    }
  };

  const allNews = newsStore.getAllIntentions;
  return (
    <MainLayout img={BackgroundImg} title="Intencje">
      <Grid
        container
        spacing={3}
        justify="center"
        style={{ position: "relative" }}
      >
        <RCButtonsCUD
          handleAdd={() => setOpenForm(true)}
          handleEdit={() => setEdition(true)}
          handleDelete={() => setRemoval(true)}
          handleCancel={handleClearActionsSD}
        />
        {allNews.map((news, i) => (
          <React.Fragment key={news.id}>
            <GridActionStyled
              item
              edition={parseStyledBoolean(edition || removal)}
              onClick={() => handleAction(news)}
            >
              <NewsSummary news={news} />
              {edition ? (
                <HoverStyled>
                  <ActionButtonStyled>
                    <EditIcon fontSize="large" />
                  </ActionButtonStyled>
                </HoverStyled>
              ) : null}
              {removal ? (
                <HoverStyled>
                  <ActionButtonStyled>
                    <DeleteIcon fontSize="large" />
                  </ActionButtonStyled>
                </HoverStyled>
              ) : null}
            </GridActionStyled>
            {allNews.length === i + 1 ? null : (
              <Grid item xs={10}>
                <Divider orientation="horizontal" />
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
      <NewsForm
        open={Boolean((openForm || selectedNews) && !removal)}
        selectedNews={openForm ? selectedNews : undefined}
        handleClose={handleClearActionsSD}
        defaultType={E_NEWS_TYPE.INTENTION}
      />
      <QuestionDialogDelete
        open={Boolean(selectedNews && removal)}
        handleNo={handleClearActionsSD}
        handleYes={() => {
          if (selectedNews) {
            newsStore.deleteNews(selectedNews);
            handleClearActionsSD();
          }
        }}
      />
    </MainLayout>
  );
});

export default Intentions;
