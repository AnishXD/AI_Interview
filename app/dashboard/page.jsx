import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className='p-10'>
      <p className='font-bold text-2xl'>Dashboard</p>
      <p className='text-gray-500'>Create and Start your AI Mockup Interview</p>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>
      {/* Previous Interview List */}
      <InterviewList/>
    </div>
  )
}

export default Dashboard