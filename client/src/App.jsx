import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import ResultsPanel from './components/ResultsPanel';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmitReview = async () => {
    if (!code.trim()) {
      setError("Please enter some code to analyze.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Dynamic Cloud Hooking: Uses VITE_API_URL if deployed, otherwise fallback to local 5001
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      
      const response = await fetch(`${API_URL}/api/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch review from the server.');
      }

      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>

      <header className="app-header">
        <h1 className="gradient-text">AI Code Reviewer</h1>
        <p className="subtitle">Agentic Multi-Model Analysis for your Codebase</p>
      </header>

      <main className="main-content">
        <CodeEditor 
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          onSubmit={handleSubmitReview}
          loading={loading}
        />

        {error && (
          <div className="error-toast glass-panel">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {loading && <LoadingSpinner />}
        
        {!loading && results && <ResultsPanel results={results} />}
      </main>
    </div>
  );
}

export default App;
