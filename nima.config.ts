import type { V1Config } from "nimajs"

export default {
    compilerOptions: {
        content: ["./app/**/*.{ts,tsx}"],
        outputDir: "./app/utils"
    },
    animations: [
        {
            name: "theme",
            alwaysCompile: true,
            triggerMode: "overlap",
            triggers: {
                mouseenter: {
                    "opacity@descendant.theme-button": {
                        frames: [0, 1],
                        delay: "500ms",
                        duration: "200ms",
                        stagger: "100ms"
                    },
                    "height@descendant.slider": {
                        frames: {
                            to: "clamp(8rem,calc(7rem + 6vw),11rem)"
                        },
                        duration: "500ms",
                        easing: "ease-in-out"
                    },
                    fill: "forwards",
                    iterations: 1,
                    endTriggers: ["mouseleave"]
                },
                mouseleave: {
                    "opacity@descendant.theme-button": {
                        frames: [1, 0],
                        duration: "200ms"
                    },
                    "height@descendant.slider": {
                        frames: {
                            from: "clamp(8rem,calc(7rem + 6vw),11rem)"
                        },
                        easing: "ease-in-out",
                        duration: "500ms"
                    },
                    easing: "ease-in-out",
                    fill: "forwards",
                    iterations: 1,
                    endTriggers: ["mouseenter"]
                }
            }
        },
        {
            name: "input-box",
            triggerMode: "overlap",
            triggers: {
                "focus@child.input": {
                    "translate@child.placeholder": {
                        frames: {
                            to: "-20% -100%"
                        }
                    },
                    "scale@child.placeholder": {
                        frames: {
                            to: "85%"
                        }
                    },
                    fill: "forwards",
                    iterations: 1,
                    endTriggers: [
                        {
                            trigger: "blur@child.input",
                            tests: ["hasValue<>@child.input"]
                        }
                    ]
                },
                "timer<100ms>@child.input": {
                    tests: [
                        "custom<function(el){ return el.value.length !== 0 }>@child.input"
                    ],
                    "translate@child.placeholder": {
                        frames: {
                            to: "-20% -100%"
                        }
                    },
                    "scale@child.placeholder": {
                        frames: {
                            to: "85%"
                        }
                    },
                    fill: "forwards",
                    iterations: 1,
                    endTriggers: [
                        {
                            trigger: "blur@child.input",
                            tests: ["hasValue<>@child.input"]
                        }
                    ]
                },
                "blur@child.input": {
                    tests: ["hasValue<>@child.input"],
                    "translate@child.placeholder": {
                        frames: {
                            from: "-20% -100%"
                        }
                    },
                    "scale@child.placeholder": {
                        frames: {
                            from: "85%"
                        }
                    },
                    fill: "forwards",
                    iterations: 1,
                    endTriggers: ["focus@child.input"]
                }
            }
        },
        {
            name: "button",
            triggerMode: "overlap",
            triggers: {
                mouseenter: {
                    scale: [1, 1.1],
                    duration: 300,
                    fill: "forwards",
                    iterations: 1,
                    endTriggers: ["mouseleave"]
                },
                click: {
                    scale: [1.1, 1.2, 1.1],
                    duration: 200,
                    iterations: 1,
                    easing: "linear",
                    endTriggers: ["timer<200ms>"]
                },
                mouseleave: {
                    scale: [1.1, 1],
                    duration: 300,
                    fill: "forwards",
                    iterations: 1,
                    endTriggers: ["mouseenter"]
                }
            }
        }
    ]
} satisfies V1Config
