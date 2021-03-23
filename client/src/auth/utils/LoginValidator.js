import FormValidator from '../../helpers/FormValidator';

const emptyCheck = (value) => value && value.trim().length > 0;

export default function LoginValidator() {
  const validator = new FormValidator();
  validator
    .addRule('username', emptyCheck, 'Please Enter Username')
    .addRule('password', emptyCheck, 'Please Enter Password');

  return validator;
}
