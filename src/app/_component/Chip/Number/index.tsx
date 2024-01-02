interface NumProps {
  num: number | null;
}

export default function Number({ num }: NumProps) {
  return (
    <div className='inline-flex h-5	w-5 flex-col items-center justify-center rounded-[0.25rem] bg-gray20 px-1.5 py-[0.1875rem] text-xs text-gray50'>
      {num}
    </div>
  );
}
