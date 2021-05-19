import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { PriestContext } from "../../../stores/PriestStore";
import { SecondaryTextTypography } from "../../../style/MainStyled";
import { FooterTitleTypography, AStyled } from "../FooterInfo";

export interface PriestsInfoProps {
  website?: string;
}

const PriestsInfo: React.FC<PriestsInfoProps> = observer(({ website }) => {
  const priestStore = useContext(PriestContext);

  useEffect(() => {
    priestStore.fetch();
  }, [priestStore]);

  return (
    <>
      <FooterTitleTypography>Oficjalne informacje:</FooterTitleTypography>
      {priestStore.footerPriests.map((priest) => (
        <SecondaryTextTypography>
          {priest.firstName} {priest.lastName} - {priest.position}
        </SecondaryTextTypography>
      ))}
      <SecondaryTextTypography>
        Oficjalna strona:{" "}
        <AStyled href={website} target="_blank">
          {website}
        </AStyled>
      </SecondaryTextTypography>
    </>
  );
});

export default PriestsInfo;
