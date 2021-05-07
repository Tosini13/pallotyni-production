import styled from "styled-components";
import { mainTheme } from "./config";

const HamburgerStyled = styled.div<{ open: boolean }>`
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25px;
  padding: 10px;
  z-index: 1500;
  > div {
    background-color: ${mainTheme.palette.secondary.dark};
    width: 100%;
    height: 3px;
    border-radius: 2px;
    margin-bottom: 4px;
    &:last-child {
      margin-bottom: 0px;
    }
    transition: transform 0.3s, width 0.5s;
  }
  ${(props) =>
    props.open
      ? `
  >div:first-child{
      transform: rotateZ(45deg) translate(5px, 5px);
  }
  >div:last-child{
      transform: rotateZ(-45deg) translate(5px, -5px);
  }
  >div:nth-child(2){
      width: 0px;
  }`
      : ``}
`;

export interface HamburgerProps {
  open: boolean;
  toggleOpen: () => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ open, toggleOpen }) => {
  return (
    <HamburgerStyled open={open} onClick={toggleOpen}>
      <div></div>
      <div></div>
      <div></div>
    </HamburgerStyled>
  );
};

export default Hamburger;
