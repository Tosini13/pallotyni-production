import { Grid } from "@material-ui/core";
import Polish from "../../resources/languages/polish.png";
import English from "../../resources/languages/english.png";
import styled from "styled-components";

const FlagStyled = styled.img`
  height: 20px;
  cursor: pointer;
`;

export interface LanguageProps {}

const Language: React.FC<LanguageProps> = () => {
  return (
    <Grid container spacing={1} justify="flex-end">
      <Grid item>
        <FlagStyled src={Polish} alt="polish" />
      </Grid>
      <Grid item>
        <FlagStyled src={English} alt="english" />
      </Grid>
    </Grid>
  );
};

export default Language;
