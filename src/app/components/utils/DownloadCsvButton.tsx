'use client';
import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useJsonToCsv } from '@hooks/useJsonToCsv';

export const DownloadCsvButton = ({ data, fileName, classes }: any) => {
  const handleCsvDownload = useJsonToCsv();

  return (
    <button
      type='button'
      onClick={() => handleCsvDownload(data, fileName)}
      className={classes}
    >
      <ArrowDownTrayIcon className='h-5 w-5' aria-hidden='true' />
    </button>
  );
};
