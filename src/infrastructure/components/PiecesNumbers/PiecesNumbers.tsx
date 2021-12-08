import React, { FC, useEffect, useState } from 'react';
import './PiecesNumbers.css';

interface PropsPiecesNumber {
  numberToMultiply: number;
  value: number;
  onClickSelection: (e: React.MouseEvent) => void;
  isDraggable: boolean;
}

export const PiecesNumbers: FC<PropsPiecesNumber> = ({
  numberToMultiply,
  value,
  onClickSelection,
  isDraggable
}) => {
  const [values, setValues] = useState<number>(value);
  const [checkOperation, setCheckOperation] = useState<boolean>(false);
  const [colorCheck, setColorCheck] = useState<string>('#e11a08');

  useEffect(() => {
    !checkOperation ? setColorCheck('#e11a08') : setColorCheck('#33e014');
  }, [checkOperation]);

  return (
    <article
      className={'pieces-number'}
      id={`number-index-${values}`}
      onClick={onClickSelection}
      draggable={isDraggable}
    >
      <section className={'check-operation'} style={{ background: colorCheck }} />
      <section className={'multiply-number'}>{`${numberToMultiply}x${values}`}</section>
    </article>
  );
};
