export default count;

function count() {
  const obj = ['zero', 'one', 'two', 'three', 'four', 'five'];

  let counter = 0;

  return () => {
    const r = obj[counter] ?? 'this is the end';
    counter += 1;
    return r;
  };
}
