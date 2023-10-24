import Button from '../../ui/Button.jsx';
import { removeItem } from './cartSlice.js';
import { useDispatch } from 'react-redux';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type={'small'} onClick={() => dispatch(removeItem(pizzaId))}>
      Remove
    </Button>
  );
}

export default DeleteItem;
