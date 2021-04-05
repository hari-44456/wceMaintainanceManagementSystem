import FormValidator from '../../helpers/FormValidator';

const emptyCheck = (value) => value && value.trim().length > 0;
const checkValue = (value) => value > 0;

export default function MaterialFormValidator() {
  const validator = new FormValidator();
  validator
    .addRule('material', emptyCheck, 'Please Enter Material')
    .addRule('cost', checkValue, 'Please Enter Valid Cost')
    .addRule('units', checkValue, 'Please Enter valid quantity');

  return validator;
}
