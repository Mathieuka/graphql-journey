interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  posts: string[];
}

export const users: Array<User> = [
  {
    id: '1',
    name: 'Pierre',
    email: 'pierre@gmail.com',
    age: 32,
    posts: ['2', '3'],
  },
  {
    id: '2',
    name: 'Lune',
    email: 'lune@gmail.com',
    age: 39,
    posts: ['1'],
  },
  {
    id: '3',
    name: 'Tom',
    email: 'tom@gmail.com',
    age: 45,
    posts: [],
  },
];

interface Post {
  id: string;
  title: string;
  body: string;
  published: boolean;
  author: string;
}

export const posts: Array<Post> = [
  {
    id: '1',
    title: 'Tutny toons',
    body: 'Hell yeah body',
    published: true,
    author: '2',
  },
  {
    id: '2',
    title: 'babydy boo',
    body: 'babydy boo body',
    published: true,
    author: '1',
  },
  {
    id: '3',
    title: 'Kily gury',
    body: 'Kily gury body',
    published: true,
    author: '1',
  },
];

interface Commentary {
  id: string;
  body: string;
}
export const commentaries: Array<Commentary> = [
  {
    id: '1',
    body: "That's my commentary",
  },
  {
    id: '2',
    body: 'Yup very good',
  },
  {
    id: '3',
    body: 'We wait and see',
  },
];
