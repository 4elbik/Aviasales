import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Preloader from '../Preloader';

import {
  convertMinutesToDaysHoursMinutes,
  calculationOfArrivalTime,
  prettifyPriceNumber,
  prettifyTimeNumber,
} from '../../utilities/utilities';

const mapStateToProps = (state) => {
  const props = {
    tickets: state.tickets,
    activeFilters: state.activeFilters,
    activeTab: state.activeTab,
  };

  return props;
};

const renderDepartureTime = (date) => {
  const dateTime = new Date(date);
  return `${prettifyTimeNumber(dateTime.getHours())}:${prettifyTimeNumber(dateTime.getMinutes())}`;
};

const filterHelpfulObj = {
  0: 'Без пересадок',
  1: '1 пересадка',
  2: '2 пересадки',
  3: '3 пересадки',
};

const Tickets = (props) => {
  const {
    tickets,
    tickets: { length },
    activeFilters,
    activeTab,
  } = props;
  if (length === 0) {
    return (
      <Preloader />
    );
  }

  const maxViewTickets = 10;
  let counterToViewTickets = 0;
  if (activeTab === 'cheap') {
    tickets.sort((firstElem, secondElem) => {
      if (firstElem.price > secondElem.price) {
        return 1;
      }
      if (firstElem.price < secondElem.price) {
        return -1;
      }
      return 0;
    });
  } else if (activeTab === 'fast') {
    tickets.forEach((ticket) => {
      ticket.segments.sort((firstSegment, secondSegment) => {
        if (firstSegment.duration > secondSegment.duration) {
          return 1;
        }
        if (firstSegment.duration < secondSegment.duration) {
          return -1;
        }
        return 0;
      });
    });
    tickets.sort((firstTicket, secondTicket) => {
      if (firstTicket.segments[0].duration > secondTicket.segments[0].duration) {
        return 1;
      }
      if (firstTicket.segments[0].duration < secondTicket.segments[0].duration) {
        return -1;
      }
      return 0;
    });
  }
  return (
    <div>
      <TicketsList>
        {tickets
          .filter((ticket) => {
            if (activeFilters && activeFilters.includes('Все')) {
              if (counterToViewTickets >= maxViewTickets) {
                return false;
              }
              counterToViewTickets += 1;
              return ticket;
            }

            const ticketTransferCounter = ticket.segments.map((el) => el.stops.length);
            for (let i = 0; i < ticketTransferCounter.length; i += 1) {
              if (activeFilters.includes(filterHelpfulObj[ticketTransferCounter[i]])) {
                if (counterToViewTickets >= maxViewTickets) {
                  return false;
                }
                counterToViewTickets += 1;
                return ticket;
              }
            }
            return false;
          })
          .map((ticket) => {
            const { price, carrier, segments: ticketsWaysList } = ticket;

            return (
              <Ticket key={`${carrier}-${price}`}>
                <div className="ticket-header">
                  <span className="ticket-price">{prettifyPriceNumber(price)} Р</span>
                  <img
                    className="aviacompany-logo"
                    src={`//pics.avs.io/99/36/{${carrier}}.png`}
                    alt={`${carrier} aviacompany logo`}
                  />
                </div>
                <TicketWaysList>
                  {ticketsWaysList
                    .filter((el) => {
                      if (activeFilters && activeFilters.includes('Все')) return el;

                      const ticketTransferCounter = el.stops.length;
                      if (activeFilters.includes(filterHelpfulObj[ticketTransferCounter])) {
                        return el;
                      }
                      return null;
                    })
                    .map((el) => (
                      <li key={`${carrier}-${price}---${el.date}`} className="ticket-ways-item">
                        <div className="ways-route">
                          <div className="ways-route__header">
                            {el.origin} - {el.destination}
                          </div>
                          <div className="ways-route__info">
                            <time dateTime={el.date}>{renderDepartureTime(el.date)}</time>
                            {' – '}
                            <time
                              dateTime={calculationOfArrivalTime(
                                el.date,
                                el.duration,
                                true
                              ).toISOString()}
                            >
                              {calculationOfArrivalTime(el.date, el.duration)}
                            </time>
                          </div>
                        </div>
                        <div className="ways-duration">
                          <div className="ways-duration__header">В пути</div>
                          <div className="ways-duration__info">
                            {convertMinutesToDaysHoursMinutes(el.duration)}
                          </div>
                        </div>
                        <div className="ways-stops">
                          <div className="ways-stop__header">
                            {filterHelpfulObj[el.stops.length]}
                          </div>
                          <div className="ways-stop__info">{el.stops.join(', ')}</div>
                        </div>
                      </li>
                    ))}
                </TicketWaysList>
              </Ticket>
            );
          })}
      </TicketsList>
    </div>
  );
};

const TicketsList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Ticket = styled.li`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  & .ticket-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-right: 40px;
  }

  & .ticket-price {
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: #2196f3;
  }
`;

const TicketWaysList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  & .ticket-ways-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }

    & > div {
      width: 141px;
    }

    & [class*='header'] {
      font-weight: 600;
      font-size: 12px;
      line-height: 18px;
      color: #a0b0b9;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    & [class*='info'] {
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
    }
  }
`;

Tickets.propTypes = {
  tickets: PropTypes.array.isRequired,
  activeFilters: PropTypes.array.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Tickets);
