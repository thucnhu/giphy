import { useState } from 'react';

export default function Search() {
  const [searchInput, setSearchInput] = useState('');

  function onSubmit() {
    console.log('submit');
  }

  return (
    <input
      value={searchInput}
      className="sticky"
      onChange={(e) => setSearchInput(e.target.value)}
      onSubmit={onSubmit}
    />
  );
}
