import type { FC } from 'react';
import { useRoutes } from 'react-router';
import { routes } from './Routes';

const Router: FC = () => {
    return useRoutes(routes);
};

export default Router;
