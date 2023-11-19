import { MediaType } from '@giphy/js-fetch-api';
import { gf } from 'api/giphy';
import { Link, useParams } from 'react-router-dom';
import { Image } from 'antd';
import UserAvatar, { AvatarSkeleton } from './Avatar';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'api/constants';
import { IMG_FALLBACK_SRC } from './constants';
import SkeletonImage from 'antd/es/skeleton/Image';
import { upperCase } from 'lodash-es';
import { CodeOutlined, HeartFilled, SendOutlined } from '@ant-design/icons';
import './styles.css';

export default function MediaInfo() {
  const { id } = useParams<{ type: MediaType; id: string }>();

  const { data: gifInfo, isLoading } = useQuery({
    queryKey: QUERY_KEYS.gifs.detail(id),
    queryFn: () => gf.gif(id!),
    enabled: !!id,
  });

  function renderImage() {
    if (gifInfo) {
      const {
        data: {
          images: {
            downsized_medium: { url },
          },
        },
      } = gifInfo;

      return <Image className="w-auto" src={url} fallback={IMG_FALLBACK_SRC} />;
    }

    if (isLoading) {
      return <SkeletonImage />;
    }

    return null;
  }

  function renderAvatar() {
    if (isLoading) {
      return <AvatarSkeleton />;
    }

    if (gifInfo) {
      const {
        data: { rating },
      } = gifInfo;
      return (
        <div className="flex flex-col gap-6">
          <UserAvatar user={gifInfo.data.user} />
          <Link to="https://support.giphy.com/hc/en-us/articles/360058840971-Content-Rating">
            Rating: {upperCase(rating)}
          </Link>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="flex items-start gap-20 grid-cols-2 w-full pt-10">
      {renderAvatar()}

      <div className="flex items-center gap-20">
        {renderImage()}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 cursor-pointer">
            <HeartFilled style={{ fontSize: '20px' }} className="heart-icon" />
            Favorite
          </div>
          <div className="flex gap-4 cursor-pointer">
            <SendOutlined style={{ fontSize: '20px' }} className="send-icon" />
            Share
          </div>
          <div className="flex gap-4 cursor-pointer">
            <CodeOutlined style={{ fontSize: '20px' }} className="code-icon" />
            Embed
          </div>
        </div>
      </div>
    </div>
  );
}
