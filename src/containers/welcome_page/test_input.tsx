import React, { useState, ChangeEvent } from 'react';
import { TextInput } from '../../components/input';

export function TestInput() {
  const [inputData, setInput] = useState('');
  return (
    <TextInput
      inputId="testInput"
      value={inputData}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
      }}
      maxLength={6}
    />
  );
}
