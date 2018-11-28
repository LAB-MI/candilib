import moment from 'moment';

export const USER_STATUS2EXPIRESIN = {
  admin: () => {
    const now = moment();
    const midnight = now
      .clone()
      .hour(23)
      .minute(59)
      .second(59)
      .millisecond(0);

    if (midnight.isBefore(now)) {
      midnight.add(1, 'days');
    }
    const duration = midnight.diff(now) / 1000;

    return duration + 's';
  },
  candidat: () => {
    return '1h';
  },
};
export const USER_STATUS2LEVEL = {
  admin: 1,
};
