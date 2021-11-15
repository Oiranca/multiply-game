import React, { FC, useEffect, useState } from 'react';
import './PiecesNumbers.css';

interface PropsPiecesNumber{
  numberForMultiply:number[];
  numberToMultiply:number;
}
export const PiecesNumbers: FC <PropsPiecesNumber>= ({numberForMultiply,numberToMultiply}) => {
  const [checkOperation, setCheckOperation] = useState<boolean>(false);
  const [colorCheck, setColorCheck] = useState<string>('#e11a08');
  useEffect(() => {
    !checkOperation ? setColorCheck('#e11a08') : setColorCheck('#33e014');
  }, [checkOperation]);
  return (
    <article className={'multiply-table'}>
      {numberForMultiply.map(value => (
        <article className={'pieces-number'} key={value} id={`piece-${value}`}>
          <section className={'multiply-number'}>{`${numberToMultiply}x${value}`}</section>
          <section className={'check-operation'} style={{ background: colorCheck }} />
        </article>
      ))}
    </article>
  );
};
