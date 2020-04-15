import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as actions from '../../actions';

const mapStateToProps = (state) => ({ activeTab: state.activeTab });

const mapDispatchToProps = {
  changeActiveTab: actions.changeActiveTab,
};

const Tabs = (props) => {
  const { activeTab, changeActiveTab } = props;

  return (
    <TabsWrapper>
      <TabsButon
        className={activeTab === 'cheap' ? 'active' : ''}
        onClick={() => changeActiveTab('cheap')}
        disabled={activeTab === 'cheap'}
      >
        Самый дешевый
      </TabsButon>
      <TabsButon
        className={activeTab === 'fast' ? 'active' : ''}
        onClick={() => changeActiveTab('fast')}
        disabled={activeTab === 'fast'}
      >
        Самый быстрый
      </TabsButon>
    </TabsWrapper>
  );
};

const TabsWrapper = styled.div`
  margin-bottom: 20px;
`;

const TabsButon = styled.button`
  padding: 14px 15px;
  width: 50%;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.5px;
  text-content: center;
  text-transform: uppercase;
  color: inherit;
  background-color: #ffffff;
  border: 1px solid #dfe5ec;
  box-sizing: border-box;

  &.active {
    color: #ffffff;
    background-color: #2196f3;
    border-color: #2196f3;
  }

  &:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  &:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &:hover:not(.active) {
    background-color: #f1fcff;
    cursor: pointer;
  }
`;

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  changeActiveTab: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
