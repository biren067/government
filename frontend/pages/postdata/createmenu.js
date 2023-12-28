import React, { useState } from 'react';
import axios from 'axios';
import BaseURL from '@/data/BaseURL';

function CreateMenu() {
  const [formData, setFormData] = useState({
    subject: '',
    topic: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate text fields
    if (!formData.subject || !formData.topic) {
      setError('Both Subject and Topic are required.');
      return;
    }

    const textValidator = /^(?=.*[a-zA-Z0-9]).{1,}$/;

    if (!textValidator.test(formData.subject) || !textValidator.test(formData.topic)) {
      setError('Text should have at least one character or one number.');
      return;
    }

    setError('');

    try {
      const res = await axios.post(`${BaseURL}/api/menu/`, formData);
      console.log("Data",formData)
      // Handle the response as needed
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-gray-200 px-2 mt-3 rounded border mx-3'>
      <form onSubmit={handleSubmit}>
        <div className='OptionBox mt-3 px-2 flex-col justify-center items-center'>
          <div className='flex justify-start items-align mt-2'>
            <label>Subject:</label>
            <input
              type='text'
              className='border border-2 rounded p-1 mx-2'
              name='subject'
              size={50}
              value={formData.subject}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex justify-start items-align mt-2'>
            <label>Topic:</label>
            <input
              type='text'
              className='border border-2 rounded p-1 mx-2'
              name='topic'
              size={50}
              value={formData.topic}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded mt-4'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateMenu;