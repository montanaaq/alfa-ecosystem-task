import type { FC } from 'react';
import { Link } from 'react-router';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

interface TItem {
    label: string;
    href?: string;
}

interface BreadcrumbNavProps {
    items: TItem[];
    className?: string;
}

const BreadcrumbNav: FC<BreadcrumbNavProps> = ({
    items,
    className = 'mb-6'
}) => {
    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <div
                            key={`${item.href}-${item.label}`}
                            className="flex items-center gap-3"
                        >
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>
                                        {item.label}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link to={item.href || '/'}>
                                            {item.label}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbNav;
