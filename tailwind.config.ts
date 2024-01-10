import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

export default {
    content: ["app/**/*.{ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                "fira-mono": ["Fira Mono", "mono"],
                "fira-sans": ["Fira Sans", "sans"],
                playpen: ["Playpen Sans", "cursive"],
                poppins: ["Poppins", "sans-serif"],
                "dm-mono": ["DM Mono", "mono"]
            },
            colors: {
                primary: {
                    "100": "#F1EFEF",
                    "200": "#e7e5e4",
                    "300": "#C3C1BF",
                    "400": "#9F9C99",
                    "500": "#7B7874",
                    "600": "#57534e",
                    "700": "#403C39",
                    "800": "#292524",
                    "900": "#1c1917",
                    "950": "#0c0a09"
                },
                action: {
                    "400": "#818CF8",
                    "600": "#4F46E5"
                }
            },
            typography: ({ theme }: any) => ({
                DEFAULT: {
                    css: {
                        pre: false,
                        "pre code": false,
                        "code::before": {
                            content: "normal"
                        },
                        "code::after": {
                            content: "normal"
                        },
                        "blockquote p::before": {
                            content: "normal"
                        },
                        "blockquote p::after": {
                            content: "normal"
                        },
                        "--tw-prose-body": theme("colors.primary[800]"),
                        "--tw-prose-headings": theme("colors.primary[900]"),
                        "--tw-prose-lead": theme("colors.primary[800]"),
                        "--tw-prose-links": theme("colors.action[600]"),
                        "--tw-prose-bold": theme("colors.primary[800]"),
                        "--tw-prose-counters": theme("colors.primary[800]"),
                        "--tw-prose-bullets": theme("colors.primary[700]"),
                        "--tw-prose-hr": theme("colors.primary[300]"),
                        "--tw-prose-quotes": theme("colors.primary[800]"),
                        "--tw-prose-quote-borders": theme("colors.action[600]"),
                        "--tw-prose-captions": theme("colors.primary[700]"),
                        //"--tw-prose-code": theme("colors.primary[700]"),
                        //"--tw-prose-pre-code": theme("colors.pink[100]"),
                        //"--tw-prose-pre-bg": theme("colors.pink[900]"),
                        "--tw-prose-th-borders": theme("colors.primary[600]"),
                        "--tw-prose-td-borders": theme("colors.primary[600]"),

                        "--tw-prose-invert-body": theme("colors.primary[200]"),
                        "--tw-prose-invert-headings": theme(
                            "colors.primary[100]"
                        ),
                        "--tw-prose-invert-lead": theme("colors.primary[200]"),
                        "--tw-prose-invert-links": theme("colors.action[400]"),
                        "--tw-prose-invert-bold": theme("colors.primary[200]"),
                        "--tw-prose-invert-counters": theme(
                            "colors.primary[200]"
                        ),
                        "--tw-prose-invert-bullets": theme(
                            "colors.primary[500]"
                        ),
                        "--tw-prose-invert-hr": theme("colors.primary[500]"),
                        "--tw-prose-invert-quotes": theme(
                            "colors.primary[200]"
                        ),
                        "--tw-prose-invert-quote-borders":
                            theme("colors.action[400]"),
                        "--tw-prose-invert-captions": theme(
                            "colors.primary[300]"
                        ),
                        //"--tw-prose-invert-code": theme("colors.primary[300]"),
                        //"--tw-prose-invert-pre-code": theme("colors.pink[300]"),
                        //"--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
                        "--tw-prose-invert-th-borders": theme(
                            "colors.primary[300]"
                        ),
                        "--tw-prose-invert-td-borders": theme(
                            "colors.primary[300]"
                        )
                    }
                }
            })
        }
    },
    plugins: [typography()]
} satisfies Config
