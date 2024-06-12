import { mongoCli as client } from "@/utils/db";
import { ObjectId } from "mongodb";

export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    await client.connect()
    const db = client.db()
    const collection = db.collection('resume')

    const resume = await collection.findOne({ _id: new ObjectId(id) })

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