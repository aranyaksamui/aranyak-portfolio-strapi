const allowedOrigins = () => {
    if (process.env.NODE_ENV === "development") return [process.env.DEV_CLIENT_URL];
    else if (process.env.NODE_ENV === "production") return [process.env.CLIENT_URL];
};

export default [
    "strapi::logger",
    "strapi::errors",
    {
        name: "strapi::security",
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    "connect-src": ["'self'", "https:"],
                    "img-src": ["'self'", "data:", "blob:", "market-assets.strapi.io", "res.cloudinary.com"],
                    "media-src": ["'self'", "data:", "blob:", "market-assets.strapi.io", "res.cloudinary.com"],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },
    {
        name: "strapi::cors",
        config: {
            origin: allowedOrigins(),
            methods: ["GET"],
            headers: ["Content-Type", "Authorization", "Origin"],
        },
    },
    "strapi::poweredBy",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
];
