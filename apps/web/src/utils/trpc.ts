import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from 'server/src/router/_app';
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";


export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
// @ts-ignore
export const trpc = createTRPCReact<AppRouter>();

