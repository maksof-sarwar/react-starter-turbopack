import { router } from '@/app.router';
import { TrpcProvider } from '@/provider/trpc';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Spinner } from 'ui';

function App() {
	return (
		<TrpcProvider>
			<Suspense fallback={<Spinner />}>
				<RouterProvider router={createBrowserRouter(router)} />
			</Suspense>
		</TrpcProvider>
	);
}

export default App;
