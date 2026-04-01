import React from 'react';

const CodeEditor = ({ code, setCode, language, setLanguage, onSubmit, loading }) => {
  return (
    <div className="editor-container">
      <div className="editor-header">
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          disabled={loading}
          className="glass-select"
        >
          <option value="JavaScript">JavaScript</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
        </select>
        <button 
          className="btn-primary glow-effect"
          onClick={onSubmit} 
          disabled={loading || !code.trim()}
        >
          {loading ? 'Analyzing Source...' : 'Execute AI Review'}
        </button>
      </div>
      <textarea
        className="code-textarea glass-panel"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={`Paste your ${language} code here for AI analysis...`}
        disabled={loading}
      />
    </div>
  );
};

export default CodeEditor;
