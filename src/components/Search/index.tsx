import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
import classNames from 'classnames';
import { lowerCase } from 'lodash-es';
import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { RoutePaths } from 'routes/types';
import { CommonProps } from 'types';

const { Search } = Input;

export default function SearchBar(props: CommonProps) {
  const { className } = props;
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const onSearch: SearchProps['onSearch'] = (value, event, info) => {
    if (info?.source === 'input') {
      navigate(
        generatePath(RoutePaths.Home.search.gifs, { keyword: searchInput }),
      );
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
      className={classNames('max-w-11/12 w-[1024px]', className)}
    />
  );
}
