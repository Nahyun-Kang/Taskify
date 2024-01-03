import { useEffect } from 'react';

interface useObserverProps {
  target: React.RefObject<HTMLElement>;
  callback: IntersectionObserverCallback;
  id: string;
}

export default function useObserver({ target, callback, id }: useObserverProps) {
  useEffect(() => {
    let observer: IntersectionObserver;

    if (target.current) {
      observer = new IntersectionObserver(callback, { threshold: 0 });
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, id]);
}
