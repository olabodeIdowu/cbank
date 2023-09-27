import { useEffect, useRef } from 'react';
import { getCurrentYear } from '../utils/getCurrentYear';

export default function Footer() {
  const year = useRef(null);

  useEffect(() => {
    getCurrentYear(year.current);
  }, []);

  return (
    <section id='footer'>
      <h5>
        Cloudbank Internal Dashboard &copy; <span ref={year}>2021</span>
      </h5>
      <h6>
        Powered by <span className='poweredBy'>MMG</span>
      </h6>
    </section>
  );
}
