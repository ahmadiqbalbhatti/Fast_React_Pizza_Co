import { formatCurrency } from '../../utils/helpers.js';
import DeleteItem from './DeleteItem.jsx';
import UpdateItemQuantity from './UpdateItemQuantity.jsx';
import { useSelector } from 'react-redux';
import { getCurrentQuantityById } from './cartSlice.js';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

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

        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
