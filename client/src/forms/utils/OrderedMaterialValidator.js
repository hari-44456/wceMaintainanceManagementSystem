import FormValidator from '../../helpers/FormValidator';

const emptyCheck = (value) => value && value.trim().length > 0;

export default function OrderedMaterialValidator() {
    const validator = new FormValidator();
    validator
      .addRule('material', emptyCheck, 'Please Enter Material')

    return validator;
}
