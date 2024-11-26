interface User {
  id: string;
  firstName: string;
  lastName: string;
}

const createThenGetUser = async (
  createUser: () => Promise<string>,
  getUser: (id: string) => Promise<User>
): Promise<User> => {
  const userId: string = await createUser();

  const user = await getUser(userId);

  return user;
};

const user = await createThenGetUser(
  async () => "123",
  async (id: string) => ({
    id,
    firstName: "Asaad",
    lastName: "Saad",
  })
);
