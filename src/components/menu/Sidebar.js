import React, { useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight, FaArrowLeft, FaUser, FaCog, FaCloudSun, FaWater, FaThermometer, FaClock } from 'react-icons/fa';
import logo from './mapa.gif'; // Ajusta la ruta a tu imagen local

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
  z-index: 998; /* Asegúrate de que esté detrás del icono */
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
  border-radius: 50%; /* Hace que la imagen sea un círculo */
  transition: width 0.3s;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  padding-top: 1rem; /* Asegúrate de que los íconos del menú no toquen el encabezado */
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
  width: 40px; /* Asegúrate de que sea un cuadrado */
  height: 40px; /* Asegúrate de que sea un cuadrado */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #444; /* Fondo del ícono */
  color: white;
  border-radius: 50%; /* Hace que el div sea un círculo */
  cursor: pointer;
  z-index: 999; /* Asegúrate de que esté encima del sidebar */
  transition: left 0.3s;
`;

const Sidebar = ({ isOpen, toggleSidebar, onEstConvencionalesClick }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({});

  const toggleSubMenu = (menu) => {
    setIsSubMenuOpen(prevState => ({
      ...prevState,
      [menu]: !prevState[menu]
    }));

    // Comunicar al padre (Mapa) el clic en Estaciones Convencionales
    if (menu === 'estConvencionales') {
      onEstConvencionalesClick(!isSubMenuOpen.estConvencionales); // Toggle directo del estado
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
