import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import styled from "styled-components";

import ConfessionsView from "./components/confessions/ConfessionsView";
import Photos from "./components/gallery/Photos";
import NavBar from "./components/nav/NavBar";
import News from "./components/news/News";
import ServicesView from "./components/services/ServicesView";
import StellaMaris from "./components/stellaMaris/StellaMaris";
import { ScrollBarStyled } from "./componentsReusable/ScrollBar";
import { RoutingPath } from "./models/Global";
import { mainTheme } from "./style/config";
import Home from "./components/home/Home";
import Albums from "./components/albums/Albums";
import Login from "./components/auth/Login";
import ForgottenPassword from "./components/auth/ForgottenPassword";
import SidebarMenu from "./components/sidebarMenu/SidebarMenu";
import { Hidden } from "@material-ui/core";
import Priests from "./components/priests/Priests";

const GlobalStyle = styled.div`
  ${ScrollBarStyled}
  background-color: #cccac4;
`;

const MainContainerStyled = styled.div`
  position: relative;
  min-height: 100vh;
`;

const GridColumnsStyled = styled.div`
  box-sizing: border-box;
`;

const MainStyled = styled(GridColumnsStyled)`
  color: ${mainTheme.palette.secondary.dark};
  border-radius: 5px;
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle>
        <Hidden mdUp>
          <SidebarMenu />
        </Hidden>
        <Hidden smDown>
          <NavBar />
        </Hidden>
        {/*-----------------------------*/}
        {/*DESKTOP VIEW*/}
        <MainContainerStyled>
          <Route path={RoutingPath.login} component={Login} />
          <Route
            path={RoutingPath.resetPassword}
            component={ForgottenPassword}
          />
          {/* MAIN */}
          <MainStyled>
            <Switch>
              <Route path={RoutingPath.service} component={ServicesView} />
              <Route
                path={RoutingPath.confessions}
                component={ConfessionsView}
              />
              <Route path={RoutingPath.priests} component={Priests} />
              <Route path={RoutingPath.gallery} component={Albums} />
              <Route path={RoutingPath.album} component={Photos} />
              <Route path={RoutingPath.stellaMaris} component={StellaMaris} />
              <Route exact path={RoutingPath.news} component={News} />
              <Route exact path={RoutingPath.home} component={Home} />
            </Switch>
          </MainStyled>
        </MainContainerStyled>
        {/*-----------------------------*/}
      </GlobalStyle>
    </BrowserRouter>
  );
}

export default App;
