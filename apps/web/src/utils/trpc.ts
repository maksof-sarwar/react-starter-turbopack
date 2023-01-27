import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../server/src/app";

export const trpc = createTRPCProxyClient<AppRouter>({
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
export default trpc;