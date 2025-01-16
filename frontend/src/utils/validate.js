import { object, string, ref } from 'yup';

export const channelNamesShema = (channelNames, t) => object({
  name: string()
    .matches(/^\S.*\S$/, t('modal.validation.required'))
    .min(3, t('modal.validation.range'))
    .max(20, t('modal.validation.range'))
    .notOneOf(channelNames, t('modal.validation.notOneOf'))
    .required(t('modal.validation.required')),
});
export const signUpShema = (t) => object().shape({
  username: string()
    .min(3, t('signupForm.errors.usernameRange'))
    .max(20, t('signupForm.errors.usernameRange'))
    .required(t('signupForm.errors.required')),
  password: string()
    .min(6, t('signupForm.errors.passwordRange'))
    .required(t('signupForm.errors.required')),
  confirmPassword: string()
    .oneOf([ref('password'), null], t('signupForm.errors.passwordConfirm'))
    .required(t('signupForm.errors.required')),
});
