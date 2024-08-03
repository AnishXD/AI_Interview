"use client";

import React, { useEffect, useState } from 'react';
import InterviewItemCard from './InterviewItemCard';
import { useUser } from '@clerk/nextjs';
import { getList } from '@/db/actions';

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    try {
      const interviews = await getList(user.primaryEmailAddress.emailAddress)

      console.log(interviews);
      setInterviewList(interviews);
    } catch (err) {
      console.error("Error fetching interviews:", err);
      setError("Unable to fetch...... Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className='font-medium text-xl'>Previous Mock Interviews</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
        {interviewList.length > 0 ? (
          interviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))
        ) : (
          <div>No interviews found.</div>
        )}
      </div>
    </div>
  );
}

export default InterviewList;
