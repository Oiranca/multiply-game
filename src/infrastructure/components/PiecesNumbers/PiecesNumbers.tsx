import React, { FC, useEffect, useState } from 'react';
import './PiecesNumbers.css';
import { randomPosition } from '../../utils/randomPosition/randomPositionMethod';

interface PropsPiecesNumber {
  numberForMultiply: number[];
  numberToMultiply: number;
}

export const PiecesNumbers: FC<PropsPiecesNumber> = ({
  numberForMultiply,
  numberToMultiply
}) => {
  const [checkOperation, setCheckOperation] = useState<boolean>(false);
  const [colorCheck, setColorCheck] = useState<string>('#e11a08');
  const [position, setPosition] = useState<number[]>([]);

  useEffect(() => {
    !checkOperation ? setColorCheck('#e11a08') : setColorCheck('#33e014');
  }, [checkOperation]);

  useEffect(() => {
    setPosition(randomPosition(1, 11));
  }, []);

  return (
    <article className={'table-multiply'}>
      {position.map(value => (
        <article className={'pieces-number'} key={value} id={`piece-${value}`}>
          <section className={'check-operation'} style={{ background: colorCheck }} />

          <section
            className={'multiply-number'}
          >{`${numberToMultiply}x${value}`}</section>
        </article>
      ))}
    </article>
  );
};
