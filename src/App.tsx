import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.ALPHABET: return a.localeCompare(b);
      case SortType.LENGTH: return a.length - b.length;
      default: return 0;
    }
  });

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.ALPHABET);

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={
              `button 
              is-info 
              ${sortType !== SortType.ALPHABET ? 'is-light' : ''}`
            }
            onClick={() => setSortType(SortType.ALPHABET)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={
              `button 
              is-success 
              ${sortType !== SortType.LENGTH ? 'is-light' : ''}`
            }
            onClick={() => setSortType(SortType.LENGTH)}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={
              `button 
              is-warning 
              ${!isReversed ? 'is-light' : ''}`
            }
            onClick={() => setIsReversed(prev => !prev)}
          >
            Reverse
          </button>

          {(sortType !== SortType.NONE || isReversed) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortType(SortType.NONE);
                setIsReversed(false);
              }}
            >
              Reset
            </button>
          )}

        </div>
        <ul>
          <ul>
            {visibleGoods.map((good) => (
              <li data-cy="Good" key={good}>
                {good}
              </li>
            ))}
          </ul>
        </ul>
      </div>
    </>
  );
};
