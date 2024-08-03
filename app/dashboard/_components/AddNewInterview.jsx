"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.jsx";
import { chatSession } from "@/db/GeminiAIModal";
import { getData } from "@/db/actions";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobDescription, jobExperience, jobPosition);

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}. Based on this information, please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format. Provide Question and Answer as fields in JSON.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      // console.log(JSON.parse(MockJsonResp));
      setJsonResponse(MockJsonResp);

      if (MockJsonResp) {
        const resp = await getData({
          emailAddress: user.primaryEmailAddress.emailAddress,
          jsonResponse: MockJsonResp,
          jobDescription: jobDescription,
          jobExperience: jobExperience,
          jobPosition: jobPosition,
        });

        if (resp.insertedId) {
          setOpenDialog(false);
          router.push("/dashboard/interview/" + resp.insertedId);
        }
      } else {
        console.log("Error at Add New Interview");
      }
    } catch (err) {
      console.error("Error creating interview:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        <div className="text-lg text-center">+ Add New </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Tell us more About your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div className="">
                  <div>
                    Add Details about your job position/role, Job Description
                    and years of experience
                  </div>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(e) => {
                        setJobPosition(e.target.value);
                      }}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description / Tech Stack (In short)</label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJs, MySql etc"
                      required
                      onChange={(e) => {
                        setJobDescription(e.target.value);
                      }}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max="50"
                      required
                      onChange={(e) => {
                        setJobExperience(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setOpenDialog(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
