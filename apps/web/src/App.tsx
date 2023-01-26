import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../server/src/app';
const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000/trpc',
			fetch: (url, options) => {
				return fetch(url, {
					...options,
					credentials: 'include',
					mode: 'no-cors',
				});
			},
		}),
	],
});
function App() {
	useEffect(() => {
		trpc.auth.login.mutate({ email: 'test', password: 'asdasdasd' }).then((response) => {
			console.log(response);
		});
	});
	return <div className='App'>test</div>;
}

export default App;
