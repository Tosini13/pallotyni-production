import styled from "styled-components";
import {
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { ButtonError, ButtonSuccess } from "../../componentsReusable/Buttons";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { TCreatePhotographAndImage } from "../../models/Photograph";
import { DialogStyled, RCDialogTitle } from "../../componentsReusable/Dialogs";
import { PhotosStoreContext } from "../../stores/PhotographsStore";
import { Album, AlbumStoreContext } from "../../stores/GalleryStore";
import { mainTheme } from "../../style/config";

const TypographyButton = styled(Typography)`
  padding: 10px;
  cursor: pointer;
  background-color: ${mainTheme.palette.secondary.main};
  border-radius: 5px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`;

const LogoContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: fit-content;
  margin: 20px auto;
  position: relative;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const InputStyled = styled.input`
  display: none;
`;

type TPhotographForm = Omit<
  TCreatePhotographAndImage,
  "imageFile" | "createdAt"
>;

export interface PhotosFormProps {
  images: object[];
  setImages: (images: object[]) => void;
  open: boolean;
  handleClose: () => void;
  selectedAlbum: Album;
}

const PhotosForm: React.FC<PhotosFormProps> = ({
  selectedAlbum,
  images,
  setImages,
  open,
  handleClose,
}) => {
  const albumStore = useContext(AlbumStoreContext);
  const photoStore = useContext(PhotosStoreContext);
  const { handleSubmit, reset } = useForm<TPhotographForm>();
  const [imageError, setImageError] = useState(false);

  const handleChangeImage = async (e: any) => {
    const imageFiles = e.target.files;
    try {
      setImages(imageFiles);
      setImageError(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: TPhotographForm) => {
    if (!images) {
      setImageError(true);
    } else {
      try {
        const paths = await photoStore.createManyPhotos({ imageFiles: images });
        if (paths) {
          albumStore.addPhotos({
            albumId: selectedAlbum.id,
            photosPaths: paths,
          });
          handleCloseForm();
          return true;
        }
        console.log("ERROR", paths);
      } catch (err) {
        console.log("ERROR", err);
      }
    }
  };

  const onRemoveImage = () => {
    setImages([]);
  };

  const clearForm = () => {
    setImageError(false);
    reset({
      description: "",
    });
    setImages([]);
  };

  const handleCloseForm = () => {
    handleClose();
    clearForm();
  };

  return (
    <DialogStyled open={open} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RCDialogTitle>Add Photographs to Album</RCDialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography color="textSecondary">
                No. Images {images.length} {imageError ? "!ERRROR!" : null}
              </Typography>
            </Grid>
            <Grid item>
              <LogoContainerStyled>
                <InputStyled
                  multiple
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleChangeImage}
                />
                <label htmlFor="file">
                  {images.length ? null : (
                    <TypographyButton>Add Images</TypographyButton>
                  )}
                </label>
                {images.length ? (
                  <TypographyButton onClick={onRemoveImage}>
                    Remove Images
                  </TypographyButton>
                ) : null}
              </LogoContainerStyled>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonSuccess type="submit">Save</ButtonSuccess>
          <ButtonError onClick={handleCloseForm}>Cancel</ButtonError>
        </DialogActions>
      </form>
    </DialogStyled>
  );
};

export default PhotosForm;
