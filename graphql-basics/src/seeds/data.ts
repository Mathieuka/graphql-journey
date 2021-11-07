interface UserDataType {
  organization: string;
  name: string;
  email: string;
  age: number | null;
}

const user: UserDataType[] = [
  {
    organization: 'pierre-org',
    name: 'Pierre',
    email: 'pierre@gmail.com',
    age: 32,
  },
  {
    organization: 'lune-org',
    name: 'Lune',
    email: 'lune@gmail.com',
    age: 39,
  },
  {
    organization: 'tom-org',
    name: 'Tom',
    email: 'tom@gmail.com',
    age: 45,
  },
];

interface PostDataType {
  title: string;
  body: string;
  published: boolean;
  authorId: number;
}

const post: PostDataType[] = [
  {
    title: 'Tutny toons',
    body: 'Hell yeah body',
    published: true,
    authorId: 2,
  },
  {
    title: 'babydy boo',
    body: 'babydy boo body',
    published: true,
    authorId: 1,
  },
  {
    title: 'Kily gury',
    body: 'Kily gury body',
    published: true,
    authorId: 1,
  },
];

interface CommentsDataType {
  body: string;
  authorId: number
  postId: number
}

const comment: CommentsDataType[] = [
  {
    body: "That's my commentary",
    authorId: 3,
    postId: 1,
  },
  {
    body: 'Yup very good',
    authorId: 3,
    postId: 1,
  },
  {
    body: 'We wait and see',
    authorId: 1,
    postId: 3,
  },
];

interface Data {
  user: UserDataType[];
  post: PostDataType[];
  comment: CommentsDataType[];
}

export const data: Data = { user, post, comment };
