type FormDetail = { [key: string]: string | number | boolean };
type FieldValidator = (value: string | number | boolean, formDetails?: FormDetail) => boolean;

export function validateChar(value = '', allowInputChars: string | string[] = '') {
  if (allowInputChars.length === 0) return true;
  if (typeof value !== 'string') return false;
  if (value === '') return true;
  const inputArrays = value.split('');
  return inputArrays.every((char) => allowInputChars.includes(char));
}

export function validateLength(fieldValue = '', maxLength: number) {
  return !maxLength || `${fieldValue}`.length <= maxLength;
}

/**
 * This is to validate whether mandatory fields are not empty.
 * @param formDetails Filled data in the form.
 *                    If have nested data structure please use this function again and combine them.
 * @param mandatoryFields The list of mandatory field key.
 */
export function validateMandatoryStatus(formDetails: FormDetail, mandatoryFields: string[]): boolean {
  const mandatoryFieldsValue = mandatoryFields.map((field) => formDetails[field]);
  return mandatoryFieldsValue
    .map((value) => {
      if (value === undefined || value === null) return true;
      if (value === false || value === 0) return true;
      return !!value;
    })
    .reduce((result, next) => result && next, true);
}

/**
 * This is to validate whether input fields acceptable and no forbidden characters.
 * @param formDetails Filled data in the form.
 *                    If have nested data structure please use this function again and combine them.
 * @param acceptFields All the field need to be check by validator.
 * @param validatorMap The validator for each field.
 */
export function validateCleanStatus(
  formDetails: FormDetail,
  acceptFields: string[],
  validatorMap: { [key: string]: FieldValidator },
) {
  const fieldsCleanStatus = acceptFields.map((fieldId) => {
    const validator = validatorMap[fieldId];
    return validator ? validator(formDetails[fieldId], formDetails) : true;
  });
  return fieldsCleanStatus.reduce((result, next) => result && next, true);
}

/**
 * This is to validate whether fields length are below requirement.
 * @param formDetails Filled data(string type only) in the form.
 *                    If have nested data structure please use this function again and combine them.
 * @param fieldsLength The length of every field which need length check.
 */
export function validateLengthStatus(formDetails: { [key: string]: string }, fieldsLength: { [key: string]: number }) {
  const lengthStatus = Object.keys(fieldsLength).map((fieldId) => {
    return validateLength(formDetails[fieldId], fieldsLength[fieldId]);
  });
  return lengthStatus.reduce((result, next) => result && next, true);
}
