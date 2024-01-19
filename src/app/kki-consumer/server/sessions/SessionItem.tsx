import { SessionTable } from '@components/sessions/SessionTable';

export const SessionItem = ({
  sessionId,
  formattedEventTime,
  userId,
  sessionData,
}: any) => (
  <div className='relative mb-12'>
    <div className='flex justify-between items-center'>
      <h3 className='text-xs'>
        <span className='font-bold'>Session ID - </span>
        <span className='inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10'>
          {sessionId}
        </span>
      </h3>
      <h3 className='flex flex-col mb-5'>
        <span className='mb-1 text-sm text-gray-600'>{userId}</span>
        <span className='text-xs'>{formattedEventTime}</span>
      </h3>
    </div>
    <SessionTable sessionData={sessionData} />
  </div>
);
