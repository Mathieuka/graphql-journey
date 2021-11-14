import { data } from './data';
import { prisma } from '../../prisma/client';

async function main() {
  let promises: Promise<unknown>[][] = [];
  const postPromises: Promise<unknown>[] = [];
  const commentPromises: Promise<unknown>[] = [];
  const userPromises: Promise<unknown>[] = [];

  data.user.forEach((user) => {
    const userPromise = prisma.user.create({
      data: {
        ...user,
      },
    });
    userPromises.push(userPromise);
  });

  data.post.forEach((post) => {
    const postPromise = prisma.post.create({
      data: {
        ...post,
      },
    });
    postPromises.push(postPromise);
  });

  data.comment.forEach((comment) => {
    const commentPromise = prisma.comment.create({
      data: {
        ...comment,
      },
    });
    commentPromises.push(commentPromise);
  });

  promises = [userPromises, postPromises, commentPromises];

  console.log('Seeding in progress...');
  for (let idx = 0; idx < promises.length; idx += 1) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.all([...promises[idx]]);

    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, idx * 1000));
  }
}

main()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    console.log('Seeding successful');
    await prisma.$disconnect();
  });
