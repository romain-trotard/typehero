import { notFound } from 'next/navigation';
import { prisma } from '~/server/db';

interface Props {
  username: string;
}
export async function Profile({ username: usernameFromQuery }: Props) {
  const [, username] = decodeURIComponent(usernameFromQuery).split('@');
  const user = await prisma.user.findFirst({
    where: {
      name: {
        equals: username,
      },
    },
  });

  if (!user || !username) {
    notFound();
  }

  return (
    <>
      <h1>{user.id}</h1>
      <img src={user.image ?? ''} />

      <p>{user.email}</p>

      <h2 className="text-xl">Raw user:</h2>
      <pre>{JSON.stringify(user, null, 4)}</pre>
      {/* <button onClick={() => handleClick(user.id)}>update user name for id: {user.id}</button> */}
    </>
  );
}