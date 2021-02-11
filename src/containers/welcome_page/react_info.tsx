import React from 'react';
import { useIntl } from '../../intl';
import logo from './logo.svg';
import './react_info.css';

function ReactInfo() {
  const intl = useIntl();
  return (
    <div className="React">
      <header className="React-header">
        <img src={logo} className="React-logo" alt="logo" />
        <p>{intl.get('edit_and_save_to_reload', { code: 'src/*.tsx' })}</p>
        <a className="React-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default ReactInfo;
