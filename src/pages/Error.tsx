import { FrownTwoTone, ReloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const onClickReload = () => {
  window.location.reload();
};

export default function ErrorPage() {
  return (
    <div className="public-layout h-screen w-screen flex flex-1 flex-col items-center justify-center space-y-8">
      <div className="text-8xl font-bold text-blue-600">Oops!</div>
      <h2 className="flex items-center text-3xl font-black md:text-5xl">
        Error happened
        <FrownTwoTone className="ml-3" />
      </h2>
      <Button
        className="flex items-center hover:border-none"
        icon={<ReloadOutlined />}
        onClick={onClickReload}
        type="link"
      >
        Reload
      </Button>
    </div>
  );
}
