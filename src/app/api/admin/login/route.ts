import { mongoCli as client } from "@/utils/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const maxDuration = 60
const secretKey = process.env.JWT_SECRET || 'JWT_SECRET';

export async function POST(request: Request) {
  try {
    const userData = await request.json()
    const username = userData?.username
    const password = userData?.password

    await client.connect();
    const db = client.db();
    const collection = db.collection('admin');

    const user = await collection.findOne({ username });

    if (!user) {
      return new Response("Хэрэглэгч олдсонгүй", { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return new Response("Имэйл эсвэл нууц үг буруу байна.", { status: 401 });
    }

    const token = jwt.sign({ email: user.email, userId: user._id, lastName: user.lastName, firstName: user.firstName, }, secretKey, { expiresIn: '24h' });

    return new Response(JSON.stringify({ token }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("Internal Server Error", { status: 500 });
  } finally {
    await client.close();
  }
}
