import { memo, type FC } from "react";

import { camelCaseFormat } from "@/lib/utils";

import { useNewsStore } from "@/shared/stores/news.store";
import { CATEGORIES } from "@/shared/constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";

interface CategorySelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  useStore?: boolean;
}

const CategorySelector: FC<CategorySelectorProps> = memo(
  ({
    value: externalValue,
    onValueChange: externalOnChange,
    useStore = true
  }) => {
    const storeCategory = useNewsStore((s) => s.category);
    const setStoreCategory = useNewsStore((s) => s.setCategory);

    const category = useStore ? storeCategory : externalValue;
    const setCategory = useStore ? setStoreCategory : externalOnChange;

    return (
      <Select
        onValueChange={(e) => setCategory?.(e)}
        value={category || "general"}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Category' />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>
              {camelCaseFormat(c)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

export default CategorySelector;
