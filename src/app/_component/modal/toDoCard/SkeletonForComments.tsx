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
  const skeleton = 'animate-skeleton';
  return (
    <div className='flex gap-[0.625rem]'>
      <div className='flex flex-col items-start'>
        <div className={`h-[34px] w-[34px] ${skeleton} rounded-full bg-gray-300`}></div>
      </div>
      <div className='flex flex-col gap-[0.375rem]'>
        <div className='flex gap-[0.5rem]'>
          <div className={`h-[1.75rem] w-[100px] ${skeleton} rounded bg-gray-300`}></div>
          <div className={`h-[1.5rem] w-[70px] ${skeleton} rounded bg-gray-300`}></div>
        </div>
        <div className='my-2 flex w-[39.0625rem] flex-col items-center gap-[0.375rem]'>
          <div className={`h-[2rem] w-full ${skeleton} rounded bg-gray-300`}></div>
          <div className='flex w-full justify-end'>
            <div className={`mr-1 h-[2rem] w-[30px] ${skeleton} rounded bg-gray-300`}></div>
            <div className={`h-[2rem] w-[30px] ${skeleton} rounded bg-gray-300`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
