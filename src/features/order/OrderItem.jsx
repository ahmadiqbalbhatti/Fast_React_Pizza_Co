import { formatCurrency } from '../../utils/helpers.js';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  // if (isLoadingIngredients) return <Loader />;
  return (
    <li className={'space-y-1 py-3'}>
      <div
        className={'flex items-center justify-between gap-4 text-sm font-bold'}
      >
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      <p className={'text-sm capitalize italic text-stone-500'}>
        {isLoadingIngredients ? 'Loading...' : ingredients?.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
