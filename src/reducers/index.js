import { combineReducers } from 'redux';

const activeFilters = (state = ['Все'], action) => {
  switch (action.type) {
    case 'ACTIVE_FILTERS_UPDATE':
      if (state.includes(action.payload.filterName)) {
        return state.filter((el) => el !== action.payload.filterName);
      }
      return [...state, action.payload.filterName];
    default:
      return state;
  }
};

const activeTab = (state = 'cheap', action) => {
  switch (action.type) {
    case 'CHANGE_ACTIVE_TAB':
      return action.payload.activeTab;
    default:
      return state;
  }
};

const tickets = (state = [], action) => {
  switch (action.type) {
    case 'TICKETS_FETCH_SUCCESS':
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
