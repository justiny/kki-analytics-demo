export const TableHeader = ({ title, subTitle, type, description }: any) => {
  return (
    <div className='sm:flex-auto'>
      <h1 className='text-base font-semibold leading-6 text-gray-900 flex items-center'>
        {title}
        <span className='border px-1 py-1 bg-gray-100 rounded text-gray-800 text-sm ml-2'>
          {subTitle}
        </span>
        <span className='border px-1 py-1 border-gray-500 rounded text-gray-800 text-sm ml-2'>
          {type}
        </span>
      </h1>
      <p className='mt-1 text-xs text-gray-700'>{description}</p>
    </div>
  );
};
