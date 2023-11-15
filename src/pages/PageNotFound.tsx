import { Button } from 'antd';
import { RoutePaths } from 'routes/types';
import classNames from 'classnames';
import { FrownTwoTone, HomeOutlined } from '@ant-design/icons';
import { CommonProps } from 'types';

interface PageNotFoundProps extends CommonProps {
  title?: string;
  redirectLink?: string;
}

export default function PageNotFound(props: PageNotFoundProps) {
  const {
    style,
    title,
    redirectLink = RoutePaths.Home.index,
    className,
  } = props;

  return (
    <div
      className={classNames(
        'public-layout flex items-center justify-center w-full h-full flex-col space-y-8 flex-1',
        className,
      )}
      style={style}
    >
      <div className="text-8xl font-bold text-blue-600">404</div>
      <h2 className="flex items-center text-3xl font-extrabold md:text-5xl">
        {title}
        <FrownTwoTone className="ml-3" />
      </h2>
      <Button
        className="flex items-center"
        href={redirectLink}
        icon={<HomeOutlined />}
        type="primary"
      >
        Go home
      </Button>
    </div>
  );
}
