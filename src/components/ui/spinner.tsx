import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
    return (
        <LoaderCircle
            role="status"
            aria-label="Loading"
            className={cn('size-8 animate-spin', className)}
            {...props}
        />
    );
}

export { Spinner };
