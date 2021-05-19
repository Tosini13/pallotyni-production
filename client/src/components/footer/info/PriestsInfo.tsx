import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { PriestContext } from "../../../stores/PriestStore";
import { SecondaryTextTypography } from "../../../style/MainStyled";
import { FooterTitleTypography, AStyled } from "../FooterInfo";

export interface PriestsInfoProps {}

const PriestsInfo: React.FC<PriestsInfoProps> = observer(() => {
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
        <AStyled href="http://pallotyni.szczecin.pl/" target="_blank">
          www.pallotyni.com.pl
        </AStyled>
      </SecondaryTextTypography>
    </>
  );
});

export default PriestsInfo;
