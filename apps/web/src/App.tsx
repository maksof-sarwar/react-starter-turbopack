import { Suspense } from 'react';
import { RouterProvider, useRoutes } from 'react-router-dom';
import { Spinner } from 'ui';
import router from '@/utils/router';
function App() {
	return (
		<Suspense fallback={<Spinner />}>
			<RouterProvider router={router} />
		</Suspense>
	);
}

export default App;
