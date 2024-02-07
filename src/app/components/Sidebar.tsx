'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {
  ClockIcon,
  CursorArrowRaysIcon,
  VideoCameraIcon,
  Square3Stack3DIcon,
  ArrowRightIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useUser } from '@auth0/nextjs-auth0/client';

const navigation = [
  {
    icon: <Square3Stack3DIcon className='h-5 w-5 mr-2' />,
    name: 'Dashboard',
    href: '/dashboard',
    current: true,
  },
  {
    name: 'KKI Patient',
    current: false,
    children: [
      {
        icon: <SparklesIcon className='h-5 w-5 mr-2' />,
        name: 'Engagement',
        href: '/kki-patient/client/engagement',
        label: 'Client',
      },
      // {
      //   icon: <ClockIcon className='h-5 w-5 mr-2' />,
      //   name: 'Sessions',
      //   href: '/kki-patient/client/sessions',
      //   label: 'Client',
      // },
      {
        icon: <VideoCameraIcon className='h-5 w-5 mr-2' />,
        name: 'Videos',
        href: '/kki-patient/client/videos',
        label: 'Client',
      },
      {
        divider: true,
      },
      {
        icon: <SparklesIcon className='h-5 w-5 mr-2' />,
        name: 'Engagement',
        href: '/kki-patient/server/engagement',
        label: 'Server',
      },
      // {
      //   icon: <ClockIcon className='h-5 w-5 mr-2' />,
      //   name: 'Sessions',
      //   href: '/kki-patient/server/sessions',
      //   label: 'Server',
      // },
      {
        icon: <VideoCameraIcon className='h-5 w-5 mr-2' />,
        name: 'Videos',
        href: '/kki-patient/server/videos',
        label: 'Server',
      },
    ],
  },
  {
    name: 'KKI Military',
    current: false,
    children: [
      {
        icon: <SparklesIcon className='h-5 w-5 mr-2' />,
        name: 'Engagement',
        href: '/kki-military/client/engagement',
        label: 'Client',
      },
      // {
      //   icon: <ClockIcon className='h-5 w-5 mr-2' />,
      //   name: 'Sessions',
      //   href: '/kki-military/client/sessions',
      //   label: 'Client',
      // },
      {
        icon: <VideoCameraIcon className='h-5 w-5 mr-2' />,
        name: 'Videos',
        href: '/kki-military/client/videos',
        label: 'Client',
      },
      {
        divider: true,
      },
      {
        icon: <SparklesIcon className='h-5 w-5 mr-2' />,
        name: 'Engagement',
        href: '/kki-military/server/engagement',
        label: 'Server',
      },
      // {
      //   icon: <ClockIcon className='h-5 w-5 mr-2' />,
      //   name: 'Sessions',
      //   href: '/kki-military/server/sessions',
      //   label: 'Server',
      // },
      {
        icon: <VideoCameraIcon className='h-5 w-5 mr-2' />,
        name: 'Videos',
        href: '/kki-military/server/videos',
        label: 'Server',
      },
    ],
  },
  {
    name: 'KKI Consumer',
    current: false,
    children: [
      {
        icon: <SparklesIcon className='h-5 w-5 mr-2' />,
        name: 'Engagement',
        href: '/kki-consumer/client/engagement',
        label: 'Client',
      },
      // {
      //   icon: <ClockIcon className='h-5 w-5 mr-2' />,
      //   name: 'Sessions',
      //   href: '/kki-consumer/client/sessions',
      //   label: 'Client',
      // },
      {
        icon: <VideoCameraIcon className='h-5 w-5 mr-2' />,
        name: 'Videos',
        href: '/kki-consumer/client/videos',
        label: 'Client',
      },
      {
        divider: true,
      },
      {
        icon: <SparklesIcon className='h-5 w-5 mr-2' />,
        name: 'Engagement',
        href: '/kki-consumer/server/engagement',
        label: 'Server',
      },
      // {
      //   icon: <ClockIcon className='h-5 w-5 mr-2' />,
      //   name: 'Sessions',
      //   href: '/kki-consumer/server/sessions',
      //   label: 'Server',
      // },
      {
        icon: <VideoCameraIcon className='h-5 w-5 mr-2' />,
        name: 'Videos',
        href: '/kki-consumer/server/videos',
        label: 'Server',
      },
    ],
  },
];

interface ISidebar {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: ISidebar) {
  const { user, error, isLoading } = useUser();

  const isParentActive = (children: any) => {
    return children.some((child: any) => pathname === child.href);
  };

  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50 lg:hidden'
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter='transition-opacity ease-linear duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-linear duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-900/80' />
        </Transition.Child>

        <div className='fixed inset-0 flex'>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                  <button
                    type='button'
                    className='-m-2.5 p-2.5'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XMarkIcon
                      className='h-6 w-6 text-white'
                      aria-hidden='true'
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10 pt-10'>
                <nav className='flex flex-1 flex-col'>
                  <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                    <li>
                      <ul role='list' className='-mx-2 space-y-1'>
                        {navigation.map((item, i) => {
                          return (
                            <li key={i}>
                              {!item.children ? (
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    isActive(item.href)
                                      ? 'bg-gray-800'
                                      : 'hover:bg-gray-800',
                                    'block rounded-sm py-2 pl-3 text-sm leading-6 font-semibold text-white flex items-center'
                                  )}
                                >
                                  {item.icon}
                                  {item.name}
                                </Link>
                              ) : (
                                <Disclosure
                                  as='div'
                                  key={`${pathname}-${i}`} // Unique key based on pathname and index
                                  defaultOpen={isParentActive(item.children)}
                                >
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button
                                        className={classNames(
                                          isParentActive(item.children)
                                            ? 'bg-gray-800'
                                            : 'hover:bg-gray-800',
                                          'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-white'
                                        )}
                                      >
                                        <ChevronRightIcon
                                          className={classNames(
                                            open
                                              ? 'rotate-90 text-white'
                                              : 'text-white',
                                            'h-5 w-5 shrink-0'
                                          )}
                                          aria-hidden='true'
                                        />
                                        {item.name}
                                      </Disclosure.Button>
                                      <Disclosure.Panel
                                        as='ul'
                                        className='mt-1 px-2'
                                      >
                                        {item.children.map(
                                          (subItem: any, i) => (
                                            <li key={i}>
                                              {subItem.divider ? (
                                                <hr className='my-2 border-gray-700 max-w-[160px] mx-auto' />
                                              ) : (
                                                <Link
                                                  href={subItem.href}
                                                  passHref
                                                >
                                                  <Disclosure.Button
                                                    as='div'
                                                    className={classNames(
                                                      isActive(subItem.href)
                                                        ? 'text-green-400'
                                                        : 'hover:bg-gray-800',
                                                      'block rounded-sm py-2 pr-2 pl-9 text-sm leading-6 text-gray-300 flex items-center'
                                                    )}
                                                  >
                                                    {subItem.icon}{' '}
                                                    {subItem.name}
                                                    <span className='inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20 ml-2'>
                                                      {subItem.label}
                                                    </span>
                                                  </Disclosure.Button>
                                                </Link>
                                              )}
                                            </li>
                                          )
                                        )}
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    {user ? (
                      <li className='-mx-6 mt-auto flex mb-10'>
                        <Link
                          href='/profile'
                          className='flex items-center gap-x-4 px-6 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-800'
                        >
                          <img
                            className='h-8 w-8 rounded-full bg-gray-800'
                            src={
                              (user && user.picture) ||
                              'https://via.placeholder.com/150'
                            }
                            alt='User profile Picture'
                          />
                          <span className='sr-only'>Your profile</span>
                          <span aria-hidden='true' className='text-gray-400'>
                            {user && user.name}
                          </span>
                        </Link>
                        {user && (
                          <a
                            href='/api/auth/logout'
                            className='inline-flex items-center rounded-md bg-yellow-100 hover:bg-yellow-200 px-2 py-1 text-xs font-medium text-yellow-800 h-8 mt-2'
                          >
                            Logout
                          </a>
                        )}
                      </li>
                    ) : (
                      <li className='mt-auto flex mb-10'>
                        <a
                          href='/api/auth/login'
                          className='items-center rounded-md border-gray-700 border-2 px-2 py-1 text-xs font-medium text-white w-full py-3 px-3 text-center bg-gray-800 hover:bg-gray-700'
                        >
                          Login
                        </a>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
