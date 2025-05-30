/*
Full Name Regex : /^[A-Za-z]+(?:\.?[A-Za-z]+)*(?: [A-Za-z]+(?:\.?[A-Za-z]+)*)*$/
        Any letter (capital/lowercase)
        Spaces between words
        Optional periods (.) (like initials: "A. Kumar")
        Trims leading/trailing spaces

Email Regex : /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        Basic email structure: username@domain.extension
        No spaces
        Must include @ and .
        Allows subdomains (like abc@sub.domain.com)

Password Regex : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/
        Minimum 8, maximum 15 characters
        At least 1 lowercase letter
        At least 1 uppercase letter
        At least 1 digit
        At least 1 special character: @.#$!%*?&
*/

const validateForm = (name = "", email, password) => {
    const isNameValid = /^[A-Za-z]+(?:\.?[A-Za-z]+)*(?: [A-Za-z]+(?:\.?[A-Za-z]+)*)*$/.test(name.trim())
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(password)

    if (!isNameValid && name != "") {
        return "Invalid Full Name..."
    }
    if (!isEmailValid) {
        return "Invalid Email..."
    }
    if (!isPasswordValid) {
        return "Invalid Password..."
    }

    return null
}

export default validateForm
