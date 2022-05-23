import React, { FC, useEffect, useState } from 'react';
import './PiecesNumbers.css';

interface PropsPiecesNumber {
  numberToMultiply: number;
  value: number;
  checkOperation?: boolean;
  onClickTable?: (event: React.MouseEvent) => void;
}

export const PiecesNumbers: FC<PropsPiecesNumber> = ({
  numberToMultiply,
  value,
  checkOperation,
  onClickTable
}) => {
  const [values] = useState<number>(value);
  const [colorCheck, setColorCheck] = useState<string>('#e11a08');

  useEffect(() => {
    !checkOperation ? setColorCheck('#e11a08') : setColorCheck('#33e014');
  }, [checkOperation]);

  return (
    <article
      className={'pieces-number'}
      id={`number-index-${values}`}
      onClick={onClickTable}
    >
      <section className={'check-operation'} style={{ background: colorCheck }} />
      <section className={'multiply-number'}>{`${numberToMultiply}x${values}`}</section>
    </article>
  );
};
