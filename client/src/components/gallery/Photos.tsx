import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { CircularProgress, Grid, Typography } from "@material-ui/core";

import { Photograph, PhotosStoreContext } from "../../stores/PhotographsStore";
import PhotoDetails from "./PhotoDetails";
import { QuestionDialogDelete } from "../../componentsReusable/Dialogs";
import PhotoSummary from "./PhotoSummary";
import PhotoForm from "./PhotoForm";
import BackgroundImg from "../../resources/images/church_cross.png";
import MainLayout from "../layout/MainLayout";
import { AlbumStoreContext } from "../../stores/GalleryStore";
import { useParams } from "react-router";
import { Id } from "../../models/Global";
import RCButtonsCUD, {
  ACTION_MODE,
  useCUD,
} from "../../componentsReusable/ButtonsCUD";
import useAction from "../../helpers/useAction";

export interface GalleryProps {}

const Gallery: React.FC<GalleryProps> = observer(() => {
  const { isProcessing, execute } = useAction();
  const { id: albumId } = useParams<{
    id: Id;
  }>();
  const storeAlbum = useContext(AlbumStoreContext);
  const storePhotos = useContext(PhotosStoreContext);
  const [image, setImage] = useState<any>();
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | undefined>();
  const [actionMode, setActionMode] = useState<ACTION_MODE | undefined>();

  const { isAdd, isEdit, isDelete } = useCUD(actionMode);

  const photoExistsAction = (action: () => void) =>
    storePhotos.photos.length ? action : undefined;

  useEffect(() => {
    storePhotos.fetch(albumId);
  }, [storePhotos, albumId]);

  useEffect(() => {
    storeAlbum.fetch();
  }, [storeAlbum]);

  const handleClearActionsSD = () => {
    setSelectedPhoto(undefined);
    setActionMode(undefined);
  };

  const currentAlbum = storeAlbum.albums.find((album) => album.id === albumId);
  if (!currentAlbum)
    return (
      <MainLayout img={BackgroundImg} title="Gallery">
        <CircularProgress />
      </MainLayout>
    );
  const IS_ADMIN_TEMP = true; // TODO: change with real admin value;
  return (
    <MainLayout img={BackgroundImg} title={currentAlbum.title}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography color="textPrimary">
            {currentAlbum.description}
          </Typography>
        </Grid>
        <Grid item>
          {IS_ADMIN_TEMP ? (
            <RCButtonsCUD
              mode={actionMode}
              handleAdd={() => setActionMode(ACTION_MODE.ADD)}
              handleEdit={photoExistsAction(() =>
                setActionMode(ACTION_MODE.EDIT)
              )}
              handleDelete={photoExistsAction(() =>
                setActionMode(ACTION_MODE.DELETE)
              )}
              handleCancel={photoExistsAction(handleClearActionsSD)}
            />
          ) : null}
          <Grid container spacing={2} justify="space-evenly">
            {storePhotos?.photos.map((photo) => (
              <React.Fragment key={photo.id}>
                <Grid
                  item
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  style={{ position: "relative" }}
                >
                  <PhotoSummary
                    photo={photo}
                    edition={isEdit}
                    removal={isDelete}
                  />
                </Grid>
                <PhotoDetails
                  photo={photo}
                  open={photo.id === selectedPhoto?.id && !isDelete && !isEdit}
                  handleClose={() => setSelectedPhoto(undefined)}
                />
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <PhotoForm
        albumId={albumId}
        image={image}
        setImage={setImage}
        open={Boolean(isAdd || (selectedPhoto && isEdit))}
        selectedPhotograph={selectedPhoto}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialogDelete
        open={Boolean(selectedPhoto && isDelete)}
        handleNo={handleClearActionsSD}
        handleYes={async () => {
          if (selectedPhoto) {
            await execute(
              storePhotos.removePhoto({ photograph: selectedPhoto, albumId })
            );
            handleClearActionsSD();
          }
        }}
        isProcessing={isProcessing}
      />
    </MainLayout>
  );
});

export default Gallery;
