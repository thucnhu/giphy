import { GifsResult } from '@giphy/js-fetch-api';
import { IGif, IUser } from '@giphy/js-types';
import { GifOverlayProps, Grid } from '@giphy/react-components';
import useViewportWidth from 'hooks/useViewportWidth';
import { ElementType, SyntheticEvent } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { RoutePaths } from 'routes/types';

interface GiphyGridProps {
  className?: string;
  width: number;
  user?: Partial<IUser>;
  columns: number;
  gutter?: number;
  layoutType?: 'GRID' | 'MIXED';
  fetchGifs: (offset: number) => Promise<GifsResult>;
  onGifsFetched?: (gifs: IGif[]) => void;
  onGifsFetchError?: (e: Error) => void;
  overlay?: ElementType<GifOverlayProps>;
  hideAttribution?: boolean;
  noLink?: boolean;
  noResultsMessage?: string | JSX.Element;
  initialGifs?: IGif[];
  useTransform?: boolean;
  columnOffsets?: number[];
  backgroundColor?: string;
  borderRadius?: number;
  tabIndex?: number;
  loaderConfig?: IntersectionObserverInit;
  loader?: ElementType;
  onGifVisible?: (gif: IGif, e?: SyntheticEvent<HTMLElement, Event>) => void;
  onGifSeen?: (gif: IGif, boundingClientRect: ClientRect | DOMRect) => void;
  onGifClick?: (gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => void;
  onGifRightClick?: (gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => void;
  onGifKeyPress?: (gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => void;
}

export default function ResponsiveGrid(props: GiphyGridProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { width, gutter = 10, columns, noLink = true, ...restProps } = props;

  const navigate = useNavigate();

  const viewportWidth = useViewportWidth();
  const gridWidth = viewportWidth > 1100 ? 1024 : (viewportWidth * 11) / 12;
  let cols: number = 0;

  if (viewportWidth < 640) {
    cols = 2;
  } else if (viewportWidth > 1024) {
    cols = 4;
  } else {
    cols = 3;
  }

  const onGifClick: (
    gif: IGif,
    event: SyntheticEvent<HTMLElement, Event>,
  ) => void = ({ id, type }) => {
    navigate(generatePath(RoutePaths.Home.mediaInfo, { type, id }));
  };

  return (
    <Grid
      className="mx-auto"
      width={gridWidth}
      gutter={gutter}
      columns={cols}
      noLink={noLink}
      onGifClick={onGifClick}
      {...restProps}
    />
  );
}
