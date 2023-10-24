import { formatCurrency } from '../../utils/helpers.js';
import DeleteItem from './DeleteItem.jsx';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li
      className={
        'flex flex-col justify-between  justify-items-center px-4 py-2 sm:flex-row sm:items-center'
      }
    >
      <p className={'font-medium'}>
        {quantity}&times; {name}
      </p>
      <div className={'flex items-center justify-between gap-3 '}>
        <p>{formatCurrency(totalPrice)}</p>
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
