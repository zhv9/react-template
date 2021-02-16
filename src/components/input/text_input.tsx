import React, { ChangeEvent, HTMLAttributes } from 'react';
import { useLengthInvalidMessage } from './validation';

import './input.css';

interface Props extends HTMLAttributes<HTMLInputElement> {
  inputId?: string;
  type?: string;
  style?: { [key: string]: string };
  labelText?: string;
  value: string;
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  validator?: (label: string, value: string) => string;
}

export default function TextInput(props: Props): JSX.Element {
  const { inputId, type = 'text', style, labelText = '', value, required, maxLength = 0, validator, ...rest } = props;
  const validateMessage = typeof validator === 'function' ? validator(labelText, value) : '';
  const lengthInvalidMessage = useLengthInvalidMessage(labelText, value, maxLength);
  const invalidMessage = validateMessage || lengthInvalidMessage;
  const invalidMessageId = `${inputId}-error`;
  const labelId = `${inputId}-label`;
  return (
    <div className="Text-Input">
      <input
        id={inputId}
        type={type}
        style={style}
        aria-invalid={!!invalidMessage}
        aria-required={required}
        value={value}
        aria-labelledby={labelId}
        aria-describedby={invalidMessageId}
        {...rest}
      />
      {!!invalidMessage && <div id={invalidMessageId}>{invalidMessage}</div>}
    </div>
  );
}
