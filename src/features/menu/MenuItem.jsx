import {formatCurrency} from '../../utils/helpers.js';
import Button from '../../ui/Button.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {addItem, getCart} from '../cart/cartSlice.js';
import DeleteItem from '../cart/DeleteItem.jsx';

// eslint-disable-next-line react/prop-types
function MenuItem({ pizza }) {
  // eslint-disable-next-line react/prop-types
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  // console.log(pizza);
  const dispatch = useDispatch();

  const cart = useSelector(getCart);

  // console.log(cart);

  const item = cart.find((item) => item.pizzaId === id);
  console.log(item);

  function handleAddToCart() {
    console.log('Added item to the cart');
    console.log(id);

    const newItem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));

    // dispatch(addItem(pizza));
  }

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

          {item?.pizzaId === id && <DeleteItem pizzaId={id} />}

          {!soldOut && (
            <Button to={''} type={'small'} onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
