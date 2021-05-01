import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { CircularProgress, Grid } from "@material-ui/core";
import { QuestionDialogDelete } from "../../componentsReusable/Dialogs";
import BackgroundImg from "../../resources/images/church_cross.png";
import MainLayout from "../layout/MainLayout";
import { Album, AlbumStoreContext } from "../../stores/GalleryStore";
import AlbumForm from "./AlbumForm";
import styled from "styled-components";
import { parseStyledBoolean } from "../../helpers/BooleanParser";
import { useHistory } from "react-router";
import { GetRoute } from "../../models/Global";
import AlbumSummary from "./AlbumSummary";
import RCButtonsCUD, {
  ACTION_MODE,
  useCUD,
} from "../../componentsReusable/ButtonsCUD";
import useAction from "../../helpers/useAction";

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
  const { isProcessing, execute } = useAction();
  const router = useHistory();
  const store = useContext(AlbumStoreContext);

  const [selectedAlbum, setSelectedAlbum] = useState<Album | undefined>();
  const [mouseOverPhoto, setMouseOverPhoto] = useState<boolean>(false);
  const [actionMode, setActionMode] = useState<ACTION_MODE | undefined>();

  const { isAdd, isEdit, isDelete } = useCUD(actionMode);

  const albumExistsAction = (action: () => void) =>
    store.albums.length ? action : undefined;

  useEffect(() => {
    console.log("fetch!");

    store.fetch();
  }, [store]);

  const handleClearActionsSD = () => {
    setSelectedAlbum(undefined);
    setActionMode(undefined);
  };

  const handleAction = (a: Album) => {
    if (!isEdit && !isDelete && a.photos.length) {
      router.push(GetRoute.album(a.id));
    }
    if (isEdit) {
      setSelectedAlbum(a);
    }
    if (isDelete) {
      setSelectedAlbum(a);
    }
  };

  return (
    <MainLayout img={BackgroundImg} title="Albumy">
      <RCButtonsCUD
        mode={actionMode}
        handleAdd={() => setActionMode(ACTION_MODE.ADD)}
        handleEdit={albumExistsAction(() => setActionMode(ACTION_MODE.EDIT))}
        handleDelete={albumExistsAction(() =>
          setActionMode(ACTION_MODE.DELETE)
        )}
        handleCancel={albumExistsAction(handleClearActionsSD)}
      />
      <Grid container justify="space-around">
        {store.getAlbumsWithPhotos().map((album) => (
          <AlbumSummary
            album={album}
            handleAction={handleAction}
            key={album.id}
          >
            {album.coverPhoto ? (
              <ImgStyled
                src={album.coverPhoto?.path}
                alt={album.coverPhoto?.path}
                action={parseStyledBoolean(isEdit || isDelete)}
                hovered={parseStyledBoolean(
                  (isEdit || isDelete) && mouseOverPhoto
                )}
                onMouseLeave={() => setMouseOverPhoto(false)}
                onMouseEnter={() => setMouseOverPhoto(true)}
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
        open={Boolean(isAdd || (selectedAlbum && isEdit))}
        selectedAlbum={selectedAlbum}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialogDelete
        open={Boolean(selectedAlbum && isDelete)}
        handleNo={handleClearActionsSD}
        handleYes={async () => {
          if (selectedAlbum) {
            console.log("########################");
            console.log("selectedAlbum", selectedAlbum);
            await execute(store.deleteAlbum(selectedAlbum));
            handleClearActionsSD();
          }
        }}
        isProcessing={isProcessing}
      />
    </MainLayout>
  );
});

export default Albums;
