import React from 'react';
import Header from './components/Header'
import Chat from './components/Chat';

function App() {

  return (
    <div className='p-5'>
      <Header />
      <div className='flex flex-col justify-center items-center'>
        <h1>Try <span className='text-blue-600'>Gemini</span> AI</h1>
        <p className='text-center text-gray-600'>Unlocking the potential of artificial intelligence, text-generative AI seamlessly crafts limitless content, revolutionizing communication and creativity with unparalleled efficiency and innovation.</p>
      </div>
      <Chat  />
    </div>
  );
}

export default App;