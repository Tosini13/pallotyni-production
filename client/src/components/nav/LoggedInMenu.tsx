import React from "react";
import { Grid, Hidden } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RoutingPath } from "../../models/Global";
import { mainTheme } from "../../style/config";

const GridContainerStyled = styled(Grid)`
  & > div:hover {
    & > div {
      opacity: 1;
      transform: translateY(98%);
    }
  }
`;

const MenuTypo = `
  transition: 0.2s all;
  display: block;
  cursor: pointer;
  padding: 10px;
  color: ${mainTheme.palette.text.secondary};
  font-size: 20px;
  text-decoration: none;
  &:hover {
    color: ${mainTheme.palette.secondary.main};
  }
`;

const LinkStyled = styled(Link)`
  ${MenuTypo}
`;

export const AStyled = styled.a`
  ${MenuTypo}
`;

const GridSubMenuContainerStyled = styled(Grid)`
  position: absolute;
  background-color: ${mainTheme.palette.primary.main};
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  padding: 10px;
  width: fit-content;
  opacity: 0;
  bottom: 0px;
  transform: translateY(-100%);
  margin: 0px;
`;
export interface GridSubMenuItemProps {}
const GridSubMenuItem: React.FC<GridSubMenuItemProps> = ({ children }) => (
  <Grid item>{children}</Grid>
);

export interface GridSubMenuContainerProps {}
const GridSubMenuContainer: React.FC<GridSubMenuContainerProps> = ({
  children,
}) => (
  <GridSubMenuContainerStyled container direction="column">
    {children}
  </GridSubMenuContainerStyled>
);

const GridMenuItemStyled = styled(Grid)``;
export interface GridMenuItemProps {}
const GridMenuItem: React.FC<GridMenuItemProps> = ({ children }) => (
  <GridMenuItemStyled item>{children}</GridMenuItemStyled>
);

export interface LoggedInMenuProps {}

const LoggedInMenu: React.FC<LoggedInMenuProps> = () => {
  return (
    <GridContainerStyled container wrap="nowrap" spacing={3}>
      <Menu />
    </GridContainerStyled>
  );
};

export default LoggedInMenu;

export interface MenuProps {
  actionCallback?: () => void;
}

export const Menu: React.FC<MenuProps> = ({ actionCallback }) => {
  return (
    <>
      <GridMenuItem>
        <LinkStyled to={RoutingPath.home} onClick={actionCallback}>
          Strona Główna
        </LinkStyled>
      </GridMenuItem>
      <Hidden smDown>
        <GridMenuItem>
          <AStyled>Posługa</AStyled>
          <GridSubMenuContainer>
            <GridSubMenuItem>
              <LinkStyled to={RoutingPath.service} onClick={actionCallback}>
                Msze Św.
              </LinkStyled>
            </GridSubMenuItem>
            <GridSubMenuItem>
              <LinkStyled to={RoutingPath.confessions} onClick={actionCallback}>
                Spowiedź
              </LinkStyled>
            </GridSubMenuItem>
          </GridSubMenuContainer>
        </GridMenuItem>
      </Hidden>
      <Hidden mdUp>
        <GridMenuItem>
          <LinkStyled to={RoutingPath.service} onClick={actionCallback}>
            Msze Św.
          </LinkStyled>
        </GridMenuItem>
        <GridMenuItem>
          <LinkStyled to={RoutingPath.confessions} onClick={actionCallback}>
            Spowiedź
          </LinkStyled>
        </GridMenuItem>
      </Hidden>
      <GridMenuItem>
        <LinkStyled to={RoutingPath.gallery} onClick={actionCallback}>
          Galeria
        </LinkStyled>
      </GridMenuItem>
      <GridMenuItem>
        <LinkStyled to={RoutingPath.news} onClick={actionCallback}>
          Aktualności
        </LinkStyled>
      </GridMenuItem>
    </>
  );
};
