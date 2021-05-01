import { Grid, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { GetRoute } from "../../../models/Global";
import { AlbumStoreContext } from "../../../stores/GalleryStore";
import { ImgStyled, TitleTypography } from "../../../style/MainStyled";

export interface HomeAlbumProps {}

const HomeAlbum: React.FC<HomeAlbumProps> = observer(() => {
  const router = useHistory();
  const store = useContext(AlbumStoreContext);

  useEffect(() => {
    store.fetch();
  }, [store]);

  const newestAlbum = store.albums[0];
  if (!newestAlbum?.coverPhoto?.path) {
    return (
      <Typography color="textPrimary" align="center">
        Brak nowych albumów
      </Typography>
    );
  }
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <TitleTypography>{"Najnowszy Album"}</TitleTypography>
      </Grid>
      <Grid item>
        <ImgStyled
          src={newestAlbum.coverPhoto?.path}
          alt={newestAlbum.coverPhoto?.path}
          onClick={() => router.push(GetRoute.album(newestAlbum.id))}
        />
      </Grid>
    </Grid>
  );
});

export default HomeAlbum;
