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
            <TitleTypography color="textSecondary">Footer</TitleTypography>
          </Grid>
          <Grid item lg={6} md={8}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Grid>
        </Grid>
      </ImageCover>
    </FooterContainer>
  );
};

export default Footer;
