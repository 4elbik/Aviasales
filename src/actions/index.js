import axios from 'axios';

export const changeActiveFilters = (filterName) => ({
  type: 'ACTIVE_FILTERS_UPDATE',
  payload: {
    filterName,
  },
});

const fetchTicketsRequest = () => ({ type: 'TICKETS_FETCH_REQUEST' });
const fetchTicketsSuccess = (response) => ({
  type: 'TICKETS_FETCH_SUCCESS',
  payload: {
    tickets: response,
  },
});
const fetchTicketsFailure = () => ({ type: 'TICKETS_FETCH_FAILURE' });

const takeAFetch = async (dispatch) => {
  let counter = 0;
  let isSearching = true;
  const searchId = await axios.get('https://front-test.beta.aviasales.ru/search');
  while (counter !== 5 && isSearching) {
    try {
      let response = await axios.get(
        `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId.data.searchId}`
      );
      dispatch(fetchTicketsSuccess(response.data.tickets));

      while (response.data.stop === false) {
        response = await axios.get(
          `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId.data.searchId}`
        );
        dispatch(fetchTicketsSuccess(response.data.tickets));
      }
      isSearching = false;
    } catch (error) {
      counter += 1;
    }
  }
  if (counter === 5) {
    return false;
  }
  return true;
};

export const getTickets = () => async (dispatch) => {
  dispatch(fetchTicketsRequest());
  if (!takeAFetch(dispatch)) {
    dispatch(fetchTicketsFailure());
  }
};

export const changeActiveTab = (tabName) => ({
  type: 'CHANGE_ACTIVE_TAB',
  payload: {
    activeTab: tabName,
  },
});
