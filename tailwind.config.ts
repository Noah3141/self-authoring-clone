import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors, { transparent } from "tailwindcss/colors";

export default {
    content: ["./src/**/*.tsx", "./app/**/*.tsx"],
    theme: {
        colors: {
            primary: colors.lime,
            neutral: colors.neutral,

            success: colors.lime,
            warning: colors.amber,
            danger: colors.red,
            info: colors.sky,
        },
        extend: {
            colors: {
                transparent: transparent,
            },
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
            },
        },
    },
    plugins: [],
} satisfies Config;
