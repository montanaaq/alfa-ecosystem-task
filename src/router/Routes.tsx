import {
    type ComponentType,
    type LazyExoticComponent,
    lazy,
    type ReactElement,
    Suspense
} from 'react';

import type { RouteObject } from 'react-router';

import { Spinner } from '@/components/ui/spinner';

const withSuspense = (
    Component: LazyExoticComponent<ComponentType>
): ReactElement => (
    <Suspense fallback={<Spinner />}>
        <Component />
    </Suspense>
);

const Home = lazy(() => import('@/app/pages/Home/App'));
const Products = lazy(() => import('@/app/pages/Products/Products'));
const ProductDetail = lazy(
    () => import('@/app/pages/ProductDetail/ProductDetail')
);
const CreateProduct = lazy(
    () => import('@/app/pages/CreateProduct/CreateProduct')
);
const ProductEdit = lazy(() => import('@/app/pages/ProductEdit/ProductEdit'));

export const routes: RouteObject[] = [
    {
        path: '/',
        element: withSuspense(Home)
    },
    {
        path: '/products',
        element: withSuspense(Products)
    },
    {
        path: '/products/:url',
        element: withSuspense(ProductDetail)
    },
    {
        path: '/create-product',
        element: withSuspense(CreateProduct)
    },
    {
        path: '/products/edit/:url',
        element: withSuspense(ProductEdit)
    }
];
