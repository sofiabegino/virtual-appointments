import * as yup from 'yup'

const id = yup.number();
const name = yup.string().min(3);
const email = yup.string().email()
const password = yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
'The password must have at least: 8 characters, 1 uppercase, 1 lowercase, 1 number y 1 special character.')
const confirm_password = yup.string()
const role = yup.mixed().oneOf(['Doctor', 'Patient'])
const weight = yup.number()
const height = yup.number()
const phoneNumber = yup.string()


export const createUserSchema = yup.object({
    name: name.required('El nombre es requerido'),
    email: email.required('Email es requerido'),
    role: role.required(),
    password: password.required('Contraseña es requerida'),
    confirm_password: confirm_password.required('Por favor, confirma tu contraseña')
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
})

export const updateUserSchema = yup.object({
  id: id,
  name: name,
  email: email,
  password: password,
  weight: weight,
  height: height,
  phoneNumber: phoneNumber,
  confirm_password: confirm_password.oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
  role: role,
});

export const getUserSchema = yup.object({
  id: id.required(),
});
