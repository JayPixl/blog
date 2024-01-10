export const changeThemes: (
    action: "light" | "dark" | "system"
) => void = action => {
    switch (action) {
        case "light": {
            // Whenever the user explicitly chooses light mode
            if (localStorage?.theme !== "light") {
                localStorage.theme = "light"
                window.location.reload()
            }
            break
        }

        case "dark": {
            // Whenever the user explicitly chooses dark mode
            if (localStorage?.theme !== "dark") {
                localStorage.theme = "dark"
                window.location.reload()
            }
            break
        }

        case "system": {
            // Whenever the user explicitly chooses to respect the OS preference
            localStorage.removeItem("theme")
            window.location.reload()
            break
        }
    }
}

export const getTheme: () => "light" | "dark" | "system" = () => {
    if (localStorage && ["light", "dark"].includes(localStorage?.theme)) {
        return localStorage.theme as "light" | "dark"
    } else {
        return "system"
    }
}

export const loadTheme: () => void = () => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        document.documentElement.classList.add("dark")
    } else {
        document.documentElement.classList.remove("dark")
    }
}
