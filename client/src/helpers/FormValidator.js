export default function FormValidator() {
    this.rules = {};
}

function setUpField(name) {
    this.rules[name] = {}
    this.rules[name].checkers = [];
}

function ruleAddition(name, checker, errorMsg) {
    if (!Object.keys(this.rules).includes(name)) setUpField.call(this, name);

    this.rules[name].checkers.push({
        method: checker,
        errorMsg: errorMsg,
    });
}

FormValidator.prototype.forField = function (name) {
    const adder = Object.create(this);
    adder.addRule = function (checker, errorMsg) {
        ruleAddition.call(this, name, checker, errorMsg);
        return this;
    };
    return adder;
};

FormValidator.prototype.addRule = function (name, checker, errorMsg) {
    ruleAddition.call(this, name, checker, errorMsg);
    return this;
};

FormValidator.prototype.validate = function (data) {
    const errors = {};

    Object.keys(this.rules).forEach((field) => {
        if (!Object.keys(data).includes(field)) {
            data[field] = ' ';
        }
    });

    Object.keys(data)
        .filter((fieldName) => {
            return Object.keys(this.rules).includes(fieldName) === true;
        })
        .reduce((errors, fieldName) => {
            const validatorFactory = new ValidatorFactory(this.rules[fieldName].checkers);
            const errorList = validatorFactory(data[fieldName]);

            if (!!errorList.length) errors[fieldName] = errorList;

            return errors;
        }, errors);

    const success = !Object.keys(errors).length;
    const validationResult = {
        success: !Object.keys(errors).length,
        errors: errors,
    };
    return success ? Promise.resolve(validationResult) : Promise.reject(validationResult);
};

function ValidatorFactory(validationCheckers) {
    return function (fieldValue) {
        return validationCheckers
            .filter((checker) => {
                return !!checker.method(fieldValue) === false;
            })
            .map((checker) => {
                return checker.errorMsg;
            });
    };
}
