import { mongoCli as client } from "@/utils/db";

export const maxDuration = 60

export async function GET(request: Request, context: { params: { userId: string } }) {
  try {
    const { userId } = context.params;

    await client.connect()
    const db = client.db()
    const collection = db.collection('resume')

    const resume = await collection.findOne({ userId })

    return Response.json(resume)
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