import mongoose from "mongoose";

const { Schema } = mongoose;

const userAnswerSchema = new Schema({
  mockIdRef: String,
  question: String,
  correctAns: String,
  userAns: String,
  feedback: String,
  rating: Number,
  userEmail: String,
  createdAt: { type: Date, default: Date.now },
});

const mockInterviewSchema = new Schema({
  mockId: String,
  jsonResponse: Object,
  jobPosition: String,
  jobDescription: String,
  jobExperience: String,
  createdBy: String,
  createdAt: String,
});

const UserAnswer = mongoose.models.UserAnswer || mongoose.model("UserAnswer", userAnswerSchema);
const MockInterview = mongoose.models.MockInterview || mongoose.model("MockInterview", mockInterviewSchema);

export { UserAnswer, MockInterview };
