import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url:"postgresql://formbotdb_owner:OfJmSydu95eP@ep-tiny-haze-a55lpfa8.us-east-2.aws.neon.tech/formbotdb?sslmode=require"
  }
});