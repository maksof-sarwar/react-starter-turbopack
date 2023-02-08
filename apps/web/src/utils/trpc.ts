import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../server/trpc';

// trpc.createClient({
// 			links: [
// 				httpBatchLink({
// 					url: 'http://localhost:5000/trpc',
// 					headers() {
// 						return {};
// 					},
// 				}),
// 			],
// 		})


export const trpc = createTRPCReact<AppRouter>();
