import Test from '@/components/Test';
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
const SignIn = lazy(() => import('@/components/SignIn'));
export const router = [
	{
		path: 'auth',
		children: [
			{
				path: 'sign-in',
				element: <SignIn />,
			},
			{
				path: 'test',
				element: <Test />,
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
