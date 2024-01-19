import moment from 'moment-timezone';
import { SessionItem } from './SessionItem';

const SessionList = ({ data }: any) => {
  return (
    <>
      {Object.entries(data).map(([sessionId, sessionData]: any) => {
        if (!sessionData.data) return null;

        const formattedEventTime = sessionData?.data?.[0]
          ? moment(sessionData.data[0].pageBegin)
              .tz('America/New_York')
              .format('MM/DD/YY, hh:mm A')
          : null;

        const userId = sessionData.data[0]?.userId;

        return (
          <SessionItem
            key={sessionId}
            sessionId={sessionId}
            formattedEventTime={formattedEventTime}
            userId={userId}
            sessionData={sessionData}
          />
        );
      })}
    </>
  );
};

export default SessionList;
