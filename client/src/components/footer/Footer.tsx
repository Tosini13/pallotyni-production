import { Grid } from "@material-ui/core";
import styled from "styled-components";
import { TitleTypography } from "../../style/MainStyled";
import BackgroundImg from "../../resources/images/old_stettin_roofs.png";
import FooterInfo from "./FooterInfo";
import { ACTION_MODE, ButtonCUD } from "../../componentsReusable/ButtonsCUD";
import { useContext, useEffect, useState } from "react";
import { Edit } from "@material-ui/icons";
import { AuthStoreContext } from "../../stores/AuthStore";
import FooterForm from "./FooterForm";
import { FooterStoreContext } from "../../stores/FooterStore";
import { observer } from "mobx-react";

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

const Footer: React.FC<FooterProps> = observer(() => {
  const footerStore = useContext(FooterStoreContext);
  const authStore = useContext(AuthStoreContext);
  const [actionMode, setActionMode] = useState<ACTION_MODE.EDIT | undefined>();

  useEffect(() => {
    footerStore.fetch();
  }, [footerStore]);

  return (
    <FooterContainer>
      <ImageCover>
        {authStore.isLoggedIn ? (
          <Grid container justify="center" style={{ margin: "15px 0px" }}>
            <Grid item>
              <ButtonCUD
                onClick={() => setActionMode(ACTION_MODE.EDIT)}
                startIcon={<Edit />}
                color={"secondary"}
              >
                Edytuj
              </ButtonCUD>
            </Grid>
          </Grid>
        ) : null}
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <TitleTypography align="center" color="textSecondary">
              Kontakt
            </TitleTypography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <FooterInfo data={footerStore.data} />
            </Grid>
          </Grid>
        </Grid>
      </ImageCover>
      <FooterForm
        open={actionMode === ACTION_MODE.EDIT}
        data={footerStore.data}
        handleClose={() => setActionMode(undefined)}
      />
    </FooterContainer>
  );
});

export default Footer;
