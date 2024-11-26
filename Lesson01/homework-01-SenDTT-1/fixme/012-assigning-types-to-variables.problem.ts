interface User {
  id: number;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

const defaultUser = {
  id: 1,
};

const getUserId = (user: Pick<User, "id">) => {
  return user.id;
};

console.log(getUserId(defaultUser));
