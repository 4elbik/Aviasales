import React from "react";
import styled from "styled-components";

import s7logo from "../../assets/img/S7 Logo.png";

const Tickets = (props) => {
    return (
        <div>
            <TicketsList>
                <Ticket>
                    <div className="ticket-header">
                        <span className="ticket-price">13 400 Р</span>
                        <img className="aviacompany-logo" src={s7logo} alt="S7 Logo" />
                    </div>
                    <TicketWaysList>
                        <li className="ticket-ways-item">
                            <div className="ways-route">
                                <div className="ways-route__header">
                                    MOW - HKT
                                </div>
                                <div className="ways-route__info">
                                    10:45 – 08:00
                                </div>
                            </div>
                            <div className="ways-duration">
                                <div className="ways-duration__header">
                                    В пути
                                </div>
                                <div className="ways-duration__info">
                                    21ч 15м
                                </div>
                            </div>
                            <div className="ways-stops">
                                <div className="ways-stop__header">
                                    2 пересадки
                                </div>
                                <div className="ways-stop__info">
                                    HKG, JNB
                                </div>
                            </div>
                        </li>
                        <li className="ticket-ways-item">
                            <div className="ways-route">
                                <div className="ways-route__header">
                                    MOW - HKT
                                </div>
                                <div className="ways-route__info">
                                    11:20 – 00:50
                                </div>
                            </div>
                            <div className="ways-duration">
                                <div className="ways-duration__header">
                                    В пути
                                </div>
                                <div className="ways-duration__info">
                                    13ч 30м
                                </div>
                            </div>
                            <div className="ways-stops">
                                <div className="ways-stop__header">
                                    1 пересадка
                                </div>
                                <div className="ways-stop__info">
                                    HKG
                                </div>
                            </div>
                        </li>
                    </TicketWaysList>
                </Ticket>
                <Ticket>
                    <div className="ticket-header">
                        <span className="ticket-price">13 400 Р</span>
                        <img className="aviacompany-logo" src={s7logo} alt="S7 Logo" />
                    </div>
                </Ticket>
            </TicketsList>
        </div>
    );
}

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
    background-color: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;

    & .ticket-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-right: 30px;
    }

    & .ticket-price {
        font-weight: 600;
        font-size: 24px;
        line-height: 24px;
        color: #2196F3;
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

        & [class*=header] {
            font-weight: 600;
            font-size: 12px;
            line-height: 18px;
            color: #A0B0B9;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        & [class*=info] {
            font-weight: 600;
            font-size: 14px;
            line-height: 21px;
        }
    }
`;

export default Tickets;