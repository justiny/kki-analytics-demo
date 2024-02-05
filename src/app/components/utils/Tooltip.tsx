export const Tooltip = ({ children, title }: any) => (
  <div className='relative flex items-center group z-10'>
    <div className='cursor-pointer flex items-center'>{children}</div>

    <div className='absolute hidden hover:block left-1/2 transform -translate-x-1/2 bottom-full mb-3 text-center p-2 text-xs text-white bg-black min-w-56 rounded-md shadow-lg group-hover:block z-20'>
      {title}
      <div className='absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-black'></div>
    </div>
  </div>
);
