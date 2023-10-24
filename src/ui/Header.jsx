import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder.jsx';
import UserName from '../features/user/UserName.jsx';

function Header() {
  return (
    <header className="font-pizza flex items-center justify-between border-b-2 border-stone-300 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to={'/'} className={'tracking-widest'}>
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
