interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface Post {
  id: string;
  title: string;
  body: string;
}

// How do we type this return statement so it's both User AND { posts: Post[] }
export const getDefaultUserAndPosts = (): User & { posts: Post[] } => {
  return {
    id: "1",
    firstName: "Asaad",
    lastName: "Saad",
    posts: [
      {
        id: "1",
        title: "How I eat so much vegetables",
        body: "It's pretty difficult",
      },
    ],
  };
};

const userAndPosts = getDefaultUserAndPosts();

console.log(userAndPosts.posts[0]);
