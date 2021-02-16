import React from 'react';
import { Section } from '../../components/layout';
import { Content } from './detail_component/content';
import { Summary } from './detail_component/summary';
import { ActionBar } from './detail_component/action_bar';

import './detail.css';

export function Detail() {
  return (
    <Section className="todo-section">
      <Summary />
      <Content />
      <ActionBar />
    </Section>
  );
}
