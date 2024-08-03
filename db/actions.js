"use server";

import connectToDatabase from "./db";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import mongoose from "mongoose";
import { UserAnswer } from "./schema";

export async function getList(emailAddress) {
  const db = await connectToDatabase();
  const interviews = await db
    .collection("mockInterviews")
    .find({ createdBy: emailAddress })
    .toArray();

  return interviews;
}

export async function getData({
  jsonResponse,
  jobPosition,
  jobDescription,
  jobExperience,
  emailAddress,
}) {
  const db = await connectToDatabase();
  const resp = await db.collection("mockInterviews").insertOne({
    mockId: uuidv4(),
    jsonResponse: jsonResponse,
    jobPosition: jobPosition,
    jobDescription: jobDescription,
    jobExperience: jobExperience,
    createdBy: emailAddress,
    createdAt: moment().format("DD-MM-yyyy"),
  });
  return resp;
}

export async function getmyData(interviewId) {
  const db = await connectToDatabase();

  const objectId = new mongoose.Types.ObjectId(`${interviewId}`);

  const result = await db
    .collection("mockInterviews")
    .findOne({ _id: objectId });

  return result;
}

export const GetFeedback = async (interviewId) => {
  const db = await connectToDatabase();

  const result = await db
  .collection("UserAnswer")
  .find({ mockIdRef: interviewId })
  .sort({ _id: 1 })
  .toArray();

  return result;
};




export const GetResult=async (intData,aiquestion,myanswer,userAnswer,myfeedback,myrating,myemail)=>{

      const db = await connectToDatabase();

      const userAnswerEntry = new UserAnswer({
        mockIdRef: intData,
        question: aiquestion,
        correctAns: myanswer,
        userAns: userAnswer,
        feedback: myfeedback,
        rating: myrating,
        userEmail: myemail,
        createdAt: new Date(),
      });
      await userAnswerEntry.save();
      return userAnswerEntry;

    }