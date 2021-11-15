import { FC, useEffect, useState } from 'react';
import './PiecesResults.css';

interface PropsResult {
  result: number[];
}

export const PiecesResults: FC<PropsResult> = ({ result }) => {
  const [checkResult, setCheckResult] = useState<boolean>(false);
  const [colorCheck, setColorCheck] = useState<string>('#e11a08');
  useEffect(() => {
    !checkResult ? setColorCheck('#e11a08') : setColorCheck('#33e014');
  }, [checkResult]);
  return (
    <article className={'results-container'}>
      {result.map(values => (
        <article className={'pieces-result'} key={values} id={`pieces-${values}`}>
          <section className={'result'}>= 1</section>
          <section className={'result-check'} style={{ background: colorCheck }} />
        </article>
      ))}
    </article>
  );
};

