import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from '../Header';
import Filter from '../Filter';
import Tabs from '../Tabs';
import Tickets from '../Tickets';
import * as actions from '../../actions';

// const mapStateToProps = (state) => {
//   const props = {
//     filters: state.filters,
//   };

//   return props;
// }

const mapDispatchToProps = {
  getTickets: actions.getTickets,
};

const tabs = {
  'cheap': 'Самый дешевый',
  'fast': 'Самый быстрый',
};

class App extends React.Component {
  componentDidMount() {
    const { getTickets } = this.props;
    getTickets();
  }

  render() {
    return (
      <AppWrapper>
        <Header />
        <Main>
          <MainSidebar>
            <Filter />
          </MainSidebar>
          <MainContent>
            <Tabs tabs={tabs} />
            <Tickets />
          </MainContent>
        </Main>
      </AppWrapper>
    );
  }
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

App.propTypes = {
  getTickets: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
