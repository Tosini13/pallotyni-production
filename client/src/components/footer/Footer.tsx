import { Grid } from "@material-ui/core";
import styled from "styled-components";
import { TitleTypography } from "../../style/MainStyled";
import BackgroundImg from "../../resources/images/old_stettin_roofs.png";
import FooterInfo from "./FooterInfo";

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
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <TitleTypography align="center" color="textSecondary">
              Kontakt
            </TitleTypography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <FooterInfo />
            </Grid>
          </Grid>
        </Grid>
      </ImageCover>
    </FooterContainer>
  );
};

export default Footer;
