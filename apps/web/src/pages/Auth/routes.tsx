import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
const SignIn = lazy(() => import('@/pages/Auth/SignIn'));
const Register = lazy(() => import('@/pages/Auth/Register'));

export const authRoutes: RouteObject[] = [
	{
		path: 'sign-in',
		element: <SignIn />,
	},
	{
		path: 'register',
		element: <Register />,
	},
	{
		path: '',
		element: <Navigate to={'/sign-in'} />,
	},
];
