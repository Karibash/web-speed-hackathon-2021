import React from 'react';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {any} items
 * @property {() => void} fetchMore
 */

/** @type {React.VFC<Props>} */
const InfiniteScroll = ({ children, fetchMore }) => {
  const ref = React.useRef();
  React.useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry || !entry.isIntersecting) return;
      setTimeout(() => {
        fetchMore();
      }, 0);
    });

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [fetchMore]);

  return (
    <>
      {children}
      <div className="w-full h-px" ref={ref} />
    </>
  );
};

export { InfiniteScroll };
