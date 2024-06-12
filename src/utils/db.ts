import { MongoClient } from "mongodb";

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/hr_resume_portal'

export const mongoCli = new MongoClient(mongoUrl, {});
