import moment from 'moment';
import serverConfig from '../config';

export const USER_STATUS_EXPIRES_IN = {
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
    return serverConfig.tokenCandidatExpired;
  },
};
export const USER_STATUS_LEVEL = {
  admin: 1,
};
