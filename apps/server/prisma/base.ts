import { createSchema } from 'schemix';

createSchema({
  datasource: {
    provider: "mysql",
    url: { env: "DATABASE_URL" },
  },
  generator: [
    {
      name: "client",
      provider: "prisma-client-js",
    }
  ],
  basePath: __dirname,
}).export(__dirname, "schema");