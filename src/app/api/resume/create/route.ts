import { mongoCli as client } from "@/utils/db";
import dayjs from "dayjs";

export async function POST(request: Request) {
  try {
    const resumeData = await request.json()

    const resume = {
      resume: resumeData.resume,
      userId: resumeData.userId,
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate()
    };

    await client.connect()
    const db = client.db()
    const collection = db.collection('resume')

    const result = await collection.insertOne(resume);

    if (result.insertedId) {
      const intertedResume = await collection.findOne({ _id: result.insertedId });
      return Response.json(intertedResume)
    } else {
      return new Response("Resume insertion failed", { status: 500 });
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