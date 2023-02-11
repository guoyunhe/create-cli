import mockConsole from 'jest-mock-console';
import { action } from '.';

describe('action()', () => {
  it('print word', () => {
    const restoreConsole = mockConsole();
    action('hello', {});
    expect(console.log).toHaveBeenCalledTimes(1);
    restoreConsole();
  });

  it('print word repeatly', () => {
    const restoreConsole = mockConsole();
    action('hello', { repeat: 10 });
    expect(console.log).toHaveBeenCalledTimes(10);
    restoreConsole();
  });
});
