import path from "path";

export default ({ env }) => {
    const client = env("DATABASE_CLIENT", "sqlite");
    const connections = {
        mysql: {
            connection: {
                host: env("DATABASE_HOST", "localhost"),
                port: env.int("DATABASE_PORT", 3306),
                database: env("DATABASE_NAME", "strapi"),
                user: env("DATABASE_USERNAME", "strapi"),
                password: env("DATABASE_PASSWORD", "strapi"),
                ssl: env.bool("DATABASE_SSL", false) && {
                    key: env("DATABASE_SSL_KEY", undefined),
                    cert: env("DATABASE_SSL_CERT", undefined),
                    ca: env("DATABASE_SSL_CA", undefined),
                    capath: env("DATABASE_SSL_CAPATH", undefined),
                    cipher: env("DATABASE_SSL_CIPHER", undefined),
                    rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", true),
                },
            },
            pool: { min: env.int("DATABASE_POOL_MIN", 2), max: env.int("DATABASE_POOL_MAX", 10) },
        },
        postgres: {
            connection: {
                host: env("DATABASE_HOST", "localhost"),
                port: env.int("DATABASE_PORT", 5432),
                database: env("DATABASE_NAME", "strapi"),
                user: env("DATABASE_USERNAME", "strapi"),
                password: env("DATABASE_PASSWORD", "strapi"),
                family: 4,
                ssl: env.bool("DATABASE_SSL", false)
                    ? {
                          rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", false),
                          ca: env("DB_CA_CERT", "").replace(/\\n/g, "\n"), // Handle newlines
                      }
                    : false,
                schema: env("DATABASE_SCHEMA", "public"),
            },
            pool: {
                min: env.int("DATABASE_POOL_MIN", 2),
                max: env.int("DATABASE_POOL_MAX", 10),
            },
        },
    };

    return {
        connection: {
            client,
            ...connections[client],
            acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
        },
    };
};
