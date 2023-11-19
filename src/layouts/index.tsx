import SearchBar from 'components/Search';
import useViewportWidth from 'hooks/useViewportWidth';
import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  const viewportWidth = useViewportWidth();
  const layoutWidth = viewportWidth > 1100 ? 1024 : (viewportWidth * 11) / 12;

  return (
    <div className="w-screen relative">
      <div className="bg-white py-2 sticky top-0 z-1 w-screen flex justify-center">
        <SearchBar />
      </div>
      <div style={{ width: layoutWidth }} className="mx-auto">
        {children}
      </div>
    </div>
  );
}
