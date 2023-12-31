import BaseURL from '@/data/BaseURL';
import Link from 'next/link';
import { useTopic } from '@/context/TopicContext';
import Main from '@/components/Main'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = () => {
  const {setTopic} = useTopic()
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    // Fetch menu data using Axios
    axios.get(`${BaseURL}/api/menu/`)
      .then(response => {
        const originalData= response.data
        const groupedData = originalData.reduce((acc, item) => {
          const existingItem = acc.find((group) => group.subject === item.subject);
      
          if (existingItem) {
            existingItem.topics.push(item.topic);
          } else {
            acc.push({ subject: item.subject, topics: [item.topic] });
          }
      
          return acc;
        }, []);

        setMenuData(groupedData);
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
      });
  }, []);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };
  return (
    <header>
      {/* <h1>{JSON.stringify(menuData)}</h1> */}
      <nav>
        <ul className="menu">
          <li className='mx-2 px-1'>
          <Link href={`/homepage`}>
                       Home
                      </Link>
          </li>
          {menuData.map((menuItem, index) => (
            <li key={index} className={`menu-item ${menuItem.topics.length > 0 ? 'submenu' : ''}`}>
              <span>{menuItem.subject}</span>
              {menuItem.topics.length > 0 && (
                <ul className="submenu-items">
                  {menuItem.topics.map((topic, subIndex) => (
                    // <li className="pointer-mouse" key={subIndex}  onClick={() => setTopic( `${menuItem.subject}-${topic}` )}>
                    <li className="pointer-mouse" key={subIndex}  onClick={() => handleTopicClick( `${menuItem.subject}-${topic}` )}>
                      {/* <Link href={`/services/${encodeURIComponent(topic)}`}> */}
                        {topic}
                      {/* </Link> */}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <Main subject={selectedTopic && selectedTopic.split("-")[0]} topic={selectedTopic && selectedTopic.split("-")[1]}/>
      {/* Add styling for the header */}
      <style jsx>{`
        header {
          // background-color: #333;
          padding: 1rem;
          // color: white;
        }

        nav {
          background-color: #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color:white;
        }

        ul {
          list-style-type: none;
          display: flex;
          padding: 0;
          margin: 0;
        }

        li.menu-item  {
          margin-right: 1rem;
        }

        a {
          text-decoration: none;
          color: white;
        }

        .submenu {
          position: relative;
        }

        .submenu-items{
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: #555;
          // padding: 0.5rem;
          // border-bottom: 1 solid red;
          list-style-type: none;
          z-index: 1;
        }

        .submenu:hover .submenu-items {
          display: block;
          width:250px;
        }
        // .submenu-items {
        //   display: inline;  // or display: inline-block;
        //   padding: 0;
        //   margin: 0;
        // }

        .submenu-items li:hover {
          background-color:green;
          // padding:0.5rem;
          }

      `}</style>
    </header>
  );
};

export default Menu;

