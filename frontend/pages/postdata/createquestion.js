

import React, { useEffect, useState } from 'react';
import BaseURL from '@/data/BaseURL';
import axios from 'axios';

function CreateQuestion() {
  const [menuList, setMenuList] = useState(['--Select Subject--']);
  const [topics, setTopics] = useState(['--No Topic--']);
  const [uniqueMenu, setUniqueMenu] = useState(null);
  const [error, setError] = useState(null);
  const [subject, setSubject] = useState('--Select Subject--'); // Add subject state

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${BaseURL}/api/menu/`);
        const blog = await res.json();
        setMenuList(blog);
        const subjects = [...new Set(blog.map((item) => item.subject))];
        setUniqueMenu(['--Select Subject--', ...subjects]);
      } catch (e) {
        console.log(e);
      }
    };

    fetchMenu();
  }, []);

  const select_topic = (e) => {
    const subject = e.target.value;
    const getTopicsBySubject = (data, subject) => {
      return data
        .filter((item) => item.subject === subject)
        .map((item) => item.topic);
    };
    const topics = getTopicsBySubject(menuList, subject);
    setTopics(topics);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Validate subject
    const selectedSubject = formData.get('subject');
    if (selectedSubject === '--Select Subject--') {
      setError('Please select a valid Subject.');
      return;
    }

    // Validate Topic
    const selectedTopic = formData.get('topic');
    if (selectedTopic === '--No Topic--') {
      setError('Please select a valid topic.');
      return;
    }

    // Validate Question
    const question = formData.get('question');
    if (!question || question.trim() === '') {
      setError('Question should not be empty.');
      return;
    }

    // Validate options (A, B, C, D)
    const options = ['A', 'B', 'C', 'D'];
    for (const option of options) {
      const optionValue = formData.get(`option${option}`);
      if (!optionValue || !/^[a-zA-Z0-9]/.test(optionValue)) {
        setError(`Option ${option} should have at least 1 character or number.`);
        return;
      }
    }

    setError(null); // Clear previous error messages

    try {
      const res = await axios.post(`${BaseURL}/api/questionanswer/`, {
        subject: selectedSubject,
        topic: selectedTopic,
        question,
        optionA: formData.get('optionA'),
        optionB: formData.get('optionB'),
        optionC: formData.get('optionC'),
        optionD: formData.get('optionD'),
        // answer: formData.get('answer'),
        answer: formData.get(`option${formData.get('answer')}`)
      });

      // Handle the response as needed
      const result = res.data;
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-gray-200 px-2 mt-3 rounded border mx-3'>
      <form onSubmit={handleSubmit}>
        <div className='w-1/4 my-3 flex-col'>
          <div className='flex-col items-align justify-left'>
            <p className='flex justify-between'>
              <label>Subject</label>
              <span className='flex'>
                <select name='subject' onChange={select_topic} defaultValue={subject}>
                  {uniqueMenu &&
                    uniqueMenu.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                </select>
              </span>
            </p>
            <p className='flex justify-between'>
              <label>Topic</label>
              <span className='flex'>
                <select name='topic'>
                  {topics &&
                    topics.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                </select>
              </span>
            </p>
          </div>
        </div>
        <div className='OptionBox mt-3 px-2 flex-col justify-center items-center'>
          <div className='flex justify-start items-align mt-2'>
            <label>Question:</label>
            <textarea cols={45} rows={3} className='border border-2 rounded p-1 mx-2 ' name='question'></textarea>
          </div>
          <div className='flex justify-start items-align mt-2'>
            <label>A.</label>
            <input type='text' className='border border-2 rounded p-1 mx-2 ' name='optionA' size={50} />
          </div>
          <div className='flex justify-start items-align mt-2'>
            <label>B.</label>
            <input type='text' className='border border-2 rounded p-1 mx-2 ' name='optionB' size={50} />
          </div>
          <div className='flex justify-start items-align mt-2'>
            <label>C.</label>
            <input type='text' className='border border-2 rounded p-1 mx-2 ' name='optionC' size={50} />
          </div>
          <div className='flex justify-start items-align mt-2'>
            <label>D.</label>
            <input type='text' className='border border-2 rounded p-1 mx-2 ' name='optionD' size={50} />
          </div>
          <div className='flex justify-start items-align mt-2'>
            <label>Answer</label>
            <select name='answer' className='border border-2 rounded p-1 mx-2 '>
              <option value='A'>A</option>
              <option value='B'>B</option>
              <option value='C'>C</option>
              <option value='D'>D</option>
            </select>
          </div>
        </div>
        {error && <div className='text-red-500'>{error}</div>}
        <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded mt-4'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateQuestion;
