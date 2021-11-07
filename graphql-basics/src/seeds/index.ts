import { data } from './data';
import { prisma } from '../../prisma/client';

async function main() {
  const promises: Promise<unknown>[] = [];

  data.user.forEach((user) => {
    const userPromise = prisma.user.create({
      data: {
        ...user,
      },
    });
    promises.push(userPromise);
  });

  data.post.forEach((post) => {
    const postPromise = prisma.post.create({
      data: {
        ...post,
      },
    });
    promises.push(postPromise);
  });

  data.comment.forEach((comment) => {
    const commentPromise = prisma.comment.create({
      data: {
        ...comment,
      },
    });
    promises.push(commentPromise);
  });

  await Promise.all([...promises]);
}

main()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    console.log('Seeding successful');
    await prisma.$disconnect();
  });
