import { type FC, memo } from 'react';

import { camelCaseFormat } from '@/lib/utils';
import { CATEGORIES, CATEGORY_VALUES } from '@/shared/constants';
import { useNewsStore } from '@/shared/stores/news.store';
import type { CategoryType } from '@/shared/types/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select';

interface CategorySelectorProps {
    value?: CategoryType | null;
    onValueChange?: (value: CategoryType) => void;
    useStore?: boolean;
}

const CategorySelector: FC<CategorySelectorProps> = memo(
    ({
        value: externalValue,
        onValueChange: externalOnChange,
        useStore = true
    }) => {
        const storeCategory = useNewsStore(s => s.category);
        const setStoreCategory = useNewsStore(s => s.setCategory);

        const category = useStore ? storeCategory : externalValue;
        const setCategory = useStore ? setStoreCategory : externalOnChange;

        const selectedValue = category || 'general';

        const handleValueChange = (val: string) => {
            if (CATEGORY_VALUES.includes(val as CategoryType)) {
                setCategory?.(val as CategoryType);
            }
        };

        return (
            <Select onValueChange={handleValueChange} value={selectedValue}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    {CATEGORIES.map(c => (
                        <SelectItem key={c.category} value={c.category}>
                            {camelCaseFormat(c.category)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        );
    }
);

export default CategorySelector;
