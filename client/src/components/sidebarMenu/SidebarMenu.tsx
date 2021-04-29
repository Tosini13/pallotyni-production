import { useContext, useState } from "react";
import { Drawer, Grid, IconButton } from "@material-ui/core";
import { AStyled, Menu } from "../nav/LoggedInMenu";
import MenuIcon from "@material-ui/icons/Menu";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import { AuthStoreContext } from "../../stores/AuthStore";
import { RoutingPath } from "../../models/Global";
import { useHistory } from "react-router";

const IconButtonStyled = styled(IconButton)`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 999999;
`;

const DrawerStyled = styled(Drawer)`
  .MuiDrawer-paper {
    overflow: hidden;
    height: 101vh;
  }
`;

const GridStyled = styled(Grid)`
  height: 100%;
  background-color: ${mainTheme.palette.primary.main};
  min-width: 250px;
  > div {
    text-align: center;
  }
`;

export interface SidebarMenuProps {}

const SidebarMenu: React.FC<SidebarMenuProps> = () => {
  const authStore = useContext(AuthStoreContext);
  const router = useHistory();
  const [open, setOpen] = useState<boolean>(false);

  const handleLogOut = async () => {
    await authStore.logOut({
      successCallBack: () => {
        setOpen(false);
        router.push(RoutingPath.login);
      },
    });
  };

  const handleLogIn = async () => {
    setOpen(false);
    router.push(RoutingPath.login);
  };

  return (
    <>
      <IconButtonStyled onClick={() => setOpen(!open)}>
        <MenuIcon color="secondary" />
      </IconButtonStyled>
      <DrawerStyled
        open={open}
        variant="temporary"
        onClose={() => setOpen(false)}
      >
        <GridStyled container direction="column" spacing={1}>
          <Grid item>
            {authStore.isLoggedIn ? (
              <AStyled onClick={() => handleLogOut()}>Wyloguj</AStyled>
            ) : (
              <AStyled onClick={() => handleLogIn()}>Zaloguj</AStyled>
            )}
          </Grid>
          <Menu actionCallback={() => setOpen(false)} />
        </GridStyled>
      </DrawerStyled>
    </>
  );
};

export default SidebarMenu;
