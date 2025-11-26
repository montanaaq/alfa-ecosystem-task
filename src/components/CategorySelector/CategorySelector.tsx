import { memo, type FC } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { useNewsStore } from "@/shared/stores/news.store";

const CategorySelector: FC = memo(() => {
  const category = useNewsStore((s) => s.category);
  const setCategory = useNewsStore((s) => s.setCategory);

  return (
    <Select onValueChange={(e) => setCategory(e)} value={category || "general"}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Category' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='general'>General</SelectItem>
        <SelectItem value='business'>Business</SelectItem>
        <SelectItem value='entertainment'>Entertainment</SelectItem>
        <SelectItem value='health'>Health</SelectItem>
        <SelectItem value='science'>Science</SelectItem>
        <SelectItem value='sports'>Sports</SelectItem>
        <SelectItem value='technology'>Technology</SelectItem>
      </SelectContent>
    </Select>
  );
});

export default CategorySelector;
