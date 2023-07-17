import { db } from "../app/services/db";

async function main() {
  const user = await db.user.upsert({
    where: {
      uniqueid: "1234",
    },
    update: {},
    create: {
      uniqueid: "1234",
      anonname: "person",
      password: "password",
      isAdmin: false,
      posts: {
        create: new Array(4).fill(1).map((_, i) => ({
          id: `Post ${i}`,
          createdAt: new Date(),
          title: "First Test Post",
          content: "This is my first ever fake content.",
        })),
      },
    },
  });
  const newpost = await db.post.upsert({
    where: {
      id: "334",
    },
    update: {},
    create: {
      id: "Post 22",
      title: "This is the Memories of Alnabram",
      createdAt: new Date(),
      authorId: user.id,
      content:
        "More and more description of this cool korean memory is fake, someone said...",
    },
  });
  console.log(user);
  console.log(newpost);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
