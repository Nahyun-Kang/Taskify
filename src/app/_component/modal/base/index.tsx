interface Props {
  mainTitle?: string;
  onClose?: () => void;
}

export function Base({ mainTitle, onClose }: Props) {
  return (
    <div className='fixed left-0 top-0 z-[1000] flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-70'>
      <div className='relative flex h-[13.75rem] flex-col justify-between gap-[1.5rem] rounded-[0.5rem] border border-white bg-white sm:w-[20.4375rem] sm:px-[1.25rem] sm:pb-[1.25rem] sm:pt-[1.75rem] md:h-[15.625rem] md:w-[33.75rem] md:px-[1.75rem] md:pt-[2rem]'>
        <div className=' flex flex-1 flex-col justify-center gap-[2rem]'>
          <span className=' flex items-center justify-center text-center text-[1rem] text-black md:text-[1.125rem]'>
            {mainTitle}
          </span>
        </div>
        <div className='flex justify-center md:justify-end'>
          <button
            className='h-8 w-[8.625rem] rounded-lg bg-violet text-[0.875rem] text-white md:h-12 md:w-[120px] md:text-[1rem]'
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
