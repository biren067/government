import { useEffect, useState } from 'react';
import axios from 'axios';
import { TiTickOutline } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import BaseURL from '@/data/BaseURL';

const Main = () => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(0);
  const [answerResult, setAnswerResult] = useState('');
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`${BaseURL}/api/questionanswer/`);
        setQuestionData(response.data);
        setShowAnswer(false);
        setSelectedOption(null);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
    const isLastQuestion = currentQuestionIndex === questionData?.length - 1;
    setIsLastQuestion(isLastQuestion)
  }, [currentQuestionIndex]); 

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    let isCorrect = false

        switch(e.target.value){
        case 'A':
          isCorrect = questionData[currentQuestionIndex].optionA === questionData[currentQuestionIndex].answer;
            break
          case 'B':
            // console.log("B is selected:",selectedOption)
            isCorrect = questionData[currentQuestionIndex].optionB === questionData[currentQuestionIndex].answer;
            console.log("B is selected:",selectedOption,isCorrect)
            break
        case 'C':
            isCorrect = questionData[currentQuestionIndex].optionC === questionData[currentQuestionIndex].answer;
            break
        case 'D':
            isCorrect = questionData[currentQuestionIndex].optionD === questionData[currentQuestionIndex].answer;
            break
        default:
            console.log(selectedOption)
    }

    setAnswerResult(isCorrect);
  };

  
  const handleShowAnswer = () => {
    setShowAnswer(true);

  };
  const handleSaveAndNext = () => {
    // Save the answer for the current question (use your save logic)
    // ...

    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleNext = () => {
    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = () => {
    // Handle the submission logic
    // ...

    // Optionally, reset the state or redirect to a new page
    setQuestionData(null);
    setSelectedOption(null);
    setShowAnswer(false);
    setCurrentQuestionIndex(0);
  };



  return (
    <div>
      <h1>Question and Options</h1>
      {/* <button onClick={fetchQuestion}>Fetch Question</button> */}

      {questionData && questionData.length > 0 && (
        <div className='my-2 bg-gray-100 text-gray-100  mx-3 border border-blue-700 rounded-t-md '>
          <p className='text-gray-100 bg-blue-700 border border-blue-700 rounded-t-md'>
            <span className='mx-1 px-1 font-bold'>Question: {currentQuestionIndex+1}:</span>{questionData[currentQuestionIndex].question}</p>
          <form className='px-3 text-gray-900 font-semibold'>
            <label>
              <input
                type="radio"
                name="options"
                value="A"
                checked={selectedOption === 'A'}
                onChange={handleOptionChange}
              />
              {questionData[currentQuestionIndex].optionA}
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
              {questionData[currentQuestionIndex].optionB}
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
              {questionData[currentQuestionIndex].optionC}
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
              {questionData[currentQuestionIndex].optionD}
            </label>
          </form>
          <br />
          <div className='flex justify-between px-3'>
          <button
            onClick={handleShowAnswer}
            className='bg-green-500 text-white px-1 py-1 rounded  my-4'
          >
            Show Answer
          </button>
            <div>
            {isLastQuestion ? (
                <button onClick={handleSubmit} className='bg-blue-500 text-white px-1 py-1 rounded ml-3 my-4'>
                Submit
                </button>
            ) : (
                <button
                onClick={handleSaveAndNext}
                className='bg-blue-500 text-white px-1 py-1 rounded ml-3 my-4'
                >
                Save & Next
                </button>
            )}
            {!isLastQuestion && (
                <button onClick={handleNext} className='bg-green-500 text-white px-1 py-1 rounded ml-3 my-4'>
                Next
                </button>
            )}
            </div>
          </div>
          <p>{ selectedOption !== null ?(answerResult?<TiTickOutline className="text-green-500" style={{ fontSize: '4em' }}/>:
                        <ImCross className="text-red-500 m-3"style={{ fontSize: '2em' }}/>):(<></>) }</p>
          {showAnswer && (
            <span>
              <p className='text-blue-900 font-semibold'>Correct Answer: {questionData[currentQuestionIndex].answer}</p>
              <p className='text-green-900 '>Description: {questionData[currentQuestionIndex].explanation}</p>
            </span>
          )}
        </div>
      )
      }
    </div>
  );
};

export default Main;
