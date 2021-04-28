import { CircularProgress } from "@material-ui/core";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { GALLERY_PATH } from "../../../models/const";
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
  if (!newestAlbum?.coverPhoto?.path) return <CircularProgress />;
  return (
    <ImgStyled
      src={`${GALLERY_PATH}/${newestAlbum.coverPhoto?.path}`}
      alt={newestAlbum.coverPhoto?.path}
      onClick={() => router.push(GetRoute.album(newestAlbum.id))}
    />
  );
});

export default HomeAlbum;
