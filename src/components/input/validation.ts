export function useLengthInvalidMessage(textName: string, textValue: string, maxLength: number) {
  const invalidMessage = 'Your entry is too long. Please limit to {number} characters.';
  if (!maxLength || textValue.length <= maxLength) return '';
  return invalidMessage.replace('{number}', `${maxLength}`);
}
