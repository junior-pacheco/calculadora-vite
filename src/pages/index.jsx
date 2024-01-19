import React, { useState } from 'react';
import '../pages/index';

const ScientificCalculator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [isScientificMode, setIsScientificMode] = useState(false);

  const toggleScientificMode = () => {
    setIsScientificMode((prevMode) => !prevMode);
  };

  const addToDisplay = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const clearDisplay = () => {
    setInput('');
  };

  const getCurrentDateTime = () => {
    const timestamp = new Date();
    const formattedDateTime = timestamp.toLocaleString();
    return formattedDateTime;
  };

  const calculate = () => {
    try {
      const result = eval(input);
      const timestamp = getCurrentDateTime();
      setHistory((prevHistory) => [...prevHistory, { expression: input, result, timestamp }]);
      setInput(String(result));
    } catch (error) {
      setInput('Error');
    }
  };

  const scientificButtons = [
    'sin', 'cos', 'tan', '^',
    'sqrt', 'log', '(', ')'
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#99bcff] to-[#4b6cb7] gap-8">
      <div className="p-8 rounded shadow bg-gradient-to-br from-[#4b6cb7] to-[#1d3b73]">
        <input
          type="text"
          className="w-full p-2 mb-4 text-lg border bg-white text-gray-800 rounded"
          value={input}
          readOnly
        />
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '/'].map((value) => (
            <button
              key={value}
              className="w-full h-12 text-xl bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none"
              onClick={() => addToDisplay(value)}
            >
              {value}
            </button>
          ))}
          {['4', '5', '6', '*'].map((value) => (
            <button
              key={value}
              className="w-full h-12 text-xl bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none"
              onClick={() => addToDisplay(value)}
            >
              {value}
            </button>
          ))}
          {['1', '2', '3', '-'].map((value) => (
            <button
              key={value}
              className="w-full h-12 text-xl bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none"
              onClick={() => addToDisplay(value)}
            >
              {value}
            </button>
          ))}
          {['0', '.', '=', '+'].map((value) => (
            <button
              key={value}
              className="w-full h-12 text-xl bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none"
              onClick={() => (value === '=' ? calculate() : addToDisplay(value))}
            >
              {value}
            </button>
          ))}
          <button
            className="col-span-2 w-full h-12 text-xl bg-red-500 hover:bg-red-600 text-white rounded focus:outline-none"
            onClick={clearDisplay}
          >
            C
          </button>
          <button
            className="col-span-2 w-full h-12 text-sm bg-teal-500 hover:bg-gray-600 text-white rounded focus:outline-none"
            onClick={toggleScientificMode}
          >
            {isScientificMode ? 'Modo Normal' : 'Modo Científico'}
          </button>
          {isScientificMode && scientificButtons.map((value) => (
            <button
              key={value}
              className="w-full h-12 text-xl bg-gray-500 hover:bg-gray-600 text-white rounded focus:outline-none"
              onClick={() => addToDisplay(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <div className='flex flex-col rounded-lg bg-gradient-to-br from-[#4b6cb7] to-[#1d3b73] h-[80%] w-[50%] p-4'>
        <h2 className="text-lg font-semibold mb-2 text-white">Historial:</h2>
        <ul className="list-disc pl-6 overflow-auto">
          {history.map((item, index) => (
            <li key={index} className="text-white">
              <div>{`${item.expression} = ${item.result}`}</div>
              <div className="text-sm">{item.timestamp}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ScientificCalculator;
