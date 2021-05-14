import imageCompression from "browser-image-compression";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ClearIcon from "@material-ui/icons/Clear";

import styled from "styled-components";
import { mainTheme } from "../../style/config";
import { Photograph, PhotosStoreContext } from "../../stores/PhotographsStore";
import { DialogActions, DialogContent, Grid } from "@material-ui/core";
import { ButtonError, ButtonSuccess } from "../../componentsReusable/Buttons";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TCreatePhotographAndImage } from "../../models/Photograph";
import TextFieldC from "../../componentsReusable/Forms";
import { parseStyledBoolean } from "../../helpers/BooleanParser";
import { DialogStyled, RCDialogTitle } from "../../componentsReusable/Dialogs";

const AddAPhotoIconStyled = styled(AddAPhotoIcon)<{ error?: string }>`
  transition: all 0.2s;
  ${(props) => (props.error ? `color: ${mainTheme.palette.error.main};` : ``)}
`;

const ButtonRemoveLogoStyled = styled.div<{ error?: string }>`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${mainTheme.palette.secondary.main};
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
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

const LogoStyled = styled.div<{
  src?: string;
}>`
  height: 200px;
  width: auto;
  min-width: 200px;
  background-size: cover;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 5px;
  ${(props) =>
    props.src
      ? `background-image: url("${props.src}");`
      : `display: flex;
  justify-content: center;
  align-items: center;`}
`;

const TournamentCreateLogoTextFieldStyled = styled.input`
  display: none;
`;

type TPhotographForm = Omit<
  TCreatePhotographAndImage,
  "imageFile" | "createdAt"
>;

export interface PhotoFormProps {
  albumId: string;
  image: any;
  setImage: (image: any) => void;
  open: boolean;
  handleClose: () => void;
  selectedPhotograph?: Photograph;
}

const PhotoForm: React.FC<PhotoFormProps> = ({
  albumId,
  image,
  setImage,
  open,
  handleClose,
  selectedPhotograph,
}) => {
  const photoStore = useContext(PhotosStoreContext);
  const { register, handleSubmit, reset } = useForm<TPhotographForm>();
  const [imageError, setImageError] = useState(false);
  const [imgUrl, setImageUrl] = useState<string | undefined>(
    selectedPhotograph?.path
  );

  const handleChangeImage = async (e: any) => {
    const imageFile = e.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setImage(compressedFile);
      setImageError(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: TPhotographForm) => {
    if (!image && !imgUrl) {
      setImageError(true);
    } else if (selectedPhotograph && image) {
      photoStore.updatePhoto({
        id: selectedPhotograph.id,
        path: selectedPhotograph.path,
        description: data.description,
        imageFile: image,
      });
      handleCloseForm();
    } else if (selectedPhotograph && !image) {
      photoStore.updatePhoto({
        id: selectedPhotograph.id,
        path: selectedPhotograph.path,
        description: data.description,
        imageFile: image,
      });
      handleCloseForm();
    } else {
      photoStore.createPhoto({
        albumId,
        description: data.description,
        imageFile: image,
      });
      handleCloseForm();
    }
  };

  const onRemoveImage = () => {
    setImage(null);
    setImageUrl(undefined);
  };

  const clearForm = () => {
    setImageError(false);
    reset({
      description: "",
    });
    setImage(undefined);
    setImageUrl(undefined);
  };

  const handleCloseForm = () => {
    handleClose();
    clearForm();
  };

  useEffect(() => {
    const getUrl = () => {
      if (image) {
        return URL.createObjectURL(image);
      } else {
        return undefined;
      }
    };
    if (image) {
      setImageUrl(getUrl());
    }
  }, [image, setImageUrl]);

  useEffect(() => {
    if (selectedPhotograph) {
      setImageUrl(selectedPhotograph?.path);
      reset({
        description: selectedPhotograph.description,
      });
    }
  }, [selectedPhotograph, reset, setImageUrl]);

  return (
    <DialogStyled open={open} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RCDialogTitle>
          {selectedPhotograph ? "Edytuj" : "Stwórz"} Zdjęcie
        </RCDialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <LogoContainerStyled>
                <TournamentCreateLogoTextFieldStyled
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleChangeImage}
                />
                <label htmlFor="file">
                  <LogoStyled src={imgUrl}>
                    {imgUrl ? null : (
                      <AddAPhotoIconStyled
                        error={parseStyledBoolean(imageError)}
                      />
                    )}
                  </LogoStyled>
                </label>
                {imgUrl ? (
                  <ButtonRemoveLogoStyled onClick={onRemoveImage}>
                    <ClearIcon fontSize="small" />
                  </ButtonRemoveLogoStyled>
                ) : null}
              </LogoContainerStyled>
            </Grid>
            <Grid item>
              <TextFieldC inputRef={register} name="description" label="Opis" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonSuccess type="submit">Zapisz</ButtonSuccess>
          <ButtonError onClick={handleCloseForm}>Anuluj</ButtonError>
        </DialogActions>
      </form>
    </DialogStyled>
  );
};

export default PhotoForm;
