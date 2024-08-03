"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { chatSession } from "@/db/GeminiAIModal";
import { GetResult } from "@/db/actions";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      const lastResult = results[results.length - 1];
      setUserAnswer((prevAns) => prevAns + lastResult.transcript + " ");
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswerInDb();
    }
  }, []);

  const handleRecordButtonClick = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  if (error) {
    console.log(error);
  }

  const UpdateUserAnswerInDb = async () => {
    setLoading(true);
    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.Question +
      ", User Answer : " +
      userAnswer +
      ", Depends on question and user answer for given interview question " +
      "please give us rating for answer and feedback as area of improvement if any" +
      " in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");


      const intData=interviewData;
      const JsonFeedbackResp = JSON.parse(mockJsonResp);
      const aiquestion = mockInterviewQuestion[activeQuestionIndex]?.Question;
      const myanswer = mockInterviewQuestion[activeQuestionIndex]?.answer;
      const myfeedback = JsonFeedbackResp?.feedback;
      const myrating = JsonFeedbackResp?.rating;
      const myemail = user?.primaryEmailAddress?.emailAddress;

      // MongoDB and Mongoose integration
      const myfuncData = GetResult(
        intData,
        aiquestion,
        myanswer,
        userAnswer,
        myfeedback,
        myrating,
        myemail
      );

      console.log(myfuncData);

      toast("User Answer Recorded Successfully");

    } catch (err) {
      console.log("Error fetching feedback:", err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image src={"/rec.png"} alt="recording" width={400} height={300} className="absolute" />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={handleRecordButtonClick}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex items-center">
            <Mic />
            Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      console.log(results)
    </div>
  );
}

export default RecordAnswerSection;
