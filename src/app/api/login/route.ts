import { mongoCli as client } from "@/utils/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'JWT_SECRET';

export async function POST(request: Request) {
  try {
    const userData = await request.json()
    const email = userData?.email
    const password = userData?.password

    await client.connect();
    const db = client.db();
    const collection = db.collection('users');

    const user = await collection.findOne({ email });

    if (!user) {
      return new Response("Хэрэглэгч олдсонгүй", { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return new Response("Имэйл эсвэл нууц үг буруу байна.", { status: 401 });
    }

    const token = jwt.sign({ email: user.email, userId: user._id, lastName: user.lastName, firstName: user.firstName, phone: user.phone }, secretKey, { expiresIn: '24h' });

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
