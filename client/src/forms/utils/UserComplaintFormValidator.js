import FormValidator from '../../helpers/FormValidator';

const emptyCheck = (value) => value && value.trim().length > 0;
const emptyArrayCheck = (value) => value.length > 0;

export default function UserComplaintValidator() {
    const validator = new FormValidator();
    validator
      .addRule('department', emptyCheck, 'Please Select a Department')
      .addRule('locations', emptyArrayCheck, 'Enter Atleast One Location')
      .addRule('workType', emptyCheck, 'Please Select Nature of Work')
      .addRule('workDetails', emptyCheck, 'Please Enter Work Details');

    return validator;
}
