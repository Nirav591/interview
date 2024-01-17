// Result.js
import React from 'react';

const Result = ({ results }) => {
  return (
    <div>
      <h2>Results</h2>
      {/* Display detailed results */}
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
