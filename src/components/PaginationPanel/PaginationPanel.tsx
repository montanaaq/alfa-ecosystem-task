import { memo } from "react";
import type { FC } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationPanelProps {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
}

const PaginationPanel: FC<PaginationPanelProps> = (props) => {
  const { nav = null, disable, onNextPageClick, onPrevPageClick } = props;

  return (
    <div className='flex items-center justify-center gap-4 mt-8'>
      <Button
        onClick={onPrevPageClick}
        disabled={disable.left}
        variant='outline'
      >
        <ChevronLeft />
      </Button>

      {nav && (
        <span className='text-sm text-gray-600'>
          Страница {nav.current} из {nav.total}
        </span>
      )}

      <Button
        onClick={onNextPageClick}
        disabled={disable.right}
        variant='outline'
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default memo(PaginationPanel);
