const config = {
    plugins: {
        "postcss-import": {},
        "tailwindcss/nesting": {},
        tailwindcss: { config: "./tailwind.config.ts" },
        autoprefixer: {},
    },
};

module.exports = config;
