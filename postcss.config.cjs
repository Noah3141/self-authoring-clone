const config = {
    plugins: {
        "postcss-import": {},
        "tailwindcss/nesting": {},
        tailwindcss: { config: "./tailwind.config.ts" },
    },
};

module.exports = config;
