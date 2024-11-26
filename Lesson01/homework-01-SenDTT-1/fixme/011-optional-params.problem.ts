const getName = (first: string, last?: string) => {
  if (last) {
    return `${first} ${last}`;
  }
  return first;
};

const name1 = getName("Theo");

const name2 = getName("Asaad", "Saad");

console.log(name1, name2);
