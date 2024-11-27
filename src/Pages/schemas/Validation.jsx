import * as Yup from "yup";

export const signUpSchema = Yup.object({
    name: Yup.string().trim().min(2).max(25).required("Please enter your name"),
    email: Yup.string().trim().email().required("Please enter your email").matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a @gmail.com address'),
    password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, "Password must contain one uppercase letter and one special character")
    .required("Please enter your password"),
    role: Yup.string().required("Role is required"),
})