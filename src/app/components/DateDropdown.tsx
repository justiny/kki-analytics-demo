import { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DateSelectionDropdown({ handleDateSelection }: any) {
  const [selectedRange, setSelectedRange] = useState('Date Range');

  const handleSelection = (rangeLabel: string, days: number) => {
    setSelectedRange(rangeLabel);
    handleDateSelection(days);
  };

  return (
    <Menu as='div' className='relative inline-block text-left ml-5'>
      <div>
        <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-3 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 items-center'>
          {selectedRange}
          <ChevronDownIcon
            className='-mr-1 -mt-1 h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {[
              { label: 'Yesterday', days: 1 },
              { label: 'Last 7 days', days: 7 },
              { label: 'Last 30 days', days: 30 },
              { label: 'Last 6 months', days: 180 },
              // leave one day off to avoid timezone issues
              { label: 'Last 12 months', days: 364 },
            ].map((item) => (
              <Menu.Item key={item.label}>
                {({ active }) => (
                  <button
                    onClick={() => handleSelection(item.label, item.days)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
