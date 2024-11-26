const getName = (params: { first: string; last: string }) => {
  if (params.last) {
    return `${params.first} ${params.last}`;
  }
  return params.first;
};

const name1 = getName({
  first: "Theo",
  last: "",
});

const name2 = getName({
  first: "Asaad",
  last: "Saad",
});

console.log(name1, name2);
