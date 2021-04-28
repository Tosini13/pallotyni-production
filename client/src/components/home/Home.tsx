import MainLayout from "../layout/MainLayout";
import BackgroundImg from "../../resources/images/background_main.jpg";
import { Divider, Grid, GridSize } from "@material-ui/core";
import HomeServices from "./tales/HomeServices";
import HomeNews from "./tales/HomeNews";
import HomeConfessions from "./tales/HomeConfession";
import HomeAlbum from "./tales/HomeAlbum";
import { MainGridStyled, TitleTypography } from "../../style/MainStyled";

const breakpoints = {
  md: 5 as GridSize,
  xs: 12 as GridSize,
};

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <MainLayout
      img={BackgroundImg}
      title="Parafia p.w. św. Jana Ewangelisty w Szczecinie"
      subtitle="Kościół Pallotynów"
    >
      <Grid container justify="space-around">
        <MainGridStyled
          item
          md={breakpoints.md}
          alignItems="center"
          style={{
            textAlign: "center",
          }}
        >
          <TitleTypography>Najnowszy Album</TitleTypography>
          <HomeAlbum />
        </MainGridStyled>
        <Grid item>
          <Divider orientation="vertical" />
        </Grid>
        <MainGridStyled item md={breakpoints.md}>
          <TitleTypography>Msze Św.</TitleTypography>
          <HomeServices />
        </MainGridStyled>
      </Grid>
      <Divider style={{ margin: "20px 0px" }} />
      <Grid container justify="space-around">
        <MainGridStyled item md={breakpoints.md}>
          <TitleTypography>Najnowsze Wydarzenia</TitleTypography>
          <HomeNews />
        </MainGridStyled>
        <Grid item>
          <Divider orientation="vertical" />
        </Grid>
        <MainGridStyled item md={breakpoints.md}>
          <TitleTypography>Spowiedź</TitleTypography>
          <HomeConfessions />
        </MainGridStyled>
      </Grid>
    </MainLayout>
  );
};

export default Home;
