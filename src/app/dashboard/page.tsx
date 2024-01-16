import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KKI Analytics - Dashboard',
};

const metrics = [
  {
    name: 'User Activity Over Time',
    title: 'Identify peak activity times and trends.',
    role: 'Client',
  },
  {
    name: 'Page Duration Analysis',
    title:
      'Understand user engagement and identify unusually long or short sessions',
    role: 'Client',
  },
  {
    name: 'Page View Flow',
    title:
      'Visualize user navigation paths and identify common journeys or drop-off points',
    role: 'Client',
  },
  {
    name: 'Engagement Score Analysis',
    title:
      'Correlate engagement scores with session duration or specific times',
    role: 'Server',
  },
  {
    name: 'Referrer Analysis',
    title:
      'Identify which referrers bring the most traffic or the highest engagement',
    role: 'Client',
  },
  {
    name: 'Session Analysis',
    title: 'Evaluate the depth of user engagement per session',
    role: 'Server',
  },
  {
    name: 'Unique vs. Returning Visitors',
    title:
      'Understand the balance between attracting new users and retaining existing ones',
    role: 'Client',
  },
];

export default function Dashboard() {
  return (
    <ul
      role='list'
      className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    >
      {metrics.map((metric) => (
        <li
          key={metric.name}
          className='col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow'
        >
          <div className='flex flex-1 flex-col p-8'>
            <h3 className='mt-6 text-sm font-medium text-gray-900'>
              {metric.name}
            </h3>
            <dl className='mt-1 flex flex-grow flex-col justify-between'>
              <dt className='sr-only'>Title</dt>
              <dd className='text-sm text-gray-500'>{metric.title}</dd>
              <dt className='sr-only'>Provider</dt>
              <dd className='mt-3'>
                <span className='inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                  {metric.role}
                </span>
              </dd>
            </dl>
          </div>
        </li>
      ))}
    </ul>
  );
}
