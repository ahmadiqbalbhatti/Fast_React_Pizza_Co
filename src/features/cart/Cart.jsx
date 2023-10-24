import LinkButton from '../../ui/LinkButton.jsx';
import Button from '../../ui/Button.jsx';
import CartItem from './CartItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getUsername } from '../user/userSlice.js';
import { clearCart, getCart } from './cartSlice.js';
import EmptyCart from './EmptyCart.jsx';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUsername);

  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className={'px-4 py-3'}>
      <LinkButton to={'/menu'}>&larr; Back to menu</LinkButton>

      <h2 className={'mt-7 text-xl font-semibold'}>Your cart, {username}</h2>

      <ul className={'divide-y divide-stone-200'}>
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div>
        {/*<Link to="/order/new">Order pizzas</Link>*/}
        <div className={'flex items-center justify-between'}>
          <Button to="/order/new" type={'primary'}>
            Order pizzas
          </Button>

          <Button type={'secondary'} onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
          {/*<button>Clear cart</button>*/}
        </div>
      </div>
    </div>
  );
}

export default Cart;
