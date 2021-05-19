import { Grid, GridSize, Typography } from "@material-ui/core";
import styled from "styled-components";
import { TFooterData } from "../../models/Footer";
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

export interface FooterInfoProps {
  data: TFooterData;
}

const FooterInfo: React.FC<FooterInfoProps> = ({ data }) => {
  return (
    <>
      <Grid item {...gridSize}>
        <FooterTitleTypography>Adres:</FooterTitleTypography>
        <SecondaryTextTypography>{data.address}</SecondaryTextTypography>
        <SecondaryTextTypography>
          skr. poczt. {data.mailbox}
        </SecondaryTextTypography>
      </Grid>
      <Grid item {...gridSize}>
        <FooterTitleTypography>Kontakt:</FooterTitleTypography>
        <SecondaryTextTypography>tel.: {data.tel}</SecondaryTextTypography>
        <SecondaryTextTypography>tel./fax: {data.fax}</SecondaryTextTypography>
        <SecondaryTextTypography>e-mail:{data.email}</SecondaryTextTypography>
      </Grid>
      <Grid item {...gridSize}>
        <FooterTitleTypography>Nr konta:</FooterTitleTypography>
        <SecondaryTextTypography>{data.accountNumber}</SecondaryTextTypography>
        <SecondaryTextTypography>{data.bankName}</SecondaryTextTypography>
      </Grid>
      {/* TODO: Make it dinamic - able to change by admin user */}
      <Grid item {...gridSize}>
        <PriestsInfo website={data.officialWebsite} />
      </Grid>
    </>
  );
};

export default FooterInfo;
