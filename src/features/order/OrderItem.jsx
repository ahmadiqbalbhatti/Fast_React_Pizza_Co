import { formatCurrency } from '../../utils/helpers.js';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className={'py-3'}>
      <div
        className={'flex items-center justify-between gap-4 text-sm font-bold'}
      >
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
