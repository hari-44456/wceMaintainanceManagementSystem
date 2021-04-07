import FormValidator from '../../helpers/FormValidator';

const emptyCheck = (value) => value && value.trim().length > 0;
const checkValue = (value) => value > 0;

export default function OrderedMaterialValidator() {
  console.log('called')
    const validator = new FormValidator();
    validator
      .addRule('material', emptyCheck, 'Please Enter Material')
      .addRule('approxCost', checkValue, 'Enter Valid Cost')
      .addRule('units', checkValue, 'Enter valid Units');

    return validator;
}
