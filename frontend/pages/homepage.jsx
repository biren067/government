import React from 'react'

function homepage() {
  return (
    <div>
      <div className='p-2 bg-gray-100 text-green-800 border border-2 rounded border-cyan-200'> 
      <h1 className='font-bold'> JSSC Syllabus</h1>
      <div className='card  bg-green-500 p-2 mb-3 border border-2 rounded border-cyan-200' >
        <h2 className='underline text-blue-900 font-bold'>Paper I</h2>
        <div className='flex flex-col justify-start text-green-900 font-bold'>
          <div className='flex justify-between'>
            <span>Engligh Paper</span>
            <span>60 Question</span>
          </div>
          <div className='flex justify-between'>
            <span>Hindi Paper</span>
            <span>60 Question</span>
          </div>
        </div>
      </div>

      {/* paper 2 */}
      <div className='card border border-2 rounded border-cyan-200 bg-green-500 p-2 mb-3'>
        <h2 className='underline text-blue-900 font-bold'>Paper II</h2>
        <div className='flex flex-col justify-start text-green-900 font-bold'>
          <div className='flex justify-between'>
            <span>Engligh Paper</span>
            <span>100 Question</span>
          </div>
        </div>
      </div>
            {/* paper 3 */}
      <div className='card border border-2 rounded border-cyan-200 bg-green-500 p-2 mb-3'>
        <h2 className='underline text-blue-900 font-bold'>Paper III</h2>
        <div className='flex flex-col justify-start text-green-900 font-bold'>
          <div className='flex justify-between'>
            <span>General Studies</span>
            <span>30 Question</span>
          </div>
          <div className='flex justify-between'>
            <span>General Science</span>
            <span>20 Question</span>
          </div>
          <div className='flex justify-between'>
            <span>Mathematics</span>
            <span>20 Question</span>
          </div>
          <div className='flex justify-between'>
            <span>Reasoning</span>
            <span>20 Question</span>
          </div>
          <div className='flex justify-between'>
            <span>Computer</span>
            <span>20 Question</span>
          </div>
          <div className='flex justify-between'>
            <span>Jharkhand</span>
            <span>40 Question</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default homepage
