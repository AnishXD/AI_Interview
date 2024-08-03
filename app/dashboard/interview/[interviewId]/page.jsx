"use client";
import { Button } from "@/components/ui/button";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Webcam from "react-webcam";
import { getmyData } from "@/db/actions";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        console.log("client:", params.interviewId);
        const data = await getmyData(params.interviewId);
        setInterviewData(data);
      } catch (err) {
        console.error("Error fetching interview details:", err);
      }
    })();
  }, [params.interviewId]);

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col my-5 gap-5 p-5 rounded-lg border">
            {interviewData ? (
              <>
                <h2 className="text-lg">
                  <strong>Job Role/ Job Position:</strong> {interviewData.jobPosition}
                </h2>
                <h2 className="text-lg">
                  <strong>Job Description / Tech Stack:</strong> {interviewData.jobDescription}
                </h2>
                <h2 className="text-lg">
                  <strong>Years of Experience:</strong> {interviewData.jobExperience}
                </h2>
              </>
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
          <div className="gap-5 p-5 rounded-lg border-b-yellow-600 bg-yellow-200">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb /> <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>

        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                weight: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-10 bg-secondary rounded-lg border" />
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
