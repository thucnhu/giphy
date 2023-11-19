import { MediaType } from '@giphy/js-fetch-api';
import { gf } from 'api/giphy';
import { Link, useParams } from 'react-router-dom';
import { Image } from 'antd';
import UserAvatar, { AvatarSkeleton } from './Avatar';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'api/constants';
import { IMG_FALLBACK_SRC } from './constants';
import { upperCase } from 'lodash-es';
import { CodeOutlined, HeartFilled, SendOutlined } from '@ant-design/icons';
import './styles.css';
import SkeletonImage from 'antd/es/skeleton/Image';

export default function MediaInfo() {
  const { id } = useParams<{ type: MediaType; id: string }>();

  const { data: gifInfo } = useQuery({
    queryKey: QUERY_KEYS.gifs.detail(id),
    queryFn: () => gf.gif(id!),
    enabled: !!id,
  });

  function renderImage() {
    if (gifInfo) {
      const {
        data: {
          title,
          images: {
            downsized_medium: { url },
          },
        },
      } = gifInfo;

      return (
        <div>
          <div className="mb-2 text-sm font-semibold">{title}</div>
          <Image className="w-auto" src={url} fallback={IMG_FALLBACK_SRC} />
        </div>
      );
    }

    return <SkeletonImage style={{ width: '480px', height: '480px' }} />;
  }

  function renderAvatar() {
    if (gifInfo) {
      const {
        data: { rating },
      } = gifInfo;

      return (
        <div className="flex flex-col gap-8">
          <UserAvatar user={gifInfo.data.user} />
          <Link to="https://support.giphy.com/hc/en-us/articles/360058840971-Content-Rating">
            Rating: {upperCase(rating)}
          </Link>
        </div>
      );
    }

    return <AvatarSkeleton />;
  }

  const onMouseEnterAction = (type: 'favorite' | 'share' | 'embed') => {
    switch (type) {
      case 'favorite':
        document.getElementById('favorite-icon')?.classList.add('heart-icon');
        break;

      case 'share':
        document.getElementById('share-icon')?.classList.add('send-icon');
        break;

      case 'embed':
        document.getElementById('embed-icon')?.classList.add('code-icon');
        break;

      default:
        break;
    }
  };

  const onMouseLeaveAction = (type: 'favorite' | 'share' | 'embed') => {
    switch (type) {
      case 'favorite':
        document
          .getElementById('favorite-icon')
          ?.classList.remove('heart-icon');
        break;

      case 'share':
        document.getElementById('share-icon')?.classList.remove('send-icon');
        break;

      case 'embed':
        document.getElementById('embed-icon')?.classList.remove('code-icon');
        break;

      default:
        break;
    }
  };

  return (
    <div className="flex items-start gap-20 grid-cols-2 w-full pt-10">
      {renderAvatar()}

      <div className="flex items-center gap-20">
        {renderImage()}
        <div className="flex flex-col gap-4">
          <div
            className="flex gap-4 cursor-pointer"
            onMouseEnter={() => onMouseEnterAction('favorite')}
            onMouseLeave={() => onMouseLeaveAction('favorite')}
          >
            <HeartFilled style={{ fontSize: '20px' }} id="favorite-icon" />
            Favorite
          </div>
          <div
            className="flex gap-4 cursor-pointer share"
            onMouseEnter={() => onMouseEnterAction('share')}
            onMouseLeave={() => onMouseLeaveAction('share')}
          >
            <SendOutlined style={{ fontSize: '20px' }} id="share-icon" />
            Share
          </div>
          <div
            className="flex gap-4 cursor-pointer embed"
            onMouseEnter={() => onMouseEnterAction('embed')}
            onMouseLeave={() => onMouseLeaveAction('embed')}
          >
            <CodeOutlined style={{ fontSize: '20px' }} id="embed-icon" />
            Embed
          </div>
        </div>
      </div>
    </div>
  );
}
