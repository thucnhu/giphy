import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'routes/types';

const { Search } = Input;

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const onSearch: SearchProps['onSearch'] = (value, event, info) => {
    if (info?.source === 'input') {
      navigate([RoutePaths.Home.search.gifs, searchInput].join('/'));
    }
  };

  const onChangeInput: SearchProps['onChange'] = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <Search
      placeholder="Search GIFs by keyword"
      value={searchInput}
      onSearch={onSearch}
      onChange={onChangeInput}
      allowClear
      size="large"
      enterButton
    />
  );
}
