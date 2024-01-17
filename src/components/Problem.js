// Problem.js
import React from 'react';

const Problem = ({ question, testCases }) => {
  return (
    <div>
      <h2>{question}</h2>
      {/* Display test cases */}
      <ul>
        {testCases.map((testCase, index) => (
          <li key={index}>{testCase}</li>
        ))}
      </ul>
    </div>
  );
};

export default Problem;
