import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import ComplexityGraph from './ComplexityGraph';

const ResultsPanel = ({ results }) => {
  if (!results) return null;

  return (
    <div className="results-container glass-panel">
      
      <div className="result-section highlight-section" style={{ border: 'none', background: 'transparent' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>✨ Elite Code Review</h3>
        <MarkdownRenderer content={results.explanation} />
      </div>

      <div className="result-section section-full-width">
        <ComplexityGraph complexityText={results.complexity} />
      </div>
    
    </div>
  );
};

export default ResultsPanel;
