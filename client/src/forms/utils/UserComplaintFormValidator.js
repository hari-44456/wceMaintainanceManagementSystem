import FormValidator from '../../helpers/FormValidator';

const emptyCheck = (value) => value && value.trim().length > 0;

export default function UserComplaintValidator() {
    const validator = new FormValidator();
    validator
      .addRule('department', emptyCheck, 'Please Enter Department')
      .addRule('location', emptyCheck, 'Please Enter Location')
      .addRule('workType', emptyCheck, 'Please Select Nature of Work')
      .addRule('workDetails', emptyCheck, 'Please Enter Work Details');

    return validator;
}
