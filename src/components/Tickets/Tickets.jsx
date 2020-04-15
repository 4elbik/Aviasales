import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
      <Loading>
        <div className="🤚">
          <div className="👉" />
          <div className="👉" />
          <div className="👉" />
          <div className="👉" />
          <div className="🌴" />
          <div className="👍" />
        </div>
      </Loading>
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

const Loading = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  & .🤚 {
    --skin-color: #e4c560;
    --tap-speed: 0.6s;
    --tap-stagger: 0.1s;

    position: relative;
    width: 8vw;
    height: 6vw;
    margin-left: 8vw;

    &:before {
      content: '';
      display: block;
      width: 180%;
      height: 75%;
      position: absolute;
      top: 70%;
      right: 20%;
      background-color: black;
      border-radius: 4vw 1vw;
      filter: blur(10px);
      opacity: 0.3;
    }
  }

  & .🌴 {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--skin-color);
    border-radius: 1vw 4vw;
  }

  & .👍 {
    position: absolute;
    width: 120%;
    height: 3.2vw;
    background-color: var(--skin-color);
    bottom: -18%;
    right: 1%;
    transform-origin: calc(100% - 2vw) 2vw;
    transform: rotate(-20deg);
    border-radius: 3vw 2vw 2vw 1vw;
    border-bottom: 2px solid rgba(black, 0.1);
    border-left: 2px solid rgba(black, 0.1);

    &:after {
      width: 20%;
      height: 60%;
      content: '';
      background-color: rgba(white, 0.3);
      position: absolute;
      bottom: -8%;
      left: 0.5vw;
      border-radius: 60% 10% 10% 30%;
      border-right: 2px solid rgba(black, 0.05);
    }
  }

  & .👉 {
    position: absolute;
    width: 80%;
    height: 3.5vw;
    background-color: var(--skin-color);
    bottom: 32%;
    right: 64%;
    transform-origin: 100% 2vw;

    animation-duration: calc(var(--tap-speed) * 2);
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    transform: rotate(10deg);

    &:before {
      content: '';
      position: absolute;
      width: 140%;
      height: 3vw;
      background-color: var(--skin-color);
      bottom: 8%;
      right: 65%;
      transform-origin: calc(100% - 2vw) 2vw;
      transform: rotate(-60deg);
      border-radius: 2vw;
    }

    &:nth-child(1) {
      animation-delay: 0;
      filter: brightness(70%);
      animation-name: tap-upper-1;
    }

    &:nth-child(2) {
      animation-delay: var(--tap-stagger);
      filter: brightness(80%);
      animation-name: tap-upper-2;
    }

    &:nth-child(3) {
      animation-delay: calc(var(--tap-stagger) * 2);
      filter: brightness(90%);
      animation-name: tap-upper-3;
    }

    &:nth-child(4) {
      animation-delay: calc(var(--tap-stagger) * 3);
      filter: brightness(100%);
      animation-name: tap-upper-4;
    }
  }

  @keyframes tap-upper-1 {
    0%,
    50%,
    100% {
      transform: rotate(10deg) scale(0.4);
    }
    40% {
      transform: rotate(50deg) scale(0.4);
    }
  }

  @keyframes tap-upper-2 {
    0%,
    50%,
    100% {
      transform: rotate(10deg) scale(0.6);
    }
    40% {
      transform: rotate(50deg) scale(0.6);
    }
  }

  @keyframes tap-upper-3 {
    0%,
    50%,
    100% {
      transform: rotate(10deg) scale(0.8);
    }
    40% {
      transform: rotate(50deg) scale(0.8);
    }
  }

  @keyframes tap-upper-4 {
    0%,
    50%,
    100% {
      transform: rotate(10deg) scale(1);
    }
    40% {
      transform: rotate(50deg) scale(1);
    }
  }
`;

Tickets.propTypes = {
  tickets: PropTypes.InstanseOf(Array).isRequired,
  activeFilters: PropTypes.InstanseOf(Array).isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Tickets);
