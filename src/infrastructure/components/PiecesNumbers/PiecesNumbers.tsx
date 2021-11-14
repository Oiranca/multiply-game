import React, { FC, useEffect, useState } from 'react';
import './PiecesNumbers.css';

export const PiecesNumbers: FC = () => {
  const [checkOperation, setCheckOperation] = useState<boolean>(false);
  const [colorCheck, setColorCheck] = useState<string>('#e11a08');
  const numberForMultiply = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const number = 1;
  useEffect(() => {
    !checkOperation ? setColorCheck('#e11a08') : setColorCheck('#33e014');
  }, [checkOperation]);
  return (
    <article className={'multiply-table'}>
      {numberForMultiply.map(value => (
        <article className={'pieces-number'} id={`piece-${value}`}>
          <section className={'multiply-number'}>{`${number}x${value}`}</section>
          <section className={'check-operation'} style={{ background: colorCheck }} />
        </article>
      ))}
    </article>
  );
};
