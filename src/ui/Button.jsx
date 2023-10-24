import { Link } from 'react-router-dom';

function Button({ children, disabled = false, to = '', type = '' }) {
  const base =
    'mt-2 inline-block rounded-full bg-yellow-400 font-semibold uppercase  tracking-wide text-stone-800 transition-colors  duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';
  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' py-2 px-4 md:px-5 md:py-2.5 text-xs',
    secondary:
      'mt-2 inline-block rounded-full border-2 border-stone-300 bg-transparent px-4 py-3 font-semibold uppercase   tracking-wide text-stone-500 transition-colors  duration-300 hover:bg-stone-800 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6  md:py-4',
  };

  if (to)
    return (
      <Link to="/order/new" className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
