import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { CircularProgress, Grid } from "@material-ui/core";
import QuestionDialog from "../../componentsReusable/Dialogs";
import { ButtonError, ButtonSuccess } from "../../componentsReusable/Buttons";
import BackgroundImg from "../../resources/images/church_cross.png";
import MainLayout from "../layout/MainLayout";
import { Album, AlbumStoreContext } from "../../stores/GalleryStore";
import AlbumForm from "./AlbumForm";
import styled from "styled-components";
import { parseStyledBoolean } from "../../helpers/BooleanParser";
import { GALLERY_PATH } from "../../models/const";
import { useHistory } from "react-router";
import { GetRoute } from "../../models/Global";
import AlbumSummary from "./AlbumSummary";
import RCButtonsCUD from "../../componentsReusable/ButtonsCUD";

const ImgStyled = styled.img<{ action?: string; hovered?: string }>`
  height: 150px;
  border-radius: 3px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    ${(props) =>
      props.action
        ? `filter: grayscale(1);`
        : `
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
    transform: translate(-3px, -3px);`}
  }
  ${(props) => (props.hovered ? `filter: grayscale(1);` : ``)}
`;
export interface AlbumsProps {}

const Albums: React.FC<AlbumsProps> = observer(() => {
  const router = useHistory();
  const store = useContext(AlbumStoreContext);

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>(false);
  const [removal, setRemoval] = useState<boolean>(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | undefined>();
  const [mouseOverPhoto, setMouseOverPhoto] = useState<boolean>(false);

  useEffect(() => {
    console.log("fetch!");

    store.fetch();
  }, [store]);

  const handleClearActionsSD = () => {
    setRemoval(false);
    setEdition(false);
    setOpenForm(false);
    setSelectedAlbum(undefined);
  };

  const handleAction = (a: Album) => {
    if (!edition && !removal && a.photos.length) {
      router.push(GetRoute.album(a.id));
    }
    if (edition) {
      setSelectedAlbum(a);
      setOpenForm(true);
    }
    if (removal) {
      setSelectedAlbum(a);
    }
  };

  const IS_ADMIN_TEMP = true; // TODO: change with real admin value;
  return (
    <MainLayout img={BackgroundImg} title="Albums">
      {" "}
      {IS_ADMIN_TEMP ? (
        <RCButtonsCUD
          handleAdd={() => setOpenForm(true)}
          handleEdit={() => setEdition(true)}
          handleDelete={() => setRemoval(true)}
          handleCancel={handleClearActionsSD}
        />
      ) : null}
      <Grid container justify="space-around">
        {store.getAlbumsWithPhotos().map((album) => (
          <AlbumSummary
            album={album}
            handleAction={handleAction}
            key={album.id}
          >
            {album.coverPhoto ? (
              <ImgStyled
                src={`${GALLERY_PATH}/${album.coverPhoto?.path}`}
                alt={album.coverPhoto?.path}
                action={parseStyledBoolean(edition || removal)}
                hovered={parseStyledBoolean(
                  (edition || removal) && mouseOverPhoto
                )}
              />
            ) : (
              <CircularProgress />
            )}
          </AlbumSummary>
        ))}
      </Grid>
      <Grid container justify="space-around">
        {store.getAlbumsWithoutPhotos().map((album) => (
          <AlbumSummary
            album={album}
            handleAction={handleAction}
            key={album.id}
          />
        ))}
      </Grid>
      <AlbumForm
        open={Boolean(openForm && !removal)}
        selectedAlbum={openForm ? selectedAlbum : undefined}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialog
        open={Boolean(selectedAlbum && removal)}
        handleClose={handleClearActionsSD}
        title="Do you want to delete?"
        content="Do you want to delete?"
      >
        <ButtonSuccess
          onClick={() => {
            if (selectedAlbum) {
              store.deleteAlbum(selectedAlbum);
              handleClearActionsSD();
            }
          }}
        >
          Yes
        </ButtonSuccess>
        <ButtonError onClick={handleClearActionsSD}>No</ButtonError>
      </QuestionDialog>
    </MainLayout>
  );
});

export default Albums;
