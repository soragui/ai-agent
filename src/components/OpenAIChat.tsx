import React, { useState } from 'react';
import OpenAI from 'openai';
import { Send, Key } from 'lucide-react';

const OpenAIChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) {
      setError('Please enter your OpenAI API key');
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });

      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: input }],
        model: 'gpt-3.5-turbo',
      });

      setResponse(completion.choices[0].message.content || 'No response');
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing your request. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">OpenAI Chat</h1>
      <div className="mb-4">
        <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-2">
          OpenAI API Key
        </label>
        <div className="flex">
          <input
            type="password"
            id="api-key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your OpenAI API key"
            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="bg-gray-100 p-2 rounded-r-md flex items-center">
            <Key size={20} className="text-gray-500" />
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          >
            {isLoading ? 'Sending...' : <Send size={20} />}
          </button>
        </div>
      </form>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {response && (
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="font-semibold mb-2">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default OpenAIChat;