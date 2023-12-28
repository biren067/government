import { useEffect, useState } from 'react';
import axios from 'axios';
import BaseURL from '@/data/BaseURL';

const Main = () => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`${BaseURL}/api/questionanswer/`);
        setQuestionData(response.data);
        setShowAnswer(false);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, []); 

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  return (
    <div>
      <h1>Question and Options</h1>
      {/* <button onClick={fetchQuestion}>Fetch Question</button> */}

      {questionData && questionData.map((item,index)=>(
        <div className='my-2 bg-gray-400 text-gray-100 p-2'>
          <p className='text-green-800'><span className='mx-1 px-1 font-bold text-green-800'>Question:</span>{item.question}</p>
          <form className='px-3'>
            <label>
              <input
                type="radio"
                name="options"
                value="A"
                checked={selectedOption === 'A'}
                onChange={handleOptionChange}
              />
              {item.optionA}
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="options"
                value="B"
                checked={selectedOption === 'B'}
                onChange={handleOptionChange}
              />
              {item.optionB}
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="options"
                value="C"
                checked={selectedOption === 'C'}
                onChange={handleOptionChange}
              />
              {item.optionC}
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="options"
                value="D"
                checked={selectedOption === 'D'}
                onChange={handleOptionChange}
              />
              {item.optionD}
            </label>
          </form>
          <br />
          <button onClick={handleShowAnswer}>Show Answer</button>
          {showAnswer && <p>Correct Answer: {item.answer}</p>}
        </div>
      ))
      }
    </div>
  );
};

export default Main;
