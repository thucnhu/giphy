import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import classNames from 'classnames';
import { CommonProps } from 'types';

export default function LoadingOverlay({ className, style }: CommonProps) {
  return (
    <div
      className={classNames(
        'flex items-center justify-center w-full h-full min-h-2xl',
        className,
      )}
      style={style}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
  );
}
