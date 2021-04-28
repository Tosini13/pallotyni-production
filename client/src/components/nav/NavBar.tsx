import React, { useContext } from "react";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import LoggedInMenu from "./LoggedInMenu";
import Logo from "../../resources/logo/pallotyni_logo.png";
import { Grid } from "@material-ui/core";
import Language from "./Language";
import { useHistory } from "react-router";
import { RoutingPath } from "../../models/Global";
import { AStyled } from "./LoggedInMenu";
import { AuthStoreContext } from "../../stores/AuthStore";
import { observer } from "mobx-react";

const Divider = styled.div`
  height: 60px;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.7);
  margin: 0px 20px;
`;

const LogoStyled = styled.img`
  height: 60px;
`;

const NavContainer = styled.div`
  position: fixed;
  width: 100vw;
  top: 0px;
  left: 0px;
  z-index: 1100;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  background-color: ${mainTheme.palette.primary.main};
  padding: 5px 20px;
`;

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = observer(() => {
  const authStore = useContext(AuthStoreContext);
  const router = useHistory();

  const handleLogOut = async () => {
    await authStore.logOut({
      successCallBack: () => {
        router.push(RoutingPath.login);
      },
    });
  };
  return (
    <NavContainer>
      <Grid container alignItems="center">
        <Grid item>
          <LogoStyled src={Logo} alt="logo" />
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <LoggedInMenu />
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <Grid container alignItems="center" justify="flex-end">
            <Grid item>
              {authStore.isLoggedIn ? (
                <AStyled onClick={() => handleLogOut()}>Log Out</AStyled>
              ) : (
                <AStyled onClick={() => router.push(RoutingPath.login)}>
                  Log In
                </AStyled>
              )}
            </Grid>
            <Grid item>
              <Language />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </NavContainer>
  );
});

export default NavBar;
