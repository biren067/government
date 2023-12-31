import { useEffect, useState } from 'react';
import axios from 'axios';
import { TiTickOutline } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { useTopic } from '@/context/TopicContext';
import BaseURL from '@/data/BaseURL';

const Main = ({subject,topic}) => {
  const { selectedTopic } = useTopic();
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(0);
  const [answerResult, setAnswerResult] = useState('');
  const [inputMoveToQuestionValue, setInputMoveToQuestionValue] = useState('');
  useEffect(()=>{
    setCurrentQuestionIndex(0)
  },[subject,topic])
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        console.log("Selected value::",subject,topic) 
        // const {s,t} = selectedTopic.split("-");
        // console.log("subject and topic",s,t)
        // const response = await axios.get(`${BaseURL}/api/questionanswer/${s}/${t}`);
        const response = await axios.get(`${BaseURL}/api/questionanswer/${subject}/${topic}`);
        setQuestionData(response.data);
        setShowAnswer(false);
        setSelectedOption(null);
        const isLastQuestion = currentQuestionIndex === response.data?.length - 1;
        console.log("isLast",isLastQuestion,"index:",currentQuestionIndex , "Length:",response.data?.length ,"Records:",questionData)
        console.log("onchanged..")
        setIsLastQuestion(isLastQuestion)
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
    // const isLastQuestion = currentQuestionIndex === questionData?.length - 1;
    // console.log("isLast",isLastQuestion,"index:",currentQuestionIndex , "Length:",questionData?.length,"Records:",questionData)
    // setIsLastQuestion(isLastQuestion)
  }, [currentQuestionIndex,subject,topic]); 

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
  const handlePrevious = ()=>{
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  }
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

  const handleMoveToQuestion = (event)=>{
    
        if (event.key === 'Enter') {
          console.log("AFter Enter key::",inputMoveToQuestionValue)
          const value = parseInt(inputMoveToQuestionValue)-1
          if (questionData?.length>value)
           {setCurrentQuestionIndex(value)}
        }
  }
  const handleMoveToQuestionInputChange = (event)=>{
    console.log("Entering value::",event.target.value)
    setInputMoveToQuestionValue(event.target.value)
  }


  return (
    <div>
        <div className='flex justify-between'>
      <span>{subject}----{topic}</span>
      <div className='flex my-1 gap-2'>
        <span>Move to Question: <input type='text' className='border border-1 rounded' name='moveToQuestion' size={5} 
                                        onChange={handleMoveToQuestionInputChange} onKeyDown={handleMoveToQuestion}/></span>
        <span>Question: {currentQuestionIndex+1} out of {questionData?.length}</span>
      </div>
      </div>
      {/* <h1>Length:{questionData?.length}</h1> */}
      {/* <button onClick={fetchQuestion}>Fetch Question</button> */}

      {questionData && questionData.length > 0 && (
        <div className='my-2 bg-gray-100 text-gray-100  mx-3 border border-blue-500 rounded-t-md '>
          <p className='text-gray-100 bg-blue-500 border border-blue-700 rounded-t-md'>
            <span className='mx-1 px-1 font-bold'>Q. {currentQuestionIndex+1})&nbsp;</span>{questionData[currentQuestionIndex].question}</p>
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
                checking::{isLastQuestion}
            {isLastQuestion ? (
                <button onClick={handleSubmit} className='bg-blue-500 text-white px-1 py-1 rounded ml-3 my-4'>
                Submit
                </button>
            ) : (
                <> { currentQuestionIndex>0 &&
                <button
                onClick={handlePrevious}
                className='bg-blue-500 text-white px-2 py-1 rounded ml-3 my-4'
                >
                Previous
                </button> }

                <button
                onClick={handleSaveAndNext}
                className='bg-blue-500 text-white px-2 py-1 rounded ml-3 my-4'
                >
                Save & Next
                </button>
                </>
            )}
            {!isLastQuestion && (
                <button onClick={handleNext} className='bg-blue-500 text-white px-1 py-1 px-2 rounded ml-3 my-4'>
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
