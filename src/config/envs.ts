import { loadEnvFile } from "node:process";
import env from 'env-var';
loadEnvFile()

export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    PUBLIC_PATH: env.get("PUBLIC_PATH").default("public").asString(),
    POSTGRES_URL: env.get("POSTGRES_URL").required().asString(),
    POSTGRES_USER: env.get("POSTGRES_USER").required().asString(),
    POSTGRES_PASSWORD: env.get("POSTGRES_PASSWORD").required().asString(),
    POSTGRES_DB: env.get("POSTGRES_DB").required().asString(),
} as const

