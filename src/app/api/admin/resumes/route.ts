import { mongoCli as client } from "@/utils/db";
import { NextRequest } from "next/server";

export const maxDuration = 300

export async function GET(request: NextRequest) {
  try {
    const registerNo = request.nextUrl.searchParams.get('registerNo')
    const phoneNo = request.nextUrl.searchParams.get('phoneNo')
    const jobExperienceNo = request.nextUrl.searchParams.get('jobExperienceNo')
    const educationNo = request.nextUrl.searchParams.get('educationNo')
    const updatedAtGte = request.nextUrl.searchParams.get('updatedAtGte')
    const updatedAtLte = request.nextUrl.searchParams.get('updatedAtLte')

    await client.connect();
    const db = client.db();
    const collection = db.collection('resume');
    
    const query: any = {};
    
    if (registerNo) {
      query['resume.general.registerNo'] = { $regex: registerNo, $options: 'i' };
    }
    
    if (phoneNo) {
      query['resume.contacts.phoneNo'] = { $regex: phoneNo, $options: 'i' };
    }
    
    if (typeof jobExperienceNo === 'number') {
      query['resume.jobExperience'] = { $size: jobExperienceNo };
    }
    
    if (typeof educationNo === 'number') {
      query['resume.education'] = { $size: educationNo };
    }
    
    if (updatedAtGte) {
      query.updatedAt = { ...query.updatedAt, $gte: new Date(updatedAtGte) };
    }
    
    if (updatedAtLte) {
      query.updatedAt = { ...query.updatedAt, $lte: new Date(updatedAtLte) };
    }
    
    const resumes = await collection.find(query).toArray();
    return Response.json(resumes);
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