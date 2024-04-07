export type Color =
    | "primary"
    | "neutral"
    | "success"
    | "warning"
    | "danger"
    | "info";

export type ColorScheme = {
    name: string;
    foreground: string;
    background: string;
};
