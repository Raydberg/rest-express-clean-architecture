import { loadEnvFile } from "node:process";
import env from 'env-var';
loadEnvFile()



export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    PUBLIC_PATH: env.get("PUBLIC_PATH").default("public").asString(),
} as const

