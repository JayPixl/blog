export const validateLength = (
    input: string,
    minLength?: number,
    maxLength?: number
) => {
    if (minLength && input.length < minLength) {
        return `Must be at least ${minLength} characters long.`
    } else if (maxLength && input.length > maxLength) {
        return `Cannot be more than ${maxLength} characters long.`
    } else {
        return undefined
    }
}

export const validateEmail = (input: string) => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input)) {
        return `Email is invalid.`
    }
}

export const validateExists = (input: string, type: string) => {
    if (input.length === 0) {
        return `Please provide ${type}.`
    }
}

export const validatePasswordsMatch = (pass1: string, pass2: string) => {
    if (pass1 !== pass2) {
        return `Passwords do not match!`
    }
}
