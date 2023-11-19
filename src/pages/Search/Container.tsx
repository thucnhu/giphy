import { MediaType } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import { gf } from 'lib/giphy';
import { useParams } from 'react-router-dom';

export default function SearchResultsContainer() {
  const { type, keyword } = useParams<{ type: string; keyword: string }>();

  const fetchGifs = (offset: number) =>
    gf.search(keyword ?? '', {
      sort: 'relevant',
      type: type as MediaType,
      limit: 10,
      offset,
    });

  return <Grid width={800} columns={3} fetchGifs={fetchGifs} />;
}
