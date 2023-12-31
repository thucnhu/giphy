import { SwapOutlined } from '@ant-design/icons';
import { MediaType } from '@giphy/js-fetch-api';
import { Row, Select } from 'antd';
import ResponsiveGrid from 'components/ResponsiveGrid';
import { gf } from 'api/giphy';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

type SortType = 'relevant' | 'recent';

export default function SearchResultsContainer() {
  const { type, keyword } = useParams<{ type: MediaType; keyword: string }>();

  const [sortType, setSortType] = useState<SortType>('recent');

  const fetchGifs = (offset: number) =>
    gf.search(keyword ?? '', {
      sort: sortType,
      type: type as MediaType,
      limit: 10,
      offset,
    });

  const handleChange = (value: SortType) => {
    setSortType(value);
  };

  return (
    <>
      <Row justify="space-between" align="middle">
        <h1>{keyword}</h1>
        <Select
          defaultValue={sortType}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'relevant', label: 'Relevant' },
            { value: 'recent', label: 'Recent' },
          ]}
          suffixIcon={<SwapOutlined />}
        />
      </Row>
      <ResponsiveGrid
        width={800}
        columns={4}
        fetchGifs={fetchGifs}
        key={keyword}
      />
    </>
  );
}
