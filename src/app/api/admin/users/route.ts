import { mongoCli as client } from "@/utils/db";
import { NextRequest } from "next/server";

export const maxDuration = 60

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')
    const firstName = request.nextUrl.searchParams.get('firstName')
    const lastName = request.nextUrl.searchParams.get('lastName')
    const phone = request.nextUrl.searchParams.get('phone')

    await client.connect()
    const db = client.db()
    const collection = db.collection('users')

    const query = { 
      email: { $regex: email, $options: 'i' },
      firstName: { $regex: firstName, $options: 'i' },
      lastName: { $regex: lastName, $options: 'i' },
      phone: { $regex: phone, $options: 'i' },
    };

    const users = await collection.find(query).toArray()
    return Response.json(users)
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