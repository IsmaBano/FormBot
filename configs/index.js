import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"
const sql = neon(`postgresql://formbotdb_owner:OfJmSydu95eP@ep-tiny-haze-a55lpfa8.us-east-2.aws.neon.tech/formbotdb?sslmode=require`);
 export const db = drizzle(sql,{schema});