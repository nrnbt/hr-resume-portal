import { MongoClient } from "mongodb";

const mongoUrl = 'mongodb+srv://se20d008:AR1ve4EE95htfcES@cluster0.hpwj0as.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

export const mongoCli = new MongoClient(mongoUrl, {});
