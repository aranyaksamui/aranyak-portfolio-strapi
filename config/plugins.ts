export default ({ env }: { env: any }) => (
    {
        upload: {
            config: {
                provider: "cloudinary",
                providerOptions: {
                    cloud_name: env("CLOUDINARY_NAME"),
                    api_key: env("CLOUDINARY_KEY"),
                    api_secret: env("CLOUDINARY_SECRET"),
                },
                actionOptions: {
                    upload: {},
                    uploadStream: {
                        folder: env("CLOUDINARY_FOLDER", "aranyak_portfolio"),
                        use_filename: true,
                        unique_filename: false,
                        overwrite: true,
                        resource_type: "auto",
                    },
                    delete: {},
                },
            },
        },
    }
);
