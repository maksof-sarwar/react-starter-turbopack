import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { useEffect } from 'react';
import { Button } from 'ui';
import type { AppRouter } from '../../server/src/app';
const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000/trpc',
			fetch: (url, options) => {
				return fetch(url, {
					...options,
					credentials: 'same-origin',
				});
			},
		}),
	],
});
function App() {
	useEffect(() => {
		trpc.auth.login.mutate({ email: 'test', password: 'asdasdasd' }).then((response) => {
			console.log(response?.name);
		});
	});
	return (
		<div className='App'>
			<Button />
			<button className='rab-bg-blue-700'>test</button>
		</div>
	);
}

export default App;
