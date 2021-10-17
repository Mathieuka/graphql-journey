export interface UserDataType {
  id: string;
  organization: string;
  name: string;
  email: string;
  age: number | null;
  posts: string[];
  comments: string[]
}

const users: Array<UserDataType> = [
  {
    id: '1',
    organization: 'pierre-org',
    name: 'Pierre',
    email: 'pierre@gmail.com',
    age: 32,
    posts: ['2', '3'],
    comments: ['3'],
  },
  {
    id: '2',
    organization: 'lune-org',
    name: 'Lune',
    email: 'lune@gmail.com',
    age: 39,
    posts: ['1'],
    comments: [],
  },
  {
    id: '3',
    organization: 'tom-org',
    name: 'Tom',
    email: 'tom@gmail.com',
    age: 45,
    posts: [],
    comments: ['1', '2'],
  },
];

export interface PostDataType {
  id: string;
  title: string;
  body: string;
  published: boolean;
  author: string;
  comments: string[]
}

const posts: Array<PostDataType> = [
  {
    id: '1',
    title: 'Tutny toons',
    body: 'Hell yeah body',
    published: true,
    author: '2',
    comments: ['1', '2'],
  },
  {
    id: '2',
    title: 'babydy boo',
    body: 'babydy boo body',
    published: true,
    author: '1',
    comments: [],
  },
  {
    id: '3',
    title: 'Kily gury',
    body: 'Kily gury body',
    published: true,
    author: '1',
    comments: ['3'],
  },
];

export interface CommentsDataType {
  id: string;
  body: string;
  author: string
  post: string
}

// eslint-disable-next-line import/no-mutable-exports
const comments: Array<CommentsDataType> = [
  {
    id: '1',
    body: "That's my commentary",
    author: '3',
    post: '1',
  },
  {
    id: '2',
    body: 'Yup very good',
    author: '3',
    post: '1',
  },
  {
    id: '3',
    body: 'We wait and see',
    author: '1',
    post: '3',
  },
];

export interface DB {
  users: UserDataType[];
  posts: PostDataType[];
  comments: CommentsDataType[];
}

const db: DB = {
  users,
  posts,
  comments,
};

export default db;
