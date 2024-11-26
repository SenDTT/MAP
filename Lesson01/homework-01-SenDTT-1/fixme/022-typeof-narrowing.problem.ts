const getAmount = (amount: number | { amount: number }) => {
  // implement code to return the amount
  if (typeof amount == "number") return amount;

  return amount.amount;
};

getAmount({ amount: 20 });
getAmount(20);
