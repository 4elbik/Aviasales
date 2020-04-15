import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as actions from '../../actions';
import checkedChechbox from '../../assets/img/check-mark.svg';

const mapStateToProps = (state) => ({ activeFilters: state.activeFilters });

const mapDispatchToProps = {
  changeActiveFilters: actions.changeActiveFilters,
};

class Filter extends React.Component {
  onChangeFilters = (filterName) => () => {
    const { changeActiveFilters } = this.props;
    changeActiveFilters(filterName);
  };

  render() {
    const { activeFilters } = this.props;

    return (
      <FilterWrapper>
        <FilterHeader>Количество пересадок</FilterHeader>
        <form>
          <FilterList>
            <FilterItem>
              <FilterInput
                id="all-transfer"
                type="checkbox"
                onChange={this.onChangeFilters('Все')}
                checked={activeFilters.includes('Все')}
              />
              <FilterStyledSheckbox />
              <label htmlFor="all-transfer">Все</label>
            </FilterItem>
            <FilterItem>
              <FilterInput
                id="without-transfer"
                type="checkbox"
                onChange={this.onChangeFilters('Без пересадок')}
                checked={activeFilters.includes('Без пересадок')}
              />
              <FilterStyledSheckbox />
              <label htmlFor="without-transfer">Без пересадок</label>
            </FilterItem>
            <FilterItem>
              <FilterInput
                id="one-transfer"
                type="checkbox"
                onChange={this.onChangeFilters('1 пересадка')}
                checked={activeFilters.includes('1 пересадка')}
              />
              <FilterStyledSheckbox />
              <label htmlFor="one-transfer">1 пересадка</label>
            </FilterItem>
            <FilterItem>
              <FilterInput
                id="two-transfer"
                type="checkbox"
                onChange={this.onChangeFilters('2 пересадки')}
                checked={activeFilters.includes('2 пересадки')}
              />
              <FilterStyledSheckbox />
              <label htmlFor="two-transfer">2 пересадки</label>
            </FilterItem>
            <FilterItem>
              <FilterInput
                id="three-transfer"
                type="checkbox"
                onChange={this.onChangeFilters('3 пересадки')}
                checked={activeFilters.includes('3 пересадки')}
              />
              <FilterStyledSheckbox />
              <label htmlFor="three-transfer">3 пересадки</label>
            </FilterItem>
          </FilterList>
        </form>
      </FilterWrapper>
    );
  }
}

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const FilterHeader = styled.h2`
  margin: 20px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const FilterList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const FilterItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 20px;

  & label {
    padding: 10px 20px;
    padding-left: 50px;
    width: 100%;
  }

  & label:hover {
    cursor: pointer;
    background-color: #f1fcff;
  }
`;

const FilterInput = styled.input`
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;

    &:checked + span {
      border-color: #2196F3;
    }
    
    &:checked + span::before {
      content: "";
      display: block;
      width: 12px;
      height: 8px;
      background-image: url("${checkedChechbox}");
    }
`;

const FilterStyledSheckbox = styled.span`
  position: absolute;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border: 1px solid #9abbce;
  box-sizing: border-box;
  border-radius: 2px;
`;

Filter.propTypes = {
  changeActiveFilters: PropTypes.func.isRequired,
  activeFilters: PropTypes.InstanceOf(Array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
