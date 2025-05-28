export const checkFormValidation = (email, password) => {

    // const isFullNameCorrect = /^[A-Z][a-z]+(\s[A-Z][a-z]?){0,}/.test(fullName)

    const isEmailCorrect = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email)

    const isPasswordCorrect = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)


    if (!isEmailCorrect) return "Email is not valid!"
    if (!isPasswordCorrect) return "Password is not valid!"

    return null
}