import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Grid, GridSize } from "@material-ui/core";

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
import RCButtonsCUD from "../../componentsReusable/ButtonsCUD";

const breakpoints = {
  md: 5 as GridSize,
  xs: 12 as GridSize,
};

export interface GalleryProps {}

const Gallery: React.FC<GalleryProps> = observer(() => {
  const { id: albumId } = useParams<{
    id: Id;
  }>();
  const storeAlbum = useContext(AlbumStoreContext);
  const storePhotos = useContext(PhotosStoreContext);
  const [image, setImage] = useState<any>();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>(false);
  const [removal, setRemoval] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | undefined>();

  useEffect(() => {
    storePhotos.fetch(albumId);
  }, [storePhotos, albumId]);

  useEffect(() => {
    storeAlbum.fetch();
  }, [storeAlbum]);

  const handleClearActionsSD = () => {
    setRemoval(false);
    setEdition(false);
    setOpenForm(false);
    setSelectedPhoto(undefined);
  };

  const handleAction = (p: Photograph) => {
    if (edition) {
      setSelectedPhoto(p);
      setOpenForm(true);
    }
    setSelectedPhoto(p);
  };

  const IS_ADMIN_TEMP = true; // TODO: change with real admin value;
  return (
    <MainLayout img={BackgroundImg} title="Gallery">
      {IS_ADMIN_TEMP ? (
        <RCButtonsCUD
          handleAdd={() => setOpenForm(true)}
          handleEdit={() => setEdition(true)}
          handleDelete={() => setRemoval(true)}
          handleCancel={handleClearActionsSD}
        />
      ) : null}
      <Grid container>
        {storePhotos?.photos.map((photo) => (
          <React.Fragment key={photo.id}>
            <Grid
              md={breakpoints.md}
              item
              key={photo.id}
              onClick={() => handleAction(photo)}
              style={{ position: "relative" }}
            >
              <PhotoSummary photo={photo} edition={edition} removal={removal} />
            </Grid>
            <PhotoDetails
              photo={photo}
              open={photo.id === selectedPhoto?.id && !removal && !edition}
              handleClose={() => setSelectedPhoto(undefined)}
            />
          </React.Fragment>
        ))}
      </Grid>
      <PhotoForm
        albumId={albumId}
        image={image}
        setImage={setImage}
        open={Boolean(openForm && !removal)}
        selectedPhotograph={openForm ? selectedPhoto : undefined}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialog
        open={Boolean(selectedPhoto && removal)}
        handleClose={handleClearActionsSD}
        title="Do you want to delete?"
        content="Do you want to delete?"
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
