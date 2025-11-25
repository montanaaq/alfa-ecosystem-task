import { type FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";

const CategorySelector: FC = () => {
  return (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Category' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='business'>Business</SelectItem>
        <SelectItem value='entertainment'>Entertainment</SelectItem>
        <SelectItem value='general'>General</SelectItem>
        <SelectItem value='health'>Health</SelectItem>
        <SelectItem value='science'>Science</SelectItem>
        <SelectItem value='sports'>Sports</SelectItem>
        <SelectItem value='technology'>Technology</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CategorySelector;
