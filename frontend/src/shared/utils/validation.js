import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid email.').required('Required.'),

  password: Yup.string()
    .trim()
    .min(5, 'Must be at least 5 characters long.')
    .required('Required.'),

  confirmPassword: Yup.string()
  .trim()
  .oneOf([Yup.ref('password'), null], "Passwords must match.")
  .required('Required.')
  
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid email.').required('Required.'),

  password: Yup.string().trim()
    .min(5, 'Must be at least 5 characters long.')
    .required('Required.'),
});


const CreateProductSchema = Yup.object().shape({
  title: Yup.string().trim()
    .min(3, "Must be at least 3 characters long")
    .required('Required.'),
  parentCategory: Yup.string().required('Required.'),
  childCategory: Yup.string().required('Required.'),
  price: Yup.number().min(1, 'Must be greater than 0').required('Required'),
  quantity: Yup.number().min(1, 'Must be greater than 0').required('Required.'),
  description: Yup.string().trim().min(3, "Must be at least 3 characters long.").required('Required.'),
  image: Yup.string().required('Required.')

});

const CreateProductSchemaAdmin = Yup.object().shape({
  title: Yup.string().trim()
    .min(3, "Must be at least 3 characters long")
    .required('Required.'),
  parentCategory: Yup.string().required('Required.'),
  childCategory: Yup.string().required('Required.'),
  price: Yup.number().min(1, 'Must be greater than 0').required('Required'),
  quantity: Yup.number().min(1, 'Must be greater than 0').required('Required.'),
  description: Yup.string().trim().min(3, "Must be at least 3 characters long.").required('Required.')
});

export { LoginSchema, SignupSchema, CreateProductSchema,CreateProductSchemaAdmin };


