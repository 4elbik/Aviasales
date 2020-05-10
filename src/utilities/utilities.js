export const convertMinutesToDaysHoursMinutes = (minutes, takeObject = false) => {
  // 1452 minutes = 24h 12min
  const days = Math.floor(minutes / 60 / 24);
  const hours = Math.floor(minutes / 60) - days * 24;
  const newMinutes = minutes - hours * 60 - days * 24 * 60;
  if (takeObject) {
    return { days, hours, minutes: newMinutes };
  }

  if (days === 0) {
    if (hours === 0) {
      return `00ч ${newMinutes < 10 ? `0${newMinutes}` : newMinutes}м`;
    }
    return `${hours < 10 ? `0${hours}` : hours}ч ${
      newMinutes < 10 ? `0${newMinutes}` : newMinutes
    }м`;
  }
  return `${days}д ${hours < 10 ? `0${hours}` : hours}ч ${
    newMinutes < 10 ? `0${newMinutes}` : newMinutes
  }м`;
};

export const prettifyTimeNumber = (num) => (num < 10 ? `0${num}` : num);

export const calculationOfArrivalTime = (startTime, duration, isISOFormat = false) => {
  // StartTime: 2020-05-09T22:18:00.000Z
  // duration: 1891 (minutes) = 1day 7hours 31min
  // return ArrivalTime = 2020-05-11T05:49:00.00Z
  const dateFlyStart = new Date(startTime);
  const { days, hours, minutes } = convertMinutesToDaysHoursMinutes(duration, true);
  const startDays = dateFlyStart.getDate();
  const startHours = dateFlyStart.getHours();
  const startMinutes = dateFlyStart.getMinutes();
  const arrivalTime = new Date(
    new Date(
      new Date(dateFlyStart.setDate(startDays + days)).setHours(startHours + hours)
    ).setMinutes(startMinutes + minutes)
  );
  if (isISOFormat) {
    return arrivalTime;
  }
  return `${prettifyTimeNumber(arrivalTime.getHours())}:${prettifyTimeNumber(
    arrivalTime.getMinutes()
  )}`;
};

export const prettifyPriceNumber = (num) => {
  const numberWithSpaces = num.toString();
  return numberWithSpaces.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ');
};

export const ticketsSort = (
  tickets,
  maxViewTicketsCounter,
  filterHelpfulObj,
  activeFilters,
  activeTab
) => {
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
  }
  const newTickets = tickets
    .map((ticket) => {
      const newSegments = ticket.segments.filter((segment) => {
        return activeFilters.includes(filterHelpfulObj[segment.stops.length]);
      });
      const { ...newTicket } = ticket;
      newTicket.segments = newSegments;
      return newTicket;
    })
    .filter((ticket) => ticket.segments.length !== 0);
  const newnewTickets = newTickets.map((ticket) => {
    ticket.segments.sort((firstSegment, secondSegment) => {
      if (firstSegment.duration > secondSegment.duration) {
        return 1;
      }
      if (firstSegment.duration < secondSegment.duration) {
        return -1;
      }
      return 0;
    });
    return ticket;
  });
  if (activeTab === 'fast') {
    newnewTickets.sort((firstTicket, secondTicket) => {
      if (firstTicket.segments[0].duration > secondTicket.segments[0].duration) {
        return 1;
      }
      if (firstTicket.segments[0].duration < secondTicket.segments[0].duration) {
        return -1;
      }
      return 0;
    });
  }
  return newnewTickets.filter((ticket) => {
    if (activeFilters && activeFilters.includes('Все')) {
      if (counterToViewTickets >= maxViewTicketsCounter) {
        return false;
      }
      counterToViewTickets += 1;
      return ticket;
    }

    const ticketTransferCounter = ticket.segments.map((el) => el.stops.length);
    for (let i = 0; i < ticketTransferCounter.length; i += 1) {
      if (activeFilters.includes(filterHelpfulObj[ticketTransferCounter[i]])) {
        if (counterToViewTickets >= maxViewTicketsCounter) {
          return false;
        }
        counterToViewTickets += 1;
        return ticket;
      }
    }
    return false;
  });
};
