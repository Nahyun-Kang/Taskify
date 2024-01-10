import { useRef } from 'react';
import { ReactNode } from 'react';

export default function ModalOutside({
  children,
  closeModal,
}: {
  children: ReactNode;
  closeModal: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const modalOutSideClick = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current === e.target) {
      closeModal(e);
    }
  };

  return (
    <div onClick={modalOutSideClick}>
      <div
        ref={modalRef}
        className='fixed left-0 top-0 z-[1000] flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-70'
      >
        {children}
      </div>
    </div>
  );
}
