import count from './index copy';

test('first value is correct', () => {
  const c = count();
  const result = c();

  expect(result).toBe('zero');
});

test('fivth value is correct', () => {
  const c = count();
  c();
  c();
  c();
  c();
  c();
  const result = c();

  expect(result).toBe('five');
});

test('value out of range is correct', () => {
  const c = count();
  c();
  c();
  c();
  c();
  c();
  c();
  const result = c();

  expect(result).toBe('this is the end');
});
