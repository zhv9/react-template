import { render, screen } from '@testing-library/react';
import { TestProvider } from '../../../../utils/test_utils';
import { ActionBar } from '../action_bar';

describe('action_bar', () => {
  it('when not fill fields button should disabled', () => {
    const todoDetail = { id: 1, summary: 'some summary', content: '' };
    const storeState = { todo: { todoDetail, todoList: [] } };
    render(TestProvider(<ActionBar />, storeState));
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toHaveAttribute('disabled');
  });
  it('when fill all field button should active', () => {
    const todoDetail = { id: 1, summary: 'some summary', content: 'some content' };
    const storeState = { todo: { todoDetail, todoList: [] } };
    render(TestProvider(<ActionBar />, storeState));
    const submitButton = screen.getByText('Submit');
    expect(submitButton).not.toHaveAttribute('disabled');
  });
});
