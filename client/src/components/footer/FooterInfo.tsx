import { Grid, GridSize, Typography } from "@material-ui/core";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import { SecondaryTextTypography } from "../../style/MainStyled";
import PriestsInfo from "./info/PriestsInfo";

export const FooterTitleTypography: React.FC<{}> = ({ children }) => (
  <Typography variant="h6" style={{ marginBottom: "10px" }}>
    {children}
  </Typography>
);

export const AStyled = styled.a`
  color: ${mainTheme.palette.secondary.main};
  &:hover {
    color: ${mainTheme.palette.secondary.dark};
  }
`;

const gridSize = {
  lg: 3 as GridSize,
  md: 6 as GridSize,
  xs: 12 as GridSize,
};

export interface FooterInfoProps {}

const FooterInfo: React.FC<FooterInfoProps> = () => {
  return (
    <>
      <Grid item {...gridSize}>
        <FooterTitleTypography>Adres:</FooterTitleTypography>
        <SecondaryTextTypography>ul. Świętego Ducha 9</SecondaryTextTypography>
        <SecondaryTextTypography>
          skr. poczt. 658, 70-205 Szczecin
        </SecondaryTextTypography>
      </Grid>
      <Grid item {...gridSize}>
        <FooterTitleTypography>Kontakt:</FooterTitleTypography>
        <SecondaryTextTypography>tel.: 91 434 35 02</SecondaryTextTypography>
        <SecondaryTextTypography>
          tel./fax: 91 433 53 02
        </SecondaryTextTypography>
        <SecondaryTextTypography>
          e-mail: jan.ewangelista@sac.org.pl
        </SecondaryTextTypography>
      </Grid>
      <Grid item {...gridSize}>
        <FooterTitleTypography>Nr konta:</FooterTitleTypography>
        <SecondaryTextTypography>
          60124039271111001101466883
        </SecondaryTextTypography>
        <SecondaryTextTypography>Bank Pekao s.a.</SecondaryTextTypography>
      </Grid>
      {/* TODO: Make it dinamic - able to change by admin user */}
      <Grid item {...gridSize}>
        <PriestsInfo />
      </Grid>
    </>
  );
};

export default FooterInfo;
