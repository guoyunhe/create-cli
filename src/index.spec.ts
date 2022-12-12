import { createProject } from '.';

describe('exports', () => {
  it('exports createProject', () => {
    expect(typeof createProject).toBe('function');
  });
});
