import { IUser } from '@giphy/js-types';
import SkeletonAvatar from 'antd/es/skeleton/Avatar';
import SkeletonInput from 'antd/es/skeleton/Input';
import { Link } from 'react-router-dom';

interface UserAvatarProps {
  user: IUser;
}
export default function UserAvatar({ user }: UserAvatarProps) {
  const { avatar_url, display_name, username, profile_url } = user;

  return (
    <div className="flex gap-2 items-center">
      <img src={avatar_url} className="w-[50px] h-[50px]" />
      <div>
        <Link to={profile_url || ''}>
          <strong>{display_name}</strong>
        </Link>
        <div>{`@${username}`}</div>
      </div>
    </div>
  );
}

export function AvatarSkeleton() {
  return (
    <div className="flex gap-2 items-center">
      <SkeletonAvatar size="large" />
      <SkeletonInput size="small" />
    </div>
  );
}
