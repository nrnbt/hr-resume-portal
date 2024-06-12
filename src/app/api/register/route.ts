import { mongoCli as client } from "@/utils/db";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const userData = await request.json()
    const email = userData?.email

    await client.connect()
    const db = client.db()
    const collection = db.collection('users')

    const user = await collection.findOne({ email });

    if (user) {
      return new Response("User already exists!", { status: 500 });
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10)
      userData.password = hashedPassword

      const result = await collection.insertOne(userData);

      if (result.insertedId) {
        return new Response('Хэрэглэгч амжилттай бүртгэгдлээ', {
          status: 200,
        })
      } else {
        return new Response("Insertion failed", { status: 500 });
      }
    }
  
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("Internal Server Error", { status: 500 });
  } finally {
    await client.close();
  }
}