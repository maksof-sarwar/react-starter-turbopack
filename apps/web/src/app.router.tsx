import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
const SignIn = lazy(() => import('@/pages/SignIn'));

export const router: RouteObject[] = [
	{
		path: 'auth',
		children: [
			{
				path: 'sign-in',
				element: <SignIn />,
			},
			{
				path: '',
				element: <Navigate to={'/sign-in'} />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to={'/auth/sign-in'} />,
	},
];
