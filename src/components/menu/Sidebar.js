import React, { useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight, FaArrowLeft, FaUser, FaCog, FaCloudSun, FaWater, FaThermometer, FaClock } from 'react-icons/fa';
import logo from './mapa.gif';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => (props.isOpen ? '200px' : '50px')};
  background-color: #333;
  color: white;
  transition: width 0.3s;
  overflow: hidden;
  z-index: 998;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.isOpen ? 'space-between' : 'center')};
  padding: 1rem;
`;

const Logo = styled.img`
  width: ${props => (props.isOpen ? '50px' : '30px')};
  height: ${props => (props.isOpen ? '50px' : '30px')};
  border-radius: 50%;
  transition: width 0.3s;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  padding-top: 1rem;
`;

const SidebarMenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

const SidebarMenuItemText = styled.span`
  margin-left: 10px;
`;

const SidebarSubMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  padding-left: 1rem;
  display: ${props => (props.isSubMenuOpen ? 'block' : 'none')};
`;

const Icon = styled.div`
  position: fixed;
  top: 1rem;
  left: ${props => (props.isOpen ? '200px' : '50px')};
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #444;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  z-index: 999;
  transition: left 0.3s;
`;

const Sidebar = ({ isOpen, toggleSidebar, onEstConvencionalesClick }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({});

  const toggleSubMenu = (menu) => {
    setIsSubMenuOpen(prevState => ({
      ...prevState,
      [menu]: !prevState[menu]
    }));

    if (menu === 'estConvencionales') {
      onEstConvencionalesClick(!isSubMenuOpen.estConvencionales);
    }
  };

  return (
    <React.Fragment>
      <Icon isOpen={isOpen} onClick={toggleSidebar}>
        {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
      </Icon>
      <SidebarContainer isOpen={isOpen}>
        <Header isOpen={isOpen}>
          <Logo src={logo} isOpen={isOpen} />
          {isOpen && (
            <div className='senamhidz8'>
              <p className='name'>SENAMHI-DZ8</p>
              <p className='location'>LORETO</p>
            </div>
          )}
        </Header>
        <SidebarMenu>
          <SidebarMenuItem onClick={() => toggleSubMenu('meteorologico')}>
            <FaCloudSun />
            {isOpen && <SidebarMenuItemText>Meteorología</SidebarMenuItemText>}
          </SidebarMenuItem>
          <SidebarSubMenu isSubMenuOpen={isSubMenuOpen.meteorologico}>
            <SidebarMenuItem onClick={() => toggleSubMenu('termopluviometrico')}>
              <FaThermometer />
              {isOpen && <SidebarMenuItemText>Monitoreo Termopluviométrico</SidebarMenuItemText>}
            </SidebarMenuItem>
            <SidebarMenuItem onClick={() => toggleSubMenu('estConvencionales')}>
              <FaClock />
              {isOpen && <SidebarMenuItemText>Estaciones Convencionales</SidebarMenuItemText>}
            </SidebarMenuItem>
          </SidebarSubMenu>

          <SidebarMenuItem onClick={() => toggleSubMenu('hidrologia')}>
            <FaWater />
            {isOpen && <SidebarMenuItemText>Hidrología</SidebarMenuItemText>}
          </SidebarMenuItem>
          <SidebarSubMenu isSubMenuOpen={isSubMenuOpen.hidrologia}>
            <SidebarMenuItem>
              <FaUser />
              {isOpen && <SidebarMenuItemText>Profile</SidebarMenuItemText>}
            </SidebarMenuItem>
            <SidebarMenuItem>
              <FaCog />
              {isOpen && <SidebarMenuItemText>Settings</SidebarMenuItemText>}
            </SidebarMenuItem>
          </SidebarSubMenu>

          <SidebarMenuItem onClick={() => toggleSubMenu('estAut')}>
            <FaCog />
            {isOpen && <SidebarMenuItemText>Estación Automática</SidebarMenuItemText>}
          </SidebarMenuItem>
          <SidebarSubMenu isSubMenuOpen={isSubMenuOpen.estAut}>
            <SidebarMenuItem>
              <FaUser />
              {isOpen && <SidebarMenuItemText>Profile</SidebarMenuItemText>}
            </SidebarMenuItem>
            <SidebarMenuItem>
              <FaCog />
              {isOpen && <SidebarMenuItemText>Settings</SidebarMenuItemText>}
            </SidebarMenuItem>
          </SidebarSubMenu>
        </SidebarMenu>
      </SidebarContainer>
    </React.Fragment>
  );
};

export default Sidebar;
