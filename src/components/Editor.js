// Editor.js
import React, { useState } from 'react';
import JDoodleApi from '../services/JdoodleApi';

const Editor = ({ onCodeSubmit }) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleRunCode = async () => {
    try {
      const result = await JDoodleApi.executeCode('python3', code);
      setOutput(result.output);
    } catch (error) {
      console.error('Error running code:', error);
    }
  };

  return (
    <div>
      {/* Code editor component */}
      <textarea value={code} onChange={(e) => handleCodeChange(e.target.value)} />
      <button onClick={handleRunCode}>Run Code</button>
      {/* Display output */}
      <pre>{output}</pre>
    </div>
  );
};

export default Editor;
