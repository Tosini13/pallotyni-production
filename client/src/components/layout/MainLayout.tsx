import { useRef } from "react";
import { Hidden, IconButton, Typography } from "@material-ui/core";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import Footer from "../footer/Footer";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const mainHeightOnImg = "150px";

const ImgBackground = styled.div<{ src: string }>`
  min-height: 100vh;
  ${(props) => (props.src ? `background-image: url(${props.src});` : "")}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;
const ImgShadow = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background: linear-gradient(0deg, #273549 -1.84%, rgba(39, 53, 73, 0) 53.85%);
`;

const TitleContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, calc(-50% - ${mainHeightOnImg} / 2));
  background-color: rgba(0, 0, 0, 0.78);
  padding: 60px 40px 70px 40px;
  @media only screen and (max-width: 600px) {
    padding: 10px;
    width: 75vw;
    box-sizing: border-box;
  }
`;

const SubTitleContainer = styled.div`
  position: absolute;
  left: 0%;
  bottom: 0%;
  padding: 3px 50px;
  background-color: ${mainTheme.palette.primary.main};
  @media only screen and (max-width: 600px) {
    width: 75vw;
    padding: 3px 5px;
    box-sizing: border-box;
    transform: translateY(100%);
  }
`;

const MainContainer = styled.div`
  margin: auto;
  padding: 120px 20px;
  max-width: 980px;
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;
`;

const IconButtonStyled = styled(IconButton)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
`;

const ScrollUpIconButtonStyled = styled(IconButton)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) rotate(-90deg);
`;

const TitleTypography: React.FC<{}> = ({ children }) => (
  <>
    <Hidden mdUp>
      <Typography variant={"h6"} color="secondary" align="center">
        {children}
      </Typography>
    </Hidden>
    <Hidden smDown>
      <Typography variant={"h2"} color="secondary" align="center">
        {children}
      </Typography>
    </Hidden>
  </>
);

const SubtitleTypography: React.FC<{}> = ({ children }) => (
  <>
    <Hidden mdUp>
      <Typography
        variant={"h6"}
        color="textSecondary"
        style={{ fontSize: "16px" }}
      >
        {children}
      </Typography>
    </Hidden>
    <Hidden smDown>
      <Typography variant={"h5"} color="textSecondary" align="center">
        {children}
      </Typography>
    </Hidden>
  </>
);

export interface MainLayoutProps {
  img: string;
  title: string;
  subtitle?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  img,
  title,
  children,
  subtitle,
}) => {
  const topRef = useRef<null | HTMLDivElement>(null);
  const mainRef = useRef<null | HTMLDivElement>(null);
  const footerRef = useRef<null | HTMLDivElement>(null);
  return (
    <>
      <ImgBackground src={img} ref={topRef}>
        <ImgShadow>
          <TitleContainer>
            <TitleTypography>{title}</TitleTypography>
            {subtitle ? (
              <SubTitleContainer>
                <SubtitleTypography>{subtitle}</SubtitleTypography>
              </SubTitleContainer>
            ) : null}
          </TitleContainer>
          <IconButtonStyled
            color="secondary"
            onClick={() =>
              mainRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <ArrowForwardIosIcon fontSize="large" />
          </IconButtonStyled>
        </ImgShadow>
      </ImgBackground>
      <MainContainer ref={mainRef}>
        {children}
        <IconButtonStyled
          color="secondary"
          onClick={() =>
            footerRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <ArrowForwardIosIcon fontSize="large" />
        </IconButtonStyled>
      </MainContainer>
      <div ref={footerRef}>
        <Footer />
        <ScrollUpIconButtonStyled
          color="secondary"
          onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          <ArrowForwardIosIcon fontSize="large" />
        </ScrollUpIconButtonStyled>
      </div>
    </>
  );
};

export default MainLayout;
