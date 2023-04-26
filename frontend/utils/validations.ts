import * as yup from 'yup'

export const validationsRegister = yup.object({
  name: yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es requerido'),
  email: yup.string()
    .email('El formato del email es incorrecto')
    .required('Email es requerido'),
  password: yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    'La contraseña debe contener al menos: 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial.')
    .required('Contraseña es requerida'),
  confirm_password: yup.string().required('Por favor, confirma tu contraseña')
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
}).required()


export const validationsLogin = yup.object({
  email: yup.string()
    .email('El formato del email es incorrecto')
    .required('Email es requerido'),
  password: yup.string().required('La contraseña es requerida')
}).required()


export const validationsEdit = yup.object({
  name: yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es requerido'),
  email: yup.string()
    .email('El formato del email es incorrecto')
    .required('Email es requerido'),

  password: yup.string().test(
      'empty-check',
      'Password must have at least: 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character',
       value => value?.length == 0 ||
       (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value?value:''))
  ),
  confirm_password: yup.string().when('password', {
      is: (password:string) => password.length > 0,
      then: yup.string().required('Por favor, confirma tu contraseña').
      oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
  }),
  
}).required()

export const validationsCreateSubmission = yup.object({
  title: yup.string().required(),
  symptoms: yup.string().required(),
}).required()