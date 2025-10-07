import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { server } from './mocks/server';

beforeAll(() => {
  console.log('Starting MSW server...');
  server.listen({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  console.log('Stopping MSW server...');
  server.close();
});
