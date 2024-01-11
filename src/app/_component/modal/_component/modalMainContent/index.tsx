export default function ModalMainContent({ content }: { content: string }) {
  return (
    <span className=' mb-[3.125rem] mt-[3.125rem] flex items-center justify-center text-[1rem] font-medium text-black'>
      {content}
    </span>
  );
}
