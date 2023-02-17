import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'server/trpc';

// @ts-ignore
export const trpc = createTRPCReact<AppRouter>();