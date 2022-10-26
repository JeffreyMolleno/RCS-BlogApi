declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_HOST: string
            DATABASE_PORT: number
            DATABASE_USER: string
            DATABASE_PASSWORD: string | undefined
            DATABASE_COLLECTION: string
            SERVER_PORT: number
            NODE_ENVIRONMENT: 'development' | 'staging' | 'production' | 'test'
            TOKEN_SECRET: string
        }
    }
}

export {}
