import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const generateData = () => {
  const data = [];
  for (let n = 1; n <= 10; n++) {
    data.push({
      n,
      'O(1)': 1,
      'O(log N)': Math.log2(n + 1), // Avoid 0
      'O(N)': n,
      'O(N log N)': n * Math.log2(n + 1),
      'O(N^2)': Math.pow(n, 2),
    });
  }
  return data;
};

const ComplexityGraph = ({ complexityText }) => {
  // Try to parse [TIME: O(...)] from the backend response
  const timeRegex = /\[TIME:\s*(O\([^)]+\))\]/i;
  const match = typeof complexityText === 'string' ? complexityText.match(timeRegex) : null;
  const userComplexity = match ? match[1].replace(/\s/g, '').toUpperCase() : null;

  const data = useMemo(() => generateData(), []);

  // Standardize mapping for highlighting
  const getStrokeColor = (type) => {
    let normalizedTarget = userComplexity || '';
    let normalizedType = type.replace(/\s/g, '').toUpperCase();
    
    // Exact match or fallback styling
    if (normalizedTarget.includes(normalizedType)) {
      return '#ff7b72'; // Bright red highlight
    }
    return '#8b949e'; // Greyed out
  };

  const getStrokeWidth = (type) => {
    let normalizedTarget = userComplexity || '';
    let normalizedType = type.replace(/\s/g, '').toUpperCase();
    return normalizedTarget.includes(normalizedType) ? 5 : 2;
  };

  return (
    <div className="complexity-graph-container glass-panel" style={{ width: '100%', height: 400, padding: '1rem', marginTop: '1rem' }}>
      <h3 style={{ marginBottom: '1rem', color: '#79c0ff' }}>Time Complexity Visualizer</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
          <XAxis dataKey="n" stroke="#8b949e" label={{ value: 'Input Size (n)', position: 'insideBottom', offset: -5, fill: '#8b949e' }} />
          <YAxis stroke="#8b949e" label={{ value: 'Operations', angle: -90, position: 'insideLeft', fill: '#8b949e' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(22, 27, 34, 0.9)', border: '1px solid #ffffff1a', borderRadius: '8px' }}
            itemStyle={{ color: '#e6edf3' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line type="monotone" dataKey="O(1)" stroke={getStrokeColor('O(1)')} strokeWidth={getStrokeWidth('O(1)')} dot={false} />
          <Line type="monotone" dataKey="O(log N)" stroke={getStrokeColor('O(LOGN)')} strokeWidth={getStrokeWidth('O(LOGN)')} dot={false} />
          <Line type="monotone" dataKey="O(N)" stroke={getStrokeColor('O(N)')} strokeWidth={getStrokeWidth('O(N)')} dot={false} />
          <Line type="monotone" dataKey="O(N log N)" stroke={getStrokeColor('O(NLOGN)')} strokeWidth={getStrokeWidth('O(NLOGN)')} dot={false} />
          <Line type="monotone" dataKey="O(N^2)" stroke={getStrokeColor('O(N^2)')} strokeWidth={getStrokeWidth('O(N^2)')} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      {userComplexity && (
        <p style={{ textAlign: 'center', marginTop: '10px', color: '#ff7b72', fontWeight: 600 }}>
          Your estimated time complexity is {userComplexity}
        </p>
      )}
    </div>
  );
};

export default ComplexityGraph;
