import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import TextFieldC from "../../componentsReusable/Forms";
import { RoutingPath } from "../../models/Global";
import { AuthStoreContext } from "../../stores/AuthStore";
import { mainTheme } from "../../style/config";

const PaperStyled = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${mainTheme.palette.primary.main};
  padding: 50px;
`;

type TForgottenPasswordPropsForm = {
  email: string;
};

export interface ForgottenPasswordProps {}

const ForgottenPassword: React.FC<ForgottenPasswordProps> = observer(() => {
  const authStore = useContext(AuthStoreContext);
  const router = useHistory();
  const { register, handleSubmit } = useForm<TForgottenPasswordPropsForm>();

  const [wrongEmail, setWrongEmail] = useState<boolean>(false);

  const onSubmit = async (data: TForgottenPasswordPropsForm) => {
    await authStore.resetPassword({
      email: data.email,
      failureCallBack: () => {
        setWrongEmail(true);
      },
      successCallBack: () => {
        router.push(RoutingPath.login);
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
            <Typography color="secondary">Resetowanie Hasła</Typography>
          </Grid>
          <Grid item>
            <TextFieldC
              inputRef={register({
                required: "Email jest wymagany",
              })}
              name="email"
              label="email"
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" type="submit">
              Zresetuj
            </Button>
          </Grid>
          <Grid item>
            <Typography color="error">
              {wrongEmail ? "Podany email nie istnieje" : ""}
            </Typography>
          </Grid>
        </Grid>
      </form>
    </PaperStyled>
  );
});

export default ForgottenPassword;
