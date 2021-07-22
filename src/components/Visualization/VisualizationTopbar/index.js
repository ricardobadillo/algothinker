import styled from 'styled-components';

const Header = styled.div`
  grid-area: navigation;
`;

const Nav = styled.nav`
  display: none;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  background-color: #0466c8;
  height: 50px;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const TabLink = styled.div`
  position: relative;
  padding: 0.5rem;
  height: 100%;
  background-color: ${({ selected }) => (selected ? 'white' : '#0466C8')};
    selected ? 'brightness(110%)' : 'brightness(90%)'}
  color: ${({ selected }) => (selected ? '#0466C8' : 'white')};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

const VisualizationTopbar = ({ setSelectedTab, selectedTab }) => {
  const modes = ['Visualización', 'Código'];

  return (
    <Header>
      <Nav>
        {modes.map((mode, index) => {
          return (
            <TabLink
              key={index}
              selected={mode === selectedTab}
              onClick={() => {
                setSelectedTab(mode);
              }}
            >
              {mode}
            </TabLink>
          );
        })}
      </Nav>
    </Header>
  );
};

export default VisualizationTopbar;
