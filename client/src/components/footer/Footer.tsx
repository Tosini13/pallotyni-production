import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { TitleTypography } from "../../style/MainStyled";
import BackgroundImg from "../../resources/images/old_stettin_roofs.png";

const FooterContainer = styled.div`
  background-image: url(${BackgroundImg});
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 50vh;
  max-width: 100vw;
`;

const ImageCover = styled.div`
  padding: 20px 50px;
  background: linear-gradient(
    0deg,
    rgba(39, 53, 73, 0.97) 3.99%,
    rgba(39, 53, 73, 0.77) 37.94%,
    rgba(39, 53, 73, 0.94) 99.99%
  );
  min-height: 50vh;
  padding-bottom: 100px;
`;

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <FooterContainer>
      <ImageCover>
        <Grid container direction="column" spacing={3} alignItems="center">
          <Grid item>
            <TitleTypography color="textSecondary">Kontakt</TitleTypography>
          </Grid>
          <Grid item lg={6} md={8}>
            <Grid container>
              <Grid item>
                <Typography>ul. Świętego Ducha 9</Typography>
                <Typography>skr. poczt. 658, 70-205 Szczecin</Typography>
              </Grid>
              <Grid item>
                <Typography>tel.: 91 434 35 02</Typography>
                <Typography>tel./fax: 91 433 53 02</Typography>
                <Typography>e-mail: jan.ewangelista@sac.org.pl</Typography>
              </Grid>
              <Grid item>
                <Typography>Nr konta</Typography>
                <Typography>60124039271111001101466883</Typography>
                <Typography>Bank Pekao s.a.</Typography>
              </Grid>
              {/* TODO: Make it dinamic - able to change by admin user */}
              {/* <Grid item>
                <Typography>
                  ks. Piotr Bieniek SAC – rektor i proboszcz
                </Typography>
                <Typography>ks. dr Tomasz Kawczyk SAC – wikariusz</Typography>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </ImageCover>
    </FooterContainer>
  );
};

export default Footer;
