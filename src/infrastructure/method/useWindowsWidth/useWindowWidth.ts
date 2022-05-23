import { useEffect, useState }  from 'react';


export const useWindowWidth = () => {
  const [windowsWidth, setWindowsWith] = useState(window.innerWidth);

  useEffect(() => {
    const listener = () => {
      setWindowsWith(window.innerWidth);

    };

    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, []);

  return windowsWidth;
};
