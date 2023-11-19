import ResponsiveGrid from 'components/ResponsiveGrid';
import { gf } from 'api/giphy';

export default function HomePage() {
  // configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
  const fetchGifs = (offset: number) => gf.trending({ offset, limit: 10 });

  return <ResponsiveGrid width={1024} columns={4} fetchGifs={fetchGifs} />;
}
