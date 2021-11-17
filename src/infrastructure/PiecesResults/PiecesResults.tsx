import { FC, useEffect, useState } from 'react';
import { randomPosition } from '../utils/randomPosition/randomPositionMethod';

import './PiecesResults.css';

interface PropsResult {
  numberToMultiply: number;
}

export const PiecesResults: FC<PropsResult> = ({ numberToMultiply }) => {
  const [checkResult, setCheckResult] = useState<boolean>(false);
  const [colorCheck, setColorCheck] = useState<string>('#e11a08');
  const [position, setPosition] = useState<number[]>([]);
  const [results, setResults] = useState<number[]>([]);
  useEffect(() => {
    !checkResult ? setColorCheck('#e11a08') : setColorCheck('#33e014');
  }, [checkResult]);

  const calculateResults = (numberToMultiply: number) => {
    let count = position.length;
    let values: number[] = [];

    while (count !== 0) {
      values.push(numberToMultiply * count);
      count--;
    }
    return values;
  };

  useEffect(() => {
    setPosition(randomPosition(1, 11));
  }, []);

  useEffect(() => {
    setResults(calculateResults(numberToMultiply));
  }, [position,numberToMultiply]);

  return (
    <article className={'results-container'}>
      {position.map((values, index) => (
        <article className={'pieces-result'} key={values} id={`pieces-${values}`}>
          <section className={'result'}>= {results[values - 1]}</section>
          <section className={'result-check'} style={{ background: colorCheck }} />
        </article>
      ))}
    </article>
  );
};
