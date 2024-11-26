
interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: "admin" | "user" | "super-admin";
  posts: Array<Post>;
}

interface Post {
  id: number;
  title: string;
}

// How do we ensure that makeUser ALWAYS returns a user?
const makeUser = () => {
  return {
    id: 1,
    firstName: "Asaad",
    lastName: "Saad",
    role: "admin",
    posts: [
      {
        id: 1,
        title: "How I eat so much cheese",
      },
      {
        id: 2,
        title: "Why I don't eat more vegetables",
      },
    ],
  };
};

const user = makeUser();

console.log(user.id);
console.log(user.firstName);
console.log(user.lastName);
console.log(user.role);

console.log(user.posts[0].id);
console.log(user.posts[0].title);
