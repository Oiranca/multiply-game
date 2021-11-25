import React, { FC, useEffect, useState } from 'react';
import { randomPosition } from '../../utils/randomPosition/randomPositionMethod';
import { PiecesNumbers } from '../PiecesNumbers/PiecesNumbers';

import './Multiply.css';

interface PropsMultiply {
  numberToMultiply: number;
}

export const Multiply: FC<PropsMultiply> = ({ numberToMultiply }) => {
  const [checkOperation, setCheckOperation] = useState<boolean>(true);
  const [colorCheck, setColorCheck] = useState<string>('#e11a08');
  const [position, setPosition] = useState<number[]>([]);
  const [randomTablePosition, setRandomTablePosition] = useState<boolean>(true);

  useEffect(() => {
    !checkOperation ? setColorCheck('#e11a08') : setColorCheck('#33e014');
  }, [checkOperation]);

  useEffect(() => {
    randomTablePosition
      ? setPosition(randomPosition(1, 11))
      : setPosition(
          randomPosition(1, 11).sort((firstPosition: number, otherPosition: number) => {
            return firstPosition - otherPosition;
          })
        );
  }, [randomTablePosition]);
  /*TODO:realizar drag a drop*/
  const handledSelection = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <article className={'multiply'}>
      {position.map(value => (
        <PiecesNumbers
          key={value}
          numberToMultiply={numberToMultiply}
          value={value}
          onClickSelection={handledSelection}
        />
      ))}
    </article>
  );
};
