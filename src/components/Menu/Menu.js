import React, { useEffect } from "react";
import styled from "styled-components";
import Search from "../Menu/components/Search"
import DarkModeSwitch from "./components/DarkModeSwitch";
import {ColorModeContext} from "../Menu/components/ColorMode"
import logoDarkMode from "../../img/icon_wetube_dark_mode.png"
import logoLightMode from "../../img/icon_wetube_light_mode.png"



const StyledMenu = styled.header`
  display: flex;
  flex-direction: row;
  height: 56px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.backgroundLevel1 || "#FFFFFF"};
  border: 1px solid ${({ theme }) => theme.borderBase || "#e5e5e5"};
  align-items: center;
  padding: 0 16px;
  gap: 16px;
  position: fixed;
  width: 100%;
  .logo {
    width: 100%;
    max-width: 80px;
    
    @media (min-width: 600px) {
      max-width: 127px;
    }
  }
  a{
    &:hover{
      cursor:pointer;
    }
  }

`;

export default function Menu({filterValue, setFilterValue}) {
  return (
    <StyledMenu>
      <div>
        <Logo />
      </div>
      <Search filterValue={filterValue} setFilterValue={setFilterValue}/>
      <DarkModeSwitch/>
    </StyledMenu>
  );
}

function Logo() {
  const context = React.useContext(ColorModeContext);
  const [logo, setLogo] = React.useState(logoLightMode)

  useEffect(()=>{
    if(context.mode === "dark"){
      setLogo(logoDarkMode)
    }else{
      setLogo(logoLightMode)
    }
  }, [context])

  return (
  <>
    <a href="/">
      <img src={logo.src} height="40px" width="200px"/>
    </a>  
  </>
  )
}