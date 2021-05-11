import MainLayout from "../layout/MainLayout";
import BackgroundImg from "../../resources/images/background_main.jpg";
import { Divider, Grid, Hidden } from "@material-ui/core";
import HomeServices from "./tales/HomeServices";
import HomeNews from "./tales/HomeNews";
import HomeConfessions from "./tales/HomeConfession";
import HomeAlbum from "./tales/HomeAlbum";
import { MainGridStyled } from "../../style/MainStyled";

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <MainLayout
      img={BackgroundImg}
      title="Parafia p.w. Św. Jana Ewangelisty"
      subtitle="Kościół Morski, Księża Pallotyni"
    >
      <Hidden smDown>
        <Grid container justify="space-around">
          <MainGridStyled
            item
            xs={5}
            style={{
              textAlign: "center",
            }}
          >
            <HomeAlbum />
          </MainGridStyled>
          <Grid item>
            <Divider orientation={"vertical"} />
          </Grid>
          <MainGridStyled item xs={5}>
            <HomeServices />
          </MainGridStyled>
        </Grid>
        <Divider style={{ margin: "20px 0px" }} />
        <Grid container justify="space-around">
          <MainGridStyled item xs={5}>
            <HomeNews />
          </MainGridStyled>
          <Grid item>
            <Divider orientation={"vertical"} />
          </Grid>
          <MainGridStyled item xs={5}>
            <HomeConfessions />
          </MainGridStyled>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <div style={{ padding: "0px 5px" }}>
          <HomeAlbum />
          <Divider style={{ margin: "20px" }} />
          <HomeServices />
          <Divider style={{ margin: "20px" }} />
          <HomeNews />
          <Divider style={{ margin: "20px" }} />
          <HomeConfessions />
        </div>
      </Hidden>
    </MainLayout>
  );
};

export default Home;
