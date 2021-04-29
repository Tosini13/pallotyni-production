import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Grid } from "@material-ui/core";

import { Photograph, PhotosStoreContext } from "../../stores/PhotographsStore";
import PhotoDetails from "./PhotoDetails";
import QuestionDialog from "../../componentsReusable/Dialogs";
import { ButtonError, ButtonSuccess } from "../../componentsReusable/Buttons";
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

export interface GalleryProps {}

const Gallery: React.FC<GalleryProps> = observer(() => {
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

  const IS_ADMIN_TEMP = true; // TODO: change with real admin value;
  return (
    <MainLayout img={BackgroundImg} title="Gallery">
      {IS_ADMIN_TEMP ? (
        <RCButtonsCUD
          mode={actionMode}
          handleAdd={() => setActionMode(ACTION_MODE.ADD)}
          handleEdit={photoExistsAction(() => setActionMode(ACTION_MODE.EDIT))}
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
              <PhotoSummary photo={photo} edition={isEdit} removal={isDelete} />
            </Grid>
            <PhotoDetails
              photo={photo}
              open={photo.id === selectedPhoto?.id && !isDelete && !isEdit}
              handleClose={() => setSelectedPhoto(undefined)}
            />
          </React.Fragment>
        ))}
      </Grid>
      <PhotoForm
        albumId={albumId}
        image={image}
        setImage={setImage}
        open={Boolean(isAdd || (selectedPhoto && isEdit))}
        selectedPhotograph={selectedPhoto}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialog
        open={Boolean(selectedPhoto && isDelete)}
        handleClose={handleClearActionsSD}
        title="Do you want to delete?"
      >
        <ButtonSuccess
          onClick={() => {
            if (selectedPhoto) {
              storePhotos.removePhoto({ photograph: selectedPhoto, albumId });
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

export default Gallery;
