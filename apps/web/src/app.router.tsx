import { authRoutes } from '@/pages/Auth/routes';
import { Navigate, RouteObject } from 'react-router-dom';

export const router: RouteObject[] = [
	{
		path: 'auth',
		children: [...authRoutes],
	},
	{
		path: '*',
		element: <Navigate to={'/auth/sign-in'} />,
	},
];
