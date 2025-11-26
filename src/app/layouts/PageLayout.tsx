import Header from "@/components/Header/Header";
import { type FC, type ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className='w-full py-6'>
      <Header pageName='Top headlines' />
      <main className='mx-auto py-8 container sm:py-4'>{children}</main>
    </div>
  );
};

export default PageLayout;
