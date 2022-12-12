import { createProject } from '.';

describe('foo', () => {
  it('bar', () => {
    expect(typeof createProject).toBe('function');
  });
});
