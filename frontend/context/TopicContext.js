// TopicContext.js
import { createContext, useContext, useState } from 'react';

const TopicContext = createContext();

export const TopicProvider = ({ children }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const setTopic = (topic) => {
    setSelectedTopic(topic);
    console.log("context::",topic)
  };

  return (
    <TopicContext.Provider value={{ selectedTopic, setTopic }}>
      {children}
    </TopicContext.Provider>
  );
};

export const useTopic = () => {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error('useTopic must be used within a TopicProvider');
  }
  return context;
};
