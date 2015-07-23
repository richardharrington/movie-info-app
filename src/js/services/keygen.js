function* gen() {
  let counter = 0;
  while (true) yield ++counter;
}

let iter = gen();

export default function() {
  return iter.next().value;
}
