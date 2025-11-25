import { useState } from "react";
import { useEffect, type ChangeEvent, type FC } from "react";

import useDebounce from "@/services/hooks/useDebounce";

import { Input } from "../ui/input";

const SearchField: FC = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);
  useEffect(() => {
    console.log(debouncedValue);
  }, [debouncedValue]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Input
      placeholder='Search news'
      onChange={handleInput}
      value={value}
      className='mx-10'
    ></Input>
  );
};

export default SearchField;
