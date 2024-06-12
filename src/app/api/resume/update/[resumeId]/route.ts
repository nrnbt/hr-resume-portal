import { mongoCli as client } from "@/utils/db";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function POST(request: Request, context: { params: { resumeId: string } }) {
  try {
    const { resumeId } = context.params;

    const resumeData = await request.json()

    const resume = {
      resume: resumeData.resume,
      userId: resumeData.userId,
      updatedAt: dayjs().toDate()
    };

    await client.connect()
    const db = client.db()
    const collection = db.collection('resume')


    const result = await collection.findOneAndUpdate({ _id: new ObjectId(resumeId) }, 
      { $set: resume },
      { returnDocument: 'after' }
    );
    if (result) {
      return Response.json(result)
    } else {
      return new Response("Resume update failed", { status: 500 });
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