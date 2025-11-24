import { memo, type FC } from "react";

interface HeaderProps {
  pageName: string;
}

const Header: FC<HeaderProps> = memo(({ pageName }) => {
  return (
    <header className='mb-6 flex items-center justify-center'>
      <h2 className='mt-4 text-3xl font-bold'>{pageName}</h2>
    </header>
  );
});

export default Header;
