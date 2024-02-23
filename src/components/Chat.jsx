import React, { useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Button } from 'antd';
import Markdown from 'react-markdown';
import TextArea from 'antd/es/input/TextArea';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleGenerateOutput = async () => {
    setIsLoading(true);
    const MODEL_NAME = "gemini-1.0-pro-001";
    const API_KEY = 'AIzaSyB7UDKTIsi4OCEGc7AhFCeqoURReAGyH54';

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const parts = [
      { text: value },
    ];

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });

      const response = result.response;
      setMessages([...messages, { value, text: response.text() }]);
      setValue('');
    } catch (error) {
      console.error("Error generating content:", error);
      setMessages([...messages, { value: 'Error', text: "Error generating content. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
      <div>
        <div>
          {messages.map((message, index) => (
            <div key={index} className='shadow-2xl p-2 rounded-lg bg-slate-100 mt-5'>
              <h5>You <br />{message.value}</h5>
              <Markdown
                components={{
                  pre: ({ node, ...props }) => (
                    <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-black/10 rounded-lg p-1" {...props} />
                  ),
                }}
                className="text-sm overflow-hidden leading-7"
              >
                {message.text}
              </Markdown>
            </div>
          ))}
        </div>
        <div>
          <div className='flex flex-row gap-3 justify-center items-center mt-3 pb-3'>
            <TextArea placeholder='Enter your prompt here' value={value} onChange={handleInputChange} rows={2} cols={80} className='rounded-md shadow-md' />
            <Button onClick={handleGenerateOutput} className='bg-blue-600 text-white font-semibold shadow-md'>{isLoading ? 'Generating...' : 'Send'}</Button>
          </div>
        </div>
      </div>
  );
};

export default Chat;
