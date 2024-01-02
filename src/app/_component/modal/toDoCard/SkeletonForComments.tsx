export function SkeletonUIAboutComments() {
  return (
    <>
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <SkeletonUIComponent key={index} />
        ))}
    </>
  );
}

export function SkeletonUIComponent() {
  return (
    <div className='flex gap-[0.625rem]'>
      <div className='flex flex-col items-start'>
        <div className='animate-skeleton h-[34px] w-[34px] rounded-full bg-gray-300'></div>
      </div>
      <div className='flex flex-col gap-[0.375rem]'>
        <div className='flex gap-[0.5rem]'>
          <div className='animate-skeleton h-[1.75rem] w-[100px] rounded bg-gray-300'></div>
          <div className='animate-skeleton h-[1.5rem] w-[70px] rounded bg-gray-300'></div>
        </div>
        <div className='my-2 flex w-[39.0625rem] flex-col items-center gap-[0.375rem]'>
          <div className='animate-skeleton h-[2rem] w-full rounded bg-gray-300'></div>
          <div className='flex w-full justify-end'>
            <div className='animate-skeleton mr-1 h-[2rem] w-[30px] rounded bg-gray-300'></div>
            <div className='animate-skeleton h-[2rem] w-[30px] rounded bg-gray-300'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
