export const TableHeader = ({ title, subTitle, type, description }: any) => {
  return (
    <div className='sm:flex-auto'>
      <h1 className='text-base font-semibold leading-6 text-gray-900 flex items-center'>
        {title}
        <span className='text-base text-xs text-gray-900 ml-3'>
          <span className='text-gray-200 mr-1'>|</span> {subTitle}
        </span>
        <span className='font-light border px-1 border-gray-500 rounded text-gray-800 text-xs ml-1'>
          {type}
        </span>
      </h1>
      <p className='mt-1 text-xs text-gray-700'>{description}</p>
    </div>
  );
};
