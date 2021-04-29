import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TextFieldC from "../../componentsReusable/Forms";
import { RoutingPath } from "../../models/Global";
import { AuthStoreContext } from "../../stores/AuthStore";
import { mainTheme } from "../../style/config";

const LinkStyled = styled(Link)`
  color: ${mainTheme.palette.text.secondary};
`;

const PaperStyled = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${mainTheme.palette.primary.main};
  padding: 50px;
  min-width: 200px;
`;

type TLoginForm = {
  email: string;
  password: string;
};

export interface LoginProps {}

const Login: React.FC<LoginProps> = observer(() => {
  const authStore = useContext(AuthStoreContext);
  const router = useHistory();
  const { register, handleSubmit } = useForm<TLoginForm>();

  const [wrongCredentials, setWrongCredentials] = useState<boolean>(false);

  const onSubmit = async (data: TLoginForm) => {
    await authStore.logIn({
      email: data.email,
      password: data.password,
      failureCallBack: () => {
        setWrongCredentials(true);
      },
    });
  };

  if (authStore.isLoggedIn) {
    router.push(RoutingPath.home);
  }

  return (
    <PaperStyled>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" spacing={5} alignItems="center">
          <Grid item>
            <Typography color="secondary">Log In</Typography>
          </Grid>
          <Grid item>
            <TextFieldC
              inputRef={register({
                required: "Email is required",
              })}
              name="email"
              label="email"
            />
          </Grid>
          <Grid item>
            <TextFieldC
              inputRef={register({
                required: "Password is required",
              })}
              name="password"
              type="password"
              label="password"
            />
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <Button variant="outlined" color="secondary" type="submit">
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Typography color="error">
                  {wrongCredentials ? "Wrong email or password" : ""}
                </Typography>
              </Grid>
              <Grid item>
                <LinkStyled to={RoutingPath.resetPassword}>
                  Reset password
                </LinkStyled>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </PaperStyled>
  );
});

export default Login;
