import React from 'react';
import styled from 'styled-components';
import Header from "../Header";
import Filter from "../Filter";
import Tabs from "../Tabs";
import Tickets from "../Tickets";

function App() {
  return (
    <AppWrapper className="App">
      <Header />
      <Main class="main">
        <MainSidebar className="main-sidebar">
          <Filter />
        </MainSidebar>
        <MainContent className="main-content">
          <Tabs />
          <Tickets />
        </MainContent>
      </Main>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  margin: 0 auto;
  width: 755px;
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainSidebar = styled.aside`
  width: 232px;
`;

const MainContent = styled.div`
  width: 502px;
`;

export default App;
