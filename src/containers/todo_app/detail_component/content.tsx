import React, { ChangeEvent } from 'react';
import { TextInput, TextLabel } from '../../../components/input';
import { Bar, BarLeft, BarRight } from '../../../components/layout';
import { useIntl } from '../../../intl';
import { useTodoDetail } from '../store';

import '../detail.css';

export function Content() {
  const intl = useIntl();
  const itemKey = 'content';
  const itemName = intl.get('content');
  const [content, setContent] = useTodoDetail(itemKey);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const newContent = e?.target?.value;
    setContent(newContent);
  }
  return (
    <Bar>
      <BarLeft className="todo-bar-left">
        <TextLabel inputId={itemKey} labelText={itemName} />
      </BarLeft>
      <BarRight>
        <TextInput inputId={itemKey} value={content} onChange={onChange} />
      </BarRight>
    </Bar>
  );
}
