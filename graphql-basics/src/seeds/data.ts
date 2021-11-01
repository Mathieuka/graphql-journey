interface UserDataType {
  organization: string;
  name: string;
  email: string;
  age: number | null;
  posts: string[];
  comments: string[]
}

const user: UserDataType[] = [
  {
    organization: 'pierre-org',
    name: 'Pierre',
    email: 'pierre@gmail.com',
    age: 32,
    posts: ['2', '3'],
    comments: ['3'],
  },
  {
    organization: 'lune-org',
    name: 'Lune',
    email: 'lune@gmail.com',
    age: 39,
    posts: ['1'],
    comments: [],
  },
  {
    organization: 'tom-org',
    name: 'Tom',
    email: 'tom@gmail.com',
    age: 45,
    posts: [],
    comments: ['1', '2'],
  },
];

interface PostDataType {
  title: string;
  body: string;
  published: boolean;
  author: string;
  comments: string[]
}

const post: PostDataType[] = [
  {
    title: 'Tutny toons',
    body: 'Hell yeah body',
    published: true,
    author: '2',
    comments: ['1', '2'],
  },
  {
    title: 'babydy boo',
    body: 'babydy boo body',
    published: true,
    author: '1',
    comments: [],
  },
  {
    title: 'Kily gury',
    body: 'Kily gury body',
    published: true,
    author: '1',
    comments: ['3'],
  },
];

interface CommentsDataType {
  body: string;
  author: string
  post: string
}

const comment: CommentsDataType[] = [
  {
    body: "That's my commentary",
    author: '3',
    post: '1',
  },
  {
    body: 'Yup very good',
    author: '3',
    post: '1',
  },
  {
    body: 'We wait and see',
    author: '1',
    post: '3',
  },
];

interface Data {
  user: UserDataType[];
  post: PostDataType[];
  comment: CommentsDataType[];
}

export const data: Data = { user, post, comment };
