// JdoodleApi.js
const JdoodleApi = {
  baseUrl: 'https://www.jdoodle.com/api/v1/execute',

  executeCode: async (language, code, stdin = '') => {
    const requestBody = {
      script: code,
      language,
      stdin,
      versionIndex: '0',
      clientId: process.env.REACT_APP_JDOODLE_CLIENT_ID,
      clientSecret: process.env.REACT_APP_JDOODLE_CLIENT_SECRET,
    };

    try {
      const response = await fetch(JdoodleApi.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Execution failed');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error executing code:', error);
      throw error;
    }
  },
};

export default JdoodleApi;
