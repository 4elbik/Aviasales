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
  const { tabs, activeTab, changeActiveTab } = props;
  const tabsKeys = Object.keys(tabs);

  if (tabsKeys.length === 0) return null;

  return (
    <TabsWrapper>
      {tabsKeys.map((key) => (
        <TabsButon
          key={key}
          className={activeTab === key ? 'active' : ''}
          onClick={() => changeActiveTab(key)}
          disabled={activeTab === key}
        >
          {tabs[key]}
        </TabsButon>
      ))}
    </TabsWrapper>
  );
};

Tabs.defaultProps = {
  tabs: {},
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
  tabs: PropTypes.instanceOf(Object),
  activeTab: PropTypes.string.isRequired,
  changeActiveTab: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
