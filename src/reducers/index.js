import { combineReducers } from 'redux';
import * as actionNames from '../actions/actionNames';
import { filtersValues as activeFiltersInitial } from '../components/Filter/Filter.jsx';

const activeFilters = (state = activeFiltersInitial, action) => {
  switch (action.type) {
    case actionNames.ACTIVE_FILTERS_UPDATE:
      if (action.payload.filterName === 'Все' && state.length === activeFiltersInitial.length) {
        return [];
      }
      if (action.payload.filterName === 'Все' && state.length !== activeFiltersInitial.length) {
        return activeFiltersInitial;
      }
      if (action.payload.filterName !== 'Все' && state.includes('Все')) {
        const newState = state.filter((el) => el !== 'Все');
        return newState.filter((el) => el !== action.payload.filterName);
      }
      if (state.includes(action.payload.filterName)) {
        return state.filter((el) => el !== action.payload.filterName);
      }
      const newState = [...state, action.payload.filterName];
      if (
        action.payload.filterName !== 'Все' &&
        !newState.includes('Все') &&
        newState.length === activeFiltersInitial.length - 1
      ) {
        return activeFiltersInitial;
      }
      return newState;
    default:
      return state;
  }
};

const activeTab = (state = 'cheap', action) => {
  switch (action.type) {
    case actionNames.CHANGE_ACTIVE_TAB:
      return action.payload.activeTab;
    default:
      return state;
  }
};

const tickets = (state = [], action) => {
  switch (action.type) {
    case actionNames.TICKETS_FETCH_SUCCESS:
      return [...state, ...action.payload.tickets];
    // case 'CHANGE_ACTIVE_TAB':
    //   if (action.payload.activeTab === 'cheap') {
    //     const newState = state.sort((a, b) => {
    //       if (a.price > b.price) {
    //         return 1;
    //       }
    //       if (a.price < b.price) {
    //         return -1;
    //       }
    //       return 0;
    //     });
    //     return [...newState];
    //   }
    //   if (action.payload.activeTab === 'fast') {
    //     state.forEach((ticket) => {
    //       ticket.segments.sort((firstSegment, secondSegment) => {
    //         if (firstSegment.duration > secondSegment.duration) {
    //           return 1;
    //         }
    //         if (firstSegment.duration < secondSegment.duration) {
    //           return -1;
    //         }
    //         return 0;
    //       });
    //     });
    //     const newState = state.sort((a, b) => {
    //       if (a.segments[0].duration > b.segments[0].duration) {
    //         return 1;
    //       }
    //       if (a.segments[0].duration < b.segments[0].duration) {
    //         return -1;
    //       }
    //       return 0;
    //     });
    //     return [...newState];
    //   }
    //   return state;
    default:
      return state;
  }
};

export default combineReducers({
  activeFilters,
  activeTab,
  tickets,
});
