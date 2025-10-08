import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createTestStore } from './test-utility';

export const renderWithStore = (
  ui: React.ReactNode,
  testStore = createTestStore()
) => render(<Provider store={testStore}>{ui}</Provider>);
