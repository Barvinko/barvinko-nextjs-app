import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export async function enableMocking() {
  if (typeof window === 'undefined') {
    return;
  }

  const { worker } = await import('./browser');

  return worker.start({
    onUnhandledRequest: 'warn',
  });
}
