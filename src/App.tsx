import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Routes } from './containers/Routes';

export default function App() {
  return (
    <HashRouter>
      <Routes />
    </HashRouter>
  );
}
