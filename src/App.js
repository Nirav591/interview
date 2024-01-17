// App.js
import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Problem from './components/Problem';
import Result from './components/Result';
import JdoodleApi from './services/JdoodleApi';

const App = () => {
  const [problems, setProblems] = useState([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [results, setResults] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch problems from an API or use a static array (for demonstration purposes)
    const fetchProblems = async () => {
      try {
        // Assume an API call to fetch questions
        // const response = await fetch('API_ENDPOINT/questions');
        // const data = await response.json();

        // For demo, using a static array
        const staticQuestions = [
          {
            question: 'Write a function to add two numbers.',
            testCases: ['add(2, 3)', 'add(-1, 1)', 'add(0, 0)'],
          },
          // Add more questions here
        ];

        setProblems(staticQuestions);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchProblems();
  }, []);

  const handleCodeSubmit = (code) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, code]);
  };

  const handleNextProblem = () => {
    setCurrentProblemIndex((prevIndex) => prevIndex + 1);
  };

  const handleResultsSubmit = async () => {
    setIsLoading(true);

    // Validate each answer against the test cases using JDoodle's REST API
    try {
      const resultsPromises = userAnswers.map(async (answer, index) => {
        const result = await JdoodleApi.executeCode('python3', answer);
        return {
          questionIndex: index,
          output: result.output,
        };
      });

      const resultsData = await Promise.all(resultsPromises);
      setResults(resultsData);

      // Calculate achievements based on results (for demonstration purposes)
      const passedCount = resultsData.filter((result) => result.output === 'All test cases passed').length;
      const totalQuestions = problems.length;
      const passedPercentage = (passedCount / totalQuestions) * 100;

      if (passedPercentage === 100) {
        setAchievements(['Master Coder']);
      } else if (passedPercentage >= 50) {
        setAchievements(['Novice Coder']);
      } else {
        setAchievements(['Beginner Coder']);
      }
    } catch (error) {
      console.error('Error submitting results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {currentProblemIndex < problems.length ? (
        <>
          <Problem
            question={problems[currentProblemIndex].question}
            testCases={problems[currentProblemIndex].testCases}
          />
          <Editor onCodeSubmit={handleCodeSubmit} />
          <button onClick={handleNextProblem}>Next Problem</button>
        </>
      ) : (
        <>
          <Result results={results} />
          <button onClick={handleResultsSubmit}>Submit Results</button>
        </>
      )}
      <div>
        <h3>Progress Bar</h3>
        <progress value={currentProblemIndex + 1} max={problems.length}></progress>
      </div>
      <div>
        <h3>Achievements</h3>
        <ul>
          {achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
