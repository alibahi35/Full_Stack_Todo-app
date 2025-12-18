
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db';
import * as schema from '../db/schema';

export const auth = betterAuth({
    adapter: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema,
            user: schema.user
        }
    }),
    emailAndPassword: {
        enabled: true
    },
    // Add other providers or plugins here as needed
});
