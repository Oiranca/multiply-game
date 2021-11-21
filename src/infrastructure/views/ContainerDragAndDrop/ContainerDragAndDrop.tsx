import { FC } from 'react';
import './ContainerDragAndDrop.css';
import { PiecesNumbers } from '../../components/PiecesNumbers/PiecesNumbers';
import { PiecesResults } from '../../components/PiecesResults/PiecesResults';
import { randomPosition } from '../../utils/randomPosition/randomPositionMethod';

export const ContainerDragAndDrop: FC = () => {
  const positions = randomPosition(1, 11).sort();
  return (
    <article className={'container-drag-and-drop'}>
      <section className={'container-pieces'}>
        <PiecesNumbers
          numberForMultiply={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          numberToMultiply={1}
        />
        <PiecesResults numberToMultiply={1} />
      </section>
      <section className={'container-items-multiply'}>
        <section className={'container-pieces-multiply'}>
          <h2>Piezas Multiplicación</h2>
          <ul>
            {positions.map(items => {
              return <li>{items}</li>;
            })}
          </ul>
        </section>
        <section className={'container-pieces-results'}>
          <h2>Piezas Resultados</h2>
        </section>
      </section>
    </article>
  );
};
