import {formatCurrency} from '../../utils/helpers.js';
import Button from '../../ui/Button.jsx';

// eslint-disable-next-line react/prop-types
function MenuItem({ pizza }) {
  // eslint-disable-next-line react/prop-types
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className={'flex gap-4 py-2'}>
      <img
        src={imageUrl}
        alt={name}
        className={`${soldOut ? 'opacity-70 grayscale' : ''} h-24`}
      />
      <div className={'flex flex-1 flex-col'}>
        <p className={'font-medium'}>{name}</p>
        {/* eslint-disable-next-line react/prop-types */}
        <p className={'text-sm capitalize italic text-stone-500'}>
          {ingredients.join(', ')}
        </p>
        <div className={'mt-auto flex items-center justify-between'}>
          {!soldOut ? (
            <p className={'text-sm'}>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className={'text-sm font-medium uppercase text-stone-500'}>
              Sold out
            </p>
          )}
          <Button to={''} type={'small'}>
            Add to Cart
          </Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
