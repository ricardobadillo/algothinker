import React, { useState, useEffect, useContext } from 'react';
import SubMenu from './SubMenu';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { AiOutlineClose, AiOutlineDashboard } from 'react-icons/ai';
import { FaBars, FaCubes } from 'react-icons/fa';
import { FiHelpCircle } from 'react-icons/fi';
import { AuthContext } from 'context/AuthContext';
import { SERVER_URL } from '../../constants';
import '../Sidebar/Sidebar.css';

// NAVBAR.

const Nav = styled.nav`
  align-items: center;
  background-color: #023e7d;
  display: flex;
  justify-content: space-between;
  height: 80px;
  width: 100%;
`;

// LOGO ALGOTHINKER.

const LinkLogo = styled.div`
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  justify-self: start;
  margin-left: 0.75rem;
  text-decoration: #0466c8;

  @media (max-width: 420px) {
    font-size: 1.25rem;
    margin-left: 0.75rem;
  }
`;

const H4Logo = styled.h4`
  color: #ffffff;
  font-size: 1.25rem;
  justify-self: start;
  margin-left: 0.5rem;
  text-decoration: #0466c8;

  @media (max-width: 420px) {
    font-size: 1.25rem;
    margin-left: 0.75rem;
  }
`;

// ICONO BARS.

const NavIcon = styled.div`
  align-items: center;
  display: flex;
  font-size: 2rem;
  justify-content: flex-start;
  height: 80px;
  margin-left: 1.25rem;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 380px) {
    font-size: 1.5rem;
    margin-left: 1rem;
  }
`;

// SIDEBAR.

const SideBarNav = styled.nav`
  background-color: #0466c8;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  overflow-y: auto;
  position: fixed;
  top: 0;
  transition: 350ms;
  width: 250px;
  z-index: 10;

  // SCROLLBAR.

  ::-webkit-scrollbar {
    height: 0.5rem;
    width: 0.25rem;
  }

  ::-webkit-scrollbar-track {
    border-radius: 0.5rem;
    box-shadow: inset 0 0 5px #002855;
  }

  ::-webkit-scrollbar-thumb {
    background: #0466c8;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #0466c8;
  }

  @media (max-width: 768px) {
    width: 225px;
  }
`;

// BARRAS DEL SIDEBAR.

const SideBarWrap = styled.div`
  width: 100%;
`;

const DivIzquierdo = styled.div`
  align-items: center;
  display: flex;
  width: 50%;

  @media (max-width: 480px) {
    width: 50%;
  }
`;

const DivDerecho = styled.div`
  align-items: center;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  width: 50%;

  @media (max-width: 480px) {
    width: 50%;
  }
`;

// DIV DEL DASHBOARD.

const Dashboard = styled.div`
  align-items: center;
  background-color: #023e7d;
  color: #ffffff;
  display: flex;
  height: 40px;
  justify-content: center;
`;

// BOTÓN.

const Button = styled.button`
  background-color: #001233;
  border: none;
  border-radius: 24px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 0.5rem;
  outline: none;
  padding: 0.5rem 1rem;

  @media (max-width: 769px) {
    font-size: .75rem;
    padding: .45rem .75rem;
  }

  &:hover {
    background-color: transparent;
    /* border-bottom: 4px;
        border-radius: 4px;
        color: #fff;
        padding: .6rem 1.1rem; */
    //transition: all 0.3s ease-out;
  }
`;

const H5 = styled.h5`
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 600;
  margin: 0rem 1rem;
`;

const Sidebar = () => {
  const history = useHistory();
  const [sidebar, setSidebar] = useState(false);
  const [sidebarData, setSidebarData] = useState([]);
  const { user } = useContext(AuthContext);
  const showSidebar = () => setSidebar(!sidebar);

  useEffect(async () => {
    const response = await fetch(`${SERVER_URL}/categories/tree`);
    const data = await response.json();

    if (data.ok) {
      //pone la introduccion antes de BIG O
      let introIcon = {
        set: 'ai',
        name: 'AiOutlineMessage',
      };
      const intro = {
        id: 'RANDOMINDEX',
        title: 'Introducción',
        icon: JSON.stringify(introIcon),
      };

      data.tree[0].topics.unshift(intro);

      setSidebarData(data.tree);
    }
  }, []);

  return (
    <>
      <Nav>
        <DivIzquierdo>
          <NavIcon>
            <IconContext.Provider value={{ color: '#FFFFFF' }}>
              <FaBars onClick={showSidebar} />
            </IconContext.Provider>
          </NavIcon>
          <LinkLogo>AlgoThinker</LinkLogo>
          <IconContext.Provider value={{ className: 'logo' }}>
            <FaCubes />
          </IconContext.Provider>
        </DivIzquierdo>

        <DivDerecho>
          <IconContext.Provider value={{ className: 'icons' }}>
            <FiHelpCircle />
          </IconContext.Provider>
          <Link style = {{textDecoration: "none"}} to = "/userpage">
            <H5>Hola {user.fullname}</H5>
          </Link>
          <div>
            <Button
              onClick={() => {
                localStorage.removeItem('algothinker_user');
                localStorage.removeItem('algothinker_token');
                history.push('/');
              }}
            >
              Cerrar sesión
            </Button>
          </div>
        </DivDerecho>
      </Nav>

      <SideBarNav sidebar={sidebar}>
        <SideBarWrap>
          <NavIcon>
            <IconContext.Provider value={{ color: '#FFFFFF' }}>
              <AiOutlineClose onClick={showSidebar} />
              <H4Logo>AlgoThinker</H4Logo>
              <IconContext.Provider value={{ className: 'logo' }}>
                <FaCubes />
              </IconContext.Provider>
            </IconContext.Provider>
          </NavIcon>
          <Dashboard>
            <IconContext.Provider value={{ className: 'dashboard' }}>
              <AiOutlineDashboard /> Dashboard
            </IconContext.Provider>
          </Dashboard>
          {sidebarData.length > 0 &&
            sidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
        </SideBarWrap>
      </SideBarNav>
    </>
  );
};

export default Sidebar;
