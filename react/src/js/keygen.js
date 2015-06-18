function* gen() {
  let counter = 0;
  while(true) yield ++counter;
}

const iter = gen();

export default function() {
  return iter.next().value;
}
