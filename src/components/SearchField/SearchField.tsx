import { type ChangeEvent, type FC, memo, useState } from 'react';

import useDebounce from '@/shared/hooks/useDebounce';
import { useFiltersStore } from '@/shared/stores/filters.store';
import { Input } from '../ui/input';

const SearchField: FC = memo(() => {
    const [value, setValue] = useState('');
    const setSearchQuery = useFiltersStore(s => s.setSearchQuery);
    const debouncedSetSearchQuery = useDebounce(setSearchQuery);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        debouncedSetSearchQuery(e.target.value);
    };

    return ( 
        <Input
            placeholder="Search in loaded news"
            onChange={handleInput}
            value={value}
            className="mx-10"
        />
    );
});

export default SearchField;
