import { Button, Grid, GridSize } from "@material-ui/core";
import { useContext, useState } from "react";
import { AuthStoreContext } from "../../stores/AuthStore";
import { Album } from "../../stores/GalleryStore";
import { MainGridStyled, TitleTypography } from "../../style/MainStyled";
import PhotosForm from "../gallery/PhotosForm";

const breakpoints = {
  md: 5 as GridSize,
  xs: 12 as GridSize,
};

export interface AlbumSummaryProps {
  album: Album;
  handleAction: (a: Album) => void;
}

const AlbumSummary: React.FC<AlbumSummaryProps> = ({
  album,
  handleAction,
  children,
}) => {
  const authStore = useContext(AuthStoreContext);
  const [images, setImages] = useState<object[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);
  return (
    <>
      <MainGridStyled
        md={breakpoints.md}
        item
        key={album.id}
        style={{
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item onClick={() => handleAction(album)}>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <TitleTypography>{album.title}</TitleTypography>
              </Grid>
              <Grid item>{children}</Grid>
            </Grid>
          </Grid>
          {authStore.isLoggedIn ? (
            <Grid item>
              <Button variant="outlined" onClick={() => setOpenForm(true)}>
                Dodaj zdjęcia
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </MainGridStyled>
      <PhotosForm
        images={images}
        setImages={setImages}
        open={openForm}
        handleClose={() => setOpenForm(false)}
        selectedAlbum={album}
      />
    </>
  );
};

export default AlbumSummary;
