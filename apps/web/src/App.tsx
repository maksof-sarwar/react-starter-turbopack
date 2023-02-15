import { router } from '@/app.router';
import { TrpcProvider } from '@/provider/trpc';
import { trpc } from '@/utils/trpc';
import { Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Spinner } from 'ui';

function App() {
	const a = trpc.auth.login.useMutation();
	useEffect(() => {
		console.log(a);
		// a.mutateAsync({ email: 'asdasd', password: 'asdasd', test: 'asdasd' });
	}, []);
	return (
		<TrpcProvider>
			<Suspense fallback={<Spinner />}>
				<RouterProvider router={createBrowserRouter(router)} />
			</Suspense>
		</TrpcProvider>
	);
}

export default App;
