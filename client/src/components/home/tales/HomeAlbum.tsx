import { Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { GetRoute } from "../../../models/Global";
import { AlbumStoreContext } from "../../../stores/GalleryStore";
import { ImgStyled } from "../../../style/MainStyled";

export interface HomeAlbumProps {}

const HomeAlbum: React.FC<HomeAlbumProps> = observer(() => {
  const router = useHistory();
  const store = useContext(AlbumStoreContext);

  useEffect(() => {
    store.fetch();
  }, [store]);

  const newestAlbum = store.albums[0];
  if (!newestAlbum?.coverPhoto?.path)
    return <Typography color="textPrimary">Brak nowych albumów</Typography>;
  return (
    <ImgStyled
      src={newestAlbum.coverPhoto?.path}
      alt={newestAlbum.coverPhoto?.path}
      onClick={() => router.push(GetRoute.album(newestAlbum.id))}
    />
  );
});

export default HomeAlbum;
