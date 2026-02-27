import { envs } from "../../src/config/envs"

describe("envs.ts", () => {
    test("should return envs options", async () => {
        // console.log(envs)
        expect(envs).toEqual(expect.objectContaining(
            {
                PORT: 3000,
                PUBLIC_PATH: 'public',
                POSTGRES_URL: 'postgresql://ray:2005@localhost:5432/rest_web',
                POSTGRES_USER: 'ray',
                POSTGRES_PASSWORD: '2005',
                POSTGRES_DB: 'noc_db'
            }
        ))
    })

    test("should return error if not env ", async () => {
        jest.resetModules()
        process.env.PORT = "ABC"
        try {
            await import("../../src/config/envs")
            expect(true).toBe(false)
        } catch (error) {
            // console.log(error)
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
    })

})