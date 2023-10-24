import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (!query) {
      return;
    }

    navigate(`/order/${query}`);
    setQuery('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className={
          'w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-600 focus:outline-none focus:ring  focus:ring-yellow-500 focus:ring-opacity-50 focus:ring-offset-yellow-500 sm:w-64 sm:focus:w-72'
        }
      />
    </form>
  );
}

export default SearchOrder;
