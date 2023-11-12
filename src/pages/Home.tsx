import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import Search from '../components/Search';

export default function HomePage() {
  // use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
  const gf = new GiphyFetch('A20hw0IZgoyhCPnQcDlnj3UactxZqKGY');

  // configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
  const fetchGifs = (offset: number) => gf.trending({ offset, limit: 10 });

  return (
    <>
      <Search />
      <Grid width={800} columns={3} fetchGifs={fetchGifs} />
    </>
  );
}
