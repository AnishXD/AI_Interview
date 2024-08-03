import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from "@/components/ui/button";

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?._id}`);
  };

  const onFeedbackPress = () => {
    router.push(`/dashboard/interview/${interview?._id}/feedback`);
  };

  if (!interview) {
    return <div>Interview data not available.</div>;
  }

  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-primary'>{interview?.jobPosition || 'Position not specified'}</h2>
      <h2 className='text-sm text-gray-600'>{interview?.jobExperience ? `${interview.jobExperience} Years of Experience` : 'Experience not specified'}</h2>
      <h2 className='text-xs text-gray-400'>{interview?.createdAt ? `Created At: ${interview.createdAt}` : 'Creation date not specified'}</h2>
      <div className='flex justify-between mt-2 gap-5'>
        <Button
          size='sm'
          onClick={onFeedbackPress}
          variant='outline'
          className='w-full'
          aria-label="View Feedback"
        >
          Feedback
        </Button>
        <Button
          size='sm'
          onClick={onStart}
          className='w-full'
          aria-label="Start Interview"
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
